import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("attendance.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'Pending',
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Insert some dummy data if empty
const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const insertUser = db.prepare("INSERT INTO users (name, department) VALUES (?, ?)");
  insertUser.run("Alice Smith", "Engineering");
  insertUser.run("Bob Jones", "HR");
  insertUser.run("Charlie Brown", "Sales");

  const insertAttendance = db.prepare("INSERT INTO attendance (user_id, date, status) VALUES (?, ?, ?)");
  const today = new Date().toISOString().split('T')[0];
  insertAttendance.run(1, today, "Present");
  insertAttendance.run(2, today, "Late");
  insertAttendance.run(3, today, "Absent");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  });

  app.get("/api/attendance", (req, res) => {
    const { month } = req.query;
    let query = `
      SELECT a.*, u.name, u.department 
      FROM attendance a 
      JOIN users u ON a.user_id = u.id
    `;
    const params: any[] = [];
    if (month) {
      query += " WHERE a.date LIKE ?";
      params.push(`%${month}%`);
    }
    query += " ORDER BY a.date DESC";
    const records = db.prepare(query).all(...params);
    res.json(records);
  });

  app.post("/api/attendance", (req, res) => {
    const { user_id, date, status } = req.body;
    const stmt = db.prepare("INSERT INTO attendance (user_id, date, status) VALUES (?, ?, ?)");
    const info = stmt.run(user_id, date, status);
    res.json({ id: info.lastInsertRowid, user_id, date, status });
  });

  app.get("/api/applications", (req, res) => {
    const records = db.prepare(`
      SELECT a.*, u.name, u.department 
      FROM applications a 
      JOIN users u ON a.user_id = u.id
      ORDER BY a.id DESC
    `).all();
    res.json(records);
  });

  app.post("/api/applications", (req, res) => {
    const { user_id, type, start_date, end_date, reason } = req.body;
    const stmt = db.prepare("INSERT INTO applications (user_id, type, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?, 'Pending')");
    const info = stmt.run(user_id, type, start_date, end_date, reason);
    res.json({ id: info.lastInsertRowid, status: 'Pending' });
  });

  app.put("/api/applications/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const stmt = db.prepare("UPDATE applications SET status = ? WHERE id = ?");
    stmt.run(status, id);
    res.json({ success: true });
  });

  app.get("/api/summary", (req, res) => {
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }
    
    const users = db.prepare("SELECT * FROM users").all() as any[];
    const attendance = db.prepare("SELECT * FROM attendance WHERE date LIKE ?").all(`%${month}%`) as any[];
    
    const summary = users.map(u => {
      const userRecords = attendance.filter(a => a.user_id === u.id);
      return {
        user_id: u.id,
        name: u.name,
        department: u.department,
        present: userRecords.filter(a => a.status === 'Present').length,
        absent: userRecords.filter(a => a.status === 'Absent').length,
        late: userRecords.filter(a => a.status === 'Late').length,
        leave: userRecords.filter(a => a.status === 'Leave').length,
        trip: userRecords.filter(a => a.status === 'Trip').length,
        timeOff: userRecords.filter(a => a.status === 'TimeOff').length,
      };
    });
    
    res.json(summary);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

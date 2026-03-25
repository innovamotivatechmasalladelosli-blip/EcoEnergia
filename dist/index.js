// server/index.ts
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT || 3e3;
app.use(express.static(path.join(__dirname, "../dist/public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

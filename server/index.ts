import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve the correct path to dist/public
// When running from dist/index.js, __dirname will be dist/
// We need to go up one level to find dist/public
const publicDir = path.resolve(__dirname, './public');

// Serving static files from the public directory
app.use(express.static(publicDir));

// Fallback route for SPA: serve index.html for all non-file requests
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Determine the absolute path to the public directory
// If running from dist/index.js, __dirname is /home/ubuntu/EcoEnergia/dist
// If running from server/index.ts (via tsx), __dirname is /home/ubuntu/EcoEnergia/server
// We use process.cwd() or a more robust path resolution
const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'dist', 'public');

console.log(`[Server] Project Root: ${projectRoot}`);
console.log(`[Server] Public Directory: ${publicDir}`);

// Serving static files from the public directory
app.use(express.static(publicDir));

// Fallback route for SPA: serve index.html for all non-file requests
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  console.log(`[Server] Serving SPA fallback: ${indexPath}`);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`[Server] Error sending index.html: ${err.message}`);
      res.status(404).send("Error: index.html not found. Please run 'pnpm build' first.");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

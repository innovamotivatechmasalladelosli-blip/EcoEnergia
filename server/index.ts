const path = require('path');

// Fixing the static path resolution for development environment
const staticPath = path.resolve(__dirname, "..", "..", "dist", "public");

// rest of your code...

module.exports = { staticPath };
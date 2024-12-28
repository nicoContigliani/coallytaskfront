// Before (CommonJS)
const tailwindcss = require('tailwindcss')

// After (ES Module)
async function getConfig() {
  const tailwindcss = await import('tailwindcss')
  return {
    plugins: [tailwindcss.default()],
  }
}

module.exports = getConfig()
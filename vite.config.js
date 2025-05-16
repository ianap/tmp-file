import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to properly handle markdown files if needed
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          // For .md files, get the raw content
          return `export default ${JSON.stringify(code)};`;
        }
      }
    }
  ],
  resolve: {
    alias: {
      // Add any path aliases if needed
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      // MUI icons
      '@mui/icons-material/SentimentSatisfiedAlt',
      // Chart libraries
      'react-apexcharts', 
      'apexcharts',
      // Markdown related
      'react-markdown',
      'remark-gfm',
      'rehype-raw'
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
})
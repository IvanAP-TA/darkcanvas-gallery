import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false,
    minify: 'terser',
    reportCompressedSize: false, // Faster builds
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.error'],
        passes: 4, // More aggressive compression
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        keep_fargs: false,
        hoist_funs: true,
        hoist_vars: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false,
        ascii_only: true,
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: (id) => {
          // Force everything into main bundle
          return null;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        compact: true,
      },
      treeshake: {
        preset: 'recommended',
        pureExternalModules: true,
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    assetsInlineLimit: 2048, // Inline smaller assets
    chunkSizeWarningLimit: 300, // Stricter warning limit
  },
  optimizeDeps: {
    include: ['react-helmet-async', 'react-lazy-load-image-component']
  }
}));

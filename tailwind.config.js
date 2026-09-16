/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        farm: {
          bg: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          'surface-secondary': 'var(--bg-surface-secondary)',
          'surface-elevated': 'var(--bg-surface-elevated)',
          'surface-muted': 'var(--bg-surface-muted)',
          'surface-hover': 'var(--bg-surface-hover)',
          text: 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-muted': 'var(--text-muted)',
          border: 'var(--border-subtle)',
          'border-strong': 'var(--border-strong)',
          
          // Forest Night Brand & Role Colors
          brand: 'var(--brand-primary)',
          'brand-hover': 'var(--brand-primary-hover)',
          'brand-soft': 'var(--brand-soft)',
          
          forest: 'var(--brand-primary)',
          leaf: 'var(--brand-primary)',
          sage: 'var(--brand-soft)',
          charcoal: 'var(--text-primary)',
          muted: 'var(--text-muted)',
          
          // Role & Palette Accents
          terracotta: 'var(--farmer-accent)',
          'terracotta-soft': 'var(--farmer-surface)',
          eucalyptus: 'var(--eucalyptus)',
          'eucalyptus-soft': 'var(--eucalyptus-soft)',
          teal: 'var(--buyer-accent)',
          'teal-soft': 'var(--buyer-surface)',
          gold: 'var(--antique-gold)',
          'gold-soft': 'var(--antique-gold-soft)',
          brown: 'var(--logistics-accent)',
          'brown-soft': 'var(--logistics-surface)',
          
          // Feedback Status
          success: 'var(--success)',
          'success-soft': 'var(--success-soft)',
          warning: 'var(--warning)',
          'warning-soft': 'var(--warning-soft)',
          danger: 'var(--danger)',
          'danger-soft': 'var(--danger-soft)',
          berry: 'var(--danger)',
          info: 'var(--info)',
          'info-soft': 'var(--info-soft)',
          skyblue: 'var(--info)',
          
          // Background aliases
          sand: 'var(--bg-base)',
          cream: 'var(--bg-surface-secondary)',
          white: 'var(--bg-surface)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 4px 16px 0 rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 24px 0 rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

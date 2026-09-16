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
          bg: 'var(--color-background)',
          surface: 'var(--color-surface)',
          'surface-secondary': 'var(--color-surface-secondary)',
          'surface-elevated': 'var(--color-surface-elevated)',
          'surface-muted': 'var(--color-surface-secondary)',
          'surface-hover': 'var(--bg-surface-hover)',
          navigation: 'var(--color-navigation)',
          'navigation-text': 'var(--color-navigation-text)',
          text: 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-muted': 'var(--color-text-muted)',
          border: 'var(--color-border)',
          'border-strong': 'var(--color-border-strong)',
          
          // Forest Night Brand & Role Colors
          brand: 'var(--color-primary)',
          'brand-hover': 'var(--color-primary-hover)',
          'brand-soft': 'var(--brand-soft)',
          
          forest: 'var(--color-primary)',
          leaf: 'var(--color-primary)',
          sage: 'var(--brand-soft)',
          charcoal: 'var(--color-text-primary)',
          muted: 'var(--color-text-muted)',
          
          // Semantic Role & Action Accents
          harvest: 'var(--color-harvest)',
          'harvest-soft': 'var(--color-harvest-soft)',
          terracotta: 'var(--color-harvest)',
          'terracotta-soft': 'var(--color-harvest-soft)',
          
          market: 'var(--color-market)',
          'market-soft': 'var(--color-market-soft)',
          gold: 'var(--color-market)',
          'gold-soft': 'var(--color-market-soft)',
          
          support: 'var(--color-support)',
          'support-soft': 'var(--color-support-soft)',
          eucalyptus: 'var(--color-support)',
          'eucalyptus-soft': 'var(--color-support-soft)',
          teal: 'var(--color-support)',
          'teal-soft': 'var(--color-support-soft)',
          
          logistics: 'var(--color-logistics)',
          'logistics-soft': 'var(--color-logistics-soft)',
          brown: 'var(--color-logistics)',
          'brown-soft': 'var(--color-logistics-soft)',
          
          // Feedback Status
          success: 'var(--color-success)',
          'success-soft': 'var(--success-soft)',
          warning: 'var(--color-warning)',
          'warning-soft': 'var(--warning-soft)',
          danger: 'var(--color-danger)',
          'danger-soft': 'var(--danger-soft)',
          berry: 'var(--color-danger)',
          info: 'var(--color-logistics)',
          'info-soft': 'var(--color-logistics-soft)',
          skyblue: 'var(--color-logistics)',
          
          // Background aliases
          sand: 'var(--color-background)',
          cream: 'var(--color-surface-secondary)',
          white: 'var(--color-surface)',
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

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Store de Zustand para manejar el estado del tema oscuro
 */
export const useThemeStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      isDarkMode: false,

      // Acciones
      toggleTheme: () => {
        set(state => ({ isDarkMode: !state.isDarkMode }))
      },

      setDarkMode: isDark => {
        set({ isDarkMode: isDark })
      },

      // Selectores útiles
      getCurrentTheme: () => {
        return get().isDarkMode ? 'dark' : 'light'
      },

      getThemeClasses: () => {
        return get().isDarkMode ? 'dark' : ''
      },
    }),
    {
      name: 'theme-storage', // Nombre único para localStorage
      partialize: state => ({ isDarkMode: state.isDarkMode }), // Solo persistir isDarkMode
    }
  )
)

/**
 * Hook personalizado para usar el tema oscuro
 */
export const useTheme = () => {
  const {
    isDarkMode,
    toggleTheme,
    setDarkMode,
    getCurrentTheme,
    getThemeClasses,
  } = useThemeStore()

  return {
    isDarkMode,
    toggleTheme,
    setDarkMode,
    currentTheme: getCurrentTheme(),
    themeClasses: getThemeClasses(),
  }
}

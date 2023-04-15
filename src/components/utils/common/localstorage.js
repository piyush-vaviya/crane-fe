import { ThemeTypes } from './constants'

export class LocalStorageKeys {
  static theme = 'theme'
}

export class LocalStorages {
  static setTheme = (theme) => {
    localStorage.setItem(LocalStorageKeys.theme, theme)
  }

  static getTheme = () => {
    if (localStorage.getItem(LocalStorageKeys.theme)) return localStorage.getItem(LocalStorageKeys.theme)
    else return ThemeTypes.defaultTheme()
  }
}

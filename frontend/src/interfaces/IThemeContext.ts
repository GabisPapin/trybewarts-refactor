export interface IThemeContextData {
  themeName?: 'light' | 'dark';
  toggleTheme?: () => void;
}

export interface IPropsChildren {
  children: JSX.Element;
}

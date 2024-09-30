import type { Theme } from '@mui/material/styles';

// Extend the Theme type to include the 'vars' property
declare module '@mui/material/styles' {
  interface Theme {
    vars?: {
      palette: Theme['palette'];
      shape: Theme['shape'];
    };
  }
}

// Recursive type to represent nested object structure
type NestedObject = {
  [key: string]: NestedObject | unknown;
};

function getThemeValue<T>(theme: Theme, path: string[]): T {
  let value: NestedObject | unknown = theme;
  for (const key of path) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as NestedObject)[key];
    } else {
      return (
        (theme.vars?.[key as keyof typeof theme.vars] as T) || (value as T)
      );
    }
  }
  return value as T;
}

// Helper function to use in component styles
export function themeVar<T>(path: string[]): (theme: Theme) => T {
  return (theme: Theme) => getThemeValue<T>(theme, path);
}

import { type Theme, createTheme } from '@mui/material/styles'
import type {
  PaletteColor,
  ThemeOptions,
  TypeBackground,
} from '@mui/material/styles'
import { useMemo } from 'react'
import { dataDisplayCustomizations } from './customizations/dataDisplay'
import { feedbackCustomizations } from './customizations/feedback'
import { inputsCustomizations } from './customizations/inputs'
import { navigationCustomizations } from './customizations/navigation'
import { surfacesCustomizations } from './customizations/surfaces'
import { colorSchemes, shadows, shape, typography } from './themePrimitives'

interface UseAppThemeProps {
  disableCustomTheme?: boolean
  themeComponents?: ThemeOptions['components']
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

type ThemeValueType =
  | string
  | number
  | PaletteColor
  | TypeBackground
  | DeepPartial<PaletteColor>
  | undefined

type ThemePropertyPath = (string | number)[]

interface ThemeWithVars extends Theme {
  vars?: {
    palette: Theme['palette']
    shape: Theme['shape']
  }
}

function isThemeWithVars(theme: Theme): theme is ThemeWithVars {
  return 'vars' in theme
}

function getThemeValue(theme: Theme, path: ThemePropertyPath): ThemeValueType {
  let value: ThemeValueType
  let fallbackValue: ThemeValueType = theme.palette as ThemeValueType

  if (isThemeWithVars(theme) && theme.vars) {
    value = theme.vars.palette as unknown as ThemeValueType
  } else {
    value = theme.palette as ThemeValueType
  }

  for (const key of path) {
    if (typeof value === 'object' && value !== null) {
      value = value[key as keyof typeof value]
    } else {
      value = undefined
    }
    if (typeof fallbackValue === 'object' && fallbackValue !== null) {
      fallbackValue = fallbackValue[key as keyof typeof fallbackValue]
    } else {
      fallbackValue = undefined
    }
    if (value === undefined && fallbackValue === undefined) {
      return undefined
    }
  }

  return value !== undefined ? value : fallbackValue
}

export function useAppTheme({
  disableCustomTheme,
  themeComponents,
}: UseAppThemeProps) {
  return useMemo(() => {
    if (disableCustomTheme) {
      return createTheme()
    }

    const baseTheme = createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      colorSchemes,
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    })

    return {
      ...baseTheme,
      getThemeValue: (path: ThemePropertyPath) =>
        getThemeValue(baseTheme, path),
    } as Theme
  }, [disableCustomTheme, themeComponents])
}

declare module '@mui/material/styles' {
  interface Theme {
    getThemeValue: (path: ThemePropertyPath) => ThemeValueType
  }
  interface ThemeOptions {
    getThemeValue?: (path: ThemePropertyPath) => ThemeValueType
  }
}

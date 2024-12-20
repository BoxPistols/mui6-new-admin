import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import { ThemeProvider, alpha } from '@mui/material/styles'
import type {} from '@mui/x-charts/themeAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import type {} from '@mui/x-tree-view/themeAugmentation'
import AppNavbar from './components/AppNavbar'
import Header from './components/Header'
import MainGrid from './components/MainGrid'
import SideMenu from './components/SideMenu'
import { useAppTheme } from './theme/AppTheme'
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations'

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
}

interface DashboardProps {
  disableCustomTheme?: boolean
}

export default function Dashboard({ disableCustomTheme }: DashboardProps) {
  const theme = useAppTheme({
    disableCustomTheme,
    themeComponents: xThemeComponents,
  })

  const content = (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </>
  )

  if (disableCustomTheme) {
    return content
  }

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>
}

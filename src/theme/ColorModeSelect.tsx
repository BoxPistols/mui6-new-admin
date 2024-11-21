import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectProps } from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'

export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }
  return (
    <Select
      value={mode}
      onChange={(e) => setMode(e.target.value as 'system' | 'light' | 'dark')}
      inputProps={{
        'data-screenshot': 'toggle-mode',
      }}
      {...props}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  )
}

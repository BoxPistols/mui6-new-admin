import * as React from 'react';
import type { PaletteMode } from '@mui/material/styles';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import MenuButton, { type MenuButtonProps } from './MenuButton';

interface ToggleColorModeProps extends MenuButtonProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function ToggleColorMode({
  mode,
  toggleColorMode,
  ...props
}: ToggleColorModeProps) {
  return (
    <MenuButton
      onClick={toggleColorMode}
      size="small"
      aria-label="button to toggle theme"
      {...props}
    >
      {mode === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </MenuButton>
  );
}

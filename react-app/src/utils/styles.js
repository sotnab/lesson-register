import { GlobalStyles, useTheme } from '@mui/material';

export const menuWidth = 150;

const styles = (theme) => ({
   '::-webkit-scrollbar': {
      width: 10
   },
   '::-webkit-scrollbar-track': {
      background: theme.palette.grey[200],
      borderRadius: 4
   },
   '::-webkit-scrollbar-thumb': {
      borderRadius: 4,
      background: theme.palette.grey[400],
      '&:hover': {
         background: theme.palette.grey[500]
      }
   }
});

export const modalStyles = {
   position: 'absolute',
   top: 0,
   right: 0,
   left: menuWidth,
   height: '100vh',
   backgroundColor: 'background.default',
   outline: 'none'
}

export const toolbarStyles = {
   backgroundColor: 'grey.50',
   borderBottom: 1,
   borderColor: 'divider'
}

export const globalStyles = <GlobalStyles styles={styles} />
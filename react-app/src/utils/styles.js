import { GlobalStyles } from '@mui/material';

export const menuWidth = 150;

const styles = (theme) => ({
   '*': {
      boxSizing: 'border-box'
   },
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

export const scrollableStyles = {
   height: '100%',
   px: 2,
   overflowY: 'scroll',
   pb: 10
}

export const modalStyles = {
   position: 'absolute',
   top: 0,
   right: 0,
   left: menuWidth,
   height: '100vh',
   backgroundColor: 'background.default',
   outline: 'none'
}

export const addStyles = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'start',
   width: 400,
   bgcolor: 'background.paper',
   boxShadow: 24,
   px: 4,
   py: 2,
   outline: 'none',
   gap: 2
}

export const addLessonStyles = {
   width: 600,
   maxHeight: '80vh',
}

export const tabProps = {
   sx: { justifyContent: 'start', pl: 3 },
   iconPosition: 'start',
}

export const actionsStyles = {
   position: 'absolute',
   right: 32,
   bottom: 16,
   display: 'flex',
   alignItems: 'center',
   gap: 2
}

export const flex = {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'start',
   width: '100%'
}

export const labelProps = {
   variant: 'caption',
   sx: {
      ml: 1.8,
      color: 'rgba(0, 0, 0, 0.6)',
   }
}

export const backdropStyles = {
   color: '#fff',
   zIndex: (theme) => theme.zIndex.modal + 1
}

export const searchStyles = {
   boxShadow: 2,
   borderRadius: 50,
   'fieldset': {
      borderRadius: 50,
   },
   '.MuiInputAdornment-root': {
      m: 0
   },
   '.MuiOutlinedInput-input': {
      width: 0,
      transition: 'width .2s',
   },
   '&:hover': {
      '.MuiOutlinedInput-input': {
         width: 200,
      },
      '.MuiInputAdornment-root': {
         mr: 1
      },
   }
}

export const formGridStyles = {
   display: 'grid',
   gridTemplateColumns: '1fr 1fr',
   alignSelf: 'stretch',
   gap: 2
}

export const globalStyles = <GlobalStyles styles={styles} />
import { Add, Close, Search } from '@mui/icons-material'
import { Fab, IconButton, InputAdornment, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { actionsStyles, searchStyles } from '../utils/styles'

const ActionBar = ({ value, setValue, setOpen }) => {

   const change = (e) => setValue(e.target.value)
   const clear = () => setValue('')

   return (
      <Box sx={actionsStyles}>
         <TextField
            size="small"
            placeholder="Search..."
            autoComplete="off"
            value={value}
            onChange={change}
            sx={searchStyles}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <Search />
                  </InputAdornment>
               ),
               endAdornment: (
                  <InputAdornment position="end">
                     {value.length > 0 && (
                        <IconButton size="small" onClick={clear}>
                           <Close fontSize="small" />
                        </IconButton>
                     )}
                  </InputAdornment>
               )
            }}
         />

         <Fab color="primary" onClick={setOpen} size="small">
            <Add />
         </Fab>
      </Box>
   )
}

export default ActionBar
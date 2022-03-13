import { Close, MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem, Modal, Slide, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { useState } from 'react'
import { modalStyles } from '../utils/styles'


const ItemModal = ({ open, item, close, deleteItem, title, children }) => {
   const [menuOpen, setMenuOpen] = useState(false)
   const [menuParent, setMenuParent] = useState(null)

   const openMenu = (event) => {
      setMenuParent(event.currentTarget)
      setMenuOpen(true)
   }

   const closeMenu = () => {
      setMenuOpen(false)
      setMenuParent(null)
   }

   return (
      <Modal open={open} onClose={close}>
         <Slide direction="left" in={open} >
            <Box sx={modalStyles}>
               <Toolbar sx={{ py: 1, borderBottom: 1, borderColor: 'divider' }}>
                  <IconButton
                     color="inherit"
                     onClick={close}
                     sx={{ mr: 2 }}
                  >
                     <Close />
                  </IconButton>

                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                     {title}
                  </Typography>

                  <IconButton
                     color="inherit"
                     onClick={openMenu}
                  >
                     <MoreVert />
                  </IconButton>
               </Toolbar>

               <Box sx={{ p: 2 }}>
                  {children}
               </Box>

               <Menu
                  open={menuOpen}
                  anchorEl={menuParent}
                  onClose={closeMenu}
               >
                  <MenuItem onClick={() => {
                     closeMenu()
                     deleteItem(item)
                  }}>
                     Delete
                  </MenuItem>
               </Menu>
            </Box>
         </Slide>
      </Modal>
   );
}

export default ItemModal;
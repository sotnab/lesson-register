import { useContext, useState } from 'react';
import { Alert, AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, Modal, Paper, Slide, Toolbar, Typography } from '@mui/material';
import GroupItem from './GroupItem';

import { dataContext } from '../../utils/dataContext';
import GroupItemSkeleton from './GroupItemSkeleton';
import { modalStyles, toolbarStyles } from '../../utils/styles';
import { ArrowBack } from '@mui/icons-material';

const Lessons = () => {
   const [modalOpen, setModalOpen] = useState(false)
   const [dialogOpen, setDialogOpen] = useState(false)
   const [group, setGroup] = useState('')

   const data = useContext(dataContext)

   const openDialog = (id) => {
      if (dialogOpen) return
      setGroup(id)
      setDialogOpen(true)
   }

   const closeDialog = () => {
      setDialogOpen(false)
   }

   const openModal = (id) => {
      if (modalOpen) return
      setGroup(id)
      setModalOpen(true)
   }

   const closeModal = () => {
      setModalOpen(false)
   }

   const deleteItem = () => {
   }


   return (
      <Box sx={{ px: 2 }}>
         <List>
            {(data.groups.length === 0 && data.groupsLoaded) && (
               <Alert severity="info" sx={{ mx: 'auto', minWidth: 400, width: 'fit-content' }}>
                  <Typography color="GrayText">
                     Nothing to show
                  </Typography>
               </Alert>
            )}

            {!data.groupsLoaded && <GroupItemSkeleton />}

            {data.groups.map((item) =>
               <GroupItem
                  data={item}
                  key={item.id}
                  openDialog={openDialog}
                  openModal={openModal}
               />
            )}
         </List>

         <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogTitle>Delete Group?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Are you sure to delete group: {data.groups.find(({ id }) => id === group)?.topic}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button color="error" onClick={() => deleteItem(group)}>Delete</Button>
               <Button onClick={closeDialog} autoFocus>Cancel</Button>
            </DialogActions>
         </Dialog>

         <Modal open={modalOpen} onClose={closeModal}>
            <Slide direction="left" in={modalOpen} >
               <Box sx={modalStyles}>
                  <Toolbar sx={toolbarStyles}>
                     <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        onClick={closeModal}
                     >
                        <ArrowBack />
                     </IconButton>
                  </Toolbar>

                  <Box sx={{ p: 2 }}>
                     <Typography variant="h6" component="h2">
                        Text in a modal
                     </Typography>
                     <Typography sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                     </Typography>
                  </Box>
               </Box>
            </Slide>
         </Modal>
      </Box>
   )
}

export default Lessons;
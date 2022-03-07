import { useEffect, useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, Typography } from '@mui/material';
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import GroupItem from './GroupItem';

import { app } from '../firebase';

const Lessons = () => {
   const [open, setOpen] = useState(false)
   const [group, setGroup] = useState('')
   const [groups, setGroups] = useState([])

   const openDialog = (id) => {
      if (open) return
      setGroup(id)
      setOpen(true)
   }

   const closeDialog = () => {
      setOpen(false)
   }

   const deleteItem = () => {
      if (group) {
         setGroups(groups.filter((item) => group !== item.id))
      }
      closeDialog()
   }

   useEffect(() => {
      async function fetchData() {
         const firestore = getFirestore(app)
         const groups = await getDocs(collection(firestore, 'groups'))
         setGroups(groups.docs)
      }

      fetchData()
   }, [])

   useEffect(() => {
      console.log(groups)
   }, [groups])

   return (
      <Box sx={{ px: 2 }}>
         <List>
            {groups.map((item) =>
               <GroupItem data={item} key={item.id} openDialog={openDialog} />
            )}
            {groups.length === 0 && (
               <Alert severity="info" sx={{ mx: 'auto', minWidth: 400, width: 'fit-content' }}>
                  <Typography color="GrayText">
                     Nothing to show
                  </Typography>
               </Alert>
            )}
         </List>

         <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Delete Group?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Are you sure to delete group: {groups.find(({ id }) => id === groups)?.topic}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button color="error" onClick={() => deleteItem(group)}>Delete</Button>
               <Button onClick={closeDialog} autoFocus>Cancel</Button>
            </DialogActions>
         </Dialog>
      </Box>
   )
}

export default Lessons;
import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List } from '@mui/material';
import LessonItem from './LessonItem';

const lessons = [
   { topic: 'Functional Programming', date: '12/09/2021' },
   { topic: 'Object oriented Programming', date: '18/09/2021' },
   { topic: 'Network theory', date: '21/09/2021' },
   { topic: 'Protocols', date: '30/09/2021' },
   { topic: 'REST architecture', date: '2/10/2021' },
   { topic: 'Web safety', date: '3/10/2021' },
   { topic: 'Shop data manager app', date: '12/10/2021' }
]

const Lessons = () => {
   const [open, setOpen] = useState(false)
   const [topic, setTopic] = useState('')

   const openDialog = (newTopic) => {
      setTopic(newTopic)
      setOpen(true)
   }

   const closeDialog = () => {
      setOpen(false)
   }

   return (
      <Box sx={{ px: 2 }}>
         <List>
            {lessons.map((item, index) =>
               <LessonItem data={item} key={index} openDialog={openDialog} />
            )}
         </List>

         <Dialog
            open={open}
            onClose={closeDialog}
         >
            <DialogTitle>Delete Lesson?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Are you sure to delete lesson: {topic}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button color="error" onClick={closeDialog}>Delete</Button>
               <Button onClick={closeDialog} autoFocus>Cancel</Button>
            </DialogActions>
         </Dialog>
      </Box>
   )
}

export default Lessons;
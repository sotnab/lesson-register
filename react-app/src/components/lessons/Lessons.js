import { useContext, useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, Typography } from '@mui/material';
import LessonItem from './LessonItem';
import LessonItemSkeleton from './LessonItemSkeleton';

import { dataContext } from '../../utils/dataContext';

const Lessons = () => {
   const [open, setOpen] = useState(false)
   const [lesson, setLesson] = useState('')

   const data = useContext(dataContext)

   const openDialog = (id) => {
      if (open) return
      setLesson(id)
      setOpen(true)
   }

   const closeDialog = () => {
      setOpen(false)
   }

   const deleteItem = () => {
   }

   return (
      <Box sx={{ height: '100%', px: 2, overflowY: 'scroll' }}>
         <List>
            {(data.lessons.length === 0 && data.lessonsLoaded) && (

               <Alert severity="info" sx={{ mx: 'auto', minWidth: 400, width: 'fit-content' }}>
                  <Typography color="GrayText">
                     Nothing to show
                  </Typography>
               </Alert>
            )}

            {!data.lessonsLoaded && <LessonItemSkeleton />}

            {data.lessons.map((item) => (
               <LessonItem data={item} key={item.id} openDialog={openDialog} />
            ))}

         </List>

         <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Delete Lesson?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Are you sure to delete lesson: {data.lessons.find(({ id }) => id === lesson)?.topic}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button color="error" onClick={() => deleteItem(lesson)}>Delete</Button>
               <Button onClick={closeDialog} autoFocus>Cancel</Button>
            </DialogActions>
         </Dialog>
      </Box>
   )
}

export default Lessons;
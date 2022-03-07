import { useEffect, useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, Typography } from '@mui/material';
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import LessonItem from './LessonItem';

import { app } from '../firebase';

const Lessons = () => {
   const [open, setOpen] = useState(false)
   const [lesson, setLesson] = useState('')
   const [lessons, setLessons] = useState([
      // { id: '4bo325bu34b5', topic: 'Functional Programming', date: '12/09/2021' },
      // { id: '1jb5u5y35bbr', topic: 'Object oriented Programming', date: '18/09/2021' },
      // { id: '4ubo34dsasgd', topic: 'Network theory', date: '21/09/2021' },
      // { id: '52j53n535258', topic: 'Protocols', date: '30/09/2021' },
      // { id: '34gh8t5123eb', topic: 'REST architecture', date: '2/10/2021' },
      // { id: 'ikujwsety5t6', topic: 'Web safety', date: '3/10/2021' },
      // { id: '7u8iwsdzsdfc', topic: 'Shop data manager app', date: '12/10/2021' }
   ])

   const openDialog = (id) => {
      if (open) return
      setLesson(id)
      setOpen(true)
   }

   const closeDialog = () => {
      setOpen(false)
   }

   const deleteItem = () => {
      if (lesson) {
         setLessons(lessons.filter((item) => lesson !== item.id))
      }
      closeDialog()
   }

   useEffect(() => {
      async function fetchData() {
         const firestore = getFirestore(app)
         const lessons = await getDocs(collection(firestore, 'lessons'))
         setLessons(lessons.docs)
      }
      fetchData()
   }, [])

   return (
      <Box sx={{ px: 2 }}>
         <List>
            {lessons.map((item) =>
               <LessonItem data={item} key={item.id} openDialog={openDialog} />
            )}
            {lessons.length === 0 && (
               <Alert severity="info" sx={{ mx: 'auto', minWidth: 400, width: 'fit-content' }}>
                  <Typography color="GrayText">
                     Nothing to show
                  </Typography>
               </Alert>
            )}
         </List>

         <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Delete Lesson?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Are you sure to delete lesson: {lessons.find(({ id }) => id === lesson)?.topic}
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
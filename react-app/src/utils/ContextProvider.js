import { Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { DataContext, UiContext } from './context'
import { db } from './firebase'
import { backdropStyles } from './styles'


const ContextProvider = ({ children }) => {
   const [backdropOpen, setBackdropOpen] = useState(false)
   const [snackbarOpen, setSnackbarOpen] = useState(false)
   const [snackbarText, setSnackbarText] = useState('')
   const [dialogOpen, setDialogOpen] = useState(false)
   const [dialogText, setDialogText] = useState('')
   const [dialogAction, setDialogAction] = useState(null)

   const [lessons, setLessons] = useState([])
   const [groups, setGroups] = useState([])
   const [students, setStudents] = useState([])

   const [lessonsLoaded, setLessonsLoaded] = useState(false)
   const [groupsLoaded, setGroupsLoaded] = useState(false)
   const [studentsLoaded, setStudentsLoaded] = useState(false)

   const openBackdrop = () => setBackdropOpen(true)
   const closeBackdrop = () => setBackdropOpen(false)
   const closeSnackbar = () => setSnackbarOpen(false)

   const openSnackbar = (text) => {
      setSnackbarText(text)
      setSnackbarOpen(true)
   }

   const openDialog = (text, action) => {
      if (!text || !action) return

      setDialogText(text)
      setDialogAction(() => action)
      setDialogOpen(true)
   }

   const closeDialog = () => {
      setDialogAction(null)
      setDialogOpen(false)
   }

   useEffect(() => {
      const unsubLessons = onSnapshot(collection(db, 'lessons'), (data) => {
         if (!lessonsLoaded) setLessonsLoaded(true)
         setLessons(data.docs)
      });

      const unsubGroups = onSnapshot(collection(db, 'groups'), (data) => {
         if (!groupsLoaded) setGroupsLoaded(true)
         setGroups(data.docs)
      });

      const unsubStudents = onSnapshot(collection(db, 'students'), (data) => {
         if (!studentsLoaded) setStudentsLoaded(true)
         setStudents(data.docs)
      })

      return () => {
         unsubLessons()
         unsubGroups()
         unsubStudents()
      }
   }, []);

   return (
      <DataContext.Provider value={{ lessons, groups, students, lessonsLoaded, groupsLoaded, studentsLoaded }}>
         <UiContext.Provider value={{ openBackdrop, closeBackdrop, openSnackbar, closeSnackbar, openDialog, closeDialog }}>
            {children}

            <Backdrop sx={backdropStyles} open={backdropOpen}>
               <CircularProgress color="primary" />
            </Backdrop>

            <Snackbar
               open={snackbarOpen}
               autoHideDuration={6000}
               anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
               <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                  {snackbarText}
               </Alert>
            </Snackbar>

            <Dialog open={dialogOpen} onClose={closeDialog}>
               <DialogTitle>Delete {dialogText}?</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     Are you sure to delete this {dialogText}
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="error" onClick={dialogAction}>Delete</Button>
                  <Button onClick={closeDialog} autoFocus>Cancel</Button>
               </DialogActions>
            </Dialog>
         </UiContext.Provider>
      </DataContext.Provider>
   )
}

export default ContextProvider
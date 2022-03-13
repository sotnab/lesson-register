import { Button, Fade, Modal, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useState } from 'react'
import { addStyles } from '../../utils/styles'
import { db } from '../../utils/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { UiContext } from '../../utils/context'

const AddModal = ({ open, close }) => {
   const [name, setName] = useState('')
   const [year, setYear] = useState('')

   const ui = useContext(UiContext)

   const addStudent = async () => {
      if (name.length < 1) {
         ui.openSnackbar('You must enter name')
         return
      } else if (year.length !== 4) {
         ui.openSnackbar('Year must be 4-digit')
         return
      } else {
         ui.closeSnackbar()
      }

      const studentData = { name, year }

      ui.openBackdrop()
      await addDoc(collection(db, 'students'), studentData)
      ui.closeBackdrop()

      setName('')
      setYear('')
      close()
   }

   return (
      <Modal open={open} onClose={close}>
         <Fade in={open}>
            <Paper sx={addStyles}>
               <Typography variant="h6">Add new Student</Typography>
               <TextField
                  variant="outlined"
                  label="Name"
                  placeholder="Pablo..."
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputLabelProps={{
                     shrink: true
                  }}
               />
               <TextField
                  variant="outlined"
                  label="Birth Year"
                  placeholder="eg. 1998"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  InputLabelProps={{
                     shrink: true
                  }}
               />
               <Box sx={{ alignSelf: 'end' }}>
                  <Button color="error" onClick={close}>Cancel</Button>
                  <Button onClick={addStudent}>Submit</Button>
               </Box>
            </Paper>
         </Fade>
      </Modal>
   )
}

export default AddModal
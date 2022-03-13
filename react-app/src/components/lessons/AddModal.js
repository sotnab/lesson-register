import { Button, Checkbox, Fade, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../utils/context'
import { addLessonStyles, addStyles, formGridStyles, labelProps } from '../../utils/styles'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../utils/firebase'

const AddModal = ({ open, close }) => {
   const [topic, setTopic] = useState('')
   const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'))
   const [students, setStudents] = useState([])
   const [presence, setPresence] = useState([])
   const [group, setGroup] = useState('')

   const groups = useContext(DataContext).groups

   const changePresence = (e, id) => {
      setPresence(presence.map((item) => {
         if (item.id === id) item.present = e.target.checked
         return item
      }))
   }

   useEffect(() => {
      if (!group.length) return

      async function getGroup() {
         const groupQuery = query(
            collection(db, 'students'),
            where('group', '==', group)
         )

         const groupStudents = (await getDocs(groupQuery)).docs
         setStudents(groupStudents)
      }
      getGroup()
   }, [group])

   useEffect(() => {
      if (!students.length) return

      setPresence(students.map((item) => {
         return {
            id: item.id,
            name: item.get('name'),
            present: false,
            group
         }
      }))

   }, [students])

   return (
      <Modal open={open} onClose={close}>
         <Fade in={open}>
            <Paper sx={{ ...addStyles, ...addLessonStyles }}>
               <Typography variant="h6">Add new Lesson</Typography>
               <TextField
                  variant="outlined"
                  placeholder="Web safety..."
                  label="Topic"
                  fullWidth
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  InputLabelProps={{
                     shrink: true
                  }}
               />

               <Box sx={formGridStyles}>
                  <TextField
                     label="Date"
                     type="date"
                     value={date}
                     fullWidth
                     onChange={(e) => setDate(e.target.value)}
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
                  <FormControl fullWidth>
                     <InputLabel id="select-label">Group</InputLabel>
                     <Select
                        labelId="select-label"
                        value={group}
                        label="Group"
                        onChange={(e) => setGroup(e.target.value)}
                     >
                        {groups.map((item) => (
                           <MenuItem value={item.id} key={item.id}>
                              {item.get('name')}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Box>

               {students.length > 0 && (
                  <List
                     sx={{ width: '100%', p: 0, overflowY: 'scroll' }}
                     subheader={<Typography {...labelProps}>Presence</Typography>}
                  >
                     {presence.map((item) => (
                        <ListItem
                           key={item.id}
                           secondaryAction={
                              <Checkbox
                                 size="small"
                                 checked={item.present}
                                 onChange={(e) => changePresence(e, item.id)}
                              />
                           }>
                           <ListItemText primary={item.name} />
                        </ListItem>
                     ))}
                  </List>
               )}

               <Box sx={{ alignSelf: 'end' }}>
                  <Button color="error" onClick={close}>Cancel</Button>
                  < Button onClick={close} > Submit</Button>
               </Box>
            </Paper>
         </Fade>
      </Modal >
   )
}

export default AddModal
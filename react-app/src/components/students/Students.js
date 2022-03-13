import { Add } from '@mui/icons-material'
import { Box, Fab, List } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import { useContext, useState } from 'react'

import { DataContext, UiContext } from '../../utils/context'
import { db } from '../../utils/firebase'
import { actionsStyles, scrollableStyles } from '../../utils/styles'
import AddModal from './AddModal'
import StudentItem from './StudentItem'
import ActionBar from '../ActionBar'

const Students = () => {
   const [addOpen, setAddOpen] = useState(false)
   const [search, setSearch] = useState('')

   const students = useContext(DataContext).students
   const ui = useContext(UiContext)

   const openDialog = (item) => {
      ui.openDialog('Student', () => deleteStudent(item))
   }

   const deleteStudent = async (item) => {
      ui.openBackdrop()
      await deleteDoc(doc(db, 'students', item.id))
      ui.closeBackdrop()
      ui.closeDialog()
   }

   const openAdd = () => setAddOpen(true)
   const closeAdd = () => setAddOpen(false)

   return (
      <Box sx={scrollableStyles}>
         <List>
            {students
               .filter((item) => item.get('name').includes(search))
               .map((item) => (
                  <StudentItem item={item} key={item.id} openDialog={openDialog} />
               ))}
         </List>

         <AddModal open={addOpen} close={closeAdd} />
         <ActionBar value={search} setValue={setSearch} setOpen={openAdd} />
      </Box>
   )
}

export default Students
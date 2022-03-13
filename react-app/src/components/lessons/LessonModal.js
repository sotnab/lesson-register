import { Checkbox, List, ListItem, ListItemText } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../utils/firebase'

const LessonModal = ({ item }) => {
   const [presence, setPresence] = useState([])

   useEffect(() => {
      if (!item) return

      async function getPresence() {
         const presenceQuery = query(collection(db, 'presence'), where('lesson', '==', item.id))
         const presenceDocs = (await getDocs(presenceQuery)).docs
         setPresence(presenceDocs)
      }
      getPresence()
   }, [item])

   return (
      <List>
         {presence.map((item) => (
            <ListItem
               key={item.id}
               secondaryAction={
                  <Checkbox size="large" checked={item.get('present')} disabled />
               }>
               <ListItemText primary={item.get('name')} />
            </ListItem>
         ))}
      </List>
   )
}


export default LessonModal
import { Person } from '@mui/icons-material'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '../../utils/firebase'

const GroupModal = ({ item }) => {
   const [students, setStudents] = useState([])

   useEffect(() => {
      if (!item) return

      async function getGroup() {
         const groupQuery = query(
            collection(db, 'students'),
            where('group', '==', item.id)
         );

         const group = (await getDocs(groupQuery)).docs
         setStudents(group);
      }
      getGroup()

      return () => setStudents([])
   }, [item])

   return (

      <List subheader={
         <ListSubheader sx={{ ml: 2 }}>
            {students.length} {students.length > 1 ? 'Students' : 'Student'}
         </ListSubheader>
      }>
         {students.map((item) => (
            <ListItem key={item.id}>
               <ListItemIcon>
                  <Person />
               </ListItemIcon>
               <ListItemText primary={item.get('name')} />
            </ListItem>
         ))}
      </List>
   );
}

export default GroupModal;
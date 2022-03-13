import { Delete, Person } from '@mui/icons-material'
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'

const styles = {
   icon: {
      visibility: 'hidden'
   },
   item: {
      '&:hover .MuiButtonBase-root': {
         visibility: 'visible'
      }
   }
}

const StudentItem = ({ item, openDialog }) => {
   return (
      <ListItem key={item.id}
         sx={styles.item}
         secondaryAction={
            <IconButton children={<Delete />} onClick={() => openDialog(item)} sx={styles.icon} />
         }
      >
         <ListItemIcon children={<Person />} />
         <ListItemText
            primary={item.get('name')}
            secondary={item.get('year')}
         />
      </ListItem>
   )
}

export default StudentItem
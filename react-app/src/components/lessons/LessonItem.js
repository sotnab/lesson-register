import { Class } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const LessonItem = ({ item, openModal }) => {
   const date = new Date(0)
   date.setSeconds(item.get('date').seconds)

   return (
      <ListItem disablePadding>
         <ListItemButton onClick={openModal}>
            <ListItemIcon children={<Class />} />
            <ListItemText
               primary={item.get('topic')}
               primaryTypographyProps={{ variant: 'h6' }}
               secondary={date.toLocaleDateString('fr-FR')}
            />
         </ListItemButton>
      </ListItem>
   )
}

export default LessonItem;
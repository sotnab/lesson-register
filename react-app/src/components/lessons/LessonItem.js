import { Class, Delete } from '@mui/icons-material';
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const LessonItem = ({ data, openDialog }) => {
   const date = new Date(0)
   date.setSeconds(data.get('date').seconds)

   return (
      <ListItem
         disablePadding
         sx={{
            '&:hover .delete-button': {
               visibility: 'visible'
            }
         }}
         secondaryAction={
            <IconButton
               onClick={() => openDialog(data.id)}
               className="delete-button"
               sx={{ visibility: 'hidden' }}
            >
               <Delete />
            </IconButton>
         }
      >
         <ListItemButton>
            <ListItemIcon children={<Class />} />
            <ListItemText
               primary={data.get('topic')}
               primaryTypographyProps={{ variant: 'h6' }}
               secondary={date.toLocaleDateString('fr-FR')}
            />
         </ListItemButton>
      </ListItem>
   )
}

export default LessonItem;
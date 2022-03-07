import { Delete, School } from '@mui/icons-material';
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const GroupItem = ({ data, openDialog }) => {
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
            <ListItemIcon children={<School />} />
            <ListItemText
               primary={data.get('name')}
               primaryTypographyProps={{ variant: 'h6' }}
            />
         </ListItemButton>
      </ListItem>
   )
}

export default GroupItem;
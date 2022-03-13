import { School } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const GroupItem = ({ item, openModal }) => {


   return (
      <ListItem disablePadding>
         <ListItemButton onClick={openModal}>
            <ListItemIcon children={<School />} />
            <ListItemText
               primary={item.get('name')}
               primaryTypographyProps={{ variant: 'h6' }}
            />
         </ListItemButton>
      </ListItem>
   )
}

export default GroupItem;
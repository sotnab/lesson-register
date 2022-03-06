import { Class, Delete } from '@mui/icons-material';
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';

const LessonItem = ({ data, openDialog }) => {
   const [hover, setHover] = useState(false)


   useEffect(() => { console.log('pablo') }, [hover])

   return (
      <ListItem
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         disablePadding
         secondaryAction={
            hover && (
               <IconButton>
                  <Delete onClick={() => openDialog(data.topic)} />
               </IconButton>
            )}
      >
         <ListItemButton>
            <ListItemIcon children={<Class />} />
            <ListItemText
               primary={data.topic}
               primaryTypographyProps={{ variant: 'h5' }}
               secondary={data.date}
            />
         </ListItemButton>
      </ListItem>
   )
}

export default LessonItem;
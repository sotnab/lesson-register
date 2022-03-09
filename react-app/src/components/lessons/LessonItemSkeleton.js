import { ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';

const count = Array(20).fill()

const LessonItemSkeleton = () => {
   return count.map((item, index) => (
      <ListItem disablePadding key={index}>
         <ListItemButton>
            <ListItemIcon children={<Skeleton variant="circular" width={40} height={40} />} />
            <ListItemText
               primary={<Skeleton variant="text" width="40%" height={30} />}
               secondary={<Skeleton variant="text" width="20%" />}
            />
         </ListItemButton>
      </ListItem>
   ))
}

export default LessonItemSkeleton;
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';

const count = Array(20).fill()

const GroupItemSkeleton = () => {
   return count.map((item, index) => (
      <ListItem disablePadding key={index}>
         <ListItemButton>
            <ListItemIcon children={<Skeleton variant="circular" width={40} height={40} />} />
            <ListItemText
               primary={<Skeleton variant="text" width="40%" height={30} />}
            />
         </ListItemButton>
      </ListItem>
   ))
}

export default GroupItemSkeleton;
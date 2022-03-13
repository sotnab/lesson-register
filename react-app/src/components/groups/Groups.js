import { useContext, useState } from 'react';
import { Alert, Box, List, Typography } from '@mui/material';
import GroupItem from './GroupItem';

import { DataContext, UiContext } from '../../utils/context';
import GroupItemSkeleton from './GroupItemSkeleton';
import GroupModal from './GroupModal';
import ItemModal from '../ItemModal';
import { scrollableStyles } from '../../utils/styles';

const Lessons = () => {
   const [modalOpen, setModalOpen] = useState(false)
   const [group, setGroup] = useState(null)

   const data = useContext(DataContext)
   const ui = useContext(UiContext)

   const openDialog = (item) => {
      setGroup(item)
      ui.openDialog('Group', () => {
         console.log(`Delete group: ${item.get('name')}`)
         ui.closeDialog()
      })
   }

   const openModal = (item) => {
      if (modalOpen) return
      setGroup(item)
      setModalOpen(true)
   }

   const closeModal = () => {
      setModalOpen(false)
   }


   return (
      <Box sx={scrollableStyles}>
         <List>
            {(data.groups.length === 0 && data.groupsLoaded) && (
               <Alert severity="info" sx={{ mx: 'auto', minWidth: 400, width: 'fit-content' }}>
                  <Typography color="GrayText">
                     Nothing to show
                  </Typography>
               </Alert>
            )}

            {!data.groupsLoaded && <GroupItemSkeleton />}

            {data.groups.map((item) =>
               <GroupItem item={item} key={item.id} openModal={() => openModal(item)} />
            )}
         </List>

         <ItemModal
            open={modalOpen}
            item={group}
            close={closeModal}
            deleteItem={openDialog}
            title={group?.get('name')}
         >
            <GroupModal item={group} />
         </ItemModal>
      </Box>
   )
}

export default Lessons;
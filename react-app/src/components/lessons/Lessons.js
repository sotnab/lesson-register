import { useContext, useEffect, useState } from 'react'
import { Alert, Box, List, Typography } from '@mui/material'
import { scrollableStyles } from '../../utils/styles'
import { DataContext, UiContext } from '../../utils/context'

import LessonItem from './LessonItem'
import LessonItemSkeleton from './LessonItemSkeleton'
import LessonModal from './LessonModal'
import ItemModal from '../ItemModal'
import ActionBar from '../ActionBar'
import AddModal from './AddModal'

const Lessons = () => {
   const [modalOpen, setModalOpen] = useState(false)
   const [addOpen, setAddOpen] = useState(false)
   const [lesson, setLesson] = useState(null)
   const [search, setSearch] = useState('')

   const data = useContext(DataContext)
   const ui = useContext(UiContext)

   const openDialog = (item) => {
      setLesson(item)
      ui.openDialog('Lesson', () => {
         console.log(`Delete lesson: ${item.get('topic')}`)
         ui.closeDialog()
      })
   }

   const openModal = (item) => {
      if (modalOpen) return
      setLesson(item)
      setModalOpen(true)
   }

   const closeModal = () => setModalOpen(false)
   const openAdd = () => setAddOpen(true)
   const closeAdd = () => setAddOpen(false)

   useEffect(() => {
      if (!lesson) return

      const actualLesson = data.lessons.find((item) => item.id === lesson.id)
      if (actualLesson.length) {
         setLesson(actualLesson)
      } else {
         setModalOpen(false)
      }

   }, [data.lessons])

   return (
      <Box sx={scrollableStyles}>
         <List>
            {(data.lessons.length === 0 && data.lessonsLoaded) && (

               <Alert severity="info" sx={{ mx: 'auto', minWidth: 400, width: 'fit-content' }}>
                  <Typography color="GrayText">
                     Nothing to show
                  </Typography>
               </Alert>
            )}

            {!data.lessonsLoaded && <LessonItemSkeleton />}

            {data.lessons
               .filter((item) => item.get('topic').includes(search))
               .map((item) => (
                  <LessonItem item={item} key={item.id} openModal={() => openModal(item)} />
               ))}

         </List>

         <ItemModal
            open={modalOpen}
            item={lesson}
            close={closeModal}
            deleteItem={openDialog}
            title={lesson?.get('topic')}
         >
            <LessonModal item={lesson} />
         </ItemModal>

         <AddModal open={addOpen} close={closeAdd} />
         <ActionBar value={search} setValue={setSearch} setOpen={openAdd} />
      </Box>
   )
}

export default Lessons;
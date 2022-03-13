import { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { Class, Person, School } from '@mui/icons-material'
import { globalStyles, menuWidth, tabProps } from './utils/styles'

import Lessons from './components/lessons/Lessons'
import Groups from './components/groups/Groups'
import Students from './components/students/Students'
import ContextProvider from './utils/ContextProvider'

const App = () => {
  const [tab, setTab] = useState(0)

  const changeTab = (event, value) => {
    setTab(value)
  }

  return (
    <ContextProvider>
      {globalStyles}
      <Box style={{ display: 'flex', height: '100vh' }}>
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={changeTab}
          sx={{ borderRight: 1, borderColor: 'divider', width: menuWidth }}
        >
          <Tab label="Lessons" icon={<Class />} {...tabProps} />
          <Tab label="Groups" icon={<School />} {...tabProps} />
          <Tab label="Students" icon={<Person />} {...tabProps} />
        </Tabs>

        <Box sx={{ flexGrow: 1 }}>
          {tab === 0 && <Lessons />}
          {tab === 1 && <Groups />}
          {tab === 2 && <Students />}
        </Box>
      </Box>
    </ContextProvider>
  )
}

export default App

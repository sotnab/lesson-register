import { Class, School } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react';

import Lessons from './components/Lessons';

function App() {
  const [tab, setTab] = useState(0)

  const changeTab = (event, value) => {
    setTab(value)
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={changeTab}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Lessons" icon={<Class />} iconPosition="start" />
        <Tab label="Groups" icon={<School />} iconPosition="start" />
      </Tabs>

      <Box hidden={tab !== 0} sx={{ flexGrow: 1 }}>
        <Lessons />
      </Box>

      <Box hidden={tab !== 1}>
        Groups
      </Box>
    </Box>
  )
}

export default App;

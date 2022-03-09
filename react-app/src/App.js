import { useEffect, useState } from 'react';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { Class, School } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material'

import { app } from './utils/firebase';
import Lessons from './components/lessons/Lessons';
import Groups from './components/groups/Groups'
import { globalStyles, menuWidth } from './utils/styles';
import { dataContext } from './utils/dataContext';

const App = () => {
  const [tab, setTab] = useState(0)

  const [lessons, setLessons] = useState([])
  const [groups, setGroups] = useState([])
  const [lessonsLoaded, setLessonsLoaded] = useState(false)
  const [groupsLoaded, setGroupsLoaded] = useState(false)

  const changeTab = (event, value) => {
    setTab(value)
  }

  useEffect(() => {
    const db = getFirestore(app)

    const unsubLessons = onSnapshot(collection(db, 'lessons'), (data) => {
      if (!lessonsLoaded) setLessonsLoaded(true)
      setLessons(data.docs)
    });

    const unsubGroups = onSnapshot(collection(db, 'groups'), (data) => {
      if (!groupsLoaded) setGroupsLoaded(true)
      setGroups(data.docs)
    });

    return () => {
      unsubLessons()
      unsubGroups()
    }
  }, []);

  return (
    <dataContext.Provider value={{
      lessons,
      lessonsLoaded,
      groups,
      groupsLoaded
    }}>
      {globalStyles}
      <Box style={{ display: 'flex', height: '100vh' }}>
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={changeTab}
          sx={{ borderRight: 1, borderColor: 'divider', width: menuWidth }}
        >
          <Tab label="Lessons" icon={<Class />} iconPosition="start" />
          <Tab label="Groups" icon={<School />} iconPosition="start" />
        </Tabs>

        <Box hidden={tab !== 0} sx={{ flexGrow: 1 }}>
          <Lessons />
        </Box>

        <Box hidden={tab !== 1} sx={{ flexGrow: 1 }}>
          <Groups />
        </Box>
      </Box>
    </dataContext.Provider>
  )
}

export default App;

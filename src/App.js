import React, { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.less';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Typography, Text, Space } from 'antd';
import { SideBarNav } from './components/navigation/SideBarNav.js'
import { CalendarComponent } from './components/views/Calendar';
import { Home } from './components/views/Home.js';
import { ProjectProvider, ProjectContext } from './components/providers/ProjectProvider';
import { TaskProvider } from './components/providers/TaskProvider';
import { TimelineComponent } from './components/views/Timeline';
import { NewProjectForm } from './components/views/NewProjectForm';
import { NewTaskForm } from './components/views/NewTaskForm';
import { Task } from './components/views/Task';

function App() {

  const [activeList, setActiveList] = useState("home")
  const [activeProject, setActiveProject] = useState(0)
  const { Title, Text } = Typography;
  const [components, setComponents] = useState()
  const [selectedKey, setSelectedKey] = useState('')

  const showCalendar = () => (
    <CalendarComponent />
  )

  const showHome = () => (
    <Home />
  )

  const showTimeline = () => (
    <TimelineComponent activeProject={activeProject} />
  )
  const showAddProjectForm = () => (
    <NewProjectForm />
  )
  const showAddTaskForm = () => (
    <NewTaskForm activeProject={activeProject} setActiveList={setActiveList} />
  )
  const showTasks = () => (
    <Task activeProject={activeProject} />
  )

  useEffect(() => {
    if (activeList === "calendar") {
      setComponents(showCalendar)
    }
    else if (activeList === "home") {
      setComponents(showHome)
    }
    else if (activeList === "timeline") {
      setComponents(showTimeline)
    }
    else if (activeList === "addProject") {
      setComponents(showAddProjectForm)
    }
    else if (activeList === "addTask") {
      setComponents(showAddTaskForm)
    }
    else if (activeList === "tasks") {
      setComponents(showTasks)
    }
  }, [activeList])

  useEffect(() => {
    if (activeProject === {}) {
      return ""
    }
  }, [activeProject])

  const { Header, Sider, Content } = Layout;
  return (
    <>
      <ProjectProvider>
        <TaskProvider>
          <Layout>
            <Header style={{ height: '100px', padding: '22px' }}><Title className="header" ><Text onClick={() => setActiveList('home')} style={{ color: 'white' }}>Derek</Text></Title></Header>
          </Layout>
          <div className="mainContainer">
            <Layout>
              <Sider style={{ background: 'white' }}><SideBarNav setActiveList={setActiveList} setActiveProject={setActiveProject} /></Sider>
              <Content style={{ margin: '60px' }}>{components}</Content>
            </Layout>
          </div>
        </TaskProvider>
      </ProjectProvider>
    </>
  )
}

export default App;

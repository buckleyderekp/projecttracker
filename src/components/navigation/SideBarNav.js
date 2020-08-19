import React, { useContext, useEffect } from 'react';
import { Menu } from 'antd';
import { CalendarOutlined, FileOutlined, RiseOutlined, UnorderedListOutlined, PlusCircleFilled } from '@ant-design/icons';
import { ProjectContext } from '../providers/ProjectProvider';

export const SideBarNav = ({ setActiveList, setActiveProject }) => {

    const { SubMenu } = Menu;
    const { getProjects, projects } = useContext(ProjectContext)

    useEffect(() => {
        getProjects()
    }, [])


    if (!projects) {
        return null
    }
    else {
        return (

            <>
                <div style={{ width: 256 }, { height: '1200px' }}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        style={{ height: '100%' }}

                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <FileOutlined />
                                    <span>Projects</span>
                                </span>
                            }
                        >
                            <Menu.Item key="1" onClick={() => setActiveList('addProject')} icon={<PlusCircleFilled />}>
                                Add Project
                            </Menu.Item>
                            {projects.map(p => {
                                return (
                                    <Menu.ItemGroup key={`g${p.id}`} title={p.projectName} >
                                        <Menu.Item key={`nt${p.id}`} onClick={() => {
                                            setActiveList('addTask')
                                            setActiveProject(p)
                                        }} icon={<PlusCircleFilled />}>Add Task</Menu.Item>
                                        <Menu.Item key={`p${p.id}`} onClick={() => {

                                            setActiveProject(p)
                                            setActiveList('timeline')
                                        }}><RiseOutlined />Progress</Menu.Item>
                                        <Menu.Item key={`t${p.id}`} onClick={() => setActiveList('tasks')}><UnorderedListOutlined />Tasks</Menu.Item>
                                    </Menu.ItemGroup>
                                )
                            })}
                        </SubMenu>
                        <Menu.Item key="5" icon={<CalendarOutlined />} onClick={() => setActiveList('calendar')}>
                            Calendar
                    </Menu.Item>
                    </Menu>
                </div>
            </>

        )
    }
}
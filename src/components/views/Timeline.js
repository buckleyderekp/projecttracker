import React, { useEffect, useContext, useState } from 'react';
import { Timeline } from 'antd';
import { TaskContext } from '../providers/TaskProvider';

export const TimelineComponent = (activeProject) => {

    const { tasks, getTasks, setTasks } = useContext(TaskContext)
    const [filteredTasks, setFilteredTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        getTasks().then(filterTasks(tasks))
    }, [activeProject])

    useEffect(() => {
        filterTasks(tasks)
    }, [tasks])


    const filterTasks = () => {

        const tasksFilter = tasks.filter(t => t.projectId === activeProject.activeProject.id)
        setFilteredTasks(tasksFilter)
    }


    if (!filteredTasks.length) {
        return ""
    }


    return (

        <Timeline style={{ margin: '3%' }} mode="alternate">
            {
                filteredTasks.map(t => {
                    return (
                        <Timeline.Item style={{ margin: '50px', fontSize: '20px' }} color={t.isComplete ? "green" : "red"}>{t.task} Due:  {t.dueDate}</Timeline.Item>
                    )
                })
            }
        </Timeline>
    )
}
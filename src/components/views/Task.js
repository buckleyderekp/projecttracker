import React, { useEffect, useState, useContext } from 'react';
import { Space, Card } from 'antd';
import { TaskContext } from '../providers/TaskProvider';
import './Task.less'
import { Button, Radio } from 'antd';
import { DeleteFilled, CheckOutlined, EditFilled } from '@ant-design/icons';


export const Task = (activeProject) => {

    const { tasks, getTasks, deleteTask, updateTask } = useContext(TaskContext)
    const [filteredTasks, setFilteredTasks] = useState([])
    const [taskToUpdate, setUpdateTask] = useState({})

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

        const tasksFilter = tasks.filter(t => t.projectId === activeProject.activeProject.id && t.isComplete === false)
        setFilteredTasks(tasksFilter)
    }


    if (!filteredTasks.length) {
        return ""
    }


    return (

        <div className="taskList">
            {filteredTasks.map(ft => {
                return (
                    <Card className="taskCard" title={ft.task} style={{ width: 300 }}>
                        <Button className="taskCardButton" onClick={() => deleteTask(ft.id)} type="primary" >
                            <DeleteFilled />
                        </Button>
                        <Button className="taskCardButton" type="primary" >
                            <CheckOutlined />
                        </Button>
                        <Button className="taskCardButton" type="primary" >
                            <EditFilled />
                        </Button>
                    </Card>
                )
            })}

        </div>
    )
}
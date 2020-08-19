import React, { useState, useContext } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import { TaskContext } from '../providers/TaskProvider';

export const NewTaskForm = ({ activeProject, setActiveList, setSelectedKey }) => {

    const { addTask } = useContext(TaskContext)
    const [dueDateInp, setDueDateInp] = useState('')
    const [taskInp, setTaskInp] = useState('')


    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    const monthFormat = 'YYYY/MM';
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const submitNewTask = () => {
        debugger
        const newTask = {
            isComplete: false,
            userId: 1,
            dueDate: dueDateInp,
            task: taskInp,
            projectId: activeProject.id
        }
        addTask(newTask).then(() => setActiveList('timeline'))

    }

    return (
        <Form style={{ margin: '50px, 0px, 0px, 0px' }} {...layout} name="nest-messages" validateMessages={validateMessages}>
            <Form.Item name={['task', 'task']} label="Task" id='Task' onChange={(e) => setTaskInp(e.target.value)} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['project', 'dueDate']} id='dueDate' label="Due Date"  >
                <DatePicker defaultValue={moment('2020/08/19', dateFormat)} format={dateFormat} onChange={(moment, date) => setDueDateInp(date)} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button onClick={() => {
                    submitNewTask()
                }} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
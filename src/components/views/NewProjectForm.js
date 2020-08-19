import React, { useState, useContext, useRef } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { ProjectContext } from '../providers/ProjectProvider';

export const NewProjectForm = () => {

    const { addProject } = useContext(ProjectContext)
    const [dueDateInp, setDueDateInp] = useState('')
    const [descriptionInp, setDescriptionInp] = useState('')
    const [projectNameInp, setProjectNameInp] = useState('')

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    const monthFormat = 'YYYY/MM';
    const [userInput, setUserInput] = useState(null);
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

    const submitNewProject = () => {
        const newProject = {
            completedDate: null,
            isComplete: false,
            userId: 1,
            dueDate: dueDateInp,
            projectName: projectNameInp,
            description: descriptionInp
        }
        debugger
        addProject(newProject)

    }


    return (
        <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
            <Form.Item name={['project', 'projectName']} label="Project Name" id='projectName' onChange={(e) => setProjectNameInp(e.target.value)} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['project', 'description']} onChange={(e) => setDescriptionInp(e.target.value)} id='description' label="Description" >
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={['project', 'dueDate']} id='dueDate' label="Due Date"  >
                <DatePicker defaultValue={moment('2020/08/19', dateFormat)} format={dateFormat} onChange={(moment, date) => setDueDateInp(date)} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button onClick={() => {
                    submitNewProject()
                }} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
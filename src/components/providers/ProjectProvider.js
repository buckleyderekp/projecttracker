import React, { useState, useEffect } from "react"


export const ProjectContext = React.createContext()


export const ProjectProvider = (props) => {

    const [projects, setProjects] = useState([])

    const getProjects = () => {
        return fetch("http://localhost:8088/projects")
            .then(res => res.json())
            .then(setProjects)
    }

    const addProject = project => {
        return fetch("http://localhost:8088/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((res) => {
                const createdProject = res.json()
                return createdProject
            })
    }

    const deleteProject = projectId => {
        return fetch(`http://localhost:8088/projects/${projectId}`, {
            method: "DELETE"
        })
            .then(getProjects)
    }

    const updateProject = project => {
        return fetch(`http://localhost:8088/projects/${project.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(getProjects)
    }



    return (
        <ProjectContext.Provider value={
            {
                projects,
                addProject,
                deleteProject,
                updateProject,
                setProjects,
                getProjects
            }
        }>
            {props.children}
        </ProjectContext.Provider>
    )
}
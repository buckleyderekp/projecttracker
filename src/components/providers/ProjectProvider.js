import React, { useState, useEffect } from "react"


export const ProjectContext = React.createContext()


export const ProjectProvider = (props) => {

    const [projects, setProjects] = useState([])

    const getProjects = () => {
        return fetch("https://projecttrackerdpb-db.herokuapp.com/projects")
            .then(res => res.json())
            .then(setProjects)
    }

    const addProject = project => {
        return fetch("https://projecttrackerdpb-db.herokuapp.com/projects", {
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
        return fetch(`https://projecttrackerdpb-db.herokuapp.com/projects/${projectId}`, {
            method: "DELETE"
        })
            .then(getProjects)
    }

    const updateProject = project => {
        return fetch(`https://projecttrackerdpb-db.herokuapp.com/projects/${project.id}`, {
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
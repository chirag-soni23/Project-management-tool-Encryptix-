import React from 'react';
import ProjectList from '../components/ProjectList';
import TaskList from '../components/TaskList';

const Home = () => {
    const [selectedProject, setSelectedProject] = React.useState(null);

    return (
        <div className="container mx-auto p-4">
            <ProjectList />
            {selectedProject && <TaskList projectId={selectedProject} />}
        </div>
    );
};

export default Home;

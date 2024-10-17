import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Create from './Createui';

const EditPage = () => {
    const { program_name } = useParams();
    const [program, setProgram] = useState(null);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/programs/name/${program_name}`);
                const data = await response.json();
                setProgram(data);
            } catch (error) {
                console.error('Error fetching program:', error);
            }
        };

        fetchProgram();
    }, [program_name]);

    return (
        <div>
            <Create program={program} />
        </div>
    );
};

export default EditPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Create from './Createui';

const EditPage = () => {
    const { id } = useParams();
    const [program, setProgram] = useState(null);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/programs/${id}`);
                const data = await response.json();
                setProgram(data);
            } catch (error) {
                console.error('Error fetching program:', error);
            }
        };

        fetchProgram();
    }, [id]);

    return (
        <div>
            <Create program={program} />
        </div>
    );
};

export default EditPage;
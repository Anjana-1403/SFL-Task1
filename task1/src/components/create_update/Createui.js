import Sidebar from "../Sidebar";
import { Card } from 'primereact/card';
import './edit.css';
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useNavigate } from 'react-router-dom';

const Create = ({ program }) => {
    const [date, setDate] = useState(null);
    const [enddate, setEndDate] = useState(null);
    const [value, setValue] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (program) {
            setDate(new Date(program.program_start_date));
            setEndDate(new Date(program.program_end_date));
            setValue(program.program_short_description);
            setUsername(program.program_name);
            setDescription(program.program_description);
        }
    }, [program]);

    const handleSubmit = async () => {
        const payload = {
            program_name: username,
            program_short_description: value,
            program_start_date: date,
            program_end_date: enddate,
            program_description: description,
            status: 1 // Assuming status is always 1 for new programs
        };

        const url = program ? `http://localhost:5000/api/programs/${program._id}` : 'http://localhost:5000/api/programs';
        const method = program ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                navigate('/details');
            } else {
                console.error('Failed to save the program');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const Create = program ? 'Edit' : 'Create';

    return (
        <div>
            <Sidebar />
            <Card className="createcard">
                <h4>breadcrumb</h4>
                <p className="create">{Create} Program</p>
                <p1>Please enter the program details in the fields below</p1>
                <div className="content">
                    <div className="left">
                        <label className="input-label">Username <sup id="sup">*</sup></label><br />
                        <InputText id="inputbox" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                        <label className="input-label">Start date <sup id="sup">*</sup></label><br />
                        <Calendar id="inputbox" value={date} onChange={(e) => setDate(e.value)} showIcon /><br />
                        <label className="input-label">Short Description <sup id="sup">*</sup></label><br />
                        <InputTextarea id="inputbox" value={value} onChange={(e) => setValue(e.target.value)} rows={4} cols={30} />
                    </div>
                    <div className="right">
                        <label className="input-label">Upload program photo</label>
                        <InputText id="inputbox" type="file" /><br />
                        <label className="input-label">End date <sup id="sup">*</sup></label><br />
                        <Calendar id="inputbox" value={enddate} onChange={(e) => setEndDate(e.value)} showIcon /><br />
                        <label className="input-label">Description <sup id="sup">*</sup></label><br />
                        <InputTextarea id="inputbox" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} cols={30} />
                    </div>
                </div>
                <Button id="submit_create" label="Submit" onClick={handleSubmit} />
            </Card>
        </div>
    );
};

export default Create;
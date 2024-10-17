import { InputText } from 'primereact/inputtext';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './Details.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Sidebar from './Sidebar';
import { Menu } from 'primereact/menu'; 
import 'primeicons/primeicons.css';

const Details = () => {
    const [products, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const menuRefs = useRef({});


    useEffect(() => {
        fetch('http://localhost:5000/api/programs')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Log the data
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Expected an array but got:', data);
                }
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const statusBodyTemplate = (rowData) => {
        const text=rowData.status === 1 ? 'LIVE' : 'DRAFT';
        const color=text ==='LIVE' ? 'green' : 'red';
        return (<div style={{color}}>{text}</div>);

    };   

    const duplicateProgram = (rowData) => {
        const duplicatedProgram = { 
            program_name: rowData.program_name, 
            program_start_date: rowData.program_start_date, 
            program_end_date: rowData.program_end_date, 
            status: rowData.status 
        };
        fetch('http://localhost:5000/api/programs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(duplicatedProgram)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Duplicated program:', data);
                setProducts([...products, data]);
            })
            .catch(error => console.error('Error duplicating program:', error));
    };
    const deleteProgram = (rowData) => {  
        fetch(`http://localhost:5000/api/programs/${rowData._id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Deleted program:', data);
                setProducts(products.filter(product => product._id !== rowData._id));
            })
            .catch(error => console.error('Error deleting program:', error));
    };

    
    const actionBodyTemplate = (rowData) => {
        if (!menuRefs.current[rowData._id]) {
            menuRefs.current[rowData._id] = React.createRef();
        }

        const menuItems = [
            {
                label: 'Duplicate',
                icon: 'pi pi-copy',
                command: () => duplicateProgram(rowData)
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => deleteProgram(rowData)
            }
        ];

        return (
            <div>
                <Menu model={menuItems} popup ref={menuRefs.current[rowData._id]} id={`popup_menu_${rowData._id}`} />
                <Button 
                    icon="pi pi-ellipsis-v" 
                    className="p-button-rounded p-button-text"
                    onClick={(event) => menuRefs.current[rowData._id].current.toggle(event)} 
                />
            </div>
        );
    };


    return (
        <div>
            <Sidebar />
            <Card className="det">
                <h1 id="head">Manage learners</h1>
                <div className="p-inputgroup">
                    <InputText 
                        id="input"
                        placeholder="Search" 
                        onInput={(e) => setGlobalFilter(e.target.value)} 
                    />
                    <Button id="b" label=" Search" text raised />
                </div>
                <div className="details">
                    <DataTable value={products} paginator rows={5} globalFilter={globalFilter} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="program_name" header="Program" style={{ width: '30%' }}></Column>
                        <Column field="program_start_date" header="Start Date" style={{ width: '30%' }}></Column>
                        <Column field="program_end_date" header="End Date" style={{ width: '30%' }}></Column>
                        <Column field="status" header="Status" style={{ width: '30%' }} body={statusBodyTemplate} ></Column>
                        <Column 
                            body={actionBodyTemplate}                        
                        ></Column>
                    </DataTable>
                </div>
            </Card>
        </div>
    );
}

export default Details;
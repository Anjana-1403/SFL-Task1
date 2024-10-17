import React from 'react';
import { Link } from 'react-router-dom'; 

import 'primeicons/primeicons.css';
        

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className="sidebar-link"><i className="pi pi-user" style={{ color: 'white' }}></i></Link>
                </li>
                <li>
                    <Link to="/settings" className="sidebar-link"><i className="pi pi-table" style={{ color: 'white' }}></i></Link>
                </li>
                <li>
                    <Link to="/reports" className="sidebar-link"><i className="pi pi-chart-bar" style={{ color: 'white' }}></i></Link>
                </li>
                <li>
                    <Link to="/help" className="sidebar-link"><i className="pi pi-cog" style={{ color: 'white' }}></i></Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
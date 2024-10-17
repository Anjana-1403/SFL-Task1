import { useState } from 'react';
import { Card } from 'primereact/card';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import './Cards.css';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';      
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
         

function Cards() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const cities = [
    { name: 'RIT' },
    { name: 'REC' },
    { name: 'SVCE' },
    { name: 'SSN' },
    { name: 'SRM' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (!password) return false; 
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (validatePassword(newPassword)) {
      setPasswordError(''); 
    } else {
      setPasswordError('Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters');
    }
  };

  const handleSubmit = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      console.log('Form submitted');
      setPassword('');
      setEmail('');
      setSelectedCity(null);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        navigate('/details'); 
      }, 1000); 
    }
  }; 

  return (
    <div className='bg'>
      <div className="card">
        <Card title="Welcome Back" id="title" className="cards">
          {isSubmitted && <div className="submitted-message">Form submitted successfully!</div>}
          <div className='e'>
            <label htmlFor="email" id="label">Email</label>
            <br />
            <InputText
              id="box"
              placeholder="Enter the email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-text"
            />
            <br />
            {emailError && <small className="p-error">{emailError}</small>}
          </div>

          <div className='o'>
            <label id="label">Organisation</label>
            <br />
            <Dropdown
              id="box"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Select an organisation"
              className="dropdown"
            />
          </div>

          <div className='p'>
            <label id="label">Password</label>
            <br />
            <Password
              id="box"
              value={password}
              className="input-text"
              feedback={false}
              onChange={handlePasswordChange}
            />
            <br />
            {passwordError && <small className="p-error">{passwordError}</small>}
          </div>

          <div className='s'>
            <br />
            <Button label="Submit" onClick={handleSubmit} />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Cards;
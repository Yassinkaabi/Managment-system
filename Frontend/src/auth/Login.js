import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [info, setInfo] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Submit form data to the server
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/auth/login', info);
            if (response) {
                localStorage.setItem('token', response.data.result.token);
                localStorage.setItem('isAuth', true);
                navigate('/products');
            } else {
                console.log('bad request');
            }
            return response;
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrors({ server: error.response.data.message });
            } else {
                setErrors({ server: 'An error occurred. Please try again later.' });
            }
        }
    };

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth') || 'false';
        if (isAuth === 'true') {
            navigate('/products');
        }
    }, []);

    return (
        <div className='container mt-5'>
            <h1>Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" className="form-control" id="email" name="email" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                </div>

                <button className='btn btn-primary' type="submit" onClick={handleSubmit}>Log in</button>
                {errors.server && <p className="error">{errors.server}</p>}
            </form>
        </div>
    );
};

export default Login;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [info, setInfo] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (info.password !== info.repeatPassword) {
                setErrors({ passwordMatch: 'Passwords do not match.' });
                return;
            }
            const response = await axios.post('http://localhost:3001/api/v1/auth/register', info);
            if (response)
                navigate('/login')
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.msg) {
                setErrors({ server: error.response.data.msg });
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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="Enter your username" name="username" id="username" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email" name="email" id="email" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter your password" name="password" id="password" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="repeatPassword" className="form-label">Repeat password</label>
                    <input type="password" className="form-control" placeholder="Repeat your password" name="repeatPassword" id="repeatPassword" onChange={handleChange} required />
                </div>

                {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}

                <button className='btn btn-primary' type='submit'>Register</button>
                {errors.server && <p className="error">{errors.server}</p>}
            </form>
        </div>
    );
};

export default Register;

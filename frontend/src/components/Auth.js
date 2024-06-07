import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../services/api";

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                await signup(formData);
                alert('User created successfully');
            } else {
                const { data } = await login(formData);
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
        <div>
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                />
                <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already have an account' : 'Dont have an account? Sign Up'}
            </button>
        </div>
    );
};

export default Auth;

import React, {useEffect, useState} from 'react';
import './login.css';
import {useNavigate} from "react-router-dom";
import {LoginI} from "../Homepage/InterfaceUtilities";

const Login: React.FC<LoginI> = ({isAuth}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        if (signUpButton && signInButton && container) {
            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });

            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            });
        } else {
            console.error("One or more elements were not found in the DOM.");
        }
    },[]);
    const handleLoginButton = async (e: React.FormEvent)=> {
        e.preventDefault();


        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login fallito. Controlla le tue credenziali.');
            }else{
                const user = await response.json()
                setUsername(user.username)
                isAuth(true)
                navigate('/home', { state: { username: email } });
            }

        } catch (err) {
            console.error('Errore durante il login:', err);
            alert(err);
        }

    }
    const handleRegistrationButton = async (e: React.FormEvent)=> {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/registration', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username})
            });

            if (!response.ok) {
                throw new Error('Registrazione fallita, utente gia registrato');
            }else{
                console.log("registrazione effettuta con successo!")
                setPassword("")
                setEmail("")
                setUsername("")
            }

        } catch (err) {
            console.error('Errore durante la registrazione:', err);
        }
    }

    return (
        <div className="login-wrapper">
            <div>
                <img src={require("../resources/logo1.png")} alt="plus" className="logo-login"/>
            </div>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Crea account</h1>
                        <div className="social-container">
                            <a href="#" className="facebook"></a>
                            <a href="#" className="google"></a>
                        </div>
                        <span>oppure</span>
                        <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
                        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <button className="actionRight" onClick={handleRegistrationButton}>Registrati</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Login</h1>
                        <div className="social-container">
                            <a href="#" className="facebook"></a>
                            <a href="#" className="google"></a>
                        </div>
                        <span>oppure</span>
                        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <a href="#">Password dimenticata?</a>
                        <button className="actionLeft" onClick={handleLoginButton}>Accedi</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Bentornato!</h1>
                            <p>Effettua il login e continua da dove avevi lasciato!</p>
                            <button type="submit" className="ghost" id="signIn">Accedi</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Benvenuto!</h1>
                            <p>Registrati e inizia a il viaggio!</p>
                            <button type="submit" className="ghost" id="signUp">Registrati</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

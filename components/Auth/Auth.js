import React, { useState } from 'react'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm';

export default function Auth({ onCloseModal, setTitleModal }) {

    const [showLogin, setShowLogin] = useState(true);

    const showLoginForm = () => {
        setShowLogin(true);
        setTitleModal("Iniciar Sesion");
    }
    const showRegisterForm = () => {
        setShowLogin(false);
        setTitleModal("Crear nueva cuenta");
    }

    return showLogin ? (
        <LoginForm showRegisterForm={showRegisterForm} onCloseModal={ onCloseModal } />
    ) : (
        <RegisterForm showLoginForm={showLoginForm} />
    );
}

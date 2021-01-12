import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth'
import { loginApi, resetPasswordApi } from '../../../api/user'


export default function LoginForm({showRegisterForm, onCloseModal}) {

    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    // console.log(auth);

    /** Recuperar los datos del form , validarlos y enviarlos a strapi */
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await loginApi(formData);
            if (response?.jwt) {
                login(response.jwt)
                onCloseModal();
            } else {
                toast.error("El email o la contrasenia son incorrectos")
            }
            // console.log(response);
            setLoading(false);
        }
    })

    const resetPassword= () => {
        formik.setErrors({});
        const validateEmail = Yup.string().email().required();

        if (!validateEmail.isValidSync(formik.values.identifier)) {
            formik.setErrors({identifier:true})
        } else {
            resetPasswordApi(formik.values.identifier);
        }
        console.log(formik.values.identifier);
    }

    return (
        <Form className="login-form" onSubmit={ formik.handleSubmit }>
            <Form.Input 
                name="identifier"
                type="text"
                placeholder="Correo Electronico"
                onChange={formik.handleChange}
                error={formik.errors.identifier}
            />
            <Form.Input 
                name="password"
                type="password"
                placeholder="Contrasenia"
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <div className="actions">
                <Button type="button" basic onClick={showRegisterForm}>
                    Registrarse
                </Button>
                <div>
                    <Button className="submit" type="submit" loading={loading}>
                        Entrar
                    </Button>
                    <Button type="button" onClick={resetPassword}>
                        ?Has olvidado la contrasenia ?
                    </Button>
                </div>
            </div>
        </Form>
    )
}

function initialValues() {
    return {
        identifier: "",
        password: ""
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
}
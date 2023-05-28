import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { hashPassword, userExists } from '../helpers';
import lStyles from '../styles/Login.module.css';

const register = () => {

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const { fullName, email, password } = form;

    const handlerChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const findUser = userExists(form.email);
        if (form.email !== "" && form.password !== "") {
            if (!findUser) {
                try {
                    const newPassword = await hashPassword(form.password);
                    const newUser = {
                        ...form,
                        password: newPassword
                    }

                    await fetch("/api/register", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    });
                    router.push("/login");
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }


    return (
        <div className={lStyles.container}>
            <header className={lStyles.header}>
                <h1>PRODUCTOS APP</h1>
            </header>
            <form onSubmit={handleSubmit} className={lStyles.formContainer}>
                <h2>Nuevo Usuario</h2>
                <div className={lStyles.formInput}>
                    <input
                        type="text"
                        placeholder='Nombre Completo'
                        name='fullName'
                        onChange={handlerChange}
                        value={fullName}
                    />
                </div>
                <div className={lStyles.formInput}>
                    <input
                        type="email"
                        placeholder='Correo Electronico'
                        name='email'
                        onChange={handlerChange}
                        value={email}
                        required
                    />
                </div>
                <div className={lStyles.formInput}>
                    <input
                        type="password"
                        placeholder='Contraseña'
                        name='password'
                        onChange={handlerChange}
                        value={password}
                        required
                    />
                </div>
                <div className={lStyles.formInput}>
                    <button type='submit' className={lStyles.submit}>Registrarse</button>
                </div>
                <div className={lStyles.redirectText}>
                    <p>¿Quieres iniciar sesion?  <Link href="/login" className={lStyles.link}>Accede aqui</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default register;
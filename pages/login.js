import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

const login = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const { email, password } = form;

    const handlerChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();

        if (form.email !== "" && form.password !== "") {
            try {
                const request = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });

                const response = await request.json();
                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(response.user));
                    router.push("/");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>PRODUCTOS APP</h1>
            </header>
            <div>
                <form method='POST' onSubmit={handlerSubmit} className={styles.formContainer}>
                    <h2>LOGIN</h2>
                    <div className={styles.formInput}>
                        <input
                            type="email"
                            placeholder='Correo Electronico'
                            name='email'
                            onChange={handlerChange}
                            value={email}
                        />
                    </div>
                    <div className={styles.formInput}>
                        <input
                            type="password"
                            placeholder='Contraseña'
                            name='password'
                            onChange={handlerChange}
                            value={password}
                        />
                    </div>
                    <div className={styles.formInput}>
                        <button type='submit' className={styles.submit}>Iniciar Sesion</button>
                    </div>
                    <div className={styles.redirectText}>
                        <p>¿No tienes una cuenta? <Link href="/register" className={styles.link}>Crea una</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login;
import React, { useState } from 'react'
import loginImage from '../../assets/images/login.svg'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/auth'

import './Auth.scss'

const Login = ({ history }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        dispatch(login({ email, password }, history))
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={loginImage} alt='Login' />
                    </div>

                    <div id='form-section'>
                        <h2>З поверненням!</h2>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required='required'
                                    type='text'
                                    placeholder='Email' />
                            </div>

                            <div className='input-field mb-2'>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='required'
                                    type='password'
                                    placeholder='Пароль' />
                            </div>

                            <button>ВХІД</button>
                        </form>

                        <p>Все ще не маєте акаунта? <Link to='/register' class="link">Реєстрація</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
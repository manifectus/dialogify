import React, { useState } from 'react'
import registerImage from '../../assets/images/register.svg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../store/actions/auth'
import './Auth.scss'

const Register = ({ history }) => {

    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('male')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        dispatch(register({ firstName, lastName, email, gender, password }, history))
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={registerImage} alt='Register' />
                    </div>

                    <div id='form-section'>
                        <h2>Створення акаунту</h2>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                    required='required'
                                    type='text'
                                    placeholder="Ім'я" />
                            </div>

                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                    required='required'
                                    type='text'
                                    placeholder='Прізвище' />
                            </div>

                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required='required'
                                    type='text'
                                    placeholder='Email' />
                            </div>

                            <div className='input-field mb-1'>
                                <select
                                    className='select-field'
                                    onChange={e => setGender(e.target.value)}
                                    value={gender}
                                    required='required'
                                >
                                    <option value='male'>Чоловік</option>
                                    <option value='female'>Жінка</option>
                                </select>
                                </div>

                            <div className='input-field mb-2'>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='required'
                                    type='password'
                                    placeholder='Пароль' />
                            </div>

                            <button>РЕЄСТРАЦІЯ</button>
                        </form>

                        <p>Вже маєте акаунт? <Link to='/login' class="link">Вхід</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register
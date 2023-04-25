import React, { Fragment, useState } from 'react'
import { userStatus } from '../../../../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import Modal from '../../../Modal/Modal'
import ChatService from '../../../../services/chatService'
import './ChatHeader.scss'

const ChatHeader = ({ chat }) => {

    const [showChatOptions, setShowChatOptions] = useState(false)
    const [showAddFriendModal, setShowAddFriendModal] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    const socket = useSelector(state => state.chatReducer.socket)


    const searchFriends = (e) => {
        ChatService.searchUsers(e.target.value)
            .then(res => setSuggestions(res))
    }

    const addNewFriend = (id) => {
        ChatService.addFriendToGroupChat(id, chat.id)
            .then(data => {
                socket.emit('add-user-to-group', data)
                setShowAddFriendModal(false)
            }).catch(err => console.log(err))
    }

    const leaveChat = () => {
        ChatService.leaveCurrentChat(chat.id)
            .then(data => {
                socket.emit('leave-current-chat', data)
            })
            .catch(err => console.log(err))
    }

    const deleteChat = () => {
        ChatService.deleteCurrentChat(chat.id)
            .then(data => {
                socket.emit('delete-chat', data)
            })
    }

    return (
        <Fragment>
            <div id='chatter'>
                {
                    chat.Users.map(user => {
                        return <div className='chatter-info' key={user.id}>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <div className='chatter-status'>
                                <span className={`online-status ${userStatus(user)}`}></span>
                            </div>
                        </div>
                    })
                }
            </div>
            <FontAwesomeIcon
                onClick={() => setShowChatOptions(!showChatOptions)}
                icon={['fas', 'ellipsis-v']}
                className='fa-icon'
            />
            {
                showChatOptions
                    ? <div id='settings'>
                        <div onClick={() => setShowAddFriendModal(true)}>
                            <FontAwesomeIcon
                                icon={['fas', 'user-plus']}
                                className='fa-icon'
                            />
                            <p>Додати користувача до чату</p>
                        </div>

                        {
                            chat.type === 'group'
                                ? <div onClick={() => leaveChat()}>
                                    <FontAwesomeIcon
                                        icon={['fas', 'sign-out-alt']}
                                        className='fa-icon'
                                    />
                                    <p>Покинути чат</p>
                                </div>
                                : null
                        }

                        {
                            chat.type === 'dual' ?
                                <div onClick={() => deleteChat()}>
                                    <FontAwesomeIcon
                                        icon={['fas', 'trash']}
                                        className='fa-icon'
                                    />
                                    <p>Видалити чат</p>
                                </div>
                                : null
                        }
                    </div>
                    : null
            }
            {
                showAddFriendModal &&
                <Modal click={() => setShowAddFriendModal(false)}>
                    <Fragment key='header'>
                        <h3 className='m-0'>Додати друга до групового чату</h3>
                    </Fragment>

                    <Fragment key='body'>
                        <div id='add-friends'>
                        <p>Знайдіть друзів, ввівши їхні імена нижче</p>
                        <input
                            onInput={e => searchFriends(e)}
                            type='text'
                            placeholder='Пошук...'
                        />
                            <div id='suggestions'>
                                {
                                    suggestions.map(user => {
                                        return <div key={user.id} className='suggestion'>
                                            <p className='m-0'>{user.firstName} {user.lastName}</p>
                                            <button onClick={() => addNewFriend(user.id)}>ДОДАТИ</button>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </Fragment>
                </Modal>
            }
        </Fragment>
    )
}

export default ChatHeader
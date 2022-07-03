import React, { useEffect, useState } from 'react'
import ItemList from '../components/ItemList'
import RegisterLoginForm from '../components/RegisterLoginForm'
import { Button, notification } from 'antd'
import { register } from '../api'
import { loginUserSlice, logout } from '../redux/user'
import './ProductPage.scss'
import { useDispatch, useSelector } from 'react-redux'

const ProductPage = () => {
  const dispatch = useDispatch()
  const userDataLocal = useSelector(state => state.user.data)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const showModal = (value, hasRegister = false) => {
    setIsModalVisible(value)
    setIsRegister(hasRegister)
  }

  const onSubmit = (values) => {
    setIsModalVisible(false)
    isRegister
      ? register(values).then(() => {
          notification.open({
            message: 'SUCCESS:',
            description: `${values.email} is registered`,
          })
        }).catch(err => {
          notification.open({
            message: 'ERROR:',
            description: err?.response?.data?.error || 'There is something wrong, please try it again!',
          })
        })
      : dispatch(loginUserSlice(values)).then(res => {
          notification.open({
            message: 'SUCCESS:',
            description: `${values.email} is logged`,
          })
        }).catch(err => {
          notification.open({
            message: 'ERROR:',
            description: err?.response?.data?.error || 'There is something wrong, please try it again!',
          })
        })
  }

  const onCancel = () => {
    setIsModalVisible(false)
  }

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='product-page'>
      <h1>Klik Dokter Test</h1>
      {userDataLocal?.email
        ? <div className='product-page__welcome'>
            <span>Welcome: {userDataLocal.email}</span>
            <Button className='register-button' onClick={onLogout}>Log out</Button>
          </div>
        : <div className='register-login-button'>
            <Button className='register-button' onClick={() => showModal(true, true)}>Register</Button>
            <Button type="primary" onClick={() => showModal(true)}>Login</Button>
          </div>
      }
      <ItemList />
      <RegisterLoginForm isModalVisible={isModalVisible} isRegister={isRegister} onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  )
}

export default ProductPage

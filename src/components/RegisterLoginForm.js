import { Form, Input, Modal } from 'antd'
import React from 'react'

const RegisterLoginForm = ({ isModalVisible, isRegister = false, onSubmit, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={isModalVisible}
      title={isRegister ? 'Register Form' : 'Login Form'}
      okText={isRegister ? 'Register' : 'Login'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onSubmit(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: 'Please input your email!',
            },
          ]}
        >
          <Input autoComplete="new-email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RegisterLoginForm

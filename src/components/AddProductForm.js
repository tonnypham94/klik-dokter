import { Form, Input, Modal, InputNumber } from 'antd'
import React, { useEffect } from 'react'

const AddProductForm = ({ isModalVisible, isEdit = false, onSubmit, onCancel, values = {} }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    isEdit
      ? form.setFieldsValue(values)
      : form.resetFields()
  }, [values])

  return (
    <Modal
      visible={isModalVisible}
      title={isEdit ? 'Edit Product Form' : 'Add Product Form'}
      okText={isEdit ? 'Edit Product' : 'Add Product'}
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
      >
        <Form.Item
          label="Sku"
          name="sku"
          rules={[
            {
              required: true,
              message: 'Please input your sku!',
            },
          ]}
        >
          <Input autoComplete="new-sku" disabled={isEdit}/>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="product_name"
          rules={[
            {
              required: true,
              message: 'Please input your Product Name!',
            },
          ]}
        >
          <Input autoComplete="new-product_name" />
        </Form.Item>
        
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              message: 'Please input a number!',
            },
          ]}
        >
          <InputNumber autoComplete="new-price" />
        </Form.Item>
        
        <Form.Item
          label="unit"
          name="unit"
          rules={[
            {
              required: true,
              message: 'Please input your unit!',
            },
          ]}
        >
          <Input autoComplete="new-unit" />
        </Form.Item>
        
        <Form.Item
          label="Qty"
          name="qty"
          rules={[
            {
              required: true,
              type: "number",
              message: 'Please input a number!',
            },
          ]}
        >
          <InputNumber autoComplete="new-qty" />
        </Form.Item>
        
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              type: "number",
              message: 'Please input a number!',
            },
          ]}
        >
          <InputNumber autoComplete="new-status" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddProductForm

import React, { useEffect, useState } from 'react'
import { Input, Space, Button } from 'antd'
import AddProductForm from './AddProductForm'
import { getProducts, addProducts, deleteProduct, updateProducts, searchBySku } from '../api'
import './ItemList.scss'
import { useSelector } from 'react-redux'
import ConfirmationForm from './ConfirmationForm'

const { Search } = Input

const ItemList = () => {
  const userData = useSelector(state => state.user.data)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState()
  const [productList, setProductList] = useState([])

  const isDisableControl = !userData?.email

  const fetchProducts = () => {
    getProducts().then(res => {
      setProductList(res.data)
    })
  }

  const showModal = (value) => {
    setIsModalVisible(value)
  }

  const onShowAddModal = () => {
    setIsModalVisible(true)
    setSelectedProduct({})
    setIsEdit(false)
  }

  const onShowEditModal = (item) => {
    setIsModalVisible(true)
    setIsEdit(true)
    setSelectedProduct(item)
  }

  const onSubmit = (values) => {
    setIsModalVisible(false)
    isEdit ? updateProducts(values, userData?.token).then(fetchProducts) : addProducts(values, userData?.token).then(fetchProducts)
  }

  const onCancel = () => {
    setIsModalVisible(false)
    setIsEdit(false)
  }

  const onShowDeleteModal = (item) => () => {
    setSelectedProduct(item)
    setIsDelete(true)
  }

  const handleCancelDelete = () => {
    setIsDelete(false)
  }

  const handleSubmitDelete = () => {
    setIsDelete(false)
    deleteProduct(selectedProduct, userData?.token).then(fetchProducts)
  }

  const onSearch = (searchString) => {
    if (searchString) {
      searchBySku(searchString, userData?.token).then(res => {
        setProductList([res.data])
      })
    } else {
      fetchProducts()
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='product-list'>
      <div className='product-list__search'>
        <Space direction="vertical">
          <Search
            placeholder="Search by SKU"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            disabled={isDisableControl}
          />
        </Space>
        <Button type="primary" onClick={onShowAddModal} style={{ height: 40 }} disabled={isDisableControl}>Add Product</Button>
      </div>
      <div className='product-list__items'>
        <div className='items__title'>
          <div className='items__title-sku'>SKU</div>
          <div className='items__title-product-name'>Product Name</div>
          <div className='items__title-action'>Action</div>
        </div>
        {productList.map((item) => {
          return (
            <div className='items__content' key={item.id}>
              <div className='items__content-sku'>{item.sku}</div>
              <div className='items__content-product-name'>{item.product_name}</div>
              <div className='items__content-action'>
                <Button onClick={() => showModal(true)} onClick={() => onShowEditModal(item)} disabled={isDisableControl}>Edit</Button>
                <Button className='delete-button' onClick={onShowDeleteModal(item)} disabled={isDisableControl}>Delete</Button>
              </div>
            </div>
          )
        })}
      </div>
      <AddProductForm isModalVisible={isModalVisible} onSubmit={onSubmit} onCancel={onCancel} values={selectedProduct} isEdit={isEdit} />
      <ConfirmationForm
        isDelete={isDelete}
        title='Delete Product'
        content='Do you wish to delete this product?'
        handleOk={handleSubmitDelete}
        handleCancel={handleCancelDelete}
      />
    </div>
  )
}

export default ItemList

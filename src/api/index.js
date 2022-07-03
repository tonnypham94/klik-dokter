import axios from 'axios'

// Auth
export const register = (values) => {
  const bodyFormData = new FormData()
  bodyFormData.append('email', values.email)
  bodyFormData.append('password', values.password)

  return axios({
    method: "post",
    url: "https://hoodwink.medkomtek.net/api/register",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export const login = (values) => {
  const bodyFormData = new FormData()
  bodyFormData.append('email', values.email)
  bodyFormData.append('password', values.password)

  return axios({
    method: "post",
    url: "https://hoodwink.medkomtek.net/api/auth/login",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
}

// Product
export const getProducts = () => axios.get('https://hoodwink.medkomtek.net/api/items')
export const addProducts = (values, token) => {
  const bodyFormData = new FormData()
  bodyFormData.append('sku', values.sku)
  bodyFormData.append('price', values.price)
  bodyFormData.append('unit', values.unit)
  bodyFormData.append('status', values.status)
  bodyFormData.append('product_name', values.product_name)
  bodyFormData.append('qty', values.qty)

  return axios({
    method: "post",
    url: "https://hoodwink.medkomtek.net/api/item/add",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  })
}
export const updateProducts = (values, token) => {
  const bodyFormData = new FormData()
  bodyFormData.append('sku', values.sku)
  bodyFormData.append('price', values.price)
  bodyFormData.append('unit', values.unit)
  bodyFormData.append('status', values.status)
  bodyFormData.append('product_name', values.product_name)
  bodyFormData.append('qty', values.qty)

  return axios({
    method: "post",
    url: "https://hoodwink.medkomtek.net/api/item/update",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  })
}
export const deleteProduct = (values, token) => {
  const bodyFormData = new FormData()
  bodyFormData.append('sku', values.sku)

  return axios({
    method: "post",
    url: "https://hoodwink.medkomtek.net/api/item/delete",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  })
}
export const searchBySku = (sku, token) => {
  const bodyFormData = new FormData()
  bodyFormData.append('sku', sku)

  return axios({
    method: "post",
    url: "https://hoodwink.medkomtek.net/api/item/search",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  })
}

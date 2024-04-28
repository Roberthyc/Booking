import { sessionStorage } from '@/utils/storage'

export default async function fetchData(url, method = 'get', body = {}) {
  if (method === 'get') {
    return await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.get('token')
        // 设置请求头为 JSON
        // 其他请求头，如果有的话
      }
    })
      .then(
        (response) => response
        // 解析响应体为 JSON
      )
      .catch((error) => {
        console.error('There was an error!', error)
      })
  } else if (method === 'post') {
    return await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.get('token')
        // 设置请求头为 JSON
        // 其他请求头，如果有的话
      },
      body: JSON.stringify({
        ...body
      }) // 将数据转换为 JSON 字符串并作为请求体发送
    })
      .then(
        (response) => response.json()
        // 解析响应体为 JSON
      )
      .then((data) => {
        console.log(data)
        return data
        // 解析响应体为 JSON
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }
}

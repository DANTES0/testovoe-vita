import type UserBlogType from '../types/UserBlogType'

async function findAllUserInfo() {
  try {
    const response = await fetch('/api/userInfo/findAll', {
      method: 'GET',
      credentials: 'include',
    })

    if (response.ok) {
      let data = await response.json()
      return data
    } else {
      console.error('Ошибка получения пользователей')
    }
  } catch (error) {
    throw new Error(`Ошибка запроса: ${error}`)
  }
}

async function findUserById(id: number) {
  let allUser = await findAllUserInfo()
  return allUser.find((user: UserBlogType) => user.id === id)
}

export { findAllUserInfo, findUserById }

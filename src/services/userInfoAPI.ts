import type UserBlogType from '../types/UserBlogType'

async function findAllUserInfo() {
  try {
    const response = await fetch('/FrontTestingService-back/userInfo/findAll', {
      method: 'GET',
      credentials: 'include',
    })

    if (response.ok) {
      let data = await response.json()
      return data
    }
  } catch (error) {
    console.error(error)
  }
}

async function findUserById(id: number) {
  let allUser = await findAllUserInfo()
  return allUser.find((user: UserBlogType) => user.id === id)
}

export { findAllUserInfo, findUserById }

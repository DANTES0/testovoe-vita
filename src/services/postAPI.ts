import type PostType from '../types/PostType'

async function findPostById(id: number) {
  try {
    const response = await fetch(`/FrontTestingService-back/post/${id}`, {
      method: 'GET',
      credentials: 'include',
    })

    let data: PostType = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export { findPostById }

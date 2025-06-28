import type PostType from '../types/PostType'

interface PostDataType {
  id?: number
  title: string
  briefDescription: string
  fullDescription: string
}
async function findPostById(id: number) {
  try {
    const response = await fetch(`/api/post/${id}`, {
      method: 'GET',
      credentials: 'include',
    })

    let data: PostType = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

async function updatePost(postData: PostDataType) {
  try {
    const response = await fetch('/api/post', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      console.error('Не удалось обновить статью')
    }
  } catch (error) {
    throw new Error(`Ошиибка обновления: ${error}`)
  }
}

async function addPost(postData: PostDataType, userInfoId: number) {
  try {
    const response = await fetch(`/api/post?userInfoId=${userInfoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      console.error('Не удалось обновить статью')
    }
  } catch (error) {
    throw new Error(`Ошиибка обновления: ${error}`)
  }
}

async function deletePost(postId: number) {
  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      console.error('Не удалось удалить статью')
    }
  } catch (error) {
    throw new Error(`Ошиибка удаления: ${error}`)
  }
}

export { findPostById, updatePost, addPost, deletePost }

import type CommentType from '../types/CommentsType'

async function addComment(comment: CommentType, postId: number) {
  try {
    const response = await fetch(`/api/comment?postId=${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
    if (!response.ok) {
      console.error('Ошибка добавления комментария')
    }
  } catch (error) {
    throw new Error(`Ошибка: ${error}`)
  }
}
async function deleteComment(commentId: number) {
  try {
    const response = await fetch(`/api/comment/${commentId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      console.error('Ошибка удаления комментария')
    }
  } catch (error) {
    throw new Error(`Ошибка: ${error}`)
  }
}
export { addComment, deleteComment }

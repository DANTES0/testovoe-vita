import type CommentType from '../types/CommentsType'

async function addComment(comment: CommentType, postId: number) {
  try {
    const response = await fetch(`/FrontTestingService-back/comment?postId=${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
    if (response.ok) {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}

export { addComment }

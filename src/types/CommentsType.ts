export default interface CommentsType {
  comments: {
    datetime: string
    email: string
    id: number
    textComment: string
    userInfo: string
  }[]
}

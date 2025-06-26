import type CommentsType from './CommentsType'
export default interface PostType {
  id: number
  dateTime: string
  title: string
  briefDescription: string
  fullDescription: string
  comments: CommentsType[]
}

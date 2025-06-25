import type CommentsType from './CommentsType'

export default interface PostType extends CommentsType {
  briefDescription: string
  dateTime: string
  fullDescription: string
  id: number
  title: string
  userInfoId: number
}

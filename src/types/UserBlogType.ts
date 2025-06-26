import type PostType from './PostType'

export default interface UserBlogType {
  id: number
  fullName: string
  blogName: string
  post: PostType[]
}

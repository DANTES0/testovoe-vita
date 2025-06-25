import type PostType from './PostType'

export default interface UserBlogType extends PostType {
  blogName: string
  fullName: string
  id: number
}

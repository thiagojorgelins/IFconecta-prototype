import { User } from "./User.model"

export interface Post {
  id: number
  author: Creator
  category: string
  createdAt: string
  title: string
  subtitle: string
  content: string
  postImage: string
  postViews: number
}

interface Creator {
  name: string
}
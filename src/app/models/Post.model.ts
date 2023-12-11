export interface Post {
  id: number
  authorName: string
  category: string
  createdAt: string
  title: string
  subtitle: string
  content: string
  postImage: string
  authorId: number
  comments?: [{text: string, authorName: string}]
}
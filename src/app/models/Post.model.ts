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
  comments?: [{content: string, author: Author, createdAt: string}]
}

export interface Author{
  name: string
  userImage: string
}
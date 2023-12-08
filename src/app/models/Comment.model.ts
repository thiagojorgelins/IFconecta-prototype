export interface Comment {
  postId: number
  commentId: number
  creator: Creator
  createdAt: string
  content: string
}

interface Creator {
  userId: number
  name: string
  email: string
}

export interface SingUpData {
  password: string;
  email: string;
  username: string;
}

export interface SingInData {
  username?: string;
  email?: string;
  password: string;
}

export interface PostData {
  content: string;
  parentId?: string;
  images?: File[];
}

export interface Post {
  id: string;
  content: string;
  parentId?: string;
  images?: string[];
  createdAt: Date;
  authorId: string;
  author: Author;
  qtyComments: number;
  qtyLikes: number;
  qtyRetweets: number;
  liked: boolean;
  retweeted: boolean;
}

export interface Reaction {
  id: string;
  type: string;
  createdAt: Date;
  userId: string;
  postId: string;
  updatedAt: Date;
  deletedAt?: Date;
}
export interface Author {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt?: Date;
  isFollowing?: boolean;
}

export interface User {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt: Date;
  followers: Author[];
  following: Author[];
  posts: Post[];
  isFollowing?: boolean;
}

export interface MessageDTO {
  id: string;
  content: string;
  createdAt: Date;
  chatId: string;
  senderId: string;
  sender: Author;
}

export interface ChatDTO {
  id: string;
  users: Author[];
  messages: MessageDTO[];
}

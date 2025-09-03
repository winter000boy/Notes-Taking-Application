export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

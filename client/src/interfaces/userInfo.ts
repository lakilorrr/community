
export interface IuserInfo {
  id: number;
  name: string;
  avatar: string;
  role: 'root' | 'operator' | 'user' | 'guest';
}

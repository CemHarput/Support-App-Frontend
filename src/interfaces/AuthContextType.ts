import { User } from "./User";

export interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

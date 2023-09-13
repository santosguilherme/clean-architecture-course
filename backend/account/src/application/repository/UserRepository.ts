import User from "../../domain/User";

export default interface UserRepository {
  save(user: User): Promise<void>;
  getByEmail(email: string): Promise<User>;
}
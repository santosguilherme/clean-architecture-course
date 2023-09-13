import PBKDF2Password from "./PBKDF2Password";
import SHA1Password from "./SHA1Password";
import PlainPassword from "./PlainPassword";

export default class PasswordFactory {
  static create(passwordType: string) {
    if (passwordType === "plain") {
      return PlainPassword;
    }
    if (passwordType === "sha1") {
      return SHA1Password;
    }
    if (passwordType === "pbkdf2") {
      return PBKDF2Password;
    }
    throw new Error("Invalid type");
  }
}
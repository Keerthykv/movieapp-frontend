export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public loginId:string,
    public password: string,
    public confirmPassword:string,
    public contactNumber:string
  ) {}
}

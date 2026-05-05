export class Buyer {
  private payment: Payment | null = null;
  private address: string = '';
  private email: string = ''
  private phone: string = ''

  constructor() {}

  saveUserData() {}
  resetUserData() {}
  getUserData(): IBuyer {}
  checkUserData() {}
}
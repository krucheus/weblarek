import { IBuyer, validationErrors } from "../../../types";

export class Buyer {
  private payment: "card" | "cash" | "" = "";
  private address: string = '';
  private email: string = ''
  private phone: string = ''

  constructor() {}

  saveUserData(data: IBuyer) {
    this.payment = data.payment
    this.address = data.address
    this.email = data.email
    this.phone = data.phone
  }

  resetUserData() {
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
  }

  getUserData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone
    };
  }

  checkUserData(): validationErrors {
    const errors: validationErrors = {}
    if (this.address === '') {
      errors.address = 'Укажите адрес доставки'
    }

    if (!this.payment) {
      errors.payment = 'Выберите тип платежа'
    }

    if (this.email === '') {
      errors.email = 'Укажите e-mail'
    }

    if (this.phone === '') {
      errors.phone = 'Укажите телефон'
    }
    return errors
  }

}
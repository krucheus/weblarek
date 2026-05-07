import { Payment, IBuyer, validationErrors } from "../../types";

export class Buyer {
  private payment: Payment | null = null;
  private address: string = '';
  private email: string = ''
  private phone: string = ''

  saveUserData(data: Partial<IBuyer>) { 
    if (data.payment) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.email !== undefined) this.email = data.email
    if (data.phone !== undefined) this.phone = data.phone
  }

  resetUserData() {
    this.payment = null;
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
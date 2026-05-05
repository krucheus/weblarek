import { IProduct } from "../../../types"

export class Basket {
  private listItems: IProduct[] = []

  constructor() {}

  getItemList(): IProduct[] {
    return this.listItems
  }

  clearBasket(): void {
    this.listItems = []
  }

  setItemBasket(item: IProduct) {
    if (!this.checkItemFromID(item.id)) {
      this.listItems.push(item)
    }
  }

  removeItemBasket(itemID: string) {
    const index = this.listItems.findIndex(item => item.id == itemID)
    if (index !== -1) {
      this.listItems.splice(index, 1)
    }
  } 

  getPriceList(): number {
    return this.listItems.reduce((total, item) => total + (item.price || 0), 0)
  }

  getCountItem(): number {
    return this.listItems.length
  }

  checkItemFromID(itemID: string): boolean {
    return this.listItems.some(item => item.id == itemID)
  }

}
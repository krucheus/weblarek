import { IProduct } from "../../types"

export class Catalog {
  private itemsList: IProduct[] = []
  private selectedItem: IProduct | null = null

  setItem(item: IProduct): void {
    this.selectedItem = item
  }

  getItem(): IProduct | null {
    return this.selectedItem
  }

  getItemFromID(itemID: string): IProduct | undefined {
    return this.itemsList.find(item => item.id === itemID)
  }

  getItemList(): IProduct[] {
    return this.itemsList
  }

  setItemList(items: IProduct[]): void {
    this.itemsList = items
  }
}
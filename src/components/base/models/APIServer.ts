import { IResultOrder, IOrder, IProduct } from '../../../types'
import { Api } from '../Api'

export class APIServer {
  api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getProducts(): Promise<IProduct[]> {
    const data = await this.api.get<{ items: IProduct[] }>(`/product`)
    return data.items
  }
  async postOrder(order: IOrder): Promise<IResultOrder> {
    const response = await this.api.post<IResultOrder>(
      `/order`,
      order,
      'POST',
    )
    return response
  }
}
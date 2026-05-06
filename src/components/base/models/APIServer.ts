import { IResultOrder, IOrder, IProduct, IApi } from '../../../types'

export class APIServer {
  api: IApi

  constructor(api: IApi) {
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
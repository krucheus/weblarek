import { IResultOrder, IOrder, IApi, IItemResponse } from '../../types'

export class APIServer {
  private api: IApi

  constructor(api: IApi) {
    this.api = api
  }

  async getProducts(): Promise<IItemResponse> {
    const data = await this.api.get<IItemResponse>(`/product`)
    return data
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
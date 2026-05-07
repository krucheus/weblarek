export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type Payment = 'card' | 'cash';

export interface IBuyer {
    payment: Payment | null;
    address: string;
    email: string;
    phone: string;
}

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string;
}

export interface IResultOrder {
  id: string;
  total: number;
}

export interface IOrder extends IBuyer {
  items: string[];
  total: number;
}

export interface IItemResponse {
  total: number;
  items: IProduct[];
}

export type validationErrors = Partial<Record<keyof IBuyer, string>>
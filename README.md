# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

#### Данные

**Интерфейс для учета товаров в приложении**
```
interface IProduct {
  уникальный номер товара
  id: string;

  название товара
  title: string;

  ссылка на изображение
  image: string;

  категория товара
  category: string;

  стоимость
  price: number | null;

  описание товара
  description: string;
}
```
**Интерфейс данных о покупателе**

```
interface IBuyer {
  способ оплаты - карта, наличные или отсутствует
  payment: "card" | "cash" | "";

  адрес доставки
  address: string;

  электронная почта
  email: string;

  номер мобильного телефона
  phone: string;
}
```

**Интерфейс IOrder**

```
interface IOrder extends IBuyer {
  поле, содержащее в себе массив ID товаров в заказе
  items: string[]

  количество товаров в заказе
  total: number
}
```

**Тип вида оплаты**

```
type Payment = 'card' | 'cash' - Тип, описывающий способ оплаты при заказе
```
**Тип validationErrors**

```
type validationErrors = Partial<Record<keyof IBuyer, string>> - тип, содержащий поле интерфейса IBuyer в качестве ключа и строку, сообщающую о причине непройденной валидации
```


#### Модели данных

**Классы**
```
class Catalog {

  private itemsList: IProduct[] = [] - // массив товаров
  private selectedItem: IProduct - // выбранный товар

  setItem(item: IProduct) - сохранение товара для подробного отображения
  getItem(): IProduct - получение товара для подробного отображения
  getItemFromID(itemID: string): IProduct - получение одного товара по его ID
  getItemList(): IProduct[] - получение массива товаров
  setItemList(items: IProduct[]) - сохранение массива товаров
}
```

```
class Basket {

  getItemList() - получение массива товаров в корзине
  clearBasket() - очистка корзины
  setItemBasket() - добавление товара в корзину
  removeItemBasket() - удаление товара из корзины
  getPriceList() - получение стоимости всех товаров в корзине
  getCountItem() - получение количества товаров в корзине
  checkItemByID() - проверка наличия товара в корзине по его ID
}
```

```
class Buyer {
  private payment: "card" | "cash" | "" - вид оплаты
  private address: string - данные об адресе доставки
  private email: string - электронная почта покупателя
  private phone: string - номер телефона покупателя

  saveUserData() - сохранение данных пользователя в модели. Можно сохранить выборочные данные (одно значение)
  resetUserData() - очистка данных покупателя
  getUserData() - получение данных покупателя
  checkUserData() - валидация данных пользователя
}
```

#### Слой коммуникации

Класс Api для выполнения запроса на сервер и получения объекта с массивом товаров

```
class APIServer {
  api: IApi

  constructor(api: IApi) - конструктор принимает интерфейс IApi

  async getProducts() - метод для получения массива товаров с сервера
  async postOrder() - метод размещения заказа на сервере
}
```

#### Слой представления (View)

```
class ViewHeader {
  constructor(events: IEvents, container: HTMLElement)

  events: IEvents - события-слушатели
  container: HTMLElement - DOM-элемент компонента
  counterElement: HTMLElement - счетчик количества товаров в корзине
  basketButton: HTMLButtonElement - ссылка на кнопку, открывающую корзину

  set counter(value: number) - сеттер, отображающий количество товаров в корзине возле иконки
}
```

```
class ViewGallery {
  constructor(events: IEvents, container: HTMLElement)

  events: IEvents - события-слушатели
  container: HTMLElement - DOM-элемент компонента
  catalogElement: HTMLElement - каталог товаров

  set catalog(items: HTMLElement[]) - сеттер, отображающий каталог (список) товаров на странице
}
```

```
class ViewModal {
  constructor(events: IEvents, container: HTMLElement)

  events: IEvents - события-слушатели
  container: HTMLElement - DOM-элемент компонента
  contentElement: HTMLElement - контент модального окна
  closeButton: HTMLButtonElement - поле класса со ссылкой на кнопку, закрывающее модальное окно

  set content(item: HTMLElement | '') - сеттер, устанавливающий контент модального окна
  close() - метод для закрытия модального окна
}
```

```
class Card {
  constructor(container: HTMLElement)

  container: HTMLElement - DOM-элемент компонента
  titleElement: HTMLElement - DOM-элемент названия карточки товара
  priceElement: HTMLElement - DOM-элемент цены в карточке товара

  set title(value: string) - сеттер, устанавливающий название товара
  set price(value: string) - сеттер, устанавливающий цену товара
}
```

```
class CardBasket {
  constructor(events: IEvents, container: HTMLElement, actions?: ICardActions)

  events: IEvents - события-слушатели
  container: HTMLElement - DOM-элемент компонента
  actions?: ICardActions
  deleteButtonElement: HTMLButtonElement - DOM-элемент кнопки удаления товара из корзины
  indexElement: HTMLSpanElement - номер товара в корзине

  set index(value: number) - сеттер, устанавливающий номер товара в корзине
}
```

```
class CardCatalog {
  constructor(container: HTMLElement, actions?: ICardActions)

  container: HTMLElement - DOM-элемент компонента
  actions?: ICardActions
  categoryElement: HTMLSpanElement - DOM-элемент категории товара
  imageElement: HTMLImageElement - DOM-элемент изображения товара

  set category(value: string) - сеттер, устанавливающий категорию товара
  set image(value: string) - сеттер, устанавливающий изображение товара
}
```

```
class CardPreview {
  constructor()

  container: HTMLElement - DOM-элемент компонента
  actions?: ICardActions
  descriptionElement: HTMLParagraphElement - DOM-элемент описания товара
  addButtonElement: HTMLButtonElement - DOM-элемент кнопки добавления товара в корзину
  categoryElement: HTMLSpanElement - DOM-элемент категории товара
  imageElement: HTMLImageElement - DOM-элемент изображения товара

  set category(value: string) - сеттер, устанавливающий категорию товара
  set image(value: string) - сеттер, устанавливающий изображение товара
  set price(value: string) - сеттер, устанавливающий стоимость товара
}
```

```
class FormBasket {
  constructor(events: IEvents, container: HTMLElement, actions?: ICardActions)

  container: HTMLElement - DOM-элемент компонента
  events: IEvents - события-слушатели
  actions?: ICardActions
  basketElement: HTMLElement - DOM-элемент корзины
  submitButtomElement: HTMLButtonElement - кнопка подтверждения заказа
  totalElement: HTMLSpanElement - DOM-элемент общей стоимости заказа

  set basket(items: HTMLElement[]) - сеттер, устанавливающий список заказанных товаров
  set total(value: string) - сеттер, устанавливающий сумму заказа
  setButtonNext(isDisabled: boolean) - метод, отвечающий за возможность перехода на следующий этап оформления заказа
}
```

```
class FormContacts {
  constructor(events: IEvents, container: HTMLElement, actions?: ICardActions)

  container: HTMLElement - DOM-элемент компонента
  events: IEvents - события-слушатели
  actions?: ICardActions
  emailElement: HTMLInputElement - DOM-элемент поля формы с электронной почтой
  phoneELement: HTMLInputELement - DOM-элемент поля формы с номером телефона

  set email(value: string) - сеттер, устаналивающий электронную почту покупателя
  set phone(value: string) - сеттер, устаналивающий номер телефона покупателя
}
```

```
class FormOrder {
  constructor(events: IEvents, container: HTMLElement, actions?: ICardActions)

  container: HTMLElement - DOM-элемент компонента
  events: IEvents - события-слушатели
  actions?: ICardActions
  cardPay: HTMLButtonElement - DOM-элемент поля формы с безналичной оплатой
  cashPay: HTMLButtonElement - DOM-элемент поля формы с наличной оплатой
  addressElement: HTMLInputElement - DOM-элемент поля формы с адресом

  setCash() - метод, отвечающий за выбор способа оплаты наличными
  setCard() - метод, отвечающий за выбор способа оплаты картой
}
```

```
class FormSuccess {
  constructor(events: IEvents, container: HTMLELement)

  container: HTMLElement - DOM-элемент компонента
  events: IEvents - события-слушатели
  descriptionElement: HTMLParagraphElement - DOM-элемент стоимости заказа
  newOrderButton: HTMLButtonElement - DOM-элемент кнопки оформления нового заказа

  set totalPrice - сеттер, устаналивающий стоимость заказа
}
```
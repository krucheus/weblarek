import './scss/styles.scss';
import { Basket } from './components/models/basket';
import { Catalog } from './components/models/catalog';
import { Buyer } from './components/models/buyer';
import { apiProducts } from './utils/data';
import { API_URL, CDN_URL } from './utils/constants'
import { IItemResponse, IProduct } from './types';
import { Api } from './components/base/Api';
import { APIServer } from './components/models/APIServer';
import { ViewHeader } from './components/view/ViewHeader';
import { EventEmitter } from './components/base/Events';
import { Card } from './components/view/Card';
import { validationErrors, IBuyer } from './types';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardBasket } from './components/view/CardBasket';
import { CardPreview } from './components/view/CardPreview';
import { CardCatalog } from './components/view/CardCatalog';
import { ViewGallery } from './components/view/ViewGallery';

const checkClassCatalog = new Catalog()
const checkClassBasket = new Basket()
const checkClassBuyer = new Buyer()

/* Проверка методов класса Catalog */

checkClassCatalog.setItemList(apiProducts.items);

console.log('Массив товаров из каталога:', checkClassCatalog.getItemList());
console.log(`Количество товаров: ${checkClassCatalog.getItemList().length}`);

const firstItem = checkClassCatalog.getItemList()[0];
if (firstItem) {
  checkClassCatalog.setItem(checkClassCatalog.getItemList()[0]);
  console.log('Выбранный товар:', checkClassCatalog.getItem());
  
  const foundItem = checkClassCatalog.getItemFromID(firstItem.id);
  console.log('Товар с выбранным ID:', foundItem);
}

/* Проверка методов класса Basket */

checkClassBasket.setItemBasket(checkClassCatalog.getItemList()[0]);
checkClassBasket.setItemBasket(checkClassCatalog.getItemList()[1]);

console.log('Товары в корзине изначально:', checkClassBasket.getItemList());
console.log('Количество товаров изначально:', checkClassBasket.getCountItem());
console.log('Стоимость товаров:', checkClassBasket.getPriceList());

const removeItem = checkClassCatalog.getItemList()[1];
checkClassBasket.removeItemBasket(removeItem.id);
console.log('Количество товаров после удаления одного товара:', checkClassBasket.getCountItem());

checkClassBasket.clearBasket();
console.log('Товары в корзине после очистки:', checkClassBasket.getItemList());

/* Проверка методов класса Buyer */

checkClassBuyer.saveUserData({
  address: 'Архангельск, улица Галушина, 28',
  payment: 'cash',
  email: 'egor.yap@yandex.ru',
  phone: '+79600156960'
})

console.log('Данные о покупателе:', checkClassBuyer.getUserData())
console.log('Ошибки в полях ввода:', checkClassBuyer.checkUserData())

checkClassBuyer.resetUserData()
console.log('Данные покупателя после сброса:', checkClassBuyer.getUserData())
console.log('Ошибки в полях ввода после сброса:', checkClassBuyer.checkUserData())

/* Получение данных с API */

const api = new Api(API_URL);
const apiServer = new APIServer(api);

apiServer.getProducts()
  .then((products: IItemResponse) => {
    checkClassCatalog.setItemList(products.items);

    console.log('Товары из каталога:', checkClassCatalog.getItemList());
  })
  .catch(error => {
    console.log('Ошибка про получении товаров из каталога', error)
  });



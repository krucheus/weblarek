import './scss/styles.scss';
import { Basket } from './components/base/models/basket';
import { Catalog } from './components/base/models/catalog';
import { Buyer } from './components/base/models/buyer';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

const checkClassBasket = new Basket()
const checkClassCatalog = new Catalog()
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

console.log('Товары в корзине:', checkClassBasket.getItemList());
console.log('Количество товаров:', checkClassBasket.getCountItem());
console.log('Стоимость товаров:', checkClassBasket.getPriceList());

const removeItem = checkClassCatalog.getItemList()[1];
checkClassBasket.removeItemBasket(removeItem.id);
console.log('Количество товаров:', checkClassBasket.getCountItem());

checkClassBasket.clearBasket();
console.log('Товары в корзине:', checkClassBasket.getItemList());

/* Проверка методов класса Buyer */

checkClassBuyer.saveUserData({
  address: 'Arkhangelsk, Galushina street 28',
  payment: 'cash',
  email: 'egor.yap@yandex.ru',
  phone: '+79600156960'
})

console.log('Данные о покупателе:', checkClassBuyer.getUserData())
console.log('Ошибки в полях ввода:', checkClassBuyer.checkUserData())

checkClassBuyer.resetUserData()
console.log('Данные покупателя после сброса:', checkClassBuyer.getUserData())
console.log('Ошибки в полях ввода после сброса:', checkClassBuyer.checkUserData())

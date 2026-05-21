import { ensureElement } from "../../utils/utils";
import { Card, ICard } from "./Card";
import { categoryMap } from "../../utils/constants";
import { ICardActions } from "./CardBasket";

export type TCardPreview = Pick<ICard, 'category' | 'title' | 'image' | 'price' | 'description' | 'added'>

export class CardPreview extends Card<TCardPreview> {
  imageElement: HTMLImageElement
  categoryElement: HTMLSpanElement
  addButtonElement: HTMLButtonElement
  descriptionElement: HTMLParagraphElement

  constructor(container: HTMLElement, actions?: ICardActions) {

    super(container)

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
    this.categoryElement = ensureElement<HTMLSpanElement>('.card__category', this.container)
    this.addButtonElement = ensureElement<HTMLButtonElement>('.card__button', this.container)
    this.descriptionElement = ensureElement<HTMLParagraphElement>('.card__text', this.container)

    if (actions?.onClick) {
      this.addButtonElement.addEventListener('click', actions.onClick)
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value
    const classList = ['card__category']
    const className = categoryMap[value as keyof typeof categoryMap]
    this.categoryElement.classList = [...classList, className].join('')
  }

  set price(value: number | null) {
    if (value === null) {
      this.addButtonElement.textContent = 'Недоступно'
      this.priceElement.textContent = 'Бесценно'
      this.addButtonElement.disabled = true
    } else {
      this.addButtonElement.disabled = false
      this.priceElement.textContent = `${value} синапсов`
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, `Image ${this.title}`)
  }

  set added(isAdded: boolean) {
    if (isAdded) {
      this.addButtonElement.textContent = 'Удалить из корзины'
    } else {
      this.addButtonElement.textContent = 'Купить'
    }
  }
}
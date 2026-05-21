import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, ICard } from "./Card";
import { ICardActions } from "./CardBasket";

export type TCardCatalog = Pick<ICard, 'image' | 'category' | 'title' | 'price'>

export class CardCatalog extends Card<TCardCatalog> {
  imageElement: HTMLImageElement
  categoryElement: HTMLSpanElement

  constructor(container: HTMLElement, actions?: ICardActions) {

    super(container)

    this.categoryElement = ensureElement<HTMLSpanElement>('.card__category', this.container)
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick)
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value
    const className = categoryMap[value as keyof typeof categoryMap]
    this.categoryElement.classList = `card__category ${className}`
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, `Image ${this.title}`)
  }
}
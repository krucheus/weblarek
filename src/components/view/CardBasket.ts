import { ensureElement } from "../../utils/utils";
import { Card, ICard } from "./Card";

export interface ICardActions {
  onClick(): void;
}

export type TBasketCard = Pick<ICard, 'index' | 'title' | 'price'>

export class CardBasket extends Card<TBasketCard> {
  buttonDelete: HTMLButtonElement
  indexElement: HTMLSpanElement

  constructor(container: HTMLElement, actions?: ICardActions) {

    super(container)

    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)
    this.indexElement = ensureElement<HTMLSpanElement>('.basket__item-index', this.container)

    if (actions?.onClick) {
      this.buttonDelete.addEventListener('click', actions.onClick)
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value)
  }
}
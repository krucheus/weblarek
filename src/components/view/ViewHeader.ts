import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IViewHeader {
  counter: number;
}

export class ViewHeader extends Component<IViewHeader> {
  counterElement: HTMLElement;
  basketButton: HTMLButtonElement;
  events: IEvents

  constructor(events: IEvents, container: HTMLElement) {

    super(container)

    this.events = events

    this.basketButton = ensureElement<HTMLButtonElement> ('.header__basket', this.container)
    this.counterElement = ensureElement<HTMLElement> ('.header__basket-counter', this.basketButton)

    this.basketButton.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value)
  }
}
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IViewGallery {
  catalog: HTMLElement[];
}

export class ViewGallery extends Component<IViewGallery> {
  catalogElement: HTMLElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(container)

    this.catalogElement = this.container
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren()
    items.forEach((item) => this.catalogElement.appendChild(item))
  }
}
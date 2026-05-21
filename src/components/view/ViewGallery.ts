import { Component } from "../base/Component";

interface IViewGallery {
  catalog: HTMLElement[]
}

export class ViewGallery extends Component<IViewGallery> {
  catalogElement: HTMLElement

  constructor(container: HTMLElement) {

    super(container)

    this.catalogElement = this.container
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren()
    items.forEach((item) => this.catalogElement.appendChild(item))
  }
}
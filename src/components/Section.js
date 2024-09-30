export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._rendereredItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._rendereredItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(method, element) {
    this._container[method](element);
  }
}

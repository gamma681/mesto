export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  addNewItem(element) {
    this._container.prepend(element);
  }

  renderer(userData) {
    this._container.innerHTML = '';
    this._renderedItems.forEach(item => {
      this._renderer(item, userData);
    });
  }

  setRenderedItems(data) {
    this._renderedItems = data;
  }

}
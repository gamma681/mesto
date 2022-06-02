import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(containerSelector) {
    super(containerSelector);
    this._pictureItem = this._popup.querySelector('.popup__picture');
    this._pictureText = this._popup.querySelector('.popup__picture-text');
  }

  open(name, link) {
    this._pictureText.alt = name;
    this._pictureText.textContent = name;
    this._pictureItem.src = link;

    super.open();
  }

}
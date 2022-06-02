export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    }
    this._handleOverlayClose = (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
      }
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleOverlayClose);
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());
  }

}
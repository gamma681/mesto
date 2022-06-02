import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ containerSelector, handleSubmit }) {
    super(containerSelector);
    this._handleSubmit = handleSubmit;
    this._formfield = this._popup.querySelector('.popup__formfield');
  }

  _getInputValues() {
    const popupInputList = this._popup.querySelectorAll('.popup__formfield-input');
    const data = {};
    popupInputList.forEach(input => data[input.name] = input.value);
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formfield.reset();
  }
  
}
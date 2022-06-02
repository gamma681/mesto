import Popup from "./Popup.js";

export default class PopupWithConfirmDelete extends Popup {
    constructor({ containerSelector, handleSubmit }) {
        super(containerSelector);
        this._handleSubmit = handleSubmit;
        this._formfield = this._popup.querySelector('.popup__formfield');
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._cardId);
        });
        super.setEventListeners();
    }

    open(item) {
        super.open();
        this._cardId = item;
    }

    close() {
        super.close();
        this._formfield.reset();
    }

}
export default class Card {
    constructor(data, cardSelector, { handleCardClick, handleCardDelete, handleCardLike, userData }) {
        this._name = data.name;
        this._link = data.link;
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._userData = userData;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector('.gallery__list')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.gallery__list-title').textContent = this._name;
        this._picture = this._element.querySelector('.gallery__list-image');
        this._picture.src = this._link;
        this._picture.alt = this._name;

        this._setEventListeners();
        this._setDeleteItem();
        this.setLike(this._data);

        return this._element;
    }

    _setDeleteItem() {
        if (this._userData._id !== this._data.owner._id) {
            this._element.querySelector('.gallery__delete-button').remove();
        }
    }

    checkLike() {
        const checkId = (item) => item._id == this._userData._id;
        const isLiked = this._data.likes.some(checkId);

        return isLiked;
    }

    setLike(data) {
        this._data = data;
        this._element.querySelector('.gallery__likes-count').textContent = this._data.likes.length;

        if (this.checkLike()) {
            this._element.querySelector('.gallery__like-button').classList.add('gallery__like-button_active');
        } else {
            this._element.querySelector('.gallery__like-button').classList.remove('gallery__like-button_active');
        }
    }

    _setEventListeners() {
        this._element.querySelector('.gallery__like-button').addEventListener('click', () => {
            this._handleCardLike(this._data._id);
        });
        this._element.querySelector('.gallery__delete-button').addEventListener('click', () => {
            this._handleCardDelete(this._element, this._data._id);
        });
        this._element.querySelector('.gallery__list-image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

}
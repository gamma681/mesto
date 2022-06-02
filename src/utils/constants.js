export const nameSelector = document.querySelector('.profile__title');
export const aboutSelector = document.querySelector('.profile__text');
export const avatarSelector = document.querySelector('.profile__image');

export const popupEdit = '.popup_reduction-window';
export const popupEditAvatar = '.popup_download-avatar';
export const pupupInitialCards = '.popup_initial-cards-window';
export const popupDelete = '.popup_delete-cofirm';

export const reductionButton = document.querySelector('.profile__reduction-button');
export const editAvatarButton = document.querySelector('.profile__image-edit');
export const addCardButton = document.querySelector('.profile__add-button');

export const formfieldProfile = document.querySelector('.popup__formfield_profile');
export const formfieldAvatar = document.querySelector('.popup__formfield_download-avatar');
export const formfieldPlace = document.querySelector('.popup__formfield_add-card');

export const inputName = formfieldProfile.querySelector('.popup__formfield-input_name');
export const inputJob = formfieldProfile.querySelector('.popup__formfield-input_job');
export const inputAvatar = formfieldAvatar.querySelector('.popup__formfield-input_avatar');

export const cardsContainer = '.gallery__lists';

export const validationConfig = {
  formSelector: '.popup__formfield',
  inputSelector: '.popup__formfield-input',
  inputInvalidClass: 'popup__formfield-input_error',
  submitButtonSelector: '.popup__save-button',
  buttonInvalidClass: 'popup__save-button_invalid'
};
//styles
import './index.css';

//scripts
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmDelete from '../components/PopupWithConfirmDelete.js';

//constants
import {
  nameSelector,
  aboutSelector,
  avatarSelector,
  popupEdit,
  popupEditAvatar,
  pupupInitialCards,
  popupDelete,
  reductionButton,
  editAvatarButton,
  addCardButton,
  inputName,
  inputJob,
  inputAvatar,
  cardsContainer,
  validationConfig
} from '../utils/constants.js';

//extra functions
function toLoad(popup, loading) {
  const saveLoadingButton = document.querySelector(popup).querySelector('.popup__save-button');

  if (loading) {
    saveLoadingButton.textContent = 'Загрузка…';
  }
  else {
    saveLoadingButton.textContent = 'Сохранить';
  }
}

//card
function createCard(data, cardSelector, userData) {
  const card = new Card(
    data,
    cardSelector,
    {
      handleCardClick: (name, link) => {
        popupBigPicture.open(name, link);
      },
      handleCardDelete: (element, cardId) => {
        deleteCardPopup.open({ element, cardId });
      },
      handleCardLike: (cardId) => {
        if (card.checkLike()) {
          api.deleteLike(cardId)
            .then((data) => {
              card.setLike(data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          api.addLike(cardId)
            .then((data) => {
              card.setLike(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      userData: userData
    });
  return card;
};

//classes
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    "Content-Type": "application/json",
    authorization: "3b5720a2-0d91-4d09-b4f0-91da5b71591f",
  },
});

const userInfo = new UserInfo({ nameSelector, aboutSelector, avatarSelector });

const popupBigPicture = new PopupWithImage('.popup_big-window-picture');

const profileValidation = new FormValidator(validationConfig, '.popup__formfield_profile');
const avatarValidation = new FormValidator(validationConfig, '.popup__formfield_download-avatar');
const placeValidation = new FormValidator(validationConfig, '.popup__formfield_add-card');

const profileEditPopup = new PopupWithForm({
  containerSelector: popupEdit,
  handleSubmit: (input) => {
    toLoad(popupEdit, true);
    api.editUserInfo({
      name: input['name-input'],
      about: input['about']
    })
      .then(data => {
        userInfo.setUserInfo(data._id, data.name, data.about, data.avatar);
        profileEditPopup.close();
        toLoad(popupEdit, false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        toLoad(popupEdit, false);
      });
  }
});

const avatarEditPopup = new PopupWithForm({
  containerSelector: popupEditAvatar,
  handleSubmit: (input) => {
    toLoad(popupEditAvatar, true);
    api.editAvatar(input['place-avatar'])
      .then(data => {
        userInfo.setUserInfo(data._id, data.name, data.about, data.avatar);
        avatarEditPopup.close();
        toLoad(popupEditAvatar, false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        toLoad(popupEditAvatar, false);
      });
  }
});

const addCardPopup = new PopupWithForm({
  containerSelector: pupupInitialCards,
  handleSubmit: (input) => {
    toLoad(pupupInitialCards, true);
    api.addPlaceCard({
      name: input['place-input'],
      link: input['place-link']
    })
      .then(data => {
        const card = createCard(data, '#temp', userInfo.getUserInfo());
        const cardElement = card.generateCard();
        cardList.addNewItem(cardElement);
        toLoad(pupupInitialCards, false);
        addCardPopup.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        toLoad(pupupInitialCards, false);
      });
  }
});

const deleteCardPopup = new PopupWithConfirmDelete({
  containerSelector: popupDelete,
  handleSubmit: ({ element, cardId }) => {
    api.deletePlaceCard(cardId)
      .then(() => {
        element.remove();
        deleteCardPopup.close();
      })
      .catch((error) => {
        console.log(error);
      })
  }
});

const cardList = new Section({
  data: {},
  renderer: (item, userData) => {
    const card = createCard(item, '#temp', userData);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardsContainer);

//promise
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initalCards, userResult]) => {
    userInfo.setUserInfo(userResult._id, userResult.name, userResult.about, userResult.avatar);
    cardList.setRenderedItems(initalCards);
    cardList.renderer(userResult);
  })
  .catch((error) => {
    console.log(error);
  });

//buttons
reductionButton.addEventListener('click', () => {
  profileEditPopup.open();
  inputName.value = userInfo.getUserInfo().nameSelector;
  inputJob.value = userInfo.getUserInfo().aboutSelector;
  profileValidation.toResetValididation();
});

editAvatarButton.addEventListener('click', () => {
  avatarEditPopup.open();
  inputAvatar.value = userInfo.getUserInfo().avatarSelector.src;
  avatarValidation.toResetValididation();
})

addCardButton.addEventListener('click', () => {
  addCardPopup.open();
  placeValidation.toResetValididation();
});

//event listeners
addCardPopup.setEventListeners();
profileEditPopup.setEventListeners();
avatarEditPopup.setEventListeners();
deleteCardPopup.setEventListeners();
popupBigPicture.setEventListeners();

//validation
profileValidation.enableValidation();
avatarValidation.enableValidation();
placeValidation.enableValidation();
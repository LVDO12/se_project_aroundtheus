// import
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import ProfilePicEvt from "../components/ProfilePicEvt.js";
import {
  config,
  editProfileButton,
  editProfilePictureButton,
  addCardButton,
  profilePicture,
} from "../utils/constants.js";
import { api } from "../components/Api.js";
let gallery;
//Add Card Popup Form
const addCardPopupForm = new PopupWithForm("#add-card-modal", {
  handleSubmitEvent: (inputValues) => {
    addCardPopupForm.renderLoading(true);
    api
      .addCard(inputValues)
      .then((inputValues) => {
        const cardElement = createCard(inputValues);
        gallery.addItem(`prepend`, cardElement);
        addCardPopupForm.renderLoading(false);
      })
      .catch((err) => {
        console.log(err);
        addCardPopupForm.renderLoading(false);
      });
    addCardPopupForm.form.reset();
  },
});
// Edit Popup Form
const editPopupForm = new PopupWithForm("#edit-profile-modal", {
  handleSubmitEvent: (inputValues) => {
    editPopupForm.renderLoading(true);
    api
      .updateUserInfo(inputValues)
      .then((inputValues) => {
        userInfo.setUserInfo({
          name: inputValues.name,
          job: inputValues.about,
        });
        editPopupForm.renderLoading(false);
      })
      .catch((err) => {
        console.log(err);
        editPopupForm.renderLoading(false);
      });
  },
});
const nameInput = editPopupForm.form.querySelector('input[name="name"]');
const jobInput = editPopupForm.form.querySelector('input[name="bio"]');
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__bio",
  ".profile__picture__image"
);
// Edit profile popup form
const editProfilePictureForm = new PopupWithForm(
  "#edit-profile-picture-modal",
  {
    handleSubmitEvent: (inputValues) => {
      api
        .updateUserPic(inputValues)
        .then((data) => {
          userInfo.setUserPic({ avatar: data.avatar });
          editProfilePictureForm.renderLoading(true);
        })
        .catch((err) => {
          console.log(err);
          editProfilePictureForm.renderLoading(false);
        });
    },
  }
);

const profilePictureEvent = new ProfilePicEvt(profilePicture);
profilePictureEvent.addEventListener();
// Image Review Popup
const popupWithImage = new PopupWithImage("#open-image-modal");
//Validator
const formValidators = {};
//
// function
//
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute(`name`);
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const handleImageClick = (data) => {
  popupWithImage.open(data.link, data.name);
};

const createCard = (data) => {
  const cardElement = new Card(
    data,
    "#card-template",
    handleImageClick
  ).generateCard();
  return cardElement;
};
//
userInfo.fetchAndSetUserInfo();

api.getInitialCards().then((initialCards) => {
  gallery = new Section(
    {
      data: initialCards,
      renderer: (item) => {
        const cardElement = createCard(item);
        gallery.addItem(`append`, cardElement);
      },
    },
    ".gallery__list"
  );
  gallery.renderItems();
});
// Edit profile modal
editProfileButton.addEventListener("click", () => {
  api.getUserInfo().then((data) => {
    nameInput.value = data.name;
    jobInput.value = data.about;
    editPopupForm.open();
    formValidators[editPopupForm.form.getAttribute("name")].resetValidation();
  });
});

//Edit profile picture modal
editProfilePictureButton.addEventListener("click", () => {
  editProfilePictureForm.open();
  formValidators[
    editProfilePictureForm.form.getAttribute("name")
  ].resetValidation();
});

// Add card modal
addCardButton.addEventListener("click", () => {
  addCardPopupForm.open();
  formValidators[addCardPopupForm.form.getAttribute("name")].resetValidation();
});
//Renderer
enableValidation(config);

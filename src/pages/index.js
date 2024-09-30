// import
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  config,
  editProfileButton,
  addCardButton,
} from "../utils/constants.js";
//
const formValidators = {};
//
const userInfo = new UserInfo(".profile__name", ".profile__bio");

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
  const popupWithImage = new PopupWithImage({ data }, "#open-image-modal");
  popupWithImage.open();
};

const gallery = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      gallery.addItem(`append`, cardElement);
    },
  },
  ".gallery__list"
);

const createCard = (data) => {
  const cardElement = new Card(
    data,
    "#card-template",
    handleImageClick
  ).generateCard();
  return cardElement;
};
// Edit profile modal
editProfileButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  const editPopupForm = new PopupWithForm("#edit-profile-modal", {
    handleSubmitEvent: (inputValues) => {
      userInfo.setUserInfo({ name: inputValues.name, job: inputValues.bio });
    },
  });
  const nameInput = editPopupForm.form.querySelector('input[name="name"]');
  const jobInput = editPopupForm.form.querySelector('input[name="bio"]');
  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.job;
  editPopupForm.open();
  formValidators[editPopupForm.form.getAttribute("name")].resetValidation();
});
// Add card modal
addCardButton.addEventListener("click", () => {
  const addCardPopupForm = new PopupWithForm("#add-card-modal", {
    handleSubmitEvent: (inputValues) => {
      const newCard = {
        name: inputValues.name,
        link: inputValues.bio,
      };
      const cardElement = createCard(newCard);
      gallery.addItem(`prepend`, cardElement);
      addCardPopupForm.form.reset();
    },
  });
  addCardPopupForm.open();
  formValidators[addCardPopupForm.form.getAttribute("name")].resetValidation();
});

gallery.renderItems();
enableValidation(config);

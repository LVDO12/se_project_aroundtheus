// import
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteConfirm from "../components/PopupDeleteConfirm.js";
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
import Api from "../components/Api.js";

let gallery;
//Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "18e5622e-036d-433d-8e74-a9c800df5400",
    "Content-Type": "application/json",
  },
});
//Add Delete Popup Form
const deletePopupForm = new PopupDeleteConfirm("#delete-card-modal");
//Add Card Popup Form
const addCardPopupForm = new PopupWithForm("#add-card-modal", {
  handleSubmitEvent: (inputValues) => {
    addCardPopupForm.renderLoading(true);
    api
      .addCard(inputValues)
      .then((inputValues) => {
        const cardElement = createCard(inputValues);
        gallery.addItem(`prepend`, cardElement);
        addCardPopupForm.form.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardPopupForm.renderLoading(false);
      });
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editPopupForm.renderLoading(false);
      });
  },
});
const nameInput = editPopupForm.form.querySelector('input[name="name"]');
const jobInput = editPopupForm.form.querySelector('input[name="bio"]');
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__bio",
  ".profile__picture__image",
  api
);

// Edit profile popup form
const editProfilePictureForm = new PopupWithForm(
  "#edit-profile-picture-modal",
  {
    handleSubmitEvent: (inputValues) => {
      editProfilePictureForm.renderLoading(true);
      api
        .updateUserPic(inputValues)
        .then((data) => {
          userInfo.setUserPic({ avatar: data.avatar });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editProfilePictureForm.renderLoading(false);
        });
    },
  }
);

const profilePictureEvent = new ProfilePicEvt(profilePicture);
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
    handleImageClick,
    api,
    deletePopupForm
  ).generateCard();
  return cardElement;
};
//
profilePictureEvent.addEventListener();
userInfo.fetchAndSetUserInfo();
api
  .getInitialCards()
  .then((initialCards) => {
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
  })
  .catch((err) => {
    console.log(err);
  });
// Edit profile modal
editProfileButton.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editPopupForm.open();
  formValidators[editPopupForm.form.getAttribute("name")].resetValidation();
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

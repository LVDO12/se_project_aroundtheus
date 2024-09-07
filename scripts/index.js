// Wrapper
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__list");
// Profile Popup
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const editPopup = document.querySelector("#edit-profile-modal");
const editPopupForm = document.forms["profile-form"];
const inputName = editPopup.querySelector("#name-input");
const inputBio = editPopup.querySelector("#bio-input");
// Add Card Popup
const addCardPopup = document.querySelector("#add-card-modal");
const addCardPopupForm = document.forms["card-form"];
const inputTitle = addCardPopup.querySelector("#title-input");
const inputLink = addCardPopup.querySelector("#link-input");
// Image Popup
const imagePopup = document.querySelector("#open-image-modal");
const image = imagePopup.querySelector(".modal__image");
const imageCaption = imagePopup.querySelector(".modal__image-caption");
//
// Validation
const config = {
  fieldSelector: ".modal__form-set",
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-inactive",
  inputErrorClass: "modal__input_type-error",
  errorClass: "modal__input-error",
};

//
//
// Buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((closeButton) => {
  const popup = closeButton.closest(".modal");
  closeButton.addEventListener("click", () => closeModal(popup));
});
//
// import
import { enableValidation } from "./validate.js";
//
//
// Function
function getCardElement(data) {
  // Wrapper
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  // Card Buttons
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  // Card Content
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardImage.addEventListener("click", () => {
    openModal(imagePopup);
    image.src = data.link;
    image.alt = data.name;
    imageCaption.textContent = data.name;
  });
  return cardElement;
}

function renderCard(item, method = "append") {
  const cardElement = getCardElement(item);
  cardListEl[method](cardElement);
}

const handleKeydown = (evt) => {
  if (evt.key === "Escape") {
    const overlays = document.querySelectorAll(".modal");
    overlays.forEach((overlay) => {
      closeModal(overlay);
    });
  }
};

const closeOverlay = () => {
  const overlays = document.querySelectorAll(".modal");
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal_open")) {
        closeModal(overlay);
      }
    });
  });
};

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", handleKeydown);
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleKeydown);
}

//
//
// Edit profile modal
editProfileButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  openModal(editPopup);
});
editPopupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closeModal(editPopup);
});
// Add card modal
addCardButton.addEventListener("click", () => {
  openModal(addCardPopup);
});
addCardPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    name: inputTitle.value,
    link: inputLink.value,
  };
  renderCard(newCard, "prepend");
  addCardPopupForm.reset();
  closeModal(addCardPopup);
});
// Initial cards
initialCards.forEach((data) => {
  renderCard(data);
});

enableValidation(config);
closeOverlay();

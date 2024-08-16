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

const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".modal");
const editPopupCloseButton = document.querySelector(".modal__close-button");
const editPopupForm = document.forms["edit-profile-form"];
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const inputName = document.querySelector("#profile-name-input");
const inputBio = document.querySelector("#profile-bio-input");
const cardListEl = document.querySelector(".gallery__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

function closeProfileModal() {
  if (editPopup.classList.contains("modal_open")) {
    editPopup.classList.remove("modal_open");
  } else {
    editPopup.classList.add("modal_open");
  }
}

editProfileButton.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  closeProfileModal();
});

editPopupCloseButton.addEventListener("click", closeProfileModal);

editPopupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closeProfileModal();
});

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});

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
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

// Buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Function
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const imagePopupOpener = cardElement.querySelector(".card__image");
  const imagePopup = document.querySelector("#open-image-modal");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  imagePopupOpener.addEventListener("click", () => {
    openModal(imagePopup);
    const image = imagePopup.querySelector(".modal__image");
    const imageCaption = imagePopup.querySelector(".modal__image-caption");
    const closeButton = imagePopup.querySelector(".modal__close-button");
    image.src = data.link;
    image.alt = data.name;
    imageCaption.textContent = data.name;
    closeButton.addEventListener("click", () => {
      closeModal(imagePopup);
    });
  });
  return cardElement;
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
}

function openModal(modal) {
  modal.classList.add("modal_open");
}

// Edit profile modal
const editPopup = document.querySelector("#edit-profile-modal");
const editPopupCloseButton = editPopup.querySelector(".modal__close-button");
const editPopupForm = editPopup.querySelector(".modal__form");
const inputName = editPopup.querySelector("#name-input");
const inputBio = editPopup.querySelector("#bio-input");
editProfileButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  openModal(editPopup);
});
editPopupCloseButton.addEventListener("click", () => closeModal(editPopup));
editPopupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closeModal(editPopup);
});

// Add card modal
const addCardPopup = document.querySelector("#add-card-modal");
const addCardPopupCloseButton = addCardPopup.querySelector(
  ".modal__close-button"
);
const addCardPopupForm = addCardPopup.querySelector(".modal__form");
const inputTitle = addCardPopup.querySelector("#title-input");
const inputLink = addCardPopup.querySelector("#link-input");
addCardButton.addEventListener("click", () => {
  openModal(addCardPopup);
});
addCardPopupCloseButton.addEventListener("click", () =>
  closeModal(addCardPopup)
);
addCardPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    name: inputTitle.value,
    link: inputLink.value,
  };
  cardListEl.prepend(getCardElement(newCard));
  closeModal(addCardPopup);
});

/* I tried to isolate the functions for each modal but it makes the form submission triggered muiltiple times
I will try make it works if you think this solutuion is better

editProfileButton.addEventListener("click", () => {
  const editPopup = document.querySelector("#edit-profile-modal");
  const editPopupCloseButton = editPopup.querySelector(".modal__close-button");
  const editPopupForm = editPopup.querySelector(".modal__form");
  const inputName = editPopup.querySelector("#name-input");
  const inputBio = editPopup.querySelector("#bio-input");
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  openModal(editPopup);
  editPopupCloseButton.addEventListener("click", () => closeModal(editPopup));
  editPopupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileBio.textContent = inputBio.value;
    closeModal(editPopup);
  });
});

addCardButton.addEventListener("click", () => {
  const addCardPopup = document.querySelector("#add-card-modal");
  const editPopupCloseButton = addCardPopup.querySelector(
    ".modal__close-button"
  );
  const addCardPopupForm = addCardPopup.querySelector(".modal__form");
  const inputTitle = addCardPopup.querySelector("#title-input");
  const inputLink = addCardPopup.querySelector("#link-input");
  openModal(addCardPopup);
  editPopupCloseButton.addEventListener("click", () =>
    closeModal(addCardPopup)
  );

  addCardPopupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newCard = {
      name: inputTitle.value,
      link: inputLink.value,
    };

    cardListEl.prepend(getCardElement(newCard));
    closeModal(addCardPopup);
  });
}); */

// Initial cards
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});

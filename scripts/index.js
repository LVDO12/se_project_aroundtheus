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
console.log(initialCards);

let editProfileButton = document.querySelector(".profile__edit-button");
let editPopup = document.querySelector(".modal");
let editPopupCloseButton = document.querySelector(".modal__close-button");
let editPopupSaveButton = document.querySelector(".modal__save-button");

editProfileButton.addEventListener("click", function () {
  editPopup.classList.add("modal_open");
  editPopup.classList.remove("modal_close");
});

editPopupCloseButton.addEventListener("click", function () {
  editPopup.classList.remove("modal_open");
  editPopup.classList.add("modal_close");
});

editPopupSaveButton.addEventListener("click", function () {
  event.preventDefault();
  editPopup.classList.remove("modal_open");
  editPopup.classList.add("modal_close");
});

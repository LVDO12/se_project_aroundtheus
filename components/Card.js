export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._cardImage = data._cardImage;
    this._cardSelector = cardSelector;
    this._likeButton = data.likeButton;
    this._deleteButton = data.deleteButton;
    this._handleImageClick = handleImageClick;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImageElement = this._element.querySelector(".card__image");
    this._setEventListeners();
    return this._element;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
}

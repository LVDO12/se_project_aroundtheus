export default class Card {
  constructor(data, cardSelector, handleImageClick, api, deletePopupForm) {
    this._data = data;
    this.link = data.link;
    this.name = data.name;
    this._id = data._id;
    this.isLiked = data.isLiked;
    this._cardImage = data._cardImage;
    this._cardSelector = cardSelector;
    this._likeButton = data.likeButton;
    this._deleteButton = data.deleteButton;
    this._handleImageClick = handleImageClick;
    this._api = api;
    this._deletePopupForm = deletePopupForm;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._element.querySelector(".card__image").src = this.link;
    this._element.querySelector(".card__title").textContent = this.name;
    this._element.querySelector(".card__image").alt = this.name;
    this._cardImageElement = this._element.querySelector(".card__image");
    this._cardImageElement.src = this.link;
    this._cardImageElement.alt = this.name;
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._checkLikeStatus();
    this._setEventListeners();
    return this._element;
  }

  _checkLikeStatus() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleLikeButton() {
    if (this.isLiked) {
      this._api
        .removeLike(this._id)
        .then(() => {
          this._likeButton.classList.toggle("card__like-button_active");
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLiked = false;
    } else {
      this._api
        .addLike(this._id)
        .then(() => {
          this._likeButton.classList.toggle("card__like-button_active");
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLiked = true;
    }
  }

  _handleDeleteButton() {
    this._deletePopupForm.open(() => this._handleConfirmDelete());
  }

  _handleConfirmDelete() {
    this._deletePopupForm.renderLoading(true);
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._element.remove();
        console.log("This post has been deleted");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._deletePopupForm.renderLoading(false);
      });
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

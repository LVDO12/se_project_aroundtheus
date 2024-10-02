export default class Popup {
  constructor(popupSelector) {
    this._popupElt = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseOnClick = this._handleCloseOnClick.bind(this);
    this._closeButton = this._popupElt.querySelector(".modal__close-button");
  }

  open() {
    this._popupElt.classList.add("modal_open");
    this.setEventListener();
  }

  close() {
    this._popupElt.classList.remove("modal_open");
    this.resetEventListener();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleCloseOnClick(evt) {
    if (
      evt.target.classList.contains("modal_open") ||
      evt.target === this._closeButton
    ) {
      this.close();
    }
  }

  setEventListener() {
    this._popupElt.addEventListener("click", this._handleCloseOnClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  resetEventListener() {
    this._popupElt.removeEventListener("click", this._handleCloseOnClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

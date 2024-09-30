export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseOnClick = this._handleCloseOnClick.bind(this);
    this._closeButton = this._popupSelector.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupSelector.classList.add("modal_open");
    this.setEventListener();
  }

  close() {
    this._popupSelector.classList.remove("modal_open");
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
    this._popupSelector.addEventListener("click", this._handleCloseOnClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  resetEventListener() {
    this._popupSelector.removeEventListener("click", this._handleCloseOnClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

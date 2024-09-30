import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    super(popupSelector);
    this._image = data.link;
    this._caption = data.name;
  }

  open() {
    this._popupSelector.querySelector(".modal__image").src = this._image;
    this._popupSelector.querySelector(".modal__image").alt = this._caption;
    this._popupSelector.querySelector(".modal__image-caption").textContent =
      this._caption;
    super.open();
  }
}

import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElt = this._popupElt.querySelector(".modal__image");
    this._captionElt = this._popupElt.querySelector(".modal__image-caption");
  }

  open(image, caption) {
    this._imageElt.src = image;
    this._imageElt.alt = caption;
    this._captionElt.textContent = caption;
    super.open();
  }
}

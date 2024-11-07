import Popup from "./Popup.js";
export default class PopupDeleteConfirm extends Popup {
  constructor(popupSelector, handleConfirmButtonEvent) {
    super(popupSelector);
    this._confirmButton = this._popupElt.querySelector(".modal__save-button");
    this._handleConfirmButtonEvent = handleConfirmButtonEvent;
    this._confirmHandler = this._confirmHandler.bind(this);
  }

  close() {
    this._confirmButton.removeEventListener("click", this._confirmHandler);
    super.close();
  }

  _confirmHandler(evt) {
    evt.preventDefault();
    console.log("bb");
    this._handleConfirmButtonEvent();
    super.close();
  }

  setEventListener() {
    super.setEventListener();
    this._confirmButton.addEventListener("click", this._confirmHandler);
  }
}

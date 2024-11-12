import Popup from "./Popup.js";
export default class PopupDeleteConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popupElt.querySelector(".modal__save-button");
    this._confirmHandler = this._confirmHandler.bind(this);
    this._saveButton = this._popupElt.querySelector(".modal__save-button");
  }

  open(confirmCallback) {
    this._confirmCallback = confirmCallback;
    super.open();
  }

  _confirmHandler(evt) {
    evt.preventDefault();
    if (this._confirmCallback) {
      this._confirmCallback();
    }
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = "Save";
    }
  }

  setEventListener() {
    super.setEventListener();
    this._confirmButton.addEventListener("click", this._confirmHandler);
  }
}

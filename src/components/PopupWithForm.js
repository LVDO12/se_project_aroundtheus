import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitEvent }) {
    super(popupSelector);
    this._handleSubmitEvent = handleSubmitEvent;
    this.form = this._popupElt.querySelector("form");
    this.inputList = this.form.querySelectorAll("input");
    this._submitHandler = this._submitHandler.bind(this);
    this._saveButton = this._popupElt.querySelector(".modal__save-button");
  }

  _getInputValues() {
    const inputValues = {};
    this.inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._handleSubmitEvent(this._getInputValues());
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
    this.form.addEventListener("submit", this._submitHandler);
  }

  resetEventListener() {
    super.resetEventListener();
    this.form.removeEventListener("submit", this._submitHandler);
  }
}

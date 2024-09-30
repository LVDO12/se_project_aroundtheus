import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitEvent }) {
    super(popupSelector);
    this._handleSubmitEvent = handleSubmitEvent;
    this.form = this._popupSelector.querySelector("form");
    this.inputList = this.form.querySelectorAll("input");
    this._submitHandler = this._submitHandler.bind(this);
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
    super.close();
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

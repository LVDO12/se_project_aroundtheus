export default class ProfilePicEvt {
  constructor(profileSelector) {
    this._profile = profileSelector;
    this._button = this._profile.querySelector(".profile-picture__edit-button");
  }

  _handleHoveringEvent() {
    this._profile.addEventListener("mouseover", () => {
      this._button.classList.add("profile-picture__edit-button_active");
    });
    this._profile.addEventListener("mouseout", () => {
      this._button.classList.remove("profile-picture__edit-button_active");
    });
  }

  addEventListener() {
    this._handleHoveringEvent();
  }
}

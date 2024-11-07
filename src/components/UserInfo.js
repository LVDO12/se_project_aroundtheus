import { api } from "../components/Api.js";
export default class UserInfo {
  constructor(nameSelector, jobSelector, pictureSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._pictureSelector = document.querySelector(pictureSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
      pic: this._pictureSelector.src,
    };
  }

  setUserInfo({ name, job }) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
  }

  setUserPic({ avatar }) {
    this._pictureSelector.src = avatar;
  }

  fetchAndSetUserInfo() {
    api
      .getUserInfo()
      .then((data) => {
        this.setUserInfo({
          name: data.name,
          job: data.about,
        });
        this.setUserPic({
          avatar: data.avatar,
        });
      })
      .catch((err) => console.log(err));
  }
}

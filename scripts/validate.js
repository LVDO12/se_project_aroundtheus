const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add("modal__input_type-error");
  errorElement.classList.add("modal__input-error");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove("modal__input-error");
  inputElement.classList.remove("modal__input_type-error");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__save-button-inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("modal__save-button-inactive");
    buttonElement.disabled = false;
  }
};

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__save-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      formElement.reset();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(".modal__form__set")
    );
    fieldsetList.forEach((fieldset) => {
      setEventListener(fieldset);
    });
  });
};

const closeOverlay = () => {
  const overlays = document.querySelectorAll(".modal");
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      overlays.forEach((overlay) => {
        closeModal(overlay);
      });
    }
  });
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal_open")) {
        closeModal(overlay);
      }
    });
  });
};

const openModalButtons = document.querySelectorAll("#validation-modal");
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    enableValidation();
    closeOverlay();
  });
});

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
//
//  I followed the lessons step by step how to write enableValidation(), I am not quite
// understanding why I the code bellow are required. Please let me know. Thank you!
// const config = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// };

// enableValidation(config);

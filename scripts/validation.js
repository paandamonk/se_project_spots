// Declaring a configuration object that contains the
// necessary classes and selectors.
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Function to show the input error and add correct styles.
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_active");
};

//Function to remove the input error and remove styles.
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
};

//Function to check that the input is valid and handles whether or not to show the input error.
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Function to verify a form has all valid inputs. Used to toggle the button.
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Function to toggle the button state. calls hasInvalidInput function to verify validity of the inputs.
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    console.log("logged");
    buttonElement.disabled = true;
  } else {
    console.log("false logged");
    buttonElement.disabled = false;
  }
};

//Function to reset validation after submitting a form.
const resetValidation = (formElement, buttonElement) => {
  formElement.reset();
  buttonElement.disabled = true;
  console.log(buttonElement.disabled);
};

//Function that sets all the event listeners for the inputs and the submit button.
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Function that kicks off the validation chain.
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);

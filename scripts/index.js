//initial list of cards
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//function used to return a card element whenever called.
function getCardElement(item) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__name").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  //adds event listener for the like button. toggles if the card is liked or not
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  //adds event listener for the delete button. removes card from the list
  cardDeleteBtn.addEventListener("click", () => {
    cardList.removeChild(cardElement);
  });

  //add event listener for the card image. opens up the imagePopup modal when clicking on a card image
  cardImage.addEventListener("click", () => {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupTitle.textContent = item.name;
    openModal(imagePopup);
  });
  return cardElement;
}

//generic open modal function
function openModal(modal) {
  const inputList = Array.from(modal.querySelectorAll(settings.inputSelector));
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closePopopWithEscape);
  toggleButtonState(inputList, submitBtn, settings);
}

//event listener function to be added and removed
function closePopopWithEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

//generic close modal function
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopopWithEscape);
  console.log("event listener removed");
}

//all the constant elements used multiple times throughout
const cardList = document.querySelector(".cards__list");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__new-post");
const addModal = document.querySelector("#add-modal");
const editModal = document.querySelector("#edit-modal");
const imagePopup = document.querySelector(".image-popup");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const inputName = document.querySelector("#name");
const inputDesc = document.querySelector("#description");
const editProfileForm = document.forms["edit-profile-form"];
const addCardForm = document.forms["add-card-form"];
const inputLink = document.querySelector("#add-card-link-input");
const inputCaption = document.querySelector("#add-card-caption-input");
const popupImage = imagePopup.querySelector(".image-popup__image");
const popupTitle = imagePopup.querySelector(".image-popup__title");
const allModals = document.querySelectorAll(".modal");
const submitBtn = document.querySelector(".modal__submit-button");

//Adds a "click" event listener to close the modal if a click is detected off the container.
allModals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (
      !evt.target.closest(".image-popup__image") &&
      !evt.target.closest(".modal__container")
    ) {
      closeModal(modal);
    }
  });
});

//Saves profile info and closes the modal.
editProfileForm.addEventListener("submit", (evt) => {
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closeModal(editModal);
  evt.preventDefault();
});

//creates a new card, adds it to the card list, and closes the modal. also clears the input text.
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputCard = { name: inputCaption.value, link: inputLink.value };
  const cardElement = getCardElement(inputCard);
  cardList.prepend(cardElement);
  addCardForm.reset();
  closeModal(addModal);
});

//opens the edit profile modal
editBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
  openModal(editModal);
  resetValidation(
    editProfileForm,
    Array.from(editModal.querySelectorAll(settings.inputSelector)),
    settings
  );
});

//opens the add card modal
addBtn.addEventListener("click", () => {
  openModal(addModal);
});

//iterates over all the close buttons in the document to close any modal that is opened upon clicking.
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

//creates the initial card list upon opening the page.
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});

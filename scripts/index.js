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

function getCardElement(item) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__name").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardList.removeChild(cardElement);
  });

  cardImage.addEventListener("click", () => {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupTitle.textContent = item.name;
    openModal(imagePopup);
  });
  return cardElement;
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

const cardList = document.querySelector(".cards__list");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__new-post");
const addModal = document.querySelector("#add-modal");
const editModal = document.querySelector("#edit-modal");
const imagePopup = document.querySelector(".image-popup");
const closeEditModalBtn = document.querySelector("#edit-profile-close-button");
const closeAddCardModalBtn = document.querySelector("#add-card-close-button");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const inputName = document.querySelector("#name");
const inputDesc = document.querySelector("#description");
const editProfileForm = document.forms["edit-profile-form"];
const AddCardForm = document.forms["add-card-form"];
const inputLink = document.querySelector("#add-card-link-input");
const inputCaption = document.querySelector("#add-card-caption-input");
const popupImage = imagePopup.querySelector(".image-popup__image");
const popupTitle = imagePopup.querySelector(".image-popup__title");

editProfileForm.addEventListener("submit", (evt) => {
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closeModal(editModal);
  evt.preventDefault();
});

AddCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputCard = { name: inputCaption.value, link: inputLink.value };
  const cardElement = getCardElement(inputCard);
  cardList.prepend(cardElement);
  closeModal(addModal);
  inputCaption.value = "";
  inputLink.value = "";
});

editBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
  openModal(editModal);
});
addBtn.addEventListener("click", () => {
  openModal(addModal);
});
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});

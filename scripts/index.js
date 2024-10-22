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
  let cardTemplate = document.querySelector("#card").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__name").textContent = item.name;
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardList.removeChild(cardElement);
  });

  cardImage.addEventListener("click", () => {
    let imagePopup = document.querySelector(".image-popup");

    imagePopup.querySelector(".image-popup__image").src = item.link;
    imagePopup.querySelector(".image-popup__image").alt = item.name;
    imagePopup.querySelector(".image-popup__title").textContent = item.name;

    imagePopup.classList.add("image-popup_opened");

    const PopupCloseBtn = document.querySelector(".image-popup__close-button");
    PopupCloseBtn.addEventListener("click", () => {
      imagePopup.classList.remove("image-popup_opened");
    });
  });

  return cardElement;
}
function likeButtonToggle() {
  likeButton.classList.toggle("card__like-button_liked");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

let cardList = document.querySelector(".cards__list");
let editBtn = document.querySelector(".profile__edit-button");
let addBtn = document.querySelector(".profile__new-post");
let submitBtn = document.querySelector(".modal__submit-button");
let addModal = document.querySelector("#add-modal");
let editModal = document.querySelector("#edit-modal");
let closeEditModalBtn = document.querySelector("#edit-profile-close-button");
let closeAddCardModalBtn = document.querySelector("#add-card-close-button");
let likeButton = document.querySelector(".card__like-button");

const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const inputName = document.querySelector("#name");
const inputDesc = document.querySelector("#description");
const EditProfileForm = editModal.querySelector("#edit-profile-form");
const AddCardForm = addModal.querySelector("#add-card-form");
const inputLink = document.querySelector("#add-card-link-input");
const inputCaption = document.querySelector("#add-card-caption-input");

EditProfileForm.addEventListener("submit", (evt) => {
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closeModal(editModal);
  evt.preventDefault();
});

AddCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let cardTemplate = document.querySelector("#card").content;
  let cardList = document.querySelector(".cards__list");
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__name").textContent = inputCaption.value;
  cardElement.querySelector(".card__image").src = inputLink.value;
  cardElement.querySelector(".card__image").alt = inputCaption.value;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardList.removeChild(cardElement);
  });

  cardList.prepend(cardElement);
  closeModal(addModal);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    let imagePopup = document.querySelector(".image-popup");

    imagePopup.querySelector(".image-popup__image").src = inputLink.value;
    imagePopup.querySelector(".image-popup__image").alt = inputCaption.value;
    imagePopup.querySelector(".image-popup__title").textContent =
      inputCaption.value;

    imagePopup.classList.add("image-popup_opened");

    const PopupCloseBtn = document.querySelector(".image-popup__close-button");
    PopupCloseBtn.addEventListener("click", () => {
      imagePopup.classList.remove("image-popup_opened");
    });
  });
});

editBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
  openModal(editModal);
});

addBtn.addEventListener("click", () => {
  openModal(addModal);
});

closeEditModalBtn.addEventListener("click", () => {
  closeModal(editModal);
});

closeAddCardModalBtn.addEventListener("click", () => {
  closeModal(addModal);
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});

let initialCards = [
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

function closeEditProfile() {
  let modal = document.querySelector(".modal");
  modal.classList.remove("modal_opened");
}
function handleProfileFormSubmit(evt) {
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closeEditProfile();
  evt.preventDefault();
}
function openEditProfile() {
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
  let modal = document.querySelector(".modal");
  modal.classList.add("modal_opened");
}
function getCardElement(data) {
  let cardTemplate = document.querySelector("#card").content;
  let cardList = document.querySelector(".cards__list");
  for (let i = 0; i < data.length; i++) {
    let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__name").textContent = data[i].name;
    cardElement.querySelector(".card__image").src = data[i].link;
    cardElement.querySelector(".card__image").alt = data[i].name;
    cardList.append(cardElement);
  }
}



let editBtn = document.querySelector(".profile__edit-button");
let addBtn = document.querySelector(".profile__new-post");
let submitBtn = document.querySelector(".modal__submit-button");
let closeModalBtn = document.querySelector(".modal__close-button");

const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const inputName = document.querySelector("#name");
const inputDesc = document.querySelector("#description");
const formElement = document.querySelector(".modal__form");


editBtn.addEventListener("click", openEditProfile);
closeModalBtn.addEventListener("click", closeEditProfile);
formElement.addEventListener('submit', handleProfileFormSubmit);
getCardElement(initialCards);
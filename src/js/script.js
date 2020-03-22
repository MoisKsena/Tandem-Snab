import { inherits } from "util";

//burger menu

function hideMenu() {
  $('.main-nav__burger').hide();
  $('.main-nav__burger-menu').hide();
}

function toggleMenu() {
  $('.main-nav__burger').toggle();
  $('.main-nav__burger-menu').toggle();
}

$('.main-nav__burger').click(function()
  {
    toggleMenu();
  });




//ideas menu link
let Tab = $('.ideas__menu-list-item-link');
let activeTab = $('.ideas__menu-list-item-link.m-active');

Tab.click(function () {
  $(this).addClass('.m-active');
  activeTab.removeClass('.m-active');
  //return;
});

//Swiper 

var swipers = {};

function initSwipers(){

  swipers.main = new Swiper('.j-swiper-preview', {
    slidesPerView: 1,
    spaceBetween: 15,
    slidesPerGroup: 1,
    loop: false,
    //loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-btnnext',
      prevEl: '.swiper-btnprev',
    },
  });

  swipers.main = new Swiper('.j-swiper-insta', {
    slidesPerView: 4,
    spaceBetween: 23,
    slidesPerGroup: 1,
    loop: true,
    //loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-btnnext',
      prevEl: '.swiper-btnprev',
    },
  });

}

//вложеный файл

let inputs = document.querySelectorAll('.input__file');
Array.prototype.forEach.call(inputs, function (input) {
  let label = input.nextElementSibling,
    labelVal = label.querySelector('.input__file-button-text').innerText;

  input.addEventListener('change', function (e) {
    let countFiles = '';
    if (this.files && this.files.length >= 1)
      countFiles = this.files.length;

    if (countFiles)
      label.querySelector('.input__file-button-text').innerText = countFiles;
    else
      label.querySelector('.input__file-button-text').innerText = labelVal;
  });
});


//modal open

function showPopup(selector) {
  let popupLayer = document.querySelector('.overlay');
  let showPopup = document.querySelector(selector);

  showPopup.classList.add('modal--open');
  popupLayer.style.display = "block";
};

function closePopup() {
  let popupLayer = document.querySelector('.overlay');
  let closePopup = document.querySelector('.modal--open');

  closePopup.classList.remove('modal--open');
  popupLayer.style.display = "none";
};

var page = $(".js-modal");
page.on('click', event => {
  event.preventDefault();

  showPopup('.feedback__modal');

});

var closeModal = $('.btn-close');
closeModal.on('click',event => {
  event.preventDefault();

  closePopup();
});

var pageModal = document.querySelector(".overlay");
pageModal.addEventListener('click', event => {
    var popUp = document.querySelector(".modal__content");
    var isInPopUp = popUp.contains(event.srcElement) || popUp == event.srcElement;
    if (!isInPopUp) {
      event.preventDefault();

      closePopup();
    };
  });

//validation
function initFormSubmitHandler()
{
  $("form").data("validator").settings.submitHandler = function()
  {
    showPopup('.feedback__form-success');

    return false;
  }
}

jQuery(document).ready(function() {
    
  jQuery('input[data-inputmask]').inputmask();
  
  initSwipers(); //swiper
  initFormSubmitHandler();  
});
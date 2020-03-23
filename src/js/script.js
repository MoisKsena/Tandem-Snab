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


  function initLinks()
  {
    $('.main-nav__link', 'ul.main-nav__list').click(function (evt)
    {
      $('.main-nav__link', 'ul.main-nav__list').removeClass('main-nav__item--active');
      $(evt.currentTarget).addClass('main-nav__item--active');      
    });
  }

  function initTabs()
  {
    $('.main-nav__link', 'nav.ideas__menu').click(function (evt)
    {
      evt.preventDefault();
 
      $('.main-nav__link', 'nav.ideas__menu').removeClass('main-nav__item--active');
      $(evt.currentTarget).addClass('main-nav__item--active');
      
      
      $('.ideas__content-idea', 'article.ideas__content-layout').removeClass('m-active');
      var tabIdSelector = '#' + $(evt.currentTarget).data('tabId');
      $(tabIdSelector).addClass('m-active');
    });
  }

//плавающие меню

// $(function(){
//   $(window).scroll(function(){
     
//       if($(this).scrollTop() > 937) {
//         $("div.scrollmenu").fadeIn();
//         $("div.scrollmenu").css('background-color', '#E5E5E5');
//       } 
//       else if ($(this).scrollTop() < 100){
//         $("div.scrollmenu").fadeIn();
//         $("div.scrollmenu").css('background-color', 'transparent');
//       } else {
//         $("div.scrollmenu").fadeOut(200);
//       }
//  });
// });


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
    if (this.files && this.files.length >= 1) {
      countFiles = this.files.length;
    };
    if (countFiles) {
      label.querySelector('.input__file-button-text').classList.add('m-active');
      label.querySelector('.input__file-button-text').innerText = countFiles;
    } 
    // else {
    //   label.querySelector('.input__file-button-text').classList.add('m-active');
    //   label.querySelector('.input__file-button-text').innerText = labelVal;
    // }
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
   
    $('.feedback__formletter').addClass('m-active');
    $('.feedback__form-success').removeClass('m-active');

    // $('.btn-close-success').on('click',event => {
    //   //event.preventDefault();
    //   if( $('.feedback__form-success').hasClass('m-active')) {
    //     this.removeClass('m-active');
    //     $('.feedback__form-success').addClass('m-active');
    //   } 
    // });
    return false;

   }
}

jQuery(document).ready(function() {
    
  jQuery('input[data-inputmask]').inputmask();
  initLinks();
  initTabs();
  initSwipers(); //swiper
  initFormSubmitHandler(); 
});
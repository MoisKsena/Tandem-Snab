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

//menu Tabs
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
      $('.ideas__content-idea', 'article.ideas__content-layout').css("display", "none"); //добавила я
      var tabIdSelector = '#' + $(evt.currentTarget).data('tabId');
      $(tabIdSelector).addClass('m-active');
      $(tabIdSelector).css("display", "flex"); //добавила я
    });
  }


//menu scroll

function initScroll(){
$(window).scroll(function() {
  let windscroll = $(window).scrollTop();
  if (windscroll >= 100) {
      $('.j-nav-section').each(function(i) {
          if ($(this).position().top <= windscroll - 10) {
              $('a.main-nav__link', '#headerMenu').removeClass('main-nav__item--active');
              $('a.main-nav__link', '#headerMenu').eq(i).addClass('main-nav__item--active');
          }
      });

  } else {

      $('a.main-nav__link', '#headerMenu').removeClass('main-nav__item--active');
      $('a.main-nav__link', '#headerMenu').eq(0).removeClass('main-nav__item--active');

  }
 
}).scroll();
}

//мобильная верисия // ideas tabs open (всегда открыта первая секция)
let firstTab = $('#fistSection').find('section', '.ideas__accordion-tab-content'); 
firstTab.addClass('m-active');



let openTabBtn = $('.ideas__accordion-tab');
openTabBtn.on('click', event => {
  event.preventDefault();

  firstTab.removeClass('m-active');

  $(event.currentTarget).find('section', '.ideas__accordion-tab-content').toggle('m-active'); 
});


//кнопка "Вверх"
var btn = $('#buttonUp');

$(window).scroll(function() {
  if ($(window).scrollTop() > 1000) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '500');
});


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
    navigation: {
      nextEl: '.swiper-btnnext',
      prevEl: '.swiper-btnprev',
    },
  });

  swipers.main = new Swiper('.j-swiper-mobile', {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    loop: true,
    autoplay: true,
  });

  swipers.main = new Swiper('.j-swiper-mobile-ideas', {
    slidesPerView: 1,
    spaceBetween: 15,
    slidesPerGroup: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  swipers.main = new Swiper('.j-swiper-insta', {
    slidesPerView: 4,
    spaceBetween: 23,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-btnnext-instagram',
      prevEl: '.swiper-btnprev-instagram',
    },
  });

}

//вложеный файл

let inputs = document.querySelectorAll('.input__file');
Array.prototype.forEach.call(inputs, function (input) {
  let label = input.nextElementSibling;
    //labelVal = label.querySelector('.input__file-button-text').innerText;

  input.addEventListener('change', function (e) {
    let countFiles = '';
    if (this.files && this.files.length >= 1) {
      countFiles = this.files.length;
    };
    if (countFiles) {
      label.querySelector('.input__file-download').classList.add('m-active');
      label.querySelector('.input__file-button-text').innerText = countFiles;
    };
  });

  let fileDel = $('.input__file_del');
  fileDel.on('click', event => {
    event.preventDefault();

    $('.input__file-download').removeClass('m-active');
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

var pageConsult = $(".j-consult");
pageConsult.on('click', event => {
  event.preventDefault();

  $('.header__oder-block').css("display", "none");
  $('.header__formletter').addClass('m-active');
});

var messageSuccess = $("header__formletter-personal.m-consult.m-active");
messageSuccess.on('click', event => {
  event.preventDefault();

  $('.header__formletter-checkin').css("display", "none");
  $('.header__form-success.m-consult').addClass('m-active');
});

//validation
function initFormSubmitHandler()
{
  $("form.header__formletter").data("validator").settings.submitHandler = function()
  {
    //debugger
    $('.header__formletter.m-consult').removeClass('m-active');
    $('.header__form-success.m-consult').addClass('m-active');
    return false;

   };

   $("form.feedback__formletter").data("validator").settings.submitHandler = function()
   {
     //debugger
     $('.feedback__formletter').addClass('m-active');
     $('.feedback__form-success').removeClass('m-active');
     return false;
 
    }
}

jQuery(document).ready(function() {
  initScroll();
  jQuery('input[data-inputmask]').inputmask();
  initLinks();
  initTabs();
  initSwipers(); //swiper
  initFormSubmitHandler(); 
  
});
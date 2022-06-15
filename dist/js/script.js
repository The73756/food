/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(el => {
      el.classList.remove('tabcontent_active');
    });
    tabs.forEach(el => {
      el.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('tabcontent_active');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && event.target.classList.contains('tabheader__item')) {
      tabs.forEach((el, i) => {
        if (target == el) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // Timer

  const deadline = '2023-09-11';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - new Date();

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / 1000 / 60 % 60);
      seconds = Math.floor(t / 1000 % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock(); // инициализируем таймер

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline); // Modal

  const modal = document.querySelector('.modal'),
        modalOpenBtn = document.querySelectorAll('[data-modal]'),
        modalTimerId = setTimeout(openModal, 50000);

  function openModal() {
    modal.classList.add('modal_open');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.remove('modal_open');
    document.body.style.overflow = '';
  }

  modalOpenBtn.forEach(el => {
    el.addEventListener('click', openModal);
  });
  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && modal.classList.contains('modal_open')) {
      closeModal();
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); // Class for card

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...anyClasses) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.anyClasses = anyClasses;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 50;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const el = document.createElement('div');

      if (this.anyClasses.length === 0) {
        this.el = 'menu__item';
        el.classList.add(this.el);
      } else {
        this.anyClasses.forEach(className => el.classList.add(className));
      }

      el.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;
      this.parent.append(el);
    }

  }

  new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню “Фитнес”', 'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 4.5, '.menu__field .container').render();
  new MenuCard("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в кафе, столовую или ресторан!', 11, '.menu__field .container').render();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню “Постное”', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 9, '.menu__field .container').render(); // Forms

  const forms = document.querySelectorAll('form'),
        message = {
    'loading': 'img/spinner.svg',
    'success': 'Спасибо! скоро мы свяжемся с вами',
    'failure': 'Что то пошло не так...'
  };
  forms.forEach(el => {
    postData(el);
  });

  function postData(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
					display: block;
					margin: 0 auto;
				`;
      form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const ob = {};
      formData.forEach(function (value, key) {
        ob[key] = value;
      });
      fetch('server.php', {
        'method': 'POST',
        'body': JSON.stringify(ob),
        'headers': {
          'Content-type': 'application/json'
        }
      }).then(data => data.text()).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
        form.reset();
      }).catch(() => {
        showThanksModal(message.failure);
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('modal__dialog_close');
    openModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
				<div class="modal__content">
					<div data-close class="modal__close">&times;</div>
					<div class="modal__title">${message}</div>
				</div>				
			`;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('modal__dialog_close');
      closeModal();
    }, 3000);
  }

  fetch('https://jsonplaceholder.typicode.com/posts', {
    'method': 'POST',
    'body': JSON.stringify({
      'name': 'Alex'
    }),
    'headers': {
      'Content-type': 'application/json'
    }
  }).then(response => response.json()).then(json => console.log(json));
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map
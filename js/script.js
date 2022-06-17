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

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && event.target.classList.contains('tabheader__item')) {
			tabs.forEach((el, i) => {
				if (target == el) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// Timer

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
			hours = Math.floor((t / (1000 * 60 * 60) % 24));
			minutes = Math.floor((t / 1000 / 60) % 60);
			seconds = Math.floor((t / 1000) % 60);
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

	setClock('.timer', deadline);

	// Modal

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

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
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

	window.addEventListener('scroll', showModalByScroll);

	// Class for card

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

	const getResourse = async (url) => {
		const res = await fetch(url);

			if (!res.ok) {
			  throw	new Error(`could not fetch ${url}, status: ${res.status}`);
			}

		return await res.json();
	};

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
			});
		});	

	// Forms

	const forms = document.querySelectorAll('form'),
		message = {
			'loading': 'img/spinner.svg',
			'success': 'Спасибо! скоро мы свяжемся с вами',
			'failure': 'Что то пошло не так...'
		};

	forms.forEach(el => {
		bindpostData(el);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			'method': 'POST',
			'body': data,
			'headers': {
				'Content-type': 'application/json'
			}
		});

		return await res.json();
	};

	function bindpostData(form) {
		form.addEventListener('submit', (event) => {
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

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
					form.reset();
				})
				.catch(() => {
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

	// Slider 

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;
	let slideIndex = 1;
	let offset = 0;

	function updateTotal() {  
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
		} else {
			total.textContent = slides.length;
		}
	}

	function updateCurrent() {  
		if (slideIndex < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function updateDots (arr) {  
		arr.forEach(dot => {
			dot.style.opacity = 0.5;
			arr[slideIndex - 1].style.opacity = 1;
		});
	}
	updateTotal();
	updateCurrent();

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.3s transform ease-in-out';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const dots = document.createElement('ol'),
		dotsArr = [];
	
	dots.classList.add('carousel-indicators');
	slider.append(dots);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = 1;
		}
		dots.append(dot);
		dotsArr.push(dot);
	}

	next.addEventListener('click', () => {
		if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.replace(/\D/g, '');
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		updateDots(dotsArr);
		updateCurrent();
	});

	function delNumOnString(string) {  
		return +string.replace(/\D/g, '');
	}

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = delNumOnString(width) * (slides.length - 1);
		} else {
			offset -= delNumOnString(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
	
		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
	
		updateDots(dotsArr);
		updateCurrent();
	});

	dotsArr.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = delNumOnString(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			updateCurrent();
			updateDots(dotsArr);
		});
	});

	//Calc

	const result = document.querySelector('.calculating__result span');
	let sex = 'female', height, weight, age, ratio = '1.375';

	function calcTotal() {  
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex == 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	function getStaticInfo(parentSelector, activeClass) {  
		const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach(el => {
			el.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
				} else {
					sex = e.target.getAttribute('id');
				}
	
				elements.forEach(el => {
					el.classList.remove(activeClass);
				});
				
				e.target.classList.add(activeClass);		
				calcTotal();
			});
		});
	}

	function getDynamicInfo(selector) {  
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match (/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			switch(input.getAttribute('id')) {
				case 'height': 
					height = +input.value;
					break;
				case 'weight': 
				weight = +input.value;
					break;
				case 'age': 
				age = +input.value;
					break;
			}
			calcTotal();
		});
	}
	
	getDynamicInfo('#height');
	getDynamicInfo('#weight');
	getDynamicInfo('#age');

	getStaticInfo('#gender', 'calculating__choose-item_active');
	getStaticInfo('#ratio', 'calculating__choose-item_active');
});


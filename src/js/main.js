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
		modalCloseBtn = document.querySelector('[data-close]');

	modalOpenBtn.forEach(el => {
		el.addEventListener('click', () => {
			modal.classList.add('modal_open');
			document.body.style.overflow = 'hidden';
		});
	});

	function closeModal() {  
		modal.classList.remove('modal_open');
		document.body.style.remove = '';
	}

	modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('modal_open')) {
			closeModal();
		}
	});
});
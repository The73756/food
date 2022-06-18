function modal() {  
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
}

module.exports = modal;
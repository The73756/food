import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function form(formSelector, modalTimerId) {  
	const forms = document.querySelectorAll(formSelector),
		message = {
			'loading': 'img/spinner.svg',
			'success': 'Спасибо! скоро мы свяжемся с вами',
			'failure': 'Что то пошло не так...'
		};

	forms.forEach(el => {
		bindpostData(el);
	});

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
		openModal('.modal', modalTimerId);

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
			closeModal('.modal');
		}, 3000);
	}
}

export default form;
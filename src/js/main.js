document.addEventListener('DOMContentLoaded', () => {

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
});
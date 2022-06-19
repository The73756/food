function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {  
	// Tabs
	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
		tabsContent.forEach(el => {
			el.classList.remove('tabcontent_active');
		});

		tabs.forEach(el => {
			el.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('tabcontent_active');
		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && event.target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((el, i) => {
				if (target == el) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

export default tabs;
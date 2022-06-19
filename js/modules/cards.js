import {getResourse} from '../services/services';

function cards() {
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

	getResourse('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({
				img,
				altimg,
				title,
				descr,
				price
			}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
			});
		});
}

export default cards;
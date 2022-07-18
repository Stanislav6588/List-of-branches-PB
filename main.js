'use strict'

class Branches {
	constructor({listBranches, name}) {
		this.listBranches = document.querySelector(listBranches);
		this.name = document.querySelector(name);
	}

	getJson(nameRegion){
		const request = new XMLHttpRequest();
		request.addEventListener('readystatechange', (even) => {
			if(request.readyState == 4 && request.status == 200){
				const data = JSON.parse(request.responseText);
				let arr = [];
				data.forEach((i) => {
					if(i.state == nameRegion){
						arr.push(i);
					}
				})
			this.createList(arr);

			}
		})
		request.open('GET', '/privat.json');
		request.setRequestHeader('Content-type', 'application/json');
		request.send();
	}

	createElement(address, phone, count){
		return `
		<li class="ListBranchesLi">
			<div class="count">${count}</div>
			<div class="location">${address}</div>
			<div class="phone">${phone}</div>
		</li>`
	}

	createList(arr){
		let count = 0;
		arr.forEach((i) => {
			count += 1;
	this.listBranches.insertAdjacentHTML('beforeend', this.createElement(i.address, i.phone, count));
		})
	}

	changeRegion(){
		this.name.addEventListener('change', (el) => {
			this.removeList();
			let nameRegion = el.target.value;
			this.getJson(nameRegion);
		})
	}

	removeList(){
		let list = document.querySelector('.listBranches');
		list.innerHTML = '';
	}

	init(){
		this.changeRegion();
	}
}
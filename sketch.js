const $ = str => (str[0] == '#') ? document.querySelector(str) : document.querySelectorAll(str);

const input = $('#input');
const input2 = $('#input2');
const body = $('body')[0];
const check = $('#check');
const img = $('#img');
const select = $('#select');


let waitCorrect = false;
let termIndex = 0;

let incorrect = [];
let checked = getCookie('checked').split(',');


if(getCookie('dark') == 'true') body.classList.add('dark');


(function() {
	const parent = select;
	const checkedCookie = getCookie('checked').split(',');

	for(let i = 0; i < terms.length; i++) {
		const item = document.createElement('div');
		item.classList.add('item');

		const checkbox = document.createElement('div');
		checkbox.classList.add('checkbox');

		if(checkedCookie.indexOf(JSON.stringify(i)) > -1) checkbox.setAttribute('checked', '');

		const itemName = document.createElement('span');
		itemName.classList.add('itemName');

		let text = terms[i].replace(/_/g, '/');
		text = text[0].toUpperCase() + text.slice(1);
		itemName.textContent = text.split('.')[0];

		item.appendChild(checkbox);
		item.appendChild(itemName);

		parent.appendChild(item);
	}
})();


$('#toggleDarkMode').addEventListener('click', () => {
	body.classList.toggle('dark');
	document.cookie = 'dark=' + (!!body.classList.contains('dark')) + '; expires=' + new Date(Date.now() + 3e10);
});

select.addEventListener('click', e => {
	if(!e.target.classList.contains('checkbox')) return;
	
	e.target.toggleAttribute('checked');

	let checkboxes = $('.checkbox');
	checked = [];
	checkboxes.forEach((check, i) => {
		if(check.hasAttribute('checked')) {
			checked.push(i);
		}
	});

	// console.log(checked);

	if(checked.length == 0) {
		$('#select > header > button:nth-child(3)').setAttribute('disabled', '');
	}
	else {
		$('#select > header > button:nth-child(3)').removeAttribute('disabled');
	}

	document.cookie = 'checked=' + checked.join(',') + '; expires=' + new Date(Date.now() + 3e10);
})


$('#select > header > button:nth-child(1)').addEventListener('click', e => {
	let checkboxes = $('.checkbox');
	let arr = [];
	for(let i = 0; i < checkboxes.length; i++) {
		arr.push(i);
		checkboxes[i].setAttribute('checked', '');
	}

	document.cookie = 'checked=' + arr.join(',') + '; expires=' + new Date(Date.now() + 3e10);
});

$('#select > header > button:nth-child(2)').addEventListener('click', e => {
	$('.checkbox').forEach(check => {
		check.removeAttribute('checked');
	})

	document.cookie = 'checked=null; expires=' + new Date(Date.now() + 3e10);
});

$('#select > header > button:nth-child(3)').addEventListener('click', e => {
	termIndex = checked[0];
	select.classList.remove('show');
	img.setAttribute('src', 'images/' + terms[termIndex]);
});


function getCookie(name) {
	let cookies = document.cookie.split('; ');
	for(let i = 0; i < cookies.length; i++) {
		if(cookies[i].split('=')[0] == name) return cookies[i].split('=')[1];
	}
	return null;
}




window.addEventListener('keypress', e => {
	if(e.keyCode != 13) return;

	if(waitCorrect) {
		waitCorrect = false;
		input2.classList.remove('show');
		input.value = '';
		nextTerm();
		return;
	}


	let text = input.value.trim().toLowerCase();
	// console.log(text);


	if(text == terms[termIndex].split('.')[0].replace(/_/g, '/')) {
		check.classList.add('correct');
		setTimeout(() => {
			check.classList.remove('correct');
			input.value = '';
			nextTerm();
		}, 1200);
	}

	else {
		input2.value = terms[termIndex].split('.')[0].replace(/_/g, '/');
		input2.classList.add('show');
		incorrect.push(termIndex);
		waitCorrect = true;
	}
});




function nextTerm() {
	if(++termIndex == terms.length) {
		termIndex = 0;
		select.classList.add('show');
	}

	else {
		img.setAttribute('src', 'images/' + terms[termIndex])
	}

	// console.log(termIndex);
}

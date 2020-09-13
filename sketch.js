const $ = str => (str[0] == '#') ? document.querySelector(str) : document.querySelectorAll(str);

const input = $('#input');
const input2 = $('#input2');
const body = $('body')[0];
const check = $('#check');
const img = $('#img');


let waitCorrect = false;
let termIndex = 0;

let incorrect = [];


if(getCookie('dark') == 'true') body.classList.add('dark');


$('#toggleDarkMode').addEventListener('click', () => {
	body.classList.toggle('dark');
	document.cookie = 'dark=' + (!!body.classList.contains('dark')) + '; expires=' + new Date(Date.now() + 3e10);
});

$('#select').addEventListener('click', e => {
	if(e.target.classList.contains('checkbox')) e.target.toggleAttribute('checked');

	let checkboxes = $('.checkbox');
	let arr = [];
	checkboxes.forEach((check, i) => {
		if(check.hasAttribute('checked')) arr.push(i);
	});

	document.cookie = 'selected=' + arr.join(',') + '; expires=' + new Date(Date.now() + 3e10);
})


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
	console.log(text);


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
		completed();
	}

	else {
		img.setAttribute('src', 'images/' + terms[termIndex])
	}

	console.log(termIndex);
}




function completed() {

}
const navTitle = document.querySelector('.nav__title');
const navScrollUp = document.getElementById('scrollUp');
const navScrollUpDisabled = "nav__action--disabled";

window.addEventListener('scroll', (e) => {

	try {
		if (window.pageYOffset > 250) {
			navTitle.classList.remove('hidden');
			navScrollUp.classList.remove(navScrollUpDisabled);
		} else {
			navTitle.classList.add('hidden');
			navScrollUp.classList.add(navScrollUpDisabled);
		}
	} catch (error) {
		console.log("TutLinux: " + error);
	}

});

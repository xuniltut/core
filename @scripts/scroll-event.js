const navbar               = document.querySelector('.navbar-wrapper');
const navbarScrolled  = "navbar-wrapper--scrolled";
const navbarTitle = document.querySelector('.navbar__title');
const navbarScrollUp = document.getElementById('scrollUp');
const navbarScrollUpDisabled = "navbar__action--disabled";

window.addEventListener('scroll', (e) => {

	try {
		if (window.pageYOffset > 150) {
			navbar.classList.add(navbarScrolled);
			navbarTitle.classList.remove('hidden');
			navbarScrollUp.classList.remove(navbarScrollUpDisabled);
		} else {
			navbar.classList.remove(navbarScrolled);
			navbarTitle.classList.add('hidden');
			navbarScrollUp.classList.add(navbarScrollUpDisabled);

		}
	} catch (error) {
		console.log("TutLinux: " + error);
	}

});

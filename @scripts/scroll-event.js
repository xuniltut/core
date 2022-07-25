const topbar               = document.querySelector('.topbar-wrapper');
const topbarScrolled  = "topbar-wrapper--scrolled";
const topbarTitle = document.querySelector('.topbar__title');

window.addEventListener('scroll', (e) => {

	try {
		if (window.pageYOffset > 150) {
			topbar.classList.add(topbarScrolled);
			topbarTitle.classList.remove('hidden');
		} else {
			topbar.classList.remove(topbarScrolled);
			topbarTitle.classList.add('hidden');
		}
	} catch (error) {
		console.log("TutLinux: " + error);
	}

});

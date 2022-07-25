const topbar               = document.querySelector('.topbar-wrapper');
const topbarScrolled  = "topbar-wrapper--scrolled";
const topbarTitle = document.querySelector('.topbar__title');
const topBarScrollUp = document.getElementById('scrollUp');
const topBarScrollUpDisabled = "topbar__action--disabled";

window.addEventListener('scroll', (e) => {

	try {
		if (window.pageYOffset > 150) {
			topbar.classList.add(topbarScrolled);
			topbarTitle.classList.remove('hidden');
			topBarScrollUp.classList.remove(topBarScrollUpDisabled);
		} else {
			topbar.classList.remove(topbarScrolled);
			topbarTitle.classList.add('hidden');
			topBarScrollUp.classList.add(topBarScrollUpDisabled);

		}
	} catch (error) {
		console.log("TutLinux: " + error);
	}

});

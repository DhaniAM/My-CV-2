const navList = document.querySelector(".nav-list");

const openNav = () => {
	if (navList.classList.contains('active')) {
		navList.classList.remove('active');
	} else {
		navList.classList.add('active');
	}
}
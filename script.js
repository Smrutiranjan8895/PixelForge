document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsIntersectionObserver = 'IntersectionObserver' in window;

const featuredGamesSection = document.querySelector('.featured-games');
const revealElements = document.querySelectorAll('.reveal-on-scroll');

const markVisible = (element) => {
	if (!element) {
		return;
	}

	element.classList.add('is-visible');
};

if (prefersReducedMotion || !supportsIntersectionObserver) {
	markVisible(featuredGamesSection);
	revealElements.forEach(markVisible);
} else {
	if (featuredGamesSection) {
		featuredGamesSection.classList.add('reveal-ready');
	}

	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				markVisible(entry.target);
				observer.unobserve(entry.target);
			});
		},
		{
			threshold: 0.2,
			rootMargin: '0px 0px -10% 0px'
		}
	);

	if (featuredGamesSection) {
		revealObserver.observe(featuredGamesSection);
	}

	revealElements.forEach((element) => {
		revealObserver.observe(element);
	});
}

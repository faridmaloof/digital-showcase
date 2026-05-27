import '@testing-library/jest-dom';

class IntersectionObserverMock {
	disconnect() {
		return undefined;
	}

	observe() {
		return undefined;
	}

	unobserve() {
		return undefined;
	}
}

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: IntersectionObserverMock,
});


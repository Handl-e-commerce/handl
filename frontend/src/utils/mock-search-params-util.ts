// taken from https://rafaelcamargo.com/blog/mocking-search-params-in-tests-for-react-components/
function mockSearchParams(paramsString: string): void {
    const { pathname } = window.location;
    const url = paramsString ? `${pathname}?${paramsString}` : pathname;
    window.history.pushState({}, '', url);
};

export {mockSearchParams};
import { appendChild, removeChild } from './domhandler';

describe('DomHandler append targets', () => {
    let host: HTMLDivElement;
    let shadowRoot: ShadowRoot;
    let element: HTMLDivElement;

    beforeEach(() => {
        host = document.createElement('div');
        document.body.appendChild(host);
        shadowRoot = host.attachShadow({ mode: 'open' });
        element = document.createElement('div');
    });

    afterEach(() => {
        host.remove();
    });

    it('should append elements to a shadow root target', () => {
        appendChild(shadowRoot, element);

        expect(shadowRoot.contains(element)).toBe(true);
    });

    it('should remove elements from a shadow root target', () => {
        appendChild(shadowRoot, element);
        removeChild(shadowRoot, element);

        expect(shadowRoot.contains(element)).toBe(false);
    });
});

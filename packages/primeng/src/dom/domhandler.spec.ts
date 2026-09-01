import { appendChild, DomHandler, removeChild } from './domhandler';

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

    it('should resolve scrollable parents across a shadow root boundary', () => {
        host.style.overflow = 'auto';
        appendChild(shadowRoot, element);

        const scrollableParents = DomHandler.getScrollableParents(element);

        expect(scrollableParents).toContain(host);
        expect(scrollableParents).not.toContain(shadowRoot);
    });
});

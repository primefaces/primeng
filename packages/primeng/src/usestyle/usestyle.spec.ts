import { TestBed } from '@angular/core/testing';

import { UseStyle } from './usestyle';

describe('UseStyle', () => {
    let service: UseStyle;
    let host: HTMLDivElement;
    let shadowRoot: ShadowRoot;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UseStyle);

        host = document.createElement('div');
        document.body.appendChild(host);
        shadowRoot = host.attachShadow({ mode: 'open' });
    });

    afterEach(() => {
        host.remove();
        document.head.querySelectorAll('style[data-primeng-style-id^="test-style"]').forEach((style) => style.remove());
    });

    it('should append styles to the provided style container', () => {
        service.use('.test { color: red; }', { name: 'test-style-shadow', styleContainer: shadowRoot });

        expect(shadowRoot.querySelector('style[data-primeng-style-id="test-style-shadow"]')?.textContent).toContain('color: red;');
        expect(document.head.querySelector('style[data-primeng-style-id="test-style-shadow"]')).toBeNull();
    });

    it('should reuse a style element by id within the provided style container', () => {
        service.use('.test { color: red; }', { id: 'test-style-by-id', name: 'test-style-initial', styleContainer: shadowRoot });
        service.use('.test { color: blue; }', { id: 'test-style-by-id', name: 'test-style-updated', styleContainer: shadowRoot });

        const styleElement = shadowRoot.querySelector('style[id="test-style-by-id"]') as HTMLStyleElement;

        expect(shadowRoot.querySelectorAll('style[id="test-style-by-id"]').length).toBe(1);
        expect(styleElement.textContent).toContain('color: blue;');
        expect(document.head.querySelector('style[id="test-style-by-id"]')).toBeNull();
    });
});

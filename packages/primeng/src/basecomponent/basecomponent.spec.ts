import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Base } from 'primeng/base';
import { PrimeNG } from 'primeng/config';
import { BaseComponent } from './basecomponent';

@Component({
    standalone: false,
    selector: 'test-base-component',
    template: `<div class="test-base-component"></div>`
})
class TestBaseComponent extends BaseComponent {}

describe('BaseComponent', () => {
    let fixture: ComponentFixture<TestBaseComponent>;
    let component: TestBaseComponent;
    let host: HTMLDivElement;
    let shadowRoot: ShadowRoot;
    let config: PrimeNG;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestBaseComponent],
            providers: [provideZonelessChangeDetection()]
        });

        Base.clearLoadedStyleNames();

        config = TestBed.inject(PrimeNG);
        host = document.createElement('div');
        document.body.appendChild(host);
        shadowRoot = host.attachShadow({ mode: 'open' });
        config.styleContainer.set(shadowRoot);

        fixture = TestBed.createComponent(TestBaseComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        config.styleContainer.set(undefined);
        host.remove();
        Base.clearLoadedStyleNames();
        document.head.querySelectorAll('style[data-primeng-style-id="base"], style[data-primeng-style-id="global"]').forEach((style) => style.remove());
    });

    it('should expose the configured style container in style options', () => {
        expect(component.$styleOptions.styleContainer).toBe(shadowRoot);
    });

    it('should load shared styles into the configured style container', () => {
        expect(shadowRoot.querySelector('style[data-primeng-style-id="base"]')).toBeTruthy();
        expect(document.head.querySelector('style[data-primeng-style-id="base"]')).toBeNull();
    });
});

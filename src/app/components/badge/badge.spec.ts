import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Badge, BadgeModule } from './badge';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Badge', () => {
    let badge: Badge;
    let fixture: ComponentFixture<Badge>;
    let badgeRef: ComponentRef<Badge>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, BadgeModule]
        });

        fixture = TestBed.createComponent(Badge);
        badge = fixture.componentInstance;
        badgeRef = fixture.componentRef;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement).toBeTruthy();
    });

    it('should render the badge with a value', () => {
        badgeRef.setInput('value', '5');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.textContent).toBe('5');
    });

    it('should apply p-badge-no-gutter class for single character values', () => {
        badgeRef.setInput('value', 'A');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('p-badge-no-gutter');
    });

    it('should not apply p-badge-no-gutter class for multiple character values', () => {
        badgeRef.setInput('value', 'AB');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).not.toContain('p-badge-no-gutter');
    });

    it('should apply the large size class', () => {
        badgeRef.setInput('badgeSize', 'large');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('p-badge-lg');
    });

    it('should apply the xlarge size class', () => {
        badgeRef.setInput('badgeSize', 'xlarge');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('p-badge-xl');
    });

    it('should apply the correct severity class', () => {
        badgeRef.setInput('severity', 'danger');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('p-badge-danger');
    });

    it('should not render when badge is disabled', () => {
        badgeRef.setInput('badgeDisabled', true);
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement).toBeNull();
    });

    it('should apply inline styles', () => {
        badgeRef.setInput('style', { color: 'red' });
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.style.color).toBe('red');
    });

    it('should apply the custom class', () => {
        badgeRef.setInput('styleClass', 'custom-class');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('custom-class');
    });
});

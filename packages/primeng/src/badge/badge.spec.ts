import { Component, ComponentRef } from '@angular/core';
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

    it('should apply dot class when value is undefined', () => {
        badgeRef.setInput('value', null);
        fixture.detectChanges();

        const badgeElement = fixture.nativeElement.querySelector('span');
        expect(badgeElement.classList).toContain('p-badge-dot');
    });

    it('should render the badge with a value', () => {
        badgeRef.setInput('value', '5');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.textContent).toBe('5');
    });

    it('should apply p-badge-circle class for single character values', () => {
        badgeRef.setInput('value', 'A');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('p-badge-circle');
    });

    it('should not apply p-badge-circle class for multiple character values', () => {
        badgeRef.setInput('value', 'AB');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).not.toContain('p-badge-circle');
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

@Component({
    template: `<div pBadge [value]="value" [badgeDisabled]="disabled" [badgeSize]="badgeSize" [severity]="severity"></div> `,
    imports: [BadgeModule],
    standalone: true
})
export class TestHostComponent {
    value: string | number | null = '5';
    disabled = false;
    badgeSize: 'large' | 'xlarge' | 'smalls' | undefined;
    severity: 'success' | 'info' | 'warn' | 'danger' | null | undefined;
}

describe('BadgeDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
    });

    it('should render badge with value', () => {
        component.value = '10';
        fixture.detectChanges();

        const badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement.textContent).toBe('10');
    });

    it('should not render the badge when disabled is true', () => {
        component.disabled = true;
        fixture.detectChanges();

        const badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement).toBeNull();
    });

    it('should update the badge value when value changes', () => {
        component.value = '5';
        fixture.detectChanges();

        let badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement.textContent).toBe('5');

        component.value = '10';
        fixture.detectChanges();

        badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement.textContent).toBe('10');
    });

    it('should apply the correct severity class', () => {
        component.severity = 'danger';
        fixture.detectChanges();

        const badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement.classList).toContain('p-badge-danger');
    });

    it('should apply large size class', () => {
        component.badgeSize = 'large';
        fixture.detectChanges();

        const badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement.classList).toContain('p-badge-lg');
    });

    it('should apply xlarge size class', () => {
        component.badgeSize = 'xlarge';
        fixture.detectChanges();

        const badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement.classList).toContain('p-badge-xl');
    });

    it('should apply dot class when value is undefined', () => {
        component.value = null;
        fixture.detectChanges();

        const badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement.classList).toContain('p-badge-dot');
    });

    it('should apply no gutter class for single character value', () => {
        component.value = 'A';
        fixture.detectChanges();

        const badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement.classList).toContain('p-badge-circle');
    });

    it('should remove the badge when disabled is set to true', () => {
        component.value = '5';
        component.disabled = false;
        fixture.detectChanges();

        let badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement).not.toBeNull();

        component.disabled = true;
        fixture.detectChanges();

        badgeElement = fixture.nativeElement.querySelector('span.p-badge');
        expect(badgeElement).toBeNull();
    });
});

import { Component, ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Tag } from './tag';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <p-tag class="custom-content">Test Content</p-tag>
        <p-tag class="custom-icon-template" icon="pi pi-user">
            <ng-template #icon>
                <span class="my-icon"></span>
            </ng-template>
        </p-tag>
    `,
    standalone: true,
    imports: [Tag],
})
class TestHostComponent {}

describe('Tag', () => {
    let tag: Tag;
    let fixture: ComponentFixture<Tag>;
    let tagRef: ComponentRef<Tag>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, Tag, TestHostComponent],
        });

        fixture = TestBed.createComponent(Tag);
        tag = fixture.componentInstance;
        tagRef = fixture.componentRef;
    });

    it('should create the component', () => {
        expect(tag).toBeTruthy();
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const tagEl = fixture.debugElement.query(By.css('.p-tag'));
        expect(tagEl.nativeElement).toBeTruthy();
    });

    it('should render the tag with default properties', () => {
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement).toBeTruthy();
        expect(spanElement.classList).toContain('p-tag');
        expect(spanElement.classList).toContain('p-component');
        expect(spanElement.textContent.trim()).toBe('');
    });

    it('should apply custom style and styleClass', () => {
        tagRef.setInput('styleClass', 'custom-class');
        tagRef.setInput('style', { color: 'red' });
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('custom-class');
        expect(spanElement.style.color).toBe('red');
    });

    it('should render the value inside the tag', () => {
        tagRef.setInput('value', 'Test Value');
        fixture.detectChanges();

        const labelElement = fixture.nativeElement.querySelector('.p-tag-label');
        expect(labelElement.textContent).toBe('Test Value');
    });

    it('should render icon when icon property is set', () => {
        tagRef.setInput('icon', 'pi pi-check');
        fixture.detectChanges();

        const iconElement = fixture.nativeElement.querySelector('.p-tag-icon');
        expect(iconElement).toBeTruthy();
        expect(iconElement.classList).toContain('pi');
        expect(iconElement.classList).toContain('pi-check');
    });

    it('should apply severity class based on severity property', () => {
        tagRef.setInput('severity', 'danger');
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('p-tag-danger');
    });

    it('should apply rounded class when rounded is true', () => {
        tagRef.setInput('rounded', true);
        fixture.detectChanges();

        const spanElement = fixture.nativeElement.querySelector('span');
        expect(spanElement.classList).toContain('p-tag-rounded');
    });

    it('should render projected content inside the tag', () => {
        const tagContentFixture = TestBed.createComponent(TestHostComponent);
        tagContentFixture.detectChanges();

        const tagElement = tagContentFixture.nativeElement.querySelector('.custom-content');

        expect(tagElement).toBeTruthy();
        expect(tagElement.textContent).toBe('Test Content');
    });

    it('should not render the icon if neither icon nor iconTemplate is provided', () => {
        fixture.detectChanges();

        const iconElement = fixture.nativeElement.querySelector('.p-tag-icon');
        expect(iconElement).toBeNull();
    });

    it('should render iconTemplate if provided and not render icon', () => {
        const tagContentFixture = TestBed.createComponent(TestHostComponent);
        tagContentFixture.detectChanges();

        const tagElementWithIcon = tagContentFixture.nativeElement.querySelectorAll('.custom-icon-template .p-tag-icon');
        // only one icon
        expect(tagElementWithIcon.length).toEqual(1);

        const tagElementWithIconTemplate = tagElementWithIcon[0].querySelector('.my-icon');
        expect(tagElementWithIconTemplate).toBeTruthy();
    });
});

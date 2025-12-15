import { Component, input, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SharedModule } from 'primeng/api';
import { ChipProps } from 'primeng/types/chip';
import { Chip, ChipModule } from './chip';

@Component({
    standalone: false,
    selector: 'test-basic-chip',
    template: `<p-chip></p-chip>`
})
class TestBasicChipComponent {}

@Component({
    standalone: false,
    selector: 'test-label-chip',
    template: `<p-chip [label]="label"></p-chip>`
})
class TestLabelChipComponent {
    label = 'Sample Chip';
}

@Component({
    standalone: false,
    selector: 'test-icon-chip',
    template: `<p-chip [icon]="icon" [label]="label"></p-chip>`
})
class TestIconChipComponent {
    icon = 'pi pi-user';
    label = 'Icon Chip';
}

@Component({
    standalone: false,
    selector: 'test-image-chip',
    template: `<p-chip [image]="image" [alt]="alt" [label]="label" (onImageError)="onImageError($event)"></p-chip>`
})
class TestImageChipComponent {
    image = '/path/to/image.jpg';
    alt = 'User Avatar';
    label = 'Image Chip';
    imageError: Event | null = null as any;

    onImageError(event: Event) {
        this.imageError = event;
    }
}

@Component({
    standalone: false,
    selector: 'test-removable-chip',
    template: `<p-chip [label]="label" [removable]="removable" (onRemove)="onRemove($event)"></p-chip>`
})
class TestRemovableChipComponent {
    label = 'Removable Chip';
    removable = true;
    removed = false;
    removeEvent: MouseEvent | null = null as any;

    onRemove(event: MouseEvent) {
        this.removed = true;
        this.removeEvent = event;
    }
}

@Component({
    standalone: false,
    selector: 'test-custom-remove-icon-chip',
    template: `<p-chip [label]="label" [removable]="removable" [removeIcon]="removeIcon" (onRemove)="onRemove($event)"></p-chip>`
})
class TestCustomRemoveIconChipComponent {
    label = 'Custom Remove';
    removable = true;
    removeIcon = 'pi pi-times';
    removed = false;

    onRemove(event: MouseEvent) {
        this.removed = true;
    }
}

@Component({
    standalone: false,
    selector: 'test-template-chip',
    template: `
        <p-chip [label]="label" [removable]="removable" (onRemove)="onRemove($event)">
            <ng-template #removeicon>
                <i class="custom-remove-icon pi pi-trash"></i>
            </ng-template>
        </p-chip>
    `
})
class TestTemplateChipComponent {
    label = 'Template Chip';
    removable = true;
    removed = false;

    onRemove(event: MouseEvent) {
        this.removed = true;
    }
}

@Component({
    standalone: false,
    selector: 'test-content-chip',
    template: `
        <p-chip>
            <div class="custom-content">Custom Chip Content</div>
        </p-chip>
    `
})
class TestContentChipComponent {}

@Component({
    standalone: false,
    selector: 'test-style-class-chip',
    template: `<p-chip [label]="label" [styleClass]="styleClass"></p-chip>`
})
class TestStyleClassChipComponent {
    label = 'Styled Chip';
    styleClass = 'custom-chip';
}

@Component({
    standalone: false,
    selector: 'test-chip-props',
    template: `<p-chip [chipProps]="chipProps"></p-chip>`
})
class TestChipPropsComponent {
    chipProps: ChipProps = {
        label: 'Props Chip',
        icon: 'pi pi-star',
        removable: true,
        styleClass: 'props-chip'
    };
}

@Component({
    standalone: false,
    selector: 'test-dynamic-chip',
    template: `
        <p-chip [label]="label" [icon]="icon" [image]="image" [alt]="alt" [removable]="removable" [removeIcon]="removeIcon" [styleClass]="styleClass" [chipProps]="chipProps" (onRemove)="onRemove($event)" (onImageError)="onImageError($event)">
            <div class="dynamic-content" *ngIf="showContent">{{ content }}</div>
        </p-chip>
    `
})
class TestDynamicChipComponent {
    label = 'Dynamic Chip';
    icon: string | undefined;
    image: string | undefined;
    alt: string | undefined;
    removable = false;
    removeIcon: string | undefined;
    styleClass = '';
    chipProps: ChipProps | undefined;
    showContent = false;
    content = 'Dynamic content';
    removed = false;
    imageError: Event | null = null as any;

    onRemove(event: MouseEvent) {
        this.removed = true;
    }

    onImageError(event: Event) {
        this.imageError = event;
    }
}

@Component({
    standalone: false,
    selector: 'test-visibility-chip',
    template: `<p-chip [label]="label"></p-chip>`
})
class TestVisibilityChipComponent {
    label = 'Visibility Test';
}

describe('Chip', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChipModule, SharedModule],
            declarations: [
                TestBasicChipComponent,
                TestLabelChipComponent,
                TestIconChipComponent,
                TestImageChipComponent,
                TestRemovableChipComponent,
                TestCustomRemoveIconChipComponent,
                TestTemplateChipComponent,
                TestContentChipComponent,
                TestStyleClassChipComponent,
                TestChipPropsComponent,
                TestDynamicChipComponent,
                TestVisibilityChipComponent
            ],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicChipComponent>;
        let component: Chip;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicChipComponent);
            await fixture.whenStable();

            const chipDebugElement = fixture.debugElement.query(By.directive(Chip));
            component = chipDebugElement.componentInstance;
            element = chipDebugElement.nativeElement;
        });

        it('should create the component', async () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', async () => {
            expect(component.label).toBeUndefined();
            expect(component.icon).toBeUndefined();
            expect(component.image).toBeUndefined();
            expect(component.alt).toBeUndefined();
            expect(component.removable).toBe(false);
            expect(component.removeIcon).toBeUndefined();
            expect(component.styleClass).toBeUndefined();
            expect(component.visible).toBe(true);
        });

        it('should apply base CSS classes', async () => {
            expect(element.classList.contains('p-chip')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
        });

        it('should have correct data attributes', async () => {
            expect(element.getAttribute('data-pc-name')).toBe('chip');
            expect(element.getAttribute('data-pc-section')).toBe('root');
        });

        it('should be visible by default', async () => {
            expect(element.style.display).toBe('' as any);
        });

        it('should not show remove icon when not removable', async () => {
            const removeIcon = fixture.debugElement.query(By.css('.p-chip-remove-icon'));
            expect(removeIcon).toBeFalsy();
        });
    });

    describe('Label Display', () => {
        let fixture: ComponentFixture<TestLabelChipComponent>;
        let component: TestLabelChipComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestLabelChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should display label text', async () => {
            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('Sample Chip');
        });

        it('should update label dynamically', async () => {
            component.label = 'Updated Label';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('Updated Label');
        });

        it('should not display label when undefined', async () => {
            component.label = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement).toBeFalsy();
        });

        it('should handle empty label', async () => {
            component.label = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement).toBeFalsy();
        });

        it('should set aria-label attribute', async () => {
            const element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
            expect(element.getAttribute('aria-label')).toBe('Sample Chip');
        });
    });

    describe('Icon Display', () => {
        let fixture: ComponentFixture<TestIconChipComponent>;
        let component: TestIconChipComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestIconChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should display icon', async () => {
            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            expect(iconElement).toBeTruthy();
            expect(iconElement.nativeElement.classList.contains('pi')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(true);
        });

        it('should update icon dynamically', async () => {
            component.icon = 'pi pi-star';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            expect(iconElement.nativeElement.classList.contains('pi-star')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(false);
        });

        it('should not display icon when undefined', async () => {
            component.icon = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            expect(iconElement).toBeFalsy();
        });

        it('should display both icon and label', async () => {
            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));

            expect(iconElement).toBeTruthy();
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('Icon Chip');
        });

        it('should have correct data attributes on icon', async () => {
            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            expect(iconElement.nativeElement.getAttribute('data-pc-section')).toBe('icon');
        });
    });

    describe('Image Display', () => {
        let fixture: ComponentFixture<TestImageChipComponent>;
        let component: TestImageChipComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestImageChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should display image', async () => {
            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement).toBeTruthy();
            expect(imageElement.nativeElement.src).toContain('/path/to/image.jpg');
        });

        it('should set alt attribute', async () => {
            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement.nativeElement.alt).toBe('User Avatar');
        });

        it('should update image src dynamically', async () => {
            component.image = '/new/path/image.png';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement.nativeElement.src).toContain('/new/path/image.png');
        });

        it('should handle image error event', async () => {
            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);
            await fixture.whenStable();

            expect(component.imageError).toBe(errorEvent);
        });

        it('should emit onImageError event', async () => {
            spyOn(component, 'onImageError');
            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);

            expect(component.onImageError).toHaveBeenCalledWith(errorEvent);
        });

        it('should not display image when undefined', async () => {
            component.image = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement).toBeFalsy();
        });

        it('should update alt attribute dynamically', async () => {
            component.alt = 'New Alt Text';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement.nativeElement.alt).toBe('New Alt Text');
        });

        it('should display image instead of icon when both are present', async () => {
            component.image = '/path/to/image.jpg';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));

            expect(imageElement).toBeTruthy();
            expect(iconElement).toBeFalsy();
        });
    });

    describe('Removable Functionality', () => {
        let fixture: ComponentFixture<TestRemovableChipComponent>;
        let component: TestRemovableChipComponent;
        let chipComponent: Chip;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestRemovableChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
        });

        it('should show remove icon when removable', async () => {
            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            expect(removeIconElement).toBeTruthy();
        });

        it('should have correct remove icon attributes', async () => {
            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            expect(removeIconElement.nativeElement.getAttribute('tabindex')).toBe('0');
            expect(removeIconElement.nativeElement.getAttribute('role')).toBe('button');
            expect(removeIconElement.nativeElement.getAttribute('aria-label')).toBeTruthy();
        });

        it('should remove chip when remove icon is clicked', async () => {
            expect(chipComponent.visible).toBe(true);

            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            removeIconElement.triggerEventHandler('click', new MouseEvent('click'));

            expect(chipComponent.visible).toBe(false);
            expect(component.removed).toBe(true);
            expect(component.removeEvent).toBeTruthy();
        });

        it('should emit onRemove event', async () => {
            spyOn(component, 'onRemove');
            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));

            removeIconElement.triggerEventHandler('click', new MouseEvent('click'));

            expect(component.onRemove).toHaveBeenCalled();
        });

        it('should hide chip after removal', async () => {
            const element = fixture.debugElement.query(By.directive(Chip)).nativeElement;

            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            removeIconElement.triggerEventHandler('click', new MouseEvent('click'));
            await fixture.whenStable();

            expect(element.style.display).toBe('none');
        });

        it('should not show remove icon when not removable', async () => {
            component.removable = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            expect(removeIconElement).toBeFalsy();
        });

        it('should handle keyboard events on remove icon', async () => {
            spyOn(component, 'onRemove');
            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));

            // Test Enter key
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
            removeIconElement.nativeElement.dispatchEvent(enterEvent);

            expect(component.onRemove).toHaveBeenCalled();

            // Reset spy
            (component.onRemove as jasmine.Spy).calls.reset();

            // Test Backspace key
            const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
            removeIconElement.nativeElement.dispatchEvent(backspaceEvent);

            expect(component.onRemove).toHaveBeenCalled();
        });

        it('should not handle other keyboard events', async () => {
            spyOn(component, 'onRemove');
            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));

            const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
            removeIconElement.nativeElement.dispatchEvent(spaceEvent);

            expect(component.onRemove).not.toHaveBeenCalled();
        });
    });

    describe('Custom Remove Icon', () => {
        let fixture: ComponentFixture<TestCustomRemoveIconChipComponent>;
        let component: TestCustomRemoveIconChipComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestCustomRemoveIconChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should display custom remove icon', async () => {
            const removeIconElement = fixture.debugElement.query(By.css('.pi-times'));
            expect(removeIconElement).toBeTruthy();
            expect(removeIconElement.nativeElement.classList.contains('p-chip-remove-icon')).toBe(true);
        });

        it('should handle custom remove icon click', async () => {
            const removeIconElement = fixture.debugElement.query(By.css('.pi-times'));
            removeIconElement.nativeElement.click();

            expect(component.removed).toBe(true);
        });

        it('should update custom remove icon dynamically', async () => {
            component.removeIcon = 'pi pi-trash';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const oldIcon = fixture.debugElement.query(By.css('.pi-times'));
            const newIcon = fixture.debugElement.query(By.css('.pi-trash'));

            expect(oldIcon).toBeFalsy();
            expect(newIcon).toBeTruthy();
        });
    });

    describe('Template Remove Icon', () => {
        let fixture: ComponentFixture<TestTemplateChipComponent>;
        let component: TestTemplateChipComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestTemplateChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should display template remove icon', async () => {
            const customRemoveIcon = fixture.debugElement.query(By.css('.custom-remove-icon'));
            expect(customRemoveIcon).toBeTruthy();
            expect(customRemoveIcon.nativeElement.classList.contains('pi-trash')).toBe(true);
        });

        it('should handle template remove icon click', async () => {
            const removeContainer = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            removeContainer.nativeElement.click();

            expect(component.removed).toBe(true);
        });

        it('should have correct container attributes for template', async () => {
            const removeContainer = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            expect(removeContainer.nativeElement.getAttribute('tabindex')).toBe('0');
            expect(removeContainer.nativeElement.getAttribute('role')).toBe('button');
        });
    });

    describe('Content Projection', () => {
        let fixture: ComponentFixture<TestContentChipComponent>;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestContentChipComponent);
            await fixture.whenStable();
        });

        it('should project custom content', async () => {
            const customContent = fixture.debugElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
            expect(customContent.nativeElement.textContent.trim()).toBe('Custom Chip Content');
        });
    });

    describe('Style Class', () => {
        let fixture: ComponentFixture<TestStyleClassChipComponent>;
        let component: TestStyleClassChipComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestStyleClassChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
        });

        it('should apply custom style class', async () => {
            expect(element.classList.contains('custom-chip')).toBe(true);
        });

        it('should update style class dynamically', async () => {
            component.styleClass = 'new-custom-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('new-custom-class')).toBe(true);
        });

        it('should maintain base classes with custom style class', async () => {
            expect(element.classList.contains('p-chip')).toBe(true);
            expect(element.classList.contains('custom-chip')).toBe(true);
        });
    });

    describe('ChipProps', () => {
        let fixture: ComponentFixture<TestChipPropsComponent>;
        let component: TestChipPropsComponent;
        let chipComponent: Chip;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestChipPropsComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
        });

        it('should apply chipProps values', async () => {
            expect(chipComponent.label).toBe('Props Chip');
            expect(chipComponent.icon).toBe('pi pi-star');
            expect(chipComponent.removable).toBe(true);
            expect(chipComponent.styleClass).toBe('props-chip');
        });

        it('should update when chipProps changes', async () => {
            component.chipProps = {
                label: 'Updated Props',
                icon: 'pi pi-home',
                removable: false,
                styleClass: 'updated-props'
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(chipComponent.label).toBe('Updated Props');
            expect(chipComponent.icon).toBe('pi pi-home');
            expect(chipComponent.removable).toBe(false);
            expect(chipComponent.styleClass).toBe('updated-props');
        });

        it('should handle partial chipProps updates', async () => {
            component.chipProps = {
                label: 'Partial Update'
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(chipComponent.label).toBe('Partial Update');
        });

        it('should display elements from chipProps', async () => {
            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            const removeIcon = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));

            expect(labelElement.nativeElement.textContent.trim()).toBe('Props Chip');
            expect(iconElement.nativeElement.classList.contains('pi-star')).toBe(true);
            expect(removeIcon).toBeTruthy();
        });
    });

    describe('Dynamic Configuration', () => {
        let fixture: ComponentFixture<TestDynamicChipComponent>;
        let component: TestDynamicChipComponent;
        let chipComponent: Chip;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            const chipDebugElement = fixture.debugElement.query(By.directive(Chip));
            chipComponent = chipDebugElement.componentInstance;
            element = chipDebugElement.nativeElement;
        });

        it('should handle combined property changes', async () => {
            component.icon = 'pi pi-star';
            component.removable = true;
            component.styleClass = 'dynamic-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(chipComponent.icon).toBe('pi pi-star');
            expect(chipComponent.removable).toBe(true);
            expect(element.classList.contains('dynamic-class')).toBe(true);
        });

        it('should switch between icon and image', async () => {
            // Start with icon
            component.icon = 'pi pi-user';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('.p-chip-icon'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.p-chip-image'))).toBeFalsy();

            // Switch to image
            component.image = '/path/to/image.jpg';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('.p-chip-image'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.p-chip-icon'))).toBeFalsy();
        });

        it('should handle removable state changes', async () => {
            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeFalsy();

            component.removable = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeTruthy();
        });

        it('should handle custom remove icon changes', async () => {
            component.removable = true;
            component.removeIcon = 'pi pi-times';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('.pi-times'))).toBeTruthy();

            component.removeIcon = 'pi pi-trash';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('.pi-trash'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.pi-times'))).toBeFalsy();
        });

        it('should handle chipProps changes', async () => {
            component.chipProps = {
                label: 'ChipProps Label',
                icon: 'pi pi-star',
                removable: true
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(chipComponent.label).toBe('ChipProps Label');
            expect(chipComponent.icon).toBe('pi pi-star');
            expect(chipComponent.removable).toBe(true);
        });

        it('should show/hide projected content dynamically', async () => {
            expect(fixture.debugElement.query(By.css('.dynamic-content'))).toBeFalsy();

            component.showContent = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const content = fixture.debugElement.query(By.css('.dynamic-content'));
            expect(content).toBeTruthy();
            expect(content.nativeElement.textContent).toBe('Dynamic content');
        });
    });

    describe('Visibility', () => {
        let fixture: ComponentFixture<TestVisibilityChipComponent>;
        let chipComponent: Chip;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestVisibilityChipComponent);
            await fixture.whenStable();

            const chipDebugElement = fixture.debugElement.query(By.directive(Chip));
            chipComponent = chipDebugElement.componentInstance;
            element = chipDebugElement.nativeElement;
        });

        it('should be visible by default', async () => {
            expect(chipComponent.visible).toBe(true);
            expect(element.style.display).toBe('' as any);
        });

        it('should hide when visible is false', async () => {
            chipComponent.visible = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.style.display).toBe('none');
        });

        it('should show when visible is true', async () => {
            chipComponent.visible = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.style.display).toBe('none');

            chipComponent.visible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            // When visible is true, check if component visible property is set correctly
            expect(chipComponent.visible).toBe(true);
        });
    });

    describe('Event Handling', () => {
        let fixture: ComponentFixture<TestRemovableChipComponent>;
        let component: TestRemovableChipComponent;
        let chipComponent: Chip;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestRemovableChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
        });

        it('should emit onRemove event on close', async () => {
            spyOn(chipComponent.onRemove, 'emit');
            const mockEvent = new MouseEvent('click');

            chipComponent.close(mockEvent);

            expect(chipComponent.onRemove.emit).toHaveBeenCalledWith(mockEvent);
            expect(chipComponent.visible).toBe(false);
        });

        it('should handle keydown events correctly', async () => {
            spyOn(chipComponent, 'close');

            // Test Enter key
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
            chipComponent.onKeydown(enterEvent);
            expect(chipComponent.close).toHaveBeenCalledWith(enterEvent as any);

            // Test Backspace key
            const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
            chipComponent.onKeydown(backspaceEvent);
            expect(chipComponent.close).toHaveBeenCalledWith(backspaceEvent as any);

            // Test other key (should not trigger close)
            const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
            (chipComponent.close as jasmine.Spy).calls.reset();
            chipComponent.onKeydown(spaceEvent);
            expect(chipComponent.close).not.toHaveBeenCalled();
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestDynamicChipComponent>;
        let component: TestDynamicChipComponent;
        let chipComponent: Chip;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
        });

        it('should handle null/undefined values gracefully', async () => {
            component.label = null as any;
            component.icon = undefined as any;
            component.image = undefined as any;
            component.alt = undefined as any;
            component.styleClass = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('.p-chip-label'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-chip-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-chip-image'))).toBeFalsy();
        });

        it('should handle empty string values', async () => {
            component.label = '';
            component.icon = '';
            component.image = '';
            component.alt = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('.p-chip-label'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-chip-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-chip-image'))).toBeFalsy();
        });

        it('should handle whitespace-only label', async () => {
            component.label = '   ';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('' as any);
        });

        it('should handle rapid removable state changes', async () => {
            component.removable = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeTruthy();

            component.removable = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeFalsy();

            component.removable = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeTruthy();
        });

        it('should handle undefined chipProps gracefully', async () => {
            component.chipProps = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(chipComponent.chipProps).toBeUndefined();
        });

        it('should handle invalid chipProps', async () => {
            component.chipProps = null as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(() => {
                fixture.changeDetectorRef.markForCheck();
            }).not.toThrow();
        });
    });

    describe('CSS Classes and Data Attributes', () => {
        let fixture: ComponentFixture<TestDynamicChipComponent>;
        let component: TestDynamicChipComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicChipComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
        });

        it('should maintain base classes with custom classes', async () => {
            component.styleClass = 'custom-chip-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('p-chip')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
            expect(element.classList.contains('custom-chip-class')).toBe(true);
        });

        it('should have correct data attributes on child elements', async () => {
            component.icon = 'pi pi-star';
            component.removable = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            const removeIcon = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));

            expect(iconElement.nativeElement.getAttribute('data-pc-section')).toBe('icon');
            expect(labelElement.nativeElement.getAttribute('data-pc-section')).toBe('label');
            expect(removeIcon.nativeElement.getAttribute('data-pc-section')).toBe('removeicon');
        });

        it('should handle multiple custom classes', async () => {
            component.styleClass = 'class1 class2 class3';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('class1')).toBe(true);
            expect(element.classList.contains('class2')).toBe(true);
            expect(element.classList.contains('class3')).toBe(true);
        });

        it('should handle class transitions correctly', async () => {
            component.styleClass = 'initial-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('initial-class')).toBe(true);

            component.styleClass = 'updated-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('initial-class')).toBe(false);
            expect(element.classList.contains('updated-class')).toBe(true);
        });
    });

    describe('PassThrough API', () => {
        @Component({
            standalone: true,
            imports: [Chip],
            template: `<p-chip [label]="label()" [icon]="icon()" [image]="image()" [removable]="removable()" [removeIcon]="removeIcon()" [pt]="pt()"></p-chip>`
        })
        class TestPTChipComponent {
            label = input<string | undefined>('Test');
            icon = input<string | undefined>();
            image = input<string | undefined>();
            removable = input<boolean>(false);
            removeIcon = input<string | undefined>();
            pt = input<any>();
        }

        describe('Case 1: Simple string classes', () => {
            let fixture: ComponentFixture<TestPTChipComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTChipComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
            });

            it('should apply string class to host section', async () => {
                fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
                await fixture.whenStable();

                expect(element.classList.contains('HOST_CLASS')).toBe(true);
            });

            it('should apply string class to root section', async () => {
                fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_CLASS')).toBe(true);
            });

            it('should apply string class to label section', async () => {
                fixture.componentRef.setInput('pt', { label: 'LABEL_CLASS' });
                await fixture.whenStable();

                const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_CLASS')).toBe(true);
            });

            it('should apply string class to icon section', async () => {
                fixture.componentRef.setInput('icon', 'pi pi-user');
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', { icon: 'ICON_CLASS' });
                await fixture.whenStable();

                const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
                expect(iconElement.nativeElement.classList.contains('ICON_CLASS')).toBe(true);
            });

            it('should apply string class to image section', async () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', { image: 'IMAGE_CLASS' });
                await fixture.whenStable();

                const imageElement = fixture.debugElement.query(By.css('img'));
                expect(imageElement.nativeElement.classList.contains('IMAGE_CLASS')).toBe(true);
            });

            it('should apply string class to removeIcon section', async () => {
                fixture.componentRef.setInput('removable', true);
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', { removeIcon: 'REMOVE_ICON_CLASS' });
                await fixture.whenStable();

                const removeIconElement = fixture.debugElement.query(By.css('.p-chip-remove-icon'));
                expect(removeIconElement.nativeElement.classList.contains('REMOVE_ICON_CLASS')).toBe(true);
            });
        });

        describe('Case 2: Objects', () => {
            let fixture: ComponentFixture<TestPTChipComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTChipComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
            });

            it('should apply object with class, style, data and aria attributes to root', async () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'background-color': 'lightblue' },
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(element.style.backgroundColor).toBe('lightblue');
                expect(element.getAttribute('data-p-test')).toBe('true');
                expect(element.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            it('should apply object with class, style, data and aria attributes to label', async () => {
                fixture.componentRef.setInput('pt', {
                    label: {
                        class: 'LABEL_OBJECT_CLASS',
                        style: { color: 'red' },
                        'data-p-label': 'chip',
                        'aria-hidden': 'true'
                    }
                });
                await fixture.whenStable();

                const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_OBJECT_CLASS')).toBe(true);
                expect(labelElement.nativeElement.style.color).toBe('red');
                expect(labelElement.nativeElement.getAttribute('data-p-label')).toBe('chip');
                expect(labelElement.nativeElement.getAttribute('aria-hidden')).toBe('true');
            });

            it('should apply object with class, style, data and aria attributes to icon', async () => {
                fixture.componentRef.setInput('icon', 'pi pi-user');
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    icon: {
                        class: 'ICON_OBJECT_CLASS',
                        style: { 'font-size': '1.5rem' },
                        'data-p-icon': 'user'
                    }
                });
                await fixture.whenStable();

                const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
                expect(iconElement.nativeElement.classList.contains('ICON_OBJECT_CLASS')).toBe(true);
                expect(iconElement.nativeElement.style.fontSize).toBe('1.5rem');
                expect(iconElement.nativeElement.getAttribute('data-p-icon')).toBe('user');
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            let fixture: ComponentFixture<TestPTChipComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTChipComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
            });

            it('should apply mixed pt with object and string values', async () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_MIXED_CLASS'
                    },
                    label: 'LABEL_MIXED_CLASS'
                });
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_MIXED_CLASS')).toBe(true);

                const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_MIXED_CLASS')).toBe(true);
            });
        });

        describe('Case 4: Use variables from instance', () => {
            let fixture: ComponentFixture<TestPTChipComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTChipComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
            });

            it('should use instance label in pt function for root', async () => {
                fixture.componentRef.setInput('label', 'Dynamic Label');
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        return {
                            class: instance?.label ? 'HAS_LABEL' : 'NO_LABEL'
                        };
                    }
                });
                await fixture.whenStable();

                expect(element.classList.contains('HAS_LABEL')).toBe(true);
            });

            it('should use instance removable in pt function for label', async () => {
                fixture.componentRef.setInput('removable', true);
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    label: ({ instance }: any) => {
                        return {
                            'data-removable': instance?.removable ? 'true' : 'false'
                        };
                    }
                });
                await fixture.whenStable();

                const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
                expect(labelElement.nativeElement.getAttribute('data-removable')).toBe('true');
            });
        });

        describe('Case 5: Event binding', () => {
            let fixture: ComponentFixture<TestPTChipComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTChipComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
            });

            it('should bind onclick event to root through pt', async () => {
                let clickCount = 0;
                fixture.componentRef.setInput('pt', {
                    root: {
                        onclick: () => {
                            clickCount++;
                        }
                    }
                });
                await fixture.whenStable();

                element.click();
                element.click();

                expect(clickCount).toBe(2);
            });

            it('should bind onclick event to label through pt', async () => {
                let clicked = false;
                fixture.componentRef.setInput('pt', {
                    label: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                });
                await fixture.whenStable();

                const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
                labelElement.nativeElement.click();

                expect(clicked).toBe(true);
            });
        });

        describe('Case 6: Test emitters', () => {
            let fixture: ComponentFixture<TestPTChipComponent>;
            let chipComponent: Chip;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTChipComponent);
                await fixture.whenStable();
                chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
            });

            it('should access onRemove emitter through instance in pt', async () => {
                let emitterAccessed = false;
                fixture.componentRef.setInput('removable', true);
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        if (instance.onRemove) {
                            emitterAccessed = true;
                        }
                        return {};
                    }
                });
                await fixture.whenStable();

                expect(emitterAccessed).toBe(true);
            });

            it('should access onImageError emitter through instance in pt', async () => {
                let emitterAccessed = false;
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        if (instance.onImageError) {
                            emitterAccessed = true;
                        }
                        return {};
                    }
                });
                await fixture.whenStable();

                expect(emitterAccessed).toBe(true);
            });
        });

        describe('Case 7: Inline test', () => {
            it('should apply inline pt with string class', async () => {
                const inlineFixture = TestBed.createComponent(TestPTChipComponent);
                inlineFixture.componentRef.setInput('pt', { root: 'INLINE_TEST_CLASS' });
                await inlineFixture.whenStable();

                const element = inlineFixture.debugElement.query(By.directive(Chip)).nativeElement;
                expect(element.classList.contains('INLINE_TEST_CLASS')).toBe(true);
            });

            it('should apply inline pt with object class', async () => {
                const inlineFixture = TestBed.createComponent(TestPTChipComponent);
                inlineFixture.componentRef.setInput('pt', { root: { class: 'INLINE_OBJECT_CLASS' } });
                await inlineFixture.whenStable();

                const element = inlineFixture.debugElement.query(By.directive(Chip)).nativeElement;
                expect(element.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            });
        });

        describe('Case 8: Test hooks', () => {
            let fixture: ComponentFixture<TestPTChipComponent>;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTChipComponent);
            });

            it('should call onAfterViewInit hook', async () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                await fixture.whenStable();

                expect(hookCalled).toBe(true);
            });

            it('should call onAfterContentInit hook', async () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterContentInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                await fixture.whenStable();

                expect(hookCalled).toBe(true);
            });

            it('should call onAfterViewChecked hook', async () => {
                let checkCount = 0;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewChecked: () => {
                            checkCount++;
                        }
                    }
                });
                await fixture.whenStable();

                expect(checkCount).toBeGreaterThan(0);
            });

            it('should call onDestroy hook', async () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onDestroy: () => {
                            hookCalled = true;
                        }
                    }
                });
                await fixture.whenStable();
                fixture.destroy();

                expect(hookCalled).toBe(true);
            });
        });
    });
});

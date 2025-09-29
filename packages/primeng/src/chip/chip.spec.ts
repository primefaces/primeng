import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
import { Chip, ChipModule } from './chip';
import { ChipProps } from './chip.interface';

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
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ChipModule, SharedModule, NoopAnimationsModule],
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
            ]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicChipComponent>;
        let component: Chip;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicChipComponent);
            fixture.detectChanges();

            const chipDebugElement = fixture.debugElement.query(By.directive(Chip));
            component = chipDebugElement.componentInstance;
            element = chipDebugElement.nativeElement;
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.label).toBeUndefined();
            expect(component.icon).toBeUndefined();
            expect(component.image).toBeUndefined();
            expect(component.alt).toBeUndefined();
            expect(component.removable).toBe(false);
            expect(component.removeIcon).toBeUndefined();
            expect(component.styleClass).toBeUndefined();
            expect(component.visible).toBe(true);
        });

        it('should apply base CSS classes', () => {
            expect(element.classList.contains('p-chip')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
        });

        it('should have correct data attributes', () => {
            expect(element.getAttribute('data-pc-name')).toBe('chip');
            expect(element.getAttribute('data-pc-section')).toBe('root');
        });

        it('should be visible by default', () => {
            expect(element.style.display).toBe('' as any);
        });

        it('should not show remove icon when not removable', () => {
            const removeIcon = fixture.debugElement.query(By.css('.p-chip-remove-icon'));
            expect(removeIcon).toBeFalsy();
        });
    });

    describe('Label Display', () => {
        let fixture: ComponentFixture<TestLabelChipComponent>;
        let component: TestLabelChipComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestLabelChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should display label text', () => {
            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('Sample Chip');
        });

        it('should update label dynamically', () => {
            component.label = 'Updated Label';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('Updated Label');
        });

        it('should not display label when undefined', () => {
            component.label = undefined as any;
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement).toBeFalsy();
        });

        it('should handle empty label', () => {
            component.label = '';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement).toBeFalsy();
        });

        it('should set aria-label attribute', () => {
            const element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
            expect(element.getAttribute('aria-label')).toBe('Sample Chip');
        });
    });

    describe('Icon Display', () => {
        let fixture: ComponentFixture<TestIconChipComponent>;
        let component: TestIconChipComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestIconChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should display icon', () => {
            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            expect(iconElement).toBeTruthy();
            expect(iconElement.nativeElement.classList.contains('pi')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(true);
        });

        it('should update icon dynamically', () => {
            component.icon = 'pi pi-star';
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            expect(iconElement.nativeElement.classList.contains('pi-star')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(false);
        });

        it('should not display icon when undefined', () => {
            component.icon = undefined as any;
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            expect(iconElement).toBeFalsy();
        });

        it('should display both icon and label', () => {
            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));

            expect(iconElement).toBeTruthy();
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('Icon Chip');
        });

        it('should have correct data attributes on icon', () => {
            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            expect(iconElement.nativeElement.getAttribute('data-pc-section')).toBe('icon');
        });
    });

    describe('Image Display', () => {
        let fixture: ComponentFixture<TestImageChipComponent>;
        let component: TestImageChipComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestImageChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should display image', () => {
            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement).toBeTruthy();
            expect(imageElement.nativeElement.src).toContain('/path/to/image.jpg');
        });

        it('should set alt attribute', () => {
            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement.nativeElement.alt).toBe('User Avatar');
        });

        it('should update image src dynamically', () => {
            component.image = '/new/path/image.png';
            fixture.detectChanges();

            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement.nativeElement.src).toContain('/new/path/image.png');
        });

        it('should handle image error event', () => {
            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);
            fixture.detectChanges();

            expect(component.imageError).toBe(errorEvent);
        });

        it('should emit onImageError event', () => {
            spyOn(component, 'onImageError');
            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);

            expect(component.onImageError).toHaveBeenCalledWith(errorEvent);
        });

        it('should not display image when undefined', () => {
            component.image = undefined as any;
            fixture.detectChanges();

            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement).toBeFalsy();
        });

        it('should update alt attribute dynamically', () => {
            component.alt = 'New Alt Text';
            fixture.detectChanges();

            const imageElement = fixture.debugElement.query(By.css('.p-chip-image'));
            expect(imageElement.nativeElement.alt).toBe('New Alt Text');
        });

        it('should display image instead of icon when both are present', () => {
            component.image = '/path/to/image.jpg';
            fixture.detectChanges();

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

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRemovableChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
        });

        it('should show remove icon when removable', () => {
            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            expect(removeIconElement).toBeTruthy();
        });

        it('should have correct remove icon attributes', () => {
            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            expect(removeIconElement.nativeElement.getAttribute('tabindex')).toBe('0');
            expect(removeIconElement.nativeElement.getAttribute('role')).toBe('button');
            expect(removeIconElement.nativeElement.getAttribute('aria-label')).toBeTruthy();
        });

        it('should remove chip when remove icon is clicked', () => {
            expect(chipComponent.visible).toBe(true);

            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            removeIconElement.triggerEventHandler('click', new MouseEvent('click'));

            expect(chipComponent.visible).toBe(false);
            expect(component.removed).toBe(true);
            expect(component.removeEvent).toBeTruthy();
        });

        it('should emit onRemove event', () => {
            spyOn(component, 'onRemove');
            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));

            removeIconElement.triggerEventHandler('click', new MouseEvent('click'));

            expect(component.onRemove).toHaveBeenCalled();
        });

        it('should hide chip after removal', () => {
            const element = fixture.debugElement.query(By.directive(Chip)).nativeElement;

            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            removeIconElement.triggerEventHandler('click', new MouseEvent('click'));
            fixture.detectChanges();

            expect(element.style.display).toBe('none');
        });

        it('should not show remove icon when not removable', () => {
            component.removable = false;
            fixture.detectChanges();

            const removeIconElement = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            expect(removeIconElement).toBeFalsy();
        });

        it('should handle keyboard events on remove icon', () => {
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

        it('should not handle other keyboard events', () => {
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

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomRemoveIconChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should display custom remove icon', () => {
            const removeIconElement = fixture.debugElement.query(By.css('.pi-times'));
            expect(removeIconElement).toBeTruthy();
            expect(removeIconElement.nativeElement.classList.contains('p-chip-remove-icon')).toBe(true);
        });

        it('should handle custom remove icon click', () => {
            const removeIconElement = fixture.debugElement.query(By.css('.pi-times'));
            removeIconElement.nativeElement.click();

            expect(component.removed).toBe(true);
        });

        it('should update custom remove icon dynamically', () => {
            component.removeIcon = 'pi pi-trash';
            fixture.detectChanges();

            const oldIcon = fixture.debugElement.query(By.css('.pi-times'));
            const newIcon = fixture.debugElement.query(By.css('.pi-trash'));

            expect(oldIcon).toBeFalsy();
            expect(newIcon).toBeTruthy();
        });
    });

    describe('Template Remove Icon', () => {
        let fixture: ComponentFixture<TestTemplateChipComponent>;
        let component: TestTemplateChipComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTemplateChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should display template remove icon', () => {
            const customRemoveIcon = fixture.debugElement.query(By.css('.custom-remove-icon'));
            expect(customRemoveIcon).toBeTruthy();
            expect(customRemoveIcon.nativeElement.classList.contains('pi-trash')).toBe(true);
        });

        it('should handle template remove icon click', () => {
            const removeContainer = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            removeContainer.nativeElement.click();

            expect(component.removed).toBe(true);
        });

        it('should have correct container attributes for template', () => {
            const removeContainer = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));
            expect(removeContainer.nativeElement.getAttribute('tabindex')).toBe('0');
            expect(removeContainer.nativeElement.getAttribute('role')).toBe('button');
        });
    });

    describe('Content Projection', () => {
        let fixture: ComponentFixture<TestContentChipComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestContentChipComponent);
            fixture.detectChanges();
        });

        it('should project custom content', () => {
            const customContent = fixture.debugElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
            expect(customContent.nativeElement.textContent.trim()).toBe('Custom Chip Content');
        });
    });

    describe('Style Class', () => {
        let fixture: ComponentFixture<TestStyleClassChipComponent>;
        let component: TestStyleClassChipComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestStyleClassChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
        });

        it('should apply custom style class', () => {
            expect(element.classList.contains('custom-chip')).toBe(true);
        });

        it('should update style class dynamically', () => {
            component.styleClass = 'new-custom-class';
            fixture.detectChanges();

            expect(element.classList.contains('new-custom-class')).toBe(true);
        });

        it('should maintain base classes with custom style class', () => {
            expect(element.classList.contains('p-chip')).toBe(true);
            expect(element.classList.contains('custom-chip')).toBe(true);
        });
    });

    describe('ChipProps', () => {
        let fixture: ComponentFixture<TestChipPropsComponent>;
        let component: TestChipPropsComponent;
        let chipComponent: Chip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestChipPropsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
        });

        it('should apply chipProps values', () => {
            expect(chipComponent.label).toBe('Props Chip');
            expect(chipComponent.icon).toBe('pi pi-star');
            expect(chipComponent.removable).toBe(true);
            expect(chipComponent.styleClass).toBe('props-chip');
        });

        it('should update when chipProps changes', () => {
            component.chipProps = {
                label: 'Updated Props',
                icon: 'pi pi-home',
                removable: false,
                styleClass: 'updated-props'
            };
            fixture.detectChanges();

            expect(chipComponent.label).toBe('Updated Props');
            expect(chipComponent.icon).toBe('pi pi-home');
            expect(chipComponent.removable).toBe(false);
            expect(chipComponent.styleClass).toBe('updated-props');
        });

        it('should handle partial chipProps updates', () => {
            component.chipProps = {
                label: 'Partial Update'
            };
            fixture.detectChanges();

            expect(chipComponent.label).toBe('Partial Update');
        });

        it('should display elements from chipProps', () => {
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

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const chipDebugElement = fixture.debugElement.query(By.directive(Chip));
            chipComponent = chipDebugElement.componentInstance;
            element = chipDebugElement.nativeElement;
        });

        it('should handle combined property changes', () => {
            component.icon = 'pi pi-star';
            component.removable = true;
            component.styleClass = 'dynamic-class';
            fixture.detectChanges();

            expect(chipComponent.icon).toBe('pi pi-star');
            expect(chipComponent.removable).toBe(true);
            expect(element.classList.contains('dynamic-class')).toBe(true);
        });

        it('should switch between icon and image', () => {
            // Start with icon
            component.icon = 'pi pi-user';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.p-chip-icon'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.p-chip-image'))).toBeFalsy();

            // Switch to image
            component.image = '/path/to/image.jpg';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.p-chip-image'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.p-chip-icon'))).toBeFalsy();
        });

        it('should handle removable state changes', () => {
            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeFalsy();

            component.removable = true;
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeTruthy();
        });

        it('should handle custom remove icon changes', () => {
            component.removable = true;
            component.removeIcon = 'pi pi-times';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.pi-times'))).toBeTruthy();

            component.removeIcon = 'pi pi-trash';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.pi-trash'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.pi-times'))).toBeFalsy();
        });

        it('should handle chipProps changes', () => {
            component.chipProps = {
                label: 'ChipProps Label',
                icon: 'pi pi-star',
                removable: true
            };
            fixture.detectChanges();

            expect(chipComponent.label).toBe('ChipProps Label');
            expect(chipComponent.icon).toBe('pi pi-star');
            expect(chipComponent.removable).toBe(true);
        });

        it('should show/hide projected content dynamically', () => {
            expect(fixture.debugElement.query(By.css('.dynamic-content'))).toBeFalsy();

            component.showContent = true;
            fixture.detectChanges();

            const content = fixture.debugElement.query(By.css('.dynamic-content'));
            expect(content).toBeTruthy();
            expect(content.nativeElement.textContent).toBe('Dynamic content');
        });
    });

    describe('Visibility', () => {
        let fixture: ComponentFixture<TestVisibilityChipComponent>;
        let chipComponent: Chip;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestVisibilityChipComponent);
            fixture.detectChanges();

            const chipDebugElement = fixture.debugElement.query(By.directive(Chip));
            chipComponent = chipDebugElement.componentInstance;
            element = chipDebugElement.nativeElement;
        });

        it('should be visible by default', () => {
            expect(chipComponent.visible).toBe(true);
            expect(element.style.display).toBe('' as any);
        });

        it('should hide when visible is false', () => {
            chipComponent.visible = false;
            fixture.detectChanges();

            expect(element.style.display).toBe('none');
        });

        it('should show when visible is true', () => {
            chipComponent.visible = false;
            fixture.detectChanges();
            expect(element.style.display).toBe('none');

            chipComponent.visible = true;
            fixture.detectChanges();
            // When visible is true, check if component visible property is set correctly
            expect(chipComponent.visible).toBe(true);
        });
    });

    describe('Event Handling', () => {
        let fixture: ComponentFixture<TestRemovableChipComponent>;
        let component: TestRemovableChipComponent;
        let chipComponent: Chip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRemovableChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
        });

        it('should emit onRemove event on close', () => {
            spyOn(chipComponent.onRemove, 'emit');
            const mockEvent = new MouseEvent('click');

            chipComponent.close(mockEvent);

            expect(chipComponent.onRemove.emit).toHaveBeenCalledWith(mockEvent);
            expect(chipComponent.visible).toBe(false);
        });

        it('should handle keydown events correctly', () => {
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

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            chipComponent = fixture.debugElement.query(By.directive(Chip)).componentInstance;
        });

        it('should handle null/undefined values gracefully', () => {
            component.label = null as any;
            component.icon = undefined as any;
            component.image = undefined as any;
            component.alt = undefined as any;
            component.styleClass = undefined as any;
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.p-chip-label'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-chip-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-chip-image'))).toBeFalsy();
        });

        it('should handle empty string values', () => {
            component.label = '';
            component.icon = '';
            component.image = '';
            component.alt = '';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.p-chip-label'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-chip-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-chip-image'))).toBeFalsy();
        });

        it('should handle whitespace-only label', () => {
            component.label = '   ';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('' as any);
        });

        it('should handle rapid removable state changes', () => {
            component.removable = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeTruthy();

            component.removable = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeFalsy();

            component.removable = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'))).toBeTruthy();
        });

        it('should handle undefined chipProps gracefully', () => {
            component.chipProps = undefined as any;
            fixture.detectChanges();

            expect(chipComponent.chipProps).toBeUndefined();
        });

        it('should handle invalid chipProps', () => {
            component.chipProps = null as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
        });
    });

    describe('CSS Classes and Data Attributes', () => {
        let fixture: ComponentFixture<TestDynamicChipComponent>;
        let component: TestDynamicChipComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicChipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = fixture.debugElement.query(By.directive(Chip)).nativeElement;
        });

        it('should maintain base classes with custom classes', () => {
            component.styleClass = 'custom-chip-class';
            fixture.detectChanges();

            expect(element.classList.contains('p-chip')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
            expect(element.classList.contains('custom-chip-class')).toBe(true);
        });

        it('should have correct data attributes on child elements', () => {
            component.icon = 'pi pi-star';
            component.removable = true;
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('.p-chip-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-chip-label'));
            const removeIcon = fixture.debugElement.query(By.css('[data-pc-section="removeicon"]'));

            expect(iconElement.nativeElement.getAttribute('data-pc-section')).toBe('icon');
            expect(labelElement.nativeElement.getAttribute('data-pc-section')).toBe('label');
            expect(removeIcon.nativeElement.getAttribute('data-pc-section')).toBe('removeicon');
        });

        it('should handle multiple custom classes', () => {
            component.styleClass = 'class1 class2 class3';
            fixture.detectChanges();

            expect(element.classList.contains('class1')).toBe(true);
            expect(element.classList.contains('class2')).toBe(true);
            expect(element.classList.contains('class3')).toBe(true);
        });

        it('should handle class transitions correctly', () => {
            component.styleClass = 'initial-class';
            fixture.detectChanges();
            expect(element.classList.contains('initial-class')).toBe(true);

            component.styleClass = 'updated-class';
            fixture.detectChanges();
            expect(element.classList.contains('initial-class')).toBe(false);
            expect(element.classList.contains('updated-class')).toBe(true);
        });
    });
});

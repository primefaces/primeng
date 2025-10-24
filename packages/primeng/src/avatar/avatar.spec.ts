import { Component, DebugElement, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
import { Avatar, AvatarModule } from './avatar';

@Component({
    standalone: false,
    selector: 'test-basic-avatar',
    template: `<p-avatar></p-avatar>`
})
class TestBasicAvatarComponent {}

@Component({
    standalone: false,
    selector: 'test-label-avatar',
    template: `<p-avatar [label]="label"></p-avatar>`
})
class TestLabelAvatarComponent {
    label = 'JD';
}

@Component({
    standalone: false,
    selector: 'test-icon-avatar',
    template: `<p-avatar [icon]="icon"></p-avatar>`
})
class TestIconAvatarComponent {
    icon = 'pi pi-user';
}

@Component({
    standalone: false,
    selector: 'test-image-avatar',
    template: `<p-avatar [image]="image" [ariaLabel]="ariaLabel" (onImageError)="onImageError($event)"></p-avatar>`
})
class TestImageAvatarComponent {
    image = '/path/to/avatar.jpg';
    ariaLabel = 'User Avatar';
    imageError: Event | null = null as any;

    onImageError(event: Event) {
        this.imageError = event;
    }
}

@Component({
    standalone: false,
    selector: 'test-size-avatar',
    template: `<p-avatar [label]="label" [size]="size"></p-avatar>`
})
class TestSizeAvatarComponent {
    label = 'AB';
    size: 'normal' | 'large' | 'xlarge' = 'normal';
}

@Component({
    standalone: false,
    selector: 'test-shape-avatar',
    template: `<p-avatar [label]="label" [shape]="shape"></p-avatar>`
})
class TestShapeAvatarComponent {
    label = 'CD';
    shape: 'square' | 'circle' = 'square';
}

@Component({
    standalone: false,
    selector: 'test-style-class-avatar',
    template: `<p-avatar [label]="label" [styleClass]="styleClass"></p-avatar>`
})
class TestStyleClassAvatarComponent {
    label = 'EF';
    styleClass = 'custom-avatar';
}

@Component({
    standalone: false,
    selector: 'test-aria-avatar',
    template: `<p-avatar [label]="label" [ariaLabel]="ariaLabel" [ariaLabelledBy]="ariaLabelledBy"></p-avatar>`
})
class TestAriaAvatarComponent {
    label = 'GH';
    ariaLabel = 'Avatar Label';
    ariaLabelledBy = 'label-id';
}

@Component({
    standalone: false,
    selector: 'test-content-avatar',
    template: `
        <p-avatar>
            <span class="custom-content">Custom</span>
        </p-avatar>
    `
})
class TestContentAvatarComponent {}

@Component({
    standalone: false,
    selector: 'test-dynamic-avatar',
    template: ` <p-avatar [label]="label" [icon]="icon" [image]="image" [size]="size" [shape]="shape" [styleClass]="styleClass" [ariaLabel]="ariaLabel" [ariaLabelledBy]="ariaLabelledBy" (onImageError)="onImageError($event)"> </p-avatar> `
})
class TestDynamicAvatarComponent {
    label: string | undefined;
    icon: string | undefined;
    image: string | undefined;
    size: 'normal' | 'large' | 'xlarge' | undefined = 'normal';
    shape: 'square' | 'circle' | undefined = 'square';
    styleClass: string | undefined;
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
    imageError: Event | null = null as any;

    onImageError(event: Event) {
        this.imageError = event;
    }
}

@Component({
    standalone: true,
    imports: [Avatar],
    template: `<p-avatar [label]="label()" [icon]="icon()" [image]="image()" [size]="size()" [shape]="shape()" [ariaLabel]="ariaLabel()" [pt]="pt()"></p-avatar>`
})
class TestPTAvatarComponent {
    label = input<string | undefined>('PT');
    icon = input<string | undefined>();
    image = input<string | undefined>();
    size = input<'normal' | 'large' | 'xlarge' | undefined>();
    shape = input<'square' | 'circle' | undefined>();
    ariaLabel = input<string | undefined>();
    pt = input<any>();
}

describe('Avatar', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AvatarModule, SharedModule, NoopAnimationsModule],
            declarations: [
                TestBasicAvatarComponent,
                TestLabelAvatarComponent,
                TestIconAvatarComponent,
                TestImageAvatarComponent,
                TestSizeAvatarComponent,
                TestShapeAvatarComponent,
                TestStyleClassAvatarComponent,
                TestAriaAvatarComponent,
                TestContentAvatarComponent,
                TestDynamicAvatarComponent
            ]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicAvatarComponent>;
        let component: Avatar;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicAvatarComponent);
            fixture.detectChanges();

            const avatarDebugElement = fixture.debugElement.query(By.directive(Avatar));
            component = avatarDebugElement.componentInstance;
            element = avatarDebugElement.nativeElement;
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.label).toBeUndefined();
            expect(component.icon).toBeUndefined();
            expect(component.image).toBeUndefined();
            expect(component.size).toBe('normal');
            expect(component.shape).toBe('square');
            expect(component.styleClass).toBeUndefined();
            expect(component.ariaLabel).toBeUndefined();
            expect(component.ariaLabelledBy).toBeUndefined();
        });

        it('should apply base CSS classes', () => {
            expect(element.classList.contains('p-avatar')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
        });

        it('should have correct data attributes', () => {
            expect(element.getAttribute('data-pc-name')).toBe('avatar');
        });

        it('should not display any content when empty', () => {
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const imageElement = fixture.debugElement.query(By.css('img'));

            expect(labelElement).toBeFalsy();
            expect(iconElement).toBeFalsy();
            expect(imageElement).toBeFalsy();
        });
    });

    describe('Label Display', () => {
        let fixture: ComponentFixture<TestLabelAvatarComponent>;
        let component: TestLabelAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestLabelAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should display label text', () => {
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('JD');
        });

        it('should update label dynamically', () => {
            component.label = 'AB';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('AB');
        });

        it('should not display label when undefined', () => {
            component.label = undefined as any;
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement).toBeFalsy();
        });

        it('should handle empty label', () => {
            component.label = '';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement).toBeFalsy();
        });

        it('should not set aria-label attribute when only label is present', () => {
            expect(element.getAttribute('aria-label')).toBeNull();
        });

        it('should handle long labels', () => {
            component.label = 'ABCDEFGH';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('ABCDEFGH');
        });
    });

    describe('Icon Display', () => {
        let fixture: ComponentFixture<TestIconAvatarComponent>;
        let component: TestIconAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestIconAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should display icon', () => {
            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            expect(iconElement).toBeTruthy();
            expect(iconElement.nativeElement.classList.contains('pi')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(true);
        });

        it('should update icon dynamically', () => {
            component.icon = 'pi pi-star';
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            expect(iconElement.nativeElement.classList.contains('pi-star')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(false);
        });

        it('should not display icon when undefined', () => {
            component.icon = undefined as any;
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            expect(iconElement).toBeFalsy();
        });

        it('should handle icon with multiple classes', () => {
            component.icon = 'pi pi-user custom-icon';
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            expect(iconElement.nativeElement.classList.contains('pi')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('custom-icon')).toBe(true);
        });

        it('should not set aria-label attribute when only icon is present', () => {
            expect(element.getAttribute('aria-label')).toBeNull();
        });
    });

    describe('Image Display', () => {
        let fixture: ComponentFixture<TestImageAvatarComponent>;
        let component: TestImageAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestImageAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should display image', () => {
            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement).toBeTruthy();
            expect(imageElement.nativeElement.src).toContain('/path/to/avatar.jpg');
        });

        it('should update image src dynamically', () => {
            component.image = '/new/path/avatar.png';
            fixture.detectChanges();

            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement.nativeElement.src).toContain('/new/path/avatar.png');
        });

        it('should set aria-label on image', () => {
            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement.nativeElement.getAttribute('aria-label')).toBe('User Avatar');
        });

        it('should handle image error event', () => {
            const imageElement = fixture.debugElement.query(By.css('img'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);
            fixture.detectChanges();

            expect(component.imageError).toBe(errorEvent);
        });

        it('should emit onImageError event', () => {
            spyOn(component, 'onImageError');
            const imageElement = fixture.debugElement.query(By.css('img'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);

            expect(component.onImageError).toHaveBeenCalledWith(errorEvent);
        });

        it('should not display image when undefined', () => {
            component.image = undefined as any;
            fixture.detectChanges();

            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement).toBeFalsy();
        });

        it('should have p-avatar-image class when image is present', () => {
            expect(element.classList.contains('p-avatar-image')).toBe(true);
        });

        it('should remove p-avatar-image class when image is removed', () => {
            component.image = undefined as any;
            fixture.detectChanges();

            expect(element.classList.contains('p-avatar-image')).toBe(false);
        });
    });

    describe('Size Variations', () => {
        let fixture: ComponentFixture<TestSizeAvatarComponent>;
        let component: TestSizeAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestSizeAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should have no size class for normal size', () => {
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(false);
        });

        it('should apply large size class', () => {
            component.size = 'large';
            fixture.detectChanges();

            expect(element.classList.contains('p-avatar-lg')).toBe(true);
            expect(element.classList.contains('p-avatar-xl')).toBe(false);
        });

        it('should apply xlarge size class', () => {
            component.size = 'xlarge';
            fixture.detectChanges();

            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(true);
        });

        it('should switch between sizes correctly', () => {
            component.size = 'large';
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-lg')).toBe(true);

            component.size = 'xlarge';
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(true);

            component.size = 'normal';
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(false);
        });
    });

    describe('Shape Variations', () => {
        let fixture: ComponentFixture<TestShapeAvatarComponent>;
        let component: TestShapeAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestShapeAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should have no shape class for square shape', () => {
            expect(element.classList.contains('p-avatar-circle')).toBe(false);
        });

        it('should apply circle shape class', () => {
            component.shape = 'circle';
            fixture.detectChanges();

            expect(element.classList.contains('p-avatar-circle')).toBe(true);
        });

        it('should switch between shapes correctly', () => {
            component.shape = 'circle';
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-circle')).toBe(true);

            component.shape = 'square';
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-circle')).toBe(false);
        });
    });

    describe('Style Class', () => {
        let fixture: ComponentFixture<TestStyleClassAvatarComponent>;
        let component: TestStyleClassAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestStyleClassAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should apply custom style class', () => {
            expect(element.classList.contains('custom-avatar')).toBe(true);
        });

        it('should update style class dynamically', () => {
            component.styleClass = 'new-custom-class';
            fixture.detectChanges();

            expect(element.classList.contains('new-custom-class')).toBe(true);
        });

        it('should maintain base classes with custom style class', () => {
            expect(element.classList.contains('p-avatar')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
            expect(element.classList.contains('custom-avatar')).toBe(true);
        });

        it('should handle multiple custom classes', () => {
            component.styleClass = 'class1 class2 class3';
            fixture.detectChanges();

            expect(element.classList.contains('class1')).toBe(true);
            expect(element.classList.contains('class2')).toBe(true);
            expect(element.classList.contains('class3')).toBe(true);
        });

        it('should handle undefined style class', () => {
            component.styleClass = undefined as any;
            fixture.detectChanges();

            expect(element.classList.contains('p-avatar')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
        });
    });

    describe('Accessibility', () => {
        let fixture: ComponentFixture<TestAriaAvatarComponent>;
        let component: TestAriaAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestAriaAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should set aria-label attribute', () => {
            expect(element.getAttribute('aria-label')).toBe('Avatar Label');
        });

        it('should set aria-labelledby attribute', () => {
            expect(element.getAttribute('aria-labelledby')).toBe('label-id');
        });

        it('should update aria-label dynamically', () => {
            component.ariaLabel = 'New Label';
            fixture.detectChanges();

            expect(element.getAttribute('aria-label')).toBe('New Label');
        });

        it('should update aria-labelledby dynamically', () => {
            component.ariaLabelledBy = 'new-label-id';
            fixture.detectChanges();

            expect(element.getAttribute('aria-labelledby')).toBe('new-label-id');
        });

        it('should handle undefined aria attributes', () => {
            component.ariaLabel = undefined as any;
            component.ariaLabelledBy = undefined as any;
            fixture.detectChanges();

            // When ariaLabel is undefined, no fallback is used
            expect(element.getAttribute('aria-label')).toBeNull();
            expect(element.hasAttribute('aria-labelledby')).toBe(false);
        });
    });

    describe('Content Projection', () => {
        let fixture: ComponentFixture<TestContentAvatarComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestContentAvatarComponent);
            fixture.detectChanges();
        });

        it('should project custom content', () => {
            const customContent = fixture.debugElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
            expect(customContent.nativeElement.textContent.trim()).toBe('Custom');
        });

        it('should display projected content inside avatar', () => {
            const avatarElement = fixture.debugElement.query(By.directive(Avatar));
            const customContent = avatarElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
        });
    });

    describe('Priority and Combinations', () => {
        let fixture: ComponentFixture<TestDynamicAvatarComponent>;
        let component: TestDynamicAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should prioritize label over icon and image', () => {
            component.label = 'AB';
            component.icon = 'pi pi-user';
            component.image = '/path/to/image.jpg';
            fixture.detectChanges();

            const imageElement = fixture.debugElement.query(By.css('img'));
            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));

            expect(labelElement).toBeTruthy();
            expect(iconElement).toBeFalsy();
            expect(imageElement).toBeFalsy();
        });

        it('should show label when both label and icon are present', () => {
            component.label = 'AB';
            component.icon = 'pi pi-user';
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));

            expect(labelElement).toBeTruthy();
            expect(iconElement).toBeFalsy();
        });

        it('should show icon when no label is present', () => {
            component.icon = 'pi pi-user';
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));

            expect(iconElement).toBeTruthy();
            expect(labelElement).toBeFalsy();
        });

        it('should show image when no label or icon is present', () => {
            component.image = '/path/to/image.jpg';
            fixture.detectChanges();

            const imageElement = fixture.debugElement.query(By.css('img'));
            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));

            expect(imageElement).toBeTruthy();
            expect(iconElement).toBeFalsy();
            expect(labelElement).toBeFalsy();
        });

        it('should apply multiple configurations correctly', () => {
            component.label = 'XY';
            component.size = 'large';
            component.shape = 'circle';
            component.styleClass = 'custom-class';
            fixture.detectChanges();

            expect(element.classList.contains('p-avatar-lg')).toBe(true);
            expect(element.classList.contains('p-avatar-circle')).toBe(true);
            expect(element.classList.contains('custom-class')).toBe(true);

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('XY');
        });
    });

    describe('Dynamic Updates', () => {
        let fixture: ComponentFixture<TestDynamicAvatarComponent>;
        let component: TestDynamicAvatarComponent;
        let avatarComponent: Avatar;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            avatarComponent = fixture.debugElement.query(By.directive(Avatar)).componentInstance;
        });

        it('should keep showing label when icon is added', () => {
            component.label = 'AB';
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeTruthy();

            component.icon = 'pi pi-user';
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeFalsy();
        });

        it('should show image only when no label and no icon', () => {
            component.image = '/path/to/image.jpg';
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeFalsy();

            // Adding icon should hide image
            component.icon = 'pi pi-user';
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('img'))).toBeFalsy();
        });

        it('should handle rapid property changes', () => {
            component.label = 'A';
            fixture.detectChanges();

            component.label = 'B';
            fixture.detectChanges();

            component.label = 'C';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('C');
        });

        it('should handle all properties being undefined', () => {
            component.label = undefined as any;
            component.icon = undefined as any;
            component.image = undefined as any;
            component.size = undefined as any;
            component.shape = undefined as any;
            component.styleClass = undefined as any;
            component.ariaLabel = undefined as any;
            component.ariaLabelledBy = undefined as any;
            fixture.detectChanges();

            expect(avatarComponent.label).toBeUndefined();
            expect(avatarComponent.icon).toBeUndefined();
            expect(avatarComponent.image).toBeUndefined();
            expect(avatarComponent.size).toBeUndefined();
            expect(avatarComponent.shape).toBeUndefined();
            expect(avatarComponent.styleClass).toBeUndefined();
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestDynamicAvatarComponent>;
        let component: TestDynamicAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should handle empty string values', () => {
            component.label = '';
            component.icon = '';
            component.image = '';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('img'))).toBeFalsy();
        });

        it('should handle whitespace-only label', () => {
            component.label = '   ';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('' as any);
        });

        it('should handle null values gracefully', () => {
            component.label = null as any;
            component.icon = null as any;
            component.image = null as any;
            component.styleClass = null as any;
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('img'))).toBeFalsy();
        });

        it('should handle invalid size values', () => {
            component.size = 'invalid' as any;
            fixture.detectChanges();

            // Should not apply any size classes for invalid values
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(false);
        });

        it('should handle invalid shape values', () => {
            component.shape = 'invalid' as any;
            fixture.detectChanges();

            // Should not apply circle class for invalid values
            expect(element.classList.contains('p-avatar-circle')).toBe(false);
        });

        it('should handle special characters in label', () => {
            component.label = '<>&"\'';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent).toBe('<>&"\'');
        });

        it('should handle very long labels', () => {
            component.label = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        });

        it('should handle image error correctly', () => {
            const avatarComponent = fixture.debugElement.query(By.directive(Avatar)).componentInstance;
            spyOn(avatarComponent.onImageError, 'emit');

            const mockEvent = new Event('error');
            avatarComponent.imageError(mockEvent);

            expect(avatarComponent.onImageError.emit).toHaveBeenCalledWith(mockEvent);
        });
    });

    describe('CSS Classes Management', () => {
        let fixture: ComponentFixture<TestDynamicAvatarComponent>;
        let component: TestDynamicAvatarComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicAvatarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should combine all applicable classes correctly', () => {
            component.image = '/path/to/image.jpg';
            component.size = 'large';
            component.shape = 'circle';
            component.styleClass = 'custom-1 custom-2';
            fixture.detectChanges();

            expect(element.classList.contains('p-avatar')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
            expect(element.classList.contains('p-avatar-image')).toBe(true);
            expect(element.classList.contains('p-avatar-lg')).toBe(true);
            expect(element.classList.contains('p-avatar-circle')).toBe(true);
            expect(element.classList.contains('custom-1')).toBe(true);
            expect(element.classList.contains('custom-2')).toBe(true);
        });

        it('should remove p-avatar-image class when image is removed', () => {
            component.image = '/path/to/image.jpg';
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-image')).toBe(true);

            component.image = undefined as any;
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-image')).toBe(false);
        });

        it('should handle class transitions smoothly', () => {
            // Start with normal square
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-circle')).toBe(false);

            // Change to large circle
            component.size = 'large';
            component.shape = 'circle';
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-lg')).toBe(true);
            expect(element.classList.contains('p-avatar-circle')).toBe(true);

            // Change to xlarge square
            component.size = 'xlarge';
            component.shape = 'square';
            fixture.detectChanges();
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(true);
            expect(element.classList.contains('p-avatar-circle')).toBe(false);
        });
    });

    describe('PassThrough API', () => {
        describe('Case 1: Simple string classes', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                fixture.detectChanges();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should apply string class to host section', () => {
                fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
                fixture.detectChanges();

                expect(element.classList.contains('HOST_CLASS')).toBe(true);
            });

            it('should apply string class to root section', () => {
                fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
                fixture.detectChanges();

                expect(element.classList.contains('ROOT_CLASS')).toBe(true);
            });

            it('should apply string class to label section', () => {
                fixture.componentRef.setInput('pt', { label: 'LABEL_CLASS' });
                fixture.detectChanges();

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_CLASS')).toBe(true);
            });

            it('should apply string class to icon section', () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.componentRef.setInput('pt', { icon: 'ICON_CLASS' });
                fixture.detectChanges();

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                expect(iconElement.nativeElement.classList.contains('ICON_CLASS')).toBe(true);
            });

            it('should apply string class to image section', () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                fixture.componentRef.setInput('pt', { image: 'IMAGE_CLASS' });
                fixture.detectChanges();

                const imageElement = fixture.debugElement.query(By.css('img'));
                expect(imageElement.nativeElement.classList.contains('IMAGE_CLASS')).toBe(true);
            });
        });

        describe('Case 2: Objects', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                fixture.detectChanges();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should apply object with class, style, data and aria attributes to root', () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'background-color': 'red' },
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                fixture.detectChanges();

                expect(element.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(element.style.backgroundColor).toBe('red');
                expect(element.getAttribute('data-p-test')).toBe('true');
                expect(element.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            it('should apply object with class, style, data and aria attributes to label', () => {
                fixture.componentRef.setInput('pt', {
                    label: {
                        class: 'LABEL_OBJECT_CLASS',
                        style: { color: 'blue' },
                        'data-p-label': 'test',
                        'aria-hidden': 'true'
                    }
                });
                fixture.detectChanges();

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_OBJECT_CLASS')).toBe(true);
                expect(labelElement.nativeElement.style.color).toBe('blue');
                expect(labelElement.nativeElement.getAttribute('data-p-label')).toBe('test');
                expect(labelElement.nativeElement.getAttribute('aria-hidden')).toBe('true');
            });

            it('should apply object with class, style, data and aria attributes to icon', () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.detectChanges();
                fixture.componentRef.setInput('pt', {
                    icon: {
                        class: 'ICON_OBJECT_CLASS',
                        style: { 'font-size': '2rem' },
                        'data-p-icon': 'custom',
                        'aria-hidden': 'false'
                    }
                });
                fixture.detectChanges();

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                expect(iconElement.nativeElement.classList.contains('ICON_OBJECT_CLASS')).toBe(true);
                expect(iconElement.nativeElement.style.fontSize).toBe('2rem');
                expect(iconElement.nativeElement.getAttribute('data-p-icon')).toBe('custom');
                expect(iconElement.nativeElement.getAttribute('aria-hidden')).toBe('false');
            });

            it('should apply object with class, style, data and aria attributes to image', () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                fixture.detectChanges();
                fixture.componentRef.setInput('pt', {
                    image: {
                        class: 'IMAGE_OBJECT_CLASS',
                        style: { border: '2px solid black' },
                        'data-p-image': 'avatar',
                        'aria-label': 'IMAGE_ARIA_LABEL'
                    }
                });
                fixture.detectChanges();

                const imageElement = fixture.debugElement.query(By.css('img'));
                expect(imageElement.nativeElement.classList.contains('IMAGE_OBJECT_CLASS')).toBe(true);
                expect(imageElement.nativeElement.style.border).toBe('2px solid black');
                expect(imageElement.nativeElement.getAttribute('data-p-image')).toBe('avatar');
                expect(imageElement.nativeElement.getAttribute('aria-label')).toBe('IMAGE_ARIA_LABEL');
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                fixture.detectChanges();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should apply mixed pt with object and string values', () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_MIXED_CLASS'
                    },
                    label: 'LABEL_MIXED_CLASS'
                });
                fixture.detectChanges();

                expect(element.classList.contains('ROOT_MIXED_CLASS')).toBe(true);

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_MIXED_CLASS')).toBe(true);
            });

            it('should apply mixed pt across all sections', () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.detectChanges();
                fixture.componentRef.setInput('pt', {
                    host: 'HOST_STRING',
                    root: { class: 'ROOT_OBJECT' },
                    icon: 'ICON_STRING'
                });
                fixture.detectChanges();

                expect(element.classList.contains('HOST_STRING')).toBe(true);
                expect(element.classList.contains('ROOT_OBJECT')).toBe(true);

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                expect(iconElement.nativeElement.classList.contains('ICON_STRING')).toBe(true);
            });
        });

        describe('Case 4: Use variables from instance', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                fixture.detectChanges();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should use instance size in pt function for root', () => {
                fixture.componentRef.setInput('size', 'large');
                fixture.detectChanges();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        return {
                            class: instance?.size === 'large' ? 'LARGE_SIZE' : 'NORMAL_SIZE'
                        };
                    }
                });
                fixture.detectChanges();

                expect(element.classList.contains('LARGE_SIZE')).toBe(true);
            });

            it('should use instance shape in pt function for label', () => {
                fixture.componentRef.setInput('shape', 'circle');
                fixture.detectChanges();
                fixture.componentRef.setInput('pt', {
                    label: ({ instance }: any) => {
                        return {
                            style: {
                                'background-color': instance?.shape === 'circle' ? 'yellow' : 'red'
                            }
                        };
                    }
                });
                fixture.detectChanges();

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                expect(labelElement.nativeElement.style.backgroundColor).toBe('yellow');
            });

            it('should use instance label in pt function for icon', () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.componentRef.setInput('label', 'TEST');
                fixture.componentRef.setInput('pt', {
                    icon: ({ instance }: any) => {
                        return {
                            class: {
                                HAS_LABEL: !!instance?.label
                            }
                        };
                    }
                });
                fixture.detectChanges();

                // Label has priority, so icon won't show, but we can test with no label
                fixture.componentRef.setInput('label', undefined);
                fixture.detectChanges();

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                expect(iconElement.nativeElement.classList.contains('HAS_LABEL')).toBe(false);
            });

            it('should use instance ariaLabel in pt function for image', () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                fixture.componentRef.setInput('ariaLabel', 'Test Avatar');
                fixture.detectChanges();
                fixture.componentRef.setInput('pt', {
                    image: ({ instance }: any) => {
                        return {
                            'data-has-aria': instance?.ariaLabel ? 'true' : 'false'
                        };
                    }
                });
                fixture.detectChanges();

                const imageElement = fixture.debugElement.query(By.css('img'));
                expect(imageElement.nativeElement.getAttribute('data-has-aria')).toBe('true');
            });
        });

        describe('Case 5: Event binding', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                fixture.detectChanges();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should bind onclick event to label through pt', () => {
                let clicked = false;
                fixture.componentRef.setInput('pt', {
                    label: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                });
                fixture.detectChanges();

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                labelElement.nativeElement.click();

                expect(clicked).toBe(true);
            });

            it('should bind onclick event to root through pt', () => {
                let clickCount = 0;
                fixture.componentRef.setInput('pt', {
                    root: {
                        onclick: () => {
                            clickCount++;
                        }
                    }
                });
                fixture.detectChanges();

                element.click();
                element.click();

                expect(clickCount).toBe(2);
            });

            it('should bind onclick event to icon through pt', () => {
                fixture.componentRef.setInput('label', undefined);
                let iconClicked = false;
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.detectChanges();
                fixture.componentRef.setInput('pt', {
                    icon: {
                        onclick: () => {
                            iconClicked = true;
                        }
                    }
                });
                fixture.detectChanges();

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                iconElement.nativeElement.click();

                expect(iconClicked).toBe(true);
            });
        });

        describe('Case 6: Test emitters', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let avatarComponent: Avatar;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                fixture.detectChanges();
                avatarComponent = fixture.debugElement.query(By.directive(Avatar)).componentInstance;
            });

            it('should access onImageError emitter through instance in pt', () => {
                let emitterCalled = false;
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                fixture.detectChanges();
                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        if (instance.onImageError) {
                            emitterCalled = true;
                        }
                        return {};
                    }
                });
                fixture.detectChanges();

                expect(emitterCalled).toBe(true);
            });
        });

        describe('Case 7: Inline test', () => {
            it('should apply inline pt with string class', () => {
                const inlineFixture = TestBed.createComponent(TestPTAvatarComponent);
                inlineFixture.componentRef.setInput('pt', { root: 'INLINE_TEST_CLASS' });
                inlineFixture.detectChanges();

                const element = inlineFixture.debugElement.query(By.directive(Avatar)).nativeElement;
                expect(element.classList.contains('INLINE_TEST_CLASS')).toBe(true);
            });

            it('should apply inline pt with object class', () => {
                const inlineFixture = TestBed.createComponent(TestPTAvatarComponent);
                inlineFixture.componentRef.setInput('pt', { root: { class: 'INLINE_OBJECT_CLASS' } });
                inlineFixture.detectChanges();

                const element = inlineFixture.debugElement.query(By.directive(Avatar)).nativeElement;
                expect(element.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            });
        });

        describe('Case 8: Test hooks', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
            });

            it('should call onAfterViewInit hook', () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                fixture.detectChanges();

                expect(hookCalled).toBe(true);
            });

            it('should call onAfterContentInit hook', () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterContentInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                fixture.detectChanges();

                expect(hookCalled).toBe(true);
            });

            it('should call onAfterViewChecked hook', () => {
                let checkCount = 0;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewChecked: () => {
                            checkCount++;
                        }
                    }
                });
                fixture.detectChanges();

                expect(checkCount).toBeGreaterThan(0);
            });

            it('should call onDestroy hook', () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onDestroy: () => {
                            hookCalled = true;
                        }
                    }
                });
                fixture.detectChanges();
                fixture.destroy();

                expect(hookCalled).toBe(true);
            });
        });
    });
});

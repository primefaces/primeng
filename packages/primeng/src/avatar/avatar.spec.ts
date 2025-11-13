import { Component, DebugElement, input, provideZonelessChangeDetection } from '@angular/core';
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
    beforeEach(async () => {
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
            ],
            providers: [provideZonelessChangeDetection()]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicAvatarComponent>;
        let component: Avatar;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicAvatarComponent);
            await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestLabelAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should display label text', () => {
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('JD');
        });

        it('should update label dynamically', async () => {
            component.label = 'AB';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('AB');
        });

        it('should not display label when undefined', async () => {
            component.label = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement).toBeFalsy();
        });

        it('should handle empty label', async () => {
            component.label = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement).toBeFalsy();
        });

        it('should not set aria-label attribute when only label is present', () => {
            expect(element.getAttribute('aria-label')).toBeNull();
        });

        it('should handle long labels', async () => {
            component.label = 'ABCDEFGH';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('ABCDEFGH');
        });
    });

    describe('Icon Display', () => {
        let fixture: ComponentFixture<TestIconAvatarComponent>;
        let component: TestIconAvatarComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestIconAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should display icon', () => {
            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            expect(iconElement).toBeTruthy();
            expect(iconElement.nativeElement.classList.contains('pi')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(true);
        });

        it('should update icon dynamically', async () => {
            component.icon = 'pi pi-star';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            expect(iconElement.nativeElement.classList.contains('pi-star')).toBe(true);
            expect(iconElement.nativeElement.classList.contains('pi-user')).toBe(false);
        });

        it('should not display icon when undefined', async () => {
            component.icon = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            expect(iconElement).toBeFalsy();
        });

        it('should handle icon with multiple classes', async () => {
            component.icon = 'pi pi-user custom-icon';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestImageAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should display image', () => {
            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement).toBeTruthy();
            expect(imageElement.nativeElement.src).toContain('/path/to/avatar.jpg');
        });

        it('should update image src dynamically', async () => {
            component.image = '/new/path/avatar.png';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement.nativeElement.src).toContain('/new/path/avatar.png');
        });

        it('should set aria-label on image', () => {
            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement.nativeElement.getAttribute('aria-label')).toBe('User Avatar');
        });

        it('should handle image error event', async () => {
            const imageElement = fixture.debugElement.query(By.css('img'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.imageError).toBe(errorEvent);
        });

        it('should emit onImageError event', () => {
            spyOn(component, 'onImageError');
            const imageElement = fixture.debugElement.query(By.css('img'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);

            expect(component.onImageError).toHaveBeenCalledWith(errorEvent);
        });

        it('should not display image when undefined', async () => {
            component.image = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement).toBeFalsy();
        });

        it('should have p-avatar-image class when image is present', () => {
            expect(element.classList.contains('p-avatar-image')).toBe(true);
        });

        it('should remove p-avatar-image class when image is removed', async () => {
            component.image = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('p-avatar-image')).toBe(false);
        });
    });

    describe('Size Variations', () => {
        let fixture: ComponentFixture<TestSizeAvatarComponent>;
        let component: TestSizeAvatarComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestSizeAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should have no size class for normal size', () => {
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(false);
        });

        it('should apply large size class', async () => {
            component.size = 'large';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('p-avatar-lg')).toBe(true);
            expect(element.classList.contains('p-avatar-xl')).toBe(false);
        });

        it('should apply xlarge size class', async () => {
            component.size = 'xlarge';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(true);
        });

        it('should switch between sizes correctly', async () => {
            component.size = 'large';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-lg')).toBe(true);

            component.size = 'xlarge';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(true);

            component.size = 'normal';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(false);
        });
    });

    describe('Shape Variations', () => {
        let fixture: ComponentFixture<TestShapeAvatarComponent>;
        let component: TestShapeAvatarComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestShapeAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should have no shape class for square shape', () => {
            expect(element.classList.contains('p-avatar-circle')).toBe(false);
        });

        it('should apply circle shape class', async () => {
            component.shape = 'circle';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('p-avatar-circle')).toBe(true);
        });

        it('should switch between shapes correctly', async () => {
            component.shape = 'circle';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-circle')).toBe(true);

            component.shape = 'square';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-circle')).toBe(false);
        });
    });

    describe('Style Class', () => {
        let fixture: ComponentFixture<TestStyleClassAvatarComponent>;
        let component: TestStyleClassAvatarComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestStyleClassAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should apply custom style class', () => {
            expect(element.classList.contains('custom-avatar')).toBe(true);
        });

        it('should update style class dynamically', async () => {
            component.styleClass = 'new-custom-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('new-custom-class')).toBe(true);
        });

        it('should maintain base classes with custom style class', () => {
            expect(element.classList.contains('p-avatar')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
            expect(element.classList.contains('custom-avatar')).toBe(true);
        });

        it('should handle multiple custom classes', async () => {
            component.styleClass = 'class1 class2 class3';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('class1')).toBe(true);
            expect(element.classList.contains('class2')).toBe(true);
            expect(element.classList.contains('class3')).toBe(true);
        });

        it('should handle undefined style class', async () => {
            component.styleClass = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('p-avatar')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
        });
    });

    describe('Accessibility', () => {
        let fixture: ComponentFixture<TestAriaAvatarComponent>;
        let component: TestAriaAvatarComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestAriaAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should set aria-label attribute', () => {
            expect(element.getAttribute('aria-label')).toBe('Avatar Label');
        });

        it('should set aria-labelledby attribute', () => {
            expect(element.getAttribute('aria-labelledby')).toBe('label-id');
        });

        it('should update aria-label dynamically', async () => {
            component.ariaLabel = 'New Label';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.getAttribute('aria-label')).toBe('New Label');
        });

        it('should update aria-labelledby dynamically', async () => {
            component.ariaLabelledBy = 'new-label-id';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.getAttribute('aria-labelledby')).toBe('new-label-id');
        });

        it('should handle undefined aria attributes', async () => {
            component.ariaLabel = undefined as any;
            component.ariaLabelledBy = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // When ariaLabel is undefined, no fallback is used
            expect(element.getAttribute('aria-label')).toBeNull();
            expect(element.hasAttribute('aria-labelledby')).toBe(false);
        });
    });

    describe('Content Projection', () => {
        let fixture: ComponentFixture<TestContentAvatarComponent>;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestContentAvatarComponent);
            await fixture.whenStable();
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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should prioritize label over icon and image', async () => {
            component.label = 'AB';
            component.icon = 'pi pi-user';
            component.image = '/path/to/image.jpg';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const imageElement = fixture.debugElement.query(By.css('img'));
            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));

            expect(labelElement).toBeTruthy();
            expect(iconElement).toBeFalsy();
            expect(imageElement).toBeFalsy();
        });

        it('should show label when both label and icon are present', async () => {
            component.label = 'AB';
            component.icon = 'pi pi-user';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));

            expect(labelElement).toBeTruthy();
            expect(iconElement).toBeFalsy();
        });

        it('should show icon when no label is present', async () => {
            component.icon = 'pi pi-user';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));

            expect(iconElement).toBeTruthy();
            expect(labelElement).toBeFalsy();
        });

        it('should show image when no label or icon is present', async () => {
            component.image = '/path/to/image.jpg';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const imageElement = fixture.debugElement.query(By.css('img'));
            const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));

            expect(imageElement).toBeTruthy();
            expect(iconElement).toBeFalsy();
            expect(labelElement).toBeFalsy();
        });

        it('should apply multiple configurations correctly', async () => {
            component.label = 'XY';
            component.size = 'large';
            component.shape = 'circle';
            component.styleClass = 'custom-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            avatarComponent = fixture.debugElement.query(By.directive(Avatar)).componentInstance;
        });

        it('should keep showing label when icon is added', async () => {
            component.label = 'AB';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeTruthy();

            component.icon = 'pi pi-user';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeFalsy();
        });

        it('should show image only when no label and no icon', async () => {
            component.image = '/path/to/image.jpg';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeFalsy();

            // Adding icon should hide image
            component.icon = 'pi pi-user';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('img'))).toBeFalsy();
        });

        it('should handle rapid property changes', async () => {
            component.label = 'A';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.label = 'B';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.label = 'C';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('C');
        });

        it('should handle all properties being undefined', async () => {
            component.label = undefined as any;
            component.icon = undefined as any;
            component.image = undefined as any;
            component.size = undefined as any;
            component.shape = undefined as any;
            component.styleClass = undefined as any;
            component.ariaLabel = undefined as any;
            component.ariaLabelledBy = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should handle empty string values', async () => {
            component.label = '';
            component.icon = '';
            component.image = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('img'))).toBeFalsy();
        });

        it('should handle whitespace-only label', async () => {
            component.label = '   ';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('' as any);
        });

        it('should handle null values gracefully', async () => {
            component.label = null as any;
            component.icon = null as any;
            component.image = null as any;
            component.styleClass = null as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.debugElement.query(By.css('.p-avatar-label'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('.p-avatar-icon'))).toBeFalsy();
            expect(fixture.debugElement.query(By.css('img'))).toBeFalsy();
        });

        it('should handle invalid size values', async () => {
            component.size = 'invalid' as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Should not apply any size classes for invalid values
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(false);
        });

        it('should handle invalid shape values', async () => {
            component.shape = 'invalid' as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Should not apply circle class for invalid values
            expect(element.classList.contains('p-avatar-circle')).toBe(false);
        });

        it('should handle special characters in label', async () => {
            component.label = '<>&"\'';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
            expect(labelElement.nativeElement.textContent).toBe('<>&"\'');
        });

        it('should handle very long labels', async () => {
            component.label = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicAvatarComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
        });

        it('should combine all applicable classes correctly', async () => {
            component.image = '/path/to/image.jpg';
            component.size = 'large';
            component.shape = 'circle';
            component.styleClass = 'custom-1 custom-2';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('p-avatar')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);
            expect(element.classList.contains('p-avatar-image')).toBe(true);
            expect(element.classList.contains('p-avatar-lg')).toBe(true);
            expect(element.classList.contains('p-avatar-circle')).toBe(true);
            expect(element.classList.contains('custom-1')).toBe(true);
            expect(element.classList.contains('custom-2')).toBe(true);
        });

        it('should remove p-avatar-image class when image is removed', async () => {
            component.image = '/path/to/image.jpg';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-image')).toBe(true);

            component.image = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-image')).toBe(false);
        });

        it('should handle class transitions smoothly', async () => {
            // Start with normal square
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-circle')).toBe(false);

            // Change to large circle
            component.size = 'large';
            component.shape = 'circle';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-lg')).toBe(true);
            expect(element.classList.contains('p-avatar-circle')).toBe(true);

            // Change to xlarge square
            component.size = 'xlarge';
            component.shape = 'square';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-avatar-lg')).toBe(false);
            expect(element.classList.contains('p-avatar-xl')).toBe(true);
            expect(element.classList.contains('p-avatar-circle')).toBe(false);
        });
    });

    describe('PassThrough API', () => {
        describe('Case 1: Simple string classes', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should apply string class to host section', async () => {
                fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('HOST_CLASS')).toBe(true);
            });

            it('should apply string class to root section', async () => {
                fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_CLASS')).toBe(true);
            });

            it('should apply string class to label section', async () => {
                fixture.componentRef.setInput('pt', { label: 'LABEL_CLASS' });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_CLASS')).toBe(true);
            });

            it('should apply string class to icon section', async () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.componentRef.setInput('pt', { icon: 'ICON_CLASS' });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                expect(iconElement.nativeElement.classList.contains('ICON_CLASS')).toBe(true);
            });

            it('should apply string class to image section', async () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                fixture.componentRef.setInput('pt', { image: 'IMAGE_CLASS' });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const imageElement = fixture.debugElement.query(By.css('img'));
                expect(imageElement.nativeElement.classList.contains('IMAGE_CLASS')).toBe(true);
            });
        });

        describe('Case 2: Objects', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should apply object with class, style, data and aria attributes to root', async () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'background-color': 'red' },
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(element.style.backgroundColor).toBe('red');
                expect(element.getAttribute('data-p-test')).toBe('true');
                expect(element.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            it('should apply object with class, style, data and aria attributes to label', async () => {
                fixture.componentRef.setInput('pt', {
                    label: {
                        class: 'LABEL_OBJECT_CLASS',
                        style: { color: 'blue' },
                        'data-p-label': 'test',
                        'aria-hidden': 'true'
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_OBJECT_CLASS')).toBe(true);
                expect(labelElement.nativeElement.style.color).toBe('blue');
                expect(labelElement.nativeElement.getAttribute('data-p-label')).toBe('test');
                expect(labelElement.nativeElement.getAttribute('aria-hidden')).toBe('true');
            });

            it('should apply object with class, style, data and aria attributes to icon', async () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.componentRef.setInput('pt', {
                    icon: {
                        class: 'ICON_OBJECT_CLASS',
                        style: { 'font-size': '2rem' },
                        'data-p-icon': 'custom',
                        'aria-hidden': 'false'
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                expect(iconElement.nativeElement.classList.contains('ICON_OBJECT_CLASS')).toBe(true);
                expect(iconElement.nativeElement.style.fontSize).toBe('2rem');
                expect(iconElement.nativeElement.getAttribute('data-p-icon')).toBe('custom');
                expect(iconElement.nativeElement.getAttribute('aria-hidden')).toBe('false');
            });

            it('should apply object with class, style, data and aria attributes to image', async () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.componentRef.setInput('pt', {
                    image: {
                        class: 'IMAGE_OBJECT_CLASS',
                        style: { border: '2px solid black' },
                        'data-p-image': 'avatar',
                        'aria-label': 'IMAGE_ARIA_LABEL'
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

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

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should apply mixed pt with object and string values', async () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_MIXED_CLASS'
                    },
                    label: 'LABEL_MIXED_CLASS'
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_MIXED_CLASS')).toBe(true);

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                expect(labelElement.nativeElement.classList.contains('LABEL_MIXED_CLASS')).toBe(true);
            });

            it('should apply mixed pt across all sections', async () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.componentRef.setInput('pt', {
                    host: 'HOST_STRING',
                    root: { class: 'ROOT_OBJECT' },
                    icon: 'ICON_STRING'
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('HOST_STRING')).toBe(true);
                expect(element.classList.contains('ROOT_OBJECT')).toBe(true);

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                expect(iconElement.nativeElement.classList.contains('ICON_STRING')).toBe(true);
            });
        });

        describe('Case 4: Use variables from instance', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
            });

            it('should use instance size in pt function for root', async () => {
                fixture.componentRef.setInput('size', 'large');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        return {
                            class: instance?.size === 'large' ? 'LARGE_SIZE' : 'NORMAL_SIZE'
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('LARGE_SIZE')).toBe(true);
            });

            it('should use instance shape in pt function for label', async () => {
                fixture.componentRef.setInput('shape', 'circle');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.componentRef.setInput('pt', {
                    label: ({ instance }: any) => {
                        return {
                            style: {
                                'background-color': instance?.shape === 'circle' ? 'yellow' : 'red'
                            }
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                expect(labelElement.nativeElement.style.backgroundColor).toBe('yellow');
            });

            it('should use instance label in pt function for icon', async () => {
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
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                // Label has priority, so icon won't show, but we can test with no label
                fixture.componentRef.setInput('label', undefined);
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                expect(iconElement.nativeElement.classList.contains('HAS_LABEL')).toBe(false);
            });

            it('should use instance ariaLabel in pt function for image', async () => {
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                fixture.componentRef.setInput('ariaLabel', 'Test Avatar');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.componentRef.setInput('pt', {
                    image: ({ instance }: any) => {
                        return {
                            'data-has-aria': instance?.ariaLabel ? 'true' : 'false'
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const imageElement = fixture.debugElement.query(By.css('img'));
                expect(imageElement.nativeElement.getAttribute('data-has-aria')).toBe('true');
            });
        });

        describe('Case 5: Event binding', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Avatar)).nativeElement;
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
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const labelElement = fixture.debugElement.query(By.css('.p-avatar-label'));
                labelElement.nativeElement.click();

                expect(clicked).toBe(true);
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
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                element.click();
                element.click();

                expect(clickCount).toBe(2);
            });

            it('should bind onclick event to icon through pt', async () => {
                fixture.componentRef.setInput('label', undefined);
                let iconClicked = false;
                fixture.componentRef.setInput('icon', 'pi pi-user');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.componentRef.setInput('pt', {
                    icon: {
                        onclick: () => {
                            iconClicked = true;
                        }
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
                iconElement.nativeElement.click();

                expect(iconClicked).toBe(true);
            });
        });

        describe('Case 6: Test emitters', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;
            let avatarComponent: Avatar;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
                await fixture.whenStable();
                avatarComponent = fixture.debugElement.query(By.directive(Avatar)).componentInstance;
            });

            it('should access onImageError emitter through instance in pt', async () => {
                let emitterCalled = false;
                fixture.componentRef.setInput('label', undefined);
                fixture.componentRef.setInput('image', '/path/to/image.jpg');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        if (instance.onImageError) {
                            emitterCalled = true;
                        }
                        return {};
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(emitterCalled).toBe(true);
            });
        });

        describe('Case 7: Inline test', () => {
            it('should apply inline pt with string class', async () => {
                const inlineFixture = TestBed.createComponent(TestPTAvatarComponent);
                inlineFixture.componentRef.setInput('pt', { root: 'INLINE_TEST_CLASS' });
                inlineFixture.changeDetectorRef.markForCheck();
                await inlineFixture.whenStable();

                const element = inlineFixture.debugElement.query(By.directive(Avatar)).nativeElement;
                expect(element.classList.contains('INLINE_TEST_CLASS')).toBe(true);
            });

            it('should apply inline pt with object class', async () => {
                const inlineFixture = TestBed.createComponent(TestPTAvatarComponent);
                inlineFixture.componentRef.setInput('pt', { root: { class: 'INLINE_OBJECT_CLASS' } });
                inlineFixture.changeDetectorRef.markForCheck();
                await inlineFixture.whenStable();

                const element = inlineFixture.debugElement.query(By.directive(Avatar)).nativeElement;
                expect(element.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            });
        });

        describe('Case 8: Test hooks', () => {
            let fixture: ComponentFixture<TestPTAvatarComponent>;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTAvatarComponent);
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
                fixture.changeDetectorRef.markForCheck();
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
                fixture.changeDetectorRef.markForCheck();
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
                fixture.changeDetectorRef.markForCheck();
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
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.destroy();

                expect(hookCalled).toBe(true);
            });
        });
    });
});

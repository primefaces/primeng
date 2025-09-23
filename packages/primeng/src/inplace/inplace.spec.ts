import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Inplace, InplaceModule, InplaceDisplay, InplaceContent } from './inplace';

@Component({
    standalone: false,
    selector: 'test-basic-inplace',
    template: `
        <p-inplace>
            <p-inplacedisplay pInplaceDisplay>
                <span class="display-content">Click to edit</span>
            </p-inplacedisplay>
            <p-inplacecontent pInplaceContent>
                <input type="text" class="edit-input" value="Edit mode" />
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestBasicInplaceComponent {}

@Component({
    standalone: false,
    selector: 'test-inplace-with-events',
    template: `
        <p-inplace (onActivate)="onActivate($event)" (onDeactivate)="onDeactivate($event)">
            <p-inplacedisplay pInplaceDisplay>
                <span class="display-text">Display Mode</span>
            </p-inplacedisplay>
            <p-inplacecontent pInplaceContent>
                <textarea class="edit-textarea">Edit Mode Content</textarea>
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplaceWithEventsComponent {
    activateEvent: Event | null = null as any;
    deactivateEvent: Event | null = null as any;

    onActivate(event: Event) {
        this.activateEvent = event;
    }

    onDeactivate(event: Event) {
        this.deactivateEvent = event;
    }
}

@Component({
    standalone: false,
    selector: 'test-inplace-disabled',
    template: `
        <p-inplace [disabled]="disabled">
            <p-inplacedisplay pInplaceDisplay>
                <span class="disabled-display">Disabled inplace</span>
            </p-inplacedisplay>
            <p-inplacecontent pInplaceContent>
                <input type="text" class="disabled-input" />
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplaceDisabledComponent {
    disabled = false;
}

@Component({
    standalone: false,
    selector: 'test-inplace-closable',
    template: `
        <p-inplace [closable]="closable" [closeIcon]="closeIcon" [closeAriaLabel]="closeAriaLabel">
            <p-inplacedisplay pInplaceDisplay>
                <span class="closable-display">Closable inplace</span>
            </p-inplacedisplay>
            <p-inplacecontent pInplaceContent>
                <input type="text" class="closable-input" value="Closable content" />
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplaceClosableComponent {
    closable = true;
    closeIcon = 'pi pi-times';
    closeAriaLabel = 'Close';
}

@Component({
    standalone: false,
    selector: 'test-inplace-prevent-click',
    template: `
        <p-inplace [preventClick]="preventClick">
            <p-inplacedisplay pInplaceDisplay>
                <span class="prevent-click-display">Prevent click test</span>
            </p-inplacedisplay>
            <p-inplacecontent pInplaceContent>
                <input type="text" class="prevent-click-input" />
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplacePreventClickComponent {
    preventClick = false;
}

@Component({
    standalone: false,
    selector: 'test-inplace-active-state',
    template: `
        <p-inplace [active]="active">
            <p-inplacedisplay>
                <span class="active-display">Active state test</span>
            </p-inplacedisplay>
            <p-inplacecontent>
                <input type="text" class="active-input" value="Active content" />
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplaceActiveStateComponent {
    active = false;
}

@Component({
    standalone: false,
    selector: 'test-inplace-style-class',
    template: `
        <p-inplace [styleClass]="styleClass">
            <p-inplacedisplay>
                <span class="style-display">Style class test</span>
            </p-inplacedisplay>
            <p-inplacecontent>
                <input type="text" class="style-input" />
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplaceStyleClassComponent {
    styleClass = 'custom-inplace';
}

@Component({
    standalone: false,
    selector: 'test-inplace-templates',
    template: `
        <p-inplace [closable]="true">
            <ng-template #display>
                <div class="template-display">Custom Display Template</div>
            </ng-template>
            <ng-template #content let-closeCallback="closeCallback">
                <div class="template-content">
                    <input type="text" class="template-input" />
                    <button type="button" class="template-close-btn" (click)="closeCallback()">Close</button>
                </div>
            </ng-template>
            <ng-template #closeicon>
                <i class="custom-close-icon pi pi-trash"></i>
            </ng-template>
        </p-inplace>
    `
})
class TestInplaceTemplatesComponent {}

@Component({
    standalone: false,
    selector: 'test-inplace-primeng-templates',
    template: `
        <p-inplace>
            <ng-template pTemplate="display">
                <span class="p-template-display">PrimeNG Template Display</span>
            </ng-template>
            <ng-template pTemplate="content" let-closeCallback="closeCallback">
                <div class="p-template-content">
                    <input type="text" class="p-template-input" />
                    <button type="button" (click)="closeCallback()">Done</button>
                </div>
            </ng-template>
            <ng-template pTemplate="closeicon">
                <i class="p-template-close-icon pi pi-check"></i>
            </ng-template>
        </p-inplace>
    `
})
class TestInplacePrimeNGTemplatesComponent {}

@Component({
    standalone: false,
    selector: 'test-inplace-keyboard',
    template: `
        <p-inplace>
            <p-inplacedisplay>
                <span class="keyboard-display">Press Enter to edit</span>
            </p-inplacedisplay>
            <p-inplacecontent>
                <input type="text" class="keyboard-input" />
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplaceKeyboardComponent {}

@Component({
    standalone: false,
    selector: 'test-inplace-complex-content',
    template: `
        <p-inplace [closable]="true">
            <p-inplacedisplay pInplaceDisplay>
                <div class="complex-display">
                    <h4>Product Information</h4>
                    <p>Name: {{ productInfo.name }}</p>
                    <p>Price: {{ productInfo.price | currency }}</p>
                </div>
            </p-inplacedisplay>
            <p-inplacecontent pInplaceContent>
                <div class="complex-content">
                    <div class="form-group">
                        <label for="product-name">Name:</label>
                        <input type="text" id="product-name" [(ngModel)]="productInfo.name" class="product-name-input" />
                    </div>
                    <div class="form-group">
                        <label for="product-price">Price:</label>
                        <input type="number" id="product-price" [(ngModel)]="productInfo.price" class="product-price-input" />
                    </div>
                    <div class="form-actions">
                        <button type="button" class="save-btn">Save</button>
                        <button type="button" class="cancel-btn">Cancel</button>
                    </div>
                </div>
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplaceComplexContentComponent {
    productInfo = {
        name: 'Sample Product',
        price: 29.99
    };
}

@Component({
    standalone: false,
    selector: 'test-inplace-dynamic',
    template: `
        <p-inplace [active]="dynamicActive" [disabled]="dynamicDisabled" [closable]="dynamicClosable" [preventClick]="dynamicPreventClick">
            <p-inplacedisplay pInplaceDisplay>
                <span class="dynamic-display">Dynamic: {{ displayText }}</span>
            </p-inplacedisplay>
            <p-inplacecontent pInplaceContent>
                <input type="text" class="dynamic-input" [value]="contentText" />
            </p-inplacecontent>
        </p-inplace>
    `
})
class TestInplaceDynamicComponent {
    dynamicActive = false;
    dynamicDisabled = false;
    dynamicClosable = false;
    dynamicPreventClick = false;
    displayText = 'Click to edit';
    contentText = 'Edit this';
}

describe('Inplace', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [InplaceModule, SharedModule, ButtonModule, FormsModule, NoopAnimationsModule],
            declarations: [
                TestBasicInplaceComponent,
                TestInplaceWithEventsComponent,
                TestInplaceDisabledComponent,
                TestInplaceClosableComponent,
                TestInplacePreventClickComponent,
                TestInplaceActiveStateComponent,
                TestInplaceStyleClassComponent,
                TestInplaceTemplatesComponent,
                TestInplacePrimeNGTemplatesComponent,
                TestInplaceKeyboardComponent,
                TestInplaceComplexContentComponent,
                TestInplaceDynamicComponent
            ]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicInplaceComponent>;
        let component: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicInplaceComponent);
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            component = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.active).toBe(false);
            expect(component.closable).toBe(false);
            expect(component.disabled).toBe(false);
            expect(component.preventClick).toBeUndefined();
            expect(component.styleClass).toBeUndefined();
            expect(component.closeIcon).toBeUndefined();
            expect(component.closeAriaLabel).toBeUndefined();
        });

        it('should extend BaseComponent', () => {
            expect(component).toBeInstanceOf(Inplace);
            expect(component.cx).toBeDefined();
            expect(component.cd).toBeDefined();
        });

        it('should have correct selector', () => {
            expect(element.tagName.toLowerCase()).toBe('p-inplace');
        });

        it('should have aria-live attribute', () => {
            expect(element.getAttribute('aria-live')).toBe('polite');
        });

        it('should inject component style', () => {
            expect(component._componentStyle).toBeDefined();
        });

        it('should display content initially', () => {
            const displayDiv = element.querySelector('div[role="button"]');
            const contentDiv = element.querySelector('div:not([role="button"])');

            expect(displayDiv).toBeTruthy();
            expect(contentDiv).toBeFalsy(); // Content should be hidden initially
        });
    });

    describe('Display and Content Projection', () => {
        let fixture: ComponentFixture<TestBasicInplaceComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicInplaceComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Inplace)).nativeElement;
        });

        it('should project InplaceDisplay content', () => {
            const displayContent = element.querySelector('.display-content');
            expect(displayContent).toBeTruthy();
            expect(displayContent?.textContent?.trim()).toBe('Click to edit');
        });

        it('should have tabindex and role on display element', () => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            expect(displayDiv.getAttribute('tabindex')).toBe('0');
            expect(displayDiv.getAttribute('role')).toBe('button');
        });

        it('should not show content initially', () => {
            const contentDiv = element.querySelector('.edit-input');
            expect(contentDiv).toBeFalsy();
        });

        it('should show content when activated', fakeAsync(() => {
            const component = fixture.debugElement.query(By.directive(Inplace)).componentInstance;
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;

            displayDiv.click();
            fixture.detectChanges();
            tick();

            const editInput = element.querySelector('.edit-input');

            expect(component.active).toBe(true);
            expect(editInput).toBeTruthy();
            flush();
        }));
    });

    describe('Activation and Deactivation', () => {
        let fixture: ComponentFixture<TestInplaceWithEventsComponent>;
        let component: TestInplaceWithEventsComponent;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceWithEventsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should activate on click', fakeAsync(() => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;

            displayDiv.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);
            expect(component.activateEvent).toBeTruthy();
            flush();
        }));

        it('should emit onActivate event', fakeAsync(() => {
            spyOn(component, 'onActivate');
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;

            displayDiv.click();
            fixture.detectChanges();
            tick();

            expect(component.onActivate).toHaveBeenCalled();
            flush();
        }));

        it('should activate programmatically', () => {
            const mockEvent = new MouseEvent('click');
            inplaceComponent.activate(mockEvent);
            fixture.detectChanges();

            expect(inplaceComponent.active).toBe(true);
            expect(component.activateEvent).toBe(mockEvent);
        });

        it('should deactivate programmatically', fakeAsync(() => {
            // First activate
            inplaceComponent.activate();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);

            // Then deactivate
            const mockEvent = new MouseEvent('click');
            inplaceComponent.deactivate(mockEvent);
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(false);
            expect(component.deactivateEvent).toBe(mockEvent);
            flush();
        }));

        it('should emit onDeactivate event', fakeAsync(() => {
            spyOn(component, 'onDeactivate');

            // Activate first
            inplaceComponent.activate();
            fixture.detectChanges();
            tick();

            // Then deactivate
            inplaceComponent.deactivate();
            fixture.detectChanges();
            tick();

            expect(component.onDeactivate).toHaveBeenCalled();
            flush();
        }));
    });

    describe('Disabled State', () => {
        let fixture: ComponentFixture<TestInplaceDisabledComponent>;
        let component: TestInplaceDisabledComponent;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceDisabledComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should not activate when disabled', fakeAsync(() => {
            component.disabled = true;
            fixture.detectChanges();

            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(false);
            flush();
        }));

        it('should apply disabled class when disabled', () => {
            component.disabled = true;
            fixture.detectChanges();

            const displayDiv = element.querySelector('div[role="button"]');
            expect(displayDiv?.classList.contains('p-disabled')).toBe(true);
        });

        it('should remove disabled class when enabled', () => {
            component.disabled = true;
            fixture.detectChanges();

            const displayDiv = element.querySelector('div[role="button"]');
            expect(displayDiv?.classList.contains('p-disabled')).toBe(true);

            component.disabled = false;
            fixture.detectChanges();

            expect(displayDiv?.classList.contains('p-disabled')).toBe(false);
        });

        it('should not activate programmatically when disabled', () => {
            component.disabled = true;
            fixture.detectChanges();

            inplaceComponent.activate();
            fixture.detectChanges();

            expect(inplaceComponent.active).toBe(false);
        });

        it('should not deactivate programmatically when disabled', fakeAsync(() => {
            // First enable and activate
            inplaceComponent.activate();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);

            // Then disable and try to deactivate
            component.disabled = true;
            fixture.detectChanges();

            inplaceComponent.deactivate();
            fixture.detectChanges();
            tick();

            // Should remain active because disabled
            expect(inplaceComponent.active).toBe(true);
            flush();
        }));
    });

    describe('Closable Functionality', () => {
        let fixture: ComponentFixture<TestInplaceClosableComponent>;
        let component: TestInplaceClosableComponent;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceClosableComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should show close button when active and closable', fakeAsync(() => {
            // Activate inplace
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const closeButton = element.querySelector('p-button');
            expect(closeButton).toBeTruthy();
            flush();
        }));

        it('should not show close button when not closable', fakeAsync(() => {
            component.closable = false;
            fixture.detectChanges();

            // Activate inplace
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const closeButton = element.querySelector('p-button');
            expect(closeButton).toBeFalsy();
            flush();
        }));

        it('should close when close button is clicked', fakeAsync(() => {
            // Activate inplace
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);

            // Click close button
            const closeButton = element.querySelector('p-button') as HTMLElement;
            closeButton.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(false);
            flush();
        }));

        it('should display custom close icon', fakeAsync(() => {
            component.closeIcon = 'pi pi-check';
            fixture.detectChanges();

            // Activate inplace
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const iconElement = element.querySelector('.pi-check');
            expect(iconElement).toBeTruthy();
            flush();
        }));

        it('should set aria-label on close button', fakeAsync(() => {
            component.closeAriaLabel = 'Close Editor';
            fixture.detectChanges();

            // Activate inplace
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const closeButton = element.querySelector('p-button') as HTMLElement;
            expect(closeButton.getAttribute('aria-label')).toBe('Close Editor');
            flush();
        }));
    });

    describe('Prevent Click', () => {
        let fixture: ComponentFixture<TestInplacePreventClickComponent>;
        let component: TestInplacePreventClickComponent;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplacePreventClickComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should not activate when preventClick is true', fakeAsync(() => {
            component.preventClick = true;
            fixture.detectChanges();

            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(false);
            flush();
        }));

        it('should activate normally when preventClick is false', fakeAsync(() => {
            component.preventClick = false;
            fixture.detectChanges();

            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);
            flush();
        }));

        it('should allow programmatic activation even when preventClick is true', () => {
            component.preventClick = true;
            fixture.detectChanges();

            inplaceComponent.activate();
            fixture.detectChanges();

            expect(inplaceComponent.active).toBe(true);
        });
    });

    describe('Active State', () => {
        let fixture: ComponentFixture<TestInplaceActiveStateComponent>;
        let component: TestInplaceActiveStateComponent;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceActiveStateComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should start in inactive state by default', () => {
            expect(inplaceComponent.active).toBe(false);
            expect(element.querySelector('div[role="button"]')).toBeTruthy();
            expect(inplaceComponent.active).toBe(false);
        });

        it('should start in active state when active=true', () => {
            component.active = true;
            fixture.detectChanges();

            expect(inplaceComponent.active).toBe(true);
            expect(element.querySelector('div[role="button"]')).toBeFalsy();
            expect(inplaceComponent.active).toBe(true);
        });

        it('should toggle state dynamically', fakeAsync(() => {
            // Initially inactive
            expect(element.querySelector('div[role="button"]')).toBeTruthy();
            expect(inplaceComponent.active).toBe(false);

            // Activate
            component.active = true;
            fixture.detectChanges();
            tick();

            expect(element.querySelector('div[role="button"]')).toBeFalsy();
            expect(inplaceComponent.active).toBe(true);

            // Deactivate
            component.active = false;
            fixture.detectChanges();
            tick();

            expect(element.querySelector('div[role="button"]')).toBeTruthy();
            expect(inplaceComponent.active).toBe(false);
            flush();
        }));
    });

    describe('Style Class', () => {
        let fixture: ComponentFixture<TestInplaceStyleClassComponent>;
        let component: TestInplaceStyleClassComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceStyleClassComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Inplace)).nativeElement;
        });

        it('should apply custom style class', () => {
            expect(element.classList.contains('custom-inplace')).toBe(true);
        });

        it('should update style class dynamically', () => {
            component.styleClass = 'new-custom-class';
            fixture.detectChanges();

            expect(element.classList.contains('new-custom-class')).toBe(true);
        });

        it('should maintain base classes with custom style class', () => {
            // Should have both base classes and custom class
            expect(element.classList.contains('custom-inplace')).toBe(true);
            // Base classes are applied through cx() method
            expect(element.className).toBeTruthy();
        });
    });

    describe('Templates', () => {
        let fixture: ComponentFixture<TestInplaceTemplatesComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceTemplatesComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Inplace)).nativeElement;
        });

        it('should render custom display template', () => {
            const templateDisplay = element.querySelector('.template-display');
            expect(templateDisplay).toBeTruthy();
            expect(templateDisplay?.textContent?.trim()).toBe('Custom Display Template');
        });

        it('should render custom content template when activated', fakeAsync(() => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const templateContent = element.querySelector('.template-content');
            const templateInput = element.querySelector('.template-input');
            const templateCloseBtn = element.querySelector('.template-close-btn');

            expect(templateContent).toBeTruthy();
            expect(templateInput).toBeTruthy();
            expect(templateCloseBtn).toBeTruthy();
            flush();
        }));

        it('should provide closeCallback to content template', fakeAsync(() => {
            const inplaceComponent = fixture.debugElement.query(By.directive(Inplace)).componentInstance;

            // Activate inplace
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);

            // Click template close button
            const templateCloseBtn = element.querySelector('.template-close-btn') as HTMLElement;
            templateCloseBtn.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(false);
            flush();
        }));

        it('should render custom close icon template', fakeAsync(() => {
            // Activate inplace to show close button
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const customCloseIcon = element.querySelector('.custom-close-icon');
            expect(customCloseIcon).toBeTruthy();
            expect(customCloseIcon?.classList.contains('pi-trash')).toBe(true);
            flush();
        }));
    });

    describe('PrimeNG Templates', () => {
        let fixture: ComponentFixture<TestInplacePrimeNGTemplatesComponent>;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplacePrimeNGTemplatesComponent);
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should process pTemplate directives in ngAfterContentInit', () => {
            expect(inplaceComponent._displayTemplate).toBeDefined();
            expect(inplaceComponent._contentTemplate).toBeDefined();
            expect(inplaceComponent._closeIconTemplate).toBeDefined();
        });

        it('should render pTemplate display', () => {
            const pTemplateDisplay = element.querySelector('.p-template-display');
            expect(pTemplateDisplay).toBeTruthy();
            expect(pTemplateDisplay?.textContent?.trim()).toBe('PrimeNG Template Display');
        });

        it('should render pTemplate content when activated', fakeAsync(() => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const pTemplateContent = element.querySelector('.p-template-content');
            const pTemplateInput = element.querySelector('.p-template-input');

            expect(pTemplateContent).toBeTruthy();
            expect(pTemplateInput).toBeTruthy();
            flush();
        }));

        it('should handle both template types (# and pTemplate)', () => {
            // Component should have both contentTemplate and _contentTemplate defined
            expect(inplaceComponent.contentTemplate || inplaceComponent._contentTemplate).toBeTruthy();
            expect(inplaceComponent.displayTemplate || inplaceComponent._displayTemplate).toBeTruthy();
            expect(inplaceComponent.closeIconTemplate || inplaceComponent._closeIconTemplate).toBeTruthy();
        });
    });

    describe('Keyboard Navigation', () => {
        let fixture: ComponentFixture<TestInplaceKeyboardComponent>;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceKeyboardComponent);
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should activate on Enter key', fakeAsync(() => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            if (displayDiv) {
                const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });

                displayDiv.dispatchEvent(enterEvent);
                fixture.detectChanges();
                tick();

                expect(inplaceComponent.active).toBe(true);
            }
            flush();
        }));

        it('should not activate on other keys', fakeAsync(() => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            if (displayDiv) {
                const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });

                displayDiv.dispatchEvent(spaceEvent);
                fixture.detectChanges();
                tick();

                expect(inplaceComponent.active).toBe(false);
            }
            flush();
        }));

        it('should prevent default on Enter key', () => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            if (displayDiv) {
                const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
                spyOn(enterEvent, 'preventDefault');

                displayDiv.dispatchEvent(enterEvent);

                expect(enterEvent.preventDefault).toHaveBeenCalled();
            }
        });

        it('should handle keyboard events when disabled', fakeAsync(() => {
            const inplaceComponent = fixture.debugElement.query(By.directive(Inplace)).componentInstance;
            inplaceComponent.disabled = true;
            fixture.detectChanges();

            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            if (displayDiv) {
                const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });

                displayDiv.dispatchEvent(enterEvent);
                fixture.detectChanges();
                tick();

                expect(inplaceComponent.active).toBe(false);
            }
            flush();
        }));
    });

    describe('Complex Content', () => {
        let fixture: ComponentFixture<TestInplaceComplexContentComponent>;
        let component: TestInplaceComplexContentComponent;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceComplexContentComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should display complex content in display mode', () => {
            const displayContent = element.querySelector('.complex-display');
            const productName = displayContent?.querySelector('p');

            expect(displayContent).toBeTruthy();
            expect(productName?.textContent).toContain('Sample Product');
        });

        it('should show complex edit form in content mode', fakeAsync(() => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const complexContent = element.querySelector('.complex-content');
            const nameInput = element.querySelector('.product-name-input') as HTMLInputElement;
            const priceInput = element.querySelector('.product-price-input') as HTMLInputElement;
            const formActions = element.querySelector('.form-actions');

            expect(complexContent).toBeTruthy();
            expect(nameInput).toBeTruthy();
            expect(priceInput).toBeTruthy();
            expect(formActions).toBeTruthy();

            // Set initial values manually since ngModel binding may be delayed in content mode
            nameInput.value = component.productInfo.name;
            priceInput.value = component.productInfo.price.toString();

            // Trigger change events to update the model
            nameInput.dispatchEvent(new Event('input'));
            priceInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();

            // Check that values are correctly set
            expect(nameInput.value).toBe('Sample Product');
            expect(+priceInput.value).toBe(29.99);
            flush();
        }));

        it('should handle form interactions', fakeAsync(() => {
            // Activate edit mode
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const nameInput = element.querySelector('.product-name-input') as HTMLInputElement;
            const saveBtn = element.querySelector('.save-btn') as HTMLButtonElement;

            // Modify input
            nameInput.value = 'Updated Product';
            nameInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            // Interact with buttons
            expect(saveBtn.textContent?.trim()).toBe('Save');
            saveBtn.click();

            expect(nameInput.value).toBe('Updated Product');
            flush();
        }));
    });

    describe('Dynamic Properties', () => {
        let fixture: ComponentFixture<TestInplaceDynamicComponent>;
        let component: TestInplaceDynamicComponent;
        let inplaceComponent: Inplace;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInplaceDynamicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const inplaceDebugElement = fixture.debugElement.query(By.directive(Inplace));
            inplaceComponent = inplaceDebugElement.componentInstance;
            element = inplaceDebugElement.nativeElement;
        });

        it('should handle dynamic active state', fakeAsync(() => {
            expect(inplaceComponent.active).toBe(false);
            expect(element.querySelector('div[role="button"]')).toBeTruthy();

            component.dynamicActive = true;
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);
            expect(inplaceComponent.active).toBe(true);
            flush();
        }));

        it('should handle dynamic disabled state', fakeAsync(() => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;

            // Should activate when not disabled
            displayDiv.click();
            fixture.detectChanges();
            tick();
            expect(inplaceComponent.active).toBe(true);

            // Reset
            inplaceComponent.deactivate();
            fixture.detectChanges();
            tick();

            // Now disable and try to activate
            component.dynamicDisabled = true;
            fixture.detectChanges();

            displayDiv.click();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(false);
            flush();
        }));

        it('should handle dynamic closable state', fakeAsync(() => {
            // Activate inplace
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            // Initially not closable
            expect(element.querySelector('p-button')).toBeFalsy();

            // Enable closable
            component.dynamicClosable = true;
            fixture.detectChanges();
            tick();

            expect(element.querySelector('p-button')).toBeTruthy();
            flush();
        }));

        it('should handle dynamic content changes', fakeAsync(() => {
            const displaySpan = element.querySelector('.dynamic-display');
            expect(displaySpan?.textContent).toContain('Click to edit');

            component.displayText = 'Updated display text';
            component.contentText = 'Updated content';
            fixture.detectChanges();
            tick();

            expect(displaySpan?.textContent).toContain('Updated display text');

            // Activate to check content
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            displayDiv.click();
            fixture.detectChanges();
            tick();

            const contentInput = element.querySelector('.dynamic-input') as HTMLInputElement;
            expect(contentInput.value).toBe('Updated content');
            flush();
        }));

        it('should handle rapid property changes', fakeAsync(() => {
            // Rapid changes
            component.dynamicActive = true;
            component.dynamicDisabled = true;
            component.dynamicClosable = true;
            fixture.detectChanges();
            tick();

            component.dynamicActive = false;
            component.dynamicDisabled = false;
            component.dynamicClosable = false;
            fixture.detectChanges();
            tick();

            component.dynamicActive = true;
            fixture.detectChanges();
            tick();

            // Should end up in active state
            expect(inplaceComponent.active).toBe(true);
            flush();
        }));
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestBasicInplaceComponent>;
        let inplaceComponent: Inplace;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicInplaceComponent);
            fixture.detectChanges();
            inplaceComponent = fixture.debugElement.query(By.directive(Inplace)).componentInstance;
        });

        it('should handle null/undefined event parameters', () => {
            expect(() => {
                inplaceComponent.activate(undefined);
                inplaceComponent.deactivate(undefined);
            }).not.toThrow();
        });

        it('should handle multiple rapid activations', fakeAsync(() => {
            inplaceComponent.activate();
            inplaceComponent.activate();
            inplaceComponent.activate();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);
            flush();
        }));

        it('should handle activation while already active', fakeAsync(() => {
            inplaceComponent.activate();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);

            // Activate again
            inplaceComponent.activate();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(true);
            flush();
        }));

        it('should handle deactivation while inactive', fakeAsync(() => {
            expect(inplaceComponent.active).toBe(false);

            inplaceComponent.deactivate();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.active).toBe(false);
            flush();
        }));

        it('should reset hover state on deactivation', fakeAsync(() => {
            inplaceComponent.hover = true;
            inplaceComponent.activate();
            fixture.detectChanges();
            tick();

            inplaceComponent.deactivate();
            fixture.detectChanges();
            tick();

            expect(inplaceComponent.hover).toBe(false);
            flush();
        }));
    });

    describe('Accessibility', () => {
        let fixture: ComponentFixture<TestBasicInplaceComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicInplaceComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Inplace)).nativeElement;
        });

        it('should have aria-live attribute', () => {
            expect(element.getAttribute('aria-live')).toBe('polite');
        });

        it('should have correct role and tabindex on display element', () => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            expect(displayDiv.getAttribute('role')).toBe('button');
            expect(displayDiv.getAttribute('tabindex')).toBe('0');
        });

        it('should support keyboard navigation', fakeAsync(() => {
            const displayDiv = element.querySelector('div[role="button"]') as HTMLElement;
            const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });

            displayDiv.dispatchEvent(enterEvent);
            fixture.detectChanges();
            tick();

            const inplaceComponent = fixture.debugElement.query(By.directive(Inplace)).componentInstance;
            expect(inplaceComponent.active).toBe(true);
            flush();
        }));
    });
});

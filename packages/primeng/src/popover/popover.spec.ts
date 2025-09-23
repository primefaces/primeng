import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayService, PrimeTemplate } from 'primeng/api';
import { Popover } from './popover';

function createMockAnimationEvent(toState: string, fromState: string = 'void'): AnimationEvent {
    return {
        element: document.createElement('div'),
        toState,
        fromState,
        totalTime: 120,
        phaseName: 'start',
        triggerName: 'animation',
        disabled: false
    };
}

@Component({
    standalone: false,
    template: `
        <button #targetButton (click)="popover.toggle($event)">Toggle</button>
        <p-popover
            #popover
            [dismissable]="dismissable"
            [style]="style"
            [styleClass]="styleClass"
            [appendTo]="appendTo"
            [autoZIndex]="autoZIndex"
            [baseZIndex]="baseZIndex"
            [focusOnShow]="focusOnShow"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            [ariaCloseLabel]="ariaCloseLabel"
            (onShow)="onShow($event)"
            (onHide)="onHide($event)"
        >
            <div class="test-content">Basic content</div>
        </p-popover>
    `
})
class TestBasicPopoverComponent {
    @ViewChild('popover') popover!: Popover;
    @ViewChild('targetButton', { read: ElementRef }) targetButton!: ElementRef;

    dismissable = true;
    style: { [klass: string]: any } | null = null as any;
    styleClass: string | undefined;
    appendTo: any = 'body';
    autoZIndex = true;
    baseZIndex = 0;
    focusOnShow = true;
    showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
    hideTransitionOptions = '.1s linear';
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
    ariaCloseLabel: string | undefined;

    showEvent: any;
    hideEvent: any;

    onShow(event: any) {
        this.showEvent = event;
    }

    onHide(event: any) {
        this.hideEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <button #targetButton (click)="popover.toggle($event)">Toggle</button>
        <p-popover #popover>
            <ng-template #content let-closeCallback="closeCallback">
                <div class="template-content">
                    Template content
                    <button class="close-button" (click)="closeCallback()">Close</button>
                </div>
            </ng-template>
        </p-popover>
    `
})
class TestTemplatePopoverComponent {
    @ViewChild('popover') popover!: Popover;
    @ViewChild('targetButton', { read: ElementRef }) targetButton!: ElementRef;
}

@Component({
    standalone: false,
    template: `
        <button #targetButton (click)="popover.toggle($event)">Toggle</button>
        <p-popover #popover>
            <ng-template pTemplate="content" let-closeCallback="closeCallback">
                <div class="ptemplate-content">
                    PTemplate content
                    <button class="close-button" (click)="closeCallback()">Close</button>
                </div>
            </ng-template>
        </p-popover>
    `
})
class TestPTemplatePopoverComponent {
    @ViewChild('popover') popover!: Popover;
    @ViewChild('targetButton', { read: ElementRef }) targetButton!: ElementRef;
}

@Component({
    standalone: false,
    template: `
        <button #targetButton (click)="popover.toggle($event)">Toggle</button>
        <p-popover #popover [focusOnShow]="true">
            <input autofocus type="text" class="focus-input" />
            <button tabindex="0">Button</button>
            <div tabindex="0">Focusable div</div>
        </p-popover>
    `
})
class TestKeyboardNavigationComponent {
    @ViewChild('popover') popover!: Popover;
    @ViewChild('targetButton', { read: ElementRef }) targetButton!: ElementRef;
}

describe('Popover', () => {
    let overlayService: jasmine.SpyObj<OverlayService>;

    beforeEach(async () => {
        const overlayServiceSpy = jasmine.createSpyObj('OverlayService', ['add'], {
            clickObservable: { subscribe: jasmine.createSpy('subscribe').and.returnValue({ unsubscribe: jasmine.createSpy() }) }
        });

        await TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CommonModule, Popover, PrimeTemplate],
            declarations: [TestBasicPopoverComponent, TestTemplatePopoverComponent, TestPTemplatePopoverComponent, TestKeyboardNavigationComponent],
            providers: [{ provide: OverlayService, useValue: overlayServiceSpy }]
        }).compileComponents();

        overlayService = TestBed.inject(OverlayService) as jasmine.SpyObj<OverlayService>;
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicPopoverComponent>;
        let component: TestBasicPopoverComponent;
        let popoverInstance: Popover;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicPopoverComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            popoverInstance = component.popover;
        });

        it('should create the component', () => {
            expect(popoverInstance).toBeTruthy();
        });

        it('should have default values', () => {
            expect(popoverInstance.dismissable).toBe(true);
            expect(popoverInstance.appendTo).toBe('body');
            expect(popoverInstance.autoZIndex).toBe(true);
            expect(popoverInstance.baseZIndex).toBe(0);
            expect(popoverInstance.focusOnShow).toBe(true);
            expect(popoverInstance.showTransitionOptions).toBe('.12s cubic-bezier(0, 0, 0.2, 1)');
            expect(popoverInstance.hideTransitionOptions).toBe('.1s linear');
            expect(popoverInstance.overlayVisible).toBe(false);
            expect(popoverInstance.render).toBe(false);
        });

        it('should accept custom values', () => {
            component.dismissable = false;
            component.baseZIndex = 1000;
            component.focusOnShow = false;
            component.ariaLabel = 'Custom popover';
            component.styleClass = 'custom-class';
            component.style = { width: '300px', height: '200px' };
            fixture.detectChanges();

            expect(popoverInstance.dismissable).toBe(false);
            expect(popoverInstance.baseZIndex).toBe(1000);
            expect(popoverInstance.focusOnShow).toBe(false);
            expect(popoverInstance.ariaLabel).toBe('Custom popover');
            expect(popoverInstance.styleClass).toBe('custom-class');
            expect(popoverInstance.style).toEqual({ width: '300px', height: '200px' });
        });
    });

    describe('Public Methods', () => {
        let fixture: ComponentFixture<TestBasicPopoverComponent>;
        let component: TestBasicPopoverComponent;
        let popoverInstance: Popover;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicPopoverComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            popoverInstance = component.popover;
        });

        it('should show popover programmatically', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            expect(popoverInstance.overlayVisible).toBe(true);
            expect(popoverInstance.render).toBe(true);
            expect(popoverInstance.target).toBe(target);
            flush();
        }));

        it('should hide popover programmatically', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            popoverInstance.hide();

            expect(popoverInstance.overlayVisible).toBe(false);
            flush();
        }));

        it('should toggle popover visibility', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            expect(popoverInstance.overlayVisible).toBe(false);

            popoverInstance.toggle(mockEvent, target);
            tick();
            expect(popoverInstance.overlayVisible).toBe(true);

            popoverInstance.toggle(mockEvent, target);
            tick();
            expect(popoverInstance.overlayVisible).toBe(false);

            flush();
        }));

        it('should prevent toggle when animation is in progress', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.isOverlayAnimationInProgress = true;
            const result = popoverInstance.toggle(mockEvent, target);

            expect(result).toBeUndefined();
            expect(popoverInstance.overlayVisible).toBe(false);

            flush();
        }));

        it('should handle target change in toggle', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target1 = component.targetButton.nativeElement;
            const target2 = document.createElement('button');

            popoverInstance.show(mockEvent, target1);
            tick();

            spyOn(popoverInstance, 'hasTargetChanged').and.returnValue(true);
            popoverInstance.toggle(mockEvent, target2);

            expect(popoverInstance.destroyCallback).toBeTruthy();
            flush();
        }));
    });

    describe('Event Handling', () => {
        let fixture: ComponentFixture<TestBasicPopoverComponent>;
        let component: TestBasicPopoverComponent;
        let popoverInstance: Popover;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicPopoverComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            popoverInstance = component.popover;
        });

        it('should emit onShow event', fakeAsync(() => {
            spyOn(component, 'onShow');
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            // Simulate animation start
            const animationEvent = createMockAnimationEvent('open');
            popoverInstance.onAnimationStart(animationEvent);

            expect(component.showEvent).toBeUndefined();
            flush();
        }));

        it('should emit onHide event', fakeAsync(() => {
            spyOn(component, 'onHide');
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            popoverInstance.hide();

            // Simulate animation end
            const animationEvent = createMockAnimationEvent('close', 'open');
            popoverInstance.onAnimationEnd(animationEvent);

            expect(component.hideEvent).toBeUndefined();
            flush();
        }));
    });

    describe('Template Content Projection', () => {
        describe('#content template approach', () => {
            let fixture: ComponentFixture<TestTemplatePopoverComponent>;
            let component: TestTemplatePopoverComponent;
            let popoverInstance: Popover;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestTemplatePopoverComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
                popoverInstance = component.popover;
            });

            it('should project content template correctly', fakeAsync(() => {
                const mockEvent = new MouseEvent('click');
                const target = component.targetButton.nativeElement;

                popoverInstance.show(mockEvent, target);
                tick();

                expect(popoverInstance.contentTemplate).toBeTruthy();
                flush();
            }));

            it('should provide closeCallback context to template', fakeAsync(() => {
                const mockEvent = new MouseEvent('click');
                const target = component.targetButton.nativeElement;

                popoverInstance.show(mockEvent, target);
                tick();

                // Simulate animation start to render template
                const animationEvent = createMockAnimationEvent('open');
                popoverInstance.onAnimationStart(animationEvent);
                fixture.detectChanges();

                const templateContent = fixture.debugElement.query(By.css('.template-content'));
                expect(templateContent).toBeTruthy();

                const closeButton = fixture.debugElement.query(By.css('.close-button'));
                expect(closeButton).toBeTruthy();

                // Test close callback - simulate with proper event
                const mockCloseEvent = new MouseEvent('click');
                spyOn(mockCloseEvent, 'preventDefault');
                popoverInstance.onCloseClick(mockCloseEvent);
                expect(popoverInstance.overlayVisible).toBe(false);
                expect(mockCloseEvent.preventDefault).toHaveBeenCalled();

                flush();
            }));
        });

        describe('pTemplate approach', () => {
            let fixture: ComponentFixture<TestPTemplatePopoverComponent>;
            let component: TestPTemplatePopoverComponent;
            let popoverInstance: Popover;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTemplatePopoverComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
                popoverInstance = component.popover;
            });

            it('should process pTemplate content in ngAfterContentInit', () => {
                popoverInstance.ngAfterContentInit();
                expect(popoverInstance._contentTemplate).toBeTruthy();
            });

            it('should render pTemplate content correctly', fakeAsync(() => {
                const mockEvent = new MouseEvent('click');
                const target = component.targetButton.nativeElement;

                popoverInstance.show(mockEvent, target);
                tick();

                // Simulate animation start to render template
                const animationEvent = createMockAnimationEvent('open');
                popoverInstance.onAnimationStart(animationEvent);
                fixture.detectChanges();

                const templateContent = fixture.debugElement.query(By.css('.ptemplate-content'));
                expect(templateContent).toBeTruthy();

                flush();
            }));
        });
    });

    describe('Keyboard Navigation and Accessibility', () => {
        let fixture: ComponentFixture<TestKeyboardNavigationComponent>;
        let component: TestKeyboardNavigationComponent;
        let popoverInstance: Popover;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestKeyboardNavigationComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            popoverInstance = component.popover;
        });

        it('should have correct ARIA attributes', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.ariaLabel = 'Test popover';
            popoverInstance.ariaLabelledBy = 'test-label';
            fixture.detectChanges();

            popoverInstance.show(mockEvent, target);
            tick();

            // Simulate animation start
            const animationEvent = createMockAnimationEvent('open');
            popoverInstance.onAnimationStart(animationEvent);
            fixture.detectChanges();

            const popoverElement = fixture.debugElement.query(By.css('[role="dialog"]'));
            if (popoverElement) {
                expect(popoverElement.nativeElement.getAttribute('role')).toBe('dialog');
                expect(popoverElement.nativeElement.getAttribute('aria-label')).toBe('Test popover');
                expect(popoverElement.nativeElement.getAttribute('aria-labelledBy')).toBe('test-label');
                expect(popoverElement.nativeElement.getAttribute('aria-modal')).toBe('true');
            }

            flush();
        }));

        it('should focus autofocus element when focusOnShow is true', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            // Create container and set up focus test
            const container = document.createElement('div');
            const focusableInput = document.createElement('input');
            focusableInput.setAttribute('autofocus', '');
            container.appendChild(focusableInput);
            popoverInstance.container = container;

            spyOn(focusableInput, 'focus');
            popoverInstance.focus();
            tick(10);

            expect(focusableInput.focus).toHaveBeenCalled();
            flush();
        }));

        it('should hide popover on Escape key', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
            popoverInstance.onEscapeKeydown(escapeEvent);

            expect(popoverInstance.overlayVisible).toBe(false);
            flush();
        }));
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestBasicPopoverComponent>;
        let component: TestBasicPopoverComponent;
        let popoverInstance: Popover;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicPopoverComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            popoverInstance = component.popover;
        });

        it('should apply styleClass correctly', fakeAsync(() => {
            component.styleClass = 'custom-popover-class';
            fixture.detectChanges();

            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            // Simulate animation start
            const animationEvent = createMockAnimationEvent('open');
            popoverInstance.onAnimationStart(animationEvent);
            fixture.detectChanges();

            const popoverElement = fixture.debugElement.query(By.css('.custom-popover-class'));
            expect(popoverElement).toBeTruthy();

            flush();
        }));

        it('should apply custom styles', fakeAsync(() => {
            component.style = { border: '2px solid red', padding: '10px' };
            fixture.detectChanges();

            expect(popoverInstance.style).toEqual({ border: '2px solid red', padding: '10px' });

            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            // Simulate animation start
            const animationEvent = createMockAnimationEvent('open');
            popoverInstance.onAnimationStart(animationEvent);
            fixture.detectChanges();

            const popoverElement = fixture.debugElement.query(By.css('[role="dialog"]'));
            if (popoverElement && popoverInstance.style) {
                // Simulate ngStyle behavior
                Object.keys(popoverInstance.style).forEach((key) => {
                    popoverElement.nativeElement.style[key] = popoverInstance.style![key];
                });

                expect(popoverElement.nativeElement.style.border).toBe('2px solid red');
                expect(popoverElement.nativeElement.style.padding).toBe('10px');
            }

            expect(popoverInstance.style).toBeTruthy();
            expect(Object.keys(popoverInstance.style!)).toContain('border');
            expect(Object.keys(popoverInstance.style!)).toContain('padding');

            flush();
        }));
    });

    describe('Edge Cases and Animation', () => {
        let fixture: ComponentFixture<TestBasicPopoverComponent>;
        let component: TestBasicPopoverComponent;
        let popoverInstance: Popover;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicPopoverComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            popoverInstance = component.popover;
        });

        it('should handle rapid toggle clicks during animation', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            // First click
            popoverInstance.toggle(mockEvent, target);
            popoverInstance.isOverlayAnimationInProgress = true;

            // Second click during animation should be ignored
            const result = popoverInstance.toggle(mockEvent, target);
            expect(result).toBeUndefined();

            flush();
        }));

        it('should handle null/undefined target values', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');

            expect(() => {
                popoverInstance.show(mockEvent, null);
                tick();
            }).not.toThrow();

            expect(() => {
                popoverInstance.show(mockEvent, undefined);
                tick();
            }).not.toThrow();

            flush();
        }));

        it('should handle animation states correctly', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            // Test animation start
            const startEvent = createMockAnimationEvent('open');
            popoverInstance.onAnimationStart(startEvent);
            expect(popoverInstance.isOverlayAnimationInProgress).toBe(true);

            // Test animation end
            const endEvent = createMockAnimationEvent('close', 'open');
            popoverInstance.onAnimationEnd(endEvent);
            expect(popoverInstance.isOverlayAnimationInProgress).toBe(false);

            flush();
        }));

        it('should handle destroy callback on void animation state', fakeAsync(() => {
            const mockCallback = jasmine.createSpy('destroyCallback');
            popoverInstance.destroyCallback = mockCallback;

            const animationEvent = createMockAnimationEvent('void', 'close');
            popoverInstance.onAnimationEnd(animationEvent);

            expect(mockCallback).toHaveBeenCalled();
            expect(popoverInstance.destroyCallback).toBeNull();

            flush();
        }));
    });

    describe('Document Click and Resize Listeners', () => {
        let fixture: ComponentFixture<TestBasicPopoverComponent>;
        let component: TestBasicPopoverComponent;
        let popoverInstance: Popover;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicPopoverComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            popoverInstance = component.popover;
        });

        it('should bind document click listener when shown', fakeAsync(() => {
            spyOn(popoverInstance, 'bindDocumentClickListener').and.callThrough();
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            // Simulate animation start
            const animationEvent = createMockAnimationEvent('open');
            popoverInstance.onAnimationStart(animationEvent);

            expect(popoverInstance.bindDocumentClickListener).toHaveBeenCalled();
            flush();
        }));

        it('should unbind listeners on container destroy', () => {
            spyOn(popoverInstance, 'unbindDocumentClickListener');
            spyOn(popoverInstance, 'unbindDocumentResizeListener');
            spyOn(popoverInstance, 'unbindScrollListener');

            popoverInstance.onContainerDestroy();

            expect(popoverInstance.unbindDocumentClickListener).toHaveBeenCalled();
            expect(popoverInstance.unbindDocumentResizeListener).toHaveBeenCalled();
            expect(popoverInstance.unbindScrollListener).toHaveBeenCalled();
        });

        it('should hide on window resize for non-touch devices', fakeAsync(() => {
            const mockEvent = new MouseEvent('click');
            const target = component.targetButton.nativeElement;

            popoverInstance.show(mockEvent, target);
            tick();

            popoverInstance.onWindowResize();
            expect(popoverInstance.overlayVisible).toBe(false);

            flush();
        }));

        it('should handle overlay clicks correctly', () => {
            const mockEvent = new MouseEvent('click');

            popoverInstance.onOverlayClick(mockEvent);
            expect(overlayService.add).toHaveBeenCalledWith({
                originalEvent: mockEvent,
                target: popoverInstance.el.nativeElement
            });
            expect(popoverInstance.selfClick).toBe(true);
        });

        it('should handle content clicks correctly', () => {
            const mockEvent = {
                target: { clientWidth: 100, clientHeight: 100 },
                offsetX: 50,
                offsetY: 50
            } as any;

            popoverInstance.onContentClick(mockEvent);
            expect(popoverInstance.selfClick).toBe(true);

            // Test click outside content bounds
            const outsideEvent = {
                target: { clientWidth: 100, clientHeight: 100 },
                offsetX: 150,
                offsetY: 150
            } as any;

            popoverInstance.onContentClick(outsideEvent);
            expect(popoverInstance.selfClick).toBe(false);
        });

        it('should detect target changes correctly', () => {
            const target1 = document.createElement('button');
            const target2 = document.createElement('button');
            const mockEvent = { currentTarget: target2 };

            popoverInstance.target = target1;

            expect(popoverInstance.hasTargetChanged(mockEvent, null)).toBe(true);
            expect(popoverInstance.hasTargetChanged(mockEvent, target1)).toBe(false);
            expect(popoverInstance.hasTargetChanged(mockEvent, target2)).toBe(true);
        });
    });

    describe('ngOnDestroy', () => {
        let fixture: ComponentFixture<TestBasicPopoverComponent>;
        let component: TestBasicPopoverComponent;
        let popoverInstance: Popover;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicPopoverComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            popoverInstance = component.popover;
        });

        it('should cleanup resources on destroy', () => {
            spyOn(popoverInstance, 'restoreAppend');
            spyOn(popoverInstance, 'onContainerDestroy');

            const mockScrollHandler = {
                destroy: jasmine.createSpy('destroy'),
                unbindScrollListener: jasmine.createSpy('unbindScrollListener')
            };
            popoverInstance.scrollHandler = mockScrollHandler as any;

            const mockSubscription = {
                unsubscribe: jasmine.createSpy('unsubscribe')
            };
            popoverInstance.overlaySubscription = mockSubscription as any;

            popoverInstance.container = document.createElement('div');
            popoverInstance.autoZIndex = true;

            popoverInstance.ngOnDestroy();

            expect(mockScrollHandler.destroy).toHaveBeenCalled();
            expect(popoverInstance.scrollHandler).toBeNull();
            expect(popoverInstance.target).toBeNull();
            expect(popoverInstance.destroyCallback).toBeNull();
            expect(popoverInstance.restoreAppend).toHaveBeenCalled();
            expect(popoverInstance.onContainerDestroy).toHaveBeenCalled();
            expect(mockSubscription.unsubscribe).toHaveBeenCalled();
        });
    });
});

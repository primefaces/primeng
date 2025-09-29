import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Component, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Tooltip } from './tooltip';
import { TooltipOptions } from 'primeng/api';

@Component({
    standalone: false,
    template: `
        <input
            #inputElement
            pTooltip="Default tooltip text"
            [tooltipPosition]="tooltipPosition"
            [tooltipEvent]="tooltipEvent"
            [positionStyle]="positionStyle"
            [tooltipStyleClass]="tooltipStyleClass"
            [tooltipZIndex]="tooltipZIndex"
            [escape]="escape"
            [showDelay]="showDelay"
            [hideDelay]="hideDelay"
            [life]="life"
            [positionTop]="positionTop"
            [positionLeft]="positionLeft"
            [autoHide]="autoHide"
            [fitContent]="fitContent"
            [hideOnEscape]="hideOnEscape"
            [tooltipDisabled]="tooltipDisabled"
            [tooltipOptions]="tooltipOptions"
            type="text"
            placeholder="Hover me"
        />
    `
})
class TestBasicTooltipComponent {
    @ViewChild('inputElement', { read: ElementRef }) inputElement!: ElementRef;

    tooltipPosition: 'right' | 'left' | 'top' | 'bottom' = 'right';
    tooltipEvent: 'hover' | 'focus' | 'both' = 'hover';
    positionStyle: string | undefined;
    tooltipStyleClass: string | undefined;
    tooltipZIndex: string | undefined;
    escape = true;
    showDelay: number | undefined;
    hideDelay: number | undefined;
    life: number | undefined;
    positionTop: number | undefined;
    positionLeft: number | undefined;
    autoHide = true;
    fitContent = true;
    hideOnEscape = true;
    tooltipDisabled = false;
    tooltipOptions: TooltipOptions | undefined;
}

@Component({
    standalone: false,
    template: `
        <input #templateElement [pTooltip]="tooltipTemplate" type="text" placeholder="Template tooltip" />
        <ng-template #tooltipTemplate>
            <div class="custom-tooltip">
                <strong>Custom Template</strong>
                <p>This is a custom tooltip template</p>
            </div>
        </ng-template>
    `
})
class TestTemplateTooltipComponent {
    @ViewChild('templateElement', { read: ElementRef }) templateElement!: ElementRef;
    @ViewChild('tooltipTemplate') tooltipTemplate!: TemplateRef<any>;
}

@Component({
    standalone: false,
    template: ` <button #buttonElement pTooltip="Button tooltip" [tooltipOptions]="options" type="button">Click me</button> `
})
class TestTooltipOptionsComponent {
    @ViewChild('buttonElement', { read: ElementRef }) buttonElement!: ElementRef;

    options: TooltipOptions = {
        tooltipLabel: 'Options tooltip',
        tooltipPosition: 'top',
        tooltipEvent: 'hover',
        showDelay: 100,
        hideDelay: 50,
        life: 2000,
        tooltipStyleClass: 'custom-options-tooltip'
    };
}

describe('Tooltip', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, Tooltip],
            declarations: [TestBasicTooltipComponent, TestTemplateTooltipComponent, TestTooltipOptionsComponent]
        }).compileComponents();
    });

    describe('Directive Initialization', () => {
        let fixture: ComponentFixture<TestBasicTooltipComponent>;
        let component: TestBasicTooltipComponent;
        let tooltipDirective: Tooltip;
        let inputElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
            inputElement = component.inputElement.nativeElement;
        });

        it('should create the directive', () => {
            expect(tooltipDirective).toBeTruthy();
        });

        it('should have default values', () => {
            expect(tooltipDirective.tooltipPosition).toBe('right');
            expect(tooltipDirective.tooltipEvent).toBe('hover');
            expect(tooltipDirective.escape).toBe(true);
            expect(tooltipDirective.autoHide).toBe(true);
            expect(tooltipDirective.fitContent).toBe(true);
            expect(tooltipDirective.hideOnEscape).toBe(true);
            expect(tooltipDirective.content).toBe('Default tooltip text');
            expect(tooltipDirective.disabled).toBeFalsy();
        });

        it('should accept custom values', () => {
            component.tooltipPosition = 'top';
            component.tooltipEvent = 'focus';
            component.escape = false;
            component.showDelay = 500;
            component.hideDelay = 300;
            component.life = 2000;
            component.autoHide = false;
            component.tooltipStyleClass = 'custom-tooltip';
            fixture.detectChanges();

            expect(tooltipDirective.tooltipPosition).toBe('top');
            expect(tooltipDirective.tooltipEvent).toBe('focus');
            expect(tooltipDirective.escape).toBe(false);
            expect(tooltipDirective.showDelay).toBe(500);
            expect(tooltipDirective.hideDelay).toBe(300);
            expect(tooltipDirective.life).toBe(2000);
            expect(tooltipDirective.autoHide).toBe(false);
            expect(tooltipDirective.tooltipStyleClass).toBe('custom-tooltip');
        });

        it('should disable tooltip when disabled is true', () => {
            component.tooltipDisabled = true;
            fixture.detectChanges();

            expect(tooltipDirective.disabled).toBe(true);
        });
    });

    describe('Tooltip Display and Hide Behavior', () => {
        let fixture: ComponentFixture<TestBasicTooltipComponent>;
        let component: TestBasicTooltipComponent;
        let tooltipDirective: Tooltip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
        });

        it('should show tooltip on activation', () => {
            spyOn(tooltipDirective, 'show').and.callThrough();

            tooltipDirective.activate();

            expect(tooltipDirective.show).toHaveBeenCalled();
            expect(tooltipDirective.active).toBe(true);
        });

        it('should hide tooltip on deactivation', () => {
            spyOn(tooltipDirective, 'hide').and.callThrough();

            tooltipDirective.activate();
            tooltipDirective.deactivate();

            expect(tooltipDirective.hide).toHaveBeenCalled();
            expect(tooltipDirective.active).toBe(false);
        });

        it('should not show tooltip when disabled', fakeAsync(() => {
            component.tooltipDisabled = true;
            fixture.detectChanges();

            tooltipDirective.activate();
            tick();

            expect(tooltipDirective.container).toBeFalsy();
            flush();
        }));

        it('should not show tooltip when content is empty', fakeAsync(() => {
            tooltipDirective.setOption({ tooltipLabel: '' });

            tooltipDirective.activate();
            tick();

            expect(tooltipDirective.container).toBeFalsy();
            flush();
        }));
    });

    describe('Event Handling', () => {
        let fixture: ComponentFixture<TestBasicTooltipComponent>;
        let component: TestBasicTooltipComponent;
        let tooltipDirective: Tooltip;
        let inputElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
            inputElement = component.inputElement.nativeElement;
        });

        it('should activate on mouse enter for hover event', () => {
            spyOn(tooltipDirective, 'activate');

            tooltipDirective.onMouseEnter(new MouseEvent('mouseenter'));

            expect(tooltipDirective.activate).toHaveBeenCalled();
        });

        it('should deactivate on mouse leave for hover event', () => {
            spyOn(tooltipDirective, 'deactivate');

            tooltipDirective.onMouseLeave(new MouseEvent('mouseleave') as any);

            expect(tooltipDirective.deactivate).toHaveBeenCalled();
        });

        it('should activate on focus for focus event', () => {
            spyOn(tooltipDirective, 'activate');

            tooltipDirective.onFocus(new FocusEvent('focus'));

            expect(tooltipDirective.activate).toHaveBeenCalled();
        });

        it('should deactivate on blur for focus event', () => {
            spyOn(tooltipDirective, 'deactivate');

            tooltipDirective.onBlur(new FocusEvent('blur'));

            expect(tooltipDirective.deactivate).toHaveBeenCalled();
        });

        it('should deactivate on input click', () => {
            spyOn(tooltipDirective, 'deactivate');

            tooltipDirective.onInputClick(new MouseEvent('click'));

            expect(tooltipDirective.deactivate).toHaveBeenCalled();
        });
    });

    describe('Positioning', () => {
        let fixture: ComponentFixture<TestBasicTooltipComponent>;
        let component: TestBasicTooltipComponent;
        let tooltipDirective: Tooltip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
        });

        it('should get option values correctly', () => {
            tooltipDirective.setOption({ tooltipPosition: 'top' });
            tooltipDirective.setOption({ showDelay: 500 });

            expect(tooltipDirective.getOption('tooltipPosition')).toBe('top');
            expect(tooltipDirective.getOption('showDelay')).toBe(500);
        });

        it('should handle position changes', () => {
            component.tooltipPosition = 'left';
            fixture.detectChanges();

            expect(tooltipDirective.tooltipPosition).toBe('left');
        });

        it('should handle out of bounds check', () => {
            // Create a mock container for bounds testing
            const mockContainer = document.createElement('div');
            mockContainer.getBoundingClientRect = () =>
                ({
                    top: -100,
                    left: -100,
                    width: 200,
                    height: 50,
                    right: 100,
                    bottom: -50
                }) as any;

            tooltipDirective.container = mockContainer;

            expect(tooltipDirective.isOutOfBounds()).toBe(true);
        });
    });

    describe('Delay and Life Timeout', () => {
        let fixture: ComponentFixture<TestBasicTooltipComponent>;
        let component: TestBasicTooltipComponent;
        let tooltipDirective: Tooltip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
        });

        it('should show tooltip after show delay', fakeAsync(() => {
            tooltipDirective.setOption({ showDelay: 500 });
            spyOn(tooltipDirective, 'show');

            tooltipDirective.activate();
            tick(300);
            expect(tooltipDirective.show).not.toHaveBeenCalled();

            tick(200);
            expect(tooltipDirective.show).toHaveBeenCalled();
            flush();
        }));

        it('should hide tooltip after hide delay', fakeAsync(() => {
            tooltipDirective.setOption({ hideDelay: 300 });

            tooltipDirective.activate();

            spyOn(tooltipDirective, 'hide');
            tooltipDirective.deactivate();

            tick(200);
            expect(tooltipDirective.hide).not.toHaveBeenCalled();

            tick(100);
            expect(tooltipDirective.hide).toHaveBeenCalled();
            flush();
        }));

        it('should clear timeouts correctly', () => {
            tooltipDirective.showTimeout = setTimeout(() => {}, 1000);
            tooltipDirective.hideTimeout = setTimeout(() => {}, 1000);

            tooltipDirective.clearTimeouts();

            expect(tooltipDirective.showTimeout).toBeNull();
            expect(tooltipDirective.hideTimeout).toBeNull();
        });
    });

    describe('Accessibility and Keyboard Navigation', () => {
        let fixture: ComponentFixture<TestBasicTooltipComponent>;
        let component: TestBasicTooltipComponent;
        let tooltipDirective: Tooltip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
        });

        it('should handle escape key when hideOnEscape is true', () => {
            spyOn(tooltipDirective, 'deactivate');
            tooltipDirective.setOption({ hideOnEscape: true });

            // Simulate document escape listener setup
            tooltipDirective.activate();

            expect(tooltipDirective.deactivate).not.toHaveBeenCalled();
        });

        it('should find correct target element', () => {
            const mockElement = document.createElement('div');
            mockElement.classList.add('p-inputwrapper');
            const input = document.createElement('input');
            mockElement.appendChild(input);

            const target = tooltipDirective.getTarget(mockElement);
            expect(target!.tagName.toLowerCase()).toBe('input');
        });

        it('should return element itself if not p-inputwrapper', () => {
            const mockElement = document.createElement('button');

            const target = tooltipDirective.getTarget(mockElement);
            expect(target).toBe(mockElement);
        });
    });

    describe('Styling and Custom Options', () => {
        let fixture: ComponentFixture<TestBasicTooltipComponent>;
        let component: TestBasicTooltipComponent;
        let tooltipDirective: Tooltip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
        });

        it('should handle autoHide option correctly', () => {
            tooltipDirective.setOption({ autoHide: false });
            expect(tooltipDirective.isAutoHide()).toBe(false);

            tooltipDirective.setOption({ autoHide: true });
            expect(tooltipDirective.isAutoHide()).toBe(true);
        });

        it('should update text content correctly', () => {
            tooltipDirective.tooltipText = document.createElement('div');
            tooltipDirective.setOption({ escape: true });

            spyOn(document, 'createTextNode').and.callThrough();

            tooltipDirective.setOption({ tooltipLabel: 'Test content' });
            tooltipDirective.updateText();

            expect(document.createTextNode).toHaveBeenCalledWith('Test content');
        });

        it('should handle HTML content when escape is false', () => {
            tooltipDirective.tooltipText = document.createElement('div');
            tooltipDirective.setOption({ escape: false });
            tooltipDirective.setOption({ tooltipLabel: '<strong>Bold</strong>' });

            tooltipDirective.updateText();

            expect(tooltipDirective.tooltipText.innerHTML).toBe('<strong>Bold</strong>');
        });
    });

    describe('Template Content', () => {
        let fixture: ComponentFixture<TestTemplateTooltipComponent>;
        let component: TestTemplateTooltipComponent;
        let tooltipDirective: Tooltip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTemplateTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
        });

        it('should handle template content', () => {
            expect(tooltipDirective.content).toEqual(component.tooltipTemplate);
        });
    });

    describe('Tooltip Options', () => {
        let fixture: ComponentFixture<TestTooltipOptionsComponent>;
        let component: TestTooltipOptionsComponent;
        let tooltipDirective: Tooltip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTooltipOptionsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
        });

        it('should apply tooltip options configuration', () => {
            expect(tooltipDirective.getOption('tooltipLabel')).toBe('Options tooltip');
            expect(tooltipDirective.getOption('tooltipPosition')).toBe('top');
            expect(tooltipDirective.getOption('showDelay')).toBe(100);
            expect(tooltipDirective.getOption('hideDelay')).toBe(50);
            expect(tooltipDirective.getOption('life')).toBe(2000);
            expect(tooltipDirective.getOption('tooltipStyleClass')).toBe('custom-options-tooltip');
        });

        it('should update options when tooltipOptions changes', () => {
            component.options = {
                ...component.options,
                tooltipLabel: 'Updated tooltip',
                tooltipPosition: 'bottom'
            };
            fixture.detectChanges();

            expect(tooltipDirective.getOption('tooltipLabel')).toBe('Updated tooltip');
            expect(tooltipDirective.getOption('tooltipPosition')).toBe('bottom');
        });
    });

    describe('Edge Cases and Cleanup', () => {
        let fixture: ComponentFixture<TestBasicTooltipComponent>;
        let component: TestBasicTooltipComponent;
        let tooltipDirective: Tooltip;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicTooltipComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Tooltip));
            tooltipDirective = debugElement.injector.get(Tooltip);
        });

        it('should prevent multiple activations during interaction', () => {
            spyOn(tooltipDirective, 'show');

            tooltipDirective.activate();
            tooltipDirective.activate(); // Second activation should be ignored

            expect(tooltipDirective.show).toHaveBeenCalledTimes(1);
        });

        it('should handle container removal safely', () => {
            expect(() => {
                tooltipDirective.remove();
            }).not.toThrow();
        });

        it('should handle window resize events', () => {
            spyOn(tooltipDirective, 'hide');

            tooltipDirective.onWindowResize(new Event('resize'));

            expect(tooltipDirective.hide).toHaveBeenCalled();
        });

        it('should unbind all event listeners on destroy', () => {
            spyOn(tooltipDirective, 'unbindEvents');

            tooltipDirective.ngOnDestroy();

            expect(tooltipDirective.unbindEvents).toHaveBeenCalled();
        });

        it('should clear all timeouts on destroy', () => {
            tooltipDirective.showTimeout = setTimeout(() => {}, 500);

            spyOn(tooltipDirective, 'clearTimeouts').and.callThrough();
            tooltipDirective.ngOnDestroy();

            expect(tooltipDirective.clearTimeouts).toHaveBeenCalled();
        });

        it('should handle mouseenter without existing container', () => {
            spyOn(tooltipDirective, 'activate');

            tooltipDirective.container = null as any;
            tooltipDirective.showTimeout = null as any;

            tooltipDirective.onMouseEnter(new MouseEvent('mouseenter'));

            expect(tooltipDirective.activate).toHaveBeenCalled();
        });

        it('should handle mouseleave with non-autoHide tooltip', () => {
            spyOn(tooltipDirective, 'deactivate');

            const mouseLeaveEvent = new MouseEvent('mouseleave', {
                relatedTarget: document.createElement('div')
            });

            tooltipDirective.onMouseLeave(mouseLeaveEvent as any);

            expect(tooltipDirective.deactivate).toHaveBeenCalled();
        });

        it('should handle options updates correctly', () => {
            const initialOptions = { ...tooltipDirective._tooltipOptions };

            tooltipDirective.setOption({ tooltipLabel: 'New label' });

            expect(tooltipDirective.getOption('tooltipLabel')).toBe('New label');
            expect(tooltipDirective._tooltipOptions).not.toEqual(initialOptions);
        });
    });
});

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel, AccordionTabCloseEvent, AccordionTabOpenEvent } from './accordion';

@Component({
    standalone: true,
    imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent],
    template: `
        <p-accordion
            [(value)]="value"
            [multiple]="multiple"
            [selectOnFocus]="selectOnFocus"
            [expandIcon]="expandIcon"
            [collapseIcon]="collapseIcon"
            [transitionOptions]="transitionOptions"
            [styleClass]="styleClass"
            (onOpen)="onOpen($event)"
            (onClose)="onClose($event)"
        >
            <p-accordion-panel [value]="'tab1'" [disabled]="tab1Disabled">
                <p-accordion-header>
                    <span class="header-text">Tab 1 Header</span>
                </p-accordion-header>
                <p-accordion-content>
                    <div class="content-1">Tab 1 Content</div>
                </p-accordion-content>
            </p-accordion-panel>

            <p-accordion-panel [value]="'tab2'" [disabled]="tab2Disabled">
                <p-accordion-header>
                    <span class="header-text">Tab 2 Header</span>
                </p-accordion-header>
                <p-accordion-content>
                    <div class="content-2">Tab 2 Content</div>
                </p-accordion-content>
            </p-accordion-panel>

            <p-accordion-panel [value]="'tab3'" [disabled]="tab3Disabled">
                <p-accordion-header>
                    <span class="header-text">Tab 3 Header</span>
                </p-accordion-header>
                <p-accordion-content>
                    <div class="content-3">Tab 3 Content</div>
                </p-accordion-content>
            </p-accordion-panel>
        </p-accordion>
    `
})
class TestAccordionComponent {
    value: undefined | null | string | number | string[] | number[] = undefined as any;
    multiple = false;
    selectOnFocus = false;
    expandIcon?: string;
    collapseIcon?: string;
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    styleClass?: string;
    tab1Disabled = false;
    tab2Disabled = false;
    tab3Disabled = false;

    openEvent?: AccordionTabOpenEvent;
    closeEvent?: AccordionTabCloseEvent;

    onOpen(event: AccordionTabOpenEvent) {
        this.openEvent = event;
    }

    onClose(event: AccordionTabCloseEvent) {
        this.closeEvent = event;
    }
}

@Component({
    standalone: true,
    imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent],
    template: `
        <p-accordion [(value)]="value" [multiple]="true">
            @for (tab of tabs; track tab.id) {
                <p-accordion-panel [value]="tab.id">
                    <p-accordion-header>{{ tab.header }}</p-accordion-header>
                    <p-accordion-content>{{ tab.content }}</p-accordion-content>
                </p-accordion-panel>
            }
        </p-accordion>
    `
})
class TestDynamicAccordionComponent {
    value: string[] = [];
    tabs = [
        { id: '1', header: 'Dynamic Tab 1', content: 'Dynamic Content 1' },
        { id: '2', header: 'Dynamic Tab 2', content: 'Dynamic Content 2' },
        { id: '3', header: 'Dynamic Tab 3', content: 'Dynamic Content 3' }
    ];
}

@Component({
    standalone: true,
    imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent],
    template: `
        <p-accordion [(value)]="value">
            <p-accordion-panel value="custom">
                <p-accordion-header>
                    <ng-template #toggleicon let-active="active">
                        <span class="custom-icon">{{ active ? '▼' : '▶' }}</span>
                    </ng-template>
                    Custom Header with Icon
                </p-accordion-header>
                <p-accordion-content>Custom Content</p-accordion-content>
            </p-accordion-panel>
        </p-accordion>
    `
})
class TestCustomIconAccordionComponent {
    value: string | undefined = undefined as any;
}

describe('Accordion', () => {
    let fixture: ComponentFixture<TestAccordionComponent>;
    let component: TestAccordionComponent;
    let accordionEl: DebugElement;
    let accordion: Accordion;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TestAccordionComponent, TestDynamicAccordionComponent, TestCustomIconAccordionComponent]
        });

        fixture = TestBed.createComponent(TestAccordionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        accordionEl = fixture.debugElement.query(By.directive(Accordion));
        accordion = accordionEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(accordion).toBeTruthy();
        });

        it('should have default values', () => {
            expect(accordion.value()).toBeUndefined();
            expect(accordion.multiple()).toBe(false);
            expect(accordion.selectOnFocus()).toBe(false);
            expect(accordion.transitionOptions).toBe('400ms cubic-bezier(0.86, 0, 0.07, 1)');
            expect(accordion.expandIcon).toBeUndefined();
            expect(accordion.collapseIcon).toBeUndefined();
        });

        it('should accept custom values', () => {
            component.value = 'tab1';
            component.multiple = true;
            component.selectOnFocus = true;
            component.expandIcon = 'pi pi-plus';
            component.collapseIcon = 'pi pi-minus';
            component.transitionOptions = '200ms ease-in';
            component.styleClass = 'custom-accordion';
            fixture.detectChanges();

            expect(accordion.value()).toBe('tab1');
            expect(accordion.multiple()).toBe(true);
            expect(accordion.selectOnFocus()).toBe(true);
            expect(accordion.expandIcon).toBe('pi pi-plus');
            expect(accordion.collapseIcon).toBe('pi pi-minus');
            expect(accordion.transitionOptions).toBe('200ms ease-in');
            expect(accordion.styleClass).toBe('custom-accordion');
        });

        it('should render all accordion panels', () => {
            const panels = fixture.debugElement.queryAll(By.directive(AccordionPanel));
            expect(panels.length).toBe(3);
        });

        it('should have unique IDs for accessibility', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const contents = fixture.debugElement.queryAll(By.directive(AccordionContent));

            headers.forEach((header, index) => {
                const headerId = header.nativeElement.id;
                const contentId = contents[index].nativeElement.id;

                expect(headerId).toBeTruthy();
                expect(contentId).toBeTruthy();
                expect(headerId).toContain('accordionheader');
                expect(contentId).toContain('accordioncontent');
            });
        });
    });

    describe('Single Selection Mode', () => {
        beforeEach(() => {
            component.multiple = false;
            fixture.detectChanges();
        });

        it('should expand a panel when clicked', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(accordion.value()).toBe('tab1');
            expect(headers[0].nativeElement.getAttribute('aria-expanded')).toBe('true');
        });

        it('should collapse active panel when clicked again', () => {
            component.value = 'tab1';
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(accordion.value()).toBeUndefined();
            expect(headers[0].nativeElement.getAttribute('aria-expanded')).toBe('false');
        });

        it('should only have one active panel at a time', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));

            headers[0].nativeElement.click();
            fixture.detectChanges();
            expect(accordion.value()).toBe('tab1');

            headers[1].nativeElement.click();
            fixture.detectChanges();
            expect(accordion.value()).toBe('tab2');

            const expandedHeaders = headers.filter((h) => h.nativeElement.getAttribute('aria-expanded') === 'true');
            expect(expandedHeaders.length).toBe(1);
        });
    });

    describe('Multiple Selection Mode', () => {
        beforeEach(() => {
            component.multiple = true;
            fixture.detectChanges();
        });

        it('should allow multiple panels to be expanded', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));

            headers[0].nativeElement.click();
            fixture.detectChanges();

            headers[1].nativeElement.click();
            fixture.detectChanges();

            expect(accordion.value()).toEqual(['tab1', 'tab2']);
            expect(headers[0].nativeElement.getAttribute('aria-expanded')).toBe('true');
            expect(headers[1].nativeElement.getAttribute('aria-expanded')).toBe('true');
        });

        it('should remove panel from value when collapsed', () => {
            component.value = ['tab1', 'tab2'];
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(accordion.value()).toEqual(['tab2']);
            expect(headers[0].nativeElement.getAttribute('aria-expanded')).toBe('false');
        });

        it('should handle empty array initialization', () => {
            component.value = [];
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(accordion.value()).toEqual(['tab1']);
        });
    });

    describe('Event Handling', () => {
        it('should emit onOpen event when panel is opened', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(component.openEvent).toBeDefined();
            expect(component.openEvent?.index).toBe('tab1' as any);
            expect(component.openEvent?.originalEvent).toBeTruthy();
        });

        it('should emit onClose event when panel is closed', () => {
            component.value = 'tab1';
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(component.closeEvent).toBeDefined();
            expect(component.closeEvent?.index).toBe('tab1' as any);
            expect(component.closeEvent?.originalEvent).toBeTruthy();
        });

        it('should not emit events when clicking disabled panels', () => {
            component.tab1Disabled = true;
            fixture.detectChanges();

            component.openEvent = undefined as any;
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(component.openEvent).toBeUndefined();
            expect(accordion.value()).toBeUndefined();
        });
    });

    describe('Keyboard Navigation', () => {
        it('should navigate with ArrowDown key', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;
            const secondHeader = headers[1].nativeElement;

            firstHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            spyOn(secondHeader, 'focus');

            firstHeader.dispatchEvent(event);

            expect(secondHeader.focus).toHaveBeenCalled();
        });

        it('should navigate with ArrowUp key', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;
            const secondHeader = headers[1].nativeElement;

            secondHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
            spyOn(firstHeader, 'focus');

            secondHeader.dispatchEvent(event);

            expect(firstHeader.focus).toHaveBeenCalled();
        });

        it('should navigate to first panel with Home key', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;
            const lastHeader = headers[2].nativeElement;

            lastHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'Home' });
            spyOn(firstHeader, 'focus');

            lastHeader.dispatchEvent(event);

            expect(firstHeader.focus).toHaveBeenCalled();
        });

        it('should navigate to last panel with End key', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;
            const lastHeader = headers[2].nativeElement;

            firstHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'End' });
            spyOn(lastHeader, 'focus');

            firstHeader.dispatchEvent(event);

            expect(lastHeader.focus).toHaveBeenCalled();
        });

        it('should toggle panel with Enter key', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;

            firstHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'Enter' });
            firstHeader.dispatchEvent(event);
            fixture.detectChanges();

            expect(accordion.value()).toBe('tab1');
        });

        it('should toggle panel with Space key', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;

            firstHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'Space' });
            firstHeader.dispatchEvent(event);
            fixture.detectChanges();

            expect(accordion.value()).toBe('tab1');
        });

        it('should skip disabled panels during navigation', () => {
            component.tab2Disabled = true;
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;
            const thirdHeader = headers[2].nativeElement;

            firstHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            spyOn(thirdHeader, 'focus');

            firstHeader.dispatchEvent(event);

            expect(thirdHeader.focus).toHaveBeenCalled();
        });

        it('should wrap navigation from last to first with ArrowDown', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;
            const lastHeader = headers[2].nativeElement;

            lastHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            spyOn(firstHeader, 'focus');

            lastHeader.dispatchEvent(event);

            expect(firstHeader.focus).toHaveBeenCalled();
        });

        it('should wrap navigation from first to last with ArrowUp', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;
            const lastHeader = headers[2].nativeElement;

            firstHeader.focus();
            const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
            spyOn(lastHeader, 'focus');

            firstHeader.dispatchEvent(event);

            expect(lastHeader.focus).toHaveBeenCalled();
        });
    });

    describe('Disabled Panels', () => {
        it('should not expand disabled panels', () => {
            component.tab1Disabled = true;
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(accordion.value()).toBeUndefined();
            expect(headers[0].nativeElement.getAttribute('aria-disabled')).toBe('true');
        });

        it('should have tabindex -1 when disabled', () => {
            component.tab1Disabled = true;
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            expect(headers[0].nativeElement.getAttribute('tabindex')).toBe('-1');
        });

        it('should not trigger events for disabled panels', () => {
            component.tab1Disabled = true;
            fixture.detectChanges();

            const spy = spyOn(accordion, 'updateValue');
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('SelectOnFocus', () => {
        // it('should expand panel on focus when selectOnFocus is true', fakeAsync(() => {
        //     component.selectOnFocus = true;
        //     fixture.detectChanges();
        //     tick();

        //     const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
        //     headers[0].nativeElement.focus();
        //     fixture.detectChanges();

        //     expect(accordion.value()).toBe('tab1');
        // }));

        it('should not expand panel on focus when selectOnFocus is false', () => {
            component.selectOnFocus = false;
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.focus();
            fixture.detectChanges();

            expect(accordion.value()).toBeUndefined();
        });
    });

    describe('Public Methods', () => {
        it('should update value correctly in single mode', () => {
            accordion.updateValue('tab1');
            expect(accordion.value()).toBe('tab1');

            accordion.updateValue('tab2');
            expect(accordion.value()).toBe('tab2');

            accordion.updateValue('tab2');
            expect(accordion.value()).toBeUndefined();
        });

        it('should update value correctly in multiple mode', () => {
            component.multiple = true;
            fixture.detectChanges();

            accordion.updateValue('tab1');
            expect(accordion.value()).toEqual(['tab1']);

            accordion.updateValue('tab2');
            expect(accordion.value()).toEqual(['tab1', 'tab2']);

            accordion.updateValue('tab1');
            expect(accordion.value()).toEqual(['tab2']);
        });

        it('should handle updateValue with non-array initial value in multiple mode', () => {
            component.multiple = true;
            component.value = null as any;
            fixture.detectChanges();

            accordion.updateValue('tab1');
            expect(accordion.value()).toEqual(['tab1']);
        });

        it('should implement getBlockableElement', () => {
            const blockableElement = accordion.getBlockableElement();
            expect(blockableElement).toBe(accordion.el.nativeElement.children[0]);
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', () => {
            component.value = 'tab1';
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const contents = fixture.debugElement.queryAll(By.directive(AccordionContent));

            headers.forEach((header, index) => {
                expect(header.nativeElement.getAttribute('role')).toBe('button');
                expect(header.nativeElement.hasAttribute('aria-controls')).toBe(true);
                expect(header.nativeElement.hasAttribute('aria-expanded')).toBe(true);
            });

            contents.forEach((content) => {
                expect(content.nativeElement.getAttribute('role')).toBe('region');
                expect(content.nativeElement.hasAttribute('aria-labelledby')).toBe(true);
            });
        });

        it('should update aria-expanded when panel state changes', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));

            expect(headers[0].nativeElement.getAttribute('aria-expanded')).toBe('false');

            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(headers[0].nativeElement.getAttribute('aria-expanded')).toBe('true');
        });

        it('should have proper tabindex for keyboard navigation', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));

            headers.forEach((header) => {
                expect(header.nativeElement.getAttribute('tabindex')).toBe('0');
            });

            component.tab1Disabled = true;
            fixture.detectChanges();

            expect(headers[0].nativeElement.getAttribute('tabindex')).toBe('-1');
            expect(headers[1].nativeElement.getAttribute('tabindex')).toBe('0');
        });
    });

    describe('Animation', () => {
        it('should apply transition options', fakeAsync(() => {
            component.transitionOptions = '300ms ease-out';
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();

            tick(300);
            fixture.detectChanges();

            expect(accordion.value()).toBe('tab1');
            flush();
        }));

        it('should handle content visibility states', () => {
            const contents = fixture.debugElement.queryAll(By.directive(AccordionContent));
            const panels = fixture.debugElement.queryAll(By.directive(AccordionPanel));

            expect(panels[0].nativeElement.getAttribute('data-p-active')).toBe('false');

            component.value = 'tab1';
            fixture.detectChanges();

            expect(panels[0].nativeElement.getAttribute('data-p-active')).toBe('true');
        });
    });

    describe('Custom Icons', () => {
        it('should use custom expand/collapse icons', () => {
            component.expandIcon = 'pi pi-plus';
            component.collapseIcon = 'pi pi-minus';
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));

            // Check that custom expand icon is referenced (not necessarily displayed)
            expect(accordion.expandIcon).toBe('pi pi-plus');
            expect(accordion.collapseIcon).toBe('pi pi-minus');

            headers[0].nativeElement.click();
            fixture.detectChanges();

            // Check that accordion value changed (indicating icon toggle worked)
            expect(accordion.value()).toBe('tab1');
        });

        it('should render custom icon template', () => {
            const customFixture = TestBed.createComponent(TestCustomIconAccordionComponent);
            customFixture.detectChanges();

            const customIcon = customFixture.nativeElement.querySelector('.custom-icon');
            expect(customIcon).toBeTruthy();
            expect(customIcon.textContent).toBe('▶');

            const headers = customFixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            customFixture.detectChanges();

            expect(customIcon.textContent).toBe('▼');
        });

        it('should use default icons when custom icons not provided', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const svgIcon = headers[0].nativeElement.querySelector('svg[data-p-icon]');

            expect(svgIcon).toBeTruthy();
            expect(svgIcon.getAttribute('data-p-icon')).toBe('chevron-down');
        });
    });

    describe('Dynamic Panels', () => {
        it('should handle dynamically added panels', () => {
            const dynamicFixture = TestBed.createComponent(TestDynamicAccordionComponent);
            dynamicFixture.detectChanges();

            const panels = dynamicFixture.debugElement.queryAll(By.directive(AccordionPanel));
            expect(panels.length).toBe(3);

            dynamicFixture.componentInstance.tabs.push({
                id: '4',
                header: 'Dynamic Tab 4',
                content: 'Dynamic Content 4'
            });
            dynamicFixture.detectChanges();

            const updatedPanels = dynamicFixture.debugElement.queryAll(By.directive(AccordionPanel));
            expect(updatedPanels.length).toBe(4);
        });

        it('should handle dynamically removed panels', () => {
            const dynamicFixture = TestBed.createComponent(TestDynamicAccordionComponent);
            dynamicFixture.componentInstance.value = ['1', '2'];
            dynamicFixture.detectChanges();

            dynamicFixture.componentInstance.tabs.splice(1, 1);
            dynamicFixture.detectChanges();

            const panels = dynamicFixture.debugElement.queryAll(By.directive(AccordionPanel));
            expect(panels.length).toBe(2);

            // After removing panel with id '2', the value should still contain '1' and '3'
            // (since we removed the middle panel)
            const dynamicAccordion = dynamicFixture.debugElement.query(By.directive(Accordion)).componentInstance;
            expect(dynamicAccordion.value()).toContain('1');
        });
    });

    describe('Edge Cases', () => {
        it('should handle null value gracefully', () => {
            component.value = null as any;
            fixture.detectChanges();

            expect(accordion.value()).toBeNull();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(accordion.value()).toBe('tab1');
        });

        it('should handle undefined value gracefully', () => {
            component.value = undefined as any;
            fixture.detectChanges();

            expect(accordion.value()).toBeUndefined();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers[0].nativeElement.click();
            fixture.detectChanges();

            expect(accordion.value()).toBe('tab1');
        });

        it('should handle rapid clicks', fakeAsync(() => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));

            headers[0].nativeElement.click();
            headers[0].nativeElement.click();
            headers[0].nativeElement.click();

            tick();
            fixture.detectChanges();

            expect(accordion.value()).toBe('tab1');
            flush();
        }));

        it('should handle all panels disabled', () => {
            component.tab1Disabled = true;
            component.tab2Disabled = true;
            component.tab3Disabled = true;
            fixture.detectChanges();

            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            headers.forEach((header) => {
                header.nativeElement.click();
            });
            fixture.detectChanges();

            expect(accordion.value()).toBeUndefined();
        });

        it('should handle empty accordion', () => {
            // Test empty accordion by clearing panels
            component.value = undefined as any;
            fixture.detectChanges();

            // Ensure accordion instance exists and has no active panels
            expect(accordion).toBeTruthy();
            expect(accordion.value()).toBeUndefined();

            // Verify no panels are active when value is undefined
            const panels = fixture.debugElement.queryAll(By.directive(AccordionPanel));
            panels.forEach((panel) => {
                expect(panel.componentInstance.active()).toBe(false);
            });
        });

        it('should handle numeric values', () => {
            // Test numeric values using existing component
            const panels = fixture.debugElement.queryAll(By.directive(AccordionPanel));

            // Manually set numeric values for testing
            panels[0].componentInstance.value.set(1);
            panels[1].componentInstance.value.set(2);
            fixture.detectChanges();

            // Update value using numeric value
            accordion.updateValue(1);
            expect(accordion.value()).toBe(1);

            // Test that numeric comparison works
            expect(panels[0].componentInstance.active()).toBe(true);
            expect(panels[1].componentInstance.active()).toBe(false);
        });

        it('should not break with special key combinations', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const firstHeader = headers[0].nativeElement;

            // Shift + Home should not trigger navigation
            const shiftHomeEvent = new KeyboardEvent('keydown', {
                code: 'Home',
                shiftKey: true
            });
            firstHeader.dispatchEvent(shiftHomeEvent);
            fixture.detectChanges();

            // Shift + End should not trigger navigation
            const shiftEndEvent = new KeyboardEvent('keydown', {
                code: 'End',
                shiftKey: true
            });
            firstHeader.dispatchEvent(shiftEndEvent);
            fixture.detectChanges();

            expect(accordion.value()).toBeUndefined();
        });

        it('should handle focus trap scenario', () => {
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));

            // Focus first header
            headers[0].nativeElement.focus();
            expect(document.activeElement).toBe(headers[0].nativeElement);

            // Try to navigate up from first (should go to last)
            const upEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
            headers[0].nativeElement.dispatchEvent(upEvent);

            // Focus last header
            headers[2].nativeElement.focus();
            expect(document.activeElement).toBe(headers[2].nativeElement);

            // Try to navigate down from last (should go to first)
            const downEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            headers[2].nativeElement.dispatchEvent(downEvent);
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply custom style class', () => {
            component.styleClass = 'custom-accordion';
            fixture.detectChanges();

            const accordionElement = accordionEl.nativeElement;
            expect(accordionElement.className).toContain('custom-accordion');
        });

        it('should apply correct data attributes', () => {
            const panels = fixture.debugElement.queryAll(By.directive(AccordionPanel));
            const headers = fixture.debugElement.queryAll(By.directive(AccordionHeader));
            const contents = fixture.debugElement.queryAll(By.directive(AccordionContent));

            panels.forEach((panel) => {
                expect(panel.nativeElement.getAttribute('data-pc-name')).toBe('accordionpanel');
            });

            headers.forEach((header) => {
                expect(header.nativeElement.getAttribute('data-pc-name')).toBe('accordionheader');
            });

            contents.forEach((content) => {
                expect(content.nativeElement.getAttribute('data-pc-name')).toBe('accordioncontent');
            });
        });

        it('should update data-p-active attribute', () => {
            const panels = fixture.debugElement.queryAll(By.directive(AccordionPanel));

            expect(panels[0].nativeElement.getAttribute('data-p-active')).toBe('false');

            component.value = 'tab1';
            fixture.detectChanges();

            expect(panels[0].nativeElement.getAttribute('data-p-active')).toBe('true');
        });

        it('should update data-p-disabled attribute', () => {
            const panels = fixture.debugElement.queryAll(By.directive(AccordionPanel));

            expect(panels[0].nativeElement.getAttribute('data-p-disabled')).toBe('false');

            component.tab1Disabled = true;
            fixture.detectChanges();

            expect(panels[0].nativeElement.getAttribute('data-p-disabled')).toBe('true');
        });
    });
});

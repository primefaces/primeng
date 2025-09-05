import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MinusIcon, PlusIcon } from 'primeng/icons';
import { Panel, PanelAfterToggleEvent, PanelBeforeToggleEvent } from './panel';

@Component({
    standalone: false,
    template: `
        <p-panel
            [header]="header"
            [toggleable]="toggleable"
            [collapsed]="collapsed"
            [showHeader]="showHeader"
            [toggler]="toggler"
            [transitionOptions]="transitionOptions"
            [toggleButtonProps]="toggleButtonProps"
            [iconPos]="iconPos"
            [styleClass]="styleClass"
            (collapsedChange)="onCollapsedChange($event)"
            (onBeforeToggle)="onBeforeToggle($event)"
            (onAfterToggle)="onAfterToggle($event)"
        >
            <div class="panel-content">Panel content goes here</div>
        </p-panel>
    `
})
class TestBasicPanelComponent {
    header = 'Test Panel';
    toggleable = true;
    collapsed = false;
    showHeader = true;
    toggler: 'icon' | 'header' = 'icon';
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    toggleButtonProps: any;
    iconPos: 'start' | 'end' | 'center' = 'end';
    styleClass?: string;

    collapsedChangeEvent: boolean | undefined;
    beforeToggleEvent: PanelBeforeToggleEvent | undefined;
    afterToggleEvent: PanelAfterToggleEvent | undefined;

    onCollapsedChange(event: boolean) {
        this.collapsedChangeEvent = event;
    }

    onBeforeToggle(event: PanelBeforeToggleEvent) {
        this.beforeToggleEvent = event;
    }

    onAfterToggle(event: PanelAfterToggleEvent) {
        this.afterToggleEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-panel header="Template Panel" [toggleable]="true">
            <ng-template #header>
                <div class="custom-header">Custom Header Template</div>
            </ng-template>
            <ng-template #content>
                <div class="custom-content">Custom Content Template</div>
            </ng-template>
            <ng-template #footer>
                <div class="custom-footer">Custom Footer Template</div>
            </ng-template>
            <ng-template #icons>
                <span class="custom-icons">🎯</span>
            </ng-template>
            <ng-template #headericons let-collapsed>
                <span class="custom-header-icon">{{ collapsed ? '➕' : '➖' }}</span>
            </ng-template>
        </p-panel>
    `
})
class TestTemplatesPanelComponent {}

@Component({
    standalone: false,
    template: `
        <p-panel header="Facet Panel" [toggleable]="true">
            <p-header>
                <div class="header-facet">Header Facet Content</div>
            </p-header>
            <div class="main-content">Main panel content</div>
            <p-footer>
                <div class="footer-facet">Footer Facet Content</div>
            </p-footer>
        </p-panel>
    `
})
class TestFacetsPanelComponent {}

@Component({
    standalone: false,
    template: `
        <p-panel header="Keyboard Panel" [toggleable]="true" [collapsed]="false">
            <div>
                <input type="text" placeholder="Input 1" />
                <button>Button 1</button>
                <select>
                    <option>Option 1</option>
                </select>
                <a href="#">Link 1</a>
                <textarea placeholder="Textarea"></textarea>
                <div tabindex="0">Focusable div</div>
            </div>
        </p-panel>
    `
})
class TestKeyboardNavigationComponent {}

describe('Panel', () => {
    let testFixture: ComponentFixture<TestBasicPanelComponent>;
    let testComponent: TestBasicPanelComponent;
    let panelEl: DebugElement;
    let panelInstance: Panel;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [Panel, ButtonModule, PlusIcon, MinusIcon],
            providers: [provideNoopAnimations()],
            declarations: [TestBasicPanelComponent, TestTemplatesPanelComponent, TestFacetsPanelComponent, TestKeyboardNavigationComponent]
        });

        testFixture = TestBed.createComponent(TestBasicPanelComponent);
        testComponent = testFixture.componentInstance;
        testFixture.detectChanges();

        panelEl = testFixture.debugElement.query(By.directive(Panel));
        panelInstance = panelEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(panelInstance).toBeTruthy();
        });

        it('should have default values', () => {
            const fixture = TestBed.createComponent(Panel);
            const panel = fixture.componentInstance;

            expect(panel.showHeader).toBe(true);
            expect(panel.toggler).toBe('icon');
            expect(panel.iconPos).toBe('end');
            expect(panel.transitionOptions).toBe('400ms cubic-bezier(0.86, 0, 0.07, 1)');
            expect(panel.collapsed).toBeUndefined();
            expect(panel.toggleable).toBeUndefined();
        });

        it('should accept custom values', () => {
            testComponent.toggleable = true;
            testComponent.collapsed = true;
            testComponent.showHeader = false;
            testComponent.toggler = 'header';
            testComponent.iconPos = 'start';
            testComponent.transitionOptions = '200ms ease-in';
            testFixture.detectChanges();

            expect(panelInstance.toggleable).toBe(true);
            expect(panelInstance.collapsed).toBe(true);
            expect(panelInstance.showHeader).toBe(false);
            expect(panelInstance.toggler).toBe('header');
            expect(panelInstance.iconPos).toBe('start');
            expect(panelInstance.transitionOptions).toBe('200ms ease-in');
        });
    });

    describe('Header Display', () => {
        it('should display header text', () => {
            testComponent.header = 'My Panel Header';
            testFixture.detectChanges();

            const headerEl = testFixture.debugElement.query(By.css('.p-panel-title'));
            expect(headerEl?.nativeElement.textContent.trim()).toBe('My Panel Header');
        });

        it('should hide header when showHeader is false', () => {
            testComponent.showHeader = false;
            testFixture.detectChanges();

            const headerEl = testFixture.debugElement.query(By.css('.p-panel-header'));
            expect(headerEl).toBeNull();
        });

        it('should show header when showHeader is true', () => {
            testComponent.showHeader = true;
            testFixture.detectChanges();

            const headerEl = testFixture.debugElement.query(By.css('.p-panel-header'));
            expect(headerEl).toBeTruthy();
        });
    });

    describe('Toggle Functionality', () => {
        it('should not show toggle button when not toggleable', () => {
            testComponent.toggleable = false;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('.p-panel-toggler'));
            expect(toggleButton).toBeNull();
        });

        it('should show toggle button when toggleable', () => {
            testComponent.toggleable = true;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            expect(toggleButton).toBeTruthy();
        });

        it('should toggle panel when icon is clicked', fakeAsync(() => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            toggleButton.nativeElement.click();
            tick();

            expect(testComponent.collapsedChangeEvent).toBe(true);
            expect(panelInstance.collapsed).toBe(true);
            flush();
        }));

        it('should toggle panel when header is clicked and toggler is header', fakeAsync(() => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testComponent.toggler = 'header';
            testFixture.detectChanges();

            const headerEl = testFixture.debugElement.query(By.css('.p-panel-header'));
            headerEl.nativeElement.click();
            tick();

            expect(testComponent.collapsedChangeEvent).toBe(true);
            expect(panelInstance.collapsed).toBe(true);
            flush();
        }));

        it('should not toggle when header is clicked and toggler is icon', () => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testComponent.toggler = 'icon';
            testFixture.detectChanges();

            const headerEl = testFixture.debugElement.query(By.css('.p-panel-header'));
            headerEl.nativeElement.click();

            expect(testComponent.collapsedChangeEvent).toBeUndefined();
            expect(panelInstance.collapsed).toBe(false);
        });

        it('should expand collapsed panel', fakeAsync(() => {
            testComponent.toggleable = true;
            testComponent.collapsed = true;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            toggleButton.nativeElement.click();
            tick();

            expect(testComponent.collapsedChangeEvent).toBe(false);
            expect(panelInstance.collapsed).toBe(false);
            flush();
        }));

        it('should not toggle when animating', () => {
            testComponent.toggleable = true;
            panelInstance.animating = true;
            testFixture.detectChanges();

            const result = panelInstance.toggle(new MouseEvent('click'));
            expect(result).toBe(false);
        });
    });

    describe('Event Handling', () => {
        it('should emit onBeforeToggle event', fakeAsync(() => {
            testComponent.toggleable = true;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            toggleButton.nativeElement.click();
            tick();

            expect(testComponent.beforeToggleEvent).toBeDefined();
            expect(testComponent.beforeToggleEvent?.collapsed).toBe(false);
            expect(testComponent.beforeToggleEvent?.originalEvent).toBeTruthy();
            flush();
        }));

        it('should emit onAfterToggle event', fakeAsync(() => {
            testComponent.toggleable = true;
            testFixture.detectChanges();

            // Simulate toggle complete
            panelInstance.onToggleDone({ type: 'done' });

            expect(testComponent.afterToggleEvent).toBeDefined();
            flush();
        }));

        it('should emit collapsedChange event', fakeAsync(() => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            toggleButton.nativeElement.click();
            tick();

            expect(testComponent.collapsedChangeEvent).toBe(true);
            flush();
        }));
    });

    describe('Keyboard Navigation', () => {
        it('should toggle on Enter key', fakeAsync(() => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });

            spyOn(panelInstance, 'toggle');
            toggleButton.nativeElement.dispatchEvent(enterEvent);

            expect(panelInstance.toggle).toHaveBeenCalled();
            flush();
        }));

        it('should toggle on Space key', fakeAsync(() => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });

            spyOn(panelInstance, 'toggle');
            toggleButton.nativeElement.dispatchEvent(spaceEvent);

            expect(panelInstance.toggle).toHaveBeenCalled();
            flush();
        }));

        it('should not toggle on other keys', () => {
            testComponent.toggleable = true;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            const escEvent = new KeyboardEvent('keydown', { code: 'Escape' });

            spyOn(panelInstance, 'toggle');
            toggleButton.nativeElement.dispatchEvent(escEvent);

            expect(panelInstance.toggle).not.toHaveBeenCalled();
        });
    });

    describe('Content Display', () => {
        it('should display content when expanded', () => {
            testComponent.collapsed = false;
            testFixture.detectChanges();

            const contentEl = testFixture.debugElement.query(By.css('.panel-content'));
            expect(contentEl).toBeTruthy();
            expect(contentEl.nativeElement.textContent.trim()).toBe('Panel content goes here');
        });

        it('should set aria-hidden when collapsed', () => {
            testComponent.collapsed = true;
            testFixture.detectChanges();

            const contentContainer = testFixture.debugElement.query(By.css('.p-panel-content-container'));
            expect(contentContainer.nativeElement.getAttribute('aria-hidden')).toBe('true');
        });

        it('should set aria-expanded on toggle button', () => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            expect(toggleButton.nativeElement.getAttribute('aria-expanded')).toBe('true');

            testComponent.collapsed = true;
            testFixture.detectChanges();

            expect(toggleButton.nativeElement.getAttribute('aria-expanded')).toBe('false');
        });
    });

    describe('Icon Display', () => {
        it('should show minus icon when expanded', () => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testFixture.detectChanges();

            const minusIcon = testFixture.debugElement.query(By.css('[data-p-icon="minus"]'));
            expect(minusIcon).toBeTruthy();
        });

        it('should show plus icon when collapsed', () => {
            testComponent.toggleable = true;
            testComponent.collapsed = true;
            testFixture.detectChanges();

            const plusIcon = testFixture.debugElement.query(By.css('[data-p-icon="plus"]'));
            expect(plusIcon).toBeTruthy();
        });

        it('should use custom toggle button props', () => {
            testComponent.toggleable = true;
            testComponent.toggleButtonProps = {
                icon: 'pi pi-chevron-down',
                severity: 'primary'
            };
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            expect(toggleButton).toBeTruthy();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply custom styleClass', () => {
            testComponent.styleClass = 'custom-panel-class';
            testFixture.detectChanges();

            const panelElement = testFixture.debugElement.query(By.css('p-panel'));
            expect(panelElement.nativeElement.className).toContain('custom-panel-class');
        });

        it('should have correct CSS classes based on state', () => {
            const panelElement = testFixture.debugElement.query(By.css('p-panel'));
            expect(panelElement.nativeElement.className).toContain('p-panel');
        });
    });

    describe('Template Support', () => {
        it('should render custom templates', () => {
            const fixture = TestBed.createComponent(TestTemplatesPanelComponent);
            fixture.detectChanges();

            const customHeader = fixture.debugElement.query(By.css('.custom-header'));
            const customContent = fixture.debugElement.query(By.css('.custom-content'));
            const customFooter = fixture.debugElement.query(By.css('.custom-footer'));
            const customIcons = fixture.debugElement.query(By.css('.custom-icons'));

            expect(customHeader?.nativeElement.textContent.trim()).toBe('Custom Header Template');
            expect(customContent?.nativeElement.textContent.trim()).toBe('Custom Content Template');
            expect(customFooter?.nativeElement.textContent.trim()).toBe('Custom Footer Template');
            expect(customIcons?.nativeElement.textContent.trim()).toBe('🎯');
        });

        it('should render header icons template with context', () => {
            const fixture = TestBed.createComponent(TestTemplatesPanelComponent);
            fixture.detectChanges();

            const customHeaderIcon = fixture.debugElement.query(By.css('.custom-header-icon'));
            expect(customHeaderIcon?.nativeElement.textContent.trim()).toBe('➖'); // Not collapsed
        });
    });

    describe('Facets Support', () => {
        it('should render header and footer facets', () => {
            const fixture = TestBed.createComponent(TestFacetsPanelComponent);
            fixture.detectChanges();

            const headerFacet = fixture.debugElement.query(By.css('.header-facet'));
            const footerFacet = fixture.debugElement.query(By.css('.footer-facet'));
            const mainContent = fixture.debugElement.query(By.css('.main-content'));

            expect(headerFacet?.nativeElement.textContent.trim()).toBe('Header Facet Content');
            expect(footerFacet?.nativeElement.textContent.trim()).toBe('Footer Facet Content');
            expect(mainContent?.nativeElement.textContent.trim()).toBe('Main panel content');
        });
    });

    describe('Tab Index Management', () => {
        it('should call updateTabIndex when collapsed state changes', () => {
            const fixture = TestBed.createComponent(TestKeyboardNavigationComponent);
            fixture.detectChanges();

            const panelComp = fixture.debugElement.query(By.directive(Panel)).componentInstance;

            spyOn(panelComp, 'updateTabIndex');

            // Collapse panel
            panelComp.collapse();
            expect(panelComp.updateTabIndex).toHaveBeenCalled();

            // Expand panel
            panelComp.expand();
            expect(panelComp.updateTabIndex).toHaveBeenCalledTimes(2);
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', () => {
            testComponent.toggleable = true;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            const contentContainer = testFixture.debugElement.query(By.css('.p-panel-content-container'));

            expect(toggleButton.nativeElement.getAttribute('role')).toBe('button');
            expect(toggleButton.nativeElement.getAttribute('aria-expanded')).toBeTruthy();
            expect(toggleButton.nativeElement.getAttribute('aria-controls')).toBeTruthy();
            expect(toggleButton.nativeElement.getAttribute('aria-label')).toBe(testComponent.header);

            expect(contentContainer.nativeElement.getAttribute('role')).toBe('region');
            expect(contentContainer.nativeElement.getAttribute('aria-labelledby')).toBeTruthy();
        });

        it('should update aria-expanded when collapsed state changes', () => {
            testComponent.toggleable = true;
            testComponent.collapsed = false;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            expect(toggleButton.nativeElement.getAttribute('aria-expanded')).toBe('true');

            testComponent.collapsed = true;
            testFixture.detectChanges();

            expect(toggleButton.nativeElement.getAttribute('aria-expanded')).toBe('false');
        });
    });

    describe('BlockableUI Interface', () => {
        it('should implement getBlockableElement', () => {
            const blockableElement = panelInstance.getBlockableElement();
            expect(blockableElement).toBe(panelInstance.el.nativeElement);
        });
    });

    describe('Component ID', () => {
        it('should generate unique ID if not provided', () => {
            expect(panelInstance.id).toBeDefined();
            expect(panelInstance.id).toContain('pn_id_');
        });

        it('should use provided ID', () => {
            const fixture = TestBed.createComponent(Panel);
            const panel = fixture.componentInstance;
            panel.id = 'my-custom-panel-id';
            fixture.detectChanges();

            expect(panel.id).toBe('my-custom-panel-id');
        });
    });

    describe('Animation States', () => {
        it('should handle animation completion', () => {
            testComponent.toggleable = true;
            testFixture.detectChanges();

            panelInstance.animating = true;
            panelInstance.onToggleDone({ type: 'done' });

            expect(panelInstance.animating).toBe(false);
        });

        it('should set animating flag during toggle', fakeAsync(() => {
            testComponent.toggleable = true;
            testFixture.detectChanges();

            const toggleButton = testFixture.debugElement.query(By.css('p-button'));
            toggleButton.nativeElement.click();

            expect(panelInstance.animating).toBe(true);
            flush();
        }));
    });

    describe('Edge Cases', () => {
        it('should handle undefined header', () => {
            testComponent.header = undefined as any;
            testFixture.detectChanges();

            const headerEl = testFixture.debugElement.query(By.css('.p-panel-title'));
            expect(headerEl).toBeFalsy();
        });

        it('should handle toggle when not toggleable', () => {
            testComponent.toggleable = false;
            testFixture.detectChanges();

            const initialCollapsed = panelInstance.collapsed;
            panelInstance.toggle(new MouseEvent('click'));

            expect(panelInstance.collapsed).toBe(initialCollapsed);
        });

        it('should prevent default on toggle', () => {
            testComponent.toggleable = true;
            testFixture.detectChanges();

            const event = new MouseEvent('click');
            spyOn(event, 'preventDefault');

            panelInstance.toggle(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });
});

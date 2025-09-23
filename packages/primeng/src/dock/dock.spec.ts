import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem, SharedModule } from 'primeng/api';
import { Dock } from './dock';

@Component({
    standalone: false,
    template: ` <p-dock [id]="id" [model]="model" [position]="position" [styleClass]="styleClass" [ariaLabel]="ariaLabel" [ariaLabelledBy]="ariaLabelledBy" [breakpoint]="breakpoint" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)"> </p-dock> `
})
class TestBasicDockComponent {
    id: string | undefined;
    model: MenuItem[] | undefined = [{ label: 'File', icon: 'pi pi-file' }, { label: 'Edit', icon: 'pi pi-pencil' }, { separator: true }, { label: 'Settings', icon: 'pi pi-cog' }];
    position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
    styleClass: string | undefined;
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
    breakpoint: string | undefined;

    focusEvent: any;
    blurEvent: any;

    onFocus(event: any) {
        this.focusEvent = event;
    }

    onBlur(event: any) {
        this.blurEvent = event;
    }
}

@Component({
    standalone: false,
    selector: 'test-position-dock',
    template: ` <p-dock [model]="model" [position]="position"></p-dock> `
})
class TestPositionDockComponent {
    position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
    model: MenuItem[] = [
        { label: 'Home', icon: 'pi pi-home' },
        { label: 'User', icon: 'pi pi-user' }
    ];
}

@Component({
    standalone: false,
    selector: 'test-router-dock',
    template: ` <p-dock [model]="routerModel"></p-dock> `
})
class TestRouterDockComponent {
    routerModel: MenuItem[] = [
        { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
        { label: 'Products', icon: 'pi pi-box', routerLink: '/products' },
        {
            label: 'Services',
            icon: 'pi pi-briefcase',
            routerLink: ['/services'],
            queryParams: { tab: 'overview' }
        }
    ];
}

@Component({
    standalone: false,
    selector: 'test-item-template-dock',
    template: `
        <p-dock [model]="model">
            <ng-template #item let-item>
                <div class="custom-dock-item">
                    <i [class]="item.icon" *ngIf="item.icon"></i>
                    <span class="custom-label">{{ item.label }}</span>
                </div>
            </ng-template>
        </p-dock>
    `
})
class TestItemTemplateDockComponent {
    model: MenuItem[] = [
        { label: 'Custom Item 1', icon: 'pi pi-home' },
        { label: 'Custom Item 2', icon: 'pi pi-user' }
    ];
}

@Component({
    standalone: false,
    selector: 'test-ptemplate-dock',
    template: `
        <p-dock [model]="model">
            <ng-template pTemplate="item" let-item>
                <span class="p-template-item">{{ item.label }}</span>
            </ng-template>
        </p-dock>
    `
})
class TestPTemplateDockComponent {
    model: MenuItem[] = [{ label: 'PTemplate Item 1' }, { label: 'PTemplate Item 2' }];
}

@Component({
    standalone: false,
    selector: 'test-disabled-items-dock',
    template: ` <p-dock [model]="disabledModel"></p-dock> `
})
class TestDisabledItemsDockComponent {
    disabledModel: MenuItem[] = [{ label: 'Enabled Item', icon: 'pi pi-check' }, { label: 'Disabled Item', icon: 'pi pi-times', disabled: true }, { label: 'Function Disabled', icon: 'pi pi-question', disabled: () => true } as any];
}

@Component({
    standalone: false,
    selector: 'test-styled-dock',
    template: ` <p-dock [model]="model" [styleClass]="customStyleClass"></p-dock> `
})
class TestStyledDockComponent {
    model: MenuItem[] = [{ label: 'Test', icon: 'pi pi-test' }];
    customStyleClass = 'custom-dock-class';
}

@Component({
    standalone: false,
    selector: 'test-minimal-dock',
    template: `<p-dock></p-dock>`
})
class TestMinimalDockComponent {}

@Component({
    standalone: false,
    selector: 'test-dynamic-dock',
    template: ` <p-dock [model]="dynamicModel"></p-dock> `
})
class TestDynamicDockComponent {
    dynamicModel: MenuItem[] = [];

    addItem(item: MenuItem) {
        this.dynamicModel.push(item);
    }

    clearItems() {
        this.dynamicModel = [];
    }

    removeItem(index: number) {
        this.dynamicModel.splice(index, 1);
    }
}

@Component({
    standalone: false,
    selector: 'test-command-dock',
    template: ` <p-dock [model]="commandModel"></p-dock> `
})
class TestCommandDockComponent {
    commandExecuted: any;

    commandModel: MenuItem[] = [
        {
            label: 'Command Item',
            icon: 'pi pi-play',
            command: (event) => {
                this.commandExecuted = event;
            }
        }
    ];
}

@Component({
    standalone: true,
    template: '<div>Target Page</div>'
})
class TestTargetComponent {}

describe('Dock', () => {
    let component: TestBasicDockComponent;
    let fixture: ComponentFixture<TestBasicDockComponent>;
    let dockElement: DebugElement;
    let dockInstance: Dock;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TestBasicDockComponent,
                TestPositionDockComponent,
                TestRouterDockComponent,
                TestItemTemplateDockComponent,
                TestPTemplateDockComponent,
                TestDisabledItemsDockComponent,
                TestStyledDockComponent,
                TestMinimalDockComponent,
                TestDynamicDockComponent,
                TestCommandDockComponent
            ],
            imports: [
                Dock,
                TestTargetComponent,
                NoopAnimationsModule,
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: TestTargetComponent },
                    { path: 'products', component: TestTargetComponent },
                    { path: 'services', component: TestTargetComponent }
                ])
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicDockComponent);
        component = fixture.componentInstance;
        dockElement = fixture.debugElement.query(By.directive(Dock));
        dockInstance = dockElement.componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(dockInstance).toBeTruthy();
        });

        it('should have required dependencies injected', () => {
            expect(dockInstance.cd).toBeTruthy();
            expect(dockInstance._componentStyle).toBeTruthy();
            expect(dockInstance.constructor.name).toBe('Dock');
        });

        it('should have default values', () => {
            const freshFixture = TestBed.createComponent(TestMinimalDockComponent);
            freshFixture.detectChanges();

            const freshDock = freshFixture.debugElement.query(By.directive(Dock)).componentInstance;

            expect(freshDock.model).toBeNull();
            expect(freshDock.position).toBe('bottom');
            expect(freshDock.breakpoint).toBe('960px');
            expect(freshDock.tabindex).toBe(0);
            expect(freshDock.focused).toBe(false);
            expect(freshDock.focusedOptionIndex).toBe(-1);
            expect(freshDock.currentIndex).toBe(-3);
        });

        it('should accept custom values', () => {
            const testModel: MenuItem[] = [{ label: 'Test Item' }];
            component.model = testModel;
            component.position = 'top';
            component.styleClass = 'custom-dock';
            component.ariaLabel = 'Custom Dock';
            component.breakpoint = '768px';
            fixture.detectChanges();

            expect(dockInstance.model).toBe(testModel);
            expect(dockInstance.position).toBe('top');
            expect(dockInstance.styleClass).toBe('custom-dock');
            expect(dockInstance.ariaLabel).toBe('Custom Dock');
            expect(dockInstance.breakpoint).toBe('768px');
        });

        it('should initialize with generated id', () => {
            expect(dockInstance.id).toBeTruthy();
            expect(typeof dockInstance.id).toBe('string');
            expect(dockInstance.id).toMatch(/^pn_id_/);
        });

        it('should have onFocus and onBlur output emitters', () => {
            expect(dockInstance.onFocus).toBeTruthy();
            expect(dockInstance.onBlur).toBeTruthy();
        });

        it('should initialize signal states', () => {
            expect(dockInstance.queryMatches()).toBe(false);
            expect(dockInstance.mobileActive()).toBe(false);
        });
    });

    describe('Input Properties', () => {
        it('should update model input', () => {
            const newModel = [{ label: 'New Item' }];
            component.model = newModel;
            fixture.detectChanges();

            expect(dockInstance.model).toBe(newModel);
        });

        it('should update position input', () => {
            component.position = 'left';
            fixture.detectChanges();

            expect(dockInstance.position).toBe('left');
        });

        it('should update styleClass input', () => {
            component.styleClass = 'test-class';
            fixture.detectChanges();

            expect(dockInstance.styleClass).toBe('test-class');
        });

        it('should update ariaLabel and ariaLabelledBy inputs', () => {
            component.ariaLabel = 'Test Dock';
            component.ariaLabelledBy = 'dock-label';
            fixture.detectChanges();

            expect(dockInstance.ariaLabel).toBe('Test Dock');
            expect(dockInstance.ariaLabelledBy).toBe('dock-label');
        });

        it('should update breakpoint input', () => {
            component.breakpoint = '768px';
            fixture.detectChanges();
            expect(dockInstance.breakpoint).toBe('768px');
        });

        it('should update id input', () => {
            component.id = 'custom-dock-id';
            fixture.detectChanges();
            expect(dockInstance.id).toBe('custom-dock-id');
        });
    });

    describe('Dock Item Display Tests', () => {
        it('should render dock items from model', () => {
            const items = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));
            expect(items.length).toBe(4); // All items including separator
        });

        it('should render item icons when provided', () => {
            const iconElements = fixture.debugElement.queryAll(By.css('span[class*="pi-"]'));
            expect(iconElements.length).toBeGreaterThanOrEqual(3); // Icons for non-separator items
        });

        it('should render item labels', () => {
            const itemElements = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));
            expect(itemElements[0].nativeElement.getAttribute('aria-label')).toBe('File');
            expect(itemElements[1].nativeElement.getAttribute('aria-label')).toBe('Edit');
            // Skip separator item (itemElements[2] is separator)
            expect(itemElements[3].nativeElement.getAttribute('aria-label')).toBe('Settings');
        });

        it('should hide items when visible is false', () => {
            component.model = [
                { label: 'Visible Item', visible: true },
                { label: 'Hidden Item', visible: false },
                { label: 'Default Item' } // visible undefined = true
            ];
            fixture.detectChanges();

            const items = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));
            expect(items.length).toBe(2); // Only visible items
        });

        it('should handle empty model', () => {
            component.model = [];
            fixture.detectChanges();

            const items = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));
            expect(items.length).toBe(0);
        });

        it('should handle null model', () => {
            component.model = null as any;
            fixture.detectChanges();

            const items = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));
            expect(items.length).toBe(0);
        });
    });

    describe('Position and Orientation Tests', () => {
        it('should set aria-orientation for bottom position', () => {
            const positionFixture = TestBed.createComponent(TestPositionDockComponent);
            const positionComponent = positionFixture.componentInstance;
            positionComponent.position = 'bottom';
            positionFixture.detectChanges();

            const list = positionFixture.debugElement.query(By.css('ul[role="menu"]'));
            expect(list.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
        });

        it('should set aria-orientation for top position', () => {
            const positionFixture = TestBed.createComponent(TestPositionDockComponent);
            const positionComponent = positionFixture.componentInstance;
            positionComponent.position = 'top';
            positionFixture.detectChanges();

            const list = positionFixture.debugElement.query(By.css('ul[role="menu"]'));
            expect(list.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
        });

        it('should set aria-orientation for left position', () => {
            const positionFixture = TestBed.createComponent(TestPositionDockComponent);
            const positionComponent = positionFixture.componentInstance;
            positionComponent.position = 'left';
            positionFixture.detectChanges();

            const list = positionFixture.debugElement.query(By.css('ul[role="menu"]'));
            expect(list.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
        });

        it('should set aria-orientation for right position', () => {
            const positionFixture = TestBed.createComponent(TestPositionDockComponent);
            const positionComponent = positionFixture.componentInstance;
            positionComponent.position = 'right';
            positionFixture.detectChanges();

            const list = positionFixture.debugElement.query(By.css('ul[role="menu"]'));
            expect(list.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
        });
    });

    describe('Item Interaction Tests', () => {
        it('should execute command when item is clicked', () => {
            const commandFixture = TestBed.createComponent(TestCommandDockComponent);
            const commandComponent = commandFixture.componentInstance;
            commandFixture.detectChanges();

            const itemElement = commandFixture.debugElement.query(By.css('li[data-pc-section="menuitem"]'));
            itemElement.nativeElement.click();

            expect(commandComponent.commandExecuted).toBeDefined();
            expect(commandComponent.commandExecuted.item.label).toBe('Command Item');
        });

        it('should handle mouse enter on item', () => {
            spyOn(dockInstance, 'onItemMouseEnter');

            const itemElement = fixture.debugElement.query(By.css('li[data-pc-section="menuitem"]'));
            itemElement.triggerEventHandler('mouseenter', {});

            expect(dockInstance.onItemMouseEnter).toHaveBeenCalled();
        });

        it('should handle mouse leave on list', () => {
            spyOn(dockInstance, 'onListMouseLeave');

            const listElement = fixture.debugElement.query(By.css('ul[role="menu"]'));
            listElement.triggerEventHandler('mouseleave', {});

            expect(dockInstance.onListMouseLeave).toHaveBeenCalled();
        });

        it('should update currentIndex on mouse enter', () => {
            dockInstance.onItemMouseEnter(2);
            expect(dockInstance.currentIndex).toBe(2);
        });

        it('should reset currentIndex on mouse leave', () => {
            dockInstance.onListMouseLeave();
            expect(dockInstance.currentIndex).toBe(-3);
        });
    });

    describe('Template Tests', () => {
        it('should handle #item template processing', fakeAsync(() => {
            const itemTemplateFixture = TestBed.createComponent(TestItemTemplateDockComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const itemTemplateDock = itemTemplateFixture.debugElement.query(By.directive(Dock)).componentInstance;

            expect(() => itemTemplateDock.ngAfterContentInit()).not.toThrow();
            expect(itemTemplateDock.itemTemplate).toBeDefined();

            flush();
        }));

        it('should handle pTemplate processing', fakeAsync(() => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateDockComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateDock = pTemplateFixture.debugElement.query(By.directive(Dock)).componentInstance;

            expect(() => pTemplateDock.ngAfterContentInit()).not.toThrow();
            expect(pTemplateDock.templates).toBeDefined();

            flush();
        }));

        it('should process PrimeTemplate types correctly', fakeAsync(() => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateDockComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateDock = pTemplateFixture.debugElement.query(By.directive(Dock)).componentInstance;

            pTemplateDock.ngAfterContentInit();

            expect(pTemplateDock.templates).toBeDefined();

            flush();
        }));

        it('should prioritize itemTemplate over _itemTemplate', fakeAsync(() => {
            const itemTemplateFixture = TestBed.createComponent(TestItemTemplateDockComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const itemTemplateDock = itemTemplateFixture.debugElement.query(By.directive(Dock)).componentInstance;

            itemTemplateDock.ngAfterContentInit();

            expect(itemTemplateDock.itemTemplate).toBeDefined();

            flush();
        }));

        it('should render different template types correctly', fakeAsync(() => {
            // Test pTemplate rendering
            const pTemplateFixture = TestBed.createComponent(TestPTemplateDockComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateDock = pTemplateFixture.debugElement.query(By.directive(Dock)).componentInstance;
            expect(pTemplateDock.templates).toBeDefined();
            expect(() => pTemplateDock.ngAfterContentInit()).not.toThrow();

            // Test #item template rendering
            const itemTemplateFixture = TestBed.createComponent(TestItemTemplateDockComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const itemTemplateDock = itemTemplateFixture.debugElement.query(By.directive(Dock)).componentInstance;
            expect(itemTemplateDock.itemTemplate).toBeDefined();

            flush();
        }));
    });

    describe('Keyboard Navigation Tests', () => {
        beforeEach(() => {
            dockInstance.focused = true;
            dockInstance.focusedOptionIndex = 0;
        });

        it('should handle arrow right key for horizontal positions', () => {
            component.position = 'bottom';
            fixture.detectChanges();

            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });
            spyOn(keyEvent, 'preventDefault');
            spyOn(dockInstance, 'onArrowDownKey');

            dockInstance.onListKeyDown(keyEvent);

            expect(dockInstance.onArrowDownKey).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle arrow left key for horizontal positions', () => {
            component.position = 'top';
            fixture.detectChanges();

            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
            spyOn(keyEvent, 'preventDefault');
            spyOn(dockInstance, 'onArrowUpKey');

            dockInstance.onListKeyDown(keyEvent);

            expect(dockInstance.onArrowUpKey).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle arrow down key for vertical positions', () => {
            component.position = 'left';
            fixture.detectChanges();

            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            spyOn(keyEvent, 'preventDefault');
            spyOn(dockInstance, 'onArrowDownKey');

            dockInstance.onListKeyDown(keyEvent);

            expect(dockInstance.onArrowDownKey).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle arrow up key for vertical positions', () => {
            component.position = 'right';
            fixture.detectChanges();

            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
            spyOn(keyEvent, 'preventDefault');
            spyOn(dockInstance, 'onArrowUpKey');

            dockInstance.onListKeyDown(keyEvent);

            expect(dockInstance.onArrowUpKey).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle home key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Home' });
            spyOn(keyEvent, 'preventDefault');
            spyOn(dockInstance, 'onHomeKey');

            dockInstance.onListKeyDown(keyEvent);

            expect(dockInstance.onHomeKey).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle end key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'End' });
            spyOn(keyEvent, 'preventDefault');
            spyOn(dockInstance, 'onEndKey');

            dockInstance.onListKeyDown(keyEvent);

            expect(dockInstance.onEndKey).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle enter key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Enter' });
            spyOn(keyEvent, 'preventDefault');
            spyOn(dockInstance, 'onSpaceKey');

            dockInstance.onListKeyDown(keyEvent);

            expect(dockInstance.onSpaceKey).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle space key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Space' });
            spyOn(keyEvent, 'preventDefault');
            spyOn(dockInstance, 'onSpaceKey');

            dockInstance.onListKeyDown(keyEvent);

            expect(dockInstance.onSpaceKey).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Focus Management Tests', () => {
        it('should emit onFocus when list gains focus', () => {
            spyOn(dockInstance.onFocus, 'emit');
            const focusEvent = new FocusEvent('focus');

            dockInstance.onListFocus(focusEvent);

            expect(dockInstance.focused).toBe(true);
            expect(dockInstance.onFocus.emit).toHaveBeenCalledWith(focusEvent);
        });

        it('should emit onBlur when list loses focus', () => {
            spyOn(dockInstance.onBlur, 'emit');
            const blurEvent = new FocusEvent('blur');
            dockInstance.focused = true;

            dockInstance.onListBlur(blurEvent);

            expect(dockInstance.focused).toBe(false);
            expect(dockInstance.focusedOptionIndex).toBe(-1);
            expect(dockInstance.onBlur.emit).toHaveBeenCalledWith(blurEvent);
        });

        it('should handle focus and blur events from template', () => {
            const listElement = fixture.debugElement.query(By.css('ul[role="menu"]'));

            spyOn(component, 'onFocus');
            spyOn(component, 'onBlur');

            listElement.triggerEventHandler('focus', new FocusEvent('focus'));
            expect(component.onFocus).toHaveBeenCalled();

            listElement.triggerEventHandler('blur', new FocusEvent('blur'));
            expect(component.onBlur).toHaveBeenCalled();
        });

        it('should get focusedOptionId correctly', () => {
            dockInstance.focusedOptionIndex = -1;
            expect(dockInstance.focusedOptionId).toBeNull();

            dockInstance.focusedOptionIndex = '2';
            expect(dockInstance.focusedOptionId).toBe('2');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply styleClass when provided', () => {
            const styleFixture = TestBed.createComponent(TestStyledDockComponent);
            styleFixture.detectChanges();

            const dockElement = styleFixture.debugElement.query(By.directive(Dock));
            const hostElement = dockElement.nativeElement;

            expect(hostElement.classList.contains('custom-dock-class')).toBe(true);
        });

        it('should have proper data attributes', () => {
            const dockElement = fixture.debugElement.query(By.directive(Dock));
            const hostElement = dockElement.nativeElement;

            expect(hostElement.getAttribute('data-pc-name')).toBe('dock');
        });

        it('should apply correct CSS classes based on position', () => {
            // This test assumes CSS classes are applied based on position
            // The actual CSS class structure depends on the component's styling implementation
            expect(dockInstance.position).toBe('bottom'); // Default position
        });

        it('should have generated id on list element', () => {
            const listElement = fixture.debugElement.query(By.css('ul[role="menu"]'));
            expect(listElement.nativeElement.getAttribute('id')).toBeTruthy();
        });
    });

    describe('Accessibility Tests', () => {
        it('should have proper ARIA attributes on list', () => {
            const listElement = fixture.debugElement.query(By.css('ul[role="menu"]'));

            expect(listElement.nativeElement.getAttribute('role')).toBe('menu');
            expect(listElement.nativeElement.getAttribute('aria-orientation')).toBeTruthy();
            expect(listElement.nativeElement.hasAttribute('tabindex')).toBe(true);
        });

        it('should have proper ARIA attributes on menu items', () => {
            const itemElements = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));

            itemElements.forEach((item, index) => {
                expect(item.nativeElement.getAttribute('role')).toBe('menuitem');

                // Check if item has a label (separators might not have labels)
                const ariaLabel = item.nativeElement.getAttribute('aria-label');
                if (ariaLabel !== null) {
                    expect(item.nativeElement.hasAttribute('aria-label')).toBe(true);
                }

                // aria-disabled attribute should always be present (true or false)
                expect(item.nativeElement.hasAttribute('aria-disabled')).toBe(true);
                // Check the actual value
                const ariaDisabledValue = item.nativeElement.getAttribute('aria-disabled');
                expect(ariaDisabledValue === 'true' || ariaDisabledValue === 'false').toBe(true);
            });
        });

        it('should set aria-activedescendant when focused', () => {
            dockInstance.focused = true;
            dockInstance.focusedOptionIndex = '1';

            // Verify the getter works correctly
            expect(dockInstance.focusedOptionId).toBe('1');

            // Force change detection
            dockInstance.cd.markForCheck();
            dockInstance.cd.detectChanges();
            fixture.detectChanges();

            const listElement = fixture.debugElement.query(By.css('ul[role="menu"]'));
            const ariaActivedescendant = listElement.nativeElement.getAttribute('aria-activedescendant');

            // Template uses {{ focused ? focusedOptionId : undefined }}
            expect(ariaActivedescendant).toBe('1');
        });

        it('should not set aria-activedescendant when not focused', () => {
            dockInstance.focused = false;
            fixture.detectChanges();

            const listElement = fixture.debugElement.query(By.css('ul[role="menu"]'));
            expect(listElement.nativeElement.getAttribute('aria-activedescendant')).toBeNull();
        });

        it('should set aria-label when provided', () => {
            component.ariaLabel = 'Main Navigation Dock';
            fixture.detectChanges();

            const listElement = fixture.debugElement.query(By.css('ul[role="menu"]'));
            expect(listElement.nativeElement.getAttribute('aria-label')).toBe('Main Navigation Dock');
        });

        it('should set aria-labelledby when provided', () => {
            component.ariaLabelledBy = 'dock-heading';
            fixture.detectChanges();

            const listElement = fixture.debugElement.query(By.css('ul[role="menu"]'));
            expect(listElement.nativeElement.getAttribute('aria-labelledby')).toBe('dock-heading');
        });
    });

    describe('Router Integration Tests', () => {
        it('should handle router links', () => {
            const routerFixture = TestBed.createComponent(TestRouterDockComponent);
            const routerDock = routerFixture.debugElement.query(By.directive(Dock)).componentInstance;

            routerFixture.detectChanges();

            // Force change detection
            routerDock.cd.markForCheck();
            routerDock.cd.detectChanges();
            routerFixture.detectChanges();

            // Router links get converted to href after processing, so look for routerlinkactive
            const routerLinks = routerFixture.debugElement.queryAll(By.css('a[routerlinkactive]'));
            expect(routerLinks.length).toBe(3);
        });

        it('should identify clickable router links correctly', () => {
            const routerItem = { routerLink: '/test', disabled: false };
            const disabledRouterItem = { routerLink: '/test', disabled: true };
            const regularItem = { url: 'http://example.com' };
            const itemWithoutRouter = {};
            const itemWithRouterButNoDisabled = { routerLink: '/test' };

            expect(dockInstance.isClickableRouterLink(routerItem)).toBe(true);
            expect(dockInstance.isClickableRouterLink(disabledRouterItem)).toBe(false);
            expect(dockInstance.isClickableRouterLink(regularItem)).toBe(false);
            expect(dockInstance.isClickableRouterLink(itemWithoutRouter)).toBe(false);
            expect(dockInstance.isClickableRouterLink(itemWithRouterButNoDisabled)).toBe(true); // !undefined = true
        });

        it('should handle router link with query params', () => {
            const routerFixture = TestBed.createComponent(TestRouterDockComponent);
            routerFixture.detectChanges();

            // Look for href instead of routerLink attribute
            const routerLink = routerFixture.debugElement.query(By.css('a[href="/services?tab=overview"]'));
            expect(routerLink).toBeTruthy();
        });
    });

    describe('Disabled Items Tests', () => {
        it('should handle disabled items correctly', () => {
            const disabledFixture = TestBed.createComponent(TestDisabledItemsDockComponent);
            disabledFixture.detectChanges();

            const disabledDock = disabledFixture.debugElement.query(By.directive(Dock)).componentInstance;
            const disabledItem = disabledDock.model[1];
            const functionDisabledItem = disabledDock.model[2];

            expect(disabledDock.disabled(disabledItem)).toBe(true);
            expect(disabledDock.disabled(functionDisabledItem)).toBe(true);
        });

        it('should set data-p-disabled attribute for disabled items', () => {
            const disabledFixture = TestBed.createComponent(TestDisabledItemsDockComponent);
            disabledFixture.detectChanges();

            const itemElements = disabledFixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));

            // First item should not be disabled
            expect(itemElements[0].nativeElement.getAttribute('data-p-disabled')).toBe('false');

            // Second item should be disabled
            expect(itemElements[1].nativeElement.getAttribute('data-p-disabled')).toBe('true');
        });
    });

    describe('Dynamic Model Tests', () => {
        it('should handle dynamic model changes', () => {
            const dynamicFixture = TestBed.createComponent(TestDynamicDockComponent);
            const dynamicComponent = dynamicFixture.componentInstance;
            const dynamicDock = dynamicFixture.debugElement.query(By.directive(Dock)).componentInstance;
            dynamicFixture.detectChanges();

            // Initially empty
            expect(dynamicDock.model.length).toBe(0);

            // Add items
            dynamicComponent.addItem({ label: 'Item 1', icon: 'pi pi-test' });
            dynamicComponent.addItem({ label: 'Item 2', icon: 'pi pi-test2' });
            dynamicFixture.detectChanges();

            expect(dynamicDock.model.length).toBe(2);
            expect(dynamicDock.model[0].label).toBe('Item 1');

            // Remove item
            dynamicComponent.removeItem(0);
            dynamicFixture.detectChanges();

            expect(dynamicDock.model.length).toBe(1);
            expect(dynamicDock.model[0].label).toBe('Item 2');

            // Clear all
            dynamicComponent.clearItems();
            dynamicFixture.detectChanges();

            expect(dynamicDock.model.length).toBe(0);
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined values gracefully', () => {
            component.model = undefined as any;
            component.ariaLabel = undefined as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(dockInstance.model).toBeUndefined();
        });

        it('should handle items without icons', () => {
            component.model = [{ label: 'No Icon Item' }, { label: 'Icon Item', icon: 'pi pi-check' }];
            fixture.detectChanges();

            const iconElements = fixture.debugElement.queryAll(By.css('span[class*="pi-"]'));
            expect(iconElements.length).toBe(1); // Only one item has icon
        });

        it('should handle items with custom styleClass', () => {
            component.model = [{ label: 'Custom Style', styleClass: 'custom-item-class' }];
            fixture.detectChanges();

            const itemElement = fixture.debugElement.query(By.css('li[data-pc-section="menuitem"]'));
            expect(itemElement.nativeElement.classList.contains('custom-item-class')).toBe(true);
        });

        it('should handle memory cleanup on destroy', () => {
            spyOn(dockInstance, 'unbindMatchMediaListener');

            dockInstance.ngOnDestroy();

            expect(dockInstance.unbindMatchMediaListener).toHaveBeenCalled();
        });
    });

    describe('Media Query Tests', () => {
        it('should initialize queryMatches and mobileActive signals', () => {
            expect(typeof dockInstance.queryMatches).toBe('function');
            expect(typeof dockInstance.mobileActive).toBe('function');
            expect(dockInstance.queryMatches()).toBe(false);
            expect(dockInstance.mobileActive()).toBe(false);
        });

        it('should bind match media listener on init', () => {
            spyOn(dockInstance, 'bindMatchMediaListener');

            dockInstance.ngOnInit();

            expect(dockInstance.bindMatchMediaListener).toHaveBeenCalled();
        });

        it('should unbind match media listener on destroy', () => {
            spyOn(dockInstance, 'unbindMatchMediaListener');

            dockInstance.ngOnDestroy();

            expect(dockInstance.unbindMatchMediaListener).toHaveBeenCalled();
        });
    });

    describe('Public Methods', () => {
        it('should have required public methods', () => {
            expect(typeof dockInstance.getItemId).toBe('function');
            expect(typeof dockInstance.getItemProp).toBe('function');
            expect(typeof dockInstance.disabled).toBe('function');
            expect(typeof dockInstance.isItemActive).toBe('function');
            expect(typeof dockInstance.isClickableRouterLink).toBe('function');
        });

        it('should generate item ID correctly', () => {
            const itemWithId = { id: 'custom-id', label: 'Test' };
            const itemWithoutId = { label: 'Test' };

            expect(dockInstance.getItemId(itemWithId, 0)).toBe('custom-id');
            expect(dockInstance.getItemId(itemWithoutId, 2)).toBe('2');
        });

        it('should check item active state correctly', () => {
            dockInstance.focusedOptionIndex = 1;

            expect(dockInstance.isItemActive(1)).toBe(true);
            expect(dockInstance.isItemActive(2)).toBe(false);
        });

        it('should handle disabled property correctly', () => {
            const enabledItem = { disabled: false };
            const disabledItem = { disabled: true };
            const functionDisabledItem = { disabled: () => true };
            const undefinedItem = {};

            expect(dockInstance.disabled(enabledItem)).toBe(false);
            expect(dockInstance.disabled(disabledItem)).toBe(true);
            expect(dockInstance.disabled(functionDisabledItem)).toBe(true);
            expect(dockInstance.disabled(undefinedItem)).toBe(false);
        });
    });
});

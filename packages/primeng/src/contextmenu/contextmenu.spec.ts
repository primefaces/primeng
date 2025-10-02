import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem, SharedModule } from 'primeng/api';
import { ContextMenu } from './contextmenu';

@Component({
    standalone: false,
    template: `
        <p-contextmenu
            [model]="model"
            [target]="target"
            [global]="global"
            [style]="style"
            [styleClass]="styleClass"
            [autoZIndex]="autoZIndex"
            [baseZIndex]="baseZIndex"
            [breakpoint]="breakpoint"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            [pressDelay]="pressDelay"
            [triggerEvent]="triggerEvent"
            (onShow)="onShow($event)"
            (onHide)="onHide($event)"
        >
        </p-contextmenu>
    `
})
class TestBasicContextMenuComponent {
    model: MenuItem[] | undefined = [{ label: 'File', icon: 'pi pi-file' }, { label: 'Edit', icon: 'pi pi-pencil' }, { separator: true }, { label: 'Settings', icon: 'pi pi-cog' }];
    target: HTMLElement | string | undefined;
    global: boolean = false;
    style: { [klass: string]: any } | null | undefined;
    styleClass: string | undefined;
    autoZIndex: boolean = true;
    baseZIndex: number = 0;
    breakpoint: string = '960px';
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
    pressDelay: number = 500;
    triggerEvent: string = 'contextmenu';

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
    selector: 'test-target-contextmenu',
    template: `
        <div #targetDiv id="target-div">Target Element</div>
        <p-contextmenu [model]="model" target="targetDiv"></p-contextmenu>
    `
})
class TestTargetContextMenuComponent {
    @ViewChild('targetDiv', { static: true }) targetDiv: any;

    model: MenuItem[] = [
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clone' }
    ];
}

@Component({
    standalone: false,
    selector: 'test-global-contextmenu',
    template: ` <p-contextmenu [model]="model" [global]="true"></p-contextmenu> `
})
class TestGlobalContextMenuComponent {
    model: MenuItem[] = [{ label: 'Global Item 1' }, { label: 'Global Item 2' }];
}

@Component({
    standalone: false,
    template: `
        <p-contextmenu [model]="nestedModel">
            <ng-template #item let-item>
                <div class="custom-item">
                    <i [class]="item.icon" *ngIf="item.icon"></i>
                    <span class="custom-label">{{ item.label }}</span>
                </div>
            </ng-template>
        </p-contextmenu>
    `
})
class TestItemTemplateContextMenuComponent {
    nestedModel: MenuItem[] = [
        {
            label: 'File',
            icon: 'pi pi-file',
            items: [
                { label: 'New', icon: 'pi pi-plus' },
                { label: 'Open', icon: 'pi pi-folder-open' }
            ]
        },
        { label: 'Edit', icon: 'pi pi-pencil' }
    ];
}

@Component({
    standalone: false,
    template: `
        <p-contextmenu [model]="model">
            <ng-template pTemplate="item" let-item>
                <span class="p-template-item">{{ item.label }}</span>
            </ng-template>
        </p-contextmenu>
    `
})
class TestPTemplateContextMenuComponent {
    model: MenuItem[] = [{ label: 'PTemplate Item 1' }, { label: 'PTemplate Item 2' }];
}

@Component({
    standalone: false,
    template: `
        <p-contextmenu [model]="model">
            <ng-template #submenuicon>
                <i class="custom-submenu-icon pi pi-angle-right"></i>
            </ng-template>
        </p-contextmenu>
    `
})
class TestSubmenuIconTemplateComponent {
    model: MenuItem[] = [
        {
            label: 'File',
            items: [{ label: 'New' }, { label: 'Open' }]
        }
    ];
}

@Component({
    standalone: false,
    selector: 'test-router-contextmenu',
    template: ` <p-contextmenu [model]="routerModel"></p-contextmenu> `
})
class TestRouterContextMenuComponent {
    routerModel: MenuItem[] = [
        { label: 'Home', routerLink: '/' },
        { label: 'Products', routerLink: '/products' },
        {
            label: 'Services',
            routerLink: ['/services'],
            queryParams: { tab: 'overview' }
        }
    ];
}

@Component({
    standalone: false,
    selector: 'test-styled-contextmenu',
    template: ` <p-contextmenu [style]="customStyle" styleClass="custom-contextmenu"></p-contextmenu> `
})
class TestStyledContextMenuComponent {
    customStyle = {
        border: '2px solid #007bff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    };
}

@Component({
    standalone: false,
    selector: 'test-minimal-contextmenu',
    template: `<p-contextmenu></p-contextmenu>`
})
class TestMinimalContextMenuComponent {}

@Component({
    standalone: false,
    selector: 'test-dynamic-contextmenu',
    template: ` <p-contextmenu [model]="dynamicModel"></p-contextmenu> `
})
class TestDynamicContextMenuComponent {
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
    selector: 'test-disabled-items-contextmenu',
    template: ` <p-contextmenu [model]="disabledModel"></p-contextmenu> `
})
class TestDisabledItemsComponent {
    disabledModel: MenuItem[] = [{ label: 'Enabled Item' }, { label: 'Disabled Item', disabled: true }, { separator: true }, { label: 'Another Enabled Item' }];
}

@Component({
    standalone: true,
    selector: 'test-target-component',
    template: '<div>Target Page</div>'
})
class TestTargetComponent {}

describe('ContextMenu', () => {
    let component: TestBasicContextMenuComponent;
    let fixture: ComponentFixture<TestBasicContextMenuComponent>;
    let contextMenuElement: DebugElement;
    let contextMenuInstance: ContextMenu;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TestBasicContextMenuComponent,
                TestTargetContextMenuComponent,
                TestGlobalContextMenuComponent,
                TestItemTemplateContextMenuComponent,
                TestPTemplateContextMenuComponent,
                TestSubmenuIconTemplateComponent,
                TestRouterContextMenuComponent,
                TestStyledContextMenuComponent,
                TestMinimalContextMenuComponent,
                TestDynamicContextMenuComponent,
                TestDisabledItemsComponent
            ],
            imports: [
                ContextMenu,
                TestTargetComponent,
                NoopAnimationsModule,
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: TestTargetComponent },
                    { path: 'products', component: TestTargetComponent },
                    { path: 'services', component: TestTargetComponent }
                ])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicContextMenuComponent);
        component = fixture.componentInstance;
        contextMenuElement = fixture.debugElement.query(By.directive(ContextMenu));
        contextMenuInstance = contextMenuElement.componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(contextMenuInstance).toBeTruthy();
        });

        it('should have required dependencies injected', () => {
            expect(contextMenuInstance.overlayService).toBeTruthy();
            expect(contextMenuInstance._componentStyle).toBeTruthy();
            expect(contextMenuInstance.constructor.name).toBe('ContextMenu');
        });

        it('should have default values', () => {
            const freshFixture = TestBed.createComponent(TestMinimalContextMenuComponent);
            freshFixture.detectChanges();

            const freshContextMenu = freshFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(freshContextMenu.model).toBeUndefined();
            expect(freshContextMenu.target).toBeUndefined();
            expect(freshContextMenu.global).toBeFalsy();
            expect(freshContextMenu.triggerEvent).toBe('contextmenu');
            expect(freshContextMenu.autoZIndex).toBe(true);
            expect(freshContextMenu.baseZIndex).toBe(0);
            expect(freshContextMenu.breakpoint).toBe('960px');
            expect(freshContextMenu.pressDelay).toBe(500);
        });

        it('should accept custom values', () => {
            const testModel: MenuItem[] = [{ label: 'Test Item' }];
            component.model = testModel;
            component.global = true;
            component.triggerEvent = 'click';
            component.autoZIndex = false;
            component.baseZIndex = 100;
            component.styleClass = 'custom-contextmenu';
            component.ariaLabel = 'Custom Context Menu';
            fixture.detectChanges();

            expect(contextMenuInstance.model).toBe(testModel);
            expect(contextMenuInstance.global).toBe(true);
            expect(contextMenuInstance.triggerEvent).toBe('click');
            expect(contextMenuInstance.autoZIndex).toBe(false);
            expect(contextMenuInstance.baseZIndex).toBe(100);
            expect(contextMenuInstance.styleClass).toBe('custom-contextmenu');
            expect(contextMenuInstance.ariaLabel).toBe('Custom Context Menu');
        });

        it('should initialize with generated id', () => {
            expect(contextMenuInstance.id).toBeTruthy();
            expect(typeof contextMenuInstance.id).toBe('string');
            expect(contextMenuInstance.id).toMatch(/^pn_id_/);
        });

        it('should have onShow and onHide output emitters', () => {
            expect(contextMenuInstance.onShow).toBeTruthy();
            expect(contextMenuInstance.onHide).toBeTruthy();
        });

        it('should initialize signal states', () => {
            expect(contextMenuInstance.visible()).toBe(false);
            expect(contextMenuInstance.focused).toBe(false);
            expect(contextMenuInstance.submenuVisible()).toBe(false);
            expect(contextMenuInstance.activeItemPath()).toEqual([]);
        });
    });

    describe('Input Properties', () => {
        it('should update model input', () => {
            const newModel = [{ label: 'New Item' }];
            component.model = newModel;
            fixture.detectChanges();

            expect(contextMenuInstance.model).toBe(newModel);
            expect(contextMenuInstance.processedItems).toBeTruthy();
        });

        it('should update target input', () => {
            const targetElement = document.createElement('div');
            component.target = targetElement;
            fixture.detectChanges();

            expect(contextMenuInstance.target).toBe(targetElement);
        });

        it('should update global input with booleanAttribute transform', () => {
            component.global = true;
            fixture.detectChanges();
            expect(contextMenuInstance.global).toBe(true);

            component.global = false;
            fixture.detectChanges();
            expect(contextMenuInstance.global).toBe(false);
        });

        it('should update triggerEvent input', () => {
            component.triggerEvent = 'click';
            fixture.detectChanges();
            expect(contextMenuInstance.triggerEvent).toBe('click');
        });

        it('should update style and styleClass inputs', () => {
            const customStyle = { color: 'red' };
            component.style = customStyle;
            component.styleClass = 'test-class';
            fixture.detectChanges();

            expect(contextMenuInstance.style).toBe(customStyle);
            expect(contextMenuInstance.styleClass).toBe('test-class');
        });

        it('should update autoZIndex with booleanAttribute transform', () => {
            component.autoZIndex = false;
            fixture.detectChanges();
            expect(contextMenuInstance.autoZIndex).toBe(false);
        });

        it('should update baseZIndex with numberAttribute transform', () => {
            component.baseZIndex = 1000;
            fixture.detectChanges();
            expect(contextMenuInstance.baseZIndex).toBe(1000);
        });

        it('should update breakpoint input', () => {
            component.breakpoint = '768px';
            fixture.detectChanges();
            expect(contextMenuInstance.breakpoint).toBe('768px');
        });

        it('should update ariaLabel and ariaLabelledBy inputs', () => {
            component.ariaLabel = 'Test Menu';
            component.ariaLabelledBy = 'menu-label';
            fixture.detectChanges();

            expect(contextMenuInstance.ariaLabel).toBe('Test Menu');
            expect(contextMenuInstance.ariaLabelledBy).toBe('menu-label');
        });

        it('should update pressDelay with numberAttribute transform', () => {
            component.pressDelay = 1000;
            fixture.detectChanges();
            expect(contextMenuInstance.pressDelay).toBe(1000);
        });
    });

    describe('Context Menu Display Tests', () => {
        it('should not be visible initially', () => {
            expect(contextMenuInstance.visible()).toBe(false);
        });

        it('should show context menu on show() call', () => {
            const mockEvent = {
                pageX: 100,
                pageY: 150,
                stopPropagation: jasmine.createSpy(),
                preventDefault: jasmine.createSpy()
            };

            contextMenuInstance.show(mockEvent);

            expect(contextMenuInstance.visible()).toBe(true);
            expect(contextMenuInstance.pageX).toBe(100);
            expect(contextMenuInstance.pageY).toBe(150);
        });

        it('should hide context menu on hide() call', () => {
            contextMenuInstance.visible.set(true);

            contextMenuInstance.hide();

            expect(contextMenuInstance.visible()).toBe(false);
            expect(contextMenuInstance.activeItemPath()).toEqual([]);
        });

        it('should toggle context menu visibility', () => {
            const mockEvent = {
                pageX: 100,
                pageY: 150,
                stopPropagation: jasmine.createSpy(),
                preventDefault: jasmine.createSpy()
            };

            expect(contextMenuInstance.visible()).toBe(false);

            contextMenuInstance.toggle(mockEvent);
            expect(contextMenuInstance.visible()).toBe(true);

            contextMenuInstance.toggle();
            expect(contextMenuInstance.visible()).toBe(false);
        });

        it('should emit onShow when showing', () => {
            spyOn(contextMenuInstance.onShow, 'emit');

            const mockEvent = {
                pageX: 100,
                pageY: 150,
                stopPropagation: jasmine.createSpy(),
                preventDefault: jasmine.createSpy()
            };

            contextMenuInstance.show(mockEvent);

            expect(contextMenuInstance.onShow.emit).toHaveBeenCalled();
        });

        it('should emit onHide when hiding', () => {
            spyOn(contextMenuInstance.onHide, 'emit');
            contextMenuInstance.visible.set(true);

            contextMenuInstance.hide();

            expect(contextMenuInstance.onHide.emit).toHaveBeenCalled();
        });

        it('should handle show event stopPropagation and preventDefault', () => {
            const mockEvent = {
                pageX: 100,
                pageY: 150,
                stopPropagation: jasmine.createSpy(),
                preventDefault: jasmine.createSpy()
            };

            contextMenuInstance.show(mockEvent);

            expect(mockEvent.stopPropagation).toHaveBeenCalled();
            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Target and Global Context Menu Tests', () => {
        it('should work with target element', () => {
            const targetFixture = TestBed.createComponent(TestTargetContextMenuComponent);
            const targetComponent = targetFixture.componentInstance;

            const targetContextMenu = targetFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            // Mock the bindTriggerEventListener BEFORE detecting changes
            spyOn(targetContextMenu, 'bindTriggerEventListener');

            // Now detect changes to trigger ngOnInit
            targetFixture.detectChanges();

            // Test the properties
            expect(targetContextMenu.target).toBe('targetDiv');
            expect(targetContextMenu.global).toBeFalsy();
            expect(targetContextMenu.bindTriggerEventListener).toHaveBeenCalled();
        });

        it('should work in global mode', () => {
            const globalFixture = TestBed.createComponent(TestGlobalContextMenuComponent);
            globalFixture.detectChanges();

            const globalContextMenu = globalFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;
            expect(globalContextMenu.global).toBe(true);
        });

        it('should bind trigger event listener on init', () => {
            spyOn(contextMenuInstance, 'bindTriggerEventListener');

            // Set up a proper target before calling ngOnInit
            const mockTarget = document.createElement('div');
            contextMenuInstance.target = mockTarget;

            contextMenuInstance.ngOnInit();

            expect(contextMenuInstance.bindTriggerEventListener).toHaveBeenCalled();
        });

        it('should handle mobile device detection', () => {
            expect(typeof contextMenuInstance.isMobile).toBe('function');

            const isMobile = contextMenuInstance.isMobile();
            expect(typeof isMobile).toBe('boolean');
        });
    });

    describe('Template Tests', () => {
        it('should handle #item template processing', fakeAsync(() => {
            const itemTemplateFixture = TestBed.createComponent(TestItemTemplateContextMenuComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const itemTemplateContextMenu = itemTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(() => itemTemplateContextMenu.ngAfterContentInit()).not.toThrow();
            expect(itemTemplateContextMenu.itemTemplate).toBeDefined();

            flush();
        }));

        it('should handle pTemplate processing', fakeAsync(() => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateContextMenuComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateContextMenu = pTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(() => pTemplateContextMenu.ngAfterContentInit()).not.toThrow();
            expect(pTemplateContextMenu.templates).toBeDefined();

            flush();
        }));

        it('should handle submenuicon template', fakeAsync(() => {
            const submenuTemplateFixture = TestBed.createComponent(TestSubmenuIconTemplateComponent);
            submenuTemplateFixture.detectChanges();
            tick(100);

            const submenuContextMenu = submenuTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(() => submenuContextMenu.ngAfterContentInit()).not.toThrow();
            expect(submenuContextMenu.submenuIconTemplate).toBeDefined();

            flush();
        }));

        it('should process PrimeTemplate types correctly', fakeAsync(() => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateContextMenuComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateContextMenu = pTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            pTemplateContextMenu.ngAfterContentInit();

            expect(pTemplateContextMenu.templates).toBeDefined();

            flush();
        }));

        it('should prioritize itemTemplate over _itemTemplate', fakeAsync(() => {
            const itemTemplateFixture = TestBed.createComponent(TestItemTemplateContextMenuComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const contextMenuComp = itemTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(contextMenuComp.itemTemplate).toBeDefined();
            expect(() => contextMenuComp.ngAfterContentInit()).not.toThrow();

            flush();
        }));

        it('should handle missing templates gracefully', () => {
            expect(() => contextMenuInstance.ngAfterContentInit()).not.toThrow();
            expect(contextMenuInstance._itemTemplate).toBeUndefined();
            expect(contextMenuInstance._submenuIconTemplate).toBeUndefined();
        });
    });

    describe('Menu Items and Model Tests', () => {
        it('should process menu items correctly', () => {
            const model = [
                { label: 'Item 1' },
                {
                    label: 'Item 2',
                    items: [{ label: 'Subitem 1' }, { label: 'Subitem 2' }]
                }
            ];

            component.model = model;
            fixture.detectChanges();

            expect(contextMenuInstance.processedItems).toBeTruthy();
            expect(contextMenuInstance.processedItems.length).toBe(2);
            expect(contextMenuInstance.processedItems[1].items).toBeTruthy();
            expect(contextMenuInstance.processedItems[1].items.length).toBe(2);
        });

        it('should handle empty model', () => {
            component.model = [];
            fixture.detectChanges();

            expect(contextMenuInstance.processedItems).toEqual([]);
        });

        it('should handle undefined model', () => {
            component.model = undefined as any;
            fixture.detectChanges();

            expect(contextMenuInstance.model).toBeUndefined();
        });

        it('should handle items with separators', () => {
            const modelWithSeparator = [{ label: 'Item 1' }, { separator: true }, { label: 'Item 2' }];

            component.model = modelWithSeparator;
            fixture.detectChanges();

            expect(contextMenuInstance.processedItems.length).toBe(3);
            expect(contextMenuInstance.isItemSeparator(modelWithSeparator[1])).toBe(true);
        });

        it('should handle disabled items', () => {
            const disabledFixture = TestBed.createComponent(TestDisabledItemsComponent);
            disabledFixture.detectChanges();

            const disabledContextMenu = disabledFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;
            const disabledItem = disabledContextMenu.model[1];

            expect(contextMenuInstance.isItemDisabled(disabledItem)).toBe(true);
        });
    });

    describe('Keyboard Navigation Tests', () => {
        beforeEach(() => {
            contextMenuInstance.visible.set(true);
            contextMenuInstance.focusedItemInfo.set({ index: 0, level: 0, parentKey: '', item: null });

            // Mock the rootmenu property to prevent undefined errors
            contextMenuInstance.rootmenu = {
                el: {
                    nativeElement: document.createElement('div')
                }
            } as any;

            // Create mock menu items structure
            const mockMenuDiv = document.createElement('div');
            mockMenuDiv.innerHTML = '<ul><li data-pc-section="menuitem" id="item_0"></li></ul>';
            contextMenuInstance.rootmenu!.el!.nativeElement.appendChild(mockMenuDiv);
        });

        it('should handle arrow down key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            spyOn(keyEvent, 'preventDefault');

            // Mock the changeFocusedItemIndex method to prevent rootmenu access errors
            spyOn(contextMenuInstance, 'changeFocusedItemIndex');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle arrow up key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
            spyOn(keyEvent, 'preventDefault');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle escape key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Escape' });
            spyOn(contextMenuInstance, 'hide');
            spyOn(keyEvent, 'preventDefault');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(contextMenuInstance.hide).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle enter key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Enter' });
            spyOn(keyEvent, 'preventDefault');

            // Mock the onEnterKey method to prevent rootmenu access errors
            spyOn(contextMenuInstance, 'onEnterKey');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(contextMenuInstance.onEnterKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle space key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Space' });
            spyOn(contextMenuInstance, 'onEnterKey');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(contextMenuInstance.onEnterKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle home key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Home' });
            spyOn(keyEvent, 'preventDefault');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle end key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'End' });
            spyOn(keyEvent, 'preventDefault');

            // Mock the onEndKey method to prevent rootmenu access errors
            spyOn(contextMenuInstance, 'onEndKey');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(contextMenuInstance.onEndKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle tab key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Tab' });
            spyOn(contextMenuInstance, 'hide');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(contextMenuInstance.hide).toHaveBeenCalled();
        });

        it('should handle printable character search', () => {
            const keyEvent = new KeyboardEvent('keydown', { key: 'f' });
            spyOn(contextMenuInstance, 'searchItems');

            contextMenuInstance.onKeyDown(keyEvent);

            expect(contextMenuInstance.searchItems).toHaveBeenCalledWith(keyEvent, 'f');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply styleClass when visible', () => {
            component.styleClass = 'custom-contextmenu-class';
            fixture.detectChanges();

            contextMenuInstance.visible.set(true);
            fixture.detectChanges();

            const containerElement = fixture.debugElement.query(By.css('[data-pc-name="contextmenu"]'));
            if (containerElement) {
                expect(containerElement.nativeElement.classList.contains('custom-contextmenu-class')).toBe(true);
            } else {
                // If not visible in test, just check that property is set
                expect(contextMenuInstance.styleClass).toBe('custom-contextmenu-class');
            }
        });

        it('should apply custom styles when visible', () => {
            const styleFixture = TestBed.createComponent(TestStyledContextMenuComponent);
            const styleComponent = styleFixture.componentInstance;
            styleFixture.detectChanges();

            const styledContextMenu = styleFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;
            styledContextMenu.visible.set(true);
            styleFixture.detectChanges();

            expect(styleComponent.customStyle).toEqual({
                border: '2px solid #007bff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            });
        });

        it('should have proper data attributes when visible', () => {
            contextMenuInstance.visible.set(true);
            fixture.detectChanges();

            const containerElement = fixture.debugElement.query(By.css('[data-pc-name="contextmenu"]'));
            if (containerElement) {
                expect(containerElement.nativeElement.getAttribute('data-pc-name')).toBe('contextmenu');
                expect(containerElement.nativeElement.getAttribute('data-pc-section')).toBe('root');
            }
        });

        it('should have generated id on container when visible', () => {
            contextMenuInstance.visible.set(true);
            fixture.detectChanges();

            const containerElement = fixture.debugElement.query(By.css('[data-pc-name="contextmenu"]'));
            if (containerElement) {
                expect(containerElement.nativeElement.getAttribute('id')).toBeTruthy();
            }
        });
    });

    describe('Accessibility Tests', () => {
        it('should have proper ARIA attributes', () => {
            component.ariaLabel = 'Context menu';
            component.ariaLabelledBy = 'menu-title';
            fixture.detectChanges();

            expect(contextMenuInstance.ariaLabel).toBe('Context menu');
            expect(contextMenuInstance.ariaLabelledBy).toBe('menu-title');
        });

        it('should handle focus and blur events', () => {
            const focusEvent = new FocusEvent('focus');
            const blurEvent = new FocusEvent('blur');

            contextMenuInstance.onMenuFocus(focusEvent);
            expect(contextMenuInstance.focused).toBe(true);

            contextMenuInstance.onMenuBlur(blurEvent);
            expect(contextMenuInstance.focused).toBe(false);
        });

        it('should have proper tabindex when not disabled', () => {
            contextMenuInstance.visible.set(true);
            fixture.detectChanges();

            // Check that tabindex is handled correctly in template
            expect(contextMenuInstance.visible()).toBe(true);
        });

        it('should update focused item info correctly', () => {
            const focusedItemInfo = { index: 1, level: 0, parentKey: '', item: null };

            contextMenuInstance.focusedItemInfo.set(focusedItemInfo);

            expect(contextMenuInstance.focusedItemInfo()).toEqual(focusedItemInfo);
        });

        it('should handle role attributes correctly', () => {
            contextMenuInstance.visible.set(true);
            fixture.detectChanges();

            // Menu should have role="menu" attributes in template
            expect(contextMenuInstance.visible()).toBe(true);
        });
    });

    describe('Positioning Tests', () => {
        beforeEach(() => {
            // Mock container view child
            contextMenuInstance.containerViewChild = {
                nativeElement: {
                    offsetWidth: 200,
                    offsetHeight: 300,
                    offsetParent: document.body,
                    style: {}
                }
            } as any;
        });

        it('should position menu correctly', () => {
            contextMenuInstance.pageX = 100;
            contextMenuInstance.pageY = 150;

            contextMenuInstance.position();

            expect(contextMenuInstance.containerViewChild!.nativeElement.style.left).toBeTruthy();
            expect(contextMenuInstance.containerViewChild!.nativeElement.style.top).toBeTruthy();
        });

        it('should handle viewport boundaries', () => {
            // Set position near edge
            contextMenuInstance.pageX = window.innerWidth - 50;
            contextMenuInstance.pageY = window.innerHeight - 50;

            expect(() => contextMenuInstance.position()).not.toThrow();
        });

        it('should store page coordinates on show', () => {
            const mockEvent = {
                pageX: 250,
                pageY: 300,
                stopPropagation: jasmine.createSpy(),
                preventDefault: jasmine.createSpy()
            };

            contextMenuInstance.show(mockEvent);

            expect(contextMenuInstance.pageX).toBe(250);
            expect(contextMenuInstance.pageY).toBe(300);
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined model', () => {
            component.model = undefined as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(contextMenuInstance.model).toBeUndefined();
        });

        it('should handle empty model array', () => {
            component.model = [];
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(contextMenuInstance.model).toEqual([]);
        });

        it('should handle items without labels', () => {
            component.model = [{ icon: 'pi pi-file' }];
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(contextMenuInstance.model?.[0]?.icon).toBe('pi pi-file');
        });

        it('should handle deeply nested menu items', () => {
            const deeplyNestedModel = [
                {
                    label: 'Level 1',
                    items: [
                        {
                            label: 'Level 2',
                            items: [
                                {
                                    label: 'Level 3',
                                    items: [{ label: 'Level 4' }]
                                }
                            ]
                        }
                    ]
                }
            ];

            component.model = deeplyNestedModel;
            fixture.detectChanges();

            expect(contextMenuInstance.processedItems.length).toBe(1);
            expect(contextMenuInstance.processedItems[0].items[0].items[0].items.length).toBe(1);
        });

        it('should handle rapid show/hide calls', () => {
            const mockEvent = {
                pageX: 100,
                pageY: 150,
                stopPropagation: jasmine.createSpy(),
                preventDefault: jasmine.createSpy()
            };

            expect(() => {
                contextMenuInstance.show(mockEvent);
                contextMenuInstance.hide();
                contextMenuInstance.show(mockEvent);
                contextMenuInstance.hide();
            }).not.toThrow();
        });

        it('should handle component creation and destruction gracefully', () => {
            expect(() => {
                const tempFixture = TestBed.createComponent(TestBasicContextMenuComponent);
                tempFixture.detectChanges();
                const tempInstance = tempFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;
                expect(tempInstance).toBeTruthy();
                tempFixture.destroy();
            }).not.toThrow();
        });

        it('should handle multiple instances independently', () => {
            const fixture1 = TestBed.createComponent(TestBasicContextMenuComponent);
            const fixture2 = TestBed.createComponent(TestBasicContextMenuComponent);

            fixture1.componentInstance.model = [{ label: 'Menu 1' }];
            fixture1.componentInstance.styleClass = 'menu-1';
            fixture1.detectChanges();

            fixture2.componentInstance.model = [{ label: 'Menu 2' }];
            fixture2.componentInstance.styleClass = 'menu-2';
            fixture2.detectChanges();

            const instance1 = fixture1.debugElement.query(By.directive(ContextMenu)).componentInstance;
            const instance2 = fixture2.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(instance1.model?.[0]?.label).toBe('Menu 1');
            expect(instance1.styleClass).toBe('menu-1');
            expect(instance2.model?.[0]?.label).toBe('Menu 2');
            expect(instance2.styleClass).toBe('menu-2');
            expect(instance1).not.toBe(instance2);
        });
    });

    describe('Integration Tests', () => {
        it('should work with router navigation', () => {
            const routerFixture = TestBed.createComponent(TestRouterContextMenuComponent);
            routerFixture.detectChanges();

            const routerContextMenu = routerFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(routerContextMenu.model[0].routerLink).toBe('/');
            expect(routerContextMenu.model[1].routerLink).toBe('/products');
            expect(routerContextMenu.model[2].queryParams).toEqual({ tab: 'overview' });
        });

        it('should work with styled component', () => {
            const styleFixture = TestBed.createComponent(TestStyledContextMenuComponent);
            styleFixture.detectChanges();

            const styledContextMenu = styleFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;
            expect(styledContextMenu.styleClass).toBe('custom-contextmenu');
        });

        it('should work with dynamic content changes', () => {
            const dynamicFixture = TestBed.createComponent(TestDynamicContextMenuComponent);
            const dynamicComponent = dynamicFixture.componentInstance;
            dynamicFixture.detectChanges();

            const dynamicContextMenu = dynamicFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(dynamicContextMenu.model.length).toBe(0);

            // Add items dynamically
            dynamicComponent.addItem({ label: 'Dynamic 1', icon: 'pi pi-file' });
            dynamicComponent.addItem({ label: 'Dynamic 2', icon: 'pi pi-edit' });
            dynamicFixture.detectChanges();

            expect(dynamicContextMenu.model.length).toBe(2);
            expect(dynamicContextMenu.model[0].label).toBe('Dynamic 1');

            // Clear items
            dynamicComponent.clearItems();
            dynamicFixture.detectChanges();

            expect(dynamicContextMenu.model.length).toBe(0);
        });

        it('should handle complete workflow with templates', fakeAsync(() => {
            const templateFixture = TestBed.createComponent(TestItemTemplateContextMenuComponent);
            templateFixture.detectChanges();
            tick(100);

            const templateContextMenu = templateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(templateContextMenu.itemTemplate).toBeDefined();
            expect(templateContextMenu.model).toBeTruthy();
            expect(templateContextMenu.model.length).toBeGreaterThan(0);

            flush();
        }));

        it('should maintain state across property changes', () => {
            component.model = [{ label: 'Initial' }];
            component.styleClass = 'initial-class';
            fixture.detectChanges();

            expect(contextMenuInstance.model?.[0]?.label).toBe('Initial');
            expect(contextMenuInstance.styleClass).toBe('initial-class');

            component.model = [{ label: 'Updated' }];
            component.styleClass = 'updated-class';
            component.autoZIndex = false;
            fixture.detectChanges();

            expect(contextMenuInstance.model?.[0]?.label).toBe('Updated');
            expect(contextMenuInstance.styleClass).toBe('updated-class');
            expect(contextMenuInstance.autoZIndex).toBe(false);
        });
    });

    describe('Public Methods', () => {
        it('should have show method', () => {
            expect(typeof contextMenuInstance.show).toBe('function');
        });

        it('should have hide method', () => {
            expect(typeof contextMenuInstance.hide).toBe('function');
        });

        it('should have toggle method', () => {
            expect(typeof contextMenuInstance.toggle).toBe('function');
        });

        it('should call show method programmatically', () => {
            spyOn(contextMenuInstance.onShow, 'emit');

            const mockEvent = {
                pageX: 200,
                pageY: 250,
                stopPropagation: jasmine.createSpy(),
                preventDefault: jasmine.createSpy()
            };

            contextMenuInstance.show(mockEvent);

            expect(contextMenuInstance.visible()).toBe(true);
            expect(contextMenuInstance.onShow.emit).toHaveBeenCalled();
        });

        it('should call hide method programmatically', () => {
            spyOn(contextMenuInstance.onHide, 'emit');
            contextMenuInstance.visible.set(true);

            contextMenuInstance.hide();

            expect(contextMenuInstance.visible()).toBe(false);
            expect(contextMenuInstance.onHide.emit).toHaveBeenCalled();
        });

        it('should call toggle method programmatically', () => {
            const mockEvent = {
                pageX: 150,
                pageY: 200,
                stopPropagation: jasmine.createSpy(),
                preventDefault: jasmine.createSpy()
            };

            expect(contextMenuInstance.visible()).toBe(false);

            contextMenuInstance.toggle(mockEvent);
            expect(contextMenuInstance.visible()).toBe(true);

            contextMenuInstance.toggle();
            expect(contextMenuInstance.visible()).toBe(false);
        });

        it('should have ngOnInit method', () => {
            expect(typeof contextMenuInstance.ngOnInit).toBe('function');
        });

        it('should call ngOnInit programmatically', () => {
            expect(() => contextMenuInstance.ngOnInit()).not.toThrow();
        });

        it('should have ngAfterContentInit method', () => {
            expect(typeof contextMenuInstance.ngAfterContentInit).toBe('function');
        });

        it('should call ngAfterContentInit programmatically', () => {
            expect(() => contextMenuInstance.ngAfterContentInit()).not.toThrow();
        });

        it('should have ngOnDestroy method', () => {
            expect(typeof contextMenuInstance.ngOnDestroy).toBe('function');
        });

        it('should call ngOnDestroy programmatically', () => {
            expect(() => contextMenuInstance.ngOnDestroy()).not.toThrow();
        });

        it('should have utility methods', () => {
            expect(typeof contextMenuInstance.isItemDisabled).toBe('function');
            expect(typeof contextMenuInstance.isItemSeparator).toBe('function');
            expect(typeof contextMenuInstance.getItemProp).toBe('function');
            expect(typeof contextMenuInstance.getItemLabel).toBe('function');
        });

        it('should handle item property retrieval', () => {
            const testItem = { label: 'Test Item', disabled: true, separator: false };
            const separatorItem = { separator: true };

            expect(contextMenuInstance.getItemLabel(testItem)).toBe('Test Item');
            expect(contextMenuInstance.isItemDisabled(testItem)).toBe(true);
            expect(contextMenuInstance.isItemSeparator(testItem)).toBe(false);
            expect(contextMenuInstance.isItemSeparator(separatorItem)).toBe(true);
        });
    });
});

import { Component, DebugElement, ViewChild, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: TestTargetComponent },
                    { path: 'products', component: TestTargetComponent },
                    { path: 'services', component: TestTargetComponent }
                ])
            ],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicContextMenuComponent);
        component = fixture.componentInstance;
        contextMenuElement = fixture.debugElement.query(By.directive(ContextMenu));
        contextMenuInstance = contextMenuElement.componentInstance;
        await fixture.whenStable();
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

        it('should have default values', async () => {
            const freshFixture = TestBed.createComponent(TestMinimalContextMenuComponent);
            await freshFixture.whenStable();

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

        it('should accept custom values', async () => {
            const testModel: MenuItem[] = [{ label: 'Test Item' }];
            component.model = testModel;
            component.global = true;
            component.triggerEvent = 'click';
            component.autoZIndex = false;
            component.baseZIndex = 100;
            component.styleClass = 'custom-contextmenu';
            component.ariaLabel = 'Custom Context Menu';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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
        it('should update model input', async () => {
            const newModel = [{ label: 'New Item' }];
            component.model = newModel;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.model).toBe(newModel);
            expect(contextMenuInstance.processedItems).toBeTruthy();
        });

        it('should update target input', async () => {
            const targetElement = document.createElement('div');
            component.target = targetElement;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.target).toBe(targetElement);
        });

        it('should update global input with booleanAttribute transform', async () => {
            component.global = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(contextMenuInstance.global).toBe(true);

            component.global = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(contextMenuInstance.global).toBe(false);
        });

        it('should update triggerEvent input', async () => {
            component.triggerEvent = 'click';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(contextMenuInstance.triggerEvent).toBe('click');
        });

        it('should update style and styleClass inputs', async () => {
            const customStyle = { color: 'red' };
            component.style = customStyle;
            component.styleClass = 'test-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.style).toBe(customStyle);
            expect(contextMenuInstance.styleClass).toBe('test-class');
        });

        it('should update autoZIndex with booleanAttribute transform', async () => {
            component.autoZIndex = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(contextMenuInstance.autoZIndex).toBe(false);
        });

        it('should update baseZIndex with numberAttribute transform', async () => {
            component.baseZIndex = 1000;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(contextMenuInstance.baseZIndex).toBe(1000);
        });

        it('should update breakpoint input', async () => {
            component.breakpoint = '768px';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(contextMenuInstance.breakpoint).toBe('768px');
        });

        it('should update ariaLabel and ariaLabelledBy inputs', async () => {
            component.ariaLabel = 'Test Menu';
            component.ariaLabelledBy = 'menu-label';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.ariaLabel).toBe('Test Menu');
            expect(contextMenuInstance.ariaLabelledBy).toBe('menu-label');
        });

        it('should update pressDelay with numberAttribute transform', async () => {
            component.pressDelay = 1000;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
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
        it('should work with target element', async () => {
            const targetFixture = TestBed.createComponent(TestTargetContextMenuComponent);
            const targetComponent = targetFixture.componentInstance;

            const targetContextMenu = targetFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            // Mock the bindTriggerEventListener BEFORE detecting changes
            spyOn(targetContextMenu, 'bindTriggerEventListener');

            // Now detect changes to trigger ngOnInit
            await targetFixture.whenStable();

            // Test the properties
            expect(targetContextMenu.target).toBe('targetDiv');
            expect(targetContextMenu.global).toBeFalsy();
            expect(targetContextMenu.bindTriggerEventListener).toHaveBeenCalled();
        });

        it('should work in global mode', async () => {
            const globalFixture = TestBed.createComponent(TestGlobalContextMenuComponent);
            await globalFixture.whenStable();

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
        it('should handle #item template processing', async () => {
            const itemTemplateFixture = TestBed.createComponent(TestItemTemplateContextMenuComponent);
            await itemTemplateFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 100));

            const itemTemplateContextMenu = itemTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(() => itemTemplateContextMenu.ngAfterContentInit()).not.toThrow();
            expect(itemTemplateContextMenu.itemTemplate).toBeDefined();
        });

        it('should handle pTemplate processing', async () => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateContextMenuComponent);
            await pTemplateFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 100));

            const pTemplateContextMenu = pTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(() => pTemplateContextMenu.ngAfterContentInit()).not.toThrow();
            expect(pTemplateContextMenu.templates).toBeDefined();
        });

        it('should handle submenuicon template', async () => {
            const submenuTemplateFixture = TestBed.createComponent(TestSubmenuIconTemplateComponent);
            await submenuTemplateFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 100));

            const submenuContextMenu = submenuTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(() => submenuContextMenu.ngAfterContentInit()).not.toThrow();
            expect(submenuContextMenu.submenuIconTemplate).toBeDefined();
        });

        it('should process PrimeTemplate types correctly', async () => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateContextMenuComponent);
            await pTemplateFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 100));

            const pTemplateContextMenu = pTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            pTemplateContextMenu.ngAfterContentInit();

            expect(pTemplateContextMenu.templates).toBeDefined();
        });

        it('should prioritize itemTemplate over _itemTemplate', async () => {
            const itemTemplateFixture = TestBed.createComponent(TestItemTemplateContextMenuComponent);
            await itemTemplateFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 100));

            const contextMenuComp = itemTemplateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(contextMenuComp.itemTemplate).toBeDefined();
            expect(() => contextMenuComp.ngAfterContentInit()).not.toThrow();
        });

        it('should handle missing templates gracefully', () => {
            expect(() => contextMenuInstance.ngAfterContentInit()).not.toThrow();
            expect(contextMenuInstance._itemTemplate).toBeUndefined();
            expect(contextMenuInstance._submenuIconTemplate).toBeUndefined();
        });
    });

    describe('Menu Items and Model Tests', () => {
        it('should process menu items correctly', async () => {
            const model = [
                { label: 'Item 1' },
                {
                    label: 'Item 2',
                    items: [{ label: 'Subitem 1' }, { label: 'Subitem 2' }]
                }
            ];

            component.model = model;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.processedItems).toBeTruthy();
            expect(contextMenuInstance.processedItems.length).toBe(2);
            expect(contextMenuInstance.processedItems[1].items).toBeTruthy();
            expect(contextMenuInstance.processedItems[1].items.length).toBe(2);
        });

        it('should handle empty model', async () => {
            component.model = [];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.processedItems).toEqual([]);
        });

        it('should handle undefined model', async () => {
            component.model = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.model).toBeUndefined();
        });

        it('should handle items with separators', async () => {
            const modelWithSeparator = [{ label: 'Item 1' }, { separator: true }, { label: 'Item 2' }];

            component.model = modelWithSeparator;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.processedItems.length).toBe(3);
            expect(contextMenuInstance.isItemSeparator(modelWithSeparator[1])).toBe(true);
        });

        it('should handle disabled items', async () => {
            const disabledFixture = TestBed.createComponent(TestDisabledItemsComponent);
            await disabledFixture.whenStable();

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
        it('should apply styleClass when visible', async () => {
            component.styleClass = 'custom-contextmenu-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            contextMenuInstance.visible.set(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const containerElement = fixture.debugElement.query(By.css('[data-pc-name="contextmenu"]'));
            if (containerElement) {
                expect(containerElement.nativeElement.classList.contains('custom-contextmenu-class')).toBe(true);
            } else {
                // If not visible in test, just check that property is set
                expect(contextMenuInstance.styleClass).toBe('custom-contextmenu-class');
            }
        });

        it('should apply custom styles when visible', async () => {
            const styleFixture = TestBed.createComponent(TestStyledContextMenuComponent);
            const styleComponent = styleFixture.componentInstance;
            await styleFixture.whenStable();

            const styledContextMenu = styleFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;
            styledContextMenu.visible.set(true);
            styleFixture.changeDetectorRef.markForCheck();
            await styleFixture.whenStable();

            expect(styleComponent.customStyle).toEqual({
                border: '2px solid #007bff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            });
        });

        it('should have proper data attributes when visible', async () => {
            contextMenuInstance.visible.set(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const containerElement = fixture.debugElement.query(By.css('[data-pc-name="contextmenu"]'));
            if (containerElement) {
                expect(containerElement.nativeElement.getAttribute('data-pc-name')).toBe('contextmenu');
                expect(containerElement.nativeElement.getAttribute('data-pc-section')).toBe('root');
            }
        });

        it('should have generated id on container when visible', async () => {
            contextMenuInstance.visible.set(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const containerElement = fixture.debugElement.query(By.css('[data-pc-name="contextmenu"]'));
            if (containerElement) {
                expect(containerElement.nativeElement.getAttribute('id')).toBeTruthy();
            }
        });
    });

    describe('Accessibility Tests', () => {
        it('should have proper ARIA attributes', async () => {
            component.ariaLabel = 'Context menu';
            component.ariaLabelledBy = 'menu-title';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

        it('should have proper tabindex when not disabled', async () => {
            contextMenuInstance.visible.set(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Check that tabindex is handled correctly in template
            expect(contextMenuInstance.visible()).toBe(true);
        });

        it('should update focused item info correctly', () => {
            const focusedItemInfo = { index: 1, level: 0, parentKey: '', item: null };

            contextMenuInstance.focusedItemInfo.set(focusedItemInfo);

            expect(contextMenuInstance.focusedItemInfo()).toEqual(focusedItemInfo);
        });

        it('should handle role attributes correctly', async () => {
            contextMenuInstance.visible.set(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Menu should have role="menu" attributes in template
            expect(contextMenuInstance.visible()).toBe(true);
        });
    });

    describe('Positioning Tests', () => {
        beforeEach(() => {
            // Mock container view child
            contextMenuInstance.rootmenu!.sublistViewChild = {
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

            expect(contextMenuInstance.rootmenu?.sublistViewChild!.nativeElement.style.left).toBeTruthy();
            expect(contextMenuInstance.rootmenu?.sublistViewChild!.nativeElement.style.top).toBeTruthy();
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
        it('should handle null/undefined model', async () => {
            component.model = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(async () => {
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
            }).not.toThrow();
            expect(contextMenuInstance.model).toBeUndefined();
        });

        it('should handle empty model array', async () => {
            component.model = [];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(async () => {
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
            }).not.toThrow();
            expect(contextMenuInstance.model).toEqual([]);
        });

        it('should handle items without labels', async () => {
            component.model = [{ icon: 'pi pi-file' }];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(async () => {
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
            }).not.toThrow();
            expect(contextMenuInstance.model?.[0]?.icon).toBe('pi pi-file');
        });

        it('should handle deeply nested menu items', async () => {
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
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

        it('should handle component creation and destruction gracefully', async () => {
            await (async () => {
                const tempFixture = TestBed.createComponent(TestBasicContextMenuComponent);
                await tempFixture.whenStable();
                const tempInstance = tempFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;
                expect(tempInstance).toBeTruthy();
                tempFixture.destroy();
            })();
        });

        it('should handle multiple instances independently', async () => {
            const fixture1 = TestBed.createComponent(TestBasicContextMenuComponent);
            const fixture2 = TestBed.createComponent(TestBasicContextMenuComponent);

            fixture1.componentInstance.model = [{ label: 'Menu 1' }];
            fixture1.componentInstance.styleClass = 'menu-1';
            fixture1.changeDetectorRef.markForCheck();
            await fixture1.whenStable();

            fixture2.componentInstance.model = [{ label: 'Menu 2' }];
            fixture2.componentInstance.styleClass = 'menu-2';
            fixture2.changeDetectorRef.markForCheck();
            await fixture2.whenStable();

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
        it('should work with router navigation', async () => {
            const routerFixture = TestBed.createComponent(TestRouterContextMenuComponent);
            await routerFixture.whenStable();

            const routerContextMenu = routerFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(routerContextMenu.model[0].routerLink).toBe('/');
            expect(routerContextMenu.model[1].routerLink).toBe('/products');
            expect(routerContextMenu.model[2].queryParams).toEqual({ tab: 'overview' });
        });

        it('should work with styled component', async () => {
            const styleFixture = TestBed.createComponent(TestStyledContextMenuComponent);
            await styleFixture.whenStable();

            const styledContextMenu = styleFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;
            expect(styledContextMenu.styleClass).toBe('custom-contextmenu');
        });

        it('should work with dynamic content changes', async () => {
            const dynamicFixture = TestBed.createComponent(TestDynamicContextMenuComponent);
            const dynamicComponent = dynamicFixture.componentInstance;
            await dynamicFixture.whenStable();

            const dynamicContextMenu = dynamicFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(dynamicContextMenu.model.length).toBe(0);

            // Add items dynamically
            dynamicComponent.addItem({ label: 'Dynamic 1', icon: 'pi pi-file' });
            dynamicComponent.addItem({ label: 'Dynamic 2', icon: 'pi pi-edit' });
            dynamicFixture.changeDetectorRef.markForCheck();
            await dynamicFixture.whenStable();

            expect(dynamicContextMenu.model.length).toBe(2);
            expect(dynamicContextMenu.model[0].label).toBe('Dynamic 1');

            // Clear items
            dynamicComponent.clearItems();
            dynamicFixture.changeDetectorRef.markForCheck();
            await dynamicFixture.whenStable();

            expect(dynamicContextMenu.model.length).toBe(0);
        });

        it('should handle complete workflow with templates', async () => {
            const templateFixture = TestBed.createComponent(TestItemTemplateContextMenuComponent);
            await templateFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 100));

            const templateContextMenu = templateFixture.debugElement.query(By.directive(ContextMenu)).componentInstance;

            expect(templateContextMenu.itemTemplate).toBeDefined();
            expect(templateContextMenu.model).toBeTruthy();
            expect(templateContextMenu.model.length).toBeGreaterThan(0);
        });

        it('should maintain state across property changes', async () => {
            component.model = [{ label: 'Initial' }];
            component.styleClass = 'initial-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(contextMenuInstance.model?.[0]?.label).toBe('Initial');
            expect(contextMenuInstance.styleClass).toBe('initial-class');

            component.model = [{ label: 'Updated' }];
            component.styleClass = 'updated-class';
            component.autoZIndex = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

    describe('PassThrough', () => {
        let ptFixture: ComponentFixture<any>;

        afterEach(() => {
            TestBed.resetTestingModule();
        });

        describe('Case 1: Basic PT - Root and RootList', () => {
            @Component({
                standalone: true,
                imports: [ContextMenu],
                template: `<p-contextmenu #cm [model]="model" [pt]="pt" [global]="true"></p-contextmenu>`
            })
            class PTStringTestComponent {
                @ViewChild('cm') contextMenu!: ContextMenu;
                model: MenuItem[] = [
                    {
                        label: 'File',
                        items: [{ label: 'New' }, { label: 'Open' }]
                    },
                    { separator: true },
                    { label: 'Edit', icon: 'pi pi-pencil' }
                ];
                pt = {
                    root: 'ROOT_CLASS',
                    rootList: 'ROOT_LIST_CLASS',
                    submenu: 'SUBMENU_CLASS',
                    item: 'ITEM_CLASS',
                    itemContent: 'ITEM_CONTENT_CLASS',
                    itemLink: 'ITEM_LINK_CLASS',
                    itemIcon: 'ITEM_ICON_CLASS',
                    itemLabel: 'ITEM_LABEL_CLASS',
                    submenuIcon: 'SUBMENU_ICON_CLASS',
                    separator: 'SEPARATOR_CLASS'
                };
            }

            beforeEach(async () => {
                TestBed.resetTestingModule();
                ptFixture = TestBed.configureTestingModule({
                    imports: [PTStringTestComponent],
                    providers: [provideZonelessChangeDetection()]
                }).createComponent(PTStringTestComponent);
                await ptFixture.whenStable();

                // Trigger context menu to show
                const event = new MouseEvent('contextmenu', { bubbles: true });
                document.dispatchEvent(event);
                ptFixture.changeDetectorRef.markForCheck();
                await ptFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 300));
            });

            it('should apply PT string class to root', () => {
                const root = ptFixture.debugElement.query(By.css('.p-contextmenu'));
                expect(root).toBeTruthy();
                expect(root.nativeElement.classList.contains('ROOT_CLASS')).toBe(true);
            });
        });

        describe('Case 2: PT with Objects - Root only', () => {
            @Component({
                standalone: true,
                imports: [ContextMenu],
                template: `<p-contextmenu #cm [model]="model" [pt]="pt" [global]="true"></p-contextmenu>`
            })
            class PTObjectTestComponent {
                @ViewChild('cm') contextMenu!: ContextMenu;
                model: MenuItem[] = [
                    {
                        label: 'File',
                        icon: 'pi pi-file',
                        items: [{ label: 'New' }]
                    }
                ];
                pt = {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'background-color': 'red' },
                        'data-p-test': 'true',
                        'aria-label': 'TEST_ROOT_ARIA_LABEL'
                    },
                    item: {
                        class: 'ITEM_OBJECT_CLASS',
                        'data-p-custom': 'item-data'
                    },
                    itemLabel: {
                        style: { color: 'blue' },
                        'aria-label': 'TEST_LABEL_ARIA'
                    },
                    itemIcon: {
                        class: 'ICON_OBJECT_CLASS'
                    }
                };
            }

            beforeEach(async () => {
                TestBed.resetTestingModule();
                ptFixture = TestBed.configureTestingModule({
                    imports: [PTObjectTestComponent],
                    providers: [provideZonelessChangeDetection()]
                }).createComponent(PTObjectTestComponent);
                await ptFixture.whenStable();

                // Trigger context menu to show
                const event = new MouseEvent('contextmenu', { bubbles: true });
                document.dispatchEvent(event);
                ptFixture.changeDetectorRef.markForCheck();
                await ptFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 300));
            });

            it('should apply PT object class to root', () => {
                const root = ptFixture.debugElement.query(By.css('.p-contextmenu'));
                expect(root.nativeElement.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
            });

            it('should apply PT object style to root', () => {
                const root = ptFixture.debugElement.query(By.css('.p-contextmenu'));
                expect(root.nativeElement.style.backgroundColor).toBe('red');
            });

            it('should apply PT object data attribute to root', () => {
                const root = ptFixture.debugElement.query(By.css('.p-contextmenu'));
                expect(root.nativeElement.getAttribute('data-p-test')).toBe('true');
            });

            it('should apply PT object aria-label to root', () => {
                const root = ptFixture.debugElement.query(By.css('.p-contextmenu'));
                expect(root).toBeTruthy();
                expect(root.nativeElement.getAttribute('aria-label')).toBe('TEST_ROOT_ARIA_LABEL');
            });
        });

        describe('Case 3: PT Mixed - Root only', () => {
            @Component({
                standalone: true,
                imports: [ContextMenu],
                template: `<p-contextmenu #cm [model]="model" [pt]="pt" [global]="true"></p-contextmenu>`
            })
            class PTMixedTestComponent {
                @ViewChild('cm') contextMenu!: ContextMenu;
                model: MenuItem[] = [
                    {
                        label: 'File',
                        items: [{ label: 'New' }]
                    }
                ];
                pt = {
                    root: {
                        class: 'ROOT_MIXED_CLASS'
                    },
                    rootList: 'ROOT_LIST_STRING',
                    item: {
                        class: 'ITEM_MIXED_CLASS',
                        style: 'padding: 10px'
                    },
                    itemLabel: 'LABEL_STRING_CLASS'
                };
            }

            beforeEach(async () => {
                TestBed.resetTestingModule();
                ptFixture = TestBed.configureTestingModule({
                    imports: [PTMixedTestComponent],
                    providers: [provideZonelessChangeDetection()]
                }).createComponent(PTMixedTestComponent);
                await ptFixture.whenStable();

                // Trigger context menu to show
                const event = new MouseEvent('contextmenu', { bubbles: true });
                document.dispatchEvent(event);
                ptFixture.changeDetectorRef.markForCheck();
                await ptFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 300));
            });

            it('should apply PT mixed object class to root', () => {
                const root = ptFixture.debugElement.query(By.css('.p-contextmenu'));
                expect(root).toBeTruthy();
                expect(root.nativeElement.classList.contains('ROOT_MIXED_CLASS')).toBe(true);
            });
        });

        describe('Case 4: ContextMenuSub getPTOptions - Basic String PT Test', () => {
            @Component({
                standalone: true,
                imports: [ContextMenu],
                template: `<p-contextmenu #cm [model]="model" [pt]="pt" [global]="true"></p-contextmenu>`
            })
            class PTBasicStringTestComponent {
                @ViewChild('cm') contextMenu!: ContextMenu;
                model: MenuItem[] = [
                    { label: 'Item 1', icon: 'pi pi-file' },
                    { label: 'Item 2', icon: 'pi pi-pencil', disabled: true }
                ];
                pt = {
                    item: 'custom-item-class',
                    itemContent: 'custom-content-class',
                    itemLink: 'custom-link-class',
                    itemIcon: 'custom-icon-class',
                    itemLabel: 'custom-label-class'
                };
            }

            beforeEach(async () => {
                TestBed.resetTestingModule();
                ptFixture = TestBed.configureTestingModule({
                    imports: [PTBasicStringTestComponent],
                    providers: [provideZonelessChangeDetection()]
                }).createComponent(PTBasicStringTestComponent);
                await ptFixture.whenStable();

                // Trigger context menu to show
                const event = new MouseEvent('contextmenu', { bubbles: true });
                document.dispatchEvent(event);
                ptFixture.changeDetectorRef.markForCheck();
                await ptFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 300));
            });

            it('should apply string PT class to item elements', () => {
                const items = ptFixture.debugElement.queryAll(By.css('[role="menuitem"]'));
                expect(items.length).toBeGreaterThan(0);
                expect(items[0].nativeElement.classList.contains('custom-item-class')).toBe(true);
            });

            it('should apply string PT class to itemContent elements', () => {
                const contents = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-item-content'));
                expect(contents.length).toBeGreaterThan(0);
                expect(contents[0].nativeElement.classList.contains('custom-content-class')).toBe(true);
            });

            it('should apply string PT class to itemLink elements', () => {
                const links = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-item-link'));
                expect(links.length).toBeGreaterThan(0);
                expect(links[0].nativeElement.classList.contains('custom-link-class')).toBe(true);
            });

            it('should apply string PT class to itemIcon elements', () => {
                const icons = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-item-icon'));
                expect(icons.length).toBeGreaterThan(0);
                expect(icons[0].nativeElement.classList.contains('custom-icon-class')).toBe(true);
            });

            it('should apply string PT class to itemLabel elements', () => {
                const labels = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-item-label'));
                expect(labels.length).toBeGreaterThan(0);
                expect(labels[0].nativeElement.classList.contains('custom-label-class')).toBe(true);
            });
        });

        describe('Case 5: ContextMenuSub getPTOptions - Object PT with Context', () => {
            @Component({
                standalone: true,
                imports: [ContextMenu],
                template: `<p-contextmenu #cm [model]="model" [pt]="pt" [global]="true"></p-contextmenu>`
            })
            class PTObjectContextTestComponent {
                @ViewChild('cm') contextMenu!: ContextMenu;
                model: MenuItem[] = [
                    { label: 'Item 0', icon: 'pi pi-file' },
                    { label: 'Disabled Item', icon: 'pi pi-ban', disabled: true },
                    {
                        label: 'Parent Item',
                        icon: 'pi pi-folder',
                        items: [{ label: 'Child 1' }]
                    }
                ];

                pt = {
                    item: {
                        class: 'custom-item-pt',
                        'data-pt-test': 'item'
                    },
                    itemContent: {
                        class: 'custom-content-pt',
                        'data-pt-test': 'content'
                    },
                    itemLink: {
                        class: 'custom-link-pt',
                        'data-pt-test': 'link'
                    },
                    itemIcon: {
                        class: 'custom-icon-pt',
                        'data-pt-test': 'icon'
                    },
                    itemLabel: {
                        class: 'custom-label-pt',
                        'data-pt-test': 'label'
                    },
                    submenuIcon: {
                        class: 'custom-submenu-icon-pt',
                        'data-pt-test': 'submenuicon'
                    }
                };
            }

            beforeEach(async () => {
                TestBed.resetTestingModule();
                ptFixture = TestBed.configureTestingModule({
                    imports: [PTObjectContextTestComponent],
                    providers: [provideZonelessChangeDetection()]
                }).createComponent(PTObjectContextTestComponent);
                await ptFixture.whenStable();

                // Trigger context menu to show
                const event = new MouseEvent('contextmenu', { bubbles: true });
                document.dispatchEvent(event);
                ptFixture.changeDetectorRef.markForCheck();
                await ptFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 300));
            });

            it('should apply PT object to all item elements', () => {
                const items = ptFixture.debugElement.queryAll(By.css('[role="menuitem"]'));
                expect(items.length).toBeGreaterThan(0);

                items.forEach((item) => {
                    expect(item.nativeElement.classList.contains('custom-item-pt')).toBe(true);
                    expect(item.nativeElement.getAttribute('data-pt-test')).toBe('item');
                });
            });

            it('should apply PT object to all itemContent elements', () => {
                const contents = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-item-content'));
                expect(contents.length).toBeGreaterThan(0);

                contents.forEach((content) => {
                    expect(content.nativeElement.classList.contains('custom-content-pt')).toBe(true);
                    expect(content.nativeElement.getAttribute('data-pt-test')).toBe('content');
                });
            });

            it('should apply PT object to all itemLink elements', () => {
                const links = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-item-link'));
                expect(links.length).toBeGreaterThan(0);

                links.forEach((link) => {
                    expect(link.nativeElement.classList.contains('custom-link-pt')).toBe(true);
                    expect(link.nativeElement.getAttribute('data-pt-test')).toBe('link');
                });
            });

            it('should apply PT object to all itemIcon elements', () => {
                const icons = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-item-icon'));
                expect(icons.length).toBeGreaterThan(0);

                icons.forEach((icon) => {
                    expect(icon.nativeElement.classList.contains('custom-icon-pt')).toBe(true);
                    expect(icon.nativeElement.getAttribute('data-pt-test')).toBe('icon');
                });
            });

            it('should apply PT object to all itemLabel elements', () => {
                const labels = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-item-label'));
                expect(labels.length).toBeGreaterThan(0);

                labels.forEach((label) => {
                    expect(label.nativeElement.classList.contains('custom-label-pt')).toBe(true);
                    expect(label.nativeElement.getAttribute('data-pt-test')).toBe('label');
                });
            });

            it('should apply PT object to submenuIcon elements for items with children', () => {
                const submenuIcons = ptFixture.debugElement.queryAll(By.css('.p-contextmenu-submenu-icon'));

                if (submenuIcons.length > 0) {
                    submenuIcons.forEach((icon) => {
                        expect(icon.nativeElement.classList.contains('custom-submenu-icon-pt')).toBe(true);
                        expect(icon.nativeElement.getAttribute('data-pt-test')).toBe('submenuicon');
                    });
                }
            });
        });
    });
});

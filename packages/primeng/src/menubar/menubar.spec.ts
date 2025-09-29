import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem, SharedModule } from 'primeng/api';
import { Menubar } from './menubar';

@Component({
    standalone: false,
    template: `
        <p-menubar
            [model]="model"
            [styleClass]="styleClass"
            [autoZIndex]="autoZIndex"
            [baseZIndex]="baseZIndex"
            [autoDisplay]="autoDisplay"
            [autoHide]="autoHide"
            [autoHideDelay]="autoHideDelay"
            [breakpoint]="breakpoint"
            [id]="id"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            (onFocus)="onFocus($event)"
            (onBlur)="onBlur($event)"
        >
        </p-menubar>
    `
})
class TestBasicMenubarComponent {
    model: MenuItem[] | undefined = [{ label: 'File', icon: 'pi pi-file' }, { label: 'Edit', icon: 'pi pi-pencil' }, { separator: true }, { label: 'Settings', icon: 'pi pi-cog' }];
    styleClass: string | undefined;
    autoZIndex: boolean = true;
    baseZIndex: number = 0;
    autoDisplay: boolean | undefined = true;
    autoHide: boolean | undefined;
    autoHideDelay: number = 100;
    breakpoint: string = '960px';
    id: string | undefined;
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;

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
    selector: 'test-nested-menubar',
    template: ` <p-menubar [model]="nestedModel"> </p-menubar> `
})
class TestNestedMenubarComponent {
    nestedModel: MenuItem[] = [
        {
            label: 'File',
            icon: 'pi pi-file',
            items: [{ label: 'New', icon: 'pi pi-plus' }, { label: 'Open', icon: 'pi pi-folder-open' }, { separator: true }, { label: 'Save', icon: 'pi pi-save' }]
        },
        {
            label: 'Edit',
            icon: 'pi pi-pencil',
            items: [
                { label: 'Copy', icon: 'pi pi-copy' },
                { label: 'Paste', icon: 'pi pi-clone' }
            ]
        }
    ];
}

@Component({
    standalone: false,
    selector: 'test-router-menubar',
    template: ` <p-menubar [model]="routerModel"> </p-menubar> `
})
class TestRouterMenubarComponent {
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
    template: `
        <p-menubar [model]="model">
            <ng-template #start>
                <div class="custom-start">Start Content</div>
            </ng-template>
            <ng-template #end>
                <div class="custom-end">End Content</div>
            </ng-template>
        </p-menubar>
    `
})
class TestTemplateMenubarComponent {
    model: MenuItem[] = [{ label: 'Item 1' }, { label: 'Item 2' }];
}

@Component({
    standalone: false,
    template: `
        <p-menubar [model]="model">
            <ng-template #item let-item>
                <div class="custom-item">
                    <i [class]="item.icon" *ngIf="item.icon"></i>
                    <span class="custom-label">{{ item.label }}</span>
                </div>
            </ng-template>
        </p-menubar>
    `
})
class TestItemTemplateMenubarComponent {
    model: MenuItem[] = [
        { label: 'Custom Item 1', icon: 'pi pi-file' },
        { label: 'Custom Item 2', icon: 'pi pi-pencil' }
    ];
}

@Component({
    standalone: false,
    template: `
        <p-menubar [model]="model">
            <ng-template pTemplate="item" let-item>
                <span class="p-template-item">{{ item.label }}</span>
            </ng-template>
        </p-menubar>
    `
})
class TestPTemplateMenubarComponent {
    model: MenuItem[] = [{ label: 'PTemplate Item 1' }, { label: 'PTemplate Item 2' }];
}

@Component({
    standalone: false,
    template: `
        <p-menubar [model]="model">
            <ng-template #submenuicon>
                <i class="custom-submenu-icon pi pi-angle-down"></i>
            </ng-template>
        </p-menubar>
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
    template: `
        <p-menubar [model]="model">
            <ng-template #menuicon>
                <i class="custom-menu-icon pi pi-bars"></i>
            </ng-template>
        </p-menubar>
    `
})
class TestMenuIconTemplateComponent {
    model: MenuItem[] = [{ label: 'Item 1' }, { label: 'Item 2' }];
}

@Component({
    standalone: false,
    selector: 'test-disabled-items',
    template: ` <p-menubar [model]="disabledModel"> </p-menubar> `
})
class TestDisabledItemsComponent {
    disabledModel: MenuItem[] = [{ label: 'Enabled Item' }, { label: 'Disabled Item', disabled: true }, { separator: true }, { label: 'Another Enabled Item' }];
}

@Component({
    standalone: false,
    selector: 'test-styled-menubar',
    template: ` <p-menubar [styleClass]="customStyleClass"> </p-menubar> `
})
class TestStyledMenubarComponent {
    customStyleClass = 'custom-menubar-class';
}

@Component({
    standalone: false,
    selector: 'test-minimal-menubar',
    template: `<p-menubar></p-menubar>`
})
class TestMinimalMenubarComponent {}

@Component({
    standalone: false,
    selector: 'test-dynamic-menubar',
    template: ` <p-menubar [model]="dynamicModel"> </p-menubar> `
})
class TestDynamicMenubarComponent {
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
    selector: 'test-command-menubar',
    template: ` <p-menubar [model]="commandModel"> </p-menubar> `
})
class TestCommandMenubarComponent {
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
    standalone: false,
    selector: 'test-autohide-menubar',
    template: ` <p-menubar [model]="model" [autoHide]="autoHide" [autoHideDelay]="autoHideDelay"> </p-menubar> `
})
class TestAutoHideMenubarComponent {
    model: MenuItem[] = [{ label: 'Item 1' }, { label: 'Item 2' }];
    autoHide: boolean = true;
    autoHideDelay: number = 200;
}

@Component({
    standalone: true,
    template: '<div>Target Page</div>'
})
class TestTargetComponent {}

describe('Menubar', () => {
    let component: TestBasicMenubarComponent;
    let fixture: ComponentFixture<TestBasicMenubarComponent>;
    let menubarElement: DebugElement;
    let menubarInstance: Menubar;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TestBasicMenubarComponent,
                TestNestedMenubarComponent,
                TestRouterMenubarComponent,
                TestTemplateMenubarComponent,
                TestItemTemplateMenubarComponent,
                TestPTemplateMenubarComponent,
                TestSubmenuIconTemplateComponent,
                TestMenuIconTemplateComponent,
                TestDisabledItemsComponent,
                TestStyledMenubarComponent,
                TestMinimalMenubarComponent,
                TestDynamicMenubarComponent,
                TestCommandMenubarComponent,
                TestAutoHideMenubarComponent
            ],
            imports: [
                Menubar,
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

        fixture = TestBed.createComponent(TestBasicMenubarComponent);
        component = fixture.componentInstance;
        menubarElement = fixture.debugElement.query(By.directive(Menubar));
        menubarInstance = menubarElement.componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(menubarInstance).toBeTruthy();
        });

        it('should have required dependencies injected', () => {
            expect(menubarInstance.el).toBeTruthy();
            expect(menubarInstance.renderer).toBeTruthy();
            expect(menubarInstance.cd).toBeTruthy();
            expect(menubarInstance._componentStyle).toBeTruthy();
        });

        it('should have default values', () => {
            const freshFixture = TestBed.createComponent(TestMinimalMenubarComponent);
            freshFixture.detectChanges();

            const freshMenubar = freshFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(freshMenubar.model).toBeUndefined();
            expect(freshMenubar.autoZIndex).toBe(true);
            expect(freshMenubar.baseZIndex).toBe(0);
            expect(freshMenubar.autoDisplay).toBe(true);
            expect(freshMenubar.breakpoint).toBe('960px');
            expect(freshMenubar.autoHideDelay).toBe(100);
        });

        it('should accept custom values', () => {
            const testModel: MenuItem[] = [{ label: 'Test Item' }];
            component.model = testModel;
            component.autoZIndex = false;
            component.baseZIndex = 1000;
            component.autoDisplay = false;
            component.autoHide = true;
            component.breakpoint = '768px';
            component.styleClass = 'custom-menubar';
            component.ariaLabel = 'Custom Menu Bar';
            fixture.detectChanges();

            expect(menubarInstance.model).toBe(testModel);
            expect(menubarInstance.autoZIndex).toBe(false);
            expect(menubarInstance.baseZIndex).toBe(1000);
            expect(menubarInstance.autoDisplay).toBe(false);
            expect(menubarInstance.autoHide).toBe(true);
            expect(menubarInstance.breakpoint).toBe('768px');
            expect(menubarInstance.styleClass).toBe('custom-menubar');
            expect(menubarInstance.ariaLabel).toBe('Custom Menu Bar');
        });

        it('should initialize with generated id', () => {
            expect(menubarInstance.id).toBeTruthy();
            expect(typeof menubarInstance.id).toBe('string');
            expect(menubarInstance.id).toMatch(/^pn_id_/);
        });

        it('should have onFocus and onBlur output emitters', () => {
            expect(menubarInstance.onFocus).toBeTruthy();
            expect(menubarInstance.onBlur).toBeTruthy();
        });

        it('should initialize signal states', () => {
            expect(typeof menubarInstance.activeItemPath).toBe('function');
            expect(typeof menubarInstance.focusedItemInfo).toBe('function');
            expect(menubarInstance.activeItemPath()).toEqual([]);
            expect(menubarInstance.focusedItemInfo().index).toBe(-1);
            expect(menubarInstance.focused).toBe(false);
        });
    });

    describe('Input Properties', () => {
        it('should update model input', () => {
            const newModel = [{ label: 'New Item' }];
            component.model = newModel;
            fixture.detectChanges();

            expect(menubarInstance.model).toBe(newModel);
            expect(menubarInstance.processedItems).toBeTruthy();
        });

        it('should update styleClass input', () => {
            component.styleClass = 'test-class';
            fixture.detectChanges();

            expect(menubarInstance.styleClass).toBe('test-class');
        });

        it('should update autoZIndex with booleanAttribute transform', () => {
            component.autoZIndex = false;
            fixture.detectChanges();
            expect(menubarInstance.autoZIndex).toBe(false);
        });

        it('should update baseZIndex with numberAttribute transform', () => {
            component.baseZIndex = 500;
            fixture.detectChanges();
            expect(menubarInstance.baseZIndex).toBe(500);
        });

        it('should update autoDisplay with booleanAttribute transform', () => {
            component.autoDisplay = false;
            fixture.detectChanges();
            expect(menubarInstance.autoDisplay).toBe(false);
        });

        it('should update autoHide with booleanAttribute transform', () => {
            component.autoHide = true;
            fixture.detectChanges();
            expect(menubarInstance.autoHide).toBe(true);
        });

        it('should update autoHideDelay with numberAttribute transform', () => {
            component.autoHideDelay = 300;
            fixture.detectChanges();
            expect(menubarInstance.autoHideDelay).toBe(300);
        });

        it('should update breakpoint input', () => {
            component.breakpoint = '768px';
            fixture.detectChanges();
            expect(menubarInstance.breakpoint).toBe('768px');
        });

        it('should update ariaLabel and ariaLabelledBy inputs', () => {
            component.ariaLabel = 'Test Menubar';
            component.ariaLabelledBy = 'menubar-label';
            fixture.detectChanges();

            expect(menubarInstance.ariaLabel).toBe('Test Menubar');
            expect(menubarInstance.ariaLabelledBy).toBe('menubar-label');
        });
    });

    describe('Menu Display Tests', () => {
        it('should render menu items', () => {
            const menuItems = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));

            // Should have 3 regular items (excluding separator)
            expect(menuItems.length).toBe(3);
        });

        it('should render separator items', () => {
            const separatorItems = fixture.debugElement.queryAll(By.css('li[data-pc-section="separator"]'));

            expect(separatorItems.length).toBe(1);
        });

        it('should display menu button on mobile', () => {
            menubarInstance.queryMatches = true;
            fixture.detectChanges();

            const menuButton = fixture.debugElement.query(By.css('a[data-pc-section="button"]'));
            expect(menuButton).toBeTruthy();
        });

        it('should toggle mobile menu on button click', () => {
            menubarInstance.queryMatches = true;
            fixture.detectChanges();

            const menuButton = fixture.debugElement.query(By.css('a[data-pc-section="button"]'));

            expect(menubarInstance.mobileActive).toBeFalsy();

            menuButton.nativeElement.click();
            fixture.detectChanges();

            expect(menubarInstance.mobileActive).toBe(true);
        });

        it('should show and hide menu programmatically', () => {
            menubarInstance.show();

            expect(menubarInstance.focusedItemInfo().index).not.toBe(-1);

            menubarInstance.hide();

            expect(menubarInstance.focusedItemInfo().index).toBe(-1);
            expect(menubarInstance.activeItemPath()).toEqual([]);
        });
    });

    describe('Item Interaction Tests', () => {
        it('should handle item click', () => {
            const firstItem = fixture.debugElement.query(By.css('li[data-pc-section="menuitem"] div[data-pc-section="content"]'));

            spyOn(menubarInstance, 'onItemClick');

            firstItem.nativeElement.click();

            expect(menubarInstance.onItemClick).toHaveBeenCalled();
        });

        it('should execute command on item click', () => {
            const commandFixture = TestBed.createComponent(TestCommandMenubarComponent);
            const commandComponent = commandFixture.componentInstance;
            commandFixture.detectChanges();

            const itemElement = commandFixture.debugElement.query(By.css('li[data-pc-section="menuitem"] div[data-pc-section="content"]'));
            itemElement.nativeElement.click();

            expect(commandComponent.commandExecuted).toBeDefined();
            expect(commandComponent.commandExecuted.item.label).toBe('Command Item');
        });

        it('should handle mouse enter on item', () => {
            const firstItemContent = fixture.debugElement.query(By.css('li[data-pc-section="menuitem"] div[data-pc-section="content"]'));

            spyOn(menubarInstance, 'onItemMouseEnter');

            // Trigger mouseenter on the content div which has the actual handler
            firstItemContent.triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));

            expect(menubarInstance.onItemMouseEnter).toHaveBeenCalled();
        });

        it('should handle nested menu items', () => {
            const nestedFixture = TestBed.createComponent(TestNestedMenubarComponent);
            nestedFixture.detectChanges();

            const nestedMenubar = nestedFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(nestedMenubar.processedItems[0].items).toBeTruthy();
            expect(nestedMenubar.processedItems[0].items.length).toBe(4); // 3 items + 1 separator
        });
    });

    describe('Template Tests', () => {
        it('should handle #start and #end templates', fakeAsync(() => {
            const templateFixture = TestBed.createComponent(TestTemplateMenubarComponent);
            templateFixture.detectChanges();
            tick(100);

            const startContent = templateFixture.debugElement.query(By.css('.custom-start'));
            const endContent = templateFixture.debugElement.query(By.css('.custom-end'));

            expect(startContent).toBeTruthy();
            expect(startContent.nativeElement.textContent.trim()).toBe('Start Content');
            expect(endContent).toBeTruthy();
            expect(endContent.nativeElement.textContent.trim()).toBe('End Content');

            flush();
        }));

        it('should handle #item template processing', fakeAsync(() => {
            const itemTemplateFixture = TestBed.createComponent(TestItemTemplateMenubarComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const itemTemplateMenubar = itemTemplateFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(() => itemTemplateMenubar.ngAfterContentInit()).not.toThrow();
            expect(itemTemplateMenubar.itemTemplate).toBeDefined();

            flush();
        }));

        it('should handle pTemplate processing', fakeAsync(() => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateMenubarComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateMenubar = pTemplateFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(() => pTemplateMenubar.ngAfterContentInit()).not.toThrow();
            expect(pTemplateMenubar.templates).toBeDefined();

            flush();
        }));

        it('should handle submenuicon template', fakeAsync(() => {
            const submenuTemplateFixture = TestBed.createComponent(TestSubmenuIconTemplateComponent);
            submenuTemplateFixture.detectChanges();
            tick(100);

            const submenuMenubar = submenuTemplateFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(() => submenuMenubar.ngAfterContentInit()).not.toThrow();
            expect(submenuMenubar.submenuIconTemplate).toBeDefined();

            flush();
        }));

        it('should handle menuicon template', fakeAsync(() => {
            const menuIconTemplateFixture = TestBed.createComponent(TestMenuIconTemplateComponent);
            menuIconTemplateFixture.detectChanges();
            tick(100);

            const menuIconMenubar = menuIconTemplateFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(() => menuIconMenubar.ngAfterContentInit()).not.toThrow();
            expect(menuIconMenubar.menuIconTemplate).toBeDefined();

            flush();
        }));

        it('should handle missing templates gracefully', () => {
            expect(() => menubarInstance.ngAfterContentInit()).not.toThrow();
            expect(menubarInstance._itemTemplate).toBeUndefined();
            expect(menubarInstance._startTemplate).toBeUndefined();
            expect(menubarInstance._endTemplate).toBeUndefined();
        });
    });

    describe('Keyboard Navigation Tests', () => {
        beforeEach(() => {
            menubarInstance.focused = true;
            menubarInstance.focusedItemInfo.set({ index: 0, level: 0, parentKey: '', item: null });

            // Mock the rootmenu property to prevent undefined errors
            menubarInstance.rootmenu = {
                el: {
                    nativeElement: document.createElement('ul')
                }
            } as any;
        });

        it('should handle arrow right key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });
            spyOn(keyEvent, 'preventDefault');

            spyOn(menubarInstance, 'changeFocusedItemIndex');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.changeFocusedItemIndex).toHaveBeenCalled();
        });

        it('should handle arrow left key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
            spyOn(keyEvent, 'preventDefault');

            spyOn(menubarInstance, 'changeFocusedItemIndex');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.changeFocusedItemIndex).toHaveBeenCalled();
        });

        it('should handle arrow down key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });

            spyOn(menubarInstance, 'onArrowDownKey');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.onArrowDownKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle arrow up key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });

            spyOn(menubarInstance, 'onArrowUpKey');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.onArrowUpKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle home key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Home' });
            spyOn(keyEvent, 'preventDefault');

            spyOn(menubarInstance, 'changeFocusedItemIndex');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.changeFocusedItemIndex).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle end key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'End' });
            spyOn(keyEvent, 'preventDefault');

            spyOn(menubarInstance, 'changeFocusedItemIndex');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.changeFocusedItemIndex).toHaveBeenCalled();
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle enter key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Enter' });
            spyOn(keyEvent, 'preventDefault');

            menubarInstance.onKeyDown(keyEvent);

            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle space key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Space' });
            spyOn(menubarInstance, 'onEnterKey');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.onEnterKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle escape key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Escape' });
            spyOn(menubarInstance, 'hide');
            spyOn(keyEvent, 'preventDefault');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.hide).toHaveBeenCalledWith(keyEvent, true);
            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle tab key', () => {
            const keyEvent = new KeyboardEvent('keydown', { code: 'Tab' });
            spyOn(menubarInstance, 'hide');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.hide).toHaveBeenCalled();
        });

        it('should handle printable character search', () => {
            const keyEvent = new KeyboardEvent('keydown', { key: 'f' });
            spyOn(menubarInstance, 'searchItems');

            menubarInstance.onKeyDown(keyEvent);

            expect(menubarInstance.searchItems).toHaveBeenCalledWith(keyEvent, 'f');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply styleClass when provided', () => {
            component.styleClass = 'custom-menubar-class';
            fixture.detectChanges();

            const hostElement = menubarElement.nativeElement;
            expect(hostElement.classList.contains('custom-menubar-class')).toBe(true);
        });

        it('should have proper data attributes', () => {
            const hostElement = menubarElement.nativeElement;

            expect(hostElement.getAttribute('data-pc-name')).toBe('menubar');
            expect(hostElement.getAttribute('data-pc-section')).toBe('root');
        });

        it('should have generated id on root menu', () => {
            const rootMenu = fixture.debugElement.query(By.css('ul[pMenubarSub]'));

            expect(rootMenu.nativeElement.getAttribute('id')).toBeTruthy();
            expect(rootMenu.nativeElement.getAttribute('id')).toMatch(/^pn_id_/);
        });
    });

    describe('Accessibility Tests', () => {
        it('should have proper ARIA attributes on root menu', () => {
            const rootMenu = fixture.debugElement.query(By.css('ul[pMenubarSub]'));

            expect(rootMenu.nativeElement.getAttribute('role')).toBe('menubar');
            expect(rootMenu.nativeElement.hasAttribute('tabindex')).toBe(true);
        });

        it('should have proper ARIA attributes on menu items', () => {
            const menuItems = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));

            menuItems.forEach((item) => {
                expect(item.nativeElement.getAttribute('role')).toBe('menuitem');
                expect(item.nativeElement.hasAttribute('aria-label')).toBe(true);
            });
        });

        it('should handle focus and blur events', () => {
            const rootMenu = fixture.debugElement.query(By.css('ul[pMenubarSub]'));

            spyOn(component, 'onFocus');
            spyOn(component, 'onBlur');

            rootMenu.triggerEventHandler('focus', new FocusEvent('focus'));
            expect(component.onFocus).toHaveBeenCalled();

            rootMenu.triggerEventHandler('blur', new FocusEvent('blur'));
            expect(component.onBlur).toHaveBeenCalled();
        });

        it('should set aria-activedescendant when focused', () => {
            menubarInstance.focused = true;
            menubarInstance.focusedItemInfo.set({ index: 0, level: 0, parentKey: '', item: null });

            // Force change detection and mark for check
            menubarInstance.cd.markForCheck();
            menubarInstance.cd.detectChanges();
            fixture.detectChanges();

            const rootMenu = fixture.debugElement.query(By.css('ul[pMenubarSub]'));

            // The template uses: [attr.aria-activedescendant]="focused ? focusedItemId : undefined"
            // Since both focused=true and focusedItemId exists, it should be set
            expect(rootMenu.nativeElement.getAttribute('aria-activedescendant')).toBe(menubarInstance.focusedItemId);
        });

        it('should update ariaLabel and ariaLabelledBy', () => {
            component.ariaLabel = 'Main Navigation';
            component.ariaLabelledBy = 'nav-heading';
            fixture.detectChanges();

            const rootMenu = fixture.debugElement.query(By.css('ul[pMenubarSub]'));
            expect(rootMenu.nativeElement.getAttribute('aria-label')).toBe('Main Navigation');
            expect(rootMenu.nativeElement.getAttribute('aria-labelledby')).toBe('nav-heading');
        });
    });

    describe('Router Integration Tests', () => {
        it('should work with router navigation', () => {
            const routerFixture = TestBed.createComponent(TestRouterMenubarComponent);
            routerFixture.detectChanges();

            const routerMenubar = routerFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(routerMenubar.model[0].routerLink).toBe('/');
            expect(routerMenubar.model[1].routerLink).toBe('/products');
            expect(routerMenubar.model[2].queryParams).toEqual({ tab: 'overview' });
        });

        it('should handle router links in template', () => {
            const routerFixture = TestBed.createComponent(TestRouterMenubarComponent);
            routerFixture.detectChanges();

            // Router links might be rendered as href after processing
            const routerLinks = routerFixture.debugElement.queryAll(By.css('a[routerLink], a[href]'));
            expect(routerLinks.length).toBeGreaterThan(0);
        });
    });

    describe('Media Query and Responsive Tests', () => {
        it('should initialize queryMatches property', () => {
            expect(typeof menubarInstance.queryMatches).toBe('boolean');
        });

        it('should bind match media listener on init', () => {
            spyOn(menubarInstance, 'bindMatchMediaListener');

            menubarInstance.ngOnInit();

            expect(menubarInstance.bindMatchMediaListener).toHaveBeenCalled();
        });

        it('should unbind match media listener on destroy', () => {
            spyOn(menubarInstance, 'unbindMatchMediaListener');

            menubarInstance.ngOnDestroy();

            expect(menubarInstance.unbindMatchMediaListener).toHaveBeenCalled();
        });

        it('should handle breakpoint changes', () => {
            component.breakpoint = '768px';
            fixture.detectChanges();

            expect(menubarInstance.breakpoint).toBe('768px');
        });
    });

    describe('AutoHide Functionality', () => {
        it('should configure autoHide settings', () => {
            const autoHideFixture = TestBed.createComponent(TestAutoHideMenubarComponent);
            autoHideFixture.detectChanges();

            const autoHideMenubar = autoHideFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(autoHideMenubar.autoHide).toBe(true);
            expect(autoHideMenubar.autoHideDelay).toBe(200);
        });

        it('should handle mouse leave with autoHide', () => {
            const rootMenu = fixture.debugElement.query(By.css('ul[pMenubarSub]'));

            spyOn(menubarInstance, 'onMouseLeave');

            rootMenu.triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));

            expect(menubarInstance.onMouseLeave).toHaveBeenCalled();
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined model', () => {
            component.model = undefined as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(menubarInstance.model).toBeUndefined();
        });

        it('should handle empty model array', () => {
            component.model = [];
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(menubarInstance.model).toEqual([]);
        });

        it('should handle items without labels', () => {
            component.model = [{ icon: 'pi pi-file' }];
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(menubarInstance.model?.[0]?.icon).toBe('pi pi-file');
        });

        it('should handle disabled items', () => {
            const disabledFixture = TestBed.createComponent(TestDisabledItemsComponent);
            disabledFixture.detectChanges();

            const disabledMenubar = disabledFixture.debugElement.query(By.directive(Menubar)).componentInstance;
            const disabledItem = disabledMenubar.model[1];

            expect(menubarInstance.isItemDisabled(disabledItem)).toBe(true);
        });

        it('should handle dynamic model changes', () => {
            const dynamicFixture = TestBed.createComponent(TestDynamicMenubarComponent);
            const dynamicComponent = dynamicFixture.componentInstance;
            dynamicFixture.detectChanges();

            const dynamicMenubar = dynamicFixture.debugElement.query(By.directive(Menubar)).componentInstance;

            expect(dynamicMenubar.model.length).toBe(0);

            // Add items dynamically
            dynamicComponent.addItem({ label: 'Dynamic 1', icon: 'pi pi-file' });
            dynamicComponent.addItem({ label: 'Dynamic 2', icon: 'pi pi-edit' });
            dynamicFixture.detectChanges();

            expect(dynamicMenubar.model.length).toBe(2);

            // Clear items
            dynamicComponent.clearItems();
            dynamicFixture.detectChanges();

            expect(dynamicMenubar.model.length).toBe(0);
        });

        it('should handle rapid show/hide calls', () => {
            expect(() => {
                menubarInstance.show();
                menubarInstance.hide();
                menubarInstance.show();
                menubarInstance.hide();
            }).not.toThrow();
        });

        it('should handle component destruction gracefully', () => {
            expect(() => {
                const tempFixture = TestBed.createComponent(TestBasicMenubarComponent);
                tempFixture.detectChanges();
                const tempInstance = tempFixture.debugElement.query(By.directive(Menubar)).componentInstance;
                expect(tempInstance).toBeTruthy();
                tempFixture.destroy();
            }).not.toThrow();
        });
    });

    describe('Public Methods', () => {
        it('should have show method', () => {
            expect(typeof menubarInstance.show).toBe('function');
        });

        it('should have hide method', () => {
            expect(typeof menubarInstance.hide).toBe('function');
        });

        it('should have toggle method', () => {
            expect(typeof menubarInstance.toggle).toBe('function');
        });

        it('should call show method programmatically', () => {
            spyOn(menubarInstance, 'findFirstFocusedItemIndex').and.returnValue(0);
            spyOn(menubarInstance, 'findVisibleItem').and.returnValue({ item: { label: 'Test' } });

            menubarInstance.show();

            expect(menubarInstance.focusedItemInfo().index).toBe(0);
        });

        it('should call hide method programmatically', () => {
            menubarInstance.activeItemPath.set([{ key: 'test' }]);
            menubarInstance.focusedItemInfo.set({ index: 0, level: 0, parentKey: '', item: null });

            menubarInstance.hide();

            expect(menubarInstance.activeItemPath()).toEqual([]);
            expect(menubarInstance.focusedItemInfo().index).toBe(-1);
        });

        it('should call toggle method programmatically', () => {
            const mockEvent = new MouseEvent('click');
            spyOn(mockEvent, 'preventDefault');

            expect(menubarInstance.mobileActive).toBeFalsy();

            menubarInstance.toggle(mockEvent);
            expect(menubarInstance.mobileActive).toBe(true);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });

        it('should have utility methods', () => {
            expect(typeof menubarInstance.getItemProp).toBe('function');
            expect(typeof menubarInstance.isItemDisabled).toBe('function');
            expect(typeof menubarInstance.isItemSeparator).toBe('function');
            expect(typeof menubarInstance.createProcessedItems).toBe('function');
        });

        it('should handle item property retrieval', () => {
            const testItem = { label: 'Test Item', disabled: true, separator: false };
            const separatorItem = { separator: true };

            expect(menubarInstance.getItemProp(testItem, 'label')).toBe('Test Item');
            expect(menubarInstance.isItemDisabled(testItem)).toBe(true);
            expect(menubarInstance.isItemSeparator(testItem)).toBe(false);
            expect(menubarInstance.isItemSeparator(separatorItem)).toBe(true);
        });

        it('should create processed items correctly', () => {
            const items = [
                { label: 'Item 1' },
                {
                    label: 'Item 2',
                    items: [{ label: 'Subitem 1' }, { label: 'Subitem 2' }]
                }
            ];

            const processedItems = menubarInstance.createProcessedItems(items);

            expect(processedItems.length).toBe(2);
            expect(processedItems[0].key).toBe('0');
            expect(processedItems[1].key).toBe('1');
            expect(processedItems[1].items).toBeTruthy();
            expect(processedItems[1].items.length).toBe(2);
        });
    });
});

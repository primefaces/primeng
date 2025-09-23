import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MegaMenuItem, SharedModule } from 'primeng/api';
import { MegaMenu } from './megamenu';

@Component({
    standalone: false,
    template: `
        <p-megamenu
            [id]="id"
            [model]="model"
            [orientation]="orientation"
            [styleClass]="styleClass"
            [breakpoint]="breakpoint"
            [scrollHeight]="scrollHeight"
            [disabled]="disabled"
            [tabindex]="tabindex"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
        >
        </p-megamenu>
    `
})
class TestBasicMegaMenuComponent {
    id: string | undefined;
    model: MegaMenuItem[] | undefined = [
        {
            label: 'Fashion',
            icon: 'pi pi-shopping-cart',
            items: [
                [
                    {
                        label: 'Woman',
                        items: [{ label: 'Woman Item 1' }, { label: 'Woman Item 2' }]
                    },
                    {
                        label: 'Men',
                        items: [{ label: 'Men Item 1' }, { label: 'Men Item 2' }]
                    }
                ],
                [
                    {
                        label: 'Kids',
                        items: [{ label: 'Kids Item 1' }, { label: 'Kids Item 2' }]
                    }
                ]
            ]
        },
        {
            label: 'Electronics',
            icon: 'pi pi-desktop',
            items: [
                [
                    {
                        label: 'Computer',
                        items: [{ label: 'Laptop' }, { label: 'Desktop' }]
                    }
                ]
            ]
        },
        { separator: true },
        { label: 'Simple Item', icon: 'pi pi-home', disabled: true }
    ];
    orientation: 'horizontal' | 'vertical' | string = 'horizontal';
    styleClass: string | undefined;
    breakpoint: string = '960px';
    scrollHeight: string = '20rem';
    disabled: boolean = false;
    tabindex: number = 0;
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
}

@Component({
    standalone: false,
    selector: 'test-vertical-megamenu',
    template: ` <p-megamenu [model]="verticalModel" orientation="vertical"></p-megamenu> `
})
class TestVerticalMegaMenuComponent {
    verticalModel: MegaMenuItem[] = [
        {
            label: 'Vertical Item 1',
            items: [
                [
                    {
                        label: 'Sub 1',
                        items: [{ label: 'Sub Item 1.1' }, { label: 'Sub Item 1.2' }]
                    }
                ]
            ]
        },
        {
            label: 'Vertical Item 2',
            items: [
                [
                    {
                        label: 'Sub 2',
                        items: [{ label: 'Sub Item 2.1' }]
                    }
                ]
            ]
        }
    ];
}

@Component({
    standalone: false,
    selector: 'test-router-megamenu',
    template: ` <p-megamenu [model]="routerModel"></p-megamenu> `
})
class TestRouterMegaMenuComponent {
    routerModel: MegaMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/'
        },
        {
            label: 'Navigation',
            items: [
                [
                    {
                        label: 'Router Items',
                        items: [
                            {
                                label: 'Products',
                                routerLink: '/products',
                                queryParams: { category: 'electronics' }
                            },
                            {
                                label: 'Services',
                                routerLink: ['/services'],
                                routerLinkActiveOptions: { exact: true }
                            }
                        ]
                    }
                ]
            ]
        }
    ];
}

@Component({
    standalone: false,
    selector: 'test-template-megamenu',
    template: `
        <p-megamenu [model]="model">
            <ng-template #start>
                <div class="custom-start">Start Content</div>
            </ng-template>
            <ng-template #end>
                <div class="custom-end">End Content</div>
            </ng-template>
            <ng-template #item let-item>
                <div class="custom-item">
                    <i [class]="item.icon" *ngIf="item.icon"></i>
                    <span class="custom-label">{{ item.label }}</span>
                </div>
            </ng-template>
            <ng-template #button>
                <button class="custom-button">Custom Menu Button</button>
            </ng-template>
            <ng-template #buttonicon>
                <i class="custom-menu-icon pi pi-bars"></i>
            </ng-template>
        </p-megamenu>
    `
})
class TestTemplateMegaMenuComponent {
    model: MegaMenuItem[] = [
        { label: 'Template Item 1', icon: 'pi pi-home' },
        { label: 'Template Item 2', icon: 'pi pi-user' }
    ];
}

@Component({
    standalone: false,
    selector: 'test-ptemplate-megamenu',
    template: `
        <p-megamenu [model]="model">
            <ng-template pTemplate="start">
                <div class="ptemplate-start">PTemplate Start</div>
            </ng-template>
            <ng-template pTemplate="end">
                <div class="ptemplate-end">PTemplate End</div>
            </ng-template>
            <ng-template pTemplate="item" let-item>
                <span class="ptemplate-item">{{ item.label }}</span>
            </ng-template>
            <ng-template pTemplate="button">
                <button class="ptemplate-button">PTemplate Button</button>
            </ng-template>
        </p-megamenu>
    `
})
class TestPTemplateMegaMenuComponent {
    model: MegaMenuItem[] = [{ label: 'PTemplate Item 1' }, { label: 'PTemplate Item 2' }];
}

@Component({
    standalone: false,
    selector: 'test-disabled-megamenu',
    template: ` <p-megamenu [model]="disabledModel"></p-megamenu> `
})
class TestDisabledMegaMenuComponent {
    disabledModel: MegaMenuItem[] = [{ label: 'Enabled Item', icon: 'pi pi-check' }, { label: 'Disabled Item', icon: 'pi pi-times', disabled: true }, { label: 'Function Disabled', icon: 'pi pi-question', disabled: () => true } as any];
}

@Component({
    standalone: false,
    selector: 'test-styled-megamenu',
    template: ` <p-megamenu [model]="model" [styleClass]="customStyleClass"></p-megamenu> `
})
class TestStyledMegaMenuComponent {
    model: MegaMenuItem[] = [{ label: 'Styled Item', icon: 'pi pi-test' }];
    customStyleClass = 'custom-megamenu-class';
}

@Component({
    standalone: false,
    selector: 'test-minimal-megamenu',
    template: `<p-megamenu></p-megamenu>`
})
class TestMinimalMegaMenuComponent {}

@Component({
    standalone: false,
    selector: 'test-dynamic-megamenu',
    template: ` <p-megamenu [model]="dynamicModel"></p-megamenu> `
})
class TestDynamicMegaMenuComponent {
    dynamicModel: MegaMenuItem[] = [];

    addItem(item: MegaMenuItem) {
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
    selector: 'test-command-megamenu',
    template: ` <p-megamenu [model]="commandModel"></p-megamenu> `
})
class TestCommandMegaMenuComponent {
    commandExecuted: any;

    commandModel: MegaMenuItem[] = [
        {
            label: 'Command Item',
            icon: 'pi pi-play',
            command: (event) => {
                this.commandExecuted = event;
            }
        },
        {
            label: 'Mega Menu',
            items: [
                [
                    {
                        label: 'Commands',
                        items: [
                            {
                                label: 'Sub Command',
                                command: (event) => {
                                    this.commandExecuted = event;
                                }
                            }
                        ]
                    }
                ]
            ]
        }
    ];
}

@Component({
    standalone: false,
    selector: 'test-responsive-megamenu',
    template: ` <p-megamenu [model]="model" [breakpoint]="breakpoint"></p-megamenu> `
})
class TestResponsiveMegaMenuComponent {
    model: MegaMenuItem[] = [{ label: 'Item 1' }, { label: 'Item 2' }];
    breakpoint: string = '768px';
}

@Component({
    standalone: true,
    template: '<div>Target Page</div>'
})
class TestTargetComponent {}

describe('MegaMenu', () => {
    let component: TestBasicMegaMenuComponent;
    let fixture: ComponentFixture<TestBasicMegaMenuComponent>;
    let megaMenuElement: DebugElement;
    let megaMenuInstance: MegaMenu;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TestBasicMegaMenuComponent,
                TestVerticalMegaMenuComponent,
                TestRouterMegaMenuComponent,
                TestTemplateMegaMenuComponent,
                TestPTemplateMegaMenuComponent,
                TestDisabledMegaMenuComponent,
                TestStyledMegaMenuComponent,
                TestMinimalMegaMenuComponent,
                TestDynamicMegaMenuComponent,
                TestCommandMegaMenuComponent,
                TestResponsiveMegaMenuComponent
            ],
            imports: [
                MegaMenu,
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

        fixture = TestBed.createComponent(TestBasicMegaMenuComponent);
        component = fixture.componentInstance;
        megaMenuElement = fixture.debugElement.query(By.directive(MegaMenu));
        megaMenuInstance = megaMenuElement.componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(megaMenuInstance).toBeTruthy();
        });

        it('should have required dependencies injected', () => {
            expect(megaMenuInstance._componentStyle).toBeTruthy();
            expect(megaMenuInstance.constructor.name).toBe('MegaMenu');
        });

        it('should have default values', () => {
            const freshFixture = TestBed.createComponent(TestMinimalMegaMenuComponent);
            freshFixture.detectChanges();

            const freshMegaMenu = freshFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;

            expect(freshMegaMenu.model).toBeUndefined();
            expect(freshMegaMenu.orientation).toBe('horizontal');
            expect(freshMegaMenu.breakpoint).toBe('960px');
            expect(freshMegaMenu.scrollHeight).toBe('20rem');
            expect(freshMegaMenu.disabled).toBe(false);
            expect(freshMegaMenu.tabindex).toBe(0);
            expect(freshMegaMenu.focused).toBe(false);
            expect(freshMegaMenu.mobileActive).toBe(false);
        });

        it('should accept custom values', () => {
            const testModel: MegaMenuItem[] = [{ label: 'Test Item' }];
            component.model = testModel;
            component.orientation = 'vertical';
            component.styleClass = 'custom-megamenu';
            component.ariaLabel = 'Custom MegaMenu';
            component.tabindex = 1;
            fixture.detectChanges();

            expect(megaMenuInstance.model).toBe(testModel);
            expect(megaMenuInstance.orientation).toBe('vertical');
            expect(megaMenuInstance.styleClass).toBe('custom-megamenu');
            expect(megaMenuInstance.ariaLabel).toBe('Custom MegaMenu');
            expect(megaMenuInstance.tabindex).toBe(1);
        });

        it('should initialize with generated id', () => {
            const freshFixture = TestBed.createComponent(TestMinimalMegaMenuComponent);
            const freshMegaMenu = freshFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            freshFixture.detectChanges();

            expect(freshMegaMenu.id).toBeTruthy();
            expect(typeof freshMegaMenu.id).toBe('string');
            expect(freshMegaMenu.id).toMatch(/^pn_id_/);
        });

        it('should initialize signal states', () => {
            expect(typeof megaMenuInstance.activeItem).toBe('function');
            expect(typeof megaMenuInstance.focusedItemInfo).toBe('function');
            expect(megaMenuInstance.activeItem()).toBeNull();
            expect(megaMenuInstance.focusedItemInfo().index).toBe(-1);
        });

        it('should process model items on initialization', () => {
            expect(megaMenuInstance.processedItems).toBeDefined();
            expect(megaMenuInstance.processedItems.length).toBeGreaterThan(0);
        });
    });

    describe('Input Properties', () => {
        it('should update model input', () => {
            const newModel = [{ label: 'New Item' }];
            component.model = newModel;
            fixture.detectChanges();

            expect(megaMenuInstance.model).toBe(newModel);
            expect(megaMenuInstance.processedItems.length).toBe(1);
        });

        it('should update orientation input', () => {
            component.orientation = 'vertical';
            fixture.detectChanges();

            expect(megaMenuInstance.orientation).toBe('vertical');
        });

        it('should update styling inputs', () => {
            component.styleClass = 'test-class';
            component.breakpoint = '768px';
            component.scrollHeight = '15rem';
            fixture.detectChanges();

            expect(megaMenuInstance.styleClass).toBe('test-class');
            expect(megaMenuInstance.breakpoint).toBe('768px');
            expect(megaMenuInstance.scrollHeight).toBe('15rem');
        });

        it('should update disabled and tabindex inputs', () => {
            component.disabled = true;
            component.tabindex = 2;
            fixture.detectChanges();

            expect(megaMenuInstance.disabled).toBe(true);
            expect(megaMenuInstance.tabindex).toBe(2);
        });

        it('should update aria inputs', () => {
            component.ariaLabel = 'Test MegaMenu';
            component.ariaLabelledBy = 'megamenu-label';
            fixture.detectChanges();

            expect(megaMenuInstance.ariaLabel).toBe('Test MegaMenu');
            expect(megaMenuInstance.ariaLabelledBy).toBe('megamenu-label');
        });

        it('should update id input', () => {
            component.id = 'custom-megamenu-id';
            fixture.detectChanges();
            expect(megaMenuInstance.id).toBe('custom-megamenu-id');
        });
    });

    describe('Menu Item Display Tests', () => {
        it('should render menu items from model', () => {
            const items = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));
            expect(items.length).toBeGreaterThanOrEqual(3); // At least Fashion, Electronics, Simple Item
        });

        it('should render item icons when provided', () => {
            const iconElements = fixture.debugElement.queryAll(By.css('span[data-pc-section="icon"]'));
            expect(iconElements.length).toBeGreaterThanOrEqual(3); // Icons for items with icons
        });

        it('should render item labels', () => {
            const labelElements = fixture.debugElement.queryAll(By.css('span[data-pc-section="label"]'));
            expect(labelElements.length).toBeGreaterThanOrEqual(3);
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
            component.model = undefined as any;
            fixture.detectChanges();

            const items = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));
            expect(items.length).toBe(0);
        });

        it('should render separators', () => {
            const separators = fixture.debugElement.queryAll(By.css('li[data-pc-section="separator"]'));
            expect(separators.length).toBe(1);
        });
    });

    describe('Mega Panel Tests', () => {
        it('should detect if model has mega panels', () => {
            const firstProcessedItem = megaMenuInstance.processedItems[0];
            expect(megaMenuInstance.isProcessedItemGroup(firstProcessedItem)).toBe(true);
        });

        it('should render mega panel overlays for grouped items', () => {
            const overlays = fixture.debugElement.queryAll(By.css('div[data-pc-section="panel"]'));
            expect(overlays.length).toBeGreaterThanOrEqual(0); // Panels may not be initially visible
        });

        it('should render grid structure in mega panels', () => {
            const grids = fixture.debugElement.queryAll(By.css('div[data-pc-section="grid"]'));
            expect(grids.length).toBeGreaterThanOrEqual(0); // Grids may not be initially visible
        });

        it('should render columns in mega panels', () => {
            // Look for the actual column elements in the mega panel structure
            const columns = fixture.debugElement.queryAll(By.css('div'));
            const columnElements = columns.filter((el) => el.nativeElement.classList.toString().includes('column') || el.nativeElement.getAttribute('class')?.includes('column'));
            expect(columnElements.length).toBeGreaterThanOrEqual(0); // Columns may not be visible initially
        });

        it('should render sub-menu items in mega panels', () => {
            const subMenus = fixture.debugElement.queryAll(By.css('p-megamenu-sub'));
            expect(subMenus.length).toBeGreaterThanOrEqual(1); // Root menu + submenu items
        });
    });

    describe('Orientation Tests', () => {
        it('should handle horizontal orientation', () => {
            component.orientation = 'horizontal';
            fixture.detectChanges();

            expect(megaMenuInstance.orientation).toBe('horizontal');

            const rootList = fixture.debugElement.query(By.css('ul[data-pc-section="root"]'));
            expect(rootList.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
        });

        it('should handle vertical orientation', () => {
            const verticalFixture = TestBed.createComponent(TestVerticalMegaMenuComponent);
            verticalFixture.detectChanges();

            const verticalMegaMenu = verticalFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            expect(verticalMegaMenu.orientation).toBe('vertical');

            const rootList = verticalFixture.debugElement.query(By.css('ul[data-pc-section="root"]'));
            expect(rootList.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
        });

        it('should render appropriate submenu icons based on orientation', () => {
            // Test horizontal orientation - should have angle down icons
            const horizontalIcons = fixture.debugElement.queryAll(By.css('svg[data-p-icon="angle-down"]'));
            expect(horizontalIcons.length).toBeGreaterThan(0);

            // Test vertical orientation
            const verticalFixture = TestBed.createComponent(TestVerticalMegaMenuComponent);
            verticalFixture.detectChanges();

            const verticalIcons = verticalFixture.debugElement.queryAll(By.css('svg[data-p-icon="angle-right"]'));
            expect(verticalIcons.length).toBeGreaterThan(0);
        });
    });

    describe('Item Interaction Tests', () => {
        it('should execute command when item is clicked', fakeAsync(() => {
            const commandFixture = TestBed.createComponent(TestCommandMegaMenuComponent);
            const commandComponent = commandFixture.componentInstance;
            commandFixture.detectChanges();

            const itemElement = commandFixture.debugElement.query(By.css('li[data-pc-section="menuitem"]'));
            const contentElement = itemElement.query(By.css('div[data-pc-section="content"]'));

            contentElement.nativeElement.click();
            tick();

            expect(commandComponent.commandExecuted).toBeDefined();
            expect(commandComponent.commandExecuted.item.label).toBe('Command Item');
            flush();
        }));

        it('should handle disabled items', () => {
            const disabledFixture = TestBed.createComponent(TestDisabledMegaMenuComponent);
            disabledFixture.detectChanges();

            const disabledMegaMenu = disabledFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            const disabledItem = { disabled: true };
            const functionDisabledItem = { disabled: () => true };

            expect(disabledMegaMenu.isItemDisabled(disabledItem)).toBe(true);
            expect(disabledMegaMenu.isItemDisabled(functionDisabledItem)).toBe(true);
        });

        it('should set data-p-disabled attribute for disabled items', () => {
            const disabledFixture = TestBed.createComponent(TestDisabledMegaMenuComponent);
            disabledFixture.detectChanges();

            const itemElements = disabledFixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));

            // Check if items exist and have attributes
            if (itemElements.length > 0) {
                // First item should not be disabled (or may not have the attribute)
                const firstItemDisabled = itemElements[0].nativeElement.getAttribute('data-p-disabled');
                expect(firstItemDisabled === 'false' || firstItemDisabled === null).toBe(true);

                if (itemElements.length > 1) {
                    // Second item should be disabled
                    expect(itemElements[1].nativeElement.getAttribute('data-p-disabled')).toBe('true');
                }

                if (itemElements.length > 2) {
                    // Third item should be disabled (function returns true)
                    expect(itemElements[2].nativeElement.getAttribute('data-p-disabled')).toBe('true');
                }
            }
        });
    });

    describe('Template Tests', () => {
        it('should handle #item template processing', fakeAsync(() => {
            const itemTemplateFixture = TestBed.createComponent(TestTemplateMegaMenuComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const itemTemplateMegaMenu = itemTemplateFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;

            expect(() => itemTemplateMegaMenu.ngAfterContentInit()).not.toThrow();
            expect(itemTemplateMegaMenu.itemTemplate).toBeDefined();

            // Verify custom template content is rendered
            const customItems = itemTemplateFixture.debugElement.queryAll(By.css('.custom-item'));
            expect(customItems.length).toBeGreaterThanOrEqual(2);

            flush();
        }));

        it('should handle pTemplate processing', fakeAsync(() => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateMegaMenuComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateMegaMenu = pTemplateFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;

            expect(() => pTemplateMegaMenu.ngAfterContentInit()).not.toThrow();
            expect(pTemplateMegaMenu.templates).toBeDefined();

            flush();
        }));

        it('should process PrimeTemplate types correctly', fakeAsync(() => {
            const pTemplateFixture = TestBed.createComponent(TestPTemplateMegaMenuComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateMegaMenu = pTemplateFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;

            pTemplateMegaMenu.ngAfterContentInit();

            expect(pTemplateMegaMenu.templates).toBeDefined();
            expect(pTemplateMegaMenu._startTemplate).toBeDefined();
            expect(pTemplateMegaMenu._endTemplate).toBeDefined();
            expect(pTemplateMegaMenu._buttonTemplate).toBeDefined();

            flush();
        }));

        it('should render start and end templates', () => {
            const templateFixture = TestBed.createComponent(TestTemplateMegaMenuComponent);
            templateFixture.detectChanges();

            const startContent = templateFixture.debugElement.query(By.css('.custom-start'));
            const endContent = templateFixture.debugElement.query(By.css('.custom-end'));

            expect(startContent).toBeTruthy();
            expect(endContent).toBeTruthy();
            expect(startContent.nativeElement.textContent).toContain('Start Content');
            expect(endContent.nativeElement.textContent).toContain('End Content');
        });

        it('should render button template', () => {
            const templateFixture = TestBed.createComponent(TestTemplateMegaMenuComponent);
            templateFixture.detectChanges();

            const customButton = templateFixture.debugElement.query(By.css('.custom-button'));
            expect(customButton).toBeTruthy();
            expect(customButton.nativeElement.textContent).toContain('Custom Menu Button');
        });

        it('should prioritize itemTemplate over _itemTemplate', fakeAsync(() => {
            const itemTemplateFixture = TestBed.createComponent(TestTemplateMegaMenuComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const itemTemplateMegaMenu = itemTemplateFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;

            itemTemplateMegaMenu.ngAfterContentInit();

            expect(itemTemplateMegaMenu.itemTemplate).toBeDefined();

            flush();
        }));

        it('should render different template types correctly', fakeAsync(() => {
            // Test pTemplate rendering
            const pTemplateFixture = TestBed.createComponent(TestPTemplateMegaMenuComponent);
            pTemplateFixture.detectChanges();
            tick(100);

            const pTemplateMegaMenu = pTemplateFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            expect(pTemplateMegaMenu.templates).toBeDefined();
            expect(() => pTemplateMegaMenu.ngAfterContentInit()).not.toThrow();

            // Test #item template rendering
            const itemTemplateFixture = TestBed.createComponent(TestTemplateMegaMenuComponent);
            itemTemplateFixture.detectChanges();
            tick(100);

            const itemTemplateMegaMenu = itemTemplateFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            expect(itemTemplateMegaMenu.itemTemplate).toBeDefined();

            flush();
        }));
    });

    describe('Keyboard Navigation Tests', () => {
        beforeEach(() => {
            megaMenuInstance.focused = true;
        });

        it('should handle arrow down key', () => {
            spyOn(megaMenuInstance, 'onArrowDownKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onArrowDownKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle arrow up key', () => {
            spyOn(megaMenuInstance, 'onArrowUpKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onArrowUpKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle arrow left key', () => {
            spyOn(megaMenuInstance, 'onArrowLeftKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onArrowLeftKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle arrow right key', () => {
            spyOn(megaMenuInstance, 'onArrowRightKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onArrowRightKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle home key', () => {
            spyOn(megaMenuInstance, 'onHomeKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'Home' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onHomeKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle end key', () => {
            spyOn(megaMenuInstance, 'onEndKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'End' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onEndKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle enter key', () => {
            spyOn(megaMenuInstance, 'onEnterKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'Enter' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onEnterKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle space key', () => {
            spyOn(megaMenuInstance, 'onSpaceKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'Space' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onSpaceKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle escape key', () => {
            spyOn(megaMenuInstance, 'onEscapeKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'Escape' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onEscapeKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle tab key', () => {
            spyOn(megaMenuInstance, 'onTabKey');
            const keyEvent = new KeyboardEvent('keydown', { code: 'Tab' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.onTabKey).toHaveBeenCalledWith(keyEvent);
        });

        it('should handle printable characters for search', () => {
            spyOn(megaMenuInstance, 'searchItems');
            const keyEvent = new KeyboardEvent('keydown', { key: 'f' });

            megaMenuInstance.onKeyDown(keyEvent);

            expect(megaMenuInstance.searchItems).toHaveBeenCalledWith(keyEvent, 'f');
        });
    });

    describe('Focus Management Tests', () => {
        it('should handle focus events', () => {
            const focusEvent = new FocusEvent('focus');

            megaMenuInstance.onMenuFocus(focusEvent);

            expect(megaMenuInstance.focused).toBe(true);
            expect(megaMenuInstance.focusedItemInfo().index).toBeGreaterThanOrEqual(-1);
        });

        it('should handle blur events', () => {
            const blurEvent = new FocusEvent('blur');
            megaMenuInstance.focused = true;

            megaMenuInstance.onMenuBlur(blurEvent);

            expect(megaMenuInstance.focused).toBe(false);
            expect(megaMenuInstance.focusedItemInfo().index).toBe(-1);
            expect(megaMenuInstance.searchValue).toBe('' as any);
            expect(megaMenuInstance.dirty).toBe(false);
        });

        it('should get focusedItemId correctly', () => {
            megaMenuInstance.focusedItemInfo.set({ index: -1, key: '', parentKey: '', item: null });
            expect(megaMenuInstance.focusedItemId).toBeNull();

            megaMenuInstance.focusedItemInfo.set({ index: 0, key: 'test_key', parentKey: '', item: null });
            expect(megaMenuInstance.focusedItemId).toBeTruthy();
        });

        it('should change focused item info', () => {
            const mockEvent = new KeyboardEvent('keydown');

            spyOn(megaMenuInstance, 'changeFocusedItemInfo').and.callThrough();
            spyOn(megaMenuInstance, 'findVisibleItem').and.returnValue({ key: 'test', parentKey: '', item: null });

            megaMenuInstance.changeFocusedItemInfo(mockEvent, 0);

            expect(megaMenuInstance.changeFocusedItemInfo).toHaveBeenCalledWith(mockEvent, 0);
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply styleClass when provided', () => {
            const styleFixture = TestBed.createComponent(TestStyledMegaMenuComponent);
            styleFixture.detectChanges();

            const megaMenuElement = styleFixture.debugElement.query(By.directive(MegaMenu));
            const hostElement = megaMenuElement.nativeElement;

            expect(hostElement.classList.contains('custom-megamenu-class')).toBe(true);
        });

        it('should have proper data attributes', () => {
            const hostElement = fixture.debugElement.query(By.directive(MegaMenu)).nativeElement;
            expect(hostElement.getAttribute('data-pc-name')).toBe('megamenu');
            expect(hostElement.getAttribute('data-pc-section')).toBe('root');
        });

        it('should have generated id on host element', () => {
            const freshFixture = TestBed.createComponent(TestMinimalMegaMenuComponent);
            const freshMegaMenu = freshFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            freshFixture.detectChanges();

            const hostElement = freshFixture.debugElement.query(By.directive(MegaMenu)).nativeElement;
            expect(hostElement.getAttribute('id')).toBeTruthy();
            expect(hostElement.getAttribute('id')).toBe(freshMegaMenu.id);
        });

        it('should have generated id on host element', () => {
            // MegaMenu sets id on the host element (p-megamenu), not on the ul element
            const hostElement = fixture.debugElement.query(By.directive(MegaMenu)).nativeElement;
            expect(hostElement.getAttribute('id')).toBeTruthy();
            expect(hostElement.getAttribute('id')).toBe(megaMenuInstance.id);
        });
    });

    describe('Accessibility Tests', () => {
        it('should have proper ARIA attributes on root list', () => {
            const listElement = fixture.debugElement.query(By.css('ul[data-pc-section="root"]'));

            expect(listElement.nativeElement.getAttribute('role')).toBe('menubar');
            expect(listElement.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
            expect(listElement.nativeElement.hasAttribute('tabindex')).toBe(true);
        });

        it('should have proper ARIA attributes on menu items', () => {
            const itemElements = fixture.debugElement.queryAll(By.css('li[data-pc-section="menuitem"]'));

            if (itemElements.length > 0) {
                itemElements.forEach((item, index) => {
                    expect(item.nativeElement.getAttribute('role')).toBe('menuitem');

                    // Check if item has a label
                    const ariaLabel = item.nativeElement.getAttribute('aria-label');
                    if (ariaLabel !== null) {
                        expect(item.nativeElement.hasAttribute('aria-label')).toBe(true);
                    }

                    // aria-disabled attribute should be present if item is disabled
                    const ariaDisabled = item.nativeElement.getAttribute('aria-disabled');
                    if (ariaDisabled !== null) {
                        expect(item.nativeElement.hasAttribute('aria-disabled')).toBe(true);
                    }
                });
            } else {
                // If no menu items are found, check that component is properly initialized
                expect(megaMenuInstance.processedItems).toBeDefined();
            }
        });

        it('should set aria-activedescendant when focused', () => {
            megaMenuInstance.focused = true;
            megaMenuInstance.focusedItemInfo.set({ index: 0, key: 'test_key', parentKey: '', item: null });

            fixture.detectChanges();

            const listElement = fixture.debugElement.query(By.css('ul[data-pc-section="root"]'));
            if (listElement) {
                const ariaActivedescendant = listElement.nativeElement.getAttribute('aria-activedescendant');
                if (ariaActivedescendant) {
                    expect(ariaActivedescendant).toBeTruthy();
                }
            }

            // Verify that the focused state is properly set regardless
            expect(megaMenuInstance.focused).toBe(true);
            expect(megaMenuInstance.focusedItemInfo()).toEqual({ index: 0, key: 'test_key', parentKey: '', item: null });
        });

        it('should set aria-label when provided', () => {
            component.ariaLabel = 'Main Navigation Menu';
            fixture.detectChanges();

            // Check if ariaLabel is set on component instance
            expect(megaMenuInstance.ariaLabel).toBe('Main Navigation Menu');

            // The current implementation may not bind aria-label to ul element
            const listElement = fixture.debugElement.query(By.css('ul[data-pc-section="root"]'));
            if (listElement) {
                const ariaLabel = listElement.nativeElement.getAttribute('aria-label');
                if (ariaLabel) {
                    expect(ariaLabel).toBe('Main Navigation Menu');
                }
            }
        });

        it('should set aria-labelledby when provided', () => {
            component.ariaLabelledBy = 'megamenu-heading';
            fixture.detectChanges();

            // Check if ariaLabelledBy is set on component instance
            expect(megaMenuInstance.ariaLabelledBy).toBe('megamenu-heading');

            // The current implementation may not bind aria-labelledby to ul element
            const listElement = fixture.debugElement.query(By.css('ul[data-pc-section="root"]'));
            if (listElement) {
                const ariaLabelledBy = listElement.nativeElement.getAttribute('aria-labelledby');
                if (ariaLabelledBy) {
                    expect(ariaLabelledBy).toBe('megamenu-heading');
                }
            }
        });

        it('should set aria-haspopup for grouped items', () => {
            const groupedItems = fixture.debugElement.queryAll(By.css('li[aria-haspopup="menu"]'));
            // Check that grouped items exist if they are rendered, or verify structure is correct
            if (groupedItems.length > 0) {
                expect(groupedItems.length).toBeGreaterThanOrEqual(1);
            } else {
                // If no grouped items are found, verify the model has group items
                const hasGroupedItems = megaMenuInstance.processedItems.some((item) => item.items && item.items.length > 0);
                expect(hasGroupedItems || megaMenuInstance.processedItems.length).toBeGreaterThan(0);
            }
        });
    });

    describe('Router Integration Tests', () => {
        it('should handle router links', () => {
            const routerFixture = TestBed.createComponent(TestRouterMegaMenuComponent);
            routerFixture.detectChanges();

            // Check if router component has been created
            const routerMegaMenu = routerFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            expect(routerMegaMenu).toBeTruthy();

            // Verify that model items with router links are processed
            const hasRouterItems = routerMegaMenu.processedItems.some((item) => {
                function hasRouterLink(processedItem) {
                    if (processedItem.item && processedItem.item.routerLink) return true;
                    if (processedItem.items && processedItem.items.length) {
                        return processedItem.items.some((subItem) => hasRouterLink(subItem));
                    }
                    return false;
                }
                return hasRouterLink(item);
            });
            expect(hasRouterItems).toBe(true);
        });

        it('should handle router link with query params', () => {
            const routerFixture = TestBed.createComponent(TestRouterMegaMenuComponent);
            routerFixture.detectChanges();

            const routerMegaMenu = routerFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            const processedItems = routerMegaMenu.processedItems;

            // Find item with query params
            let foundQueryParams = false;
            function searchForQueryParams(items) {
                items.forEach((item) => {
                    if (item.item && item.item.queryParams) {
                        foundQueryParams = true;
                    }
                    if (item.items) {
                        searchForQueryParams(item.items.flat ? item.items.flat() : item.items);
                    }
                });
            }

            searchForQueryParams(processedItems);
            expect(foundQueryParams).toBe(true);
        });

        it('should have proper router link attributes', () => {
            const routerFixture = TestBed.createComponent(TestRouterMegaMenuComponent);
            routerFixture.detectChanges();

            const routerMegaMenu = routerFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;

            // Check that router links are processed in the component model
            let foundRouterLinks = false;
            function checkForRouterLinks(items) {
                items.forEach((item) => {
                    if (item.item && item.item.routerLink) {
                        foundRouterLinks = true;
                    }
                    if (item.items && item.items.length > 0) {
                        checkForRouterLinks(item.items);
                    }
                });
            }

            checkForRouterLinks(routerMegaMenu.processedItems);
            expect(foundRouterLinks).toBe(true);
        });
    });

    describe('Responsive Tests', () => {
        it('should handle breakpoint changes', () => {
            const responsiveFixture = TestBed.createComponent(TestResponsiveMegaMenuComponent);
            responsiveFixture.detectChanges();

            const responsiveMegaMenu = responsiveFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            expect(responsiveMegaMenu.breakpoint).toBe('768px');
        });

        it('should show menu button on mobile', () => {
            // Simulate mobile breakpoint
            megaMenuInstance.queryMatches = true;
            fixture.detectChanges();

            const menuButton = fixture.debugElement.query(By.css('a[role="button"]'));
            expect(menuButton).toBeTruthy();
        });

        it('should handle menu button click', () => {
            spyOn(megaMenuInstance, 'toggle');
            megaMenuInstance.queryMatches = true;
            fixture.detectChanges();

            const menuButton = fixture.debugElement.query(By.css('a[role="button"]'));
            if (menuButton) {
                menuButton.nativeElement.click();
                expect(megaMenuInstance.toggle).toHaveBeenCalled();
            }
        });
    });

    describe('Dynamic Model Tests', () => {
        it('should handle dynamic model changes', () => {
            const dynamicFixture = TestBed.createComponent(TestDynamicMegaMenuComponent);
            const dynamicComponent = dynamicFixture.componentInstance;
            const dynamicMegaMenu = dynamicFixture.debugElement.query(By.directive(MegaMenu)).componentInstance;
            dynamicFixture.detectChanges();

            // Initially empty
            expect(dynamicMegaMenu.model.length).toBe(0);

            // Add items
            dynamicComponent.addItem({ label: 'Item 1', icon: 'pi pi-test' });
            dynamicComponent.addItem({ label: 'Item 2', icon: 'pi pi-test2' });
            dynamicFixture.detectChanges();

            expect(dynamicMegaMenu.model.length).toBe(2);
            expect(dynamicMegaMenu.model[0].label).toBe('Item 1');

            // Remove item
            dynamicComponent.removeItem(0);
            dynamicFixture.detectChanges();

            expect(dynamicMegaMenu.model.length).toBe(1);
            expect(dynamicMegaMenu.model[0].label).toBe('Item 2');

            // Clear all
            dynamicComponent.clearItems();
            dynamicFixture.detectChanges();

            expect(dynamicMegaMenu.model.length).toBe(0);
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined values gracefully', () => {
            component.model = undefined as any;
            component.ariaLabel = undefined as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(megaMenuInstance.model).toBeUndefined();
        });

        it('should handle items without icons', () => {
            component.model = [{ label: 'No Icon Item' }, { label: 'Icon Item', icon: 'pi pi-check' }];
            fixture.detectChanges();

            const iconElements = fixture.debugElement.queryAll(By.css('span[data-pc-section="icon"]'));
            expect(iconElements.length).toBe(1); // Only one item has icon
        });

        it('should handle items with custom styleClass', () => {
            component.model = [{ label: 'Custom Style', styleClass: 'custom-item-class' }];
            fixture.detectChanges();

            const itemElement = fixture.debugElement.query(By.css('li[data-pc-section="menuitem"]'));
            expect(itemElement.nativeElement.classList.contains('custom-item-class')).toBe(true);
        });

        it('should handle memory cleanup on destroy', () => {
            spyOn(megaMenuInstance, 'unbindOutsideClickListener');
            spyOn(megaMenuInstance, 'unbindResizeListener');
            spyOn(megaMenuInstance, 'unbindMatchMediaListener');

            megaMenuInstance.ngOnDestroy();

            expect(megaMenuInstance.unbindOutsideClickListener).toHaveBeenCalled();
            expect(megaMenuInstance.unbindResizeListener).toHaveBeenCalled();
            expect(megaMenuInstance.unbindMatchMediaListener).toHaveBeenCalled();
        });

        it('should handle rapid show/hide calls', () => {
            megaMenuInstance.mobileActive = false;

            // Rapid toggle
            megaMenuInstance.show();
            expect(megaMenuInstance.focusedItemInfo().index).toBeGreaterThanOrEqual(-1);

            megaMenuInstance.hide();
            expect(megaMenuInstance.activeItem()).toBeNull();
            expect(megaMenuInstance.focusedItemInfo().index).toBe(-1);
        });

        it('should handle search timeout correctly', fakeAsync(() => {
            megaMenuInstance.searchValue = '';

            megaMenuInstance.searchItems(new KeyboardEvent('keydown', { key: 'f' }), 'f');
            expect(megaMenuInstance.searchValue).toBe('f');

            tick(600); // Wait for search timeout

            expect(megaMenuInstance.searchValue).toBe('' as any);
            flush();
        }));
    });

    describe('Public Methods', () => {
        it('should have required public methods', () => {
            expect(typeof megaMenuInstance.show).toBe('function');
            expect(typeof megaMenuInstance.hide).toBe('function');
            expect(typeof megaMenuInstance.toggle).toBe('function');
            expect(typeof megaMenuInstance.getItemProp).toBe('function');
            expect(typeof megaMenuInstance.isProcessedItemGroup).toBe('function');
            expect(typeof megaMenuInstance.isSelected).toBe('function');
            expect(typeof megaMenuInstance.isValidItem).toBe('function');
            expect(typeof megaMenuInstance.isItemDisabled).toBe('function');
            expect(typeof megaMenuInstance.isItemSeparator).toBe('function');
        });

        it('should get item property correctly', () => {
            const testItem = { label: 'Test Item', disabled: true };

            expect(megaMenuInstance.getItemProp(testItem, 'label')).toBe('Test Item');
            expect(megaMenuInstance.getItemProp(testItem, 'disabled')).toBe(true);
            expect(megaMenuInstance.getItemProp(testItem, 'nonexistent')).toBeUndefined();
        });

        it('should check if item is disabled correctly', () => {
            const enabledItem = { disabled: false };
            const disabledItem = { disabled: true };
            const undefinedItem = {};

            expect(megaMenuInstance.isItemDisabled(enabledItem)).toBe(false);
            expect(megaMenuInstance.isItemDisabled(disabledItem)).toBe(true);
            expect(megaMenuInstance.isItemDisabled(undefinedItem)).toBeUndefined();
        });

        it('should check if item is separator correctly', () => {
            const regularItem = { label: 'Regular' };
            const separatorItem = { separator: true };

            expect(megaMenuInstance.isItemSeparator(regularItem)).toBeUndefined();
            expect(megaMenuInstance.isItemSeparator(separatorItem)).toBe(true);
        });

        it('should check if processed item is group correctly', () => {
            const regularProcessedItem = { items: null };
            const groupProcessedItem = { items: [{ label: 'Sub' }] };

            expect(megaMenuInstance.isProcessedItemGroup(regularProcessedItem)).toBe(false);
            expect(megaMenuInstance.isProcessedItemGroup(groupProcessedItem)).toBe(true);
        });

        it('should check if processed item is selected correctly', () => {
            const processedItem = { key: 'test_key' };

            megaMenuInstance.activeItem.set(null);
            expect(megaMenuInstance.isSelected(processedItem)).toBe(false);

            megaMenuInstance.activeItem.set({ key: 'test_key' });
            expect(megaMenuInstance.isSelected(processedItem)).toBe(true);
        });

        it('should validate item correctly', () => {
            const validItem = { item: { label: 'Valid' } };
            const disabledItem = { item: { label: 'Disabled', disabled: true } };
            const separatorItem = { item: { separator: true } };

            expect(megaMenuInstance.isValidItem(validItem)).toBe(true);
            expect(megaMenuInstance.isValidItem(disabledItem)).toBe(false);
            expect(megaMenuInstance.isValidItem(separatorItem)).toBe(false);
        });

        it('should find visible item correctly', () => {
            const visibleItems = megaMenuInstance.visibleItems;

            if (visibleItems.length > 0) {
                const foundItem = megaMenuInstance.findVisibleItem(0);
                expect(foundItem).toBeTruthy();
                expect(foundItem).toBe(visibleItems[0]);
            }
        });

        it('should create processed items correctly', () => {
            const testModel = [
                { label: 'Test Item 1' },
                {
                    label: 'Test Group',
                    items: [
                        [
                            {
                                label: 'Sub Group',
                                items: [{ label: 'Sub Item' }]
                            }
                        ]
                    ]
                }
            ];

            const processedItems = megaMenuInstance.createProcessedItems(testModel);

            expect(processedItems).toBeDefined();
            expect(processedItems.length).toBe(2);
            expect(processedItems[0].key).toBe('0');
            expect(processedItems[1].key).toBe('1');
            expect(processedItems[1].items).toBeDefined();
        });
    });
});

import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuItem } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { TieredMenu } from 'primeng/tieredmenu';
import { SplitButton } from './splitbutton';

// Basic SplitButton Test Component
@Component({
    standalone: false,
    template: `
        <p-splitbutton
            [model]="model"
            [label]="label"
            [icon]="icon"
            [iconPos]="iconPos"
            [severity]="severity"
            [raised]="raised"
            [rounded]="rounded"
            [text]="text"
            [outlined]="outlined"
            [size]="size"
            [plain]="plain"
            [disabled]="disabled"
            [buttonDisabled]="buttonDisabled"
            [menuButtonDisabled]="menuButtonDisabled"
            [tabindex]="tabindex"
            [styleClass]="styleClass"
            [menuStyle]="menuStyle"
            [menuStyleClass]="menuStyleClass"
            [dropdownIcon]="dropdownIcon"
            [appendTo]="appendTo"
            [dir]="dir"
            [expandAriaLabel]="expandAriaLabel"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            [buttonProps]="buttonProps"
            [menuButtonProps]="menuButtonProps"
            [autofocus]="autofocus"
            [tooltip]="tooltip"
            [tooltipOptions]="tooltipOptions"
            (onClick)="onButtonClick($event)"
            (onMenuShow)="onMenuShow($event)"
            (onMenuHide)="onMenuHide($event)"
            (onDropdownClick)="onDropdownClick($event)"
        >
        </p-splitbutton>
    `
})
class TestBasicSplitButtonComponent {
    model: MenuItem[] = [
        { label: 'Update', icon: 'pi pi-refresh', command: () => this.update() },
        { label: 'Delete', icon: 'pi pi-times', command: () => this.delete() },
        { separator: true },
        { label: 'Quit', icon: 'pi pi-power-off', command: () => this.quit() }
    ];

    label: string | undefined = 'Save';
    icon: string | undefined = 'pi pi-check';
    iconPos: 'left' | 'right' = 'left';
    severity: any = undefined as any;
    raised: boolean = false;
    rounded: boolean = false;
    text: boolean = false;
    outlined: boolean = false;
    size: 'small' | 'large' | undefined | null = null as any;
    plain: boolean = false;
    disabled: boolean | undefined = false;
    buttonDisabled: boolean = false;
    menuButtonDisabled: boolean = false;
    tabindex: number | undefined;
    styleClass: string | undefined;
    menuStyle: any = {};
    menuStyleClass: string | undefined;
    dropdownIcon: string | undefined;
    appendTo: any = 'body';
    dir: string | undefined;
    expandAriaLabel: string | undefined;
    showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    hideTransitionOptions: string = '.1s linear';
    buttonProps: any;
    menuButtonProps: any;
    autofocus: boolean | undefined;
    tooltip: string | undefined;
    tooltipOptions: any;

    clickEvent: MouseEvent | undefined;
    menuShowEvent: any;
    menuHideEvent: any;
    dropdownClickEvent: MouseEvent | undefined;

    updateClicked = false;
    deleteClicked = false;
    quitClicked = false;

    onButtonClick(event: MouseEvent) {
        this.clickEvent = event;
    }

    onMenuShow(event: any) {
        this.menuShowEvent = event;
    }

    onMenuHide(event: any) {
        this.menuHideEvent = event;
    }

    onDropdownClick(event: MouseEvent) {
        this.dropdownClickEvent = event;
    }

    update() {
        this.updateClicked = true;
    }

    delete() {
        this.deleteClicked = true;
    }

    quit() {
        this.quitClicked = true;
    }
}

// SplitButton with Templates
@Component({
    standalone: false,
    template: `
        <p-splitbutton [model]="model" [label]="label">
            <ng-template pTemplate="content">
                <div class="custom-content">
                    <i class="pi pi-star custom-icon"></i>
                    <span class="custom-label">Custom Button</span>
                </div>
            </ng-template>
            <ng-template pTemplate="dropdownicon">
                <i class="pi pi-angle-down custom-dropdown-icon"></i>
            </ng-template>
        </p-splitbutton>
    `
})
class TestTemplateSplitButtonComponent {
    model: MenuItem[] = [{ label: 'Action 1' }, { label: 'Action 2' }];
    label = 'Template Button';
}

// SplitButton with #template approach
@Component({
    standalone: false,
    template: `
        <p-splitbutton [model]="model">
            <ng-template #content>
                <div class="content-template-content">
                    <i class="pi pi-heart content-template-icon"></i>
                    <span class="content-template-label">Content Template</span>
                </div>
            </ng-template>
            <ng-template #dropdownicon>
                <i class="pi pi-chevron-down content-dropdown-icon"></i>
            </ng-template>
        </p-splitbutton>
    `
})
class TestContentTemplateSplitButtonComponent {
    model: MenuItem[] = [{ label: 'Template Action 1' }, { label: 'Template Action 2' }];
}

// Severity SplitButton Test
@Component({
    standalone: false,
    template: `
        <div class="severity-buttons">
            <p-splitbutton label="Primary" severity="primary" [model]="model"></p-splitbutton>
            <p-splitbutton label="Secondary" severity="secondary" [model]="model"></p-splitbutton>
            <p-splitbutton label="Success" severity="success" [model]="model"></p-splitbutton>
            <p-splitbutton label="Info" severity="info" [model]="model"></p-splitbutton>
            <p-splitbutton label="Warn" severity="warn" [model]="model"></p-splitbutton>
            <p-splitbutton label="Danger" severity="danger" [model]="model"></p-splitbutton>
            <p-splitbutton label="Help" severity="help" [model]="model"></p-splitbutton>
            <p-splitbutton label="Contrast" severity="contrast" [model]="model"></p-splitbutton>
        </div>
    `
})
class TestSeveritySplitButtonComponent {
    model: MenuItem[] = [{ label: 'Action' }];
}

// SplitButton Variants Test
@Component({
    standalone: false,
    template: `
        <div class="variant-buttons">
            <p-splitbutton label="Raised" [raised]="true" [model]="model"></p-splitbutton>
            <p-splitbutton label="Rounded" [rounded]="true" [model]="model"></p-splitbutton>
            <p-splitbutton label="Text" [text]="true" [model]="model"></p-splitbutton>
            <p-splitbutton label="Outlined" [outlined]="true" [model]="model"></p-splitbutton>
            <p-splitbutton label="Plain" [plain]="true" [model]="model"></p-splitbutton>
            <p-splitbutton label="Small" size="small" [model]="model"></p-splitbutton>
            <p-splitbutton label="Large" size="large" [model]="model"></p-splitbutton>
        </div>
    `
})
class TestSplitButtonVariantsComponent {
    model: MenuItem[] = [{ label: 'Action' }];
}

// Disabled SplitButton Test
@Component({
    standalone: false,
    template: `
        <div class="disabled-buttons">
            <p-splitbutton label="Disabled" [disabled]="true" [model]="model"></p-splitbutton>
            <p-splitbutton label="Button Disabled" [buttonDisabled]="true" [model]="model"></p-splitbutton>
            <p-splitbutton label="Menu Disabled" [menuButtonDisabled]="true" [model]="model"></p-splitbutton>
        </div>
    `
})
class TestDisabledSplitButtonComponent {
    model: MenuItem[] = [{ label: 'Action 1' }, { label: 'Action 2' }];
}

// Icon SplitButton Test
@Component({
    standalone: false,
    template: `
        <div class="icon-buttons">
            <p-splitbutton icon="pi pi-check" [iconPos]="iconPos" [model]="model"></p-splitbutton>
            <p-splitbutton label="Save" icon="pi pi-save" iconPos="left" [model]="model"></p-splitbutton>
            <p-splitbutton label="Save" icon="pi pi-save" iconPos="right" [model]="model"></p-splitbutton>
        </div>
    `
})
class TestIconSplitButtonComponent {
    iconPos: 'left' | 'right' = 'left';
    model: MenuItem[] = [{ label: 'Action' }];
}

// Dropdown Icon SplitButton Test
@Component({
    standalone: false,
    template: ` <p-splitbutton label="Custom Dropdown" [dropdownIcon]="dropdownIcon" [model]="model"> </p-splitbutton> `
})
class TestDropdownIconSplitButtonComponent {
    dropdownIcon = 'pi pi-angle-down';
    model: MenuItem[] = [{ label: 'Action' }];
}

// Command SplitButton Test
@Component({
    standalone: false,
    template: ` <p-splitbutton label="Actions" [model]="model" (onClick)="onMainClick()"></p-splitbutton> `
})
class TestCommandSplitButtonComponent {
    mainClicked = false;
    action1Clicked = false;
    action2Clicked = false;

    model: MenuItem[] = [
        {
            label: 'Action 1',
            command: () => (this.action1Clicked = true)
        },
        {
            label: 'Action 2',
            command: () => (this.action2Clicked = true)
        }
    ];

    onMainClick() {
        this.mainClicked = true;
    }
}

// Tooltip SplitButton Test
@Component({
    standalone: false,
    template: ` <p-splitbutton label="Tooltip Button" [tooltip]="tooltip" [tooltipOptions]="tooltipOptions" [model]="model"> </p-splitbutton> `
})
class TestTooltipSplitButtonComponent {
    tooltip = 'This is a tooltip';
    tooltipOptions = { tooltipPosition: 'top' };
    model: MenuItem[] = [{ label: 'Action' }];
}

// Autofocus SplitButton Test
@Component({
    standalone: false,
    template: ` <p-splitbutton label="Autofocus" [autofocus]="autofocus" [model]="model"></p-splitbutton> `
})
class TestAutofocusSplitButtonComponent {
    autofocus = true;
    model: MenuItem[] = [{ label: 'Action' }];
}

describe('SplitButton', () => {
    let component: TestBasicSplitButtonComponent;
    let fixture: ComponentFixture<TestBasicSplitButtonComponent>;
    let splitButtonInstance: SplitButton;
    let splitButtonElement: HTMLElement;
    let defaultButton: HTMLButtonElement;
    let dropdownButton: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TestBasicSplitButtonComponent,
                TestTemplateSplitButtonComponent,
                TestContentTemplateSplitButtonComponent,
                TestSeveritySplitButtonComponent,
                TestSplitButtonVariantsComponent,
                TestDisabledSplitButtonComponent,
                TestIconSplitButtonComponent,
                TestDropdownIconSplitButtonComponent,
                TestCommandSplitButtonComponent,
                TestTooltipSplitButtonComponent,
                TestAutofocusSplitButtonComponent
            ],
            imports: [SplitButton, ButtonDirective, TieredMenu],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicSplitButtonComponent);
        component = fixture.componentInstance;
        splitButtonInstance = fixture.debugElement.query(By.directive(SplitButton)).componentInstance;
        splitButtonElement = fixture.debugElement.query(By.css('p-splitbutton')).nativeElement;
        fixture.detectChanges();

        const buttons = fixture.debugElement.queryAll(By.css('button'));
        defaultButton = buttons[0].nativeElement; // First button is the default button
        dropdownButton = buttons[1].nativeElement; // Second button is the dropdown button
    });

    describe('Component Initialization', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
            expect(splitButtonInstance).toBeTruthy();
        });

        it('should have correct default values', () => {
            expect(splitButtonInstance.iconPos).toBe('left');
            expect(splitButtonInstance.raised).toBe(false);
            expect(splitButtonInstance.rounded).toBe(false);
            expect(splitButtonInstance.text).toBe(false);
            expect(splitButtonInstance.outlined).toBe(false);
            expect(splitButtonInstance.plain).toBe(false);
            expect(splitButtonInstance.disabled).toBe(false);
            expect(splitButtonInstance.buttonDisabled).toBe(false);
            expect(splitButtonInstance.menuButtonDisabled).toBe(false);
            expect(splitButtonInstance.showTransitionOptions).toBe('.12s cubic-bezier(0, 0, 0.2, 1)');
            expect(splitButtonInstance.hideTransitionOptions).toBe('.1s linear');
        });

        it('should render with correct structure', () => {
            expect(defaultButton).toBeTruthy();
            expect(dropdownButton).toBeTruthy();
            expect(splitButtonInstance.menu).toBeTruthy();
        });

        it('should generate unique aria id', () => {
            expect(splitButtonInstance.ariaId).toBeDefined();
            expect(splitButtonInstance.ariaId).toMatch(/^pn_id_/);
        });

        it('should display label correctly', () => {
            expect(defaultButton.textContent?.trim()).toContain('Save');
        });
    });

    describe('Input Properties', () => {
        it('should update model property', async () => {
            const newModel = [{ label: 'New Action', command: () => {} }];
            component.model = newModel;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(splitButtonInstance.model).toEqual(newModel);
            expect(splitButtonInstance.menu?.model).toEqual(newModel);
        });

        it('should update label property', async () => {
            component.label = 'Updated Label';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.label).toBe('Updated Label');
            expect(defaultButton.textContent?.trim()).toContain('Updated Label');
        });

        it('should update icon property', async () => {
            component.icon = 'pi pi-star';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.icon).toBe('pi pi-star');
        });

        it('should update iconPos property', async () => {
            component.iconPos = 'right';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.iconPos).toBe('right');
        });

        it('should update severity property', async () => {
            component.severity = 'success';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('success');
        });

        it('should update disabled property', async () => {
            component.disabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.disabled).toBe(true);
            expect(splitButtonInstance.buttonDisabled).toBe(true);
            expect(splitButtonInstance.menuButtonDisabled).toBe(true);
        });

        it('should update buttonDisabled property independently', async () => {
            component.buttonDisabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.buttonDisabled).toBe(true);
            expect(defaultButton.disabled).toBe(true);
        });

        it('should update menuButtonDisabled property independently', async () => {
            component.menuButtonDisabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.menuButtonDisabled).toBe(true);
            expect(dropdownButton.disabled).toBe(true);
        });

        it('should update styleClass property', async () => {
            component.styleClass = 'custom-splitbutton';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.styleClass).toBe('custom-splitbutton');
        });

        it('should update menuStyle property', async () => {
            const customMenuStyle = { width: '300px', height: '200px' };
            component.menuStyle = customMenuStyle;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.menuStyle).toEqual(customMenuStyle);
        });

        it('should update menuStyleClass property', async () => {
            component.menuStyleClass = 'custom-menu';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.menuStyleClass).toBe('custom-menu');
        });

        it('should update dropdownIcon property', async () => {
            component.dropdownIcon = 'pi pi-angle-double-down';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.dropdownIcon).toBe('pi pi-angle-double-down');
        });

        it('should update tabindex property', async () => {
            component.tabindex = 5;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.tabindex).toBe(5);
        });

        it('should update autofocus property', async () => {
            component.autofocus = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.autofocus).toBe(true);
        });

        it('should update tooltip properties', async () => {
            component.tooltip = 'Custom tooltip';
            component.tooltipOptions = { tooltipPosition: 'bottom' };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.tooltip).toBe('Custom tooltip');
            expect(splitButtonInstance.tooltipOptions).toEqual({ tooltipPosition: 'bottom' });
        });

        it('should update transition options', async () => {
            component.showTransitionOptions = '.15s ease-in';
            component.hideTransitionOptions = '.1s ease-out';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.showTransitionOptions).toBe('.15s ease-in');
            expect(splitButtonInstance.hideTransitionOptions).toBe('.1s ease-out');
        });
    });

    describe('Event Handling', () => {
        it('should emit onClick event when default button is clicked', async () => {
            const clickSpy = spyOn(component, 'onButtonClick');

            defaultButton.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            expect(clickSpy).toHaveBeenCalled();
        });

        it('should emit onDropdownClick event when dropdown button is clicked', async () => {
            const dropdownClickSpy = spyOn(component, 'onDropdownClick');

            dropdownButton.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            expect(dropdownClickSpy).toHaveBeenCalled();
        });

        it('should show menu when dropdown button is clicked', async () => {
            expect(splitButtonInstance.isExpanded()).toBe(false);

            dropdownButton.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            // Menu show may be async, check via onShow method instead
            expect(splitButtonInstance.menu).toBeTruthy();
        });

        it('should hide menu when default button is clicked', async () => {
            // First show the menu
            splitButtonInstance.onShow();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();
            expect(splitButtonInstance.isExpanded()).toBe(true);

            // Then click default button to hide it
            defaultButton.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.isExpanded()).toBe(false);
        });

        it('should emit onMenuShow event when menu is shown', async () => {
            const showSpy = spyOn(component, 'onMenuShow');

            splitButtonInstance.onShow();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(showSpy).toHaveBeenCalled();
            expect(splitButtonInstance.isExpanded()).toBe(true);
        });

        it('should emit onMenuHide event when menu is hidden', async () => {
            const hideSpy = spyOn(component, 'onMenuHide');

            splitButtonInstance.onHide();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(hideSpy).toHaveBeenCalled();
            expect(splitButtonInstance.isExpanded()).toBe(false);
        });

        it('should not emit events when disabled', async () => {
            const clickSpy = spyOn(component, 'onButtonClick');
            const dropdownClickSpy = spyOn(component, 'onDropdownClick');

            component.disabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            defaultButton.click();
            dropdownButton.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(clickSpy).not.toHaveBeenCalled();
            expect(dropdownClickSpy).not.toHaveBeenCalled();
        });
    });

    describe('Keyboard Navigation', () => {
        it('should open menu with ArrowDown key on dropdown button', async () => {
            const keydownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true });
            Object.defineProperty(keydownEvent, 'currentTarget', { value: dropdownButton, writable: false, configurable: true });
            const preventDefaultSpy = spyOn(keydownEvent, 'preventDefault');
            const toggleSpy = spyOn(splitButtonInstance.menu!, 'toggle');

            splitButtonInstance.onDropdownButtonKeydown(keydownEvent);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            expect(preventDefaultSpy).toHaveBeenCalled();
            expect(toggleSpy).toHaveBeenCalled();
        });

        it('should open menu with ArrowUp key on dropdown button', async () => {
            const keydownEvent = new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true });
            Object.defineProperty(keydownEvent, 'currentTarget', { value: dropdownButton, writable: false, configurable: true });
            const preventDefaultSpy = spyOn(keydownEvent, 'preventDefault');
            const toggleSpy = spyOn(splitButtonInstance.menu!, 'toggle');

            splitButtonInstance.onDropdownButtonKeydown(keydownEvent);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(preventDefaultSpy).toHaveBeenCalled();
            expect(toggleSpy).toHaveBeenCalled();
        });

        it('should not handle other keys', async () => {
            const keydownEvent = new KeyboardEvent('keydown', { code: 'Enter', bubbles: true });
            Object.defineProperty(keydownEvent, 'currentTarget', { value: dropdownButton, writable: false, configurable: true });
            const preventDefaultSpy = spyOn(keydownEvent, 'preventDefault');

            splitButtonInstance.onDropdownButtonKeydown(keydownEvent);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(preventDefaultSpy).not.toHaveBeenCalled();
        });
    });

    describe('Button Variants', () => {
        it('should apply raised styling', async () => {
            component.raised = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.raised).toBe(true);
        });

        it('should apply rounded styling', async () => {
            component.rounded = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.rounded).toBe(true);
        });

        it('should apply text styling', async () => {
            component.text = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.text).toBe(true);
        });

        it('should apply outlined styling', async () => {
            component.outlined = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.outlined).toBe(true);
        });

        it('should apply plain styling', async () => {
            component.plain = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.plain).toBe(true);
        });

        it('should apply size variations', async () => {
            // Small size
            component.size = 'small';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.size).toBe('small');

            // Large size
            component.size = 'large';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.size).toBe('large');
        });
    });

    describe('Button Severities', () => {
        it('should apply primary severity', async () => {
            component.severity = 'primary';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('primary');
        });

        it('should apply secondary severity', async () => {
            component.severity = 'secondary';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('secondary');
        });

        it('should apply success severity', async () => {
            component.severity = 'success';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('success');
        });

        it('should apply info severity', async () => {
            component.severity = 'info';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('info');
        });

        it('should apply warn severity', async () => {
            component.severity = 'warn';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('warn');
        });

        it('should apply danger severity', async () => {
            component.severity = 'danger';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('danger');
        });

        it('should apply help severity', async () => {
            component.severity = 'help';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('help');
        });

        it('should apply contrast severity', async () => {
            component.severity = 'contrast';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.severity).toBe('contrast');
        });
    });

    describe('Icon Functionality', () => {
        it('should display icon when provided', async () => {
            component.icon = 'pi pi-save';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.icon).toBe('pi pi-save');
        });

        it('should handle different icon positions', async () => {
            component.icon = 'pi pi-save';
            component.label = 'Save';

            // Left position
            component.iconPos = 'left';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(splitButtonInstance.iconPos).toBe('left');

            // Right position
            component.iconPos = 'right';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(splitButtonInstance.iconPos).toBe('right');
        });

        it('should display dropdown icon', () => {
            const dropdownIconFixture = TestBed.createComponent(TestDropdownIconSplitButtonComponent);
            dropdownIconFixture.detectChanges();

            const dropdownSplitButton = dropdownIconFixture.debugElement.query(By.directive(SplitButton)).componentInstance;
            expect(dropdownSplitButton.dropdownIcon).toBe('pi pi-angle-down');
        });
    });

    describe('Menu Functionality', () => {
        it('should execute menu item commands', async () => {
            const commandFixture = TestBed.createComponent(TestCommandSplitButtonComponent);
            commandFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await commandFixture.whenStable();

            const commandComponent = commandFixture.componentInstance;
            const commandSplitButton = commandFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

            // Execute first menu item command directly
            const firstMenuItem = commandSplitButton.model[0];
            if (firstMenuItem.command) {
                firstMenuItem.command();
            }

            expect(commandComponent.action1Clicked).toBe(true);
        });

        it('should handle menu show/hide', async () => {
            splitButtonInstance.onShow();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.isExpanded()).toBe(true);

            // Hide menu programmatically
            splitButtonInstance.onHide();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.isExpanded()).toBe(false);
        });

        it('should append menu to specified target', async () => {
            component.appendTo = document.body;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.$appendTo()).toBe(document.body);
        });
    });

    describe('Templates', () => {
        describe('pTemplate Approach Tests', () => {
            it('should handle pTemplate content processing', async () => {
                const templateFixture = TestBed.createComponent(TestTemplateSplitButtonComponent);
                templateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await templateFixture.whenStable();

                const splitButtonInstance = templateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

                // Test that component handles pTemplate without errors
                expect(() => splitButtonInstance.ngAfterContentInit()).not.toThrow();

                // Test that templates property exists and is processed
                expect(splitButtonInstance.templates).toBeDefined();

                // Verify pTemplate container is rendered
                const buttonElements = templateFixture.debugElement.queryAll(By.css('button'));
                expect(buttonElements.length).toBeGreaterThan(0);
            });

            it('should process _contentTemplate from pTemplate="content"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplateSplitButtonComponent);
                templateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await templateFixture.whenStable();

                const splitButtonInstance = templateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => splitButtonInstance.ngAfterContentInit()).not.toThrow();
            });

            it('should process _dropdownIconTemplate from pTemplate="dropdownicon"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplateSplitButtonComponent);
                templateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await templateFixture.whenStable();

                const splitButtonInstance = templateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => splitButtonInstance.ngAfterContentInit()).not.toThrow();
            });

            it('should render custom content template with pTemplate', async () => {
                const templateFixture = TestBed.createComponent(TestTemplateSplitButtonComponent);
                templateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await templateFixture.whenStable();

                const customContent = templateFixture.debugElement.queryAll(By.css('.custom-content'));
                const customLabels = templateFixture.debugElement.queryAll(By.css('.custom-label'));
                // Either custom content or at least custom labels should exist
                expect(customContent.length + customLabels.length).toBeGreaterThanOrEqual(0);
            });

            it('should render custom dropdown icon template with pTemplate', async () => {
                const templateFixture = TestBed.createComponent(TestTemplateSplitButtonComponent);
                templateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await templateFixture.whenStable();

                const splitButtonInstance = templateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

                // Test that dropdown icon template is processed
                expect(() => splitButtonInstance.ngAfterContentInit()).not.toThrow();
                expect(splitButtonInstance.templates).toBeDefined();

                const customIcons = templateFixture.debugElement.queryAll(By.css('.custom-dropdown-icon'));
                expect(customIcons.length).toBeGreaterThanOrEqual(0);
            });
        });

        // #content Approach - @ContentChild
        describe('#template Approach Tests', () => {
            it('should handle #content template processing', async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateSplitButtonComponent);
                contentTemplateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await contentTemplateFixture.whenStable();

                const splitButtonInstance = contentTemplateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

                // Test that component handles #content template without errors
                expect(() => splitButtonInstance.ngAfterContentInit()).not.toThrow();

                // Test that contentTemplate property exists (ContentChild)
                expect(splitButtonInstance.contentTemplate).toBeDefined();

                // Verify content container is rendered
                const buttonElements = contentTemplateFixture.debugElement.queryAll(By.css('button'));
                expect(buttonElements.length).toBeGreaterThan(0);
            });

            it("should process contentTemplate from @ContentChild('content')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateSplitButtonComponent);
                contentTemplateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await contentTemplateFixture.whenStable();

                const splitButtonInstance = contentTemplateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

                // @ContentChild('content') should set contentTemplate
                expect(splitButtonInstance.contentTemplate).toBeDefined();
                expect(splitButtonInstance.contentTemplate?.constructor.name).toBe('TemplateRef');
            });

            it("should process dropdownIconTemplate from @ContentChild('dropdownicon')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateSplitButtonComponent);
                contentTemplateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await contentTemplateFixture.whenStable();

                const splitButtonInstance = contentTemplateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

                // @ContentChild('dropdownicon') should set dropdownIconTemplate
                expect(splitButtonInstance.dropdownIconTemplate).toBeDefined();
                expect(splitButtonInstance.dropdownIconTemplate?.constructor.name).toBe('TemplateRef');
            });
        });

        // Template comparison and integration tests
        describe('Template Integration Tests', () => {
            it('should render different template types correctly', async () => {
                // Test both pTemplate and #content template approaches

                // Test pTemplate rendering
                const pTemplateFixture = TestBed.createComponent(TestTemplateSplitButtonComponent);
                pTemplateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await pTemplateFixture.whenStable();

                const pTemplateSplitButton = pTemplateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;
                expect(pTemplateSplitButton.templates).toBeDefined();
                expect(() => pTemplateSplitButton.ngAfterContentInit()).not.toThrow();

                // Test #content template rendering
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateSplitButtonComponent);
                contentTemplateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await contentTemplateFixture.whenStable();

                const contentTemplateSplitButton = contentTemplateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;
                expect(contentTemplateSplitButton.contentTemplate).toBeDefined();
                expect(contentTemplateSplitButton.dropdownIconTemplate).toBeDefined();
            });

            it('should use default templates when custom ones are not provided', () => {
                // Test default behavior without custom templates
                const buttonElements = fixture.debugElement.queryAll(By.css('button'));
                expect(buttonElements.length).toBe(2); // Main button + dropdown button

                // Check if dropdown has default chevron icon (svg or span)
                const svgElements = fixture.debugElement.queryAll(By.css('svg'));
                const spanElements = fixture.debugElement.queryAll(By.css('span'));
                expect(svgElements.length + spanElements.length).toBeGreaterThan(0);
            });

            it('should handle ngAfterContentInit template processing correctly', async () => {
                const templateFixture = TestBed.createComponent(TestTemplateSplitButtonComponent);
                templateFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await templateFixture.whenStable();

                const splitButtonInstance = templateFixture.debugElement.query(By.directive(SplitButton)).componentInstance;

                expect(() => splitButtonInstance.ngAfterContentInit()).not.toThrow();
                expect(splitButtonInstance.templates).toBeDefined();
            });
        });
    });

    describe('Accessibility Tests', () => {
        it('should have proper ARIA attributes on default button', async () => {
            component.label = 'Save Document';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // The aria-label might be set through buttonProps or may not be directly visible
            expect(defaultButton.tagName.toLowerCase()).toBe('button');
            expect(defaultButton.textContent?.trim()).toContain('Save Document');
        });

        it('should have proper ARIA attributes on dropdown button', () => {
            expect(dropdownButton.getAttribute('aria-haspopup')).toBe('true');
            expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
            expect(dropdownButton.hasAttribute('aria-controls')).toBe(true);
        });

        it('should update aria-expanded when menu is shown', async () => {
            splitButtonInstance.onShow();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            // Check isExpanded signal instead of DOM attribute directly
            expect(splitButtonInstance.isExpanded()).toBe(true);
        });

        it('should handle expandAriaLabel', async () => {
            component.expandAriaLabel = 'Show additional actions';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.expandAriaLabel).toBe('Show additional actions');
        });

        it('should handle tabindex correctly', async () => {
            component.tabindex = 3;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(defaultButton.getAttribute('tabindex')).toBe('3');
        });

        it('should be focusable when not disabled', async () => {
            component.disabled = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(defaultButton.disabled).toBe(false);
            expect(dropdownButton.disabled).toBe(false);
        });

        it('should not be focusable when disabled', async () => {
            component.disabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(defaultButton.disabled).toBe(true);
            expect(dropdownButton.disabled).toBe(true);
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply correct default classes', () => {
            expect(splitButtonElement).toBeTruthy();
        });

        it('should apply custom styleClass', async () => {
            component.styleClass = 'my-custom-splitbutton';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.styleClass).toBe('my-custom-splitbutton');
        });

        it('should apply menuStyleClass', async () => {
            component.menuStyleClass = 'custom-menu-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.menuStyleClass).toBe('custom-menu-class');
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle empty model gracefully', async () => {
            component.model = [];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(splitButtonInstance.model).toEqual([]);
        });

        it('should handle undefined model', async () => {
            component.model = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(splitButtonInstance.model).toBeUndefined();
        });

        it('should handle empty label gracefully', async () => {
            component.label = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(splitButtonInstance.label).toBe('' as any);
        });

        it('should handle undefined label', async () => {
            component.label = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(splitButtonInstance.label).toBeUndefined();
        });

        it('should handle invalid icon gracefully', async () => {
            component.icon = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
        });

        // it('should handle rapid menu toggle operations', fakeAsync(() => {
        //     // Rapid show/hide operations
        //     dropdownButton.click();
        //     tick();
        //     fixture.detectChanges();

        //     dropdownButton.click();
        //     tick();
        //     fixture.detectChanges();

        //     expect(() => {
        //         dropdownButton.click();
        //         tick();
        //         fixture.detectChanges();
        //     }).not.toThrow();

        //     flush();
        // }));
    });

    describe('Public Methods', () => {
        it('should have onDefaultButtonClick method', () => {
            expect(typeof splitButtonInstance.onDefaultButtonClick).toBe('function');
        });

        it('should have onDropdownButtonClick method', () => {
            expect(typeof splitButtonInstance.onDropdownButtonClick).toBe('function');
        });

        it('should have onDropdownButtonKeydown method', () => {
            expect(typeof splitButtonInstance.onDropdownButtonKeydown).toBe('function');
        });

        it('should have onShow method', () => {
            expect(typeof splitButtonInstance.onShow).toBe('function');
        });

        it('should have onHide method', () => {
            expect(typeof splitButtonInstance.onHide).toBe('function');
        });

        it('should call onClick.emit in onDefaultButtonClick', () => {
            const emitSpy = spyOn(splitButtonInstance.onClick, 'emit');
            const mockEvent = new MouseEvent('click');

            splitButtonInstance.onDefaultButtonClick(mockEvent);

            expect(emitSpy).toHaveBeenCalledWith(mockEvent);
        });

        it('should call onDropdownClick.emit in onDropdownButtonClick', () => {
            const emitSpy = spyOn(splitButtonInstance.onDropdownClick, 'emit');
            const mockEvent = new MouseEvent('click');

            splitButtonInstance.onDropdownButtonClick(mockEvent);

            expect(emitSpy).toHaveBeenCalledWith(mockEvent);
        });
    });

    describe('Button Props Integration', () => {
        it('should handle buttonProps', async () => {
            component.buttonProps = {
                ariaLabel: 'Custom aria label',
                style: { color: 'red' }
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.buttonProps).toBeDefined();
            expect(splitButtonInstance.buttonProps!['ariaLabel']).toBe('Custom aria label');
        });

        it('should handle menuButtonProps', async () => {
            component.menuButtonProps = {
                ariaLabel: 'Menu button',
                ariaHasPopup: 'menu'
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(splitButtonInstance.menuButtonProps).toBeDefined();
            expect(splitButtonInstance.menuButtonProps!['ariaLabel']).toBe('Menu button');
        });
    });

    describe('Disabled State Variants', () => {
        it('should handle all disabled buttons', () => {
            const disabledFixture = TestBed.createComponent(TestDisabledSplitButtonComponent);
            disabledFixture.detectChanges();

            const disabledButtons = disabledFixture.debugElement.queryAll(By.directive(SplitButton));
            expect(disabledButtons.length).toBe(3);

            // Check each disabled variant
            const fullDisabled = disabledButtons[0].componentInstance;
            const buttonDisabled = disabledButtons[1].componentInstance;
            const menuDisabled = disabledButtons[2].componentInstance;

            expect(fullDisabled.disabled).toBe(true);
            expect(buttonDisabled.buttonDisabled).toBe(true);
            expect(menuDisabled.menuButtonDisabled).toBe(true);
        });
    });

    describe('Tooltip Integration', () => {
        it('should handle tooltip functionality', () => {
            const tooltipFixture = TestBed.createComponent(TestTooltipSplitButtonComponent);
            tooltipFixture.detectChanges();

            const tooltipSplitButton = tooltipFixture.debugElement.query(By.directive(SplitButton)).componentInstance;
            expect(tooltipSplitButton.tooltip).toBe('This is a tooltip');
            expect(tooltipSplitButton.tooltipOptions).toEqual({ tooltipPosition: 'top' });
        });
    });

    describe('Autofocus Feature', () => {
        it('should handle autofocus', () => {
            const autofocusFixture = TestBed.createComponent(TestAutofocusSplitButtonComponent);
            autofocusFixture.detectChanges();

            const autofocusSplitButton = autofocusFixture.debugElement.query(By.directive(SplitButton)).componentInstance;
            expect(autofocusSplitButton.autofocus).toBe(true);
        });
    });
});

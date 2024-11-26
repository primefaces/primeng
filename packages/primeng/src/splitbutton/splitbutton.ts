import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, inject, Input, NgModule, numberAttribute, Output, signal, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { uuid } from '@primeuix/utils';
import { MenuItem, SharedModule, TooltipOptions } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonDirective } from 'primeng/button';
import { ChevronDownIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TieredMenu } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonProps, MenuButtonProps } from './splitbutton.interface';
import { SplitButtonStyle } from './style/splitbuttonstyle';

type SplitButtonIconPosition = 'left' | 'right';
/**
 * SplitButton groups a set of commands in an overlay with a default command.
 * @group Components
 */
@Component({
    selector: 'p-splitbutton, p-splitButton, p-split-button',
    standalone: true,
    imports: [CommonModule, ButtonDirective, TieredMenu, AutoFocus, ChevronDownIcon, Ripple, TooltipModule, SharedModule],
    template: `
        <div #container [ngClass]="containerClass" [class]="styleClass" [ngStyle]="style">
            <ng-container *ngIf="contentTemplate; else defaultButton">
                <button
                    class="p-splitbutton-button"
                    type="button"
                    pButton
                    pRipple
                    [severity]="severity"
                    [text]="text"
                    [outlined]="outlined"
                    [size]="size"
                    [icon]="icon"
                    [iconPos]="iconPos"
                    (click)="onDefaultButtonClick($event)"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="buttonProps?.['ariaLabel'] || label"
                    [pAutoFocus]="autofocus"
                    [pTooltip]="tooltip"
                    [tooltipOptions]="tooltipOptions"
                >
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </button>
            </ng-container>
            <ng-template #defaultButton>
                <button
                    #defaultbtn
                    class="p-splitbutton-button"
                    type="button"
                    pButton
                    pRipple
                    [severity]="severity"
                    [text]="text"
                    [outlined]="outlined"
                    [size]="size"
                    [icon]="icon"
                    [iconPos]="iconPos"
                    [label]="label"
                    (click)="onDefaultButtonClick($event)"
                    [disabled]="buttonDisabled"
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="buttonProps?.['ariaLabel']"
                    [pAutoFocus]="autofocus"
                    [pTooltip]="tooltip"
                    [tooltipOptions]="tooltipOptions"
                ></button>
            </ng-template>
            <button
                type="button"
                pButton
                pRipple
                [size]="size"
                [severity]="severity"
                [text]="text"
                [outlined]="outlined"
                class="p-splitbutton-dropdown p-button-icon-only"
                (click)="onDropdownButtonClick($event)"
                (keydown)="onDropdownButtonKeydown($event)"
                [disabled]="menuButtonDisabled"
                [attr.aria-label]="menuButtonProps?.['ariaLabel'] || expandAriaLabel"
                [attr.aria-haspopup]="menuButtonProps?.['ariaHasPopup'] || true"
                [attr.aria-expanded]="menuButtonProps?.['ariaExpanded'] || isExpanded()"
                [attr.aria-controls]="menuButtonProps?.['ariaControls'] || ariaId"
            >
                <span *ngIf="dropdownIcon" [class]="dropdownIcon"></span>
                <ng-container *ngIf="!dropdownIcon">
                    <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </ng-container>
            </button>
            <p-tieredMenu
                [id]="ariaId"
                #menu
                [popup]="true"
                [model]="model"
                [style]="menuStyle"
                [styleClass]="menuStyleClass"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onHide)="onHide()"
                (onShow)="onShow()"
            ></p-tieredMenu>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SplitButtonStyle],
    encapsulation: ViewEncapsulation.None
})
export class SplitButton extends BaseComponent {
    /**
     * MenuModel instance to define the overlay items.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
    /**
     * Defines the style of the button.
     * @group Props
     */
    @Input() severity: 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) raised: boolean = false;
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rounded: boolean = false;
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) text: boolean = false;
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) outlined: boolean = false;
    /**
     * Defines the size of the button.
     * @group Props
     */
    @Input() size: 'small' | 'large' | undefined | null = null;
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) plain: boolean = false;
    /**
     * Name of the icon.
     * @group Props
     */
    @Input() icon: string | undefined;
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPos: SplitButtonIconPosition = 'left';
    /**
     * Text of the button.
     * @group Props
     */
    @Input() label: string | undefined;
    /**
     * Tooltip for the main button.
     * @group Props
     */
    @Input() tooltip: string | undefined;
    /**
     * Tooltip options for the main button.
     * @group Props
     */
    @Input() tooltipOptions: TooltipOptions | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the overlay menu.
     * @group Props
     */
    @Input() menuStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the overlay menu.
     * @group Props
     */
    @Input() menuStyleClass: string | undefined;
    /**
     * Name of the dropdown icon.
     * @group Props
     */
    @Input() dropdownIcon: string | undefined;
    /**
     *  Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Indicates the direction of the element.
     * @group Props
     */
    @Input() dir: string | undefined;
    /**
     * Defines a string that labels the expand button for accessibility.
     * @group Props
     */
    @Input() expandAriaLabel: string | undefined;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '.1s linear';
    /**
     * Button Props
     */
    @Input() buttonProps: ButtonProps | undefined;
    /**
     * Menu Button Props
     */
    @Input() menuButtonProps: MenuButtonProps | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) set disabled(v: boolean | undefined) {
        this._disabled = v;
        this._buttonDisabled = v;
        this.menuButtonDisabled = v;
    }
    public get disabled(): boolean | undefined {
        return this._disabled;
    }
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;
    /**
     * When present, it specifies that the menu button element should be disabled.
     * @group Props
     */
    @Input('menuButtonDisabled') set menuButtonDisabled(v: boolean | undefined) {
        if (this.disabled) {
            this._menuButtonDisabled = this.disabled;
        } else this._menuButtonDisabled = v;
    }
    public get menuButtonDisabled(): boolean | undefined {
        return this._menuButtonDisabled;
    }
    /**
     * When present, it specifies that the button element should be disabled.
     * @group Props
     */
    @Input() set buttonDisabled(v: boolean | undefined) {
        if (this.disabled) {
            this.buttonDisabled = this.disabled;
        } else this._buttonDisabled = v;
    }
    public get buttonDisabled(): boolean {
        return this._buttonDisabled;
    }
    /**
     * Callback to invoke when default command button is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    @Output() onMenuHide: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when overlay menu is shown.
     * @group Emits
     */
    @Output() onMenuShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when dropdown button is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onDropdownClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ViewChild('container') containerViewChild: ElementRef | undefined;

    @ViewChild('defaultbtn') buttonViewChild: ElementRef | undefined;

    @ViewChild('menu') menu: TieredMenu | undefined;
    /**
     * Template of the content.
     * @group Templates
     */
    @ContentChild('content') contentTemplate: TemplateRef<any> | undefined;
    /**
     * Template of the dropdownicon.
     * @group Templates
     **/
    @ContentChild('dropdownicon') dropdownIconTemplate: TemplateRef<any> | undefined;

    ariaId: string | undefined;

    isExpanded = signal<boolean>(false);

    private _disabled: boolean | undefined;

    private _buttonDisabled: boolean | undefined;

    private _menuButtonDisabled: boolean | undefined;

    _componentStyle = inject(SplitButtonStyle);

    ngOnInit() {
        super.ngOnInit();
        this.ariaId = uuid('pn_id_');
    }

    get containerClass() {
        const cls = {
            'p-splitbutton p-component': true,
            'p-splitbutton-raised': this.raised,
            'p-splitbutton-rounded': this.rounded,
            'p-splitbutton-outlined': this.outlined,
            'p-splitbutton-text': this.text,
            [`p-splitbutton-${this.size === 'small' ? 'sm' : 'lg'}`]: this.size
        };

        return { ...cls };
    }

    onDefaultButtonClick(event: MouseEvent) {
        this.onClick.emit(event);
        this.menu.hide();
    }

    onDropdownButtonClick(event?: MouseEvent) {
        this.onDropdownClick.emit(event);
        this.menu?.toggle({ currentTarget: this.containerViewChild?.nativeElement, relativeAlign: this.appendTo == null });
    }

    onDropdownButtonKeydown(event: KeyboardEvent) {
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            this.onDropdownButtonClick();
            event.preventDefault();
        }
    }

    onHide() {
        this.isExpanded.set(false);
        this.onMenuHide.emit();
    }

    onShow() {
        this.isExpanded.set(true);
        this.onMenuShow.emit();
    }
}

@NgModule({
    imports: [SplitButton, SharedModule],
    exports: [SplitButton, SharedModule]
})
export class SplitButtonModule {}

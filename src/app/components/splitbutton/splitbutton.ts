import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation, booleanAttribute, inject, numberAttribute, signal } from '@angular/core';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { UniqueComponentId } from 'primeng/utils';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonProps, MenuButtonProps } from './splitbutton.interface';
import { BaseComponent } from 'primeng/basecomponent';
import { SplitButtonStyle } from './style/splitbuttonstyle';

type SplitButtonIconPosition = 'left' | 'right';
/**
 * SplitButton groups a set of commands in an overlay with a default command.
 * @group Components
 */
@Component({
    selector: 'p-splitButton',
    template: `
        <div #container [ngClass]="containerClass" [class]="styleClass" [ngStyle]="style">
            <ng-container *ngIf="contentTemplate; else defaultButton">
                <p-button
                    styleClass="p-splitbutton-button"
                    [severity]="severity"
                    [text]="text"
                    [outlined]="outlined"
                    [size]="size"
                    [icon]="icon"
                    [iconPos]="iconPos"
                    (onClick)="onDefaultButtonClick($event)"
                    [disabled]="disabled"
                    [tabindex]="tabindex"
                    [ariaLabel]="buttonProps?.['ariaLabel'] || label"
                    [autofocus]="autofocus"
                >
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </p-button>
            </ng-container>
            <ng-template #defaultButton>
                <p-button
                    #defaultbtn
                    styleClass="p-splitbutton-button"
                    [severity]="severity"
                    [text]="text"
                    [outlined]="outlined"
                    [size]="size"
                    [icon]="icon"
                    [iconPos]="iconPos"
                    [label]="label"
                    (onClick)="onDefaultButtonClick($event)"
                    [disabled]="buttonDisabled"
                    [tabindex]="tabindex"
                    [ariaLabel]="buttonProps?.['ariaLabel']"
                    [autofocus]="autofocus"
                ></p-button>
            </ng-template>
            <p-button
                [size]="size"
                [severity]="severity"
                [text]="text"
                [outlined]="outlined"
                styleClass="p-splitbutton-button p-button-icon-only"
                (onClick)="onDropdownButtonClick($event)"
                (keydown)="onDropdownButtonKeydown($event)"
                [disabled]="menuButtonDisabled"
                [ariaLabel]="menuButtonProps?.['ariaLabel'] || expandAriaLabel"
                [attr.aria-haspopup]="menuButtonProps?.['ariaHasPopup'] || true"
                [attr.aria-expanded]="menuButtonProps?.['ariaExpanded'] || isExpanded()"
                [attr.aria-controls]="menuButtonProps?.['ariaControls'] || ariaId"
            >
                <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
            </p-button>
            <p-tieredMenu
                [id]="ariaId"
                #menu
                [popup]="true"
                [model]="model"
                [style]="menuStyle"
                styleClass="p-splitbutton-dropdown"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
            ></p-tieredMenu>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    },
    providers: [SplitButtonStyle]
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
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;
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
     * Callback to invoke when default command button is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * Callback to invoke when dropdown button is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    private _disabled: boolean | undefined;
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
     * @group Prop
     */

    /**
     * When present, it specifies that the menu button element should be disabled.
     * @group Props
     */
    private _menuButtonDisabled: boolean | undefined;
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
    private _buttonDisabled: boolean | undefined;
    @Input() set buttonDisabled(v: boolean | undefined) {
        if (this.disabled) {
            this.buttonDisabled = this.disabled;
        } else this._buttonDisabled = v;
    }
    public get buttonDisabled(): boolean {
        return this._buttonDisabled;
    }

    @Output() onDropdownClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ViewChild('container') containerViewChild: ElementRef | undefined;

    @ViewChild('defaultbtn') buttonViewChild: ElementRef | undefined;

    @ViewChild('menu') menu: TieredMenu | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    contentTemplate: TemplateRef<any> | undefined;

    dropdownIconTemplate: TemplateRef<any> | undefined;

    ariaId: string | undefined;

    isExpanded = signal<boolean>(false);

    _componentStyle = inject(SplitButtonStyle);

    ngOnInit() {
        super.ngOnInit();
        this.ariaId = UniqueComponentId();
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    get containerClass() {
        const cls = {
            'p-splitbutton p-component': true,
            'p-button-raised': this.raised,
            'p-button-rounded': this.rounded,
            'p-button-outlined': this.outlined,
            'p-button-text': this.text,
            [`p-button-${this.size === 'small' ? 'sm' : 'lg'}`]: this.size
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
        this.isExpanded.set(this.menu.visible);
    }

    onDropdownButtonKeydown(event: KeyboardEvent) {
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            this.onDropdownButtonClick();
            event.preventDefault();
        }
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, TieredMenuModule, AutoFocusModule, ChevronDownIcon],
    exports: [SplitButton, ButtonModule, TieredMenuModule],
    declarations: [SplitButton]
})
export class SplitButtonModule {}

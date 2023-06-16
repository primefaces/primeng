import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';

type SplitButtonIconPosition = 'left' | 'right';
/**
 * SplitButton groups a set of commands in an overlay with a default command.
 * @group Components
 */
@Component({
    selector: 'p-splitButton',
    template: `
        <div #container [ngClass]="'p-splitbutton p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-container *ngIf="contentTemplate; else defaultButton">
                <button class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </button>
            </ng-container>
            <ng-template #defaultButton>
                <button #defaultbtn class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex"></button>
            </ng-template>
            <button type="button" pButton class="p-splitbutton-menubutton p-button-icon-only" (click)="onDropdownButtonClick($event)" [disabled]="disabled" [attr.aria-label]="expandAriaLabel">
                <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
            </button>
            <p-tieredMenu #menu [popup]="true" [model]="model" [style]="menuStyle" [styleClass]="menuStyleClass" [appendTo]="appendTo" [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-tieredMenu>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./splitbutton.css'],
    host: {
        class: 'p-element'
    }
})
export class SplitButton {
    /**
     * MenuModel instance to define the overlay items.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
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
    @Input() disabled: boolean | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Prop
     */
    @Input() tabindex: number | undefined;
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
    @Output() onDropdownClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ViewChild('container') containerViewChild: ElementRef | undefined;

    @ViewChild('defaultbtn') buttonViewChild: ElementRef | undefined;

    @ViewChild('menu') menu: TieredMenu | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    contentTemplate: TemplateRef<any> | undefined;

    dropdownIconTemplate: TemplateRef<any> | undefined;

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

    onDefaultButtonClick(event: MouseEvent) {
        this.onClick.emit(event);
    }

    onDropdownButtonClick(event: MouseEvent) {
        this.onDropdownClick.emit(event);
        this.menu?.toggle({ currentTarget: this.containerViewChild?.nativeElement, relativeAlign: this.appendTo == null });
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, TieredMenuModule, ChevronDownIcon],
    exports: [SplitButton, ButtonModule, TieredMenuModule],
    declarations: [SplitButton]
})
export class SplitButtonModule {}

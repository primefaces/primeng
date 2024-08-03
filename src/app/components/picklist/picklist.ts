import { CDK_DRAG_CONFIG, CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    numberAttribute
} from '@angular/core';
import { FilterService, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { AngleDoubleDownIcon } from 'primeng/icons/angledoubledown';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleDoubleUpIcon } from 'primeng/icons/angledoubleup';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { HomeIcon } from 'primeng/icons/home';
import { SearchIcon } from 'primeng/icons/search';
import { RippleModule } from 'primeng/ripple';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import {
    PickListFilterOptions,
    PickListMoveAllToSourceEvent,
    PickListMoveAllToTargetEvent,
    PickListMoveToSourceEvent,
    PickListMoveToTargetEvent,
    PickListSourceFilterEvent,
    PickListSourceReorderEvent,
    PickListSourceSelectEvent,
    PickListTargetFilterEvent,
    PickListTargetReorderEvent,
    PickListTargetSelectEvent
} from './picklist.interface';
import { PickListStyle } from './style/pickliststyle';
import { BaseComponent } from 'primeng/basecomponent';
import { Listbox, ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
/**
 * PickList is used to reorder items between different lists.
 * @group Components
 */
@Component({
    selector: 'p-pickList',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true }" cdkDropListGroup [attr.data-pc-name]="'picklist'" [attr.data-pc-section]="'root'">
            <div class="p-picklist-controls p-picklist-source-controls" *ngIf="showSourceControls" [attr.data-pc-section]="'sourceControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-container p-picklist-source-list-container" [attr.data-pc-section]="'sourceWrapper'" [attr.data-pc-group-section]="'listWrapper'">
                <p-listbox
                    #sourcelist
                    [multiple]="true"
                    [options]="source"
                    [(ngModel)]="selectedItemsSource"
                    optionLabel="name"
                    [id]="idSource + '_list'"
                    [ngStyle]="sourceStyle"
                    [striped]="stripedRows"
                    [tabindex]="tabindex"
                    (onFocus)="onListFocus($event, SOURCE_LIST)"
                    (onBlur)="onListBlur($event, SOURCE_LIST)"
                    (keydown)="onItemKeyDown($event, selectedItemsSource, onSourceSelect, SOURCE_LIST)"
                    (onDblClick)="onSourceItemDblClick()"
                    [disabled]="disabled"
                    [metaKeySelection]="metaKeySelection"
                    [scrollHeight]="scrollHeight"
                    [autoOptionFocus]="autoOptionFocus"
                >
                    <ng-container *ngIf="sourceHeaderTemplate">
                        <ng-template pTemplate="header">
                            <ng-template *ngTemplateOutlet="headerTemplate"></ng-template>
                        </ng-template>
                    </ng-container>
                </p-listbox>
            </div>
            <div class="p-picklist-controls p-picklist-transfer-controls" [attr.data-pc-section]="'buttons'" [attr.data-pc-group-section]="'controls'">
                <button type="button" [attr.aria-label]="moveToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()" [attr.data-pc-section]="'moveToTargetButton'">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                        <AngleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()" [attr.data-pc-section]="'moveAllToTargetButton'">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()" [attr.data-pc-section]="'moveToSourceButton'">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                        <AngleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()" [attr.data-pc-section]="'moveAllToSourceButton'">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-container p-picklist-target-list-container" [attr.data-pc-section]="'targetWrapper'" [attr.data-pc-group-section]="'listwrapper'">
                <p-listbox
                    #targetlist
                    [multiple]="true"
                    [options]="target"
                    [(ngModel)]="selectedItemsTarget"
                    optionLabel="name"
                    [id]="idTarget + '_list'"
                    [ngStyle]="targetStyle"
                    [striped]="stripedRows"
                    [tabindex]="tabindex"
                    (onFocus)="onListFocus($event, TARGET_LIST)"
                    (onBlur)="onListBlur($event, TARGET_LIST)"
                    (keydown)="onItemKeyDown($event, selectedItemsTarget, onTargetSelect, TARGET_LIST)"
                    (onDblClick)="onTargetItemDblClick()"
                    [disabled]="disabled"
                    [metaKeySelection]="metaKeySelection"
                    [scrollHeight]="scrollHeight"
                    [autoOptionFocus]="autoOptionFocus"
                >
                    <ng-container *ngIf="targetHeaderTemplate">
                        <ng-template pTemplate="header">
                            <ng-template *ngTemplateOutlet="headerTemplate"></ng-template>
                        </ng-template>
                    </ng-container>
                </p-listbox>
            </div>
            <div class="p-picklist-controls p-picklist-target-controls" *ngIf="showTargetControls" [attr.data-pc-section]="'targetControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PickListStyle]
})
export class PickList extends BaseComponent implements AfterViewChecked, AfterContentInit {
    /**
     * An array of objects for the source list.
     * @group Props
     */
    @Input() source: any[] | undefined;
    /**
     * An array of objects for the target list.
     * @group Props
     */
    @Input() target: any[] | undefined;
    /**
     * Text for the source list caption
     * @group Props
     */
    @Input() sourceHeader: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined = 0;
    /**
     * Defines a string that labels the move to right button for accessibility.
     * @group Props
     */
    @Input() rightButtonAriaLabel: string | undefined;
    /**
     * Defines a string that labels the move to left button for accessibility.
     * @group Props
     */
    @Input() leftButtonAriaLabel: string | undefined;
    /**
     * Defines a string that labels the move to all right button for accessibility.
     * @group Props
     */
    @Input() allRightButtonAriaLabel: string | undefined;
    /**
     * Defines a string that labels the move to all left button for accessibility.
     * @group Props
     */
    @Input() allLeftButtonAriaLabel: string | undefined;
    /**
     * Defines a string that labels the move to up button for accessibility.
     * @group Props
     */
    @Input() upButtonAriaLabel: string | undefined;
    /**
     * Defines a string that labels the move to down button for accessibility.
     * @group Props
     */
    @Input() downButtonAriaLabel: string | undefined;
    /**
     * Defines a string that labels the move to top button for accessibility.
     * @group Props
     */
    @Input() topButtonAriaLabel: string | undefined;
    /**
     * Defines a string that labels the move to bottom button for accessibility.
     * @group Props
     */
    @Input() bottomButtonAriaLabel: string | undefined;
    /**
     * Text for the target list caption
     * @group Props
     */
    @Input() targetHeader: string | undefined;
    /**
     * When enabled orderlist adjusts its controls based on screen size.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) responsive: boolean | undefined;
    /**
     * When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma).
     * @group Props
     */
    @Input() filterBy: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() filterLocale: string | undefined;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. Use sourceTrackBy or targetTrackBy in case different algorithms are needed per list.
     * @group Props
     */
    @Input() trackBy: Function = (index: number, item: any) => item;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in source list, default algorithm checks for object identity.
     * @group Props
     */
    @Input() sourceTrackBy: Function | undefined;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in target list, default algorithm checks for object identity.
     * @group Props
     */
    @Input() targetTrackBy: Function | undefined;
    /**
     * Whether to show filter input for source list when filterBy is enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showSourceFilter: boolean = true;
    /**
     * Whether to show filter input for target list when filterBy is enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showTargetFilter: boolean = true;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) metaKeySelection: boolean = false;
    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) dragdrop: boolean = false;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the source list element.
     * @group Props
     */
    @Input() sourceStyle: any;
    /**
     * Inline style of the target list element.
     * @group Props
     */
    @Input() targetStyle: any;
    /**
     * Whether to show buttons of source list.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showSourceControls: boolean = true;
    /**
     * Whether to show buttons of target list.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showTargetControls: boolean = true;
    /**
     * Placeholder text on source filter input.
     * @group Props
     */
    @Input() sourceFilterPlaceholder: string | undefined;
    /**
     * Placeholder text on target filter input.
     * @group Props
     */
    @Input() targetFilterPlaceholder: string | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean = false;
    /**
     * Defines a string that labels the filter input of source list.
     * @group Props
     */
    @Input() ariaSourceFilterLabel: string | undefined;
    /**
     * Defines a string that labels the filter input of target list.
     * @group Props
     */
    @Input() ariaTargetFilterLabel: string | undefined;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    @Input() filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' = 'contains';
    /**
     * Whether to displays rows with alternating colors.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) stripedRows: boolean | undefined;
    /**
     * Keeps selection on the transfer list.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) keepSelection: boolean = false;
    /**
     * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    @Input() scrollHeight: string = '14rem';
    /**
     * Whether to focus on the first visible or selected element.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoOptionFocus: boolean = true;

    /**
     * Indicates the width of the screen at which the component should change its behavior.
     * @group Props
     */
    @Input() get breakpoint(): string {
        return this._breakpoint;
    }
    set breakpoint(value: string) {
        if (value !== this._breakpoint) {
            this._breakpoint = value;
            if (isPlatformBrowser(this.platformId)) {
                this.destroyMedia();
                this.initMedia();
            }
        }
    }
    /**
     * Callback to invoke when items are moved from target to source.
     * @param {PickListMoveToSourceEvent} event - Custom move to source event.
     * @group Emits
     */
    @Output() onMoveToSource: EventEmitter<PickListMoveToSourceEvent> = new EventEmitter<PickListMoveToSourceEvent>();
    /**
     * Callback to invoke when all items are moved from target to source.
     * @param {PickListMoveAllToSourceEvent} event - Custom move all to source event.
     * @group Emits
     */
    @Output() onMoveAllToSource: EventEmitter<PickListMoveAllToSourceEvent> = new EventEmitter<PickListMoveAllToSourceEvent>();
    /**
     * Callback to invoke when all items are moved from source to target.
     * @param {PickListMoveAllToTargetEvent} event - Custom move all to target event.
     * @group Emits
     */
    @Output() onMoveAllToTarget: EventEmitter<PickListMoveAllToTargetEvent> = new EventEmitter<PickListMoveAllToTargetEvent>();
    /**
     * Callback to invoke when items are moved from source to target.
     * @param {PickListMoveToTargetEvent} event - Custom move to target event.
     * @group Emits
     */
    @Output() onMoveToTarget: EventEmitter<PickListMoveToTargetEvent> = new EventEmitter<PickListMoveToTargetEvent>();
    /**
     * Callback to invoke when items are reordered within source list.
     * @param {PickListSourceReorderEvent} event - Custom source reorder event.
     * @group Emits
     */
    @Output() onSourceReorder: EventEmitter<PickListSourceReorderEvent> = new EventEmitter<PickListSourceReorderEvent>();
    /**
     * Callback to invoke when items are reordered within target list.
     * @param {PickListTargetReorderEvent} event - Custom target reorder event.
     * @group Emits
     */
    @Output() onTargetReorder: EventEmitter<PickListTargetReorderEvent> = new EventEmitter<PickListTargetReorderEvent>();
    /**
     * Callback to invoke when items are selected within source list.
     * @param {PickListSourceSelectEvent} event - Custom source select event.
     * @group Emits
     */
    @Output() onSourceSelect: EventEmitter<PickListSourceSelectEvent> = new EventEmitter<PickListSourceSelectEvent>();
    /**
     * Callback to invoke when items are selected within target list.
     * @param {PickListTargetSelectEvent} event - Custom target select event.
     * @group Emits
     */
    @Output() onTargetSelect: EventEmitter<PickListTargetSelectEvent> = new EventEmitter<PickListTargetSelectEvent>();
    /**
     * Callback to invoke when the source list is filtered
     * @param {PickListSourceFilterEvent} event - Custom source filter event.
     * @group Emits
     */
    @Output() onSourceFilter: EventEmitter<PickListSourceFilterEvent> = new EventEmitter<PickListSourceFilterEvent>();
    /**
     * Callback to invoke when the target list is filtered
     * @param {PickListTargetFilterEvent} event - Custom target filter event.
     * @group Emits
     */
    @Output() onTargetFilter: EventEmitter<PickListTargetFilterEvent> = new EventEmitter<PickListTargetFilterEvent>();

    /**
     * Callback to invoke when the list is focused
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * Callback to invoke when the list is blurred
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild('sourcelist') listViewSourceChild: Listbox;

    @ViewChild('targetlist') listViewTargetChild: Listbox;

    @ViewChild('sourceFilter') sourceFilterViewChild: Nullable<ElementRef>;

    @ViewChild('targetFilter') targetFilterViewChild: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    get moveUpAriaLabel() {
        return this.upButtonAriaLabel ? this.upButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveUp : undefined;
    }

    get moveTopAriaLabel() {
        return this.topButtonAriaLabel ? this.topButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveTop : undefined;
    }

    get moveDownAriaLabel() {
        return this.downButtonAriaLabel ? this.downButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : undefined;
    }

    get moveBottomAriaLabel() {
        return this.bottomButtonAriaLabel ? this.bottomButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : undefined;
    }

    get moveToTargetAriaLabel() {
        return this.rightButtonAriaLabel ? this.rightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToTarget : undefined;
    }

    get moveAllToTargetAriaLabel() {
        return this.allRightButtonAriaLabel ? this.allRightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToTarget : undefined;
    }

    get moveToSourceAriaLabel() {
        return this.leftButtonAriaLabel ? this.leftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToSource : undefined;
    }

    get moveAllToSourceAriaLabel() {
        return this.allLeftButtonAriaLabel ? this.allLeftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToSource : undefined;
    }

    get idSource() {
        return this.id + '_source';
    }

    get idTarget() {
        return this.id + '_target';
    }

    get focusedOptionId() {
        return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }

    _breakpoint: string = '960px';

    public itemTemplate: TemplateRef<any> | undefined;

    moveTopIconTemplate: Nullable<TemplateRef<any>>;

    moveUpIconTemplate: Nullable<TemplateRef<any>>;

    moveDownIconTemplate: Nullable<TemplateRef<any>>;

    moveBottomIconTemplate: Nullable<TemplateRef<any>>;

    moveToTargetIconTemplate: Nullable<TemplateRef<any>>;

    moveAllToTargetIconTemplate: Nullable<TemplateRef<any>>;

    moveToSourceIconTemplate: Nullable<TemplateRef<any>>;

    moveAllToSourceIconTemplate: Nullable<TemplateRef<any>>;

    targetFilterIconTemplate: Nullable<TemplateRef<any>>;

    sourceFilterIconTemplate: Nullable<TemplateRef<any>>;

    public visibleOptionsSource: any[] | undefined | null;

    public visibleOptionsTarget: any[] | undefined | null;

    selectedItemsSource: any[] = [];

    selectedItemsTarget: any[] = [];

    reorderedListElement: any;

    movedUp: Nullable<boolean>;

    movedDown: Nullable<boolean>;

    itemTouched: Nullable<boolean>;

    styleElement: any;

    id: string = UniqueComponentId();

    filterValueSource: Nullable<string>;

    filterValueTarget: Nullable<string>;

    fromListType: Nullable<number>;

    emptyMessageSourceTemplate: Nullable<TemplateRef<any>>;

    emptyFilterMessageSourceTemplate: Nullable<TemplateRef<any>>;

    emptyMessageTargetTemplate: Nullable<TemplateRef<any>>;

    emptyFilterMessageTargetTemplate: Nullable<TemplateRef<any>>;

    sourceHeaderTemplate: Nullable<TemplateRef<any>>;

    targetHeaderTemplate: Nullable<TemplateRef<any>>;

    sourceFilterTemplate: Nullable<TemplateRef<any>>;

    targetFilterTemplate: Nullable<TemplateRef<any>>;

    sourceFilterOptions: Nullable<PickListFilterOptions>;

    targetFilterOptions: Nullable<PickListFilterOptions>;

    readonly SOURCE_LIST: number = -1;

    readonly TARGET_LIST: number = 1;

    window: Window;

    media: MediaQueryList | null | undefined;

    viewChanged: boolean | undefined;

    focusedOptionIndex: any = -1;

    focusedOption: any | undefined;

    focused: any = {
        sourceList: false,
        targetList: false
    };

    _componentStyle = inject(PickListStyle);

    mediaChangeListener: VoidListener;

    constructor(public filterService: FilterService) {
        super();
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.responsive) {
            this.createStyle();
            this.initMedia();
        }

        if (this.filterBy) {
            this.sourceFilterOptions = {
                filter: (value) => this.filterSource(value),
                reset: () => this.resetSourceFilter()
            };

            this.targetFilterOptions = {
                filter: (value) => this.filterTarget(value),
                reset: () => this.resetTargetFilter()
            };
        }
    }
    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'sourceHeader':
                    this.sourceHeaderTemplate = item.template;
                    break;

                case 'targetHeader':
                    this.targetHeaderTemplate = item.template;
                    break;

                case 'sourceFilter':
                    this.sourceFilterTemplate = item.template;
                    break;

                case 'targetFilter':
                    this.targetFilterTemplate = item.template;
                    break;

                case 'emptymessagesource':
                    this.emptyMessageSourceTemplate = item.template;
                    break;

                case 'emptyfiltermessagesource':
                    this.emptyFilterMessageSourceTemplate = item.template;
                    break;

                case 'emptymessagetarget':
                    this.emptyMessageTargetTemplate = item.template;
                    break;

                case 'emptyfiltermessagetarget':
                    this.emptyFilterMessageTargetTemplate = item.template;
                    break;

                case 'moveupicon':
                    this.moveUpIconTemplate = item.template;
                    break;

                case 'movetopicon':
                    this.moveTopIconTemplate = item.template;
                    break;

                case 'movedownicon':
                    this.moveDownIconTemplate = item.template;
                    break;

                case 'movebottomicon':
                    this.moveBottomIconTemplate = item.template;
                    break;

                case 'movetotargeticon':
                    this.moveToTargetIconTemplate = item.template;
                    break;

                case 'movealltotargeticon':
                    this.moveAllToTargetIconTemplate = item.template;
                    break;

                case 'movetosourceicon':
                    this.moveToSourceIconTemplate = item.template;
                    break;

                case 'movealltosourceicon':
                    this.moveAllToSourceIconTemplate = item.template;
                    break;

                case 'targetfiltericon':
                    this.targetFilterIconTemplate = item.template;
                    break;

                case 'sourcefiltericon':
                    this.sourceFilterIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.reorderedListElement, 'li.p-highlight');
            let listItem;

            if (this.movedUp) listItem = listItems[0];
            else listItem = listItems[listItems.length - 1];

            DomHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    }

    onItemClick(event: Event | any, item: any, selectedItems: any[], listType: number, callback: EventEmitter<any>, itemId?: string) {
        if (this.disabled) {
            return;
        }

        let index = this.findIndexInList(item, selectedItems);
        if (itemId) this.focusedOptionIndex = itemId;
        let selected = index != -1;
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;

        if (metaSelection) {
            let metaKey = (<KeyboardEvent>event).metaKey || (<KeyboardEvent>event).ctrlKey || (<KeyboardEvent>event).shiftKey;

            if (selected && metaKey) {
                selectedItems = selectedItems.filter((_, i) => i !== index);
            } else {
                if (!metaKey) {
                    selectedItems = [];
                }
                selectedItems.push(item);
            }
        } else {
            if (selected) {
                selectedItems = selectedItems.filter((_, i) => i !== index); // Creating a new array without the selected item
            } else {
                selectedItems.push(item);
            }
        }
        this.setSelectionList(listType, selectedItems);
        callback.emit({ originalEvent: event, items: selectedItems });

        this.itemTouched = false;
    }

    onOptionMouseDown(index, listType: number) {
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = true;
        this.focusedOptionIndex = index;
    }

    onSourceItemDblClick() {
        if (this.disabled) {
            return;
        }

        this.moveRight();
        this.viewChildMarkForCheck();
    }

    onTargetItemDblClick() {
        if (this.disabled) {
            return;
        }

        this.moveLeft();
        this.viewChildMarkForCheck();
    }

    onFilter(event: KeyboardEvent, listType: number) {
        let query = (<HTMLInputElement>event.target).value;
        if (listType === this.SOURCE_LIST) this.filterSource(query);
        else if (listType === this.TARGET_LIST) this.filterTarget(query);
    }

    filterSource(value: any = '') {
        this.filterValueSource = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(<any[]>this.source, this.SOURCE_LIST);
    }

    filterTarget(value: any = '') {
        this.filterValueTarget = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(<any[]>this.target, this.TARGET_LIST);
    }

    filter(data: any[], listType: number) {
        let searchFields = (<string>this.filterBy).split(',');

        if (listType === this.SOURCE_LIST) {
            this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        } else if (listType === this.TARGET_LIST) {
            this.visibleOptionsTarget = this.filterService.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    }

    isItemVisible(item: any, listType: number): boolean | undefined {
        if (listType == this.SOURCE_LIST) return this.isVisibleInList(<any[]>this.visibleOptionsSource, item, <string>this.filterValueSource);
        else return this.isVisibleInList(<any[]>this.visibleOptionsTarget, item, <string>this.filterValueTarget);
    }

    isEmpty(listType: number) {
        if (listType == this.SOURCE_LIST) return this.filterValueSource ? !this.visibleOptionsSource || this.visibleOptionsSource.length === 0 : !this.source || this.source.length === 0;
        else return this.filterValueTarget ? !this.visibleOptionsTarget || this.visibleOptionsTarget.length === 0 : !this.target || this.target.length === 0;
    }

    isVisibleInList(data: any[], item: any, filterValue: string): boolean | undefined {
        if (filterValue && filterValue.trim().length) {
            for (let i = 0; i < data.length; i++) {
                if (item == data[i]) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }

    onItemTouchEnd() {
        if (this.disabled) {
            return;
        }

        this.itemTouched = true;
    }

    private sortByIndexInList(items: any[], list: any) {
        return items.sort((item1, item2) => ObjectUtils.findIndexInList(item1, list) - ObjectUtils.findIndexInList(item2, list));
    }

    viewChildMarkForCheck() {
        this.listViewSourceChild.cd.markForCheck();
        this.listViewTargetChild.cd.markForCheck();
    }

    moveUp(listElement: HTMLElement, list: any[], selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, list);

                if (selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
            this.viewChildMarkForCheck();
        }
    }

    moveTop(listElement: HTMLElement, list: any[], selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, list);

                if (selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
            this.viewChildMarkForCheck();
        }
    }

    moveDown(listElement: HTMLElement, list: any[], selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, list);

                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
            this.viewChildMarkForCheck();
        }
    }

    moveBottom(listElement: HTMLElement, list: any[], selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, list);

                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
            this.viewChildMarkForCheck();
        }
    }

    moveRight() {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            for (let i = 0; i < this.selectedItemsSource.length; i++) {
                let selectedItem = this.selectedItemsSource[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.target) == -1) {
                    this.target?.push(this.source?.splice(ObjectUtils.findIndexInList(selectedItem, this.source), 1)[0]);

                    if (this.visibleOptionsSource?.includes(selectedItem)) {
                        this.visibleOptionsSource.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsSource), 1);
                    }
                }
            }

            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });

            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }

            this.selectedItemsSource = [];

            if (this.filterValueTarget) {
                this.filter(<any[]>this.target, this.TARGET_LIST);
            }
            this.viewChildMarkForCheck();
        }
    }

    moveAllRight() {
        if (this.source) {
            let movedItems = [];

            for (let i = 0; i < this.source.length; i++) {
                if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    let removedItem = this.source.splice(i, 1)[0];
                    this.target?.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToTarget.emit({
                items: movedItems
            });

            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }

            this.selectedItemsSource = [];

            if (this.filterValueTarget) {
                this.filter(<any[]>this.target, this.TARGET_LIST);
            }

            this.visibleOptionsSource = [];
            this.viewChildMarkForCheck();
        }
    }

    moveLeft() {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for (let i = 0; i < this.selectedItemsTarget.length; i++) {
                let selectedItem = this.selectedItemsTarget[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.source) == -1) {
                    this.source?.push(this.target?.splice(ObjectUtils.findIndexInList(selectedItem, this.target), 1)[0]);

                    if (this.visibleOptionsTarget?.includes(selectedItem)) {
                        this.visibleOptionsTarget.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsTarget), 1)[0];
                    }
                }
            }

            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });

            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }

            this.selectedItemsTarget = [];

            if (this.filterValueSource) {
                this.filter(<any[]>this.source, this.SOURCE_LIST);
            }
            this.viewChildMarkForCheck();
        }
    }

    moveAllLeft() {
        if (this.target) {
            let movedItems = [];

            for (let i = 0; i < this.target.length; i++) {
                if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    let removedItem = this.target.splice(i, 1)[0];
                    this.source?.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }

            this.onMoveAllToSource.emit({
                items: movedItems
            });

            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }

            this.selectedItemsTarget = [];

            if (this.filterValueSource) {
                this.filter(<any[]>this.source, this.SOURCE_LIST);
            }

            this.visibleOptionsTarget = [];
            this.viewChildMarkForCheck();
        }
    }

    isSelected(item: any, selectedItems: any[]) {
        return this.findIndexInList(item, selectedItems) != -1;
    }

    findIndexInList(item: any, selectedItems: any[]): number {
        return ObjectUtils.findIndexInList(item, selectedItems);
    }

    onDrop(event: CdkDragDrop<string[]>, listType: number) {
        let isTransfer = event.previousContainer !== event.container;
        let dropIndexes = this.getDropIndexes(event.previousIndex, event.currentIndex, listType, isTransfer, event.item.data);

        if (listType === this.SOURCE_LIST) {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsTarget);

                if (selectedItemIndex != -1) {
                    this.selectedItemsTarget.splice(selectedItemIndex, 1);

                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }

                if (this.visibleOptionsTarget) this.visibleOptionsTarget.splice(event.previousIndex, 1);

                this.onMoveToSource.emit({ items: [event.item.data] });
            } else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onSourceReorder.emit({ items: [event.item.data] });
            }

            if (this.filterValueSource) {
                this.filter(<any[]>this.source, this.SOURCE_LIST);
            }
        } else {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);

                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsSource);

                if (selectedItemIndex != -1) {
                    this.selectedItemsSource.splice(selectedItemIndex, 1);

                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }

                if (this.visibleOptionsSource) this.visibleOptionsSource.splice(event.previousIndex, 1);

                this.onMoveToTarget.emit({ items: [event.item.data] });
            } else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onTargetReorder.emit({ items: [event.item.data] });
            }

            if (this.filterValueTarget) {
                this.filter(<any[]>this.target, this.TARGET_LIST);
            }
        }
    }

    onListFocus(event, listType) {
        this.onFocus.emit(event);
    }

    onListBlur(event, listType) {
        this.onBlur.emit(event);
    }

    getListElement(listType: number) {
        return listType === this.SOURCE_LIST ? this.listViewSourceChild?.el.nativeElement : this.listViewTargetChild?.el.nativeElement;
    }

    getListItems(listType: number) {
        let listElemet = this.getListElement(listType);

        return DomHandler.find(listElemet, 'li.p-picklist-item');
    }

    getLatestSelectedVisibleOptionIndex(visibleList: any[], selectedItems: any[]): number {
        const latestSelectedItem = [...selectedItems].reverse().find((item) => visibleList.includes(item));
        return latestSelectedItem !== undefined ? visibleList.indexOf(latestSelectedItem) : -1;
    }

    getVisibleList(listType: number) {
        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length > 0 ? this.visibleOptionsSource : this.source && this.source.length > 0 ? this.source : null;
        }

        return this.visibleOptionsTarget && this.visibleOptionsTarget.length > 0 ? this.visibleOptionsTarget : this.target && this.target.length > 0 ? this.target : null;
    }

    setSelectionList(listType: number, selectedItems: any[]) {
        if (listType === this.SOURCE_LIST) {
            this.selectedItemsSource = selectedItems;
        } else {
            this.selectedItemsTarget = selectedItems;
        }
    }

    findNextOptionIndex(index: number, listType: number) {
        const items = this.getListItems(listType);

        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }

    findPrevOptionIndex(index: number, listType: number) {
        const items = this.getListItems(listType);
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }

    onItemKeyDown(event: Event | any, selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event, selectedItems, callback, listType);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event, selectedItems, callback, listType);
                break;

            case 'Home':
                this.onHomeKey(event, selectedItems, callback, listType);
                break;

            case 'End':
                this.onEndKey(event, selectedItems, callback, listType);
                break;

            case 'Enter':
                this.onEnterKey(event, selectedItems, callback, listType);
                break;

            case 'Space':
                this.onSpaceKey(event, selectedItems, callback, listType);
                break;

            case 'KeyA':
                if (event.ctrlKey) {
                    this.setSelectionList(listType, this.getVisibleList(listType));
                    callback.emit({ items: selectedItems });
                    event.preventDefault();
                }

            default:
                break;
        }
    }

    getFocusedOption(index: number, listType: number) {
        if (index === -1) return null;

        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length ? this.visibleOptionsSource[index] : this.source && this.source.length ? this.source[index] : null;
        }

        return this.visibleOptionsTarget && this.visibleOptionsTarget.length ? this.visibleOptionsTarget[index] : this.target && this.target.length ? this.target[index] : null;
    }

    changeFocusedOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        if (items?.length > 0) {
            let order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;

            this.focusedOptionIndex = items[order].getAttribute('id');
            this.focusedOption = this.getFocusedOption(order, listType);
            this.scrollInView(items[order].getAttribute('id'), listType);
        }
    }

    scrollInView(id, listType) {
        const element = DomHandler.findSingle(this.getListElement(listType), `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }

    onArrowDownKey(event: Event | any, selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex, listType);

        this.changeFocusedOptionIndex(optionIndex, listType);

        if (event.shiftKey) {
            this.onEnterKey(event, selectedItems, callback, listType);
        }

        event.preventDefault();
    }

    onArrowUpKey(event: Event | any, selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex, listType);

        this.changeFocusedOptionIndex(optionIndex, listType);

        if (event.shiftKey) {
            this.onEnterKey(event, selectedItems, callback, listType);
        }

        event.preventDefault();
    }

    onEnterKey(event: Event | any, selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        this.onItemClick(event, this.focusedOption, selectedItems, listType, callback);
        event.preventDefault();
    }

    onSpaceKey(event: Event | any, selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        event.preventDefault();

        if (event.shiftKey && selectedItems && selectedItems.length > 0) {
            let visibleList = this.getVisibleList(listType);
            let lastSelectedIndex = this.getLatestSelectedVisibleOptionIndex(visibleList, selectedItems);

            if (lastSelectedIndex !== -1) {
                let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);

                selectedItems = [...visibleList.slice(Math.min(lastSelectedIndex, focusedIndex), Math.max(lastSelectedIndex, focusedIndex) + 1)];
                this.setSelectionList(listType, selectedItems);

                callback.emit({ items: selectedItems });
                return;
            }
        }

        this.onEnterKey(event, selectedItems, callback, listType);
    }

    onHomeKey(event: Event | any, selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        if (event.ctrlKey && event.shiftKey) {
            let visibleList = this.getVisibleList(listType);
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);

            selectedItems = [...visibleList.slice(0, focusedIndex + 1)];
            this.setSelectionList(listType, selectedItems);
            callback.emit({ items: selectedItems });
        } else {
            this.changeFocusedOptionIndex(0, listType);
        }

        event.preventDefault();
    }

    onEndKey(event: Event | any, selectedItems: any[], callback: EventEmitter<any>, listType: number) {
        let visibleList = this.getVisibleList(listType);
        let lastIndex = visibleList && visibleList.length > 0 ? visibleList.length - 1 : null;
        if (lastIndex === null) return;

        if (event.ctrlKey && event.shiftKey) {
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
            selectedItems = [...visibleList.slice(focusedIndex, lastIndex)];

            this.setSelectionList(listType, selectedItems);
            callback.emit({ items: selectedItems });
        } else {
            this.changeFocusedOptionIndex(lastIndex, listType);
        }

        event.preventDefault();
    }

    getDropIndexes(fromIndex: number, toIndex: number, droppedList: number, isTransfer: boolean, data: any[] | any) {
        let previousIndex, currentIndex;

        if (droppedList === this.SOURCE_LIST) {
            previousIndex = isTransfer ? (this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex) : this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex;
            currentIndex = this.filterValueSource ? this.findFilteredCurrentIndex(<any[]>this.visibleOptionsSource, toIndex, this.source) : toIndex;
        } else {
            previousIndex = isTransfer ? (this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex) : this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex;
            currentIndex = this.filterValueTarget ? this.findFilteredCurrentIndex(<any[]>this.visibleOptionsTarget, toIndex, this.target) : toIndex;
        }

        return { previousIndex, currentIndex };
    }

    findFilteredCurrentIndex(visibleOptions: any[], index: number, options: any) {
        if (visibleOptions.length === index) {
            let toIndex = ObjectUtils.findIndexInList(visibleOptions[index - 1], options);

            return toIndex + 1;
        } else {
            return ObjectUtils.findIndexInList(visibleOptions[index], options);
        }
    }

    resetSourceFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.sourceFilterViewChild && ((<HTMLInputElement>this.sourceFilterViewChild.nativeElement).value = '');
    }

    resetTargetFilter() {
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        this.targetFilterViewChild && ((<HTMLInputElement>this.targetFilterViewChild.nativeElement).value = '');
    }

    resetFilter() {
        this.resetSourceFilter();
        this.resetTargetFilter();
    }


    initMedia() {
        if (isPlatformBrowser(this.platformId)) {
            this.media = this.window.matchMedia(`(max-width: ${this.breakpoint})`);
            this.viewChanged = this.media.matches;
            this.bindMediaChangeListener();
        }
    }

    destroyMedia() {
        this.unbindMediaChangeListener();
    }

    bindMediaChangeListener() {
        if (this.media && !this.mediaChangeListener) {
            this.mediaChangeListener = this.renderer.listen(this.media, 'change', (event) => {
                this.viewChanged = event.matches;
                this.cd.markForCheck();
            });
        }
    }

    unbindMediaChangeListener() {
        if (this.mediaChangeListener) {
            this.mediaChangeListener();
            this.mediaChangeListener = null;
        }
    }

    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, '');
                this.styleElement = this.renderer.createElement('style');
                this.renderer.setAttribute(this.styleElement, 'type', 'text/css');
                this.renderer.appendChild(this.document.head, this.styleElement);

                let innerHTML = `
                @media screen and (max-width: ${this.breakpoint}) {
                    .p-picklist[${this.id}] {
                        flex-direction: column;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons {
                        padding: var(--content-padding);
                        flex-direction: row;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button {
                        margin-right: var(--inline-spacing);
                        margin-bottom: 0;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button:last-child {
                        margin-right: 0;
                    }
                }`;

                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
                DomHandler.setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
            }
        }
    }

    sourceMoveDisabled() {
        if (this.disabled || !this.selectedItemsSource.length) {
            return true;
        }
    }

    targetMoveDisabled() {
        if (this.disabled || !this.selectedItemsTarget.length) {
            return true;
        }
    }

    moveRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsSource);
    }

    moveLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsTarget);
    }

    moveAllRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.source);
    }

    moveAllLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.target);
    }

    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
            ``;
        }
    }

    ngOnDestroy() {
        this.destroyStyle();
        this.destroyMedia();
        super.ngOnDestroy();
    }
}

const DragConfig = {
    zIndex: 1200
};

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        SharedModule,
        RippleModule,
        DragDropModule,
        AngleDoubleDownIcon,
        AngleDoubleLeftIcon,
        AngleDoubleRightIcon,
        AngleDoubleUpIcon,
        AngleDownIcon,
        AngleLeftIcon,
        AngleRightIcon,
        AngleUpIcon,
        SearchIcon,
        HomeIcon,
        ListboxModule,
        FormsModule
    ],
    exports: [PickList, SharedModule, DragDropModule, ListboxModule],
    declarations: [PickList],
    providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class PickListModule {}

import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    inject,
    InjectionToken,
    input,
    model,
    NgModule,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { find, findIndexInList, isEmpty, setAttribute, uuid } from '@primeuix/utils';
import { FilterMatchModeType, FilterService } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ButtonModule, ButtonProps } from 'primeng/button';
import { AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon } from 'primeng/icons';
import { Listbox, ListboxChangeEvent } from 'primeng/listbox';
import { Ripple } from 'primeng/ripple';
import type { CSSProperties } from 'primeng/types/shared';
import {
    PickListFilterOptions,
    PickListFilterTemplateContext,
    PickListItemTemplateContext,
    PickListMoveAllToSourceEvent,
    PickListMoveAllToTargetEvent,
    PickListMoveToSourceEvent,
    PickListMoveToTargetEvent,
    PickListPassThrough,
    PickListSourceFilterEvent,
    PickListSourceReorderEvent,
    PickListSourceSelectEvent,
    PickListTargetFilterEvent,
    PickListTargetReorderEvent,
    PickListTargetSelectEvent,
    PickListTransferIconTemplateContext
} from 'primeng/types/picklist';
import { PickListStyle } from './style/pickliststyle';

const PICKLIST_INSTANCE = new InjectionToken<PickList>('PICKLIST_INSTANCE');

/**
 * PickList is used to reorder items between different lists.
 * @group Components
 */
@Component({
    selector: 'p-picklist, p-pick-list',
    standalone: true,
    imports: [NgTemplateOutlet, ButtonModule, Ripple, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, Listbox, FormsModule, Bind],
    template: `
        <div [style]="style()" [class]="cx('root')" cdkDropListGroup [pBind]="ptm('root')">
            @if (showSourceControls()) {
                <div [class]="cx('sourceControls')" [pBind]="ptm('sourceControls')" [attr.data-pc-group-section]="'controls'">
                    <button
                        type="button"
                        [attr.aria-label]="moveUpAriaLabel()"
                        pButton
                        pRipple
                        severity="secondary"
                        [disabled]="sourceMoveDisabled()"
                        (click)="moveUp(sourcelist, source(), selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                        [buttonProps]="moveUpBtnProps()"
                        [pt]="ptm('pcSourceMoveUpButton')"
                        [unstyled]="unstyled()"
                    >
                        @if (moveUpIconTemplate()) {
                            <ng-container *ngTemplateOutlet="moveUpIconTemplate()!"></ng-container>
                        } @else {
                            <svg data-p-icon="angle-up" pButtonIcon [pt]="ptm('pcSourceMoveUpButton')['icon']" />
                        }
                    </button>
                    <button
                        type="button"
                        [attr.aria-label]="moveTopAriaLabel()"
                        pButton
                        pRipple
                        severity="secondary"
                        [disabled]="sourceMoveDisabled()"
                        (click)="moveTop(sourcelist, source(), selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                        [buttonProps]="moveTopBtnProps()"
                        [pt]="ptm('pcSourceMoveTopButton')"
                        [unstyled]="unstyled()"
                    >
                        @if (moveTopIconTemplate()) {
                            <ng-container *ngTemplateOutlet="moveTopIconTemplate()!"></ng-container>
                        } @else {
                            <svg data-p-icon="angle-double-up" pButtonIcon [pt]="ptm('pcSourceMoveTopButton')['icon']" />
                        }
                    </button>
                    <button
                        type="button"
                        [attr.aria-label]="moveDownAriaLabel()"
                        pButton
                        pRipple
                        severity="secondary"
                        [disabled]="sourceMoveDisabled()"
                        (click)="moveDown(sourcelist, source(), selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                        [buttonProps]="moveDownBtnProps()"
                        [pt]="ptm('pcSourceMoveDownButton')"
                        [unstyled]="unstyled()"
                        hostName="picklist"
                    >
                        @if (moveDownIconTemplate()) {
                            <ng-container *ngTemplateOutlet="moveDownIconTemplate()!"></ng-container>
                        } @else {
                            <svg data-p-icon="angle-down" pButtonIcon [pt]="ptm('pcSourceMoveDownButton')['icon']" />
                        }
                    </button>
                    <button
                        type="button"
                        [attr.aria-label]="moveBottomAriaLabel()"
                        pButton
                        pRipple
                        severity="secondary"
                        [disabled]="sourceMoveDisabled()"
                        (click)="moveBottom(sourcelist, source(), selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                        [buttonProps]="moveBottomBtnProps()"
                        [pt]="ptm('pcSourceMoveBottomButton')"
                        [unstyled]="unstyled()"
                        hostName="picklist"
                    >
                        @if (moveBottomIconTemplate()) {
                            <ng-container *ngTemplateOutlet="moveBottomIconTemplate()!"></ng-container>
                        } @else {
                            <svg data-p-icon="angle-double-down" pButtonIcon [pt]="ptm('pcSourceMoveBottomButton')['icon']" />
                        }
                    </button>
                </div>
            }
            <div [class]="cx('sourceListContainer')" [attr.data-pc-group-section]="'listcontainer'" [pBind]="ptm('sourceListContainer')">
                <p-listbox
                    #sourcelist
                    [ariaLabel]="sourceAriaLabel()"
                    [multiple]="true"
                    [options]="sourceOptions"
                    [(ngModel)]="selectedItemsSource"
                    [optionLabel]="dataKey() ?? 'name'"
                    [id]="idSource()"
                    [listStyle]="sourceStyle()"
                    [striped]="stripedRows()"
                    [tabindex]="tabindex()"
                    (onFocus)="onListFocus($event, SOURCE_LIST)"
                    (onBlur)="onListBlur($event, SOURCE_LIST)"
                    (onChange)="onChangeSelection($event, SOURCE_LIST)"
                    (onDblClick)="onSourceItemDblClick()"
                    [disabled]="disabled()"
                    [optionDisabled]="sourceOptionDisabled()"
                    [metaKeySelection]="metaKeySelection()"
                    [scrollHeight]="scrollHeight()"
                    [autoOptionFocus]="autoOptionFocus()"
                    [filter]="filterBy() && showSourceFilter()"
                    [filterBy]="filterBy()"
                    [filterLocale]="filterLocale()"
                    [filterMatchMode]="filterMatchMode()"
                    [filterPlaceHolder]="sourceFilterPlaceholder()"
                    [dragdrop]="dragdrop()"
                    [dropListData]="source()"
                    (onDrop)="onDrop($event, SOURCE_LIST)"
                    (onFilter)="onFilter($event.originalEvent, SOURCE_LIST)"
                    [pt]="ptm('pcListbox')"
                    hostName="picklist"
                    [attr.data-pc-group-section]="'list'"
                    [unstyled]="unstyled()"
                >
                    @if (sourceHeaderTemplate() || sourceHeader()) {
                        <ng-template #header>
                            @if (sourceHeaderTemplate()) {
                                <ng-container *ngTemplateOutlet="sourceHeaderTemplate()!"></ng-container>
                            } @else {
                                <div>{{ sourceHeader() }}</div>
                            }
                        </ng-template>
                    }
                    @if (sourceFilterTemplate()) {
                        <ng-template #filter>
                            <ng-container *ngTemplateOutlet="sourceFilterTemplate()!; context: { options: sourceFilterOptions }"></ng-container>
                        </ng-template>
                    }
                    @if (sourceFilterIconTemplate()) {
                        <ng-container *ngTemplateOutlet="sourceFilterIconTemplate()!"></ng-container>
                    }
                    @if (itemTemplate()) {
                        <ng-template #item let-item let-index="index" let-selected="selected" let-disabled="disabled">
                            <ng-container *ngTemplateOutlet="itemTemplate()!; context: { $implicit: item, index: index, selected: selected, disabled: disabled }"></ng-container>
                        </ng-template>
                    }
                    @if (emptyMessageSourceTemplate()) {
                        <ng-template #empty>
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate()!"></ng-container>
                        </ng-template>
                    }
                    @if (emptyFilterMessageSourceTemplate()) {
                        <ng-template #emptyfilter>
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate()!"></ng-container>
                        </ng-template>
                    }
                </p-listbox>
            </div>
            <div [class]="cx('transferControls')" [attr.data-pc-group-section]="'controls'" [pBind]="ptm('transferControls')">
                <button
                    type="button"
                    [attr.aria-label]="moveToTargetAriaLabel()"
                    pButton
                    pRipple
                    severity="secondary"
                    [disabled]="moveRightDisabled()"
                    (click)="moveRight()"
                    [buttonProps]="moveToTargetBtnProps()"
                    [pt]="ptm('pcMoveToTargetButton')"
                    hostName="picklist"
                    [unstyled]="unstyled()"
                >
                    @if (moveToTargetIconTemplate()) {
                        <ng-container *ngTemplateOutlet="moveToTargetIconTemplate()!; context: { $implicit: viewChanged() }"></ng-container>
                    } @else {
                        @if (!viewChanged()) {
                            <svg data-p-icon="angle-right" pButtonIcon [pt]="ptm('pcMoveToTargetButton')['icon']" />
                        } @else {
                            <svg data-p-icon="angle-down" pButtonIcon [pt]="ptm('pcMoveToTargetButton')['icon']" />
                        }
                    }
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveAllToTargetAriaLabel()"
                    pButton
                    pRipple
                    severity="secondary"
                    [disabled]="moveAllRightDisabled()"
                    (click)="moveAllRight()"
                    [buttonProps]="moveAllToTargetBtnProps()"
                    [pt]="ptm('pcMoveAllToTargetButton')"
                    [unstyled]="unstyled()"
                >
                    @if (moveAllToTargetIconTemplate()) {
                        <ng-container *ngTemplateOutlet="moveAllToTargetIconTemplate()!; context: { $implicit: viewChanged() }"></ng-container>
                    } @else {
                        @if (!viewChanged()) {
                            <svg data-p-icon="angle-double-right" pButtonIcon [pt]="ptm('pcMoveAllToTargetButton')['icon']" />
                        } @else {
                            <svg data-p-icon="angle-double-down" pButtonIcon [pt]="ptm('pcMoveAllToTargetButton')['icon']" />
                        }
                    }
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveToSourceAriaLabel()"
                    pButton
                    pRipple
                    severity="secondary"
                    [disabled]="moveLeftDisabled()"
                    (click)="moveLeft()"
                    [buttonProps]="moveToSourceBtnProps()"
                    [pt]="ptm('pcMoveToSourceButton')"
                    hostName="picklist"
                    [unstyled]="unstyled()"
                >
                    @if (moveToSourceIconTemplate()) {
                        <ng-container *ngTemplateOutlet="moveToSourceIconTemplate()!; context: { $implicit: viewChanged() }"></ng-container>
                    } @else {
                        @if (!viewChanged()) {
                            <svg data-p-icon="angle-left" pButtonIcon [pt]="ptm('pcMoveToSourceButton')['icon']" />
                        } @else {
                            <svg data-p-icon="angle-up" pButtonIcon [pt]="ptm('pcMoveToSourceButton')['icon']" />
                        }
                    }
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveAllToSourceAriaLabel()"
                    pButton
                    pRipple
                    severity="secondary"
                    [disabled]="moveAllLeftDisabled()"
                    (click)="moveAllLeft()"
                    [buttonProps]="moveAllToSourceBtnProps()"
                    [pt]="ptm('pcMoveAllToSourceButton')"
                    hostName="picklist"
                    [unstyled]="unstyled()"
                >
                    @if (moveAllToSourceIconTemplate()) {
                        <ng-container *ngTemplateOutlet="moveAllToSourceIconTemplate()!; context: { $implicit: viewChanged() }"></ng-container>
                    } @else {
                        @if (!viewChanged()) {
                            <svg data-p-icon="angle-double-left" pButtonIcon [pt]="ptm('pcMoveAllToSourceButton')['icon']" />
                        } @else {
                            <svg data-p-icon="angle-double-up" pButtonIcon [pt]="ptm('pcMoveAllToSourceButton')['icon']" />
                        }
                    }
                </button>
            </div>
            <div [class]="cx('targetListContainer')" [attr.data-pc-group-section]="'listcontainer'" [pBind]="ptm('targetListContainer')">
                <p-listbox
                    #targetlist
                    [ariaLabel]="targetAriaLabel()"
                    [multiple]="true"
                    [options]="targetOptions"
                    [(ngModel)]="selectedItemsTarget"
                    [optionLabel]="dataKey() ?? 'name'"
                    [id]="idTarget()"
                    [listStyle]="targetStyle()"
                    [striped]="stripedRows()"
                    [tabindex]="tabindex()"
                    (onFocus)="onListFocus($event, TARGET_LIST)"
                    (onBlur)="onListBlur($event, TARGET_LIST)"
                    (onChange)="onChangeSelection($event, TARGET_LIST)"
                    (onDblClick)="onTargetItemDblClick()"
                    [disabled]="disabled()"
                    [optionDisabled]="targetOptionDisabled()"
                    [metaKeySelection]="metaKeySelection()"
                    [scrollHeight]="scrollHeight()"
                    [autoOptionFocus]="autoOptionFocus()"
                    [filter]="filterBy() && showTargetFilter()"
                    [filterBy]="filterBy()"
                    [filterLocale]="filterLocale()"
                    [filterMatchMode]="filterMatchMode()"
                    [filterPlaceHolder]="targetFilterPlaceholder()"
                    [dragdrop]="dragdrop()"
                    [dropListData]="target()"
                    (onDrop)="onDrop($event, TARGET_LIST)"
                    (onFilter)="onFilter($event.originalEvent, TARGET_LIST)"
                    [pt]="ptm('pcListbox')"
                    [attr.data-pc-group-section]="'list'"
                    hostName="picklist"
                    [unstyled]="unstyled()"
                >
                    @if (targetHeaderTemplate() || targetHeader()) {
                        <ng-template #header>
                            @if (targetHeaderTemplate()) {
                                <ng-container *ngTemplateOutlet="targetHeaderTemplate()!"></ng-container>
                            } @else {
                                <div>{{ targetHeader() }}</div>
                            }
                        </ng-template>
                    }
                    @if (targetFilterTemplate()) {
                        <ng-template #filter>
                            <ng-container *ngTemplateOutlet="targetFilterTemplate()!; context: { options: targetFilterOptions }"></ng-container>
                        </ng-template>
                    }
                    @if (targetFilterIconTemplate()) {
                        <ng-container *ngTemplateOutlet="targetFilterIconTemplate()!"></ng-container>
                    }
                    @if (itemTemplate()) {
                        <ng-template #item let-item let-index="index" let-selected="selected" let-disabled="disabled">
                            <ng-container *ngTemplateOutlet="itemTemplate()!; context: { $implicit: item, index: index, selected: selected, disabled: disabled }"></ng-container>
                        </ng-template>
                    }
                    @if (emptyMessageTargetTemplate()) {
                        <ng-template #empty>
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate()!"></ng-container>
                        </ng-template>
                    }
                    @if (emptyFilterMessageTargetTemplate()) {
                        <ng-template #emptyfilter>
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate()!"></ng-container>
                        </ng-template>
                    }
                </p-listbox>
            </div>
            @if (showTargetControls()) {
                <div [class]="cx('targetControls')" [attr.data-pc-group-section]="'controls'" [pBind]="ptm('targetControls')">
                    <button
                        type="button"
                        [attr.aria-label]="moveUpAriaLabel()"
                        pButton
                        pRipple
                        severity="secondary"
                        [disabled]="targetMoveDisabled()"
                        (click)="moveUp(targetlist, target(), selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                        [buttonProps]="moveUpBtnProps()"
                        [pt]="ptm('pcTargetMoveUpButton')"
                        hostName="picklist"
                        [unstyled]="unstyled()"
                    >
                        @if (moveUpIconTemplate()) {
                            <ng-container *ngTemplateOutlet="moveUpIconTemplate()!"></ng-container>
                        } @else {
                            <svg data-p-icon="angle-up" pButtonIcon [pt]="ptm('pcTargetMoveUpButton')['icon']" />
                        }
                    </button>
                    <button
                        type="button"
                        [attr.aria-label]="moveTopAriaLabel()"
                        pButton
                        pRipple
                        severity="secondary"
                        [disabled]="targetMoveDisabled()"
                        (click)="moveTop(targetlist, target(), selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                        [buttonProps]="moveTopBtnProps()"
                        [pt]="ptm('pcTargetMoveTopButton')"
                        hostName="picklist"
                        [unstyled]="unstyled()"
                    >
                        @if (moveTopIconTemplate()) {
                            <ng-container *ngTemplateOutlet="moveTopIconTemplate()!"></ng-container>
                        } @else {
                            <svg data-p-icon="angle-double-up" pButtonIcon [pt]="ptm('pcTargetMoveTopButton')['icon']" />
                        }
                    </button>
                    <button
                        type="button"
                        [attr.aria-label]="moveDownAriaLabel()"
                        pButton
                        pRipple
                        severity="secondary"
                        [disabled]="targetMoveDisabled()"
                        (click)="moveDown(targetlist, target(), selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                        [buttonProps]="moveDownBtnProps()"
                        [pt]="ptm('pcTargetMoveDownButton')"
                        hostName="picklist"
                        [unstyled]="unstyled()"
                    >
                        @if (moveDownIconTemplate()) {
                            <ng-container *ngTemplateOutlet="moveDownIconTemplate()!"></ng-container>
                        } @else {
                            <svg data-p-icon="angle-down" pButtonIcon [pt]="ptm('pcTargetMoveDownButton')['icon']" />
                        }
                    </button>
                    <button
                        type="button"
                        [attr.aria-label]="moveBottomAriaLabel()"
                        pButton
                        pRipple
                        severity="secondary"
                        [disabled]="targetMoveDisabled()"
                        (click)="moveBottom(targetlist, target(), selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                        [buttonProps]="moveBottomBtnProps()"
                        [pt]="ptm('pcTargetMoveBottomButton')"
                        hostName="picklist"
                        [unstyled]="unstyled()"
                    >
                        @if (moveBottomIconTemplate()) {
                            <ng-container *ngTemplateOutlet="moveBottomIconTemplate()!"></ng-container>
                        } @else {
                            <svg data-p-icon="angle-double-down" pButtonIcon [pt]="ptm('pcTargetMoveBottomButton')['icon']" />
                        }
                    </button>
                </div>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PickListStyle, { provide: PARENT_INSTANCE, useExisting: PickList }, { provide: PICKLIST_INSTANCE, useExisting: PickList }],
    hostDirectives: [Bind]
})
export class PickList extends BaseComponent<PickListPassThrough> {
    componentName = 'PickList';

    hostName = input<any>('');

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcPickList: PickList | undefined = inject(PICKLIST_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }
    /**
     * An array of objects for the source list.
     * @group Props
     */
    source = model<any[]>([]);
    /**
     * An array of objects for the target list.
     * @group Props
     */
    target = model<any[]>([]);
    /**
     * Name of the field that uniquely identifies the options.
     * @group Props
     */
    dataKey = input<string>();
    /**
     * Text for the source list caption
     * @group Props
     */
    sourceHeader = input<string>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * Defines a string that labels the move to right button for accessibility.
     * @group Props
     */
    rightButtonAriaLabel = input<string>();
    /**
     * Defines a string that labels the move to left button for accessibility.
     * @group Props
     */
    leftButtonAriaLabel = input<string>();
    /**
     * Defines a string that labels the move to all right button for accessibility.
     * @group Props
     */
    allRightButtonAriaLabel = input<string>();
    /**
     * Defines a string that labels the move to all left button for accessibility.
     * @group Props
     */
    allLeftButtonAriaLabel = input<string>();
    /**
     * Defines a string that labels the move to up button for accessibility.
     * @group Props
     */
    upButtonAriaLabel = input<string>();
    /**
     * Defines a string that labels the move to down button for accessibility.
     * @group Props
     */
    downButtonAriaLabel = input<string>();
    /**
     * Defines a string that labels the move to top button for accessibility.
     * @group Props
     */
    topButtonAriaLabel = input<string>();
    /**
     * Defines a string that labels the move to bottom button for accessibility.
     * @group Props
     */
    bottomButtonAriaLabel = input<string>();
    /**
     * Defines a string that labels the source list.
     * @group Props
     */
    sourceAriaLabel = input<string>();
    /**
     * Defines a string that labels the target list.
     * @group Props
     */
    targetAriaLabel = input<string>();
    /**
     * Text for the target list caption
     * @group Props
     */
    targetHeader = input<string>();
    /**
     * When enabled orderlist adjusts its controls based on screen size.
     * @group Props
     */
    responsive = input(false, { transform: booleanAttribute });
    /**
     * When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma).
     * @group Props
     */
    filterBy = input<string>();
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string>();
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. Use sourceTrackBy or targetTrackBy in case different algorithms are needed per list.
     * @group Props
     */
    trackBy = input<Function>((_index: number, item: any) => item);
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in source list, default algorithm checks for object identity.
     * @group Props
     */
    sourceTrackBy = input<Function>();
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in target list, default algorithm checks for object identity.
     * @group Props
     */
    targetTrackBy = input<Function>();
    /**
     * Whether to show filter input for source list when filterBy is enabled.
     * @group Props
     */
    showSourceFilter = input(true, { transform: booleanAttribute });
    /**
     * Whether to show filter input for target list when filterBy is enabled.
     * @group Props
     */
    showTargetFilter = input(true, { transform: booleanAttribute });
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = input(false, { transform: booleanAttribute });
    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    dragdrop = input(false, { transform: booleanAttribute });
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<CSSProperties>();
    /**
     * Inline style of the source list element.
     * @group Props
     */
    sourceStyle = input<CSSProperties>();
    /**
     * Inline style of the target list element.
     * @group Props
     */
    targetStyle = input<CSSProperties>();
    /**
     * Whether to show buttons of source list.
     * @group Props
     */
    showSourceControls = input(true, { transform: booleanAttribute });
    /**
     * Whether to show buttons of target list.
     * @group Props
     */
    showTargetControls = input(true, { transform: booleanAttribute });
    /**
     * Placeholder text on source filter input.
     * @group Props
     */
    sourceFilterPlaceholder = input<string>();
    /**
     * Placeholder text on target filter input.
     * @group Props
     */
    targetFilterPlaceholder = input<string>();
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });

    /**
     * Name of the disabled field of a target option or function to determine disabled state.
     * @group Props
     */
    sourceOptionDisabled = input<string | ((item: any) => boolean)>();

    /**
     * Name of the disabled field of a target option or function to determine disabled state.
     * @group Props
     */
    targetOptionDisabled = input<string | ((item: any) => boolean)>();

    /**
     * Defines a string that labels the filter input of source list.
     * @group Props
     */
    ariaSourceFilterLabel = input<string>();
    /**
     * Defines a string that labels the filter input of target list.
     * @group Props
     */
    ariaTargetFilterLabel = input<string>();
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = input<FilterMatchModeType>('contains');
    /**
     * Whether to displays rows with alternating colors.
     * @group Props
     */
    stripedRows = input(false, { transform: booleanAttribute });
    /**
     * Keeps selection on the transfer list.
     * @group Props
     */
    keepSelection = input(false, { transform: booleanAttribute });
    /**
     * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = input('14rem');
    /**
     * Whether to focus on the first visible or selected element.
     * @group Props
     */
    autoOptionFocus = input(true, { transform: booleanAttribute });
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    buttonProps = input<ButtonProps>({ severity: 'secondary' });
    /**
     * Used to pass all properties of the ButtonProps to the move up button inside the component.
     * @group Props
     */
    moveUpButtonProps = input<ButtonProps>();
    /**
     * 	Used to pass all properties of the ButtonProps to the move top button inside the component.
     * @group Props
     */
    moveTopButtonProps = input<ButtonProps>();
    /**
     * 	Used to pass all properties of the ButtonProps to the move down button inside the component.
     * @group Props
     */
    moveDownButtonProps = input<ButtonProps>();
    /**
     * 	Used to pass all properties of the ButtonProps to the move bottom button inside the component.
     * @group Props
     */
    moveBottomButtonProps = input<ButtonProps>();
    /**
     * 	Used to pass all properties of the ButtonProps to the move to target button inside the component.
     * @group Props
     */
    moveToTargetProps = input<ButtonProps>();
    /**
     * 	Used to pass all properties of the ButtonProps to the move all to target button inside the component.
     * @group Props
     */
    moveAllToTargetProps = input<ButtonProps>();
    /**
     *  Used to pass all properties of the ButtonProps to the move to source button inside the component.
     * @group Props
     */
    moveToSourceProps = input<ButtonProps>();
    /**
     *  Used to pass all properties of the ButtonProps to the move all to source button inside the component.
     * @group Props
     */
    moveAllToSourceProps = input<ButtonProps>();

    /**
     * Indicates the width of the screen at which the component should change its behavior.
     * @group Props
     */
    breakpoint = input('960px');

    /**
     * Callback to invoke when items are moved from target to source.
     * @param {PickListMoveToSourceEvent} event - Custom move to source event.
     * @group Emits
     */
    onMoveToSource = output<PickListMoveToSourceEvent>();
    /**
     * Callback to invoke when all items are moved from target to source.
     * @param {PickListMoveAllToSourceEvent} event - Custom move all to source event.
     * @group Emits
     */
    onMoveAllToSource = output<PickListMoveAllToSourceEvent>();
    /**
     * Callback to invoke when all items are moved from source to target.
     * @param {PickListMoveAllToTargetEvent} event - Custom move all to target event.
     * @group Emits
     */
    onMoveAllToTarget = output<PickListMoveAllToTargetEvent>();
    /**
     * Callback to invoke when items are moved from source to target.
     * @param {PickListMoveToTargetEvent} event - Custom move to target event.
     * @group Emits
     */
    onMoveToTarget = output<PickListMoveToTargetEvent>();
    /**
     * Callback to invoke when items are reordered within source list.
     * @param {PickListSourceReorderEvent} event - Custom source reorder event.
     * @group Emits
     */
    onSourceReorder = output<PickListSourceReorderEvent>();
    /**
     * Callback to invoke when items are reordered within target list.
     * @param {PickListTargetReorderEvent} event - Custom target reorder event.
     * @group Emits
     */
    onTargetReorder = output<PickListTargetReorderEvent>();
    /**
     * Callback to invoke when items are selected within source list.
     * @param {PickListSourceSelectEvent} event - Custom source select event.
     * @group Emits
     */
    onSourceSelect = output<PickListSourceSelectEvent>();
    /**
     * Callback to invoke when items are selected within target list.
     * @param {PickListTargetSelectEvent} event - Custom target select event.
     * @group Emits
     */
    onTargetSelect = output<PickListTargetSelectEvent>();
    /**
     * Callback to invoke when the source list is filtered
     * @param {PickListSourceFilterEvent} event - Custom source filter event.
     * @group Emits
     */
    onSourceFilter = output<PickListSourceFilterEvent>();
    /**
     * Callback to invoke when the target list is filtered
     * @param {PickListTargetFilterEvent} event - Custom target filter event.
     * @group Emits
     */
    onTargetFilter = output<PickListTargetFilterEvent>();

    /**
     * Callback to invoke when the list is focused
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = output<Event>();

    /**
     * Callback to invoke when the list is blurred
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = output<Event>();

    listViewSourceChild = viewChild<Listbox>('sourcelist');

    listViewTargetChild = viewChild<Listbox>('targetlist');

    sourceFilterViewChild = viewChild<ElementRef>('sourceFilter');

    targetFilterViewChild = viewChild<ElementRef>('targetFilter');

    /**
     * Custom item template.
     * @param {PickListItemTemplateContext} context - item context.
     * @see {@link PickListItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<PickListItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom source header template.
     * @group Templates
     */
    sourceHeaderTemplate = contentChild<TemplateRef<void>>('sourceHeader', { descendants: false });

    /**
     * Custom target header template.
     * @group Templates
     */
    targetHeaderTemplate = contentChild<TemplateRef<void>>('targetHeader', { descendants: false });

    /**
     * Custom source filter template.
     * @param {PickListFilterTemplateContext} context - filter context.
     * @see {@link PickListFilterTemplateContext}
     * @group Templates
     */
    sourceFilterTemplate = contentChild<TemplateRef<PickListFilterTemplateContext>>('sourceFilter', { descendants: false });

    /**
     * Custom target filter template.
     * @param {PickListFilterTemplateContext} context - filter context.
     * @see {@link PickListFilterTemplateContext}
     * @group Templates
     */
    targetFilterTemplate = contentChild<TemplateRef<PickListFilterTemplateContext>>('targetFilter', { descendants: false });

    /**
     * Custom empty message when source is empty template.
     * @group Templates
     */
    emptyMessageSourceTemplate = contentChild<TemplateRef<void>>('emptymessagesource', { descendants: false });

    /**
     * Custom empty filter message when source is empty template.
     * @group Templates
     */
    emptyFilterMessageSourceTemplate = contentChild<TemplateRef<void>>('emptyfiltermessagesource', { descendants: false });

    /**
     * Custom empty message when target is empty template.
     * @group Templates
     */
    emptyMessageTargetTemplate = contentChild<TemplateRef<void>>('emptymessagetarget', { descendants: false });

    /**
     * Custom empty filter message when target is empty template.
     * @group Templates
     */
    emptyFilterMessageTargetTemplate = contentChild<TemplateRef<void>>('emptyfiltermessagetarget', { descendants: false });

    /**
     * Custom move up icon template.
     * @group Templates
     */
    moveUpIconTemplate = contentChild<TemplateRef<void>>('moveupicon', { descendants: false });

    /**
     * Custom move top icon template.
     * @group Templates
     */
    moveTopIconTemplate = contentChild<TemplateRef<void>>('movetopicon', { descendants: false });

    /**
     * Custom move down icon template.
     * @group Templates
     */
    moveDownIconTemplate = contentChild<TemplateRef<void>>('movedownicon', { descendants: false });

    /**
     * Custom move bottom icon template.
     * @group Templates
     */
    moveBottomIconTemplate = contentChild<TemplateRef<void>>('movebottomicon', { descendants: false });

    /**
     * Custom move to target icon template.
     * @param {PickListTransferIconTemplateContext} context - icon context.
     * @see {@link PickListTransferIconTemplateContext}
     * @group Templates
     */
    moveToTargetIconTemplate = contentChild<TemplateRef<PickListTransferIconTemplateContext>>('movetotargeticon', { descendants: false });

    /**
     * Custom move all to target icon template.
     * @param {PickListTransferIconTemplateContext} context - icon context.
     * @see {@link PickListTransferIconTemplateContext}
     * @group Templates
     */
    moveAllToTargetIconTemplate = contentChild<TemplateRef<PickListTransferIconTemplateContext>>('movealltotargeticon', { descendants: false });

    /**
     * Custom move to source icon template.
     * @param {PickListTransferIconTemplateContext} context - icon context.
     * @see {@link PickListTransferIconTemplateContext}
     * @group Templates
     */
    moveToSourceIconTemplate = contentChild<TemplateRef<PickListTransferIconTemplateContext>>('movetosourceicon', { descendants: false });

    /**
     * Custom move all to source icon template.
     * @param {PickListTransferIconTemplateContext} context - icon context.
     * @see {@link PickListTransferIconTemplateContext}
     * @group Templates
     */
    moveAllToSourceIconTemplate = contentChild<TemplateRef<PickListTransferIconTemplateContext>>('movealltosourceicon', { descendants: false });

    /**
     * Custom target filter icon template.
     * @group Templates
     */
    targetFilterIconTemplate = contentChild<TemplateRef<void>>('targetfiltericon', { descendants: false });

    /**
     * Custom source filter icon template.
     * @group Templates
     */
    sourceFilterIconTemplate = contentChild<TemplateRef<void>>('sourcefiltericon', { descendants: false });

    // Computed button props
    moveUpBtnProps = computed(() => ({ ...this.buttonProps(), ...this.moveUpButtonProps() }));
    moveTopBtnProps = computed(() => ({ ...this.buttonProps(), ...this.moveTopButtonProps() }));
    moveDownBtnProps = computed(() => ({ ...this.buttonProps(), ...this.moveDownButtonProps() }));
    moveBottomBtnProps = computed(() => ({ ...this.buttonProps(), ...this.moveBottomButtonProps() }));
    moveToTargetBtnProps = computed(() => ({ ...this.buttonProps(), ...this.moveToTargetProps() }));
    moveAllToTargetBtnProps = computed(() => ({ ...this.buttonProps(), ...this.moveAllToTargetProps() }));
    moveToSourceBtnProps = computed(() => ({ ...this.buttonProps(), ...this.moveToSourceProps() }));
    moveAllToSourceBtnProps = computed(() => ({ ...this.buttonProps(), ...this.moveAllToSourceProps() }));

    // Translation
    private translation = toSignal(this.config.translationObserver, { initialValue: this.config.translation });

    moveUpAriaLabel = computed(() => this.upButtonAriaLabel() || this.translation()?.aria?.moveUp);
    moveTopAriaLabel = computed(() => this.topButtonAriaLabel() || this.translation()?.aria?.moveTop);
    moveDownAriaLabel = computed(() => this.downButtonAriaLabel() || this.translation()?.aria?.moveDown);
    moveBottomAriaLabel = computed(() => this.bottomButtonAriaLabel() || this.translation()?.aria?.moveDown);
    moveToTargetAriaLabel = computed(() => this.rightButtonAriaLabel() || this.translation()?.aria?.moveToTarget);
    moveAllToTargetAriaLabel = computed(() => this.allRightButtonAriaLabel() || this.translation()?.aria?.moveAllToTarget);
    moveToSourceAriaLabel = computed(() => this.leftButtonAriaLabel() || this.translation()?.aria?.moveToSource);
    moveAllToSourceAriaLabel = computed(() => this.allLeftButtonAriaLabel() || this.translation()?.aria?.moveAllToSource);

    idSource = computed(() => this.id + '_source');
    idTarget = computed(() => this.id + '_target');

    get targetOptions() {
        return [...(this.target() || [])];
    }

    get sourceOptions() {
        return [...(this.source() || [])];
    }

    public visibleOptionsSource: any[] | undefined | null;

    public visibleOptionsTarget: any[] | undefined | null;

    selectedItemsSource: any[] = [];

    selectedItemsTarget: any[] = [];

    reorderedListElement: any;

    movedUp: boolean | null | undefined;

    movedDown: boolean | null | undefined;

    itemTouched: boolean | null | undefined;

    styleElement: any;

    id: string = uuid('pn_id_');

    filterValueSource: string | null | undefined;

    filterValueTarget: string | null | undefined;

    sourceFilterOptions: PickListFilterOptions | null | undefined;

    targetFilterOptions: PickListFilterOptions | null | undefined;

    readonly SOURCE_LIST: number = -1;

    readonly TARGET_LIST: number = 1;

    media: MediaQueryList | null | undefined;

    viewChanged = signal(false);

    _componentStyle = inject(PickListStyle);

    mediaChangeListener: (() => void) | null = null;

    filterService = inject(FilterService);

    constructor() {
        super();
        effect((onCleanup) => {
            this.breakpoint();
            if (isPlatformBrowser(this.platformId) && this.responsive()) {
                this.createStyle();
                this.initMedia();
                onCleanup(() => {
                    this.destroyStyle();
                    this.destroyMedia();
                });
            }
        });
    }

    onInit() {
        if (this.filterBy()) {
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

    onChangeSelection(e: ListboxChangeEvent, listType: number) {
        this.setSelectionList(listType, e.value);
        const callback = listType === this.SOURCE_LIST ? this.onSourceSelect : this.onTargetSelect;

        callback.emit({ originalEvent: e.originalEvent, items: e.value });
    }

    onSourceItemDblClick() {
        if (this.disabled()) {
            return;
        }

        this.moveRight();
        this.triggerChangeDetection();
    }

    onTargetItemDblClick() {
        if (this.disabled()) {
            return;
        }

        this.moveLeft();
        this.triggerChangeDetection();
    }

    onFilter(event: KeyboardEvent, listType: number) {
        let query = (<HTMLInputElement>event.target).value;
        if (listType === this.SOURCE_LIST) this.filterSource(query);
        else if (listType === this.TARGET_LIST) this.filterTarget(query);
    }

    filterSource(value: any = '') {
        this.filterValueSource = value.trim().toLocaleLowerCase(this.filterLocale());
        this.filter(<any[]>this.source(), this.SOURCE_LIST);
        this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
    }

    filterTarget(value: any = '') {
        this.filterValueTarget = value.trim().toLocaleLowerCase(this.filterLocale());
        this.filter(<any[]>this.target(), this.TARGET_LIST);
        this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
    }

    filter(data: any[], listType: number) {
        let searchFields = (this.filterBy() as string).split(',');

        if (listType === this.SOURCE_LIST) {
            this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode(), this.filterLocale());
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        } else if (listType === this.TARGET_LIST) {
            this.visibleOptionsTarget = this.filterService.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode(), this.filterLocale());
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    }

    isItemVisible(item: any, listType: number): boolean | undefined {
        if (listType == this.SOURCE_LIST) return this.isVisibleInList(<any[]>this.visibleOptionsSource, item, <string>this.filterValueSource);
        else return this.isVisibleInList(<any[]>this.visibleOptionsTarget, item, <string>this.filterValueTarget);
    }

    isEmpty(listType: number) {
        if (listType == this.SOURCE_LIST) return this.filterValueSource ? !this.visibleOptionsSource || this.visibleOptionsSource.length === 0 : !this.source() || this.source().length === 0;
        else return this.filterValueTarget ? !this.visibleOptionsTarget || this.visibleOptionsTarget.length === 0 : !this.target() || this.target().length === 0;
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
        if (this.disabled()) {
            return;
        }

        this.itemTouched = true;
    }

    private sortByIndexInList(items: any[], list: any) {
        return items.sort((item1, item2) => findIndexInList(item1, list) - findIndexInList(item2, list));
    }

    triggerChangeDetection() {
        this.listViewTargetChild()?.cd.markForCheck();
        this.listViewSourceChild()?.cd.markForCheck();
    }

    moveUp(listElement: any, list: any[], selectedItems: any[], callback: { emit(value: any): void }, listType: number) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = findIndexInList(selectedItem, list);

                if (selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (this.dragdrop() && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
            this.triggerChangeDetection();
        }
    }

    moveTop(listElement: any, list: any[], selectedItems: any[], callback: { emit(value: any): void }, listType: number) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = findIndexInList(selectedItem, list);

                if (selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop() && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
            this.triggerChangeDetection();
        }
    }

    moveDown(listElement: any, list: any[], selectedItems: any[], callback: { emit(value: any): void }, listType: number) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = findIndexInList(selectedItem, list);

                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (this.dragdrop() && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
            this.triggerChangeDetection();
        }
    }

    moveBottom(listElement: any, list: any[], selectedItems: any[], callback: { emit(value: any): void }, listType: number) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = findIndexInList(selectedItem, list);

                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop() && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
            this.triggerChangeDetection();
        }
    }

    moveRight() {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            let itemsToMove = [...this.selectedItemsSource];
            for (let i = 0; i < itemsToMove.length; i++) {
                let selectedItem = itemsToMove[i];
                if (findIndexInList(selectedItem, this.target() || []) == -1) {
                    this.target()?.push(this.source()?.splice(findIndexInList(selectedItem, this.source()), 1)[0]);

                    if (this.visibleOptionsSource?.includes(selectedItem)) {
                        this.visibleOptionsSource.splice(findIndexInList(selectedItem, this.visibleOptionsSource), 1);
                    }
                }
            }

            this.onMoveToTarget.emit({
                items: itemsToMove
            });

            if (this.keepSelection()) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...itemsToMove];
            }

            itemsToMove = [];
            this.selectedItemsSource = [];

            if (this.filterValueTarget) {
                this.filter(<any[]>this.target(), this.TARGET_LIST);
            }
            this.triggerChangeDetection();
        }
    }

    moveAllRight() {
        if (this.source()) {
            let movedItems: any = [];

            for (let i = 0; i < this.source().length; i++) {
                if (this.isItemVisible(this.source()[i], this.SOURCE_LIST)) {
                    let removedItem = this.source().splice(i, 1)[0];
                    this.target().push(removedItem);

                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToTarget.emit({
                items: movedItems
            });
            if (this.keepSelection()) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }
            this.selectedItemsSource = [];

            if (this.filterValueTarget) {
                this.filter(<any[]>this.target(), this.TARGET_LIST);
            }

            this.visibleOptionsSource = [];
            this.triggerChangeDetection();
        }
    }

    moveLeft() {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            let itemsToMove = [...this.selectedItemsTarget];
            for (let i = 0; i < itemsToMove.length; i++) {
                let selectedItem = itemsToMove[i];
                if (findIndexInList(selectedItem, this.source() || []) == -1) {
                    this.source()?.push(this.target()?.splice(findIndexInList(selectedItem, this.target()), 1)[0]);

                    if (this.visibleOptionsTarget?.includes(selectedItem)) {
                        this.visibleOptionsTarget.splice(findIndexInList(selectedItem, this.visibleOptionsTarget), 1)[0];
                    }
                }
            }
            this.onMoveToSource.emit({
                items: itemsToMove
            });
            if (this.keepSelection()) {
                this.selectedItemsSource = [...this.selectedItemsSource, itemsToMove];
            }
            itemsToMove = [];
            this.selectedItemsTarget = [];

            if (this.filterValueSource) {
                this.filter(<any[]>this.source(), this.SOURCE_LIST);
            }
            this.triggerChangeDetection();
        }
    }

    moveAllLeft() {
        if (this.target()) {
            let movedItems: any = [];

            for (let i = 0; i < this.target().length; i++) {
                if (this.isItemVisible(this.target()[i], this.TARGET_LIST)) {
                    let removedItem = this.target().splice(i, 1)[0];
                    this.source().push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToSource.emit({
                items: movedItems
            });
            if (this.keepSelection()) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }
            this.selectedItemsTarget = [];

            if (this.filterValueSource) {
                this.filter(<any[]>this.source(), this.SOURCE_LIST);
            }

            this.visibleOptionsTarget = [];
            this.triggerChangeDetection();
        }
    }

    isSelected(item: any, selectedItems: any[]) {
        return this.findIndexInList(item, selectedItems) != -1;
    }

    findIndexInList(item: any, selectedItems: any[]): number {
        return findIndexInList(item, selectedItems);
    }

    onDrop(event: CdkDragDrop<string[]>, listType: number) {
        let isTransfer = event.previousContainer !== event.container;

        let dropIndexes = this.getDropIndexes(event.previousIndex, event.currentIndex, listType, isTransfer, event.item.data);

        if (listType === this.SOURCE_LIST) {
            if (isTransfer) {
                let itemsToMove: any[] = [];

                if (this.selectedItemsTarget && this.selectedItemsTarget.length > 0 && findIndexInList(event.item.data, this.selectedItemsTarget) !== -1) {
                    itemsToMove = [...this.selectedItemsTarget];
                } else {
                    itemsToMove = [event.item.data];
                }

                const sortedItems = this.sortByIndexInList(itemsToMove, this.target() || []);

                for (let item of sortedItems) {
                    const itemIndex = findIndexInList(item, this.target() || []);
                    if (itemIndex !== -1) {
                        this.target()?.splice(itemIndex, 1);
                    }
                }

                for (let i = 0; i < sortedItems.length; i++) {
                    this.source()?.splice(dropIndexes.currentIndex + i, 0, sortedItems[i]);
                }

                this.selectedItemsTarget = [];

                if (this.keepSelection()) {
                    this.selectedItemsSource = [...this.selectedItemsSource, ...itemsToMove];
                }

                if (this.visibleOptionsTarget) {
                    for (let item of itemsToMove) {
                        const visibleIndex = findIndexInList(item, this.visibleOptionsTarget);
                        if (visibleIndex !== -1) {
                            this.visibleOptionsTarget.splice(visibleIndex, 1);
                        }
                    }
                }

                this.onMoveToSource.emit({ items: itemsToMove });
            } else {
                if (this.source()) {
                    moveItemInArray(this.source(), dropIndexes.previousIndex, dropIndexes.currentIndex);
                }
                this.onSourceReorder.emit({ items: [event.item.data] });
            }

            if (this.filterValueSource) {
                this.filter(<any[]>this.source(), this.SOURCE_LIST);
            }
        } else {
            if (isTransfer) {
                let itemsToMove: any[] = [];

                if (this.selectedItemsSource && this.selectedItemsSource.length > 0 && findIndexInList(event.item.data, this.selectedItemsSource) !== -1) {
                    itemsToMove = [...this.selectedItemsSource];
                } else {
                    itemsToMove = [event.item.data];
                }

                const sortedItems = this.sortByIndexInList(itemsToMove, this.source() || []);

                for (let item of sortedItems) {
                    const itemIndex = findIndexInList(item, this.source() || []);
                    if (itemIndex !== -1) {
                        this.source()?.splice(itemIndex, 1);
                    }
                }

                for (let i = 0; i < sortedItems.length; i++) {
                    this.target()?.splice(dropIndexes.currentIndex + i, 0, sortedItems[i]);
                }

                this.selectedItemsSource = [];

                if (this.keepSelection()) {
                    this.selectedItemsTarget = [...this.selectedItemsTarget, ...itemsToMove];
                }

                if (this.visibleOptionsSource) {
                    for (let item of itemsToMove) {
                        const visibleIndex = findIndexInList(item, this.visibleOptionsSource);
                        if (visibleIndex !== -1) {
                            this.visibleOptionsSource.splice(visibleIndex, 1);
                        }
                    }
                }

                this.onMoveToTarget.emit({ items: itemsToMove });
            } else {
                if (this.target()) {
                    moveItemInArray(this.target(), dropIndexes.previousIndex, dropIndexes.currentIndex);
                }
                this.onTargetReorder.emit({ items: [event.item.data] });
            }

            if (this.filterValueTarget) {
                this.filter(<any[]>this.target(), this.TARGET_LIST);
            }
        }

        if (isTransfer) {
            this.triggerChangeDetection();
        }
        this.cd.markForCheck();
    }

    onListFocus(event: any, _listType: number) {
        this.onFocus.emit(event);
    }

    onListBlur(event: any, _listType: number) {
        this.onBlur.emit(event);
    }

    getListElement(listType: number) {
        return listType === this.SOURCE_LIST ? this.listViewSourceChild()?.el.nativeElement : this.listViewTargetChild()?.el.nativeElement;
    }

    getListItems(listType: number) {
        let listElemet = this.getListElement(listType);

        return find(listElemet, 'li.p-picklist-item');
    }

    getLatestSelectedVisibleOptionIndex(visibleList: any[], selectedItems: any[]): number {
        const latestSelectedItem = [...selectedItems].reverse().find((item) => visibleList.includes(item));
        return latestSelectedItem !== undefined ? visibleList.indexOf(latestSelectedItem) : -1;
    }

    getVisibleList(listType: number) {
        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length > 0 ? this.visibleOptionsSource : this.source() && this.source().length > 0 ? this.source() : null;
        }

        return this.visibleOptionsTarget && this.visibleOptionsTarget.length > 0 ? this.visibleOptionsTarget : this.target() && this.target().length > 0 ? this.target() : null;
    }

    setSelectionList(listType: number, selectedItems: any[]) {
        if (listType === this.SOURCE_LIST) {
            this.selectedItemsSource = selectedItems;
        } else {
            this.selectedItemsTarget = selectedItems;
        }
    }

    getDropIndexes(fromIndex: number, toIndex: number, droppedList: number, isTransfer: boolean, data: any[] | any) {
        let previousIndex: number, currentIndex: number;

        if (droppedList === this.SOURCE_LIST) {
            previousIndex = isTransfer ? (this.filterValueTarget ? findIndexInList(data, this.target() || []) : fromIndex) : this.filterValueSource ? findIndexInList(data, this.source() || []) : fromIndex;
            currentIndex = this.filterValueSource ? this.findFilteredCurrentIndex(this.visibleOptionsSource || [], toIndex, this.source() || []) : toIndex;
        } else {
            previousIndex = isTransfer ? (this.filterValueSource ? findIndexInList(data, this.source() || []) : fromIndex) : this.filterValueTarget ? findIndexInList(data, this.target() || []) : fromIndex;
            currentIndex = this.filterValueTarget ? this.findFilteredCurrentIndex(this.visibleOptionsTarget || [], toIndex, this.target() || []) : toIndex;
        }

        return { previousIndex, currentIndex };
    }

    findFilteredCurrentIndex(visibleOptions: any[], index: number, options: any) {
        if (visibleOptions.length === index) {
            let toIndex = findIndexInList(visibleOptions[index - 1], options);

            return toIndex + 1;
        } else {
            return findIndexInList(visibleOptions[index], options);
        }
    }

    resetSourceFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        const el = this.sourceFilterViewChild();
        if (el) {
            (el.nativeElement as HTMLInputElement).value = '';
        }
    }

    resetTargetFilter() {
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        const el = this.targetFilterViewChild();
        if (el) {
            (el.nativeElement as HTMLInputElement).value = '';
        }
    }

    resetFilter() {
        this.resetSourceFilter();
        this.resetTargetFilter();
    }

    initMedia() {
        if (isPlatformBrowser(this.platformId)) {
            this.media = this.document.defaultView?.matchMedia(`(max-width: ${this.breakpoint()})`) || null;
            this.viewChanged.set(this.media?.matches || false);
            this.bindMediaChangeListener();
        }
    }

    destroyMedia() {
        this.unbindMediaChangeListener();
    }

    bindMediaChangeListener() {
        if (this.media && !this.mediaChangeListener) {
            this.mediaChangeListener = this.renderer.listen(this.media, 'change', (event) => {
                this.viewChanged.set(event.matches);

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
                setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
                this.renderer.appendChild(this.document.head, this.styleElement);

                let innerHTML = `
                @media screen and (max-width: ${this.breakpoint()}) {
                    .p-picklist[${this.id}] {
                        flex-direction: column;
                    }

                    .p-picklist[${this.id}] .p-picklist-controls {
                        flex-direction: row;
                    }
                }`;

                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
                setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
            }
        }
    }

    sourceMoveDisabled() {
        if (this.disabled() || !this.selectedItemsSource.length) {
            return true;
        }
    }

    targetMoveDisabled() {
        if (this.disabled() || !this.selectedItemsTarget.length) {
            return true;
        }
    }

    moveRightDisabled() {
        return this.disabled() || isEmpty(this.selectedItemsSource);
    }

    moveLeftDisabled() {
        return this.disabled() || isEmpty(this.selectedItemsTarget);
    }

    moveAllRightDisabled() {
        return this.disabled() || isEmpty(this.source());
    }

    moveAllLeftDisabled() {
        return this.disabled() || isEmpty(this.target());
    }

    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }
}

@NgModule({
    imports: [PickList],
    exports: [PickList]
})
export class PickListModule {}

import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    input,
    numberAttribute,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { absolutePosition, addStyle, appendChild, find, findSingle } from '@primeuix/utils';
import { FilterMatchMode, FilterMetadata, FilterOperator, OverlayService, PrimeTemplate, SelectItem, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Button, ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { FilterIcon } from 'primeng/icons/filter';
import { FilterFillIcon } from 'primeng/icons/filterfill';
import { PlusIcon } from 'primeng/icons/plus';
import { TrashIcon } from 'primeng/icons/trash';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MotionModule } from 'primeng/motion';
import { SelectModule } from 'primeng/select';
import { Nullable } from 'primeng/ts-helpers';
import { ColumnFilterPassThrough, TableFilterButtonPropsOptions } from 'primeng/types/table';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';

/**
 * Column Filter Component.
 * @group Components
 */
@Component({
    selector: 'p-columnFilter, p-column-filter, p-columnfilter',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        SelectModule,
        InputTextModule,
        InputNumberModule,
        CheckboxModule,
        DatePickerModule,
        BindModule,
        MotionModule,
        SharedModule,
        FilterIcon,
        FilterFillIcon,
        TrashIcon,
        PlusIcon,
        forwardRef(() => ColumnFilterFormElement)
    ],
    template: `
        <div [class]="cx('filter')">
            <p-columnFilterFormElement
                *ngIf="display === 'row'"
                class="p-fluid"
                [type]="type"
                [field]="field"
                [ariaLabel]="ariaLabel"
                [filterConstraint]="dataTable.filters[field]"
                [filterTemplate]="filterTemplate || _filterTemplate"
                [placeholder]="placeholder"
                [minFractionDigits]="minFractionDigits"
                [maxFractionDigits]="maxFractionDigits"
                [prefix]="prefix"
                [suffix]="suffix"
                [locale]="locale"
                [localeMatcher]="localeMatcher"
                [currency]="currency"
                [currencyDisplay]="currencyDisplay"
                [useGrouping]="useGrouping"
                [showButtons]="showButtons"
                [filterOn]="filterOn"
                [pt]="pt()"
                [unstyled]="unstyled()"
            ></p-columnFilterFormElement>
            <p-button
                *ngIf="showMenuButton"
                [styleClass]="cx('pcColumnFilterButton')"
                [pt]="ptm('pcColumnFilterButton')"
                [attr.aria-haspopup]="true"
                [ariaLabel]="filterMenuButtonAriaLabel"
                [attr.aria-controls]="overlayVisible ? overlayId : null"
                [attr.aria-expanded]="overlayVisible ?? false"
                (click)="toggleMenu($event)"
                (keydown)="onToggleButtonKeyDown($event)"
                [buttonProps]="filterButtonProps?.filter"
                #menuButton
                [unstyled]="unstyled()"
            >
                <ng-template #icon>
                    <ng-container>
                        <svg data-p-icon="filter" *ngIf="!filterIconTemplate && !_filterIconTemplate && !hasFilter" [pBind]="ptm('pcColumnFilterButton')['icon']" />
                        <svg data-p-icon="filter-fill" *ngIf="!filterIconTemplate && !_filterIconTemplate && hasFilter" [pBind]="ptm('pcColumnFilterButton')['icon']" />
                        <span *ngIf="filterIconTemplate || _filterIconTemplate" [pBind]="ptm('pcColumnFilterButton')['icon']" [attr.data-pc-section]="'columnfilterbuttonicon'">
                            <ng-template *ngTemplateOutlet="filterIconTemplate || _filterIconTemplate; context: { hasFilter: hasFilter }"></ng-template>
                        </span>
                    </ng-container>
                </ng-template>
            </p-button>
            @if (renderOverlay()) {
                <div
                    [pMotion]="showMenu && overlayVisible"
                    [pMotionAppear]="true"
                    pMotionName="p-anchored-overlay"
                    (pMotionOnBeforeEnter)="onOverlayBeforeEnter($event)"
                    (pMotionOnAfterLeave)="onOverlayAnimationAfterLeave($event)"
                    [pMotionOptions]="computedMotionOptions()"
                    [class]="cx('filterOverlay')"
                    [pBind]="ptm('filterOverlay')"
                    [id]="overlayId"
                    [attr.aria-modal]="true"
                    role="dialog"
                    (click)="onContentClick()"
                    (keydown.escape)="onEscape()"
                >
                    <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate; context: { $implicit: field }"></ng-container>
                    <ul *ngIf="display === 'row'; else menu" [class]="cx('filterConstraintList')" [pBind]="ptm('filterConstraintList')">
                        <li
                            *ngFor="let matchMode of matchModes; let i = index"
                            (click)="onRowMatchModeChange(matchMode.value)"
                            (keydown)="onRowMatchModeKeyDown($event)"
                            (keydown.enter)="onRowMatchModeChange(matchMode.value)"
                            [class]="cx('filterConstraint')"
                            [pBind]="ptm('filterConstraint', ptmFilterConstraintOptions(matchMode))"
                            [class.p-datatable-filter-constraint-selected]="isRowMatchModeSelected(matchMode.value)"
                            [attr.tabindex]="i === 0 ? '0' : null"
                        >
                            {{ matchMode.label }}
                        </li>
                        <li [class]="cx('filterConstraintSeparator')" [pBind]="ptm('filterConstraintSeparator', { context: { index: i } })"></li>
                        <li [class]="cx('filterConstraint')" [pBind]="ptm('emtpyFilterLabel')" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">
                            {{ noFilterLabel }}
                        </li>
                    </ul>
                    <ng-template #menu>
                        <div [class]="cx('filterOperator')" [pBind]="ptm('filterOperator')" *ngIf="isShowOperator">
                            <p-select [options]="operatorOptions" [pt]="ptm('pcFilterOperatorDropdown')" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" [styleClass]="cx('pcFilterOperatorDropdown')" [unstyled]="unstyled()"></p-select>
                        </div>
                        <div [class]="cx('filterRuleList')" [pBind]="ptm('filterRuleList')">
                            <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" [ngClass]="cx('filterRule')" [pBind]="ptm('filterRule')">
                                <p-select
                                    *ngIf="showMatchModes && matchModes"
                                    [options]="matchModes"
                                    [ngModel]="fieldConstraint.matchMode"
                                    (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                    [styleClass]="cx('pcFilterConstraintDropdown')"
                                    [pt]="ptm('pcFilterConstraintDropdown')"
                                    [unstyled]="unstyled()"
                                ></p-select>
                                <p-columnFilterFormElement
                                    [type]="type"
                                    [field]="field"
                                    [filterConstraint]="fieldConstraint"
                                    [filterTemplate]="filterTemplate || _filterTemplate"
                                    [placeholder]="placeholder"
                                    [minFractionDigits]="minFractionDigits"
                                    [maxFractionDigits]="maxFractionDigits"
                                    [prefix]="prefix"
                                    [suffix]="suffix"
                                    [locale]="locale"
                                    [localeMatcher]="localeMatcher"
                                    [currency]="currency"
                                    [currencyDisplay]="currencyDisplay"
                                    [useGrouping]="useGrouping"
                                    [filterOn]="filterOn"
                                    [pt]="pt()"
                                    [unstyled]="unstyled()"
                                ></p-columnFilterFormElement>
                                <div>
                                    <p-button
                                        *ngIf="showRemoveIcon"
                                        [styleClass]="cx('pcFilterRemoveRuleButton')"
                                        [pt]="ptm('pcFilterRemoveRuleButton')"
                                        [text]="true"
                                        severity="danger"
                                        size="small"
                                        (onClick)="removeConstraint(fieldConstraint)"
                                        [ariaLabel]="removeRuleButtonLabel"
                                        [label]="removeRuleButtonLabel"
                                        [buttonProps]="filterButtonProps?.popover?.removeRule"
                                        [unstyled]="unstyled()"
                                    >
                                        <ng-template #icon>
                                            <svg data-p-icon="trash" *ngIf="!removeRuleIconTemplate && !_removeRuleIconTemplate" [pBind]="ptm('pcFilterRemoveRuleButton')['icon']" />
                                            <ng-template *ngTemplateOutlet="removeRuleIconTemplate || _removeRuleIconTemplate"></ng-template>
                                        </ng-template>
                                    </p-button>
                                </div>
                            </div>
                        </div>
                        @if (isShowAddConstraint) {
                            <p-button
                                type="button"
                                [pt]="ptm('pcAddRuleButtonLabel')"
                                [label]="addRuleButtonLabel"
                                [attr.aria-label]="addRuleButtonLabel"
                                [styleClass]="cx('pcFilterAddRuleButton')"
                                [text]="true"
                                size="small"
                                (onClick)="addConstraint()"
                                [buttonProps]="filterButtonProps?.popover?.addRule"
                                [unstyled]="unstyled()"
                            >
                                <ng-template #icon>
                                    <svg data-p-icon="plus" *ngIf="!addRuleIconTemplate && !_addRuleIconTemplate" [pBind]="ptm('pcAddRuleButtonLabel')['icon']" />
                                    <ng-template *ngTemplateOutlet="addRuleIconTemplate || _addRuleIconTemplate"></ng-template>
                                </ng-template>
                            </p-button>
                        }
                        <div [class]="cx('filterButtonbar')" [pBind]="ptm('filterButtonBar')">
                            <p-button
                                #clearBtn
                                *ngIf="showClearButton"
                                [outlined]="true"
                                (onClick)="clearFilter()"
                                [attr.aria-label]="clearButtonLabel"
                                [label]="clearButtonLabel"
                                [buttonProps]="filterButtonProps?.popover?.clear"
                                [pt]="ptm('pcFilterClearButton')"
                                [unstyled]="unstyled()"
                            />
                            <p-button
                                *ngIf="showApplyButton"
                                (onClick)="applyFilter()"
                                size="small"
                                [label]="applyButtonLabel"
                                [attr.aria-label]="applyButtonLabel"
                                [buttonProps]="filterButtonProps?.popover?.apply"
                                [pt]="ptm('pcFilterApplyButton')"
                                [unstyled]="unstyled()"
                            />
                        </div>
                    </ng-template>
                    <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate; context: { $implicit: field }"></ng-container>
                </div>
            }
        </div>
    `,
    providers: [TableStyle],
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [Bind]
})
export class ColumnFilter extends BaseComponent {
    hostName = 'Table';

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(TableStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('columnFilter'));
    }

    ptmFilterConstraintOptions(matchMode) {
        return {
            context: {
                highlighted: matchMode && this.isRowMatchModeSelected(matchMode.value)
            }
        };
    }
    /**
     * Property represented by the column.
     * @group Props
     */
    @Input() field: string | undefined;
    /**
     * Type of the input.
     * @group Props
     */
    @Input() type: string = 'text';
    /**
     * Filter display.
     * @group Props
     */
    @Input() display: string = 'row';
    /**
     * Decides whether to display filter menu popup.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showMenu: boolean = true;
    /**
     * Filter match mode.
     * @group Props
     */
    @Input() matchMode: string | undefined;
    /**
     * Filter operator.
     * @defaultValue 'AND'
     * @group Props
     */
    @Input() operator: string = FilterOperator.AND;
    /**
     * Decides whether to display filter operator.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showOperator: boolean = true;
    /**
     * Decides whether to display clear filter button when display is menu.
     * @defaultValue true
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showClearButton: boolean = true;
    /**
     * Decides whether to display apply filter button when display is menu.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showApplyButton: boolean = true;
    /**
     * Decides whether to display filter match modes when display is menu.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showMatchModes: boolean = true;
    /**
     * Decides whether to display add filter button when display is menu.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showAddButton: boolean = true;
    /**
     * Decides whether to close popup on clear button click.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) hideOnClear: boolean = true;
    /**
     * Filter placeholder.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * Filter match mode options.
     * @group Props
     */
    @Input() matchModeOptions: SelectItem[] | undefined;
    /**
     * Defines maximum amount of constraints.
     * @group Props
     */
    @Input({ transform: numberAttribute }) maxConstraints: number = 2;
    /**
     * Defines minimum fraction of digits.
     * @group Props
     */
    @Input({ transform: (value: unknown) => numberAttribute(value, undefined) })
    minFractionDigits: number | undefined;
    /**
     * Defines maximum fraction of digits.
     * @group Props
     */
    @Input({ transform: (value: unknown) => numberAttribute(value, undefined) })
    maxFractionDigits: number | undefined;
    /**
     * Defines prefix of the filter.
     * @group Props
     */
    @Input() prefix: string | undefined;
    /**
     * Defines suffix of the filter.
     * @group Props
     */
    @Input() suffix: string | undefined;
    /**
     * Defines filter locale.
     * @group Props
     */
    @Input() locale: string | undefined;
    /**
     * Defines filter locale matcher.
     * @group Props
     */
    @Input() localeMatcher: string | undefined;
    /**
     * Enables currency input.
     * @group Props
     */
    @Input() currency: string | undefined;
    /**
     * Defines the display of the currency input.
     * @group Props
     */
    @Input() currencyDisplay: string | undefined;
    /**
     * Default trigger to run filtering on built-in text and numeric filters, valid values are 'enter' and 'input'.
     * @defaultValue enter
     * @group Props
     */
    @Input() filterOn: string | undefined = 'enter';
    /**
     * Defines if filter grouping will be enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) useGrouping: boolean = true;
    /**
     * Defines the visibility of buttons.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showButtons: boolean = true;
    /**
     * Defines the aria-label of the form element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Used to pass all filter button property object
     * @defaultValue {
     filter: { severity: 'secondary', text: true, rounded: true },
     inline: {
        clear: { severity: 'secondary', text: true, rounded: true }
     },
     popover: {
         addRule: { severity: 'info', text: true, size: 'small' },
         removeRule: { severity: 'danger', text: true, size: 'small' },
         apply: { size: 'small' },
         clear: { outlined: true, size: 'small' }
        }
     }
     @group Props
     */
    @Input() filterButtonProps: TableFilterButtonPropsOptions = {
        filter: { severity: 'secondary', text: true, rounded: true },
        inline: {
            clear: { severity: 'secondary', text: true, rounded: true }
        },
        popover: {
            addRule: { severity: 'info', text: true, size: 'small' },
            removeRule: { severity: 'danger', text: true, size: 'small' },
            apply: { size: 'small' },
            clear: { outlined: true, size: 'small' }
        }
    };
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
    /**
     * Callback to invoke on overlay is shown.
     * @param {AnimationEvent} originalEvent - animation event.
     * @group Emits
     */
    @Output() onShow: EventEmitter<{ originalEvent: AnimationEvent }> = new EventEmitter<{
        originalEvent: AnimationEvent;
    }>();
    /**
     * Callback to invoke on overlay is hidden.
     * @param {AnimationEvent} originalEvent - animation event.
     * @group Emits
     */
    @Output() onHide: EventEmitter<{ originalEvent: AnimationEvent }> = new EventEmitter<{
        originalEvent: AnimationEvent;
    }>();

    @ViewChild(Button, { static: false, read: ElementRef }) icon: ElementRef | undefined;

    @ViewChild('clearBtn') clearButtonViewChild: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) _templates: Nullable<QueryList<any>>;

    overlaySubscription: Subscription | undefined;

    renderOverlay = signal<boolean>(false);

    /**
     * Custom header template.
     * @group Templates
     */
    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<any>;
    _headerTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom filter template.
     * @group Templates
     */
    @ContentChild('filter', { descendants: false }) filterTemplate: TemplateRef<any>;
    _filterTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom footer template.
     * @group Templates
     */
    @ContentChild('footer', { descendants: false }) footerTemplate: TemplateRef<any>;
    _footerTemplate: Nullable<TemplateRef<any>>;
    /**
     * Custom filter icon template.
     * @group Templates
     */
    @ContentChild('filtericon', { descendants: false }) filterIconTemplate: TemplateRef<any>;
    _filterIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom remove rule button icon template.
     * @group Templates
     */
    @ContentChild('removeruleicon', { descendants: false }) removeRuleIconTemplate: TemplateRef<any>;
    _removeRuleIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom add rule button icon template.
     * @group Templates
     */
    @ContentChild('addruleicon', { descendants: false }) addRuleIconTemplate: TemplateRef<any>;
    _addRuleIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('clearfiltericon', { descendants: false }) clearFilterIconTemplate: TemplateRef<any>;
    _clearFilterIconTemplate: Nullable<TemplateRef<any>>;

    operatorOptions: any[] | undefined;

    overlayVisible: boolean | undefined;

    overlay: HTMLElement | undefined | null;

    scrollHandler: ConnectedOverlayScrollHandler | null | undefined;

    documentClickListener: any;

    documentResizeListener: any;

    matchModes: SelectItem[] | undefined;

    translationSubscription: Subscription | undefined;

    resetSubscription: Subscription | undefined;

    selfClick: boolean | undefined;

    overlayEventListener: any;

    overlayId: any;

    get fieldConstraints(): FilterMetadata[] | undefined | null {
        return this.dataTable.filters ? <FilterMetadata[]>this.dataTable.filters[<string>this.field] : null;
    }

    get showRemoveIcon(): boolean {
        return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
    }

    get showMenuButton(): boolean {
        return this.showMenu && (this.display === 'row' ? this.type !== 'boolean' : true);
    }

    get isShowOperator(): boolean {
        return this.showOperator && this.type !== 'boolean';
    }

    get isShowAddConstraint(): boolean | undefined | null {
        return this.showAddButton && this.type !== 'boolean' && this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints;
    }

    get showMenuButtonLabel() {
        return this.translate(TranslationKeys.SHOW_FILTER_MENU);
    }

    get applyButtonLabel(): string {
        return this.translate(TranslationKeys.APPLY);
    }

    get clearButtonLabel(): string {
        return this.translate(TranslationKeys.CLEAR);
    }

    get addRuleButtonLabel(): string {
        return this.translate(TranslationKeys.ADD_RULE);
    }

    get removeRuleButtonLabel(): string {
        return this.translate(TranslationKeys.REMOVE_RULE);
    }

    get noFilterLabel(): string {
        return this.translate(TranslationKeys.NO_FILTER);
    }

    get filterMenuButtonAriaLabel() {
        return this.config?.translation ? (this.overlayVisible ? this.config?.translation?.aria?.hideFilterMenu : this.config?.translation?.aria?.showFilterMenu) : undefined;
    }

    get removeRuleButtonAriaLabel() {
        return this.config?.translation ? this.config?.translation?.removeRule : undefined;
    }

    get filterOperatorAriaLabel() {
        return this.config?.translation ? this.config?.translation?.aria?.filterOperator : undefined;
    }

    get filterConstraintAriaLabel() {
        return this.config?.translation ? this.config?.translation?.aria?.filterConstraint : undefined;
    }

    dataTable = inject<Table>(TABLE_INSTANCE);

    overlayService = inject(OverlayService);

    onInit() {
        this.overlayId = UniqueComponentId();
        if (!this.dataTable.filters[<string>this.field]) {
            this.initFieldFilterConstraint();
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.generateMatchModeOptions();
            this.generateOperatorOptions();
        });

        this.generateMatchModeOptions();
        this.generateOperatorOptions();
    }

    generateMatchModeOptions() {
        this.matchModes =
            this.matchModeOptions ||
            (this.config as any).filterMatchModeOptions[this.type]?.map((key: any) => {
                return {
                    label: this.translate(key),
                    value: key
                };
            });
    }

    generateOperatorOptions() {
        this.operatorOptions = [
            {
                label: this.translate(TranslationKeys.MATCH_ALL),
                value: FilterOperator.AND
            },
            {
                label: this.translate(TranslationKeys.MATCH_ANY),
                value: FilterOperator.OR
            }
        ];
    }

    onAfterContentInit() {
        (this._templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this._headerTemplate = item.template;
                    break;

                case 'filter':
                    this._filterTemplate = item.template;
                    break;

                case 'footer':
                    this._footerTemplate = item.template;
                    break;

                case 'filtericon':
                    this._filterIconTemplate = item.template;
                    break;

                case 'clearfiltericon':
                    this._clearFilterIconTemplate = item.template;
                    break;

                case 'removeruleicon':
                    this._removeRuleIconTemplate = item.template;
                    break;

                case 'addruleicon':
                    this._addRuleIconTemplate = item.template;
                    break;

                default:
                    this._filterTemplate = item.template;
                    break;
            }
        });
    }

    initFieldFilterConstraint() {
        let defaultMatchMode = this.getDefaultMatchMode();
        this.dataTable.filters[<string>this.field] =
            this.display == 'row'
                ? { value: null, matchMode: defaultMatchMode }
                : [
                      {
                          value: null,
                          matchMode: defaultMatchMode,
                          operator: this.operator
                      }
                  ];
    }

    onMenuMatchModeChange(value: any, filterMeta: FilterMetadata) {
        filterMeta.matchMode = value;

        if (!this.showApplyButton) {
            this.dataTable._filter();
        }
    }

    onRowMatchModeChange(matchMode: string) {
        const fieldFilter = <FilterMetadata>this.dataTable.filters[<string>this.field];
        fieldFilter.matchMode = matchMode;

        if (fieldFilter.value) {
            this.dataTable._filter();
        }

        this.hide();
    }

    onRowMatchModeKeyDown(event: KeyboardEvent) {
        let item = <HTMLLIElement>event.target;

        switch (event.key) {
            case 'ArrowDown':
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    item.removeAttribute('tabindex');
                    nextItem.tabIndex = '0';
                    nextItem.focus();
                }

                event.preventDefault();
                break;

            case 'ArrowUp':
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    item.removeAttribute('tabindex');
                    prevItem.tabIndex = '0';
                    prevItem.focus();
                }

                event.preventDefault();
                break;
        }
    }

    onRowClearItemClick() {
        this.clearFilter();
        this.hide();
    }

    isRowMatchModeSelected(matchMode: string) {
        return (<FilterMetadata>this.dataTable.filters[<string>this.field]).matchMode === matchMode;
    }

    addConstraint() {
        (<FilterMetadata[]>this.dataTable.filters[<string>this.field]).push({
            value: null,
            matchMode: this.getDefaultMatchMode(),
            operator: this.getDefaultOperator()
        });
        DomHandler.focus(this.clearButtonViewChild?.nativeElement);
    }

    removeConstraint(filterMeta: FilterMetadata) {
        this.dataTable.filters[<string>this.field] = (<FilterMetadata[]>this.dataTable.filters[<string>this.field]).filter((meta) => meta !== filterMeta);
        if (!this.showApplyButton) {
            this.dataTable._filter();
        }
        DomHandler.focus(this.clearButtonViewChild?.nativeElement);
    }

    onOperatorChange(value: any) {
        (<FilterMetadata[]>this.dataTable.filters[<string>this.field]).forEach((filterMeta) => {
            filterMeta.operator = value;
            this.operator = value;
        });

        if (!this.showApplyButton) {
            this.dataTable._filter();
        }
    }

    toggleMenu(event: Event) {
        this.overlayVisible = !this.overlayVisible;
        this.renderOverlay.set(!this.renderOverlay());
        event.stopPropagation();
    }

    onToggleButtonKeyDown(event: KeyboardEvent) {
        switch (event.key) {
            case 'Escape':
            case 'Tab':
                this.overlayVisible = false;
                break;

            case 'ArrowDown':
                if (this.overlayVisible) {
                    let focusable = DomHandler.getFocusableElements(<HTMLElement>this.overlay);
                    if (focusable) {
                        focusable[0].focus();
                    }
                    event.preventDefault();
                } else if (event.altKey) {
                    this.overlayVisible = true;
                    event.preventDefault();
                }
                break;
            case 'Enter':
                this.toggleMenu(event);
                event.preventDefault();
                break;
        }
    }

    onEscape() {
        this.overlayVisible = false;
        this.icon?.nativeElement.focus();
    }

    findNextItem(item: HTMLLIElement): any {
        let nextItem = <HTMLLIElement>item.nextElementSibling;

        if (nextItem) return find(nextItem, '[data-pc-section="filterconstraintseparator"]') ? this.findNextItem(nextItem) : nextItem;
        else return item.parentElement?.firstElementChild;
    }

    findPrevItem(item: HTMLLIElement): any {
        let prevItem = <HTMLLIElement>item.previousElementSibling;

        if (prevItem) return find(prevItem, '[data-pc-section="filterconstraintseparator"]') ? this.findPrevItem(prevItem) : prevItem;
        else return item.parentElement?.lastElementChild;
    }

    onContentClick() {
        this.selfClick = true;
    }

    onOverlayBeforeEnter(event: MotionEvent) {
        this.overlay = event.element as HTMLElement;
        if (this.overlay && this.overlay.parentElement !== this.document.body) {
            const buttonEl = <HTMLButtonElement>findSingle(this.el.nativeElement, '[data-pc-name="pccolumnfilterbutton"]');
            appendChild(this.document.body, this.overlay);
            addStyle(this.overlay!, { position: 'absolute', top: '0' });
            absolutePosition(this.overlay, buttonEl);
            ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
        }

        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindScrollListener();

        this.overlayEventListener = (e: any) => {
            if (this.overlay && this.overlay.contains(e.target)) {
                this.selfClick = true;
            }
        };

        this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);

        this.onShow.emit({ originalEvent: event as any });
        this.focusOnFirstElement();
    }

    onOverlayAnimationAfterLeave(event: MotionEvent) {
        this.restoreOverlayAppend();
        this.onOverlayHide();
        this.renderOverlay.set(false);
        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
        ZIndexUtils.clear(this.overlay);

        this.onHide.emit({ originalEvent: event as any });
    }

    restoreOverlayAppend() {
        if (this.overlay) {
            this.el.nativeElement.appendChild(this.overlay!);
        }
    }

    focusOnFirstElement() {
        if (this.overlay) {
            DomHandler.focus(DomHandler.getFirstFocusableElement(this.overlay, ''));
        }
    }

    getDefaultMatchMode(): string {
        if (this.matchMode) {
            return this.matchMode;
        } else {
            if (this.type === 'text') return FilterMatchMode.STARTS_WITH;
            else if (this.type === 'numeric') return FilterMatchMode.EQUALS;
            else if (this.type === 'date') return FilterMatchMode.DATE_IS;
            else return FilterMatchMode.CONTAINS;
        }
    }

    getDefaultOperator(): string | undefined {
        return this.dataTable.filters ? (<FilterMetadata[]>this.dataTable.filters[<string>(<string>this.field)])[0].operator : this.operator;
    }

    hasRowFilter() {
        return this.dataTable.filters[<string>this.field] && !this.dataTable.isFilterBlank((<FilterMetadata>this.dataTable.filters[<string>this.field]).value);
    }

    get hasFilter(): boolean {
        let fieldFilter = this.dataTable.filters[<string>this.field];
        if (fieldFilter) {
            if (Array.isArray(fieldFilter)) return !this.dataTable.isFilterBlank((<FilterMetadata[]>fieldFilter)[0].value);
            else return !this.dataTable.isFilterBlank(fieldFilter.value);
        }

        return false;
    }

    isOutsideClicked(event: any): boolean {
        return !(
            findSingle((this.overlay as HTMLElement).nextElementSibling!, '[data-pc-section="filteroverlay"]') ||
            findSingle((this.overlay as HTMLElement).nextElementSibling!, '[data-pc-name="popover"]') ||
            this.overlay?.isSameNode(event.target) ||
            this.overlay?.contains(event.target) ||
            this.icon?.nativeElement.isSameNode(event.target) ||
            this.icon?.nativeElement.contains(event.target) ||
            findSingle(event.target, '[data-pc-name="pcaddrulebuttonlabel"]') ||
            findSingle(event.target.parentElement, '[data-pc-name="pcaddrulebuttonlabel"]') ||
            findSingle(event.target, '[data-pc-name="pcfilterremoverulebutton"]') ||
            findSingle(event.target.parentElement, '[data-pc-name="pcfilterremoverulebutton"]')
        );
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
                const dialogElements = document.querySelectorAll('[role="dialog"]');
                const targetIsColumnFilterMenuButton = event.target.closest('[data-pc-name="pccolumnfilterbutton"]');
                if (this.overlayVisible && this.isOutsideClicked(event) && (targetIsColumnFilterMenuButton || dialogElements?.length <= 1)) {
                    this.hide();
                }

                this.selfClick = false;
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                if (this.overlayVisible && !DomHandler.isTouchDevice()) {
                    this.hide();
                }
            });
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.icon?.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }

    clearFilter() {
        this.initFieldFilterConstraint();
        this.dataTable._filter();
        if (this.hideOnClear) this.hide();
    }

    applyFilter() {
        this.dataTable._filter();
        this.hide();
    }

    onDestroy() {
        if (this.overlay) {
            this.restoreOverlayAppend();
            ZIndexUtils.clear(this.overlay);
            this.onOverlayHide();
        }

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }

        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }

        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-columnFilterFormElement',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, InputNumberModule, CheckboxModule, DatePickerModule, BindModule],
    template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container
                *ngTemplateOutlet="
                    filterTemplate;
                    context: {
                        $implicit: filterConstraint.value,
                        filterCallback: filterCallback,
                        type: type,
                        field: field,
                        filterConstraint: filterConstraint,
                        placeholder: placeholder,
                        minFractionDigits: minFractionDigits,
                        maxFractionDigits: maxFractionDigits,
                        prefix: prefix,
                        suffix: suffix,
                        locale: locale,
                        localeMatcher: localeMatcher,
                        currency: currency,
                        currencyDisplay: currencyDisplay,
                        useGrouping: useGrouping,
                        showButtons: showButtons
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input
                    *ngSwitchCase="'text'"
                    type="text"
                    [ariaLabel]="ariaLabel"
                    pInputText
                    [pt]="ptm('pcFilterInputText')"
                    [value]="filterConstraint?.value"
                    (input)="onModelChange($event.target.value)"
                    (keydown.enter)="onTextInputEnterKeyDown($event)"
                    [attr.placeholder]="placeholder"
                    [unstyled]="unstyled()"
                />
                <p-inputNumber
                    *ngSwitchCase="'numeric'"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    (onKeyDown)="onNumericInputKeyDown($event)"
                    [showButtons]="showButtons"
                    [minFractionDigits]="minFractionDigits"
                    [maxFractionDigits]="maxFractionDigits"
                    [ariaLabel]="ariaLabel"
                    [prefix]="prefix"
                    [suffix]="suffix"
                    [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'"
                    [locale]="locale"
                    [localeMatcher]="localeMatcher"
                    [currency]="currency"
                    [currencyDisplay]="currencyDisplay"
                    [useGrouping]="useGrouping"
                    [pt]="ptm('pcFilterInputNumber')"
                    [unstyled]="unstyled()"
                ></p-inputNumber>
                <p-checkbox
                    [pt]="ptm('pcFilterCheckbox')"
                    [indeterminate]="filterConstraint?.value === null"
                    [binary]="true"
                    *ngSwitchCase="'boolean'"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    [unstyled]="unstyled()"
                />

                <p-datepicker
                    [pt]="ptm('pcFilterDatePicker')"
                    [ariaLabel]="ariaLabel"
                    *ngSwitchCase="'date'"
                    [placeholder]="placeholder"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    appendTo="body"
                    [unstyled]="unstyled()"
                ></p-datepicker>
            </ng-container>
        </ng-template>
    `,
    providers: [TableStyle],
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [Bind]
})
export class ColumnFilterFormElement extends BaseComponent<ColumnFilterPassThrough> {
    hostName = 'Table';

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(TableStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('columnFilterFormElement'));
    }

    @Input() field: string | undefined;

    @Input() type: string | undefined;

    @Input() filterConstraint: FilterMetadata | undefined;

    @Input() filterTemplate: Nullable<TemplateRef<any>>;

    @Input() placeholder: string | undefined;

    @Input({ transform: (value: unknown) => numberAttribute(value, undefined) })
    minFractionDigits: number | undefined;

    @Input({ transform: (value: unknown) => numberAttribute(value, undefined) })
    maxFractionDigits: number | undefined;

    @Input() prefix: string | undefined;

    @Input() suffix: string | undefined;

    @Input() locale: string | undefined;

    @Input() localeMatcher: string | undefined;

    @Input() currency: string | undefined;

    @Input() currencyDisplay: string | undefined;

    @Input({ transform: booleanAttribute }) useGrouping: boolean = true;

    @Input() ariaLabel: string | undefined;

    @Input() filterOn: string | undefined;

    get showButtons(): boolean {
        return this.colFilter.showButtons;
    }

    filterCallback: any;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    private colFilter = inject(ColumnFilter);

    onInit() {
        this.filterCallback = (value: any) => {
            (<any>this.filterConstraint).value = value;
            this.dataTable._filter();
        };
    }

    onModelChange(value: any) {
        (<any>this.filterConstraint).value = value;

        if (this.type === 'date' || this.type === 'boolean' || ((this.type === 'text' || this.type === 'numeric') && this.filterOn === 'input') || !value) {
            this.dataTable._filter();
        }
    }

    onTextInputEnterKeyDown(event: KeyboardEvent) {
        this.dataTable._filter();
        event.preventDefault();
    }

    onNumericInputKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.dataTable._filter();
            event.preventDefault();
        }
    }
}

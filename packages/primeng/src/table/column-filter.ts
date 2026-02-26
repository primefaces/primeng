import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, input, model, numberAttribute, output, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { absolutePosition, addStyle, appendChild, find, findSingle } from '@primeuix/utils';
import { FilterMatchMode, FilterMetadata, FilterOperator, OverlayService, SelectItem, TranslationKeys } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ButtonModule } from 'primeng/button';
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
import { TableFilterButtonPropsOptions } from 'primeng/types/table';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { ColumnFilterFormElement } from './column-filter-form-element';
import { TableStyle } from './style/tablestyle';
import { COLUMN_FILTER_INSTANCE, TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

/**
 * Column Filter Component.
 * @group Components
 */
@Component({
    selector: 'p-column-filter, p-columnfilter',
    standalone: true,
    imports: [NgTemplateOutlet, FormsModule, ButtonModule, SelectModule, InputTextModule, InputNumberModule, CheckboxModule, DatePickerModule, BindModule, MotionModule, FilterIcon, FilterFillIcon, TrashIcon, PlusIcon, ColumnFilterFormElement],
    template: `
        <div [class]="cx('filter')">
            @if (display() === 'row') {
                <p-column-filter-form-element
                    class="p-fluid"
                    [type]="type()"
                    [field]="field()"
                    [ariaLabel]="ariaLabel()"
                    [filterConstraint]="dataTable.filters[field()!]"
                    [filterTemplate]="filterTemplate()"
                    [placeholder]="placeholder()"
                    [minFractionDigits]="minFractionDigits()"
                    [maxFractionDigits]="maxFractionDigits()"
                    [prefix]="prefix()"
                    [suffix]="suffix()"
                    [locale]="locale()"
                    [localeMatcher]="localeMatcher()"
                    [currency]="currency()"
                    [currencyDisplay]="currencyDisplay()"
                    [useGrouping]="useGrouping()"
                    [filterOn]="filterOn()"
                    [pt]="pt()"
                    [unstyled]="unstyled()"
                />
            }
            @if (showMenuButton) {
                <p-button
                    [styleClass]="cx('pcColumnFilterButton')"
                    [pt]="ptm('pcColumnFilterButton')"
                    [attr.aria-haspopup]="true"
                    [ariaLabel]="filterMenuButtonAriaLabel"
                    [attr.aria-controls]="overlayVisible ? overlayId : null"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    (click)="toggleMenu($event)"
                    (keydown)="onToggleButtonKeyDown($event)"
                    [buttonProps]="filterButtonProps()?.filter"
                    #menuButton
                    [unstyled]="unstyled()"
                >
                    <ng-template #icon>
                        <ng-container>
                            @if (filterIconTemplate()) {
                                <span [pBind]="ptm('pcColumnFilterButton')['icon']" [attr.data-pc-section]="'columnfilterbuttonicon'">
                                    <ng-template *ngTemplateOutlet="filterIconTemplate(); context: { hasFilter: hasFilter }" />
                                </span>
                            } @else if (hasFilter) {
                                <svg data-p-icon="filter-fill" [pBind]="ptm('pcColumnFilterButton')['icon']" />
                            } @else {
                                <svg data-p-icon="filter" [pBind]="ptm('pcColumnFilterButton')['icon']" />
                            }
                        </ng-container>
                    </ng-template>
                </p-button>
            }
            @if (renderOverlay()) {
                <div
                    [pMotion]="showMenu() && overlayVisible"
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
                    <ng-container *ngTemplateOutlet="headerTemplate(); context: { $implicit: field() }" />
                    @if (display() === 'row') {
                        <ul [class]="cx('filterConstraintList')" [pBind]="ptm('filterConstraintList')">
                            @for (matchMode of matchModes; track matchMode.value; let i = $index) {
                                <li
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
                            }
                            <li [class]="cx('filterConstraintSeparator')" [pBind]="ptm('filterConstraintSeparator')"></li>
                            <li [class]="cx('filterConstraint')" [pBind]="ptm('emtpyFilterLabel')" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">
                                {{ noFilterLabel }}
                            </li>
                        </ul>
                    } @else {
                        @if (isShowOperator) {
                            <div [class]="cx('filterOperator')" [pBind]="ptm('filterOperator')">
                                <p-select [options]="operatorOptions" [pt]="ptm('pcFilterOperatorDropdown')" [ngModel]="operator()" (ngModelChange)="onOperatorChange($event)" [class]="cx('pcFilterOperatorDropdown')" [unstyled]="unstyled()" />
                            </div>
                        }
                        <div [class]="cx('filterRuleList')" [pBind]="ptm('filterRuleList')">
                            @for (fieldConstraint of fieldConstraints; track $index; let i = $index) {
                                <div [class]="cx('filterRule')" [pBind]="ptm('filterRule')">
                                    @if (showMatchModes() && matchModes) {
                                        <p-select
                                            [options]="matchModes"
                                            [ngModel]="fieldConstraint.matchMode"
                                            (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                            [styleClass]="cx('pcFilterConstraintDropdown')"
                                            [pt]="ptm('pcFilterConstraintDropdown')"
                                            [unstyled]="unstyled()"
                                        />
                                    }
                                    <p-column-filter-form-element
                                        [type]="type()"
                                        [field]="field()"
                                        [filterConstraint]="fieldConstraint"
                                        [filterTemplate]="filterTemplate()"
                                        [placeholder]="placeholder()"
                                        [minFractionDigits]="minFractionDigits()"
                                        [maxFractionDigits]="maxFractionDigits()"
                                        [prefix]="prefix()"
                                        [suffix]="suffix()"
                                        [locale]="locale()"
                                        [localeMatcher]="localeMatcher()"
                                        [currency]="currency()"
                                        [currencyDisplay]="currencyDisplay()"
                                        [useGrouping]="useGrouping()"
                                        [filterOn]="filterOn()"
                                        [pt]="pt()"
                                        [unstyled]="unstyled()"
                                    />
                                    <div>
                                        @if (showRemoveIcon) {
                                            <p-button
                                                [styleClass]="cx('pcFilterRemoveRuleButton')"
                                                [pt]="ptm('pcFilterRemoveRuleButton')"
                                                [text]="true"
                                                severity="danger"
                                                size="small"
                                                (onClick)="removeConstraint(fieldConstraint)"
                                                [ariaLabel]="removeRuleButtonLabel"
                                                [label]="removeRuleButtonLabel"
                                                [buttonProps]="filterButtonProps()?.popover?.removeRule"
                                                [unstyled]="unstyled()"
                                            >
                                                <ng-template #icon>
                                                    @if (!removeRuleIconTemplate()) {
                                                        <svg data-p-icon="trash" [pBind]="ptm('pcFilterRemoveRuleButton')['icon']" />
                                                    }
                                                    <ng-template *ngTemplateOutlet="removeRuleIconTemplate()" />
                                                </ng-template>
                                            </p-button>
                                        }
                                    </div>
                                </div>
                            }
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
                                [buttonProps]="filterButtonProps()?.popover?.addRule"
                                [unstyled]="unstyled()"
                            >
                                <ng-template #icon>
                                    @if (!addRuleIconTemplate()) {
                                        <svg data-p-icon="plus" [pBind]="ptm('pcAddRuleButtonLabel')['icon']" />
                                    }
                                    <ng-template *ngTemplateOutlet="addRuleIconTemplate()" />
                                </ng-template>
                            </p-button>
                        }
                        <div [class]="cx('filterButtonbar')" [pBind]="ptm('filterButtonBar')">
                            @if (showClearButton()) {
                                <p-button
                                    #clearBtn
                                    [outlined]="true"
                                    (onClick)="clearFilter()"
                                    [attr.aria-label]="clearButtonLabel"
                                    [label]="clearButtonLabel"
                                    [buttonProps]="filterButtonProps()?.popover?.clear"
                                    [pt]="ptm('pcFilterClearButton')"
                                    [unstyled]="unstyled()"
                                />
                            }
                            @if (showApplyButton()) {
                                <p-button
                                    (onClick)="applyFilter()"
                                    size="small"
                                    [label]="applyButtonLabel"
                                    [attr.aria-label]="applyButtonLabel"
                                    [buttonProps]="filterButtonProps()?.popover?.apply"
                                    [pt]="ptm('pcFilterApplyButton')"
                                    [unstyled]="unstyled()"
                                />
                            }
                        </div>
                    }
                    <ng-container *ngTemplateOutlet="footerTemplate(); context: { $implicit: field() }" />
                </div>
            }
        </div>
    `,
    providers: [TableStyle, { provide: COLUMN_FILTER_INSTANCE, useExisting: ColumnFilter }],
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [Bind]
})
export class ColumnFilter extends BaseComponent {
    hostName = 'Table';

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(TableStyle);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('columnFilter'));
    }

    ptmFilterConstraintOptions(matchMode: any) {
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
    field = input<string>();
    /**
     * Type of the input.
     * @group Props
     */
    type = input('text');
    /**
     * Filter display.
     * @group Props
     */
    display = input('row');
    /**
     * Decides whether to display filter menu popup.
     * @group Props
     */
    showMenu = input(true, { transform: booleanAttribute });
    /**
     * Filter match mode.
     * @group Props
     */
    matchMode = input<string>();
    /**
     * Filter operator.
     * @defaultValue 'AND'
     * @group Props
     */
    operator = model(FilterOperator.AND);
    /**
     * Decides whether to display filter operator.
     * @group Props
     */
    showOperator = input(true, { transform: booleanAttribute });
    /**
     * Decides whether to display clear filter button when display is menu.
     * @defaultValue true
     * @group Props
     */
    showClearButton = input(true, { transform: booleanAttribute });
    /**
     * Decides whether to display apply filter button when display is menu.
     * @group Props
     */
    showApplyButton = input(true, { transform: booleanAttribute });
    /**
     * Decides whether to display filter match modes when display is menu.
     * @group Props
     */
    showMatchModes = input(true, { transform: booleanAttribute });
    /**
     * Decides whether to display add filter button when display is menu.
     * @group Props
     */
    showAddButton = input(true, { transform: booleanAttribute });
    /**
     * Decides whether to close popup on clear button click.
     * @group Props
     */
    hideOnClear = input(true, { transform: booleanAttribute });
    /**
     * Filter placeholder.
     * @group Props
     */
    placeholder = input<string>();
    /**
     * Filter match mode options.
     * @group Props
     */
    matchModeOptions = input<SelectItem[]>();
    /**
     * Defines maximum amount of constraints.
     * @group Props
     */
    maxConstraints = input(2, { transform: numberAttribute });
    /**
     * Defines minimum fraction of digits.
     * @group Props
     */
    minFractionDigits = input(undefined, { transform: (v: unknown) => numberAttribute(v, undefined) });
    /**
     * Defines maximum fraction of digits.
     * @group Props
     */
    maxFractionDigits = input(undefined, { transform: (v: unknown) => numberAttribute(v, undefined) });
    /**
     * Defines prefix of the filter.
     * @group Props
     */
    prefix = input<string>();
    /**
     * Defines suffix of the filter.
     * @group Props
     */
    suffix = input<string>();
    /**
     * Defines filter locale.
     * @group Props
     */
    locale = input<string>();
    /**
     * Defines filter locale matcher.
     * @group Props
     */
    localeMatcher = input<string>();
    /**
     * Enables currency input.
     * @group Props
     */
    currency = input<string>();
    /**
     * Defines the display of the currency input.
     * @group Props
     */
    currencyDisplay = input<string>();
    /**
     * Default trigger to run filtering on built-in text and numeric filters, valid values are 'enter' and 'input'.
     * @defaultValue enter
     * @group Props
     */
    filterOn = input<string | undefined>('enter');
    /**
     * Defines if filter grouping will be enabled.
     * @group Props
     */
    useGrouping = input(true, { transform: booleanAttribute });
    /**
     * Defines the visibility of buttons.
     * @group Props
     */
    showButtons = input(true, { transform: booleanAttribute });
    /**
     * Defines the aria-label of the form element.
     * @group Props
     */
    ariaLabel = input<string>();
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
    filterButtonProps = input<TableFilterButtonPropsOptions>({
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
    });
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
    onShow = output<{ originalEvent: AnimationEvent }>();
    /**
     * Callback to invoke on overlay is hidden.
     * @param {AnimationEvent} originalEvent - animation event.
     * @group Emits
     */
    onHide = output<{ originalEvent: AnimationEvent }>();

    icon = viewChild('menuButton', { read: ElementRef });

    clearButtonViewChild = viewChild<ElementRef>('clearBtn');

    overlaySubscription: Subscription | undefined;

    renderOverlay = signal<boolean>(false);

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<any>>('header', { descendants: false });

    /**
     * Custom filter template.
     * @group Templates
     */
    filterTemplate = contentChild<TemplateRef<any>>('filter', { descendants: false });

    /**
     * Custom footer template.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<any>>('footer', { descendants: false });
    /**
     * Custom filter icon template.
     * @group Templates
     */
    filterIconTemplate = contentChild<TemplateRef<any>>('filtericon', { descendants: false });

    /**
     * Custom remove rule button icon template.
     * @group Templates
     */
    removeRuleIconTemplate = contentChild<TemplateRef<any>>('removeruleicon', { descendants: false });

    /**
     * Custom add rule button icon template.
     * @group Templates
     */
    addRuleIconTemplate = contentChild<TemplateRef<any>>('addruleicon', { descendants: false });

    operatorOptions: any[] | undefined;

    overlayVisible: boolean | undefined;

    overlay: HTMLElement | undefined | null;

    scrollHandler: ConnectedOverlayScrollHandler | null | undefined;

    documentClickListener: any;

    documentResizeListener: any;

    matchModes: SelectItem[] | undefined;

    selfClick: boolean | undefined;

    overlayEventListener: any;

    overlayId: any;

    get fieldConstraints(): FilterMetadata[] | undefined | null {
        return this.dataTable.filters ? <FilterMetadata[]>this.dataTable.filters[<string>this.field()] : null;
    }

    get showRemoveIcon(): boolean {
        return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
    }

    get showMenuButton(): boolean {
        return this.showMenu() && (this.display() === 'row' ? this.type() !== 'boolean' : true);
    }

    get isShowOperator(): boolean {
        return this.showOperator() && this.type() !== 'boolean';
    }

    get isShowAddConstraint(): boolean | undefined | null {
        return this.showAddButton() && this.type() !== 'boolean' && this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints();
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

    constructor() {
        super();
        this.config.translationObserver.pipe(takeUntilDestroyed()).subscribe(() => {
            this.generateMatchModeOptions();
            this.generateOperatorOptions();
        });
    }

    onInit() {
        this.overlayId = UniqueComponentId();
        if (!this.dataTable.filters[<string>this.field()]) {
            this.initFieldFilterConstraint();
        }

        this.generateMatchModeOptions();
        this.generateOperatorOptions();
    }

    generateMatchModeOptions() {
        this.matchModes =
            this.matchModeOptions() ||
            (this.config as any).filterMatchModeOptions[this.type()]?.map((key: any) => {
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

    initFieldFilterConstraint() {
        let defaultMatchMode = this.getDefaultMatchMode();
        this.dataTable.filters[<string>this.field()] =
            this.display() == 'row'
                ? { value: null, matchMode: defaultMatchMode }
                : [
                      {
                          value: null,
                          matchMode: defaultMatchMode,
                          operator: this.operator()
                      }
                  ];
    }

    onMenuMatchModeChange(value: any, filterMeta: FilterMetadata) {
        filterMeta.matchMode = value;

        if (!this.showApplyButton()) {
            this.dataTable._filter();
        }
    }

    onRowMatchModeChange(matchMode: string) {
        const fieldFilter = <FilterMetadata>this.dataTable.filters[<string>this.field()];
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
        return (<FilterMetadata>this.dataTable.filters[<string>this.field()]).matchMode === matchMode;
    }

    addConstraint() {
        (<FilterMetadata[]>this.dataTable.filters[<string>this.field()]).push({
            value: null,
            matchMode: this.getDefaultMatchMode(),
            operator: this.getDefaultOperator()
        });
        DomHandler.focus(this.clearButtonViewChild()?.nativeElement);
    }

    removeConstraint(filterMeta: FilterMetadata) {
        this.dataTable.filters[<string>this.field()] = (<FilterMetadata[]>this.dataTable.filters[<string>this.field()]).filter((meta) => meta !== filterMeta);
        if (!this.showApplyButton()) {
            this.dataTable._filter();
        }
        DomHandler.focus(this.clearButtonViewChild()?.nativeElement);
    }

    onOperatorChange(value: any) {
        (<FilterMetadata[]>this.dataTable.filters[<string>this.field()]).forEach((filterMeta) => {
            filterMeta.operator = value;
            this.operator.set(value);
        });

        if (!this.showApplyButton()) {
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
        this.icon()?.nativeElement.focus();
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
        if (this.matchMode()) {
            return this.matchMode()!;
        } else {
            if (this.type() === 'text') return FilterMatchMode.STARTS_WITH;
            else if (this.type() === 'numeric') return FilterMatchMode.EQUALS;
            else if (this.type() === 'date') return FilterMatchMode.DATE_IS;
            else return FilterMatchMode.CONTAINS;
        }
    }

    getDefaultOperator(): string | undefined {
        return this.dataTable.filters ? (<FilterMetadata[]>this.dataTable.filters[<string>this.field()])[0].operator : this.operator();
    }

    hasRowFilter() {
        return this.dataTable.filters[<string>this.field()] && !this.dataTable.isFilterBlank((<FilterMetadata>this.dataTable.filters[<string>this.field()]).value);
    }

    get hasFilter(): boolean {
        let fieldFilter = this.dataTable.filters[<string>this.field()];
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
            this.icon()?.nativeElement.isSameNode(event.target) ||
            this.icon()?.nativeElement.contains(event.target) ||
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
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.icon()?.nativeElement, () => {
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
        if (this.hideOnClear()) this.hide();
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

        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
}

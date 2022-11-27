import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule, TreeNode } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { Overlay, OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { Tree, TreeModule } from 'primeng/tree';
import { ObjectUtils } from 'primeng/utils';

export const TREESELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeSelect),
    multi: true
};

@Component({
    selector: 'p-treeSelect',
    template: `
        <div #container [ngClass]="containerClass()" [class]="containerStyleClass" [ngStyle]="containerStyle" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    #focusInput
                    type="text"
                    role="listbox"
                    [attr.id]="inputId"
                    readonly
                    [disabled]="disabled"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    (keydown)="onKeyDown($event)"
                    [attr.tabindex]="tabindex"
                    aria-haspopup="true"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-labelledby]="ariaLabelledBy"
                />
            </div>
            <div class="p-treeselect-label-container">
                <div [ngClass]="labelClass()" [class]="labelStyleClass" [ngStyle]="labelStyle">
                    <ng-container *ngIf="valueTemplate; else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
                    </ng-container>
                    <ng-template #defaultValueTemplate>
                        <ng-container *ngIf="display === 'comma'; else chipsValueTemplate">
                            {{ label || 'empty' }}
                        </ng-container>
                        <ng-template #chipsValueTemplate>
                            <div *ngFor="let node of value" class="p-treeselect-token">
                                <span class="p-treeselect-token-label">{{ node.label }}</span>
                            </div>
                            <ng-container *ngIf="emptyValue">{{ placeholder || 'empty' }}</ng-container>
                        </ng-template>
                    </ng-template>
                </div>
                <i *ngIf="checkValue() && !disabled && showClear" class="p-treeselect-clear-icon pi pi-times" (click)="clear($event)"></i>
            </div>
            <div class="p-treeselect-trigger">
                <span class="p-treeselect-trigger-icon pi pi-chevron-down"></span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onShow)="onShow.emit($event)"
                (onHide)="hide($event)"
            >
                <ng-template pTemplate="content">
                    <div #panel class="p-treeselect-panel p-component" [ngStyle]="panelStyle" [class]="panelStyleClass" [ngClass]="panelClass">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: value, options: options }"></ng-container>
                        <div class="p-treeselect-header" *ngIf="filter">
                            <div class="p-treeselect-filter-container">
                                <input
                                    #filter
                                    type="text"
                                    autocomplete="off"
                                    class="p-treeselect-filter p-inputtext p-component"
                                    [attr.placeholder]="filterPlaceholder"
                                    (keydown.enter)="$event.preventDefault()"
                                    (input)="onFilterInput($event)"
                                    [value]="filterValue"
                                />
                                <span class="p-treeselect-filter-icon pi pi-search"></span>
                            </div>
                            <button class="p-treeselect-close p-link" (click)="hide()">
                                <span class="p-treeselect-filter-icon pi pi-times"></span>
                            </button>
                        </div>
                        <div class="p-treeselect-items-wrapper" [ngStyle]="{ 'max-height': scrollHeight }">
                            <p-tree
                                #tree
                                [value]="options"
                                [propagateSelectionDown]="propagateSelectionDown"
                                [propagateSelectionUp]="propagateSelectionUp"
                                [selectionMode]="selectionMode"
                                (selectionChange)="onSelectionChange($event)"
                                [selection]="value"
                                [metaKeySelection]="metaKeySelection"
                                (onNodeExpand)="nodeExpand($event)"
                                (onNodeCollapse)="nodeCollapse($event)"
                                (onNodeSelect)="onSelect($event)"
                                [emptyMessage]="emptyMessage"
                                (onNodeUnselect)="onUnselect($event)"
                                [filterBy]="filterBy"
                                [filterMode]="filterMode"
                                [filterPlaceholder]="filterPlaceholder"
                                [filterLocale]="filterLocale"
                                [filteredNodes]="filteredNodes"
                                [_templateMap]="templateMap"
                            >
                                <ng-container *ngIf="emptyTemplate">
                                    <ng-template pTemplate="empty">
                                        <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-tree>
                        </div>
                        <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: value, options: options }"></ng-container>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `,
    styleUrls: ['./treeselect.css'],
    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': '!emptyValue',
        '[class.p-inputwrapper-focus]': 'focused || overlayVisible',
        '[class.p-treeselect-clearable]': 'showClear && !disabled'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TREESELECT_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class TreeSelect implements AfterContentInit {
    @Input() type: string = 'button';

    @Input() inputId: string;

    @Input() scrollHeight: string = '400px';

    @Input() disabled: boolean;

    @Input() metaKeySelection: boolean = true;

    @Input() display: string = 'comma';

    @Input() selectionMode: string = 'single';

    @Input() tabindex: string;

    @Input() ariaLabelledBy: string;

    @Input() placeholder: string;

    @Input() panelClass: string;

    @Input() panelStyle: any;

    @Input() panelStyleClass: string;

    @Input() containerStyle: object;

    @Input() containerStyleClass: string;

    @Input() labelStyle: object;

    @Input() labelStyleClass: string;

    @Input() overlayOptions: OverlayOptions;

    @Input() emptyMessage: string = '';

    @Input() appendTo: any;

    @Input() filter: boolean = false;

    @Input() filterBy: string = 'label';

    @Input() filterMode: string = 'lenient';

    @Input() filterPlaceholder: string;

    @Input() filterLocale: string;

    @Input() filterInputAutoFocus: boolean = true;

    @Input() propagateSelectionDown: boolean = true;

    @Input() propagateSelectionUp: boolean = true;

    @Input() showClear: boolean = false;

    @Input() resetFilterOnHide: boolean = true;

    @Input() get options(): any[] {
        return this._options;
    }
    set options(options) {
        this._options = options;
        this.updateTreeState();
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('container') containerEl: ElementRef;

    @ViewChild('focusInput') focusInput: ElementRef;

    @ViewChild('filter') filterViewChild: ElementRef;

    @ViewChild('tree') treeViewChild: Tree;

    @ViewChild('panel') panelEl: ElementRef;

    @ViewChild('overlay') overlayViewChild: Overlay;

    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();

    /* @deprecated */
    _showTransitionOptions: string;
    @Input() get showTransitionOptions(): string {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val: string) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }

    /* @deprecated */
    _hideTransitionOptions: string;
    @Input() get hideTransitionOptions(): string {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val: string) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }

    public filteredNodes: TreeNode[];

    filterValue: string = null;

    serializedValue: any[];

    valueTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    emptyTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    focused: boolean;

    overlayVisible: boolean;

    selfChange: boolean;

    value;

    expandedNodes: any[] = [];

    _options: any[];

    public templateMap: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(public config: PrimeNGConfig, public cd: ChangeDetectorRef, public el: ElementRef, public overlayService: OverlayService) {}

    ngOnInit() {
        this.updateTreeState();
    }

    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }

        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'value':
                    this.valueTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'empty':
                    this.emptyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                default: //TODO: @deprecated Used "value" template instead
                    if (item.name) this.templateMap[item.name] = item.template;
                    else this.valueTemplate = item.template;
                    break;
            }
        });
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (this.filter) {
                    ObjectUtils.isNotEmpty(this.filterValue) && this.treeViewChild?._filter(this.filterValue);
                    this.filterInputAutoFocus && this.filterViewChild.nativeElement.focus();
                }

                break;
        }
    }

    onSelectionChange(event) {
        this.value = event;
        this.onModelChange(this.value);
        this.cd.markForCheck();
    }

    onClick(event) {
        if (this.disabled) {
            return;
        }

        if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target) && !DomHandler.hasClass(event.target, 'p-treeselect-close')) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.show();
            }

            this.focusInput.nativeElement.focus();
        }
    }

    onKeyDown(event) {
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                    event.preventDefault();
                } else if (this.overlayVisible && this.panelEl?.nativeElement) {
                    let focusableElements = DomHandler.getFocusableElements(this.panelEl.nativeElement);

                    if (focusableElements && focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }

                    event.preventDefault();
                }
                break;

            //space
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;

            //enter and escape
            case 13:
            case 27:
                if (this.overlayVisible) {
                    this.hide();
                    event.preventDefault();
                }
                break;

            //tab
            case 9:
                this.hide();
                break;

            default:
                break;
        }
    }

    onFilterInput(event) {
        this.filterValue = event.target.value;
        this.treeViewChild?._filter(this.filterValue);
        this.onFilter.emit({
            originalEvent: event,
            filteredValue: this.treeViewChild?.filteredNodes
        });
    }

    show() {
        this.overlayVisible = true;
    }

    hide(event?: any) {
        this.overlayVisible = false;
        this.resetFilter();

        this.onHide.emit(event);
        this.cd.markForCheck();
    }

    clear(event) {
        this.value = null;
        this.resetExpandedNodes();
        this.resetPartialSelected();
        this.onModelChange(this.value);
        this.onClear.emit();

        event.stopPropagation();
    }

    checkValue() {
        return this.value !== null && ObjectUtils.isNotEmpty(this.value);
    }

    resetFilter() {
        if (this.filter && !this.resetFilterOnHide) {
            this.filteredNodes = this.treeViewChild?.filteredNodes;
            this.treeViewChild?.resetFilter();
        } else {
            this.filterValue = null;
        }
    }

    updateTreeState() {
        if (this.value) {
            let selectedNodes = this.selectionMode === 'single' ? [this.value] : [...this.value];
            this.resetExpandedNodes();
            this.resetPartialSelected();
            if (selectedNodes && this.options) {
                this.updateTreeBranchState(null, null, selectedNodes);
            }
        }
    }

    updateTreeBranchState(node, path, selectedNodes) {
        if (node) {
            if (this.isSelected(node)) {
                this.expandPath(path);
                selectedNodes.splice(selectedNodes.indexOf(node), 1);
            }

            if (selectedNodes.length > 0 && node.children) {
                for (let childNode of node.children) {
                    this.updateTreeBranchState(childNode, [...path, node], selectedNodes);
                }
            }
        } else {
            for (let childNode of this.options) {
                this.updateTreeBranchState(childNode, [], selectedNodes);
            }
        }
    }

    expandPath(expandedNodes) {
        for (let node of expandedNodes) {
            node.expanded = true;
        }

        this.expandedNodes = [...expandedNodes];
    }

    nodeExpand(event) {
        this.onNodeExpand.emit(event);
        this.expandedNodes.push(event.node);
    }

    nodeCollapse(event) {
        this.onNodeCollapse.emit(event);
        this.expandedNodes.splice(this.expandedNodes.indexOf(event.node), 1);
    }

    resetExpandedNodes() {
        for (let node of this.expandedNodes) {
            node.expanded = false;
        }

        this.expandedNodes = [];
    }

    resetPartialSelected(nodes = this.options): void {
        if (!nodes) {
            return;
        }

        for (let node of nodes) {
            node.partialSelected = false;

            if (node.children && node.children?.length > 0) {
                this.resetPartialSelected(node.children);
            }
        }
    }

    findSelectedNodes(node, keys, selectedNodes) {
        if (node) {
            if (this.isSelected(node)) {
                selectedNodes.push(node);
                delete keys[node.key];
            }

            if (Object.keys(keys).length && node.children) {
                for (let childNode of node.children) {
                    this.findSelectedNodes(childNode, keys, selectedNodes);
                }
            }
        } else {
            for (let childNode of this.options) {
                this.findSelectedNodes(childNode, keys, selectedNodes);
            }
        }
    }

    isSelected(node: TreeNode) {
        return this.findIndexInSelection(node) != -1;
    }

    findIndexInSelection(node: TreeNode) {
        let index: number = -1;

        if (this.value) {
            if (this.selectionMode === 'single') {
                let areNodesEqual = (this.value.key && this.value.key === node.key) || this.value == node;
                index = areNodesEqual ? 0 : -1;
            } else {
                for (let i = 0; i < this.value.length; i++) {
                    let selectedNode = this.value[i];
                    let areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }

    onSelect(node) {
        this.onNodeSelect.emit(node);

        if (this.selectionMode === 'single') {
            this.hide();
        }
    }

    onUnselect(node) {
        this.onNodeUnselect.emit(node);
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
    }

    writeValue(value: any): void {
        this.value = value;
        this.updateTreeState();
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }

    containerClass() {
        return {
            'p-treeselect p-component p-inputwrapper': true,
            'p-treeselect-chip': this.display === 'chip',
            'p-disabled': this.disabled,
            'p-focus': this.focused
        };
    }

    labelClass() {
        return {
            'p-treeselect-label': true,
            'p-placeholder': this.label === this.placeholder,
            'p-treeselect-label-empty': !this.placeholder && this.emptyValue
        };
    }

    get emptyValue() {
        return !this.value || Object.keys(this.value).length === 0;
    }

    get emptyOptions() {
        return !this.options || this.options.length === 0;
    }

    get label() {
        let value = this.value || [];
        return value.length ? value.map((node) => node.label).join(', ') : this.selectionMode === 'single' && this.value ? value.label : this.placeholder;
    }
}

@NgModule({
    imports: [CommonModule, OverlayModule, RippleModule, SharedModule, TreeModule],
    exports: [TreeSelect, OverlayModule, SharedModule, TreeModule],
    declarations: [TreeSelect]
})
export class TreeSelectModule {}

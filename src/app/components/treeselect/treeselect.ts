import {NgModule,Component,EventEmitter,Output,Input,ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, AfterContentInit, TemplateRef, QueryList, forwardRef, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RippleModule} from 'primeng/ripple';
import {OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule, TranslationKeys, TreeNode} from 'primeng/api';
import {animate, style, transition, trigger, AnimationEvent} from '@angular/animations';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ConnectedOverlayScrollHandler, DomHandler} from 'primeng/dom';
import {TreeModule} from 'primeng/tree';
import {ZIndexUtils} from 'primeng/utils'


export const TREESELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeSelect),
    multi: true
};

@Component({
    selector: 'p-treeSelect',
    template: `
    <div #container [ngClass]="containerClass()" (click)="onClick($event)">
        <div class="p-hidden-accessible">
            <input #focusInput type="text" role="listbox" [attr.id]="inputId" readonly [disabled]="disabled" (focus)="onFocus()" (blur)="onBlur()" (keydown)="onKeyDown($event)" [attr.tabindex]="tabindex"
            aria-haspopup="true" [attr.aria-expanded]="overlayVisible" [attr.aria-labelledby]="ariaLabelledBy"/>
        </div>
        <div class="p-treeselect-label-container">
            <div [ngClass]="labelClass()">
                <ng-container *ngIf="valueTemplate;else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: {$implicit: value, placeholder: placeholder}"></ng-container>
                </ng-container>
                <ng-template #defaultValueTemplate>
                    <ng-container *ngIf="display === 'comma';else chipsValueTemplate">
                        {{label || 'empty'}}
                    </ng-container>
                    <ng-template #chipsValueTemplate>
                        <div *ngFor="let node of value" class="p-treeselect-token">
                            <span class="p-treeselect-token-label">{{node.label}}</span>
                        </div>
                        <ng-container *ngIf="emptyValue">{{placeholder || 'empty'}}</ng-container>
                    </ng-template>
                </ng-template>
            </div>
        </div>
        <div class="p-treeselect-trigger">
            <span class="p-treeselect-trigger-icon pi pi-chevron-down"></span>
        </div>

        <div #overlayRef class="p-treeselect-panel p-component" *ngIf="overlayVisible" (click)="onOverlayClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)">
            <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: value, options: options}"></ng-container>
            <div class="p-treeselect-items-wrapper" [ngStyle]="{'max-height': scrollHeight}">
                <p-tree [value]="options" [propagateSelectionDown]="propagateSelectionDown" [propagateSelectionUp]="propagateSelectionUp" [selectionMode]="selectionMode" (selectionChange)="onSelectionChange($event)" [selection]="value"
                    [metaKeySelection]="metaKeySelection" (onNodeExpand)="nodeExpand($event)" (onNodeCollapse)="nodeCollapse($event)"
                    (onNodeSelect)="onSelect($event)" (onNodeUnselect)="onUnselect($event)"></p-tree>
                <div *ngIf="emptyOptions" class="p-treeselect-empty-message">
                    <ng-container *ngIf="!emptyTemplate; else empty">
                        {{emptyMessageText}}
                    </ng-container>
                    <ng-container *ngTemplateOutlet="emptyTemplate;"></ng-container>
                </div>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate; context: {$implicit: value, options: options}"></ng-container>
        </div>
    </div>
    `,
    styleUrls: ['./treeselect.css'],
    animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('{{showTransitionParams}}')
              ]),
              transition(':leave', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
              ])
        ])
    ],
    host: {
        'class': 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': '!emptyValue',
        '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TREESELECT_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class TreeSelect implements AfterContentInit {

    @Input() type: string = "button";

    @Input() inputId: string;

    @Input() scrollHeight: string = "400px";

    @Input() disabled: boolean;

    @Input() metaKeySelection: boolean = true;

    @Input() display: string = "comma";

    @Input() selectionMode: string = "single";

    @Input() tabindex: string;

    @Input() ariaLabelledBy: string;

    @Input() placeholder: string;

    @Input() panelClass: string;

    @Input() emptyMessage: string;

    @Input() appendTo: any;

    @Input() propagateSelectionDown: boolean = true;

    @Input() propagateSelectionUp: boolean = true;

    @Input() get options(): any[] {
        return this._options;
    };
    set options(options) {
        this._options = options;
        this.updateTreeState();
    }

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('container') containerEl: ElementRef;

    @ViewChild('focusInput') focusInput: ElementRef;

    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();

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

    outsideClickListener: any;

    scrollHandler: any;

    resizeListener: any;

    overlayEl: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(public config: PrimeNGConfig, public cd: ChangeDetectorRef, public el: ElementRef, public overlayService: OverlayService) { }

    ngOnInit() {
        this.updateTreeState();
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
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

                default:
                    this.valueTemplate = item.template;
                break;
            }
        });
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.overlayEl = event.element;
                this.onOverlayEnter();
            break;
        }
    }

    onOverlayAnimationDone(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.onOverlayLeave();
            break;
        }
    }

    onSelectionChange(event) {
        this.value = event;
        this.onModelChange(this.value);
        this.cd.markForCheck();
    }

    onClick(event) {
        if (!this.disabled && (!this.overlayEl || !this.overlayEl.contains(event.target)) && !DomHandler.hasClass(event.target, 'p-treeselect-close')) {
            if (this.overlayVisible){
                this.hide();
            }
            else
                this.show();

            this.focusInput.nativeElement.focus();
        }
    }

    onKeyDown(event) {
        switch(event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                    event.preventDefault();
                }
                else if (this.overlayVisible && this.overlayEl) {
                    let focusableElements = DomHandler.getFocusableElements(this.overlayEl);

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

    show() {
        this.overlayVisible = true;
    }

    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }

    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    updateTreeState() {
        if (this.value) {
            let selectedNodes = this.selectionMode === "single" ? [this.value] : [...this.value];
            this.resetExpandedNodes();
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
                    path.push(node);
                    this.updateTreeBranchState(childNode, path, selectedNodes);
                }
            }
        }
        else {
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
        }
        else {
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
            if (this.selectionMode === "single") {
                let areNodesEqual = (this.value.key && this.value.key === node.key) || this.value == node;
                index = areNodesEqual ? 0 : - 1;
            }
            else {
                for(let i = 0; i  < this.value.length; i++) {
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

    onOverlayEnter() {
        ZIndexUtils.set('overlay', this.overlayEl, this.config.zIndex.overlay);
        this.appendContainer();
        this.alignOverlay();
        this.bindOutsideClickListener();
        this.bindScrollListener();
        this.bindResizeListener();
        this.onShow.emit();
    }

    onOverlayLeave() {
        this.unbindOutsideClickListener();
        this.unbindScrollListener();
        this.unbindResizeListener();
        ZIndexUtils.clear(this.overlayEl);
        this.overlayEl = null;
        this.onHide.emit();
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
    }

    writeValue(value: any) : void {
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

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlayEl);
            else
                document.getElementById(this.appendTo).appendChild(this.overlayEl);
        }
    }

    restoreAppend() {
        if (this.overlayEl && this.appendTo) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.overlayEl);
            else
                document.getElementById(this.appendTo).removeChild(this.overlayEl);
        }
    }

    alignOverlay() {
        if (this.appendTo) {
            DomHandler.absolutePosition(this.overlayEl, this.containerEl.nativeElement);
            this.overlayEl.style.minWidth = DomHandler.getOuterWidth(this.containerEl.nativeElement) + 'px';
        } else {
            DomHandler.relativePosition(this.overlayEl, this.containerEl.nativeElement);
        }
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event) => {
                if (this.overlayVisible && this.overlayEl && !this.containerEl.nativeElement.contains(event.target) && !this.overlayEl.contains(event.target)) {
                    this.hide();
                }
            };
            document.addEventListener('click', this.outsideClickListener);
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerEl.nativeElement, () => {
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

    bindResizeListener() {
        if (!this.resizeListener) {
            this.resizeListener = () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            };
            window.addEventListener('resize', this.resizeListener);
        }
    }

    unbindResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }

    ngOnDestroy() {
        this.restoreAppend();
        this.unbindOutsideClickListener();
        this.unbindResizeListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.overlayEl) {
            ZIndexUtils.clear(this.overlayEl);
            this.overlayEl = null;
        }
    }

    containerClass() {
        return {
            'p-treeselect p-component p-inputwrapper': true,
            'p-treeselect-chip': this.display === 'chip',
            'p-disabled': this.disabled,
            'p-focus': this.focused
        }
    }

    labelClass() {
        return {
            'p-treeselect-label': true,
            'p-placeholder': this.label === this.placeholder,
            'p-treeselect-label-empty': !this.placeholder && this.emptyValue
        }
    }

    get emptyMessageText() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    get emptyValue() {
        return !this.value || Object.keys(this.value).length === 0;
    }

    get emptyOptions() {
        return !this.options || this.options.length === 0;
    }

    get label() {
        let value = this.value||[];
        return value.length ? value.map(node => node.label).join(', ') : (this.selectionMode === "single" && this.value) ? value.label : this.placeholder;
    }
}

@NgModule({
    imports: [CommonModule,RippleModule,SharedModule,TreeModule],
    exports: [TreeSelect,SharedModule,TreeModule],
    declarations: [TreeSelect]
})
export class TreeSelectModule { }

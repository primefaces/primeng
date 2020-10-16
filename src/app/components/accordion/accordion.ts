import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, 
    ContentChildren, QueryList, ChangeDetectorRef, Inject, forwardRef, TemplateRef, ViewRef, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, PrimeTemplate } from 'primeng/api';
import { BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';

let idx: number = 0;

@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="p-accordion-tab" [ngClass]="{'p-accordion-tab-active': selected}">
            <div class="p-accordion-header" [ngClass]="{'p-highlight': selected, 'p-disabled': disabled}">
                <a role="tab" class="p-accordion-header-link" (click)="toggle($event)" (keydown)="onKeydown($event)" [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="id" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="selected">
                    <span class="p-accordion-toggle-icon" [ngClass]="selected ? accordion.collapseIcon : accordion.expandIcon"></span>
                    <span class="p-accordion-header-text" *ngIf="!hasHeaderFacet">
                        {{header}}
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
                </a>
            </div>
            <div [attr.id]="id + '-content'" class="p-toggleable-content" [@tabContent]="selected ? {value: 'visible', params: {transitionParams: transitionOptions}} : {value: 'hidden', params: {transitionParams: transitionOptions}}"
                role="region" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id">
                <div class="p-accordion-content">
                    <ng-content></ng-content>
                    <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('tabContent', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({overflow: 'hidden'}), animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./accordion.css']
})
export class AccordionTab implements AfterContentInit,OnDestroy {

    @Input() header: string;

    @Input() disabled: boolean;

    @Input() cache: boolean = true;

    @Output() selectedChange: EventEmitter<any> = new EventEmitter();

    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChildren(Header) headerFacet: QueryList<Header>;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    private _selected: boolean;

    @Input() get selected(): any {
        return this._selected;
    }

    set selected(val: any) {
        this._selected = val;
        
        if (!this.loaded) {
            this.changeDetector.detectChanges();
        }
    }

    contentTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    id: string = `p-accordiontab-${idx++}`;

    loaded: boolean;

    accordion: Accordion;

    constructor(@Inject(forwardRef(() => Accordion)) accordion, public changeDetector: ChangeDetectorRef) {
        this.accordion = accordion as Accordion;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;
                
                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }

    toggle(event) {
        if (this.disabled) {
            return false;
        }

        let index = this.findTabIndex();

        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                    this.accordion.tabs[i].changeDetector.markForCheck();
                }
            }

            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }

        this.selectedChange.emit(this.selected);
        this.accordion.updateActiveIndex();
        this.changeDetector.markForCheck();

        event.preventDefault();
    }

    findTabIndex() {
        let index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }

    get hasHeaderFacet(): boolean {
        return this.headerFacet && this.headerFacet.length > 0;
    }

    onKeydown(event: KeyboardEvent) {
        if (event.which === 32 || event.which === 13) {
            this.toggle(event);
            event.preventDefault();
        }
    }

    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
}

@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass" role="tablist">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion implements BlockableUI, AfterContentInit, OnDestroy {
    
    @Input() multiple: boolean;
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: any;
    
    @Input() styleClass: string;

    @Input() expandIcon: string = 'pi pi-fw pi-chevron-right';

    @Input() collapseIcon: string = 'pi pi-fw pi-chevron-down';

    @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();
    
    @ContentChildren(AccordionTab) tabList: QueryList<AccordionTab>;

    tabListSubscription: Subscription;
    
    private _activeIndex: any;

    preventActiveIndexPropagation: boolean;
    
    public tabs: AccordionTab[] = [];

    constructor(public el: ElementRef, public changeDetector: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.initTabs();

        this.tabListSubscription = this.tabList.changes.subscribe(_ => {
            this.initTabs();
        });
    }

    initTabs(): any {
        this.tabs = this.tabList.toArray();
        this.updateSelectionState();
        this.changeDetector.markForCheck();
    }
      
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    } 
    
    @Input() get activeIndex(): any {
        return this._activeIndex;
    }

    set activeIndex(val: any) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }

        this.updateSelectionState();
    }

    updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                let changed = selected !== this.tabs[i].selected;

                if (changed) {
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                    this.tabs[i].changeDetector.markForCheck();
                }
            }
        }
    }

    updateActiveIndex() {
        let index: any = this.multiple ? [] : null;
        this.tabs.forEach((tab, i) => {
            if (tab.selected) {
                if (this.multiple) {
                    index.push(i);
                }
                else {
                    index = i;
                    return;
                }
            }
        });

        this.preventActiveIndexPropagation = true;
        this.activeIndexChange.emit(index);
    }

    ngOnDestroy() {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Accordion,AccordionTab,SharedModule],
    declarations: [Accordion,AccordionTab]
})
export class AccordionModule { }

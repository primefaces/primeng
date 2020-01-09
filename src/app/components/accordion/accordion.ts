import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, 
    ContentChildren, QueryList, ChangeDetectorRef, Inject, forwardRef, TemplateRef, ViewRef} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, PrimeTemplate } from 'primeng/api';
import { BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';

let idx: number = 0;

@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="ui-accordion-header ui-state-default ui-corner-all" [ngClass]="{'ui-state-active': selected,'ui-state-disabled':disabled}">
            <a [attr.tabindex]="disabled ? -1 : 0" [attr.id]="id" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="selected" (click)="toggle($event)" 
                (keydown)="onKeydown($event)">
                <span class="ui-accordion-toggle-icon" [ngClass]="selected ? accordion.collapseIcon : accordion.expandIcon"></span>
                <span class="ui-accordion-header-text" *ngIf="!hasHeaderFacet">
                    {{header}}
                </span>
                <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
            </a>
        </div>
        <div [attr.id]="id + '-content'" class="ui-accordion-content-wrapper" [@tabContent]="selected ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}" (@tabContent.done)="onToggleDone($event)"
            [ngClass]="{'ui-accordion-content-wrapper-overflown': !selected||animating}" 
            role="region" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id">
            <div class="ui-accordion-content ui-widget-content">
                <ng-content></ng-content>
                <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </ng-container>
            </div>
        </div>
    `,
    animations: [
        trigger('tabContent', [
            state('hidden', style({
                height: '0'
            })),
            state('void', style({
                height: '{{height}}'
            }), {params: {height: '0'}}),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', animate('{{transitionParams}}')),
            transition('void => hidden', animate('{{transitionParams}}')),
            transition('void => visible', animate('{{transitionParams}}'))
        ])
    ]
})
export class AccordionTab implements OnDestroy {

    @Input() header: string;

    @Input() selected: boolean;

    @Input() disabled: boolean;

    @Input() cache: boolean = true;

    @Output() selectedChange: EventEmitter<any> = new EventEmitter();

    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChildren(Header) headerFacet: QueryList<Header>;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    private _animating: boolean;

    get animating(): boolean {
        return this._animating;
    }
    set animating(val: boolean) {
        this._animating = val;

        if(!(this.changeDetector as ViewRef).destroyed) {
            this.changeDetector.detectChanges();
        }
    }

    contentTemplate: TemplateRef<any>;

    id: string = `ui-accordiontab-${idx++}`;

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
                
                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }

    toggle(event) {
        if (this.disabled || this.animating) {
            return false;
        }

        this.animating = true;
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
                }
            }

            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }

        this.selectedChange.emit(this.selected);

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

    onToggleDone(event: Event) {
        this.animating = false;
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
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass" role="tablist">
            <ng-content></ng-content>
        </div>
    `
})
export class Accordion implements BlockableUI, AfterContentInit, OnDestroy {
    
    @Input() multiple: boolean;
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: any;
    
    @Input() styleClass: string;

    @Input() expandIcon: string = 'pi pi-fw pi-chevron-right';

    @Input() collapseIcon: string = 'pi pi-fw pi-chevron-down';
    
    @ContentChildren(AccordionTab) tabList: QueryList<AccordionTab>;

    tabListSubscription: Subscription;
    
    private _activeIndex: any;
    
    public tabs: AccordionTab[] = [];

    constructor(public el: ElementRef, public changeDetector: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.initTabs();

        this.tabListSubscription = this.tabList.changes.subscribe(_ => {
            this.initTabs();
            this.changeDetector.markForCheck();
        });
    }

    initTabs(): any {
        this.tabs = this.tabList.toArray();
        this.updateSelectionState();
    }
      
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    } 
    
    @Input() get activeIndex(): any {
        return this._activeIndex;
    }

    set activeIndex(val: any) {
        this._activeIndex = val;
        this.updateSelectionState();
    }

    updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                let changed = selected !== this.tabs[i].selected;

                if (changed) {
                    this.tabs[i].animating = true;
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                }
            }
        }
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

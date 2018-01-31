import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, 
    ContentChildren, QueryList, ChangeDetectorRef, Inject, forwardRef} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, Header } from '../common/shared';
import { BlockableUI } from '../common/blockableui';
import { Subscription } from 'rxjs/Subscription';

let idx: number = 0;

@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="ui-accordion-header ui-state-default ui-corner-all" [ngClass]="{'ui-state-active': selected,'ui-state-disabled':disabled}">
            <a href="#" [attr.id]="id" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="selected" (click)="toggle($event)" (keydown.space)="toggle($event)">
                <span class="ui-accordion-toggle-icon" [ngClass]="selected ? accordion.collapseIcon : accordion.expandIcon"></span>
                <span class="ui-accordion-header-text" *ngIf="!hasHeaderFacet">
                    {{header}}
                </span>
                <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
            </a>
        </div>
        <div [attr.id]="id + '-content'" class="ui-accordion-content-wrapper" [@tabContent]="selected ? 'visible' : 'hidden'" (@tabContent.done)="onToggleDone($event)"
            [ngClass]="{'ui-accordion-content-wrapper-overflown': !selected||animating}" 
            role="region" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id">
            <div class="ui-accordion-content ui-widget-content" *ngIf="lazy ? selected : true">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    animations: [
        trigger('tabContent', [
            state('hidden', style({
                height: '0'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AccordionTab implements OnDestroy {

    @Input() header: string;

    @Input() selected: boolean;

    @Input() disabled: boolean;

    @Output() selectedChange: EventEmitter<any> = new EventEmitter();

    @ContentChildren(Header) headerFacet: QueryList<Header>;

    animating: boolean;

    id: string = `ui-accordiontab-${idx++}`;

    constructor( @Inject(forwardRef(() => Accordion)) public accordion: Accordion) {}

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

    get lazy(): boolean {
        return this.accordion.lazy;
    }

    get hasHeaderFacet(): boolean {
        return this.headerFacet && this.headerFacet.length > 0;
    }

    onToggleDone(event: Event) {
        this.animating = false;
    }

    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
}

@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass" role="presentation">
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

    @Input() expandIcon: string = 'fa fa-fw fa-caret-right';

    @Input() collapseIcon: string = 'fa fa-fw fa-caret-down';
    
    @Input() lazy: boolean;

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
                }

                this.tabs[i].selected = selected;
                this.tabs[i].selectedChange.emit(selected);
            }
        }
    }

    ngOnDestroy() {
        if(this.tabListSubscription) {
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

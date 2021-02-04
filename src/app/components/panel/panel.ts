import {NgModule,Component,Input,Output,EventEmitter,ElementRef,ContentChild,ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, QueryList, TemplateRef, AfterContentInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule,Footer, PrimeTemplate} from 'primeng/api';
import {BlockableUI} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {trigger,state,style,transition,animate} from '@angular/animations';

let idx: number = 0;

@Component({
    selector: 'p-panel',
    template: `
        <div [attr.id]="id" [ngClass]="{'p-panel p-component': true, 'p-panel-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-panel-header" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
                <span class="p-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{header}}</span>
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div class="p-panel-icons">
                    <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
                    <button *ngIf="toggleable" type="button" [attr.id]="id + '-label'" class="p-panel-header-icon p-panel-toggler p-link" pRipple
                        (click)="onIconClick($event)" (keydown.enter)="onIconClick($event)" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="!collapsed">
                        <span [class]="collapsed ? expandIcon : collapseIcon"></span>
                    </button>
                </div>
            </div>
            <div [attr.id]="id + '-content'" class="p-toggleable-content" [@panelContent]="collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}" (@panelContent.done)="onToggleDone($event)"
                role="region" [attr.aria-hidden]="collapsed" [attr.aria-labelledby]="id  + '-titlebar'">
                <div class="p-panel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                
                <div class="p-panel-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('panelContent', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('void', style({
                height: '{{height}}'
            }), {params: {height: '0'}}),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({ overflow: 'hidden'}), animate('{{transitionParams}}')]),
            transition('void => hidden', animate('{{transitionParams}}')),
            transition('void => visible', animate('{{transitionParams}}'))
        ])
    ],
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.css']
})
export class Panel implements AfterContentInit,BlockableUI {

    @Input() toggleable: boolean;

    @Input() header: string;

    @Input() collapsed: boolean = false;
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() expandIcon: string = 'pi pi-plus';
    
    @Input() collapseIcon: string = 'pi pi-minus';
  
    @Input() showHeader: boolean = true;

    @Input() toggler: string = "icon";
    
    @Output() collapsedChange: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChild(Footer) footerFacet;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public iconTemplate: TemplateRef<any>;
    
    animating: boolean;

    headerTemplate: TemplateRef<any>;

    contentTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;
    
    id: string = `p-panel-${idx++}`;
    
    constructor(private el: ElementRef) { }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'content':
                    this.contentTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;

                case 'icons':
                    this.iconTemplate = item.template;
                break;

                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }

    onHeaderClick(event: Event) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }

    onIconClick(event: Event) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }
    
    toggle(event: Event) {
        if (this.animating) {
            return false;
        }
        
        this.animating = true;
        this.onBeforeToggle.emit({originalEvent: event, collapsed: this.collapsed});
        
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        
        event.preventDefault();
    }
    
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }
    
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
    
    onToggleDone(event: Event) {
        this.animating = false;
        this.onAfterToggle.emit({originalEvent: event, collapsed: this.collapsed});
    }

}

@NgModule({
    imports: [CommonModule,SharedModule,RippleModule],
    exports: [Panel,SharedModule],
    declarations: [Panel]
})
export class PanelModule { }

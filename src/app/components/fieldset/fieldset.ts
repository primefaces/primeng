import {NgModule,Component,Input,Output,EventEmitter,ElementRef,ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, QueryList, ContentChildren, TemplateRef} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SharedModule, PrimeTemplate} from 'primeng/api';
import {BlockableUI} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';  

let idx: number = 0;

@Component({
    selector: 'p-fieldset',
    template: `
        <fieldset [attr.id]="id" [ngClass]="{'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <legend class="p-fieldset-legend">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a tabindex="0" (click)="toggle($event)" (keydown.enter)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed" pRipple>
                        <span class="p-fieldset-toggler pi" *ngIf="toggleable" [ngClass]="{'pi-minus': !collapsed,'pi-plus':collapsed}"></span>
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="p-fieldset-legend-text">{{legend}}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </ng-template>
            </legend>
            <div [attr.id]="id + '-content'" class="p-toggleable-content" [@fieldsetContent]="collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}" 
                        [attr.aria-labelledby]="id" [attr.aria-hidden]="collapsed"
                         (@fieldsetContent.done)="onToggleDone($event)" role="region">
                <div class="p-fieldset-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
        </fieldset>
    `,
    animations: [
        trigger('fieldsetContent', [
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
    styleUrls: ['./fieldset.css']
})
export class Fieldset implements AfterContentInit,BlockableUI {

    @Input() legend: string;

    @Input() toggleable: boolean;

    @Input() collapsed: boolean = false;

    @Output() collapsedChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    @Input() style: any;
        
    @Input() styleClass: string;

    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public animating: boolean;

    headerTemplate: TemplateRef<any>;

    contentTemplate: TemplateRef<any>;
    
    constructor(private el: ElementRef) {}
    
    id: string = `p-fieldset-${idx++}`;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'content':
                    this.contentTemplate = item.template;
                break;
            }
        });
    }
        
    toggle(event) {
        if (this.animating) {
            return false;
        }
        
        this.animating = true;
        this.onBeforeToggle.emit({originalEvent: event, collapsed: this.collapsed});
        
        if (this.collapsed)
            this.expand(event);
        else
            this.collapse(event);
            
        this.onAfterToggle.emit({originalEvent: event, collapsed: this.collapsed});   
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
    }

}

@NgModule({
    imports: [CommonModule,RippleModule],
    exports: [Fieldset,SharedModule],
    declarations: [Fieldset]
})
export class FieldsetModule { }
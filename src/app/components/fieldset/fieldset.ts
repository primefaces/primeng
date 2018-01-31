import {NgModule,Component,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared';
import {BlockableUI} from '../common/blockableui';

let idx: number = 0;

@Component({
    selector: 'p-fieldset',
    template: `
        <fieldset [attr.id]="id" [ngClass]="{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <legend class="ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a href="#" (click)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed" [attr.tabindex]="toggleable ? null : -1">
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="ui-fieldset-toggler fa fa-w" *ngIf="toggleable" [ngClass]="{'fa-minus': !collapsed,'fa-plus':collapsed}"></span>
                    <span class="ui-fieldset-legend-text">{{legend}}</span>
                    <ng-content select="p-header"></ng-content>
                </ng-template>
            </legend>
            <div [attr.id]="id + '-content'" class="ui-fieldset-content-wrapper" [@fieldsetContent]="collapsed ? 'hidden' : 'visible'" 
                        [ngClass]="{'ui-fieldset-content-wrapper-overflown': collapsed||animating}" [attr.aria-hidden]="collapsed"
                         (@fieldsetContent.done)="onToggleDone($event)" role="region">
                <div class="ui-fieldset-content">
                    <ng-content></ng-content>
                </div>
            </div>
        </fieldset>
    `,
    animations: [
        trigger('fieldsetContent', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class Fieldset implements BlockableUI {

    @Input() legend: string;

    @Input() toggleable: boolean;

    @Input() collapsed: boolean = false;

    @Output() collapsedChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    @Input() style: any;
        
    @Input() styleClass: string
    
    public animating: boolean;
    
    constructor(private el: ElementRef) {}
    
    id: string = `ui-fieldset-${idx++}`;
        
    toggle(event) {
        if(this.animating) {
            return false;
        }
        
        this.animating = true;
        this.onBeforeToggle.emit({originalEvent: event, collapsed: this.collapsed});
        
        if(this.collapsed)
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
    imports: [CommonModule],
    exports: [Fieldset,SharedModule],
    declarations: [Fieldset]
})
export class FieldsetModule { }
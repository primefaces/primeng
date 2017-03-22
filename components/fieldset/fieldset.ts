import {NgModule,Component,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared';
import {BlockableUI} from '../common/api';

@Component({
    selector: 'p-fieldset',
    template: `
        <fieldset [ngClass]="{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <legend class="ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text" (click)="toggle($event)">
                <span *ngIf="toggleable" class="ui-fieldset-toggler fa fa-w" [ngClass]="{'fa-minus': !collapsed,'fa-plus':collapsed}"></span>
                {{legend}}
                <ng-content select="p-header"></ng-content>
            </legend>
            <div class="ui-fieldset-content-wrapper" [@fieldsetContent]="collapsed ? 'hidden' : 'visible'" 
                        [ngClass]="{'ui-fieldset-content-wrapper-overflown': collapsed||animating}">
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

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    @Input() style: any;
        
    @Input() styleClass: string
    
    public animating: boolean;
    
    constructor(private el: ElementRef) {}
        
    toggle(event) {
        if(this.toggleable) {
            this.animating = true;
            this.onBeforeToggle.emit({originalEvent: event, collapsed: this.collapsed});
            
            if(this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
                
            this.onAfterToggle.emit({originalEvent: event, collapsed: this.collapsed});   
            
            //TODO: Use onDone of animate callback instead with RC6
            setTimeout(() => {
                this.animating = false;
            }, 400);
        }
    }
    
    expand(event) {
        this.collapsed = false;
    }
    
    collapse(event) {
        this.collapsed = true;
    }
    
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Fieldset,SharedModule],
    declarations: [Fieldset]
})
export class FieldsetModule { }
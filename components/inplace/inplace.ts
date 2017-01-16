import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';

@Component({
    selector: 'p-inplaceDisplay',
    template: '<ng-content></ng-content>'
})
export class InplaceDisplay {}

@Component({
    selector: 'p-inplaceContent',
    template: '<ng-content></ng-content>'
})
export class InplaceContent {}

@Component({
    selector: 'p-inplace',
    template: `
        <div [ngClass]="'ui-inplace ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-inplace-display" (click)="activate($event)"
                [ngClass]="{'ui-state-disabled':disabled}" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
            </div>
            <div class="ui-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
                <button type="button" icon="fa-close" pButton (click)="deactivate($event)" *ngIf="closable"></button>
            </div>
        </div>
    `
})
export class Inplace {
        
    @Input() active: boolean;
    
    @Input() closable: boolean;
    
    @Input() disabled: boolean;

    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Output() onActivate: EventEmitter<any> = new EventEmitter();
    
    @Output() onDeactivate: EventEmitter<any> = new EventEmitter();
    
    hover: boolean;
    
    activate(event) {
        if(!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    }
    
    deactivate(event) {
        if(!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [Inplace,InplaceDisplay,InplaceContent,ButtonModule],
    declarations: [Inplace,InplaceDisplay,InplaceContent]
})
export class InplaceModule { }
import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

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
            <div class="ui-inplace-display" (mouseenter)="hover=true" (mouseleave)="hover=false" (click)="active=true"
                [ngClass]="{'ui-state-hover':hover}" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
            </div>
            <div class="ui-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
            </div>
        </div>
    `
})
export class Inplace {
    
    @Input() active: boolean;

    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Output() onOpen: EventEmitter<any> = new EventEmitter();
}

@NgModule({
    imports: [CommonModule],
    exports: [Inplace,InplaceDisplay,InplaceContent],
    declarations: [Inplace,InplaceDisplay,InplaceContent]
})
export class InplaceModule { }
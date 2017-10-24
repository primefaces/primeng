import {NgModule,Component,Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-progressSpinner',
    template: `
        <div class="ui-progress-spinner" [ngStyle]="style" [ngClass]="styleClass">
            <svg class="ui-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="ui-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10"/>
            </svg>
        </div>
    `
})
export class ProgressSpinner {

    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() strokeWidth: string = "2";
    
    @Input() fill: string = "none";
    
    @Input() animationDuration: string = "2s";
    
}

@NgModule({
    imports: [CommonModule],
    exports: [ProgressSpinner],
    declarations: [ProgressSpinner]
})
export class ProgressSpinnerModule { }
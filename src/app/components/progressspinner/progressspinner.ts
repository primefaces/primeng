import {NgModule,Component,Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-progressSpinner',
    template: `
        <div class="ui-progress-spinner" [ngStyle]="style" [ngClass]="styleClass">
            <svg class="ui-progress-spinner-circle" viewBox="25 25 50 50">
                <circle class="ui-progress-spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
        </div>
    `
})
export class ProgressSpinner {

    @Input() style: any;
    
    @Input() styleClass: string;
    
}

@NgModule({
    imports: [CommonModule],
    exports: [ProgressSpinner],
    declarations: [ProgressSpinner]
})
export class ProgressSpinnerModule { }
import {NgModule,Component,Input,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-progressBar',
    template: `
        <div [class]="styleClass" [ngStyle]="style" role="progressbar" aria-valuemin="0" [attr.aria-valuenow]="value" aria-valuemax="100"
            [ngClass]="{'p-progressbar p-component': true, 'p-progressbar-determinate': (mode === 'determinate'), 'p-progressbar-indeterminate': (mode === 'indeterminate')}">
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:block"></div>
            <div *ngIf="mode === 'determinate' && showValue" class="p-progressbar-label" [style.display]="value != null ? 'block' : 'none'">{{value}}{{unit}}</div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container">
                <div class="p-progressbar-value p-progressbar-value-animate"></div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./progressbar.css']
})
export class ProgressBar {

    @Input() value: any;
    
    @Input() showValue: boolean = true;
    
    @Input() style: any;
    
    @Input() styleClass: string;

    @Input() unit: string = '%';
    
    @Input() mode: string = 'determinate';
    
}

@NgModule({
    imports: [CommonModule],
    exports: [ProgressBar],
    declarations: [ProgressBar]
})
export class ProgressBarModule { }
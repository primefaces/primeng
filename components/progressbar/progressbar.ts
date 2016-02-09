import {Component,Input} from 'angular2/core';

@Component({
    selector: 'p-progressBar',
    template: `
        <div class="ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" aria-valuemin="0" [attr.aria-valuenow]="value" aria-valuemax="100">
            <div class="ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all" [style.width]="value + '%'" style="display:block"></div>
            <div class="ui-progressbar-label" [style.display]="value ? 'block' : 'none'">{{value}}%</div>
        </div>
    `
})
export class ProgressBar {

    @Input() value: any;

}
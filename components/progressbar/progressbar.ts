import {Component,Input} from 'angular2/core';

@Component({
    selector: 'p-progressBar',
    template: `
        <div class="pui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" aria-valuemin="0" [attr.aria-valuenow]="value" aria-valuemax="100">
            <div class="pui-progressbar-value pui-progressbar-value-animate ui-widget-header ui-corner-all" [style.width]="value + '%'" style="display:block"></div>
            <div class="pui-progressbar-label" [style.display]="value ? 'block' : 'none'">{{value}}%</div>
        </div>
    `
})
export class ProgressBar {

    @Input() value: any;

}
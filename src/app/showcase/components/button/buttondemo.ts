import {Component} from '@angular/core';

@Component({
    templateUrl: './buttondemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .5em;
        }
    `]
})
export class ButtonDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}
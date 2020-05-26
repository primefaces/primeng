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

    loaded: boolean = false;

    count() {
        this.clicks++;
    }

    onLoad() {
        this.loaded = true;
    }
}
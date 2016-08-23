import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/button/buttondemo.html'
})
export class ButtonDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}
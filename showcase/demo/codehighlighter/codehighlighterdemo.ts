import {Component} from '@angular/core';

@Component({
    templateUrl: './codehighlighterdemo.html'
})
export class CodeHighlighterDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}
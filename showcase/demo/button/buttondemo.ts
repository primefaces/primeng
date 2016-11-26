import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/button/buttondemo.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDemo {

    clicks: number = 0;
    btnicon: string = 'fa-check';
    btnlabel = `click - ${this.clicks}`;
    btnIconpos: string = 'right';
    count() {
        this.clicks++;
        if (this.clicks % 2 === 0) {
            this.btnicon = 'fa-check';
            this.btnIconpos = 'right';
        } else {
            this.btnicon = 'fa-times';
            this.btnIconpos = 'left';
        }
        this.btnlabel = `click - ${this.clicks}`
    }
}
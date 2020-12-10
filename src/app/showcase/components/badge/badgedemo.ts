import {Component} from '@angular/core';

@Component({
    templateUrl: './badgedemo.html'
})
export class BadgeDemo {

    value = "2";

    ngOnInit() {
        setTimeout(() => {
            this.value = "24+";
            this.hey()
        },2000)
    }

    hey() {
        setTimeout(() => {
            this.value = null;
        }, 2000);
    }

}
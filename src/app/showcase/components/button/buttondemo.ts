import {Component} from '@angular/core';

@Component({
    templateUrl: './buttondemo.html',
    styleUrls: ['./buttondemo.scss']
})
export class ButtonDemo {
    loading = [false, false, false, false]

    load(index) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }
}
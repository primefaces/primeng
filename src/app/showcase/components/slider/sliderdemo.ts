import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    templateUrl: './sliderdemo.html',
    styleUrls: ['./sliderdemo.scss']
})
export class SliderDemo {

    val1: number;

    val2: number = 50;

    val3: number;

    val4: number;

    val5: number = 50;

    rangeValues: number[] = [20, 80];

    rangeValues2: number[] = [20, 80];
}

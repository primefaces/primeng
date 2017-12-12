import {Component} from '@angular/core';

@Component({
    templateUrl: './ratingdemo.html'
})
export class RatingDemo {

    val1: number;

    val2: number;

    val3: number;

    val4: number = 5;
    
    val5: number;

    msg: string;

    handleRate(event) {
        this.msg = "You have rated " + event.value;
    }

    handleCancel(event) {
        this.msg = "Rating Cancelled";
    }
}
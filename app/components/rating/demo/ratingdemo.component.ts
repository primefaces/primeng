import {Component} from 'angular2/core';
import {RatingComponent} from '../rating.component';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Rating</span>
                <span class="defaultText dispTable">Rating components is a star based selection input.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic {{value1}}</h3> 
            <p-rating [(value)]="value1"></p-rating>
            <br />

            <h3>Callback {{value2}}</h3>
            <p-rating [(value)]="value2" (onRate)="handleRate($event)" (onCancel)="handleCancel($event)"></p-rating> <span *ngIf="msg" style="margin-left:10px">{{msg}}</span>
            <br />

            <h3>No Cancel {{value3}}</h3> 
            <p-rating [(value)]="value3" [cancel]="false"></p-rating>
            <br />

            <h3>ReadOnly</h3> 
            <p-rating value="5" readonly="true" stars="10" [cancel]="false"></p-rating>
            <br />

            <h3>Disabled</h3> 
            <p-rating [value]="val4" disabled="true" stars="10"></p-rating>
            <br />
        </div>
    `,
    directives: [RatingComponent]
})
export class RatingDemoComponent {

    val1: number;

    val2: number = 5;

    val3: number;

    val4: number = 5;

    msg: string;

    handleRate(event) {
        this.msg = "You have rated " + event.value;
    }

    handleCancel(event) {
        this.msg = "Rating Cancelled";
    }
}
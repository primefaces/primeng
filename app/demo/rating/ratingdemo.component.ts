import {Component} from 'angular2/core';
import {RatingComponent} from '../../components/rating/rating.component';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/rating/ratingdemo.component.html',
    directives: [RatingComponent,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
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
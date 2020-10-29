import {Component,OnInit} from '@angular/core';
import {PrimeIcons} from 'primeng/api';

@Component({
    templateUrl: './timelinedemo.html',
    styleUrls: ['./timelinedemo.scss']
})
export class TimelineDemo implements OnInit {

    events1: any[];
    
    events2: any[];
    
    ngOnInit() {
        this.events1 = [
            {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
            {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
            {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
            {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
        ];

        this.events2 = [
            "2020", "2021", "2022", "2023"
        ];
    }
}

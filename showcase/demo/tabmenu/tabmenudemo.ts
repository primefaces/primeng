import {Component} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './tabmenudemo.html'
})
export class TabMenuDemo {
    
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Stats', icon: 'fa-bar-chart'},
            {label: 'Calendar', icon: 'fa-calendar'},
            {label: 'Documentation', icon: 'fa-book'},
            {label: 'Support', icon: 'fa-support'},
            {label: 'Social', icon: 'fa-twitter'}
        ];
    }
}
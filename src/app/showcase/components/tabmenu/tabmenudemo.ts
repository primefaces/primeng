import {Component} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './tabmenudemo.html'
})
export class TabMenuDemo {
    
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Stats', icon: 'fa fa-bar-chart'},
            {label: 'Calendar', icon: 'fa fa-calendar'},
            {label: 'Documentation', icon: 'fa fa-book'},
            {label: 'Support', icon: 'fa fa-support'},
            {label: 'Social', icon: 'fa fa-twitter'}
        ];
    }
}
import {Component} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './tabmenudemo.html'
})
export class TabMenuDemo {
    
    items1: MenuItem[];

    items2: MenuItem[];

    activeItem: MenuItem;

    ngOnInit() {
        this.items1 = [
            {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
            {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
            {label: 'Documentation', icon: 'fa fa-fw fa-book'},
            {label: 'Support', icon: 'fa fa-fw fa-support'},
            {label: 'Social', icon: 'fa fa-fw fa-twitter'}
        ];

        this.items2 = [
            {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
            {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
            {label: 'Documentation', icon: 'fa fa-fw fa-book'},
            {label: 'Support', icon: 'fa fa-fw fa-support'},
            {label: 'Social', icon: 'fa fa-fw fa-twitter'}
        ];

        this.activeItem = this.items2[0];
    }

    closeItem(event, index) {
        this.items2 = this.items2.filter((item, i) => i !== index);
        event.preventDefault();
    }
}
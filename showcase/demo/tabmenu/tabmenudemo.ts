import {Component} from '@angular/core';
import {TabMenu} from '../../../components/tabmenu/tabmenu';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MenuItem} from '../../../components/common';

@Component({
    templateUrl: 'showcase/demo/tabmenu/tabmenudemo.html',
    directives: [TabMenu,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class TabMenuDemo {
    
    private items: MenuItem[];

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
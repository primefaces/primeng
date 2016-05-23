import {Component} from '@angular/core';
import {TabView} from '../../../components/tabview/tabview';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/button/buttondemo.html',
    directives: [CodeHighlighter,Button,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class ButtonDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}
import {Component} from '@angular/core';
import {TabView} from '../../../components/tabview/tabview';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/codehighlighter/codehighlighterdemo.html',
    directives: [CodeHighlighter,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class CodeHighlighterDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}
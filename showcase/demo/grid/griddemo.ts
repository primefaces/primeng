import {Component} from '@angular/core';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';

@Component ({
    styles:[`
        .ui-g div {
            background-color: #ededed;
            text-align: center;
            border: 1px solid #fafafa;
        }
    `],
    templateUrl: 'showcase/demo/grid/griddemo.html',
    directives: [TabView,TabPanel,CodeHighlighter]
})
export class GridDemo {

}
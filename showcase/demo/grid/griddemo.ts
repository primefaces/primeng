import {Component} from '@angular/core';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';

@Component ({
    styles:[`
        .ui-g div {
            background-color: #d3d3d3;
            text-align: center;
            border: 1px solid #e0e0e0;
        }
    `],
    templateUrl: 'showcase/demo/grid/griddemo.html',
    directives: [TabView,TabPanel,CodeHighlighter]
})
export class GridDemo {

}
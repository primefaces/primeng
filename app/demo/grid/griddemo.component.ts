import {Component} from 'angular2/core';
import {TabView} from '../../components/tabview/tabview';
import {TabPanel} from '../../components/tabview/tabpanel';

@Component ({
    styles:[`
        .pui-grid {
            margin-bottom: 10px;
        }

        .pui-grid .pui-grid-row div {
            background-color: #cccccc;
            text-align: center;
            border: 1px solid #dddddd;
            padding: 10px 0px;
        }
    `],
    templateUrl: 'app/demo/grid/griddemo.component.html',
    directives: [TabView,TabPanel]
})
export class GridDemoComponent {

}
import {Component} from 'angular2/core';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';

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
    templateUrl: 'app/components/grid/demo/griddemo.component.html',
    directives: [TabViewComponent,TabPanelComponent]]
})
export class GridDemoComponent {

}
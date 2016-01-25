import {Component} from 'angular2/core';
import {PanelComponent} from '../../components/panel/panel.component';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/panel/paneldemo.component.html',
    directives: [PanelComponent,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class PanelDemoComponent {

}
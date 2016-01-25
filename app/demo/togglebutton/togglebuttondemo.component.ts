import {Component} from 'angular2/core';
import {ToggleButtonComponent} from '../../components/togglebutton/togglebutton.component';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/togglebutton/togglebuttondemo.component.html',
    directives: [ToggleButtonComponent, TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class ToggleButtonDemoComponent {
    
    checked1: boolean = false;

    checked2: boolean = true;
}
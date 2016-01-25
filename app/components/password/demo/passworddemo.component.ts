import {Component} from 'angular2/core';
import {PasswordDirective} from '../password.directive';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/components/password/demo/passworddemo.component.html',
    directives: [PasswordDirective,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class PasswordDemoComponent {

}
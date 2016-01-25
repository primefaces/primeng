import {Component} from 'angular2/core';
import {PasswordDirective} from '../../components/password/password.directive';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/password/passworddemo.component.html',
    directives: [PasswordDirective,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class PasswordDemoComponent {

}
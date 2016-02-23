import {Component} from 'angular2/core';
import {Password} from '../../../components/password/password';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/password/passworddemo.html',
    directives: [Password,TabView,TabPanel,pCode,ROUTER_DIRECTIVES]
})
export class PasswordDemo {

}
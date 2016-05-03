import {Component} from '@angular/core';
import {Password} from '../../../components/password/password';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/password/passworddemo.html',
    directives: [Password,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class PasswordDemo {

}
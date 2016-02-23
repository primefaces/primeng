import {Component} from 'angular2/core';
import {Breadcrumb} from '../../../components/breadcrumb/breadcrumb';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/breadcrumb/breadcrumbdemo.html',
    directives: [Breadcrumb,Button,TabPanel,TabView,pCode,ROUTER_DIRECTIVES]
})
export class BreadcrumbDemo {

}
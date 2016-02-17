import {Component} from 'angular2/core';
import {Paginator} from '../../../components/paginator/paginator';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/paginator/paginatordemo.html',
    directives: [Paginator,TabPanel,TabView,Button,ROUTER_DIRECTIVES]
})
export class PaginatorDemo {

}
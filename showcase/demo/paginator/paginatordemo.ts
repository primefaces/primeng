import {Component} from '@angular/core';
import {Paginator} from '../../../components/paginator/paginator';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/paginator/paginatordemo.html',
    directives: [Paginator,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class PaginatorDemo {

}
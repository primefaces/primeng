import {Component,OnInit,EventEmitter} from '@angular/core';
import {Breadcrumb} from '../../../components/breadcrumb/breadcrumb';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {MenuItem} from '../../../components/api/menumodel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/breadcrumb/breadcrumbdemo.html',
    directives: [Breadcrumb,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class BreadcrumbDemo implements OnInit {

    private items: MenuItem[];
    
    ngOnInit() {
        this.items = [];
        this.items.push({label:'Categories'});
        this.items.push({label:'Sports'});
        this.items.push({label:'Football'});
        this.items.push({label:'Countries'});
        this.items.push({label:'Spain'});
        this.items.push({label:'F.C. Barcelona'});
        this.items.push({label:'Squad'});
        this.items.push({label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'});
    }
}
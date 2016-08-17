import {Component,OnInit,EventEmitter} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/breadcrumb/breadcrumbdemo.html'
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
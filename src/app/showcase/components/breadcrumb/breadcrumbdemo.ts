import {Component,OnInit,EventEmitter} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './breadcrumbdemo.html'
})
export class BreadcrumbDemo implements OnInit {

    items: MenuItem[];
    
    home: MenuItem;
    
    ngOnInit() {
        this.items = [
            {label:'Categories'},
            {label:'Sports'},
            {label:'Football'},
            {label:'Countries'},
            {label:'Spain'},
            {label:'F.C. Barcelona'},
            {label:'Squad'},
            {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link'}
        ];
        
        this.home = {icon: 'pi pi-home'};
    }
}
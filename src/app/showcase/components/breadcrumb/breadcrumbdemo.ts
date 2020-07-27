import {Component,OnInit,EventEmitter} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './breadcrumbdemo.html'
})
export class BreadcrumbDemo implements OnInit {

    items: MenuItem[];
    
    home: MenuItem;
    
    ngOnInit() {
        this.items = [
            {label: 'Computer'},
            {label: 'Notebook'},
            {label: 'Accessories'},
            {label: 'Backpacks'},
            {label: 'Item'}
        ];
        
        this.home = {icon: 'pi pi-home', routerLink: '/'};
    }
}
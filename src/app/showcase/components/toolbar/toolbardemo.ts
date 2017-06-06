import {Component,OnInit} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './toolbardemo.html'
})
export class ToolbarDemo implements OnInit {

    items: MenuItem[];
    
    ngOnInit() {
        this.items = [
            {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']}
        ];
    }
}

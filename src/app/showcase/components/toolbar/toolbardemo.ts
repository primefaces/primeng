import {Component,OnInit} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './toolbardemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .ui-splitbutton {
            margin-left: .25em;
        }

        :host ::ng-deep .ui-splitbutton button {
            margin-right: 0;
        }
    `]
})
export class ToolbarDemo implements OnInit {

    items: MenuItem[];
    
    ngOnInit() {
        this.items = [
            {label: 'Angular.io', icon: 'fa fa-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'fa fa-paint-brush', routerLink: ['/theming']}
        ];
    }
}

import {Component,OnInit} from '@angular/core';
import {Message} from '../../../components/common/api';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './splitbuttondemo.html',
    styles: [`
        :host ::ng-deep .ui-splitbutton {
            margin-right: .25em;
        }
    `]
})
export class SplitButtonDemo implements OnInit {

    msgs: Message[] = [];
    
    items: MenuItem[];
    
    ngOnInit() {
        this.items = [
            {label: 'Update', icon: 'fa fa-refresh', command: () => {
                this.update();
            }},
            {label: 'Delete', icon: 'fa fa-close', command: () => {
                this.delete();
            }},
            {label: 'Angular.io', icon: 'fa fa-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'fa fa-paint-brush', routerLink: ['/theming']}
        ];
    }

    save() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Data Saved'});
    }
    
    update() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Data Updated'});
    }
    
    delete() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Data Deleted'});
    }
}

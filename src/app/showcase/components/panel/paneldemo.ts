import {Component,OnInit} from '@angular/core';
import {Message} from '../../../components/common/api';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './paneldemo.html'
})
export class PanelDemo implements OnInit {

    msgs: Message[] = [];
    
    items: MenuItem[];
    
    ngOnInit() {
        this.items = [
            {label: 'Update', icon: 'fa fa-fw fa-refresh', command: () => {
                this.update();
            }},
            {label: 'Delete', icon: 'fa fa-fw fa-close', command: () => {
                this.delete();
            }},
            {label: 'Angular.io', icon: 'fa fa-fw fa-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'fa fa-fw fa-paint-brush', routerLink: ['/theming']}
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
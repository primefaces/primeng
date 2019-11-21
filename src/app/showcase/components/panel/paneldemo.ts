import {Component,OnInit} from '@angular/core';
import {MessageService} from '../../../components/common/messageservice';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './paneldemo.html',
    providers: [MessageService]
})
export class PanelDemo implements OnInit {
    
    items: MenuItem[];
    
    constructor(private messageService: MessageService) {}
    
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
        this.messageService.add({severity:'info', summary:'Success', detail:'Data Saved'});
    }

    update() {
        this.messageService.add({severity:'info', summary:'Success', detail:'Data Updated'});
    }

    delete() {
        this.messageService.add({severity:'info', summary:'Success', detail:'Data Deleted'});
    }
}

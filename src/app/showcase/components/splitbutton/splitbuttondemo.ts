import {Component,OnInit} from '@angular/core';
import {MessageService} from '../../../components/common/messageservice';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './splitbuttondemo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .ui-splitbutton {
            margin-right: .25em;
        }
    `]
})
export class SplitButtonDemo implements OnInit {
    
    items: MenuItem[];
    
    constructor(private messageService: MessageService) {}
    
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
        this.messageService.add({severity:'info', summary:'Success', detail:'Data Saved'});
    }
    
    update() {
        this.messageService.add({severity:'info', summary:'Success', detail:'Data Updated'});
    }
    
    delete() {
        this.messageService.add({severity:'info', summary:'Success', detail:'Data Deleted'});
    }
}

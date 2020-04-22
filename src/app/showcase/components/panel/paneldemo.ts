import {Component,OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './paneldemo.html',
    providers: [MessageService]
})
export class PanelDemo implements OnInit {
    
    items: MenuItem[];
    
    constructor(private messageService: MessageService, private app: AppComponent) {}
    
    ngOnInit() {
        this.items = [
            {label: 'Update', icon: 'pi pi-fw pi-refresh', command: () => {
                this.update();
            }},
            {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => {
                this.delete();
            }},
            {label: 'Angular.io', icon: 'pi pi-fw pi-external-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'pi pi-fw pi-cog', routerLink: ['/theming']}
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

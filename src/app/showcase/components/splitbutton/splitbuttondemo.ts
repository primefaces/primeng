import {Component,OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './splitbuttondemo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .ui-splitbutton {
            margin-right: .25em;
        }

        :host ::ng-deep .ui-toast {
            top: 80px;
        }

        :host ::ng-deep .news-active .ui-toast {
            top: 150px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-toast {
                top: 110px;
            }

            :host ::ng-deep .news-active .ui-toast {
                top: 180px;
            }
        }
    `]
})
export class SplitButtonDemo implements OnInit {
    
    items: MenuItem[];
    
    constructor(private messageService: MessageService, private app: AppComponent) {}
    
    ngOnInit() {
        this.items = [
            {label: 'Update', icon: 'pi pi-refresh', command: () => {
                this.update();
            }},
            {label: 'Delete', icon: 'pi pi-times', command: () => {
                this.delete();
            }},
            {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
            {separator:true},
            {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
        ];
    }

    save(severity: string) {
        this.messageService.add({severity: severity, summary:'Success', detail:'Data Saved'});
    }
    
    update() {
        this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
    }
    
    delete() {
        this.messageService.add({severity:'success', summary:'Success', detail:'Data Deleted'});
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}

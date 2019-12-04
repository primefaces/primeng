import {Component} from '@angular/core';

@Component({
    templateUrl: './sidebardemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
    `]
})
export class SidebarDemo {

    visibleSidebar1;
    
    visibleSidebar2;
    
    visibleSidebar3;
    
    visibleSidebar4;
    
    visibleSidebar5;
}
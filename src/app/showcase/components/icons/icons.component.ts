import {Component} from '@angular/core';

@Component({
    templateUrl: './icons.component.html',
    styles: [`
        .icons-list {
            text-align: center;
        }

        .icons-list i {
            font-size: 2em;
        }

        .icons-list .ui-md-2 {
            padding-bottom: 2em;
        }
    `]
})
export class IconsComponent {

}
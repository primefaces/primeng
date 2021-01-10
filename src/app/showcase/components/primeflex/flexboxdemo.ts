import {Component} from '@angular/core';

@Component({
    templateUrl: './flexboxdemo.html',
    styles:[`
        .p-d-flex > div,
        .box {
            background-color: var(--surface-e);
            text-align: center;
            padding: 1rem;
            border-radius: 4px;
            box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        }
        
        .p-d-flex > div {
            width: 8rem;
        }
    `]
})
export class FlexBoxDemo {}
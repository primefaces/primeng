import {Component} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';

@Component ({
    templateUrl: './griddemo.html',
    styles:[`
        .box {
            background-color: var(--surface-e);
            text-align: center;
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 4px;
            box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        }

        .box-stretched {
            height: 100%;
        }

        .vertical-container {
            margin: 0;
            height: 200px;
            background: var(--surface-d);
            border-radius: 4px;
        }

        .nested-grid .p-col-4 {
            padding-bottom: 1rem;
        }
    `],
    animations: [
        trigger('animation', [
            state('visible', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('void => *', [
                style({transform: 'translateX(50%)', opacity: 0}),
                animate('300ms ease-out')
            ]),
            transition('* => void', [
                animate(('250ms ease-in'), style({
                    height: 0,
                    opacity: 0,
                    transform: 'translateX(50%)'
                }))
            ])
        ])
    ]
})
export class GridDemo {

    columns: number[];

    ngOnInit() {
        this.columns = [0, 1, 2, 3, 4, 5];
    }

    addColumn() {
        this.columns.push(this.columns.length);
    }

    removeColumn() {
        this.columns.splice(-1, 1);
    }
}
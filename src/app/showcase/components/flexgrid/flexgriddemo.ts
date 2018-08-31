import {Component,ViewEncapsulation} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';

@Component ({
    styles:[`
        .p-grid > div {
            background-color: #cce4f7;
            text-align: center;
            padding-top: 1em;
            padding-bottom: 1em;
            border: 1px solid #ffffff;
        }

        .vertical-container {
            height: 200px;
            background: #8e9fac;
        }
    `],
    templateUrl: './flexgriddemo.html',
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
    ],
    encapsulation: ViewEncapsulation.None
})
export class FlexGridDemo {

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
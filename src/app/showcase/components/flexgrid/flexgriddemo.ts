import {Component,ViewEncapsulation} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';

@Component ({
    styles:[`
        .box,
        .sample-layout > div {
            background-color: #cce4f7;
            text-align: center;
            padding-top: 1em;
            padding-bottom: 1em;
            border-radius: 4px;
            color: #333333;
        }

        .box-stretched {
            height: 100%;
        }

        .sample-layout {
            margin: 0;
        }

        .sample-layout > div {
            border: 1px solid #ffffff;
        }

        .vertical-container {
            margin: 0;
            height: 200px;
            background: #efefef;
            border-radius: 4px;
        }

        .nested-grid .p-col-4 {
            padding-bottom: 1em;
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
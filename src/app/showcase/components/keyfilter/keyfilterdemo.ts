import {Component} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';

@Component({
    templateUrl: './keyfilterdemo.html',
    animations: [
        trigger('errorState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
})
export class KeyFilterDemo {

    blockSpecial: RegExp = /^[^<>*#!]+$/
    
    blockSpace: RegExp = /[^\s]/;

    ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;

    cc: string;

}

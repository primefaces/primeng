import {Component} from '@angular/core';

@Component({
    templateUrl: './keyfilterdemo.html'
})
export class KeyFilterDemo {

    blockSpecial: RegExp = /^[^<>#*!]+$/
    
    blockSpace: RegExp = /[^\s]/;

}
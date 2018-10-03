import {NgModule,Directive,ElementRef,HostListener,Input,Output,OnInit,DoCheck,EventEmitter,Optional} from '@angular/core';
import {NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pInputTextarea]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-filled]': 'filled',
        '[attr.rows]': 'rows',
        '[attr.cols]': 'cols'
    }
})
export class InputTextarea implements OnInit, DoCheck {

    @Input() autoResize: boolean;

    @Input() rows: number = 2;

    @Input() cols: number = 20;

    @Output() onResize: EventEmitter<any> = new EventEmitter();

    rowsDefault: number;

    colsDefault: number;

    prevRows: number;

    filled: boolean;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel) {}

    ngOnInit() {
        this.rowsDefault = this.rows;
        this.colsDefault = this.cols;
        this.prevRows = this.rowsDefault;
    }

    ngDoCheck() {
        this.updateFilledState();
    }

    // To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    @HostListener('input', ['$event'])
    onInput(e) {
        this.updateFilledState(e);
    }

    updateFilledState(event?: Event) {
        if ((this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model)) {
            this.filled = true;
        } else {
            this.filled = false;
        }

        if (this.autoResize) {
            this.resize(event);
        }
    }

    resize(event?: Event) {
        let linesCount = 0;
        const lines = this.el.nativeElement.value.split('\n');

        for (let i = lines.length - 1; i >= 0; --i) {
            linesCount += Math.floor((lines[i].length / this.colsDefault) + 1);
        }

        this.rows = (linesCount >= this.rowsDefault) ? linesCount + 1 : this.rowsDefault;
        if (this.prevRows !== this.rows) {
            this.prevRows = this.rows;
            this.onResize.emit(event || {});
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputTextarea],
    declarations: [InputTextarea]
})
export class InputTextareaModule { }

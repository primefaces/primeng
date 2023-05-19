import { NgModule, Directive, ElementRef, HostListener, DoCheck, Optional, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nullable } from 'primeng/ts-helpers';

@Directive({
    selector: '[pInputText]',
    host: {
        class: 'p-inputtext p-component p-element',
        '[class.p-filled]': 'filled'
    }
})
export class InputText implements DoCheck, AfterViewInit {
    filled: Nullable<boolean>;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel, private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.updateFilledState();
        this.cd.detectChanges();
    }

    ngDoCheck() {
        this.updateFilledState();
    }

    @HostListener('input', ['$event'])
    onInput() {
        this.updateFilledState();
    }

    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText]
})
export class InputTextModule {}

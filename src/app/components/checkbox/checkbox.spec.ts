import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Checkbox } from './checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Checkbox', () => {

    let checkbox: Checkbox;
    let fixture: ComponentFixture<Checkbox>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Checkbox
            ]
        });

        fixture = TestBed.createComponent(Checkbox);
        checkbox = fixture.componentInstance;
    });

    it('should check the input on click', () => {
        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(true);
    });
});
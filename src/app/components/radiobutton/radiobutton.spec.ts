import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioButton } from './radiobutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RadioButton', () => {

    let radiobutton: RadioButton;
    let fixture: ComponentFixture<RadioButton>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                RadioButton
            ]
        });

        fixture = TestBed.createComponent(RadioButton);
        radiobutton = fixture.componentInstance;
    });

    it('should display active state initially when checked by default', () => {
        radiobutton.checked = true;
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.ui-radiobutton-box');
        expect(boxEl.class).toContain('ui-state-active');
    });
});

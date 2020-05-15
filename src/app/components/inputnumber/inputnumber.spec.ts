import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InputNumber } from './inputnumber';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('InputNumber', () => {
    let fixture: ComponentFixture<InputNumber>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [
                InputNumber,
            ]
        });

        fixture = fixture = TestBed.createComponent(InputNumber);
    });
});

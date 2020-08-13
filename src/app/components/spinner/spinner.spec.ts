import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Spinner } from './spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Spinner', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Spinner
            ]
        });
    });
});
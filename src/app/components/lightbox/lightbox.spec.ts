import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Lightbox } from './lightbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Lightbox', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
            ],
            declarations: [
                Lightbox
            ]
        });
    });
});

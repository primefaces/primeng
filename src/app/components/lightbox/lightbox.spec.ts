import { TestBed } from '@angular/core/testing';
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

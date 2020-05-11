import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Galleria } from './galleria';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Galleria', () => {

    let galleria: Galleria;
    let fixture: ComponentFixture<Galleria>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Galleria
            ]
        });

        fixture = TestBed.createComponent(Galleria);
        galleria = fixture.componentInstance;
    });

    
});

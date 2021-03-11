import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Password } from './password';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
    template: `<input pPassword type="password"/>`
})
class TestPasswordComponent {
}

describe('Password', () => {

    let password: TestPasswordComponent;
    let fixture: ComponentFixture<TestPasswordComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Password,
                TestPasswordComponent
            ]
        });

        fixture = TestBed.createComponent(TestPasswordComponent);
        password = fixture.componentInstance;
    });
});

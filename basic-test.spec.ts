/**
 * This is a basic test file is to test
 * if your current test tooling works in general.
 */
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

interface MyInterface {
    name: string;
}

@Component({
    template: ``
})
class DummyComponent {}

function p1(): MyInterface {
    return { name: 'p1' };
}

describe('test', () => {
    it('p1', () => {
        expect(p1().name).toBe('p1');
    });

    it('should create dummy component', () => {
        TestBed.configureTestingModule({
            declarations: [DummyComponent]
        }).compileComponents();

        const fixture = TestBed.createComponent(DummyComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});

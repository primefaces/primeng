import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IftaLabel } from './iftalabel';

@Component({
    standalone: true,
    imports: [IftaLabel, FormsModule],
    template: `
        <p-iftalabel>
            <input id="username" [(ngModel)]="value" />
            <label for="username">Username</label>
        </p-iftalabel>
    `
})
class TestBasicIftaLabelComponent {
    value: string = '';
}

@Component({
    standalone: true,
    imports: [IftaLabel, FormsModule],
    template: `
        <p-iftalabel>
            <input id="email" type="email" [(ngModel)]="email" />
            <label for="email">Email Address</label>
        </p-iftalabel>
    `
})
class TestEmailIftaLabelComponent {
    email: string = '';
}

describe('IftaLabel', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicIftaLabelComponent;
        let fixture: ComponentFixture<TestBasicIftaLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicIftaLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicIftaLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render input and label content', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            const labelElement = fixture.debugElement.query(By.css('label'));

            expect(inputElement).toBeTruthy();
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('Username');
            expect(inputElement.nativeElement.id).toBe('username');
        });

        it('should have correct CSS class', () => {
            const iftaLabelElement = fixture.debugElement.query(By.directive(IftaLabel));
            expect(iftaLabelElement.nativeElement.classList.contains('p-iftalabel')).toBe(true);
        });
    });

    describe('Form Integration', () => {
        let component: TestEmailIftaLabelComponent;
        let fixture: ComponentFixture<TestEmailIftaLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestEmailIftaLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestEmailIftaLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work with email input type', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            const labelElement = fixture.debugElement.query(By.css('label'));

            expect(inputElement.nativeElement.type).toBe('email');
            expect(labelElement.nativeElement.textContent.trim()).toBe('Email Address');
        });

        it('should update input value when model changes', fakeAsync(() => {
            component.email = 'test@example.com';
            fixture.detectChanges();
            tick();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('test@example.com');
        }));
    });

    describe('Edge Cases', () => {
        let component: TestBasicIftaLabelComponent;
        let fixture: ComponentFixture<TestBasicIftaLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicIftaLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicIftaLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work without input value', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        });

        it('should handle empty string model', fakeAsync(() => {
            component.value = '';
            fixture.detectChanges();
            tick();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        }));
    });
});

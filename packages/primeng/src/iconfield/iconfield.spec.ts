import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconField } from './iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
    standalone: true,
    imports: [IconField, InputIcon, FormsModule],
    template: `
        <p-iconfield>
            <p-inputicon class="pi pi-search" />
            <input type="text" [(ngModel)]="value" placeholder="Search" />
        </p-iconfield>
    `
})
class TestBasicIconFieldComponent {
    value: string = '';
}

@Component({
    standalone: true,
    imports: [IconField, InputIcon, FormsModule],
    template: `
        <p-iconfield [iconPosition]="position">
            <p-inputicon class="pi pi-user" />
            <input type="text" [(ngModel)]="username" />
        </p-iconfield>
    `
})
class TestPositionIconFieldComponent {
    username: string = '';
    position: 'left' | 'right' = 'left';
}

@Component({
    standalone: true,
    imports: [IconField, InputIcon, FormsModule],
    template: `
        <p-iconfield [styleClass]="customClass">
            <input type="email" [(ngModel)]="email" />
            <p-inputicon class="pi pi-envelope" />
        </p-iconfield>
    `
})
class TestStyledIconFieldComponent {
    email: string = '';
    customClass: string = 'custom-icon-field';
}

describe('IconField', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicIconFieldComponent;
        let fixture: ComponentFixture<TestBasicIconFieldComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicIconFieldComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicIconFieldComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render input and icon content', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            const iconElement = fixture.debugElement.query(By.directive(InputIcon));

            expect(inputElement).toBeTruthy();
            expect(iconElement).toBeTruthy();
            expect(inputElement.nativeElement.placeholder).toBe('Search');
            expect(iconElement.nativeElement.classList.contains('pi-search')).toBe(true);
        });

        it('should have correct CSS class', () => {
            const iconFieldElement = fixture.debugElement.query(By.directive(IconField));
            expect(iconFieldElement.nativeElement.classList.contains('p-iconfield')).toBe(true);
        });
    });

    describe('Icon Position Tests', () => {
        let component: TestPositionIconFieldComponent;
        let fixture: ComponentFixture<TestPositionIconFieldComponent>;
        let iconFieldInstance: IconField;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestPositionIconFieldComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestPositionIconFieldComponent);
            component = fixture.componentInstance;
            iconFieldInstance = fixture.debugElement.query(By.directive(IconField)).componentInstance;
            fixture.detectChanges();
        });

        it('should have default iconPosition "left"', () => {
            expect(iconFieldInstance.iconPosition).toBe('left');
        });

        it('should apply iconPosition "right"', () => {
            component.position = 'right';
            fixture.detectChanges();

            expect(iconFieldInstance.iconPosition).toBe('right');
        });

        it('should have correct position classes', () => {
            const iconFieldElement = fixture.debugElement.query(By.directive(IconField));

            // Test 'left' position (default)
            component.position = 'left';
            fixture.detectChanges();
            expect(iconFieldElement.nativeElement.classList.contains('p-iconfield-left')).toBe(true);

            // Test 'right' position
            component.position = 'right';
            fixture.detectChanges();
            expect(iconFieldElement.nativeElement.classList.contains('p-iconfield-right')).toBe(true);
        });
    });

    describe('Style Class Tests', () => {
        let component: TestStyledIconFieldComponent;
        let fixture: ComponentFixture<TestStyledIconFieldComponent>;
        let iconFieldInstance: IconField;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestStyledIconFieldComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestStyledIconFieldComponent);
            component = fixture.componentInstance;
            iconFieldInstance = fixture.debugElement.query(By.directive(IconField)).componentInstance;
            fixture.detectChanges();
        });

        it('should apply custom styleClass', () => {
            expect(iconFieldInstance.styleClass).toBe('custom-icon-field');

            const iconFieldElement = fixture.debugElement.query(By.directive(IconField));
            expect(iconFieldElement.nativeElement.classList.contains('custom-icon-field')).toBe(true);
        });

        it('should update styleClass dynamically', () => {
            component.customClass = 'new-custom-class';
            fixture.detectChanges();

            expect(iconFieldInstance.styleClass).toBe('new-custom-class');

            const iconFieldElement = fixture.debugElement.query(By.directive(IconField));
            expect(iconFieldElement.nativeElement.classList.contains('new-custom-class')).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        let component: TestBasicIconFieldComponent;
        let fixture: ComponentFixture<TestBasicIconFieldComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicIconFieldComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicIconFieldComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work without input value', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        });

        it('should update input value when model changes', fakeAsync(() => {
            component.value = 'search term';
            fixture.detectChanges();
            tick();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('search term');
        }));

        it('should handle multiple input types', () => {
            // This is tested in the styled component which uses email type
            const styledFixture = TestBed.createComponent(TestStyledIconFieldComponent);
            styledFixture.detectChanges();

            const inputElement = styledFixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.type).toBe('email');
        });
    });
});

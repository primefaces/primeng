import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputGroup } from './inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
    standalone: true,
    imports: [InputGroup, InputGroupAddon, FormsModule],
    template: `
        <p-inputgroup>
            <p-inputgroup-addon>
                <i class="pi pi-user"></i>
            </p-inputgroup-addon>
            <input type="text" [(ngModel)]="username" placeholder="Username" />
        </p-inputgroup>
    `
})
class TestBasicInputGroupComponent {
    username: string = '';
}

@Component({
    standalone: true,
    imports: [InputGroup, InputGroupAddon, FormsModule],
    template: `
        <p-inputgroup [styleClass]="customClass">
            <p-inputgroup-addon>$</p-inputgroup-addon>
            <input type="number" [(ngModel)]="price" placeholder="Price" />
            <p-inputgroup-addon>.00</p-inputgroup-addon>
        </p-inputgroup>
    `
})
class TestStyledInputGroupComponent {
    price: number | null = null as any;
    customClass: string = 'custom-input-group';
}

@Component({
    standalone: true,
    imports: [InputGroup, InputGroupAddon, FormsModule],
    template: `
        <p-inputgroup>
            <p-inputgroup-addon [style]="addonStyle" [styleClass]="addonClass"> www </p-inputgroup-addon>
            <input type="text" [(ngModel)]="website" placeholder="Website" />
        </p-inputgroup>
    `
})
class TestAddonStyledComponent {
    website: string = '';
    addonStyle: { [key: string]: any } = { 'background-color': '#f0f0f0' };
    addonClass: string = 'custom-addon';
}

describe('InputGroup', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicInputGroupComponent;
        let fixture: ComponentFixture<TestBasicInputGroupComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputGroupComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render input and addon content', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            const addonElement = fixture.debugElement.query(By.directive(InputGroupAddon));
            const iconElement = fixture.debugElement.query(By.css('i.pi-user'));

            expect(inputElement).toBeTruthy();
            expect(addonElement).toBeTruthy();
            expect(iconElement).toBeTruthy();
            expect(inputElement.nativeElement.placeholder).toBe('Username');
        });

        it('should have correct CSS classes', () => {
            const inputGroupElement = fixture.debugElement.query(By.directive(InputGroup));
            const addonElement = fixture.debugElement.query(By.directive(InputGroupAddon));

            expect(inputGroupElement.nativeElement.classList.contains('p-inputgroup')).toBe(true);
            expect(addonElement.nativeElement.classList.contains('p-inputgroupaddon')).toBe(true);
        });

        it('should have correct data attributes', () => {
            const inputGroupElement = fixture.debugElement.query(By.directive(InputGroup));
            const addonElement = fixture.debugElement.query(By.directive(InputGroupAddon));

            expect(inputGroupElement.nativeElement.getAttribute('data-pc-name')).toBe('inputgroup');
            expect(addonElement.nativeElement.getAttribute('data-pc-name')).toBe('inputgroupaddon');
        });
    });

    describe('Multiple Addons', () => {
        let component: TestStyledInputGroupComponent;
        let fixture: ComponentFixture<TestStyledInputGroupComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestStyledInputGroupComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestStyledInputGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should render multiple addons', () => {
            const addonElements = fixture.debugElement.queryAll(By.directive(InputGroupAddon));
            const inputElement = fixture.debugElement.query(By.css('input'));

            expect(addonElements.length).toBe(2);
            expect(addonElements[0].nativeElement.textContent.trim()).toBe('$');
            expect(addonElements[1].nativeElement.textContent.trim()).toBe('.00');
            expect(inputElement.nativeElement.type).toBe('number');
        });

        it('should apply custom styleClass to InputGroup', () => {
            const inputGroupInstance = fixture.debugElement.query(By.directive(InputGroup)).componentInstance;
            const inputGroupElement = fixture.debugElement.query(By.directive(InputGroup));

            expect(inputGroupInstance.styleClass).toBe('custom-input-group');
            expect(inputGroupElement.nativeElement.classList.contains('custom-input-group')).toBe(true);
        });

        it('should update styleClass dynamically', () => {
            component.customClass = 'new-custom-class';
            fixture.detectChanges();

            const inputGroupInstance = fixture.debugElement.query(By.directive(InputGroup)).componentInstance;
            const inputGroupElement = fixture.debugElement.query(By.directive(InputGroup));

            expect(inputGroupInstance.styleClass).toBe('new-custom-class');
            expect(inputGroupElement.nativeElement.classList.contains('new-custom-class')).toBe(true);
        });
    });

    describe('Addon Styling', () => {
        let component: TestAddonStyledComponent;
        let fixture: ComponentFixture<TestAddonStyledComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAddonStyledComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAddonStyledComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should apply inline style to addon', () => {
            const addonInstance = fixture.debugElement.query(By.directive(InputGroupAddon)).componentInstance;
            const addonElement = fixture.debugElement.query(By.directive(InputGroupAddon));

            expect(addonInstance.style).toEqual({ 'background-color': '#f0f0f0' });
            expect(addonElement.nativeElement.style.backgroundColor).toBe('rgb(240, 240, 240)');
        });

        it('should apply styleClass to addon', () => {
            const addonInstance = fixture.debugElement.query(By.directive(InputGroupAddon)).componentInstance;
            const addonElement = fixture.debugElement.query(By.directive(InputGroupAddon));

            expect(addonInstance.styleClass).toBe('custom-addon');
            expect(addonElement.nativeElement.classList.contains('custom-addon')).toBe(true);
        });

        it('should update addon styles dynamically', () => {
            component.addonStyle = { color: 'red' };
            component.addonClass = 'updated-addon';
            fixture.detectChanges();

            const addonInstance = fixture.debugElement.query(By.directive(InputGroupAddon)).componentInstance;
            const addonElement = fixture.debugElement.query(By.directive(InputGroupAddon));

            expect(addonInstance.style).toEqual({ color: 'red' });
            expect(addonInstance.styleClass).toBe('updated-addon');
            expect(addonElement.nativeElement.style.color).toBe('red');
            expect(addonElement.nativeElement.classList.contains('updated-addon')).toBe(true);
        });
    });

    describe('Form Integration', () => {
        let component: TestBasicInputGroupComponent;
        let fixture: ComponentFixture<TestBasicInputGroupComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputGroupComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work without input value', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        });

        it('should update input value when model changes', fakeAsync(() => {
            component.username = 'testuser';
            fixture.detectChanges();
            tick();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('testuser');
        }));
    });

    describe('Edge Cases', () => {
        let component: TestBasicInputGroupComponent;
        let fixture: ComponentFixture<TestBasicInputGroupComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputGroupComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should handle empty addon content', () => {
            // Create a component with empty addon
            @Component({
                standalone: true,
                imports: [InputGroup, InputGroupAddon, FormsModule],
                template: `
                    <p-inputgroup>
                        <p-inputgroup-addon></p-inputgroup-addon>
                        <input type="text" [(ngModel)]="value" />
                    </p-inputgroup>
                `
            })
            class TestEmptyAddonComponent {
                value: string = '';
            }

            const emptyFixture = TestBed.createComponent(TestEmptyAddonComponent);
            emptyFixture.detectChanges();

            const addonElement = emptyFixture.debugElement.query(By.directive(InputGroupAddon));
            expect(addonElement).toBeTruthy();
            expect(addonElement.nativeElement.textContent.trim()).toBe('' as any);
        });

        it('should handle undefined styleClass', () => {
            const inputGroupInstance = fixture.debugElement.query(By.directive(InputGroup)).componentInstance;
            inputGroupInstance.styleClass = undefined as any;
            fixture.detectChanges();

            expect(inputGroupInstance.styleClass).toBeUndefined();
        });
    });
});

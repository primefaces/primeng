import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconField } from './iconfield';
import { InputIcon } from 'primeng/inputicon';
import { providePrimeNG } from 'primeng/config';

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
                imports: [TestBasicIconFieldComponent],
                providers: [provideZonelessChangeDetection()]
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
                imports: [TestPositionIconFieldComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestPositionIconFieldComponent);
            component = fixture.componentInstance;
            iconFieldInstance = fixture.debugElement.query(By.directive(IconField)).componentInstance;
            fixture.detectChanges();
        });

        it('should have default iconPosition "left"', () => {
            expect(iconFieldInstance.iconPosition).toBe('left');
        });

        it('should apply iconPosition "right"', async () => {
            component.position = 'right';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(iconFieldInstance.iconPosition).toBe('right');
        });

        it('should have correct position classes', async () => {
            const iconFieldElement = fixture.debugElement.query(By.directive(IconField));

            // Test 'left' position (default)
            component.position = 'left';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(iconFieldElement.nativeElement.classList.contains('p-iconfield-left')).toBe(true);

            // Test 'right' position
            component.position = 'right';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(iconFieldElement.nativeElement.classList.contains('p-iconfield-right')).toBe(true);
        });
    });

    describe('Style Class Tests', () => {
        let component: TestStyledIconFieldComponent;
        let fixture: ComponentFixture<TestStyledIconFieldComponent>;
        let iconFieldInstance: IconField;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestStyledIconFieldComponent],
                providers: [provideZonelessChangeDetection()]
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

        it('should update styleClass dynamically', async () => {
            component.customClass = 'new-custom-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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
                imports: [TestBasicIconFieldComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicIconFieldComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work without input value', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        });

        it('should update input value when model changes', async () => {
            component.value = 'search term';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('search term');
        });

        it('should handle multiple input types', () => {
            // This is tested in the styled component which uses email type
            const styledFixture = TestBed.createComponent(TestStyledIconFieldComponent);
            styledFixture.detectChanges();

            const inputElement = styledFixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.type).toBe('email');
        });
    });
});

describe('IconField PassThrough Tests', () => {
    let fixture: ComponentFixture<IconField>;
    let component: IconField;
    let hostElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconField, FormsModule],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(IconField);
        component = fixture.componentInstance;
        hostElement = fixture.nativeElement;
    });

    describe('PT Case 1: Simple string classes', () => {
        it('should apply simple string class to host', () => {
            fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HOST_CLASS')).toBe(true);
        });

        it('should apply simple string class to root', () => {
            fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
            fixture.detectChanges();

            expect(hostElement.classList.contains('ROOT_CLASS')).toBe(true);
        });
    });

    describe('PT Case 2: Objects with properties', () => {
        it('should apply object with class to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'PT_ROOT_CLASS',
                    style: { color: 'red' },
                    'data-test': 'value'
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('PT_ROOT_CLASS')).toBe(true);
            expect(hostElement.style.color).toBe('red');
            expect(hostElement.getAttribute('data-test')).toBe('value');
        });
    });

    describe('PT Case 3: Instance variables', () => {
        it('should access instance variables in PT function', async () => {
            component.iconPosition = 'right';
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    class: instance?.iconPosition === 'right' ? 'ICON_RIGHT' : ''
                })
            });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(hostElement.classList.contains('ICON_RIGHT')).toBe(true);
        });
    });

    describe('PT Case 4: Event binding', () => {
        it('should handle onclick event through PT', (done) => {
            let clicked = false;
            fixture.componentRef.setInput('pt', {
                root: {
                    onclick: () => {
                        clicked = true;
                        done();
                    }
                }
            });
            fixture.detectChanges();

            hostElement.click();
            expect(clicked).toBe(true);
        });
    });

    describe('PT Case 5: Global PT from PrimeNGConfig', () => {
        it('should apply global PT configuration', async () => {
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [IconField, FormsModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            iconField: {
                                host: { 'aria-label': 'GLOBAL_LABEL' },
                                root: 'GLOBAL_CLASS'
                            }
                        }
                    })
                ]
            }).compileComponents();

            const globalFixture = TestBed.createComponent(IconField);
            globalFixture.detectChanges();

            const globalHostElement = globalFixture.nativeElement;
            expect(globalHostElement.classList.contains('GLOBAL_CLASS')).toBe(true);
            expect(globalHostElement.getAttribute('aria-label')).toBe('GLOBAL_LABEL');
        });
    });

    describe('PT Case 6: Lifecycle hooks', () => {
        it('should support lifecycle hooks', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [IconField, FormsModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            iconField: {
                                hooks: {
                                    onInit: () => {
                                        hooksCalled.push('onInit');
                                    },
                                    onAfterViewChecked: () => {
                                        if (!hooksCalled.includes('onAfterViewChecked')) {
                                            hooksCalled.push('onAfterViewChecked');
                                        }
                                    },
                                    onDestroy: () => {
                                        hooksCalled.push('onDestroy');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(IconField);
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).toContain('onAfterViewChecked');

            hookFixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });
    });
});

// Test components for inline PT tests
@Component({
    standalone: true,
    imports: [IconField, FormsModule],
    template: `<p-iconfield [pt]="{ root: 'INLINE_STRING' }"><input /></p-iconfield>`
})
class TestInlineStringPTComponent {}

@Component({
    standalone: true,
    imports: [IconField, FormsModule],
    template: `
        <p-iconfield><input /></p-iconfield>
        <p-iconfield><input /></p-iconfield>
    `
})
class TestMultipleInstancesComponent {}

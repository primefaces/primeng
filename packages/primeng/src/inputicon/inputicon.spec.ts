import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputIcon } from './inputicon';
import { IconField } from 'primeng/iconfield';
import { InputText } from 'primeng/inputtext';
import { providePrimeNG } from 'primeng/config';

@Component({
    standalone: true,
    imports: [IconField, InputIcon, InputText, FormsModule],
    template: `
        <p-iconfield>
            <p-inputicon class="pi pi-search" />
            <input type="text" pInputText [(ngModel)]="value" placeholder="Search" />
        </p-iconfield>
    `
})
class TestBasicInputIconComponent {
    value: string = '';
}

@Component({
    standalone: true,
    imports: [IconField, InputIcon, InputText, FormsModule],
    template: `
        <p-iconfield>
            <p-inputicon [styleClass]="customClass" class="pi pi-user" />
            <input type="text" pInputText [(ngModel)]="username" />
        </p-iconfield>
    `
})
class TestStyledInputIconComponent {
    username: string = '';
    customClass: string = 'custom-icon';
}

describe('InputIcon', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicInputIconComponent;
        let fixture: ComponentFixture<TestBasicInputIconComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputIconComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputIconComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render icon with correct class', () => {
            const iconElement = fixture.debugElement.query(By.directive(InputIcon));
            expect(iconElement).toBeTruthy();
            expect(iconElement.nativeElement.classList.contains('pi-search')).toBe(true);
        });

        it('should have correct CSS class', () => {
            const iconElement = fixture.debugElement.query(By.directive(InputIcon));
            expect(iconElement.nativeElement.classList.contains('p-inputicon')).toBe(true);
        });
    });

    describe('Style Class Tests', () => {
        let component: TestStyledInputIconComponent;
        let fixture: ComponentFixture<TestStyledInputIconComponent>;
        let inputIconInstance: InputIcon;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestStyledInputIconComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestStyledInputIconComponent);
            component = fixture.componentInstance;
            inputIconInstance = fixture.debugElement.query(By.directive(InputIcon)).componentInstance;
            fixture.detectChanges();
        });

        it('should apply custom styleClass', () => {
            expect(inputIconInstance.styleClass).toBe('custom-icon');

            const iconElement = fixture.debugElement.query(By.directive(InputIcon));
            expect(iconElement.nativeElement.classList.contains('custom-icon')).toBe(true);
        });

        it('should update styleClass dynamically', async () => {
            component.customClass = 'new-icon-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(inputIconInstance.styleClass).toBe('new-icon-class');

            const iconElement = fixture.debugElement.query(By.directive(InputIcon));
            expect(iconElement.nativeElement.classList.contains('new-icon-class')).toBe(true);
        });
    });
});

describe('InputIcon PassThrough Tests', () => {
    let fixture: ComponentFixture<InputIcon>;
    let component: InputIcon;
    let hostElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputIcon, FormsModule],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(InputIcon);
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
        it('should access instance variables in PT function', () => {
            component.styleClass = 'custom-icon';
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    class: instance?.styleClass ? 'HAS_STYLE' : ''
                })
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HAS_STYLE')).toBe(true);
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
                imports: [InputIcon, FormsModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            inputIcon: {
                                host: { 'aria-label': 'GLOBAL_LABEL' },
                                root: 'GLOBAL_CLASS'
                            }
                        }
                    })
                ]
            }).compileComponents();

            const globalFixture = TestBed.createComponent(InputIcon);
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
                imports: [InputIcon, FormsModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            inputIcon: {
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

            const hookFixture = TestBed.createComponent(InputIcon);
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).toContain('onAfterViewChecked');

            hookFixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputGroupAddon } from './inputgroupaddon';
import { providePrimeNG } from 'primeng/config';

@Component({
    standalone: true,
    imports: [InputGroupAddon, FormsModule],
    template: `
        <p-inputgroup-addon>
            <i class="pi pi-user"></i>
        </p-inputgroup-addon>
    `
})
class TestBasicInputGroupAddonComponent {}

@Component({
    standalone: true,
    imports: [InputGroupAddon, FormsModule],
    template: ` <p-inputgroup-addon [style]="addonStyle" [styleClass]="addonClass"> $ </p-inputgroup-addon> `
})
class TestStyledInputGroupAddonComponent {
    addonStyle: { [key: string]: any } = { 'background-color': '#f0f0f0' };
    addonClass: string = 'custom-addon';
}

describe('InputGroupAddon', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicInputGroupAddonComponent;
        let fixture: ComponentFixture<TestBasicInputGroupAddonComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputGroupAddonComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputGroupAddonComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render addon content', () => {
            const addonElement = fixture.debugElement.query(By.directive(InputGroupAddon));
            const iconElement = fixture.debugElement.query(By.css('i.pi-user'));

            expect(addonElement).toBeTruthy();
            expect(iconElement).toBeTruthy();
        });

        it('should have correct CSS class', () => {
            const addonElement = fixture.debugElement.query(By.directive(InputGroupAddon));

            expect(addonElement.nativeElement.classList.contains('p-inputgroupaddon')).toBe(true);
        });
    });

    describe('Styling', () => {
        let component: TestStyledInputGroupAddonComponent;
        let fixture: ComponentFixture<TestStyledInputGroupAddonComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestStyledInputGroupAddonComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestStyledInputGroupAddonComponent);
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
});

describe('InputGroupAddon PassThrough Tests', () => {
    let fixture: ComponentFixture<InputGroupAddon>;
    let component: InputGroupAddon;
    let hostElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputGroupAddon, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(InputGroupAddon);
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
                    style: { 'background-color': 'blue' },
                    'data-testid': 'inputgroupaddon'
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('PT_ROOT_CLASS')).toBe(true);
            expect(hostElement.style.backgroundColor).toBe('blue');
            expect(hostElement.getAttribute('data-testid')).toBe('inputgroupaddon');
        });

        it('should apply object with aria-label to host', () => {
            fixture.componentRef.setInput('pt', {
                host: {
                    'aria-label': 'TEST_ARIA_LABEL'
                }
            });
            fixture.detectChanges();

            expect(hostElement.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
        });
    });

    describe('PT Case 3: Mixed object and string values', () => {
        it('should apply mixed PT values', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'ROOT_CLASS_OBJECT'
                },
                host: 'HOST_CLASS_STRING'
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('ROOT_CLASS_OBJECT')).toBe(true);
            expect(hostElement.classList.contains('HOST_CLASS_STRING')).toBe(true);
        });
    });

    describe('PT Case 4: Instance variables', () => {
        it('should access instance variables in PT function', () => {
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    class: instance ? 'HAS_INSTANCE' : ''
                })
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HAS_INSTANCE')).toBe(true);
        });

        it('should use styleClass from instance in PT function', () => {
            fixture.componentRef.setInput('styleClass', 'custom-class');
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    class: instance?.styleClass ? 'WITH_STYLE' : 'NO_STYLE'
                })
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('WITH_STYLE')).toBe(true);
        });

        it('should use style from instance in PT function', () => {
            fixture.componentRef.setInput('style', { color: 'green' });
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    style: {
                        'background-color': instance?.style?.color === 'green' ? 'yellow' : 'red'
                    }
                })
            });
            fixture.detectChanges();

            expect(hostElement.style.backgroundColor).toBe('yellow');
        });
    });

    describe('PT Case 5: Event binding', () => {
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

    describe('PT Case 6: Global PT from PrimeNGConfig', () => {
        it('should apply global PT configuration', async () => {
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [InputGroupAddon, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            inputGroupAddon: {
                                host: { 'aria-label': 'GLOBAL_LABEL' },
                                root: 'GLOBAL_CLASS'
                            }
                        }
                    })
                ]
            }).compileComponents();

            const globalFixture = TestBed.createComponent(InputGroupAddon);
            globalFixture.detectChanges();

            const globalHostElement = globalFixture.nativeElement;
            expect(globalHostElement.classList.contains('GLOBAL_CLASS')).toBe(true);
            expect(globalHostElement.getAttribute('aria-label')).toBe('GLOBAL_LABEL');
        });
    });

    describe('PT Case 7: Lifecycle hooks', () => {
        it('should support lifecycle hooks', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [InputGroupAddon, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            inputGroupAddon: {
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

            const hookFixture = TestBed.createComponent(InputGroupAddon);
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).toContain('onAfterViewChecked');

            hookFixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });
    });
});

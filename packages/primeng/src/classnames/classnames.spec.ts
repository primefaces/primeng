import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClassNamesModule } from './classnames';

@Component({
    template: `
        <div [pClass]="stringClass" data-testid="string"></div>
        <div [pClass]="arrayClass" data-testid="array"></div>
        <div [pClass]="objectClass" data-testid="object"></div>
        <div [pClass]="mixedClass" data-testid="mixed"></div>
        <div [pClass]="nullClass" data-testid="null"></div>
        <div class="p-2 border border-surface-700" [ngClass]="ngClassExample" [pClass]="[combinedExample, 'string_class']" data-testid="combined"></div>
    `,
    standalone: true,
    imports: [ClassNamesModule, NgClass]
})
class TestComponent {
    stringClass = 'test-class';
    arrayClass = ['class1', 'class2'];
    objectClass = { active: true, disabled: false };
    mixedClass = ['base', { active: true, hidden: false }];
    nullClass = null;

    ngClassExample = {
        rounded: true,
        'bg-green-500': true
    };

    combinedExample = ['text-white', 'font-semibold'];
}

describe('PClass Directive', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply string classes', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="string"]'));
        expect(element.nativeElement.className).toBe('test-class');
    });

    it('should apply array classes', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="array"]'));
        expect(element.nativeElement.className).toBe('class1 class2');
    });

    it('should apply object classes conditionally', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="object"]'));
        expect(element.nativeElement.className).toBe('active');
    });

    it('should apply mixed classes', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="mixed"]'));
        expect(element.nativeElement.className).toBe('base active');
    });

    it('should handle null values', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="null"]'));
        expect(element.nativeElement.className).toBe('');
    });

    it('should update classes when input changes', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="string"]'));

        component.stringClass = 'new-class';
        fixture.detectChanges();

        expect(element.nativeElement.className).toBe('new-class');
    });

    it('should combine static class, ngClass, and pClass correctly', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="combined"]'));
        const classList = element.nativeElement.className.split(' ');

        // Static classes
        expect(classList).toContain('p-2');
        expect(classList).toContain('border');
        expect(classList).toContain('border-surface-700');

        // NgClass classes
        expect(classList).toContain('rounded');
        expect(classList).toContain('bg-green-500');

        // PClass classes
        expect(classList).toContain('text-white');
        expect(classList).toContain('font-semibold');
        expect(classList).toContain('string_class');
    });
});

@Component({
    template: `
        <div [pClass]="conditionalClasses()" data-testid="conditional"></div>
        <div [pClass]="comboClasses()" data-testid="combo"></div>
    `,
    standalone: true,
    imports: [ClassNamesModule]
})
class SignalTestComponent {
    active1 = signal<boolean>(false);
    active2 = signal<boolean>(false);

    conditionalClasses = computed(() => ({
        'p-4 rounded-lg cursor-pointer select-none border': true,
        'bg-primary': this.active1(),
        'text-primary-contrast': this.active1(),
        'border-surface': !this.active1(),
        'border-primary': this.active1()
    }));

    comboClasses = computed(() => [
        'p-4',
        'rounded-lg',
        {
            'bg-purple-700 text-white': this.active2(),
            'bg-purple-100 text-purple-800': !this.active2()
        },
        ['cursor-pointer select-none border']
    ]);

    toggle1() {
        this.active1.update((value) => !value);
    }

    toggle2() {
        this.active2.update((value) => !value);
    }
}

describe('PClass Directive with Signals', () => {
    let component: SignalTestComponent;
    let fixture: ComponentFixture<SignalTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignalTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SignalTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create signal test component', () => {
        expect(component).toBeTruthy();
    });

    describe('Conditional Classes with Signals', () => {
        it('should apply initial conditional classes when signal is false', () => {
            const element = fixture.debugElement.query(By.css('[data-testid="conditional"]'));
            const classList = element.nativeElement.className.split(' ');

            expect(classList).toContain('p-4');
            expect(classList).toContain('rounded-lg');
            expect(classList).toContain('cursor-pointer');
            expect(classList).toContain('select-none');
            expect(classList).toContain('border');
            expect(classList).toContain('border-surface');
            expect(classList).not.toContain('bg-primary');
            expect(classList).not.toContain('text-primary-contrast');
            expect(classList).not.toContain('border-primary');
        });

        it('should update classes when signal changes to true', () => {
            const element = fixture.debugElement.query(By.css('[data-testid="conditional"]'));

            component.toggle1();
            fixture.detectChanges();

            const classList = element.nativeElement.className.split(' ');

            expect(classList).toContain('p-4');
            expect(classList).toContain('rounded-lg');
            expect(classList).toContain('cursor-pointer');
            expect(classList).toContain('select-none');
            expect(classList).toContain('border');
            expect(classList).toContain('bg-primary');
            expect(classList).toContain('text-primary-contrast');
            expect(classList).toContain('border-primary');
            expect(classList).not.toContain('border-surface');
        });

        it('should toggle classes multiple times', () => {
            const element = fixture.debugElement.query(By.css('[data-testid="conditional"]'));

            // Toggle to true
            component.toggle1();
            fixture.detectChanges();
            expect(element.nativeElement.className).toContain('bg-primary');

            // Toggle back to false
            component.toggle1();
            fixture.detectChanges();
            expect(element.nativeElement.className).toContain('border-surface');
            expect(element.nativeElement.className).not.toContain('bg-primary');
        });
    });

    describe('Combination Classes with Signals', () => {
        it('should apply initial combo classes when signal is false', () => {
            const element = fixture.debugElement.query(By.css('[data-testid="combo"]'));
            const classList = element.nativeElement.className.split(' ');

            expect(classList).toContain('p-4');
            expect(classList).toContain('rounded-lg');
            expect(classList).toContain('bg-purple-100');
            expect(classList).toContain('text-purple-800');
            expect(classList).toContain('cursor-pointer');
            expect(classList).toContain('select-none');
            expect(classList).toContain('border');
            expect(classList).not.toContain('bg-purple-700');
            expect(classList).not.toContain('text-white');
        });

        it('should update combo classes when signal changes to true', () => {
            const element = fixture.debugElement.query(By.css('[data-testid="combo"]'));

            component.toggle2();
            fixture.detectChanges();

            const classList = element.nativeElement.className.split(' ');

            expect(classList).toContain('p-4');
            expect(classList).toContain('rounded-lg');
            expect(classList).toContain('bg-purple-700');
            expect(classList).toContain('text-white');
            expect(classList).toContain('cursor-pointer');
            expect(classList).toContain('select-none');
            expect(classList).toContain('border');
            expect(classList).not.toContain('bg-purple-100');
            expect(classList).not.toContain('text-purple-800');
        });

        it('should handle nested arrays in combo classes', () => {
            const element = fixture.debugElement.query(By.css('[data-testid="combo"]'));
            const classList = element.nativeElement.className.split(' ');

            // Nested array classes should always be applied
            expect(classList).toContain('cursor-pointer');
            expect(classList).toContain('select-none');
            expect(classList).toContain('border');
        });

        it('should toggle combo classes multiple times', () => {
            const element = fixture.debugElement.query(By.css('[data-testid="combo"]'));

            // Toggle to true
            component.toggle2();
            fixture.detectChanges();
            expect(element.nativeElement.className).toContain('bg-purple-700');
            expect(element.nativeElement.className).toContain('text-white');

            // Toggle back to false
            component.toggle2();
            fixture.detectChanges();
            expect(element.nativeElement.className).toContain('bg-purple-100');
            expect(element.nativeElement.className).toContain('text-purple-800');

            // Toggle again to true
            component.toggle2();
            fixture.detectChanges();
            expect(element.nativeElement.className).toContain('bg-purple-700');
            expect(element.nativeElement.className).not.toContain('bg-purple-100');
        });
    });

    describe('Both Signals Together', () => {
        it('should handle independent signal updates', () => {
            const conditionalEl = fixture.debugElement.query(By.css('[data-testid="conditional"]'));
            const comboEl = fixture.debugElement.query(By.css('[data-testid="combo"]'));

            // Toggle first signal
            component.toggle1();
            fixture.detectChanges();
            expect(conditionalEl.nativeElement.className).toContain('bg-primary');
            expect(comboEl.nativeElement.className).toContain('bg-purple-100');

            // Toggle second signal
            component.toggle2();
            fixture.detectChanges();
            expect(conditionalEl.nativeElement.className).toContain('bg-primary');
            expect(comboEl.nativeElement.className).toContain('bg-purple-700');

            // Toggle both back
            component.toggle1();
            component.toggle2();
            fixture.detectChanges();
            expect(conditionalEl.nativeElement.className).toContain('border-surface');
            expect(comboEl.nativeElement.className).toContain('bg-purple-100');
        });
    });
});

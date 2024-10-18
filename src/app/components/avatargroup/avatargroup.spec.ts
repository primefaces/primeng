import { Component, ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AvatarGroup, AvatarGroupModule } from './avatargroup';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    template: `
        <p-avatar-group>
            <span class="projected-content">Content</span>
        </p-avatar-group>
    `,
    standalone: true,
    imports: [AvatarGroupModule],
})
class TestHostComponent {}

describe('AvatarGroup', () => {
    let avatarGroup: AvatarGroup;
    let fixture: ComponentFixture<AvatarGroup>;
    let fixtureTest: ComponentFixture<TestHostComponent>;
    let avatarGroupRef: ComponentRef<AvatarGroup>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, AvatarGroupModule, TestHostComponent],
        });

        fixture = TestBed.createComponent(AvatarGroup);
        fixtureTest = TestBed.createComponent(TestHostComponent);
        avatarGroup = fixture.componentInstance;
        avatarGroupRef = fixture.componentRef;
    });

    it('should display by default', () => {
        expect(avatarGroup).toBeTruthy();
        fixture.detectChanges();

        expect(fixture.nativeElement).toBeTruthy();
        expect(fixture.nativeElement.classList).toContain('p-avatar-group');
        expect(fixture.nativeElement.classList).toContain('p-component');
    });

    it('should apply custom styleClass', () => {
        avatarGroupRef.setInput('styleClass', 'custom-class');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('custom-class');
    });

    it('should apply custom inline styles', () => {
        avatarGroupRef.setInput('style', { backgroundColor: 'blue', padding: '10px' });
        fixture.detectChanges();

        expect(fixture.nativeElement.style.backgroundColor).toBe('blue');
        expect(fixture.nativeElement.style.padding).toBe('10px');
    });

    it('should project content inside AvatarGroup', () => {
        fixtureTest.detectChanges();

        const contentElement = fixtureTest.nativeElement.querySelector('.projected-content');
        expect(contentElement).toBeTruthy();
        expect(contentElement.textContent).toBe('Content');
    });

    it('should dynamically update styleClass', () => {
        avatarGroupRef.setInput('styleClass', 'initial-class');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('initial-class');

        avatarGroupRef.setInput('styleClass', 'updated-class');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).not.toContain('initial-class');
        expect(fixture.nativeElement.classList).toContain('updated-class');
    });

    it('should dynamically update inline styles', () => {
        avatarGroupRef.setInput('style', { color: 'red' });
        fixture.detectChanges();

        expect(fixture.nativeElement.style.color).toBe('red');

        avatarGroupRef.setInput('style', { color: 'green' });
        fixture.detectChanges();

        expect(fixture.nativeElement.style.color).toBe('green');
    });
});

import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Avatar, AvatarModule } from './avatar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('Avatar', () => {
    let avatar: Avatar;
    let fixture: ComponentFixture<Avatar>;
    let avatarRef: ComponentRef<Avatar>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, AvatarModule],
        });

        fixture = TestBed.createComponent(Avatar);
        avatar = fixture.componentInstance;
        avatarRef = fixture.componentRef;
    });

    it('should create the component', () => {
        expect(avatar).toBeTruthy();
    });

    it('should render an empty avatar when no inputs are provided', () => {
        fixture.detectChanges();

        const avatarHostElement = fixture.nativeElement;
        // Check that the host element has the 'p-avatar' class, even without content
        expect(avatarHostElement.classList).toContain('p-avatar');

        const labelElement = fixture.debugElement.query(By.css('.p-avatar-text'));
        const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
        const imageElement = fixture.debugElement.query(By.css('img'));
        expect(labelElement).toBeNull();
        expect(iconElement).toBeNull();
        expect(imageElement).toBeNull();
    });

    it('should display label when label input is provided', () => {
        avatarRef.setInput('label', 'AB');
        fixture.detectChanges();

        const labelElement = fixture.debugElement.query(By.css('.p-avatar-text'));
        expect(labelElement.nativeElement.textContent).toBe('AB');
    });

    it('should display icon when icon input is provided', () => {
        avatarRef.setInput('icon', 'pi-user');
        fixture.detectChanges();

        const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
        expect(iconElement).toBeTruthy();
        expect(iconElement.nativeElement.classList).toContain('pi-user');
    });

    it('should display image when image input is provided', () => {
        const imageUrl = 'https://placehold.co/600x400';
        avatarRef.setInput('image', imageUrl);
        fixture.detectChanges();

        const imageElement = fixture.debugElement.query(By.css('img'));
        expect(imageElement.nativeElement.src).toContain(imageUrl);
    });

    it('should emit event when image fails to load', () => {
        spyOn(avatar.onImageError, 'emit');
        const imageUrl = 'invalid-url';
        avatarRef.setInput('image', imageUrl);
        fixture.detectChanges();

        const imageElement = fixture.debugElement.query(By.css('img'));
        imageElement.triggerEventHandler('error', new Event('error'));
        expect(avatar.onImageError.emit).toHaveBeenCalled();
    });

    it('should apply circle shape class when shape is circle', () => {
        avatarRef.setInput('shape', 'circle');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-avatar-circle');
    });

    it('should apply correct size class when size is large or xlarge', () => {
        avatarRef.setInput('size', 'large');
        fixture.detectChanges();


        expect(fixture.nativeElement.classList).toContain('p-avatar-lg');

        avatarRef.setInput('size', 'xlarge');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-avatar-xl');
    });

    it('should apply custom inline style', () => {
        const customStyle = { backgroundColor: 'red' };
        avatarRef.setInput('style', customStyle);
        fixture.detectChanges();

        expect(fixture.nativeElement.style.backgroundColor).toBe('red');
    });

    it('should set aria-label attribute for accessibility', () => {
        const ariaLabel = 'User avatar';
        avatarRef.setInput('ariaLabel', ariaLabel);
        fixture.detectChanges();

        expect(fixture.nativeElement.getAttribute('aria-label')).toBe(ariaLabel);
    });

    it('should apply custom styleClass to host element', () => {
        avatarRef.setInput('styleClass', 'custom-avatar-class');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('custom-avatar-class');
    });

    it('should set aria-labelledby attribute when ariaLabelledBy input is provided', () => {
        avatarRef.setInput('ariaLabelledBy', 'labelId');
        fixture.detectChanges();

        expect(fixture.nativeElement.getAttribute('aria-labelledby')).toBe('labelId');
    });

    it('should use default prop values when no values are set', () => {
        fixture.detectChanges();

        expect(avatar.size()).toBe('normal');
        expect(avatar.shape()).toBe('square');
    });

});

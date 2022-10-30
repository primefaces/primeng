import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Tag, TagModule } from './tag';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Tag', () => {
    let tag: Tag;
    let fixture: ComponentFixture<Tag>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TagModule]
        });

        fixture = TestBed.createComponent(Tag);
        tag = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const tagEl = fixture.debugElement.query(By.css('.p-tag'));
        expect(tagEl.nativeElement).toBeTruthy();
    });
});

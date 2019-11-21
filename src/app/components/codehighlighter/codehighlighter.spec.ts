import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CodeHighlighter } from './codehighlighter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
  template: `
  <pre>
    <code  pCode ngNonBindable class="language-css">
    .ui-table table &#123;
        border-collapse:collapse;
        width: 100%;
        table-layout: fixed;
    &#125;
    </code>
  </pre>`
})
class TestCodeHighlighterComponent {
}

describe('CodeHighlighter', () => {
  
    let codehighlighter: CodeHighlighter;
    let fixture: ComponentFixture<TestCodeHighlighterComponent>;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        NoopAnimationsModule
        ],
        declarations: [
        CodeHighlighter,
        TestCodeHighlighterComponent
        ]
    });

    fixture = TestBed.createComponent(TestCodeHighlighterComponent);
    codehighlighter = fixture.debugElement.children[0].componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();
  
        const codeEl = fixture.debugElement.query(By.css('code'));
        expect(codeEl.nativeElement).toBeTruthy();
      });
});

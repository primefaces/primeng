import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Editor } from './editor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Editor', () => {
  
    let editor: Editor;
    let fixture: ComponentFixture<Editor>;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        NoopAnimationsModule
        ],
        declarations: [
        Editor
        ]
    });

    fixture = TestBed.createComponent(Editor);
    editor = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const editorEl = fixture.debugElement.query(By.css('.p-editor-container'));
        expect(editorEl.nativeElement).toBeTruthy();
    });

    it('should show value', () => {
        editor.value = "V";
        fixture.detectChanges();
        
        fixture.detectChanges();

        const paragraphEl = fixture.debugElement.query(By.css('.p-editor-content')).nativeElement.children[0].children[0];
        expect(paragraphEl.textContent).toEqual("V");
    });

    it('should call quill paste event and setText event', () => {
        fixture.detectChanges();
        
        const quillPasteSpy = spyOn(editor.quill,"pasteHTML").and.callThrough();
        const setTextSpy = spyOn(editor.quill,"setText").and.callThrough();
        editor.writeValue("V");
        fixture.detectChanges();

        const paragraphEl = fixture.debugElement.query(By.css('.p-editor-content')).nativeElement.children[0].children[0];
        expect(paragraphEl.textContent).toEqual("V");
        expect(quillPasteSpy).toHaveBeenCalled();
        editor.writeValue("");
        fixture.detectChanges();

        expect(setTextSpy).toHaveBeenCalled();
    });

    it('should call enable and disable', () => {
        fixture.detectChanges();
        
        const disableSpy = spyOn(editor.quill,"disable").and.callThrough();
        const enableSpy = spyOn(editor.quill,"enable").and.callThrough();
        editor.readonly = true;
        fixture.detectChanges();

        editor.readonly = false;
        fixture.detectChanges();

        expect(disableSpy).toHaveBeenCalled();
        expect(enableSpy).toHaveBeenCalled();
    });

    it('should get quill', () => {
        fixture.detectChanges();
        
        const quill = editor.getQuill();
        expect(quill.container.className).toContain("p-editor-content");
    });
});

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUpload } from './fileupload';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarModule} from '../progressbar/progressbar';
import { ButtonModule } from '../button/button';
import { PrimeTemplate} from '../common/shared';
import { MessagesModule } from '../messages/messages';
import { HttpClientModule } from '@angular/common/http';

describe('FileUpload', () => {

    let fileupload: FileUpload;
    let fixture: ComponentFixture<FileUpload>;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        NoopAnimationsModule,
        ProgressBarModule,
        MessagesModule,
        ButtonModule,
        HttpClientModule
        ],
        declarations: [
        FileUpload,
        PrimeTemplate,
        ]
    });

    fixture = TestBed.createComponent(FileUpload);
    fileupload = fixture.componentInstance;
    });

    it('should display by default (basic)', () => {
        fileupload.mode = "basic";
        fixture.detectChanges();

        const fileuploadEl = fixture.debugElement.query(By.css('span'));
        expect(fileuploadEl).toBeTruthy();
        expect(fileuploadEl.nativeElement.className).toContain("ui-fileupload-choose");
        expect(fileuploadEl.nativeElement.className).toContain("ui-button");
        expect(fixture.debugElement.query(By.css('div'))).toBeFalsy();
    });

    it('should display by default (advanced)', () => {
        fixture.detectChanges();

        const fileuploadEl = fixture.debugElement.query(By.css('div'));
        expect(fileuploadEl).toBeTruthy();
        expect(fileuploadEl.nativeElement.className).toContain("ui-fileupload ui-widget");
        expect(fileuploadEl.children.length).toEqual(2);
    });

    it('should change style, styleClass, chooseLabel, uploadLabel, cancelLabel, showUploadButton and showCancelButton (advanced)', () => {
        fileupload.style = {'primeng': 'rocks!'};
        fileupload.styleClass = "Primeng ROCKS!";
        fileupload.chooseLabel = "primeng";
        fileupload.uploadLabel = "primeng";
        fileupload.cancelLabel = "primeng";
        fixture.detectChanges();

        const fileuploadEl = fixture.debugElement.query(By.css('div'));
        const uploadButton = fixture.debugElement.queryAll(By.css('button'))[0];
        const cancelButton = fixture.debugElement.queryAll(By.css('button'))[1];
        const chooseButton =fixture.debugElement.query(By.css(".ui-fileupload-choose"));
        expect(fileuploadEl).toBeTruthy();
        expect(fileuploadEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(fileuploadEl.nativeElement.style.primeng).toContain("rocks!");
        expect(uploadButton).toBeTruthy();
        expect(cancelButton).toBeTruthy();
        expect(uploadButton.nativeElement.textContent).toEqual("primeng");
        expect(cancelButton.nativeElement.textContent).toEqual("primeng");
        expect(chooseButton.nativeElement.textContent).toEqual("primeng");
    });

    it('should call onFileSelect (advanced)', () => {
        fixture.detectChanges();

        let event;
        event = {
            'target':{files: [{
                'lastModified':1533276674178,
                'name': 'primeng.txt',
                'size': 179,
                'type': "text/plain"
            }]}
        }
        fileupload.onFileSelect(event);
        fixture.detectChanges();

        const uploadButton = fixture.debugElement.queryAll(By.css('button'))[0];
        const cancelButton = fixture.debugElement.queryAll(By.css('button'))[1];
        const fileUploadRow = fixture.debugElement.query(By.css('.ui-fileupload-row'));
        const fileNameEl = fileUploadRow.children[1];
        const fileSizeEl = fileUploadRow.children[2];
        const removeButtonEl = fileUploadRow.query(By.css('button'));
        expect(fileUploadRow).toBeTruthy();
        expect(fileNameEl).toBeTruthy();
        expect(fileNameEl).toBeTruthy();
        expect(removeButtonEl).toBeTruthy();
        expect(fileNameEl.nativeElement.textContent).toEqual('primeng.txt');
        expect(fileSizeEl.nativeElement.textContent).toEqual('179 B');
        expect(fileupload.hasFiles()).toEqual(true);
        expect(uploadButton.nativeElement.disabled).toEqual(false);
        expect(cancelButton.nativeElement.disabled).toEqual(false);
    });

    it('should call upload (advanced)', () => {
        fileupload.auto = true;
        fileupload.url = " ";
        fixture.detectChanges();

        let event;
        event = {
            'target':{files: [{
                'lastModified':1533276674178,
                'name': 'primeng.txt',
                'size': 179,
                'type': "text/plain"
            }]}
        }
        const uploadSpy = spyOn(fileupload,"upload").and.callThrough();
        fileupload.onFileSelect(event);
        fixture.detectChanges();

        expect(uploadSpy).toHaveBeenCalled();
    });

    it('should call upload with customUpload (advanced)', () => {
        fileupload.auto = true;
        fileupload.customUpload = true;
        fileupload.url = " ";
        let data;
        fileupload.uploadHandler.subscribe(value => data = value);
        fixture.detectChanges();

        let event;
        event = {
            'target':{files: [{
                'lastModified':1533276674178,
                'name': 'primeng.txt',
                'size': 179,
                'type': "text/plain"
            }]}
        }
        const uploadSpy = spyOn(fileupload,"upload").and.callThrough();
        fileupload.onFileSelect(event);
        fixture.detectChanges();
        expect(uploadSpy).toHaveBeenCalled();
        expect(data.files).toEqual(event.target.files)
    });

    it('should call onDrageEnter onDragLeave onDrop and onFileSelect (advanced)', () => {
        fileupload.customUpload = true;
        fileupload.url = " ";
        fileupload.multiple = true;
        fixture.detectChanges();

        let event;
        event = {
            'target':{files: [{
                'lastModified':1533276674178,
                'name': 'primeng.txt',
                'size': 179,
                'type': "text/plain"
            }]},
            stopPropagation(){},
            preventDefault(){}
        };
        let event2;
        event2 = {
            'target':{files: [{
                'lastModified':1533276684178,
                'name': 'prime.txt',
                'size': 179,
                'type': "text/plain"
            }]},
            stopPropagation(){},
            preventDefault(){}
        };
        fileupload.onFileSelect(event);
        fixture.detectChanges();
        const onDragEnterSpy = spyOn(fileupload,"onDragEnter").and.callThrough();
        const onDragLeaveSpy = spyOn(fileupload,"onDragLeave").and.callThrough();
        const onDropSpy = spyOn(fileupload,"onDrop").and.callThrough();
        const onFileSelectSpy = spyOn(fileupload,"onFileSelect").and.callThrough();
        fileupload.onDragEnter(event);
        fileupload.onDragOver(event);
        fixture.detectChanges();

        const contentEl = fixture.debugElement.query(By.css(".ui-fileupload-content"));
        expect(fileupload.dragHighlight).toEqual(true);
        expect(contentEl.nativeElement.className).toContain("ui-fileupload-highlight");
        expect(onDragEnterSpy).toHaveBeenCalled();
        fileupload.onDragLeave(event);
        fixture.detectChanges();

        expect(onDragLeaveSpy).toHaveBeenCalled();
        expect(contentEl.nativeElement.className).not.toContain("ui-fileupload-highlight");
        fileupload.onDrop(event2);
        fixture.detectChanges();

        expect(onDropSpy).toHaveBeenCalled();
        expect(onFileSelectSpy).toHaveBeenCalled();
        expect(fileupload.files.length).toEqual(2);
    });

    it('should call clear and remove (advanced)', () => {
        fileupload.customUpload = true;
        fileupload.url = " ";
        fileupload.multiple = true;
        fixture.detectChanges();

        let event;
        event = {
            'target':{files: [{
                'lastModified':1533276674178,
                'name': 'primeng.txt',
                'size': 179,
                'type': "text/plain"
            }]},
            stopPropagation(){},
            preventDefault(){}
        };
        let event2;
        event2 = {
            'target':{files: [{
                'lastModified':1533276684178,
                'name': 'prime.txt',
                'size': 179,
                'type': "text/plain"
            }]},
            stopPropagation(){},
            preventDefault(){}
        };
        const removeSpy = spyOn(fileupload,"remove").and.callThrough();
        const clearSpy = spyOn(fileupload,"clear").and.callThrough();
        fileupload.onFileSelect(event);
        fileupload.onFileSelect(event2);
        fixture.detectChanges();

        const buttons = fixture.debugElement.queryAll(By.css("button"));
        const firstElRemoveButton = buttons[2];
        firstElRemoveButton.nativeElement.click();
        fixture.detectChanges();

        expect(fileupload.files.length).toEqual(1);
        expect(removeSpy).toHaveBeenCalled();
        fileupload.onFileSelect(event);
        fixture.detectChanges();

        const clearButton = buttons[1];
        clearButton.nativeElement.click();
        fixture.detectChanges();

        expect(fileupload.files.length).toEqual(0);
        expect(clearSpy).toHaveBeenCalled();
    });

    it('should display by default (basic)', () => {
        fileupload.mode = "basic";
        fileupload.url = " ";
        fixture.detectChanges();
        let event;
        event = {
            'target':{files: [{
                'lastModified':1533276674178,
                'name': 'primeng.txt',
                'size': 179,
                'type': "text/plain"
            }]},
            stopPropagation(){},
            preventDefault(){}
        };
        const uploadSpy = spyOn(fileupload,"upload").and.callThrough();
        const onSimpleUploaderClickSpy = spyOn(fileupload,"onSimpleUploaderClick").and.callThrough();
        fileupload.onFileSelect(event);
        fixture.detectChanges();

        fileupload.onSimpleUploaderClick(event);
        fixture.detectChanges();

        expect(uploadSpy).toHaveBeenCalled();
        expect(onSimpleUploaderClickSpy).toHaveBeenCalled();
    });

    it('should accept all of multiple given MIME types', () => {
      const mockFile1 = {type: "application/pdf", name: "test.pdf"}
      const mockFile2 = {type: "image/png", name: "test.png"}

      fileupload.accept = "application/pdf, image/png"
      expect((fileupload as any).isFileTypeValid(mockFile1)).toBe(true);
      expect((fileupload as any).isFileTypeValid(mockFile2)).toBe(true);
    });

    it('should handle wildcards in MIME subtypes', () => {
      const mockFile1 = {type: "application/pdf", name: "test.pdf"}
      const mockFile2 = {type: "image/png", name: "test.png"}

      fileupload.accept = "image/*"
      expect((fileupload as any).isFileTypeValid(mockFile1)).toBe(false)
      expect((fileupload as any).isFileTypeValid(mockFile2)).toBe(true);
    });
});

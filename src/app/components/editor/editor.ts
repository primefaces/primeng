import {NgModule,Component,ElementRef,AfterViewInit,Input,Output,EventEmitter,ContentChild,forwardRef,ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, QueryList, AfterContentInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule,Header, PrimeTemplate} from 'primeng/api'
import {DomHandler} from 'primeng/dom';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import * as Quill from "quill";

export const EDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Editor),
  multi: true
};

@Component({
    selector: 'p-editor',
    template: `
        <div [ngClass]="'p-editor-container'" [class]="styleClass">
            <div class="p-editor-toolbar" *ngIf="toolbar || toolbarTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div class="p-editor-toolbar" *ngIf="!toolbar && !toolbarTemplate">
                <span class="ql-formats">
                    <select class="ql-header">
                      <option value="1">Heading</option>
                      <option value="2">Subheading</option>
                      <option selected>Normal</option>
                    </select>
                    <select class="ql-font">
                      <option selected>Sans Serif</option>
                      <option value="serif">Serif</option>
                      <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold" type="button"></button>
                    <button class="ql-italic" aria-label="Italic" type="button"></button>
                    <button class="ql-underline" aria-label="Underline" type="button"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered" aria-label="Ordered List" type="button"></button>
                    <button class="ql-list" value="bullet" aria-label="Unordered List" type="button"></button>
                    <select class="ql-align">
                        <option selected></option>
                        <option value="center"></option>
                        <option value="right"></option>
                        <option value="justify"></option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link" aria-label="Insert Link" type="button"></button>
                    <button class="ql-image" aria-label="Insert Image" type="button"></button>
                    <button class="ql-code-block" aria-label="Insert Code Block" type="button"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean" aria-label="Remove Styles" type="button"></button>
                </span>
            </div>
            <div class="p-editor-content" [ngStyle]="style"></div>
        </div>
    `,
    providers: [EDITOR_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class Editor implements AfterViewInit,AfterContentInit,ControlValueAccessor {
        
    @Output() onTextChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(Header) toolbar;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() placeholder: string;
    
    @Input() formats: string[];

    @Input() modules: any;

    @Input() bounds: any;

    @Input() scrollingContainer: any;

    @Input() debug: string;
    
    @Output() onInit: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    value: string;
    
    _readonly: boolean;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    quill: any;

    toolbarTemplate: TemplateRef<any>;
    
    constructor(public el: ElementRef) {}

    ngAfterViewInit() {
        let editorElement = DomHandler.findSingle(this.el.nativeElement ,'div.p-editor-content'); 
        let toolbarElement = DomHandler.findSingle(this.el.nativeElement ,'div.p-editor-toolbar'); 
        let defaultModule  = {toolbar: toolbarElement};
        let modules = this.modules ? {...defaultModule, ...this.modules} : defaultModule;

        this.quill = new Quill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });
                
        if (this.value) {
            this.quill.pasteHTML(this.value);
        }
        
        this.quill.on('text-change', (delta, oldContents, source) => {
            if (source === 'user') {
                let html = editorElement.children[0].innerHTML;
                let text = this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }

                this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                
                this.onModelChange(html);
                this.onModelTouched();
            }
        });
        
        this.quill.on('selection-change', (range, oldRange, source) => {
            this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        
        this.onInit.emit({
            editor: this.quill
        });
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'toolbar':
                    this.toolbarTemplate = item.template;
                break;
            }
        });
    }
        
    writeValue(value: any) : void {
        this.value = value;
                
        if (this.quill) {
            if (value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    getQuill() {
        return this.quill;
    }
    
    @Input() get readonly(): boolean {
        return this._readonly;
    }

    set readonly(val:boolean) {
        this._readonly = val;
        
        if (this.quill) {
            if (this._readonly)
                this.quill.disable();
            else
                this.quill.enable();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Editor,SharedModule],
    declarations: [Editor]
})
export class EditorModule { }

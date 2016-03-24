import {Component,ElementRef,AfterViewInit,Input,Output,EventEmitter} from 'angular2/core';
import {DomHandler} from '../dom/domhandler';

declare var Quill: any;

@Component({
    selector: 'p-editor',
    template: `
        <div class="ui-widget ui-editor-container ui-widget-content ui-corner-all">
            <div class="ui-editor-toolbar ui-widget-header ui-corner-top" style="border:0 none">
              <button class="ql-bold">Bold</button>
              <button class="ql-italic">Italic</button>
            </div>
            <div class="ui-editor-content">
              <p>Hello World!</p>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Editor implements AfterViewInit {

    @Input() value: any;
    
    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    quill: any;
    
    constructor(private el: ElementRef, private domHandler: DomHandler) {}

    ngAfterViewInit() {
        let editorElement = this.domHandler.findSingle(this.el.nativeElement ,'div.ui-editor-content'); 
        let toolbarElement = this.domHandler.findSingle(this.el.nativeElement ,'div.ui-editor-toolbar'); 
        
        this.quill = new Quill(editorElement, {
          modules: {toolbar: toolbarElement},
          theme: 'snow'
        });
        
        this.quill.on('text-change', (delta, source) => {
            this.valueChange.next(this.quill.getHTML());
        });
    }
}
import { CommonModule, isPlatformServer } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, forwardRef, inject, InjectionToken, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { findSingle } from '@primeuix/utils';
import { Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { Nullable } from 'primeng/ts-helpers';
import { EditorBlurEvent, EditorChangeEvent, EditorFocusEvent, EditorInitEvent, EditorPassThrough, EditorSelectionChangeEvent, EditorTextChangeEvent } from 'primeng/types/editor';
import { EditorStyle } from './style/editorstyle';

const EDITOR_INSTANCE = new InjectionToken<Editor>('EDITOR_INSTANCE');

export const EDITOR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Editor),
    multi: true
};
/**
 * Editor groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-editor',
    standalone: true,
    imports: [CommonModule, SharedModule, BindModule],
    template: `
        <div [class]="cx('toolbar')" *ngIf="toolbar || headerTemplate || _headerTemplate" [pBind]="ptm('toolbar')">
            <ng-content select="p-header"></ng-content>
            <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
        </div>
        <div [class]="cx('toolbar')" *ngIf="!toolbar && !headerTemplate && !_headerTemplate" [pBind]="ptm('toolbar')">
            <span class="ql-formats" [pBind]="ptm('formats')">
                <select class="ql-header" [pBind]="ptm('header')">
                    <option value="1" [pBind]="ptm('option')">Heading</option>
                    <option value="2" [pBind]="ptm('option')">Subheading</option>
                    <option selected [pBind]="ptm('option')">Normal</option>
                </select>
                <select class="ql-font" [pBind]="ptm('select')">
                    <option selected [pBind]="ptm('option')">Sans Serif</option>
                    <option value="serif" [pBind]="ptm('option')">Serif</option>
                    <option value="monospace" [pBind]="ptm('option')">Monospace</option>
                </select>
            </span>
            <span class="ql-formats" [pBind]="ptm('formats')">
                <button class="ql-bold" aria-label="Bold" type="button" [pBind]="ptm('bold')"></button>
                <button class="ql-italic" aria-label="Italic" type="button" [pBind]="ptm('italic')"></button>
                <button class="ql-underline" aria-label="Underline" type="button" [pBind]="ptm('underline')"></button>
            </span>
            <span class="ql-formats" [pBind]="ptm('formats')">
                <select class="ql-color" [pBind]="ptm('color')"></select>
                <select class="ql-background" [pBind]="ptm('background')"></select>
            </span>
            <span class="ql-formats" [pBind]="ptm('formats')">
                <button class="ql-list" value="ordered" aria-label="Ordered List" type="button" [pBind]="ptm('list')"></button>
                <button class="ql-list" value="bullet" aria-label="Unordered List" type="button" [pBind]="ptm('list')"></button>
                <select class="ql-align" [pBind]="ptm('select')">
                    <option selected [pBind]="ptm('option')"></option>
                    <option value="center" [pBind]="ptm('option')">center</option>
                    <option value="right" [pBind]="ptm('option')">right</option>
                    <option value="justify" [pBind]="ptm('option')">justify</option>
                </select>
            </span>
            <span class="ql-formats" [pBind]="ptm('formats')">
                <button class="ql-link" aria-label="Insert Link" type="button" [pBind]="ptm('link')"></button>
                <button class="ql-image" aria-label="Insert Image" type="button" [pBind]="ptm('image')"></button>
                <button class="ql-code-block" aria-label="Insert Code Block" type="button" [pBind]="ptm('codeBlock')"></button>
            </span>
            <span class="ql-formats" [pBind]="ptm('formats')">
                <button class="ql-clean" aria-label="Remove Styles" type="button" [pBind]="ptm('clean')"></button>
            </span>
        </div>
        <div [class]="cx('content')" [ngStyle]="style" [pBind]="ptm('content')"></div>
    `,
    providers: [EDITOR_VALUE_ACCESSOR, EditorStyle, { provide: EDITOR_INSTANCE, useExisting: Editor }, { provide: PARENT_INSTANCE, useExisting: Editor }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    },
    hostDirectives: [Bind]
})
export class Editor extends BaseEditableHolder<EditorPassThrough> {
    $pcEditor: Editor | undefined = inject(EDITOR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Inline style of the container.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the container.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Placeholder text to show when editor is empty.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * Whitelist of formats to display, see [here](https://quilljs.com/docs/formats/) for available options.
     * @group Props
     */
    @Input() formats: string[] | undefined;
    /**
     * Modules configuration of Editor, see [here](https://quilljs.com/docs/modules/) for available options.
     * @group Props
     */
    @Input() modules: object | undefined;
    /**
     * DOM Element or a CSS selector for a DOM Element, within which the editor’s p elements (i.e. tooltips, etc.) should be confined. Currently, it only considers left and right boundaries.
     * @group Props
     */
    @Input() bounds: HTMLElement | string | undefined;
    /**
     * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars (i.e. overflow-y: auto), if is has been changed from the default ql-editor with custom CSS. Necessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container is responsible from the scrolling..
     * @group Props
     */
    @Input() scrollingContainer: HTMLElement | string | undefined;
    /**
     * Shortcut for debug. Note debug is a static method and will affect other instances of Quill editors on the page. Only warning and error messages are enabled by default.
     * @group Props
     */
    @Input() debug: string | undefined;
    /**
     * Whether to instantiate the editor to read-only mode.
     * @group Props
     */
    @Input() get readonly(): boolean {
        return this._readonly;
    }
    set readonly(val: boolean) {
        this._readonly = val;

        if (this.quill) {
            if (this._readonly) this.quill.disable();
            else this.quill.enable();
        }
    }
    /**
     * Callback to invoke when the quill modules are loaded.
     * @param {EditorInitEvent} event - custom event.
     * @group Emits
     */
    @Output('onInit') onEditorInit: EventEmitter<EditorInitEvent> = new EventEmitter<EditorInitEvent>();
    /**
     * Callback to invoke when text of editor changes.
     * @param {EditorTextChangeEvent} event - custom event.
     * @group Emits
     */
    @Output() onTextChange: EventEmitter<EditorTextChangeEvent> = new EventEmitter<EditorTextChangeEvent>();
    /**
     * Callback to invoke when selection of the text changes.
     * @param {EditorSelectionChangeEvent} event - custom event.
     * @group Emits
     */
    @Output() onSelectionChange: EventEmitter<EditorSelectionChangeEvent> = new EventEmitter<EditorSelectionChangeEvent>();
    /**
     * Callback to invoke when editor content changes (combines both text and selection changes).
     * @param {EditorChangeEvent} event - custom event.
     * @group Emits
     */
    @Output() onEditorChange: EventEmitter<EditorChangeEvent> = new EventEmitter<EditorChangeEvent>();
    /**
     * Callback to invoke when editor receives focus.
     * @param {EditorFocusEvent} event - custom event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<EditorFocusEvent> = new EventEmitter<EditorFocusEvent>();
    /**
     * Callback to invoke when editor loses focus.
     * @param {EditorBlurEvent} event - custom event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<EditorBlurEvent> = new EventEmitter<EditorBlurEvent>();

    @ContentChild(Header) toolbar: any;

    value: Nullable<string>;

    delayedCommand: Function | null = null;

    _readonly: boolean = false;

    quill: any;

    dynamicQuill: any;

    /**
     * Custom item template.
     * @group Templates
     */
    @ContentChild('header', { descendants: false }) headerTemplate: Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    _headerTemplate: TemplateRef<any> | undefined;

    private get isAttachedQuillEditorToDOM(): boolean | undefined {
        return this.quillElements?.editorElement?.isConnected;
    }

    private quillElements!: { editorElement: HTMLElement; toolbarElement: HTMLElement };

    private focusListener: (() => void) | null = null;

    private blurListener: (() => void) | null = null;

    _componentStyle = inject(EditorStyle);

    constructor() {
        super();
        /**
         * Read or write the DOM once, when initializing non-Angular (Quill) library.
         */
        afterNextRender(() => {
            this.initQuillElements();
            this.initQuillEditor();
        });
    }

    onAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
            }
        });
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any): void {
        this.value = value;

        if (this.quill) {
            if (value) {
                const command = (): void => {
                    this.quill.setContents(this.quill.clipboard.convert(this.dynamicQuill.version.startsWith('2') ? { html: this.value } : this.value));
                };

                if (this.isAttachedQuillEditorToDOM) {
                    command();
                } else {
                    this.delayedCommand = command;
                }
            } else {
                const command = (): void => {
                    this.quill.setText('');
                };

                if (this.isAttachedQuillEditorToDOM) {
                    command();
                } else {
                    this.delayedCommand = command;
                }
            }
        }
    }

    getQuill() {
        return this.quill;
    }

    private initQuillEditor(): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        /**
         * Importing Quill at top level, throws `document is undefined` error during when
         * building for SSR, so this dynamically loads quill when it's in browser module.
         */
        if (!this.dynamicQuill) {
            import('quill')
                .then((quillModule: any) => {
                    this.dynamicQuill = quillModule.default;
                    this.createQuillEditor();
                })
                .catch((e) => console.error(e.message));
        } else {
            this.createQuillEditor();
        }
    }

    private createQuillEditor(): void {
        this.initQuillElements();

        const { toolbarElement, editorElement } = this.quillElements;
        let defaultModule = { toolbar: toolbarElement };
        let modules = this.modules ? { ...defaultModule, ...this.modules } : defaultModule;
        this.quill = new this.dynamicQuill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });

        const isQuill2 = this.dynamicQuill.version.startsWith('2');

        if (this.value) {
            this.quill.setContents(this.quill.clipboard.convert(isQuill2 ? { html: this.value } : this.value));
        }

        this.quill.on('text-change', (delta: any, oldContents: any, source: 'user' | 'api' | 'silent') => {
            if (source === 'user') {
                let html = isQuill2 ? this.quill.getSemanticHTML() : findSingle(editorElement, '.ql-editor')?.innerHTML;
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

        this.quill.on('selection-change', (range: any, oldRange: any, source: 'user' | 'api' | 'silent') => {
            this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });

        this.quill.on('editor-change', (eventName: 'text-change' | 'selection-change', ...args: any[]) => {
            this.onEditorChange.emit({
                eventName: eventName,
                args: args
            });
        });

        const editorEl = this.quill.root;

        this.focusListener = () => {
            this.onFocus.emit({
                source: 'user'
            });
        };

        this.blurListener = () => {
            this.onBlur.emit({
                source: 'user'
            });
        };

        editorEl.addEventListener('focus', this.focusListener);
        editorEl.addEventListener('blur', this.blurListener);

        this.onEditorInit.emit({
            editor: this.quill
        });
    }

    onDestroy(): void {
        if (this.quill && this.quill.root) {
            const editorEl = this.quill.root;
            if (this.focusListener) {
                editorEl.removeEventListener('focus', this.focusListener);
                this.focusListener = null;
            }
            if (this.blurListener) {
                editorEl.removeEventListener('blur', this.blurListener);
                this.blurListener = null;
            }
        }
    }

    private initQuillElements(): void {
        if (!this.quillElements) {
            this.quillElements = {
                editorElement: findSingle(this.el.nativeElement, 'div.p-editor-content'),
                toolbarElement: findSingle(this.el.nativeElement, 'div.p-editor-toolbar')
            } as any;
        }
    }
}

@NgModule({
    imports: [Editor, SharedModule],
    exports: [Editor, SharedModule]
})
export class EditorModule {}

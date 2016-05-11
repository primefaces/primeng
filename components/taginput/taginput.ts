import {Component, HostBinding, Input} from '@angular/core';
import {NgControl} from '@angular/common';
import {TagItem} from './tagitem';

@Component({
  selector: 'p-taginput',
  template:
  `<div class="tagsinput">
  <tag-item
    [text]="tag"
    [index]="index"
    [selected]="selectedTag === index"
    (tagRemoved)="_removeTag($event)"
    *ngFor="let tag of tagsList; let index = index">
  </tag-item>
  <input
    type="text"
    [placeholder]="placeholder"
    [(ngModel)]="inputValue"
    (paste)="inputPaste($event)"
    (keyup)="inputChanged($event)"
    (blur)="inputBlurred($event)"
    (focus)="inputFocused()"
    #tagInputRef>
    </div>`,
  styles: [`
    .tagsinput {
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      display: inline-block;
      padding: 4px 6px;
      color: #555;
      vertical-align: middle;
      border-radius: 4px;
      max-width: 100%;
      line-height: 22px;
      cursor: text;
    }
  `],
  directives: [TagItem]
})
export class TagInput {
  @Input() placeholder: string = 'Add a tag';
  @Input() ngModel: string[];
  @Input() delimiterCode: string = '188';
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;
  @HostBinding('class.ng2-tag-input-focus') isFocussed;

  public tagsList: string[] = [];
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number;

  constructor(private _ngControl: NgControl) {
    this._ngControl.valueAccessor = this;
  }

  ngOnInit() {
    if (this.ngModel) this.tagsList = this.ngModel;
    this.onChange(this.tagsList);
    this.delimiter = parseInt(this.delimiterCode);
  }

  inputChanged(event) {
    let key = event.keyCode;
    switch(key) {
      case 8: // Backspace
        this._handleBackspace();
        break;
      case 13: //Enter
        this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      case this.delimiter:
        this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        break;
    }
  }

  inputBlurred(event) {
    this.addOnBlur && this._addTags([this.inputValue]);
    this.isFocussed = false;
  }
  inputFocused(event) {
    this.isFocussed = true;
  }

  inputPaste(event) {
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let tags = this._splitString(pastedString);
    let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
    this._addTags(tagsToAdd);
    setTimeout(() => this.inputValue = '', 3000);
  }

  private _splitString(tagString: string) {
    tagString = tagString.trim();
    let tags = tagString.split(String.fromCharCode(this.delimiter));
    return tags.filter((tag) => !!tag);
  }

  private _isTagValid(tagString: string) {
    return this.allowedTagsPattern.test(tagString);
  }

  private _addTags(tags: string[]) {
    let validTags = tags.filter((tag) => this._isTagValid(tag));
    for (let id in validTags) {
      if (this.tagsList.indexOf(validTags[id]) === -1) {
        this.tagsList = this.tagsList.concat(validTags[id]);
      }
    }
    this._resetInput();
    this.onChange(this.tagsList);
  }

  private _removeTag(tagIndexToRemove): string {
    let tag = this.tagsList.splice(tagIndexToRemove, 1)[0];
    this.onChange(this.tagsList);
    return tag;
  }

  private _handleBackspace() {
    if (!this.inputValue.length && this.tagsList.length) {
        this.inputValue = this._removeTag(this.tagsList.length - 1);
    }
  }

  private _resetInput() {
    this.inputValue = '';
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (value) => any = () => { };

  onTouched: () => any = () => { };

  writeValue(value: any) { }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tag-item',
  template:
  `<span class="tag label label-info">
    {{text}}
    <span
      class="remove"
      (click)="removeTag()">&times;</span>
  </span>`,

  styles: [
    `.tag {
      margin-right: 2px;
      color: #FFFFFF;
    }

    .label-info {
      border: 1px solid #1f89ce;
      background: #2399e5;
    }

    .label {
      display: inline;
      padding: .2em .6em .3em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: .25em;
    }

    .remove {
      cursor: pointer;
      display: inline-block;
      padding: 0 3px;
    }
  `]
})
export class TagItem {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  removeTag() {
    this.tagRemoved.emit(this.index);
  }
}

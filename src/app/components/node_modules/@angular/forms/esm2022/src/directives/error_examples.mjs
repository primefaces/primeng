/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export const formControlNameExample = `
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });`;
export const formGroupNameExample = `
  <div [formGroup]="myGroup">
      <div formGroupName="person">
        <input formControlName="firstName">
      </div>
  </div>

  In your class:

  this.myGroup = new FormGroup({
      person: new FormGroup({ firstName: new FormControl() })
  });`;
export const formArrayNameExample = `
  <div [formGroup]="myGroup">
    <div formArrayName="cities">
      <div *ngFor="let city of cityArray.controls; index as i">
        <input [formControlName]="i">
      </div>
    </div>
  </div>

  In your class:

  this.cityArray = new FormArray([new FormControl('SF')]);
  this.myGroup = new FormGroup({
    cities: this.cityArray
  });`;
export const ngModelGroupExample = `
  <form>
      <div ngModelGroup="person">
        <input [(ngModel)]="person.name" name="firstName">
      </div>
  </form>`;
export const ngModelWithFormGroupExample = `
  <div [formGroup]="myGroup">
      <input formControlName="firstName">
      <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
  </div>
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JfZXhhbXBsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9lcnJvcl9leGFtcGxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRzs7Ozs7Ozs7O01BU2hDLENBQUM7QUFFUCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRzs7Ozs7Ozs7Ozs7TUFXOUIsQ0FBQztBQUVQLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHOzs7Ozs7Ozs7Ozs7OztNQWM5QixDQUFDO0FBRVAsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUc7Ozs7O1VBS3pCLENBQUM7QUFFWCxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRzs7Ozs7Q0FLMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgY29uc3QgZm9ybUNvbnRyb2xOYW1lRXhhbXBsZSA9IGBcbiAgPGRpdiBbZm9ybUdyb3VwXT1cIm15R3JvdXBcIj5cbiAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwiZmlyc3ROYW1lXCI+XG4gIDwvZGl2PlxuXG4gIEluIHlvdXIgY2xhc3M6XG5cbiAgdGhpcy5teUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICBmaXJzdE5hbWU6IG5ldyBGb3JtQ29udHJvbCgpXG4gIH0pO2A7XG5cbmV4cG9ydCBjb25zdCBmb3JtR3JvdXBOYW1lRXhhbXBsZSA9IGBcbiAgPGRpdiBbZm9ybUdyb3VwXT1cIm15R3JvdXBcIj5cbiAgICAgIDxkaXYgZm9ybUdyb3VwTmFtZT1cInBlcnNvblwiPlxuICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwiZmlyc3ROYW1lXCI+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgSW4geW91ciBjbGFzczpcblxuICB0aGlzLm15R3JvdXAgPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgIHBlcnNvbjogbmV3IEZvcm1Hcm91cCh7IGZpcnN0TmFtZTogbmV3IEZvcm1Db250cm9sKCkgfSlcbiAgfSk7YDtcblxuZXhwb3J0IGNvbnN0IGZvcm1BcnJheU5hbWVFeGFtcGxlID0gYFxuICA8ZGl2IFtmb3JtR3JvdXBdPVwibXlHcm91cFwiPlxuICAgIDxkaXYgZm9ybUFycmF5TmFtZT1cImNpdGllc1wiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2l0eSBvZiBjaXR5QXJyYXkuY29udHJvbHM7IGluZGV4IGFzIGlcIj5cbiAgICAgICAgPGlucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiaVwiPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIEluIHlvdXIgY2xhc3M6XG5cbiAgdGhpcy5jaXR5QXJyYXkgPSBuZXcgRm9ybUFycmF5KFtuZXcgRm9ybUNvbnRyb2woJ1NGJyldKTtcbiAgdGhpcy5teUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgY2l0aWVzOiB0aGlzLmNpdHlBcnJheVxuICB9KTtgO1xuXG5leHBvcnQgY29uc3QgbmdNb2RlbEdyb3VwRXhhbXBsZSA9IGBcbiAgPGZvcm0+XG4gICAgICA8ZGl2IG5nTW9kZWxHcm91cD1cInBlcnNvblwiPlxuICAgICAgICA8aW5wdXQgWyhuZ01vZGVsKV09XCJwZXJzb24ubmFtZVwiIG5hbWU9XCJmaXJzdE5hbWVcIj5cbiAgICAgIDwvZGl2PlxuICA8L2Zvcm0+YDtcblxuZXhwb3J0IGNvbnN0IG5nTW9kZWxXaXRoRm9ybUdyb3VwRXhhbXBsZSA9IGBcbiAgPGRpdiBbZm9ybUdyb3VwXT1cIm15R3JvdXBcIj5cbiAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJmaXJzdE5hbWVcIj5cbiAgICAgIDxpbnB1dCBbKG5nTW9kZWwpXT1cInNob3dNb3JlQ29udHJvbHNcIiBbbmdNb2RlbE9wdGlvbnNdPVwie3N0YW5kYWxvbmU6IHRydWV9XCI+XG4gIDwvZGl2PlxuYDtcbiJdfQ==
import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-raised-demo',
    template: `
        <app-docsectiontext>
            <p>Raised buttons display a shadow to indicate elevation.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [raised]="true"></p-button>
            <p-button label="Secondary" [raised]="true" severity="secondary"></p-button>
            <p-button label="Success" [raised]="true" severity="success"></p-button>
            <p-button label="Info" [raised]="true" severity="info"></p-button>
            <p-button label="Warning" [raised]="true" severity="warning"></p-button>
            <p-button label="Help" [raised]="true" severity="help"></p-button>
            <p-button label="Danger" [raised]="true" severity="danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-raised-demo"></app-code>
    `
})
export class RaisedDoc {

    code: Code = {
        basic: `
<p-button label="Primary" [raised]="true"></p-button>
<p-button label="Secondary" [raised]="true" severity="secondary"></p-button>
<p-button label="Success" [raised]="true" severity="success"></p-button>
<p-button label="Info" [raised]="true" severity="info"></p-button>
<p-button label="Warning" [raised]="true" severity="warning"></p-button>
<p-button label="Help" [raised]="true" severity="help"></p-button>
<p-button label="Danger" [raised]="true" severity="danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [raised]="true"></p-button>
    <p-button label="Secondary" [raised]="true" severity="secondary"></p-button>
    <p-button label="Success" [raised]="true" severity="success"></p-button>
    <p-button label="Info" [raised]="true" severity="info"></p-button>
    <p-button label="Warning" [raised]="true" severity="warning"></p-button>
    <p-button label="Help" [raised]="true" severity="help"></p-button>
    <p-button label="Danger" [raised]="true" severity="danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-raised-demo',
    templateUrl: './button-raised-demo.html'
})
export class ButtonRaisedDemo { }`
    };
}

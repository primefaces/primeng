import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-severity-demo',
    template: ` 
        <app-docsectiontext>
            <p>Severity defines the type of button.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary"></p-button>
            <p-button label="Secondary" severity="secondary"></p-button>
            <p-button label="Success" severity="success"></p-button>
            <p-button label="Info" severity="info"></p-button>
            <p-button label="Warning" severity="warning"></p-button>
            <p-button label="Help" severity="help"></p-button>
            <p-button label="Danger" severity="danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-severity-demo"></app-code>
    `
})
export class SeverityDoc {

    code: Code = {
        basic: `
<p-button label="Primary"></p-button>
<p-button label="Secondary" severity="secondary"></p-button>
<p-button label="Success" severity="success"></p-button>
<p-button label="Info" severity="info"></p-button>
<p-button label="Warning" severity="warning"></p-button>
<p-button label="Help" severity="help"></p-button>
<p-button label="Danger" severity="danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary"></p-button>
    <p-button label="Secondary" severity="secondary"></p-button>
    <p-button label="Success" severity="success"></p-button>
    <p-button label="Info" severity="info"></p-button>
    <p-button label="Warning" severity="warning"></p-button>
    <p-button label="Help" severity="help"></p-button>
    <p-button label="Danger" severity="danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-severity-demo',
    templateUrl: './button-severity-demo.html'
})
export class ButtonSeverityDemo { }`
    };
}

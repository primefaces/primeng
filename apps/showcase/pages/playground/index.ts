import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: ` <div class="doc">
        <div class="doc-main">
            <div class="doc-intro">
                <h1>Playground</h1>
                <p>Experience PrimeNG right now with the interactive environment.</p>
            </div>
            <section class="py-6">
                <iframe class="w-full h-full" style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 2px; min-height: 800px" allowfullscreen src="https://stackblitz.com/edit/stackblitz-starters-qnu7pwn3?embed=1&file=src%2Fmain.ts"></iframe>
            </section>
        </div>
    </div>`
})
export class PlaygroundDemo {}

import {Component,OnInit,EventEmitter} from '@angular/core';

@Component({
    templateUrl: './blockuidemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .p-component-overlay-enter .pi.pi-lock {
            animation: enter 150ms forwards;
        }

        :host ::ng-deep .p-component-overlay-leave .pi.pi-lock {
            animation: leave 150ms forwards;
        }

        @keyframes enter {
            from {
                color: transparent;
            }
            to {
                color: var(--text-color);
            }
        }

        @keyframes leave {
            from {
                color: var(--text-color);
            }
            to {
                color: transparent;
            }
        }
    `]
})
export class BlockUIDemo {

    blockedPanel: boolean = false;

    blockedDocument: boolean = false;

    blockDocument() {
        this.blockedDocument = true;
        setTimeout(() => {
            this.blockedDocument = false;
        }, 3000);
    }
}

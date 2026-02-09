import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, InjectionToken, Input, NgModule, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { find } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { TerminalPassThrough } from 'primeng/types/terminal';
import { Subscription } from 'rxjs';
import { TerminalStyle } from './style/terminalstyle';
import { TerminalService } from './terminalservice';

const TERMINAL_INSTANCE = new InjectionToken<Terminal>('TERMINAL_INSTANCE');

/**
 * Terminal is a text based user interface.
 * @group Components
 */
@Component({
    selector: 'p-terminal',
    standalone: true,
    imports: [CommonModule, FormsModule, SharedModule, Bind],
    template: `
        <div [class]="cx('welcomeMessage')" [pBind]="ptm('welcomeMessage')" *ngIf="welcomeMessage">{{ welcomeMessage }}</div>
        <div [class]="cx('commandList')" [pBind]="ptm('commandList')">
            <div [class]="cx('command')" [pBind]="ptm('command')" *ngFor="let command of commands">
                <span [class]="cx('promptLabel')" [pBind]="ptm('promptLabel')">{{ prompt }}</span>
                <span [class]="cx('commandValue')" [pBind]="ptm('commandValue')">{{ command.text }}</span>
                <div [class]="cx('commandResponse')" [pBind]="ptm('commandResponse')" [attr.aria-live]="'polite'">{{ command.response }}</div>
            </div>
        </div>
        <div [class]="cx('prompt')" [pBind]="ptm('prompt')">
            <span [class]="cx('promptLabel')" [pBind]="ptm('promptLabel')">{{ prompt }}</span>
            <input #in type="text" [(ngModel)]="command" [class]="cx('promptValue')" [pBind]="ptm('promptValue')" autocomplete="off" (keydown)="handleCommand($event)" autofocus />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TerminalStyle, { provide: TERMINAL_INSTANCE, useExisting: Terminal }, { provide: PARENT_INSTANCE, useExisting: Terminal }],
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    },
    hostDirectives: [Bind]
})
export class Terminal extends BaseComponent<TerminalPassThrough> implements AfterViewInit, AfterViewChecked, OnDestroy {
    componentName = 'Terminal';
    $pcTerminal: Terminal | undefined = inject(TERMINAL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Initial text to display on terminal.
     * @group Props
     */
    @Input() welcomeMessage: string | undefined;
    /**
     * Prompt text for each command.
     * @group Props
     */
    @Input() prompt: string | undefined;
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    commands: any[] = [];

    command!: string;

    container!: Element;

    commandProcessed!: boolean;

    subscription: Subscription;

    _componentStyle = inject(TerminalStyle);

    @ViewChild('in') inputRef!: ElementRef<HTMLInputElement>;

    @HostListener('click')
    onHostClick() {
        this.focus(this.inputRef?.nativeElement);
    }

    constructor(public terminalService: TerminalService) {
        super();
        this.subscription = terminalService.responseHandler.subscribe((response) => {
            this.commands[this.commands.length - 1].response = response;
            this.commandProcessed = true;
        });
    }

    onAfterViewInit() {
        this.container = this.el.nativeElement;
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));

        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    }

    @Input()
    set response(value: string) {
        if (value) {
            this.commands[this.commands.length - 1].response = value;
            this.commandProcessed = true;
        }
    }

    handleCommand(event: KeyboardEvent) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.terminalService.sendCommand(this.command);
            this.command = '';
        }
    }

    focus(element: HTMLElement) {
        element.focus();
    }

    onDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@NgModule({
    exports: [Terminal, SharedModule],
    imports: [Terminal, SharedModule]
})
export class TerminalModule {}

import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, effect, ElementRef, HostListener, inject, InjectionToken, input, NgModule, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { TerminalPassThrough } from 'primeng/types/terminal';
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
    imports: [FormsModule, SharedModule, Bind],
    template: `
        @if (welcomeMessage()) {
            <div [class]="cx('welcomeMessage')" [pBind]="ptm('welcomeMessage')">{{ welcomeMessage() }}</div>
        }
        <div [class]="cx('commandList')" [pBind]="ptm('commandList')">
            @for (command of commands; track $index) {
                <div [class]="cx('command')" [pBind]="ptm('command')">
                    <span [class]="cx('promptLabel')" [pBind]="ptm('promptLabel')">{{ prompt() }}</span>
                    <span [class]="cx('commandValue')" [pBind]="ptm('commandValue')">{{ command.text }}</span>
                    <div [class]="cx('commandResponse')" [pBind]="ptm('commandResponse')" [attr.aria-live]="'polite'">{{ command.response }}</div>
                </div>
            }
        </div>
        <div [class]="cx('prompt')" [pBind]="ptm('prompt')">
            <span [class]="cx('promptLabel')" [pBind]="ptm('promptLabel')">{{ prompt() }}</span>
            <input #in type="text" [(ngModel)]="command" [class]="cx('promptValue')" [pBind]="ptm('promptValue')" autocomplete="off" (keydown)="handleCommand($event)" autofocus />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TerminalStyle, { provide: TERMINAL_INSTANCE, useExisting: Terminal }, { provide: PARENT_INSTANCE, useExisting: Terminal }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class Terminal extends BaseComponent<TerminalPassThrough> implements AfterViewInit, AfterViewChecked {
    componentName = 'Terminal';
    $pcTerminal: Terminal | undefined = inject(TERMINAL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    terminalService = inject(TerminalService);

    private destroyRef = inject(DestroyRef);

    /**
     * Initial text to display on terminal.
     * @group Props
     */
    welcomeMessage = input<string>();

    /**
     * Prompt text for each command.
     * @group Props
     */
    prompt = input<string>();

    /**
     * Response to display after a command.
     * @group Props
     */
    response = input<string>();

    commands: any[] = [];

    command!: string;

    container!: Element;

    commandProcessed!: boolean;

    _componentStyle = inject(TerminalStyle);

    inputRef = viewChild.required<ElementRef<HTMLInputElement>>('in');

    @HostListener('click')
    onHostClick() {
        this.focus(this.inputRef()?.nativeElement);
    }

    constructor() {
        super();
        this.terminalService.responseHandler.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((response) => {
            this.commands[this.commands.length - 1].response = response;
            this.commandProcessed = true;
        });

        effect(() => {
            const value = this.response();
            if (value && this.commands.length > 0) {
                this.commands[this.commands.length - 1].response = value;
                this.commandProcessed = true;
            }
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
}

@NgModule({
    exports: [Terminal, SharedModule],
    imports: [Terminal, SharedModule]
})
export class TerminalModule {}

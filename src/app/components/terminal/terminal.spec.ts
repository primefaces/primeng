import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Terminal } from './terminal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TerminalService } from './terminalservice';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    template: `<p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $"></p-terminal>`
  })
  class TestTerminalComponent {
    subscription: Subscription;
    
    constructor(private terminalService: TerminalService) {
        this.terminalService.commandHandler.subscribe(command => {
            let response = (command === 'd') ? "Command succeed": 'Unknown command: ' + command;
            this.terminalService.sendResponse(response);
        });
    }
    
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
  }

describe('Terminal', () => {
  
    let terminal: Terminal;
    let fixture: ComponentFixture<TestTerminalComponent>;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        NoopAnimationsModule,
        FormsModule
        ],
        declarations: [
        Terminal,
        TestTerminalComponent
        ],
        providers:[TerminalService]
    });

    fixture = TestBed.createComponent(TestTerminalComponent);
    terminal = fixture.debugElement.children[0].componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();
  
        const terminalEl = fixture.debugElement.query(By.css('div'));
        expect(terminalEl.nativeElement).toBeTruthy();
    });

    it('should handle command', () => {
        fixture.detectChanges();

        terminal.command = 'd';
        let event = {'keyCode': 13};
        terminal.handleCommand(event as KeyboardEvent);
        fixture.detectChanges();

        terminal.cd.detectChanges();
        expect(terminal.command).toEqual('');
        const commandEl = fixture.debugElement.query(By.css('.p-terminal-command'));
        const responseEl = fixture.debugElement.query(By.css('.p-terminal-content')).queryAll(By.css('div'))[1];
        expect(commandEl.nativeElement.textContent).toEqual('d');
        expect(responseEl.nativeElement.textContent).toEqual('Command succeed');
    });

    it('should not handle command', () => {
        fixture.detectChanges();

        terminal.command = 'dd';
        let event = {'keyCode': 13};
        terminal.handleCommand(event as KeyboardEvent);
        fixture.detectChanges();

        terminal.cd.detectChanges();
        expect(terminal.command).toEqual('');
        const commandEl = fixture.debugElement.query(By.css('.p-terminal-command'));
        const responseEl = fixture.debugElement.query(By.css('.p-terminal-content')).queryAll(By.css('div'))[1];
        expect(commandEl.nativeElement.textContent).toEqual('dd');
        expect(responseEl.nativeElement.textContent).toEqual('Unknown command: dd');
    });
});

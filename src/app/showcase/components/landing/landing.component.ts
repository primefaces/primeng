import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {

  menuActive: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}

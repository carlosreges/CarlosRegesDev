import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typedText') typedText!: ElementRef<HTMLElement>;
  private typed?: Typed;

  constructor() { }

  ngAfterViewInit(): void {
    const options = {
      strings: ['Salesforce Developer', 'CRM Solutions Builder', 'Java & Angular Developer', 'Trailhead Learner'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      smartBackspace: false,
      showCursor: true,
      cursorChar: '|'
    };

    this.typed = new Typed(this.typedText.nativeElement, options);
  }

  ngOnDestroy(): void {
    this.typed?.destroy();
  }
}

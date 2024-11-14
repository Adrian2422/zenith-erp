import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'zenith-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <zenith-analog-welcome /> `,
})
export default class HomeComponent {}

import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'zenith-erp-app-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
     <zenith-erp-app-analog-welcome/>
  `,
})
export default class HomeComponent {
}

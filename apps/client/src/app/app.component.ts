import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './common/components/layout/layout.component';

@Component({
  imports: [RouterModule, LayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}

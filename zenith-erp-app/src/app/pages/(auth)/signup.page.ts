import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zenith-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignupPage {}

import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { switchMap } from 'rxjs';

import { UsersService } from '../../api/users.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [Button, Menu, NgOptimizedImage, RouterLink],
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  public readonly router = inject(Router);
  public readonly layoutService = inject(LayoutService);
  public readonly translate = inject(TranslateService);
  public readonly oidc = inject(OidcSecurityService);
  public readonly usersService = inject(UsersService);

  public readonly translateBase = 'header';
  public languageButtonItems = signal<MenuItem[]>([]);
  public accountButtonItems = signal<MenuItem[]>([]);

  public ngOnInit(): void {
    this.translate.onLangChange.pipe(switchMap(({ lang }) => this.usersService.usersUpdateLanguage({ language: lang }))).subscribe((_) => {
      this.languageButtonItems.set([
        {
          label: this.translate.instant(this.translateBase + '.language.polish'),
          command: (): void => {
            this.translate.use('pl-PL');
            localStorage.setItem('lang', 'pl-PL');
          },
        },
        {
          label: this.translate.instant(this.translateBase + '.language.english'),
          command: (): void => {
            this.translate.use('en-US');
            localStorage.setItem('lang', 'en-US');
          },
        },
      ]);
      this.accountButtonItems.set([
        {
          label: this.translate.instant(this.translateBase + '.user.profile'),
          icon: 'pi pi-user',
          command: (): void => {
            void this.router.navigate(['/profile']);
          },
        },
        {
          label: this.translate.instant(this.translateBase + '.user.logout'),
          icon: 'pi pi-power-off',
          command: (): void => {
            this.oidc.logoff().subscribe();
          },
        },
      ]);
    });
  }

  public changeTheme(theme: string): void {
    this.usersService.usersUpdateTheme({ theme }).subscribe(() => {
      this.layoutService.toggleTheme();
    });
  }
}

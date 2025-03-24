import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { LayoutComponent } from './common/components/layout/layout.component';

@Component({
  imports: [RouterModule, LayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly browserLanguage = inject(LOCALE_ID);
  private readonly translate = inject(TranslateService);

  public ngOnInit(): void {
    this.initTranslations();
  }

  private initTranslations(): void {
    this.translate.addLangs(['pl-PL', 'en-US']);
    this.translate.setDefaultLang(this.browserLanguage);

    const currentLanguage = localStorage.getItem('lang');
    if (currentLanguage) {
      this.translate.use(currentLanguage);
    } else {
      this.translate.use(this.browserLanguage);
      localStorage.setItem('lang', this.browserLanguage);
    }
  }
}

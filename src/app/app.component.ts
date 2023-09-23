import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, pipe } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  private static _customIcons = [
    'bm-compass',
    'bm-entry',
    'bm-exit',
    'bm-lightbulb',
    'bm-ruler',
    'bm-warn',
    'bm-water',
  ];

  constructor(
    private readonly _updates: SwUpdate,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    public translate: TranslateService,
    public router: Router
  ) {
    (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN =
      environment.appCheckDebugToken;
    translate.addLangs(['en-US', 'de-CH']);
    translate.setDefaultLang('de-CH');
    this._updates.versionUpdates.subscribe(() =>
      pipe(
        filter(
          (evt: VersionReadyEvent): evt is VersionReadyEvent =>
            evt.type === 'VERSION_READY'
        ),
        this.onUpdateAvailable
      )
    );
    this.initializeIcons();
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(
        filter((navigationEvent) => navigationEvent instanceof NavigationEnd)
      )
      .subscribe(() => this.sidenav.close());
  }

  onUpdateAvailable() {
    console.warn('New version is ready: Reloading');
    this._updates.activateUpdate().then(window.location.reload);
  }

  initializeIcons(): void {
    for (let icon of AppComponent._customIcons) {
      this._iconRegistry.addSvgIcon(
        icon,
        this._domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/custom/${icon}.svg`
        )
      );
    }
  }
}

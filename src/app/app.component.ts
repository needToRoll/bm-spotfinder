import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, pipe } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

//TODO: Remove admin comments before prod release
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  constructor(
    private readonly updates: SwUpdate,
    public translate: TranslateService,
    public router: Router
  ) {
    translate.addLangs(['en-US', 'de-CH']);
    translate.setDefaultLang('de-CH');
    this.updates.versionUpdates.subscribe(() =>
      pipe(
        filter(
          (evt: VersionReadyEvent): evt is VersionReadyEvent =>
            evt.type === 'VERSION_READY'
        ),
        this.onUpdateAvailable
      )
    );
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
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}

import {Component} from '@angular/core';
import {SwUpdate, VersionReadyEvent} from "@angular/service-worker";
import {filter, pipe} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//TODO: Remove admin comments before prod release
export class AppComponent {
  title = 'Spotfinder';

  constructor(private readonly updates: SwUpdate, /*private importService: SpotImporterService*/) {
    this.updates.versionUpdates.subscribe(event =>
      pipe(
        filter((evt: VersionReadyEvent): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        this.onUpdateAvailable
      )
    );
  }

  onUpdateAvailable() {
    console.warn("New version is ready: Reloading")
    this.updates.activateUpdate().then(() => document.location.reload());
  }
  /*
    import($event: MouseEvent) {
      this.importService.importSpotDataToFirestore()
      console.log("Done importing data")
    }
   */
}

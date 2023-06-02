import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AVAILABLE_ROPE_LENGTHS } from '../shared/model/RopeLength';
import { SPOT_DIFFICULTIES } from '../shared/model/SpotDifficultyLevel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunitySpotService } from './service/community-spot-service';
import { CommunitySpot } from '../shared/model/CommunitySpot';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-community-spot',
  templateUrl: './community-spot.component.html',
  styleUrls: ['./community-spot.component.scss'],
})
export class CommunitySpotComponent implements AfterViewInit {
  public readonly AVAILABLE_ROPE_LENGTHS = AVAILABLE_ROPE_LENGTHS;
  public readonly SPOT_DIFFICULTIES = SPOT_DIFFICULTIES;

  @ViewChild('progressSpinnerRef')
  spinnerTemplateRef: TemplateRef<MatProgressSpinner>;

  communitySpotFrom: FormGroup =
    CommunitySpotComponent._buildCommunityFromGroup();

  shouldDisplayWarning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  shouldDisplaySuccess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  errorReason = '';

  overlayPortal: TemplatePortal;
  overlayRef: OverlayRef;

  constructor(
    private vcRef: ViewContainerRef,
    private communitySpotService: CommunitySpotService,
    private overlay: Overlay
  ) {
    let ropeGroup = this.communitySpotFrom.controls['rope'] as FormGroup;
    for (let option of this.AVAILABLE_ROPE_LENGTHS) {
      ropeGroup.addControl(String(option.value), new FormControl(false));
    }
  }

  ngAfterViewInit(): void {
    this._initializeSpinnerOverlay();
  }

  submitSpotRecommendation() {
    if (this.communitySpotFrom.valid) {
      this._openSpinner();
      let value = this.communitySpotFrom.value as CommunitySpotFormValue;
      let dto = this._formValuesToDto(value);
      this.communitySpotService
        .saveSpot(dto)
        .then(() => {
          this._handleSuccess();
        })
        .catch((reason) => this._handleError(reason))
        .finally(() => this._closeSpinner());
    }
  }

  private _handleSuccess() {
    this._resetFrom();
    this.shouldDisplaySuccess.next(true);
  }

  private _handleError(error: any) {
    if (typeof error == 'string') {
      this.errorReason = error;
    } else {
      this.errorReason = JSON.stringify(error);
    }
    this.shouldDisplayWarning.next(true);
  }

  private _resetFrom() {
    this.communitySpotFrom.clearValidators();
    this.communitySpotFrom.reset();
    this.shouldDisplayWarning.next(false);
  }

  private _openSpinner() {
    this.overlayRef.attach(this.overlayPortal);
  }

  private _closeSpinner() {
    return this.overlayRef.detach();
  }

  private _formValuesToDto(formValue: CommunitySpotFormValue): CommunitySpot {
    let selectedRopeLength: number[] = [];
    for (const [propertyName, propertyValue] of Object.entries(formValue.rope))
      if (propertyValue) {
        selectedRopeLength.push(parseInt(propertyName));
      }
    let additionalInfo = formValue.comments
      .split('\n')
      .map((value) => value.trim())
      .filter((value) => value.length != 0);
    return {
      placeId: '',
      title: formValue.title,
      address1: formValue.street,
      address2: formValue.zip + ' ' + formValue.town,
      coords: {
        lat: 0.0,
        lng: 0.0,
      },
      bmSpotInfo: {
        difficulty: formValue.difficulty,
        ropeLength: selectedRopeLength,
        additionalInfo: additionalInfo,
      },
    };
  }

  private _initializeSpinnerOverlay() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
    this.overlayPortal = new TemplatePortal(
      this.spinnerTemplateRef,
      this.vcRef
    );
  }

  private static _buildCommunityFromGroup() {
    return new FormGroup<any>({
      title: new FormControl<string>('', Validators.required),
      street: new FormControl<string>('', Validators.required),
      zip: new FormControl<number>(undefined, [
        Validators.required,
        Validators.min(1000),
        Validators.max(999999),
      ]),
      town: new FormControl<string>('', Validators.required),
      rope: new FormGroup({}),
      difficulty: new FormControl(undefined),
      comments: new FormControl(''),
    });
  }
}

export interface CommunitySpotFormValue {
  title: string;
  street: string;
  zip: number;
  town: string;
  rope: any;
  difficulty: number;
  comments: string;
}

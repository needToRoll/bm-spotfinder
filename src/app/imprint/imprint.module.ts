import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprintComponent } from './imprint.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ImprintComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ImprintComponent
  ]
})
export class ImprintModule { }

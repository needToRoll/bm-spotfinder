import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocalizedDatePipe} from "./pipe/localized-date.pipe";



@NgModule({
  declarations: [
    LocalizedDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports:
    [
    LocalizedDatePipe
  ]
})
export class SharedModule { }

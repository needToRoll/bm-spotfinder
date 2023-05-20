import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    ContactComponent
  ]
})
export class ContactModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedDatePipe } from './pipe/localized-date.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LocalizedDatePipe],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend: true,
    }),
  ],
  exports: [LocalizedDatePipe, TranslateModule],
})
export class SharedModule {}

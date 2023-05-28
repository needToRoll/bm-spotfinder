import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  private readonly datePipeDelegate = new DatePipe("de-CH")

  constructor(private translateService: TranslateService) {
  }

  transform(value: Date | string | number, format?: string, timezone?: string): string | null {
    return this.datePipeDelegate.transform(value, format, timezone, this.translateService.currentLang);
  }

}

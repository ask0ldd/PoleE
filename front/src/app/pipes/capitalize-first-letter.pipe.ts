import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(str: string): string {
    const trimedStr = str.trim()
    return trimedStr == "" ? trimedStr : trimedStr.charAt(0).toUpperCase() + trimedStr.slice(1)
  }

}

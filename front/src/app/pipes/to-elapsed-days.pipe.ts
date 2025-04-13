import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toElapsedDays'
})
export class ToElapsedDaysPipe implements PipeTransform {

  transform(value: string): string {
    const targetDate = new Date(value);
    const currentDate = new Date();
    
    const timeDifferenceMS = currentDate.getTime() - targetDate.getTime();
    
    const elapsedDays = Math.floor(timeDifferenceMS / (1000 * 60 * 60 * 24));
    
    return elapsedDays <= 0 ? 'Posted today' : `Posted ${elapsedDays} days ago`;
  }

}

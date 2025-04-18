import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryParsing'
})
export class SalaryParsingPipe implements PipeTransform {

  extractSalaryBounds(str : string) : number[] | null{
    const amountRegex = /(\d+(?:\.\d+)?)\s*Euros/g;
    const amounts = str.match(amountRegex)
    if(amounts?.length == 0 || !amounts) return null
    return amounts.map(amount => parseFloat(amount))
  }

  transform(str : string): string {
    const trimedStr = str.trim()
    let bounds = this.extractSalaryBounds(trimedStr)
    if(!bounds) return "Non communiqué"
    if(trimedStr.startsWith('Mensuel')) bounds = bounds.map(bound => bound * 12)
    return bounds.map(bound => Math.floor(bound / 1000) + "k").join(" - ") + " Annuels"
  }

}

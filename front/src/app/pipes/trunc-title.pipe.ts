import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'truncTitle'
})
export class TruncTitlePipe implements PipeTransform {

transform(value: string, max : number = 200, trail : string = "..."): string {
	return value.length <= max ? value : value.substring(0, max-1) + trail;
}

}

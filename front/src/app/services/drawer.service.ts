import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private readonly switchEvent = new Subject<boolean>();
  private _isOpen = false;

  // Expose as observable to prevent external next() calls
  readonly switchEvent$ = this.switchEvent.asObservable();

  get isOpen(): boolean {
    return this._isOpen;
  }

  emitSwitchEvent(): void {
    this._isOpen = !this._isOpen;
    this.switchEvent.next(this._isOpen);
  }
}

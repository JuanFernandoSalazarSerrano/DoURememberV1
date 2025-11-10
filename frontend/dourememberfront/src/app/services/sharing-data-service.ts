import { EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingData {

  private readonly _handlerLoginEventEmitter = new EventEmitter();

  private readonly _CloseModalEventEmitter = new EventEmitter();

  constructor(){}

  get handlerLoginEventEmitter() {
    return this._handlerLoginEventEmitter;
  }

  public get CloseModalEventEmitter() {
    return this._CloseModalEventEmitter;
  }


}

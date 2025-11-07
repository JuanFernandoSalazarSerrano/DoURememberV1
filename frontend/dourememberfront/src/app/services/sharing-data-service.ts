import { EventEmitter, Injectable} from '@angular/core';
import { User } from '../models/User';

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

import { EventEmitter, Injectable} from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SharingData {

  private readonly _handlerLoginEventEmitter = new EventEmitter();

  constructor(){}

  get handlerLoginEventEmitter() {
    return this._handlerLoginEventEmitter;
  }

}

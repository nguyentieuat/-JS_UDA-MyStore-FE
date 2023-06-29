import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  public transferArray = new BehaviorSubject<any>([]);

  addNewData(data: any) {
      this.transferArray.next(data);
  }
}

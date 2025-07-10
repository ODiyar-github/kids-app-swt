/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable()
export class SendDataService {
  constructor(private readonly httpClient: HttpClient) {}

  public sendData(): void{
    console.log('DATEN PUNKT: ',this.httpClient.get<string>(`${environment.MAIN.URL}/sendData`).subscribe((value=>{
      return value;
    })))
  }
}
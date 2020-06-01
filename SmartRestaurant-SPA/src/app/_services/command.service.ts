import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Command } from "../_models/command";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommandService {
  public baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public registerCommand(command: Command): Observable<Object> {
    return this.http.post(this.baseUrl + "command/AddCommand", command);
  }
}

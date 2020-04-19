import { Injectable, Output, EventEmitter } from "@angular/core";
import { AuthService } from "./utils/auth.service";
import { AlertifyService } from "./utils/alertify.service";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  registerState: boolean;
  @Output()
  public toggleRegister = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  actionToggle(val: boolean) {
    this.registerState = val;
    this.toggleRegister.emit(this.registerState);
  }

  register(model: any) {
    this.authService.register(model).subscribe(
      () => {
        this.alertify.success("Registration successful");
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}

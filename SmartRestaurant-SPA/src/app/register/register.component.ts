import { Component, OnInit } from "@angular/core";
import { RegisterLoginService } from "../_services/register-login.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  registerState: boolean;
  constructor(private registerService: RegisterLoginService) {}

  ngOnInit() {}

  register() {
    this.registerService.register(this.model);
  }

  cancel() {
    this.registerService.actionToggle(false);
  }
}

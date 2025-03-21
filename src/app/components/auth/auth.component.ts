import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  authForm: FormGroup;
  isLogin = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  async onSubmit() {
    if (this.authForm.valid) {
      try {
        const { email, password } = this.authForm.value;
        if (this.isLogin) {
          await this.authService.signIn(email, password);
        } else {
          await this.authService.signUp(email, password);
          this.snackBar.open(
            "Registration successful! Please login.",
            "Close",
            {
              duration: 3000,
            }
          );
          this.isLogin = true;
        }
      } catch (error: any) {
        this.snackBar.open(error.message || "An error occurred", "Close", {
          duration: 3000,
        });
      }
    }
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    this.authForm.reset();
  }
}

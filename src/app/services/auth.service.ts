import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  async signIn(email: string, password: string) {
    try {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          password,
        })
      );
      this.router.navigate(["/dashboard"]);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  async signUp(email: string, password: string) {
    try {
      /// TODO:: Signup logic
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async signOut() {
    this._isAuthenticated.next(false);
    this.router.navigate(["/login"]);
  }

  private async checkAuth() {}

  isAuthenticated() {
    return localStorage.getItem("user") !== null;
  }
}

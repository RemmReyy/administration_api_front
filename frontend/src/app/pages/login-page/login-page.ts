import {Component} from '@angular/core';
import {LoginForm} from "../../components/login-form/login-form";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-login-page',
  imports: [
    LoginForm,
    MatCardModule
  ],
  templateUrl: './login-page.html',
  standalone: true,
  styleUrl: './login-page.scss'
})
export class LoginPage {

}

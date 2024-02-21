import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <main>
      <form [formGroup]="form" (ngSubmit)="onSubmitLogin()">
        <label>First name</label>
        <input type="text" formControlName="firstName">
        <label>Last name</label>
        <input type="text" formControlName="lastName">
        <label>Email</label>
        <input type="text" formControlName="email">

        <button type="submit" [disabled]="!form.valid">Login</button>
      </form>
    </main>
  `,
  styleUrl: './login.component.css'
})


export class LoginComponent {

  user:string="";
  form = new FormGroup({
    "firstName": new FormControl("", Validators.required),
    "lastName": new FormControl("",Validators.required),
    "email": new FormControl("",[Validators.email,Validators.required])
  });

  onSubmitLogin() {
    this.user= JSON.stringify(this.form.value);
    localStorage.setItem("user", this.user);
    console.log(this.form.value);
  }
}

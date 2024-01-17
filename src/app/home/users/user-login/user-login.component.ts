import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/users/user.service';
import { loginToken } from '../../types/user.type';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{
  userLoginForm!: FormGroup;
  alertType: number = 0;
  alertMessage: string = '';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private location: Location,
    private router: Router){}
  
  ngOnInit(): void {
      this.userLoginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
  }

  get email(): AbstractControl<any,any> | null{
      return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any,any> | null{
    return this.userLoginForm.get('password')
  }

  onSubmit(): void{
    this.userService.login(this.email?.value, this.password?.value)
    .subscribe({
      next:(result: loginToken) => {
        this.userService.activateToken(result); 
        this.alertType = 0;
        this.alertMessage = 'Login successful'
        console.log(result.user.email)
        setTimeout(() => {
          this.router.navigate(['home/products'])
        },1000)
      },
      error:(error) => {
        this.alertType = 2;
        this.alertMessage = error.error.message;
      }
    })
  }
}

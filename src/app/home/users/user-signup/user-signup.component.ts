import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/users/user.service';
import { user } from '../../types/user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {
  userSignUpForm!: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;

  isPasswordCorrect: boolean = true;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router){
  }

  ngOnInit(): void {
      this.userSignUpForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        email: ['',[Validators.required, Validators.email]],
        password: ['',Validators.required],
        confirmpassword: ['',Validators.required],
        city: [''],
        state: [''],
        address: [''],
        pin: ['']
      })
  }

  get firstName(): AbstractControl<any, any> | null{
    return this.userSignUpForm.get('firstName')
  }

  get email(): AbstractControl<any, any> | null{
    return this.userSignUpForm.get('email')
  }

  get password(): AbstractControl<any, any> | null{
    return this.userSignUpForm.get('password')
  }

  get confirmPassword(): AbstractControl<any, any> | null{
    return this.userSignUpForm.get('confirmpassword')
  }

  onSubmit(){
    console.log(this.isPasswordCorrect)
    if(this.confirmPassword?.value === this.password?.value){
      this.isPasswordCorrect = true;

      const user: user = {
        firstName: this.firstName?.value,
        lastName: this.userSignUpForm.get('lastName')?.value,
        address: this.userSignUpForm.get('address')?.value,
        city: this.userSignUpForm.get('city')?.value,
        state: this.userSignUpForm.get('state')?.value,
        pin: this.userSignUpForm.get('pin')?.value,
        email: this.userSignUpForm.get('email')?.value,
        password: this.userSignUpForm.get('password')?.value
      };
  
      this.userService.createUser(user)
      .subscribe({
        next: (result) => {
          if(result.message === 'success'){
            this.alertMessage = 'User created successfully';
            this.alertType = 0;
          }
          else if(result.message === 'Email already exists'){
            this.alertMessage = result.message;
            this.alertType = 1
          }
        },
        error: (error) => {
          this.alertMessage = error.message;
          this.alertType = 2;
        }
      });

      setTimeout(() => {
        this.router.navigate(['home/login'])
      },2000)
    }
    else if(this.confirmPassword?.value !== this.password?.value){
      this.isPasswordCorrect = false;
    }
  }
}

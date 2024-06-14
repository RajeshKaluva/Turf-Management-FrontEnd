import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string;
  email: string;
  address: string;
  password: string;
  errorMessage: string;
  users: any[];
 
  constructor(private globalService: GlobalService, private router: Router) {}
 
  submitForm() {
    if (this.isEmailValid() && this.isPasswordValid()) {
      this.globalService.getUsers().subscribe(
        (data: any) => {
          let isEmailExists = false;
          for (const user of data) {
            if (user.email === this.email) {
              isEmailExists = true;
              break;
            }
          }
          if (isEmailExists) {
            Swal.fire({
              icon: 'error',
              title: 'Email already exists',
              showConfirmButton: false,
              timer: 3000
            });
          } else {
            const userData = {
              userName: this.username,
              email: this.email,
              address: this.address,
              password: this.password
            };
            this.globalService.postUser(userData).subscribe(
              (res: any) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Successfully registered!',
                  text: 'Redirecting to login page',
                  showConfirmButton: false,
                  timer: 3000
                }).then(() => {
                  this.router.navigate(['/']);
                });
              },
              (error) => {
                this.errorMessage = 'An error occurred. Please try again later.';
                Swal.fire({
                  icon: 'error',
                  title: this.errorMessage,
                  showConfirmButton: false,
                  timer: 3000
                });
              }
            );
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred. Please try again later.';
          Swal.fire({
            icon: 'error',
            title: this.errorMessage,
            showConfirmButton: false,
            timer: 3000
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid email or password',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
 
  isEmailValid(): boolean {
    return this.email.endsWith('@gmail.com');
  }
 
  isPasswordValid(): boolean {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/g.test(this.password);
    const hasNumber = /\d/.test(this.password);
    return this.password.length >= 6 && hasSpecialChar && hasNumber;
  }
}
 
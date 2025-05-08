import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  showPassword = false;

  showToast = false;
  toastMessage = '';
  toastClass = 'bg-success text-white';

  constructor(
    private fb: FormBuilder,
    private loginService: FormAPIsService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      in: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
  
    this.loading = true;
  
    this.loginService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('authToken', res.token);
  
        localStorage.setItem('firstName', res.user.fn);
        localStorage.setItem('lastName', res.user.ln);
        localStorage.setItem('userRole', res.user.roles);
        localStorage.setItem('userId', res.user.id.toString());
  
        this.showToastMessage(res.message || 'User login successfully!', 'success');
  
        if (res.user.roles === 'user') {
          this.router.navigate(['/userHome'], { replaceUrl: true });  // replaceUrl lagaya (back press safe)
        } else if (res.user.roles === 'admin') {
          this.router.navigate(['/AllRecord'], { replaceUrl: true }); // replaceUrl lagaya (back press safe)
        } else {
          this.router.navigate(['/'], { replaceUrl: true });
        }
  
        this.loading = false;
      },
  
      error: (err) => {
        const errorMessage = err.error?.message || 'Login failed, please enter valid credentials';
        this.showToastMessage(errorMessage, 'error');
  
        this.loading = false;
  
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    });
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastClass = type === 'success' ? 'bg-success text-white' : 'bg-danger text-white';
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

}

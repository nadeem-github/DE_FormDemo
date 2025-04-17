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
    this.errorMessage = null;

    this.loginService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.user.id);
        console.log('Login successful:', res.user.id);
        
        this.router.navigate(['/AllRecord']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed, please enter valid credentials';
        this.loading = false;
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    });
  }
}

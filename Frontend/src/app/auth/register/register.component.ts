import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  loading = false;

  showToast = false;
  toastMessage = '';
  toastClass = 'bg-success text-white';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private registerService: FormAPIsService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        ]
      ],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;

    const payload = {
      fn: this.registerForm.value.firstName,
      ln: this.registerForm.value.lastName,
      in: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.registerService.register(payload).subscribe({
      next: (res) => {
        this.showToastMessage(res.message || 'User registered successfully!', 'success');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Registration failed.';
        this.showToastMessage(errorMessage, 'error');
      
        if (errorMessage.toLowerCase().includes('already exists')) {
          this.registerForm.get('email')?.setErrors({ duplicate: true });
        }
      
        this.loading = false;
      }
      
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastClass = type === 'success' ? 'bg-success text-white' : 'bg-danger text-white';
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}

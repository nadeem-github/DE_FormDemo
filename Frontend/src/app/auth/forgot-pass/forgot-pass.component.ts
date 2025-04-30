import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {

  step = 1;
  emailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';

  showPassword = false;
  showConfirmPassword = false;

  isSendingOtp = false;
  isVerifyingOtp = false;
  isResettingPassword = false;

  constructor(private fb: FormBuilder, private authService: FormAPIsService, private router: Router) {
    this.emailForm = this.fb.group({
      in: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  showNotification(message: string, type: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  onSendOtp() {
    if (this.emailForm.invalid) return;
    this.isSendingOtp = true;
    const email = this.emailForm.value.in;

    this.authService.sendOtp(email).subscribe({
      next: () => {
        this.showNotification('OTP sent successfully!', 'success');
        this.step = 2;
        this.isSendingOtp = false;
      },
      error: () => {
        this.showNotification('Failed to send OTP', 'danger');
        this.isSendingOtp = false;
      }
    });
  }

  onVerifyOtp() {
    if (this.otpForm.invalid) return;
    this.isVerifyingOtp = true;

    const { otp } = this.otpForm.value;
    const email = this.emailForm.value.in;

    this.authService.verifyOtp(email, otp).subscribe({
      next: () => {
        this.showNotification('OTP verified!', 'success');
        this.step = 3;
        this.isVerifyingOtp = false;
      },
      error: () => {
        this.showNotification('Incorrect OTP', 'danger');
        this.isVerifyingOtp = false;
      }
    });
  }

  onResetPassword() {
    if (this.passwordForm.invalid) return;

    const { password, confirmPassword } = this.passwordForm.value;
    if (password !== confirmPassword) {
      this.showNotification('Passwords do not match', 'danger');
      return;
    }

    this.isResettingPassword = true;
    const email = this.emailForm.value.in;

    this.authService.resetPassword(email, password).subscribe({
      next: () => {
        this.showNotification('Password reset successfully!', 'success');
        this.emailForm.reset();
        this.otpForm.reset();
        this.passwordForm.reset();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: () => {
        this.showNotification('Error updating password', 'danger');
      },
      complete: () => {
        this.isResettingPassword = false;
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }



}

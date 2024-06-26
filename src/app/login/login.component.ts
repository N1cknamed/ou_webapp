import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule], // Import HttpClientModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { // Inject HttpClient
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Use email instead of username
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; // Use email
      this.http.post('https://localhost:8000/api/login', { email, password }) // Correct URL and payload
        .subscribe({
          next: (response) => {
            console.log(response);
            // Handle successful login here (e.g., navigate to another page, store the token)
          },
          error: (error) => {
            console.error('Login failed:', error);
            // Handle login error here (e.g., show an error message)
          }
        });
    }
  }
}
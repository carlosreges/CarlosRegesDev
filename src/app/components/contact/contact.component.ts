import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private readonly formspreeEndpoint = environment.formspreeEndpoint;

  contactForm!: FormGroup;
  submitted = false;
  success = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  // Getter para un acceso fácil a los campos del formulario en el template HTML
  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.success = false;
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      return;
    }

    this.isLoading = true;

    const headers = new HttpHeaders({ Accept: 'application/json' });
    const payload = {
      ...this.contactForm.value,
      source: 'Portfolio Carlos Reges'
    };

    this.http.post(this.formspreeEndpoint, payload, { headers }).subscribe({
      next: () => this.handleSuccess(),
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'No pude enviar el mensaje. Intenta nuevamente o escríbeme por email.';
      }
    });
  }

  private handleSuccess() {
    this.success = true;
    this.isLoading = false;
    this.contactForm.reset();
    this.submitted = false;

    setTimeout(() => {
      this.success = false;
    }, 5000);
  }
}


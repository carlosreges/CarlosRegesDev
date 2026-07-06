import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  success = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter para un acceso fácil a los campos del formulario en el template HTML
  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Si deseas usar el servicio para enviar los datos:
    // this.emailService.sendEmail(this.contactForm.value).subscribe({
    //   next: () => this.handleSuccess(),
    //   error: (err) => console.error('Error enviando el mensaje', err)
    // });

    // Por ahora manejamos la UI como ya lo hacías
    this.success = true;
    this.isLoading = false;
    setTimeout(() => {
      this.contactForm.reset();
      this.submitted = false;
      this.success = false;
    }, 5000);
  }
}

import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import emailjs from 'emailjs-com';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'tu_service_id';
  private templateId = 'tu_template_id';
  private userId = 'tu_user_id';

  constructor() {
    emailjs.init(this.userId);
  }

  sendEmail(data: any): Observable<any> {
    const templateParams = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    };

    return from(emailjs.send(this.serviceId, this.templateId, templateParams));
  }
}

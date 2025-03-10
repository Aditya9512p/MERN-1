import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactData: ContactData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  errorMessage = '';

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.errorMessage = '';

    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        // Here you would typically make an API call to your backend
        console.log('Form submitted:', this.contactData);
        
        // Simulate successful submission
        this.submitSuccess = true;
        this.resetForm();
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
      } catch (error) {
        this.errorMessage = 'An error occurred while submitting the form. Please try again.';
        console.error('Form submission error:', error);
      } finally {
        this.isSubmitting = false;
      }
    }, 1000); // Simulate network delay
  }

  private resetForm() {
    this.contactData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }

  // Validation methods
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phone === '' || phoneRegex.test(phone);
  }

  isFormValid(): boolean {
    return (
      this.contactData.name.length >= 3 &&
      this.validateEmail(this.contactData.email) &&
      this.validatePhone(this.contactData.phone) &&
      this.contactData.subject !== '' &&
      this.contactData.message.length >= 10
    );
  }
}

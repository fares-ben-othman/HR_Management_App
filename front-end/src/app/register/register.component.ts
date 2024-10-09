import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    nom: '',
    poste: '',
    departement: '',
    email: '',
    date_d_embauche: '',
    mot_de_passe: '',
    confirm_mot_de_passe: '',
    agree_terms: false,
  };
  selectedFile: File | null = null;

  constructor(private authService: AuthentificationService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    // Check if the user agreed to the terms and conditions
    if (!this.user.agree_terms) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms and Conditions',
        text: 'You must agree to the terms of service and privacy policy to register.',
      });
      return;
    }

    // Check if passwords match
    if (this.user.mot_de_passe !== this.user.confirm_mot_de_passe) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please check and try again.',
      });
      return;
    }

    // Proceed with registration if everything is valid
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', this.selectedFile);
      formData.append('nom', this.user.nom);
      formData.append('poste', this.user.poste);
      formData.append('departement', this.user.departement);
      formData.append('email', this.user.email);
      formData.append('date_d_embauche', this.user.date_d_embauche);
      formData.append('mot_de_passe', this.user.mot_de_passe);

      this.authService.register(formData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You have successfully registered. Please log in.',
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'An error occurred during registration. Please try again later.',
          });
          console.error('Registration failed', error);
        }
      );
    }
  }
}


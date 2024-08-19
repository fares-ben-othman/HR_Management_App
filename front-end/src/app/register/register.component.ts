import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

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
    agree_terms: false
  };

  constructor(public authService: AuthentificationService, private router: Router) { }

  onSubmit() {
    if (this.user.mot_de_passe !== this.user.confirm_mot_de_passe) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    if (!this.user.agree_terms) {
      alert('You must agree to the terms and confidentiality policy.');
      return;
    }

    this.authService.register(this.user).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.router.navigate(['']);
      },
      error => {
        console.log('Registration failed', error);
      }
    );
  }
}

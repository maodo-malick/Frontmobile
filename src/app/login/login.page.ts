import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../user/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  // tslint:disable-next-line:variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'l\'email est obligatoire' },
      { type: 'pattern', message: ' Votre email doit  contenir des caracteres speciaux , lettre et chiffre.' },
    ],
    password: [
      { type: 'required', message: 'Le mot de passe est obligatoire' },
      { type: 'minlength', message: 'Le  mot de pass doit contenir au moins   5 caractères.' },
    ],

  };
  constructor( private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    }
    this.authService.loginUser(this.ionicForm.value).subscribe( (data): any => {
      });
    }
}

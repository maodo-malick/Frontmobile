import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import {CalculeFraisService} from '../user/calcule-frais.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-calculateur-frais',
  templateUrl: './calculateur-frais.page.html',
  styleUrls: ['./calculateur-frais.page.scss'],
})
export class CalculateurFraisPage implements OnInit {
  CalculeForm = FormGroup;
  isSubmitted = false;
  current = '';
  tarif: any;
  vlue: any;

  // tslint:disable-next-line:max-line-length
  constructor(public alertController: AlertController, private calculeFraisService: CalculeFraisService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // @ts-ignore
    // this.getFrais();
    // @ts-ignore
    this.CalculeForm = this.formBuilder.group({
      montant: ['', [Validators.required]]  });



  }
   async showAlert(vlue ) {
    const alert = await this.alertController.create({
      header: 'Calculateur',
      subHeader: 'Pour un montant de ' + `${this.current} FCFA`,
     message: 'les frais s\'élève à:' +  `${vlue} FCFA`,
    buttons: ['OK']
     });

    await alert.present();
   }
   getVal(Val)
   {
     this.current = Val;
   }
   // getFrais() {
   //   this.isSubmitted = true;
   //   // @ts-ignore
   //   if (!this.CalculeForm.valid) {
   //     console.log('Please provide all the required values!');
   //     return false;
   //   }
   //   // @ts-ignore
   // }
   getFrais()
   {
     // @ts-ignore
     // console.log(this.CalculeForm.value.);
     // @ts-ignore
     this.calculeFraisService.calcul(this.CalculeForm.value).subscribe(data => {
      // @ts-ignore
      //  console.log(data);
       this.tarif = data;
       // vlue = this.tarif;
       // console.log(this.vlue);
       // console.log(this.tarif);
       // @ts-ignore
       this.showAlert(this.tarif);
     });

   }
}

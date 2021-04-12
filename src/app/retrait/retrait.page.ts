import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RetraitService} from '../user/retrait-service';
import {Transaction} from '../transaction/transaction-module';
import {Customer} from '../transaction/model-customer';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
segmentModel: string;
entry = true;
// @ts-ignore
  transaction: Transaction  = [];
  // @ts-ignore
  customer: Customer = [];
  cniEntry: FormGroup;
codeEntry: FormGroup;

  beneficiaire: any;
  telephone: any;
  cni: any;
  montant: any;
  emmetteur: any;
  tel: any;
  constructor(private retraitService: RetraitService, private formBuilder: FormBuilder,  private alertController: AlertController) { }

  ngOnInit() {
    this.segmentModel = 'beneficiaire';
    this.codeEntry = this.formBuilder.group({
      // cni: ['', [Validators.required, Validators.minLength(12)]],
      code: ['', [Validators.required]],
    });
    this.cniEntry = this.formBuilder.group({
      cni: ['', [Validators.required, Validators.minLength(12)]],
    });
  }
 basculer()
 {
   this.segmentModel = 'emetteur';
 }
 // getTransact()
 // {
 //   const code = {
 //     codeTransaction: this.codeEntry.value.code
 //   };
 //   return this.retraitService.transact(code).subscribe(data => {
 //     console.log(data);
 //
 //   });
 // }
 searchDepot()
 {
   const code = {
     codeTransaction: this.codeEntry.value.code
   };
   return this.retraitService.transact(code).subscribe(data => {
     // console.log(data);
    // @ts-ignore
     this.transaction = data;
     // @ts-ignore
     this.customer = data.customer;
     console.log(this.customer);
   });
 }

  getMoney()
  {
    const dataEntry = {
      codeTransaction: this.codeEntry.value.code,
      cniBeneficiaire: this.cniEntry.value.cni
    };
    // @ts-ignore
    return this.retraitService.retrait(dataEntry).subscribe(data => {

    });
  }
  async AlertRetrait( ) {
    this.beneficiaire = this.customer.nomBeneficiaire;
    this.telephone = this.customer.telephonBeneficiaire;
    this.cni = this.cniEntry.value.cni;
    this.montant = this.transaction.montant;
    this.emmetteur = this.customer.nomComplet;
    this.tel = this.customer.telephon;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Béneficiaire<br>' +  `${this.beneficiaire}<br> ` + 'Télépone<br>' + `${this.telephone}<br> ` + 'N°CNI<br>' + `${this.cni}<br><br> ` +
        'Montant à Reçevoir<br>' + `${this.montant}FCFA<br> ` + 'Émetteur<br>' + `${this.emmetteur}<br> ` + 'Téléphone<br>' + `${this.tel}<br> `,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmer',
          cssClass: 'Warning',
          handler: () => {
            this.getMoney();
          }
        }
      ]
    });

    await alert.present();
  }
}

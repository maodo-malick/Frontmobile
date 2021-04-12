import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepotService} from '../user/depot.service';
import {CalculeFraisService} from '../user/calcule-frais.service';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor( private formBuilder: FormBuilder, private depotService: DepotService, private caculeFraisService: CalculeFraisService, private alertController: AlertController) { }
  transaction: FormGroup;
  segmentModel: string;
  frais: any;
  total: any;
  tarif: any;
  amount: any;
  emetteur: any;
  telephone: any;
  cni: any;
  montant: any;
  recepteur: any;
  tel: any;
  now = new Date();

  ngOnInit() {
    this.segmentModel = 'emetteur';
    // @ts-ignore
    this.transaction = this.formBuilder.group({
      cni: ['', [Validators.required, Validators.minLength(12)]],
      telephon: ['', [Validators.required, Validators.minLength(9)]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
      completName: ['', [Validators.required, Validators.maxLength(25)]],
      montant: ['', [ Validators.min(1000)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      total: ['', [ Validators.minLength(3)]],
    });
  }
  getVal()
  {
    const test = {
      montant: this.transaction.value.montant
    };
    // console.log(test);
    this.caculeFraisService.calcul(test).subscribe(data => {
      this.frais = data;
      console.log(this.frais);
      this.total = this.transaction.value.montant + this.frais;
      // console.log(Val);
      // console.log(this.frais);
    });
  }
change()
 {
   return this.segmentModel = 'beneficiaire';
 }

   getEntry()
   {
  //   const teste = {
  //     montant: this.transaction.value.total,
  //   };
  //   this.caculeFraisService.calcul(teste).subscribe(data => {
  //     this.tarif = data;
  //     this.amount = this.transaction.value.total - this.tarif;
  //     // console.log(this.amount);
  //     // console.log(this)
  //   });
   }


  faireDepot()
 {
   const transact = {
     montant: this.transaction.value.montant,
     customer: {
       nomComplet: this.transaction.value.completName,
       CNI: this.transaction.value.cni,
       telephon: this.transaction.value.telephon,
       nomBeneficiaire: this.transaction.value.name,
       telephonBeneficiaire: this.transaction.value.phone
     }
     };
   // console.log(transact);
   this.depotService.Deposer(transact).subscribe(data => {
        // console.log('Ajouter avec success');
     // return data.codeTransaction;
     this.Transfert(data);
    });
 }
  async AlertDepot() {
    this.emetteur = this.transaction.value.completName;
    this.telephone = this.transaction.value.telephon;
    this.cni = this.transaction.value.cni;
    this. montant = this.transaction.value.montant;
    this.recepteur = this.transaction.value.name;
    this.tel = this.transaction.value.phone;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Emetteur<br>' +  `${this.emetteur}<br> ` + 'Télépone<br>' + `${this.telephone}<br> ` + 'N°CNI<br>' + `${this.cni}<br> ` +
        'Montant Envoyer<br>' + `${this.montant}FCFA<br> ` + 'Recepteur<br>' + `${this.recepteur}<br> ` + 'Téléphone<br>' + `${this.tel}<br> `,
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
            this.faireDepot();
          }
        }
      ]
    });

    await alert.present();
  }
  async Transfert(code) {
    this.emetteur = this.transaction.value.completName;
    this.telephone = this.transaction.value.telephon;
    this.cni = this.transaction.value.cni;
    this. montant = this.transaction.value.montant;
    this.recepteur = this.transaction.value.name;
    this.tel = this.transaction.value.phone;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Transfer réussie',
      message: 'INFOS<br>' + 'Vous avez Envoyé<br>' +  `${this.montant}FCFA à<br> `
          + `${this.recepteur}<br> ` + 'le' + `${this.now}<br><br>` + 'Code de Transaction<br>' + `${code}` ,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SMS',
          cssClass: 'Warning',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }
}

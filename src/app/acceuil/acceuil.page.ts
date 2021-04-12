import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {GetAccount} from '../user/get-account';
import {Account} from '../user/account-model';
import {DepotService} from '../user/depot.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {

  constructor(private menu: MenuController, private getAccount: GetAccount, private depotService: DepotService) { }
// @ts-ignore
  account: Account  = [];
  date: any;
  ngOnInit() {
    this.getSolde();
    this.getUpdate();
  }
  openMenu() {
    // this.menu.toggle();
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

 logout()
 {
   localStorage.clear();
 }
 getSolde()
 {
   this.getAccount.Account().subscribe(data => {
     // @ts-ignore
     this.account = data;
     // console.log(this.account.dateUpdated);
   });
 }
getUpdate()
{
  this.depotService.getDateUpdate().subscribe(resp => {
    this.date = resp;
    console.log(this.date);
  });
}
}

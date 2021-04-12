import { Component, OnInit } from '@angular/core';
import {TransactDeed} from '../user/transactDeed-model';
import {TransactService} from '../user/Transact-service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  // @ts-ignore
  transactDeed: TransactDeed [] = [];
  constructor(private transactService: TransactService ) { }

  ngOnInit() {
    this.Transact();
  }
Transact()
{
  return this.transactService.myTransact().subscribe(resp => {
    // @ts-ignore
    this.transactDeed = resp ;
    console.log(this.transactDeed);
  });
}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculateurFraisPageRoutingModule } from './calculateur-frais-routing.module';

import { CalculateurFraisPage } from './calculateur-frais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculateurFraisPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CalculateurFraisPage]
})
export class CalculateurFraisPageModule {}

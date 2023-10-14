import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SettingsPageModule } from './../settings/settings.module';
import { HomePageRoutingModule } from './home-routing.module';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule,
    QrCodeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }

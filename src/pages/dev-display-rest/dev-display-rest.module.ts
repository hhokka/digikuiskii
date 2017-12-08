import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevDisplayRestPage } from './dev-display-rest';

@NgModule({
  declarations: [
    DevDisplayRestPage,
  ],
  imports: [
    IonicPageModule.forChild(DevDisplayRestPage),
  ],
})
export class DevDisplayRestPageModule {}

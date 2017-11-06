import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Db_manipulatePage } from './db_manipulate';

@NgModule({
  declarations: [
    Db_manipulatePage,
  ],
  imports: [
    IonicPageModule.forChild(Db_manipulatePage),
  ],
})
export class Db_manipulatePageModule {}

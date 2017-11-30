import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DbManipulatePage } from './dbmanipulate';

@NgModule({
  declarations: [
    DbManipulatePage,
  ],
  imports: [
    IonicPageModule.forChild(DbManipulatePage),
  ],
})
export class Db_manipulatePageModule {}

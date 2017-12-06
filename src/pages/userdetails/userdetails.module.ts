import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserdetailsPage } from './userdetails';

@NgModule({
  declarations: [
    UserdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserdetailsPage),
  ],
})
export class UserdetailsPageModule {}

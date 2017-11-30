import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { History } from '../../shared/history';
import { HistoryProvider } from '../../providers/history/history';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';
import { IonicPage, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import * as firebase from 'firebase';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dbmanipulate',
  templateUrl: 'dbmanipulate.html',
})

export class DbManipulatePage implements OnInit {

  promotion: Promotion;
  leader: Leader;
  leaders: Leader[];
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;
  history: History;
  myPerson = {};

  constructor(public navCtrl: NavController,

    private promotionservice: PromotionProvider,
    private leaderservice: LeaderProvider,
    @Inject('BaseURL') private BaseURL) {

  }



  ngOnInit() {

    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
      errmess => this.promoErrMess = <any>errmess);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
      errmess => this.leaderErrMess = <any>errmess);
    this.leaderservice.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
      errmess => this.leaderErrMess = <any>errmess);

  }
  createPerson(firstName: string, lastName: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/Data/`);
    personRef.set({
      firstName,
      lastName
    })
  }

  updatePerson(firstName: string, lastName: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/Data/`);
    personRef.update({
      firstName,
      lastName
    })
  }

  deletePerson(): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/Data/`);
    personRef.remove()
  }
  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref(`Data`);
    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
  }


}

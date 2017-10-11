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
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})

export class AboutPage implements OnInit {

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
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.set({
      firstName,
      lastName
    })
  }

  updatePerson(firstName: string, lastName: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.update({
      firstName,
      lastName
    })
  }

  deletePerson(): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.remove()
  }
  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
  }


}

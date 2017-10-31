import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

export class EmailValidator {

    public loginForm: FormGroup;
    public loading: Loading;
    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, 
        public authProvider: AuthProvider, 
        public formBuilder: FormBuilder
      ) {
          this.loginForm = formBuilder.group({
            email: ['', 
            Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', 
            Validators.compose([Validators.minLength(6), Validators.required])]
          });
      }

  static isValid(control: FormControl){
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    .test(control.value);

    if (re){
      return null;
    }

    return {
      "invalidEmail": true
    };
  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, 
        this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  goToSignup(): void { 
    this.navCtrl.push('SignupPage'); 
  }
  
  goToResetPassword(): void { 
    this.navCtrl.push('ResetPasswordPage'); 
  }
}
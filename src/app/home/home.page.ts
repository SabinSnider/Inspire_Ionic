import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = null;
  ionicForm: any;

  titleName: any;
  titleList: any = [];

  description: any;
  descriptionList: any = [];

  constructor(
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize(); //Initialzation of Google Authentication
    }
  }
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  //For Validation of Input field
  get errorControl() {
    return this.ionicForm.controls;
  }
  //Google Sign in and Sign Out
  async signIn() {
    this.user = await GoogleAuth.signIn();
    console.log('user: ', this.user);
  }

  async signOut() {
    await GoogleAuth.signOut();
    this.user = null;
  }

  //Method to add Description
  addDescription() {
    if (this.description.length > 0) {
      let name = this.description;
      this.descriptionList.push(name);
      this.description = '';
    }
  }
  //Delete and Update the Description
  deleteDescription(index: any) {
    this.descriptionList.splice(index, 1);
  }

  async updateDescription(index: any) {
    let alert = await this.alertCtrl.create({
      message: 'Type in your new descrition.',
      inputs: [{ name: 'editDescription', placeholder: 'Enter' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Update',
          handler: (data) => {
            this.descriptionList[index] = data.editDescription;
          },
        },
      ],
    });
    await alert.present();
  }

  //Method to add Title

  addTitle() {
    if (this.titleName.length > 0) {
      let name = this.titleName;
      this.titleList.push(name);
      this.titleName = '';
    }
  }
  // Delete and Update Title method
  deleteTitle(index: any) {
    this.titleList.splice(index, 1);
  }

  async updateTitle(index: any) {
    let alert = await this.alertCtrl.create({
      message: 'Type in your new title to update.',
      inputs: [{ name: 'editTitle', placeholder: 'Enter' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Update',
          handler: (data) => {
            this.titleList[index] = data.editTitle;
          },
        },
      ],
    });
    await alert.present(); // displays Alert
  }
}

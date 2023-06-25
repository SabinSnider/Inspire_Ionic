import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = null;
  ionicForm: any;
  picture: string | undefined;
  pictureList: any = [];

  titleName!: String;
  titleList: any = [];

  description!: String;
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

  //Get Picture
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });
    this.picture = image.dataUrl;
  }
  //Method to add pictures in list
  addPicture() {
    let image = this.picture;
    this.pictureList.push(image);
    this.picture = '';
  }
  //To delete picture
  deletePicture(index: any) {
    this.pictureList.splice(index, 1); //removes one element from list
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
    this.descriptionList.splice(index, 1); //removes one element from list
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
    this.titleList.splice(index, 1); //removes one element from list
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

  submitForm = () => {
    if (this.ionicForm.valid) {
      if (this.titleName.length > 0 && this.description.length > 0) {
        let name = this.titleName;
        this.titleList.push(name);
        this.titleName = '';

        let detail = this.description;
        this.descriptionList.push(detail);
        this.description = '';

        let image = this.picture;
        this.pictureList.push(image);
        this.picture = '';
      }

      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  };
}

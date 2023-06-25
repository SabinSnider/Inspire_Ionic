import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  picture: string | undefined;
  pictureList: any = [];

  constructor(public alertCtrl: AlertController) {}

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });
    this.picture = image.dataUrl;
  }

  addPicture() {
    let image = this.picture;
    this.pictureList.push(image);
    this.picture = '';
  }

  deletePicture(index: any) {
    this.pictureList.splice(index, 1); //removes one element from list
  }
}

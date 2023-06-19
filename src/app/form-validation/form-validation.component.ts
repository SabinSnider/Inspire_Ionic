import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
})
export class FormValidationComponent implements OnInit {
  ionicForm: any;
  public alertButtons = ['OK'];

  constructor(
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm = () => {
    if (this.ionicForm.valid) {
      console.log(this.ionicForm.value);
      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  };
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  editorConfig!: any;
  title!: string;
  content!: string;
  @Output('postCreated') postCreated = new EventEmitter();

  // config: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '15rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  // };

  constructor() {
    this.editorConfig = {
      "editable": true,
      "spellCheck": true
    }
   }

  ngOnInit(): void {
  }

  createPost() {
    
    firebase
      .firestore()
      .collection("posts")
      .add({
        title: this.title,
        content: this.content,
        owner: firebase.auth().currentUser.uid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((data) => {
        console.log(data);
        this.postCreated.emit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

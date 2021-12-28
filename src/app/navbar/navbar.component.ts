import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc 
} from '@angular/fire/firestore';
import { where,query, getDocs } from '@firebase/firestore';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userData:any
 userInfo:any
 name:any;
 items:any
 isLogged:boolean=false
 horizontalPosition: MatSnackBarHorizontalPosition = 'end';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private _snackBar: MatSnackBar,private db: Firestore,private authService: AuthService,private router : Router) {
    
  }
  openSnackBar() {
    this._snackBar.open('check your products!!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });}

  ngOnInit(): void {
    // this.openSnackBar();
 if (this.authService.isLoggedIn()) {
        this.userData=this.authService.getuser();
        console.log(this.userData.email);
        this.name="wellcome back"+this.userData.email;
          this.isLogged=true;
          const data=query(collection(this.db,'users'),where("email","==",this.userData.email));
          collectionData(data).subscribe(data=>{
            this.userInfo=data[0];
            console.log( data[0])
            const dataCollection = query(collection(this.db, 'items'),where("provider_id","==", data[0].id));
            collectionData(dataCollection).subscribe(data=>{
              this.items=data;
              for(let i in data){
                
                if(this.items[i].quantaty==0){
                  this.openSnackBar();
                } 
              }
            });
          }) 
          // window.location.href;
       } else {
        this.userInfo=[]; 
        // window.location.href;
       }
       
    //    let curl=this.router.url;
    //  this.router.navigateByUrl('/RefreshComponent',{skipLocationChange:true}).then(()=>{
    //   this.router.navigate([curl])
    //  });
      // this.ngOnInit;
  
  }
  login(){
    this.router.navigate([`login`]);
  }
  register(){
    this.router.navigate([`register`]);
  }
  onclick(){
    this.authService.signOut();
  }
  onclick2(){
    this.router.navigate([`admin-dashboard`]);
  }
 
}

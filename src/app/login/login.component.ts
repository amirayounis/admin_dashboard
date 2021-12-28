import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalid:any
  moviesForm=new FormGroup({
   
    password:new FormControl
    ("",[Validators.required]),
    email:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]),
   
    
  },
  // {
  //   validator:ConfirmedValidator('password', 'conpassword')
  // }

  )

  ;
 
  

  

  get moviesFormControls() {
    return this.moviesForm.controls;
  }

  constructor(private fb: FormBuilder ,private router : Router ,private authService: AuthService){
    
  }
  submitReactiveForm(email:any,password:any) {
    const z=this.authService.emailLogin(email,password);
    z.then(value =>{
      console.log("yeeeeeeeeees");
      this.router.navigate(['admin-dashboard']) .then(() => {
        window.location.reload();
      });
      }).catch(error=>{
       this.invalid=error.massage;
       if(error.message=="Firebase: Error (auth/user-not-found)."){
         this.invalid="this email doesn't exsist";
       }else if(error.message=="Firebase: Error (auth/wrong-password)."){
         this.invalid="the password is wrong"; 
       }
       console.log(error.message);
     });      
  }
  onclick(){
-    this.router.navigate([`login-register`]);
  }
}

import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  signOut,
  signInWithPopup,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  OAuthProvider,
  User,
  getAuth,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules, r3JitTypeSourceSpan } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User | null> | undefined;
   userData:any;
//  isLoggedIn:boolean=true;
  
  constructor(
    private auth: Auth,
    private router : Router ,
  ) {    
    this.user$ = user(auth);
    this.auth.onAuthStateChanged(user=>{
      if(user){
        // this.isLoggedIn=true;
        this.userData=user;
        localStorage.setItem('user',JSON.stringify(this.userData));
      }else{
        localStorage.setItem('user', ""); 
      }
    })
    
  }
  isLoggedIn(){
    const user=localStorage.getItem('user');
    if(user !==""){
     console.log( this.auth.currentUser);
      return true;
    }else{
      console.log("whathappend")
      return false;
    }
  }
  
  async emailLogin(email: string, password: string)
  : Promise<any> {

    return await signInWithEmailAndPassword(this.auth, email, password);
  
  }
  async emailSignUp(email: string, password: string)
: Promise<void> { 
  const credential = await createUserWithEmailAndPassword(
    this.auth,
    email,
    password
  );
  await updateProfile(
    credential.user, { displayName: credential.user.displayName }
  );
  await sendEmailVerification(credential.user);
  
}

async resetPassword(email: string): Promise<any> {

  // sends reset password email
  await sendPasswordResetEmail(this.auth, email);
  
}

async oAuthLogin(p: string): Promise<void> {

  // get provider, sign in
  const provider = new OAuthProvider(p);
  const credential = await signInWithPopup(this.auth, provider);
  const additionalInfo = getAdditionalUserInfo(credential);

  // create user in db
  if (additionalInfo?.isNewUser) {
    
  }
  
  }
  getuser(){
        
    return JSON.parse(window.localStorage.getItem('user')!);
  }
  async  signOut() {

    signOut(this.auth).then(()=>{
      // this.isLoggedIn=false;
      localStorage.removeItem('user')
      window.location.reload();
      this.router.navigate([''])
    })
    
  }
}
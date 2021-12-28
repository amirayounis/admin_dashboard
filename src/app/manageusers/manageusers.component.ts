import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { StorageService } from './../storage.service';

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
import { FileUpload } from 'src/app/models/file-upload.model';
import { user } from '@angular/fire/auth';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  selectedFiles ?: FileList;
 currentFileUpload?: FileUpload;   
 userData:any
 userInfo:any
 userName:any
 product:any
 models:[{name:string,id:string,brand_id:string}]=[{name:"",id:"",brand_id:""}]
 my:[{name:string,id:string,brand_id:string}]=[{name:"",id:"",brand_id:""}]
 brands:[{name:string,id:string}]=[{name:"",id:""}]
 isAddMode:boolean=true;
 moviesForm=new FormGroup({
   
  // itemid:new FormControl
  // ("",[Validators.required]),
  namee:new FormControl("",[Validators.required]),
  category:new FormControl("",[Validators.required]),
  lifetime:new FormControl("",[Validators.required]),
  price:new FormControl("",[Validators.required]),
  carmodelid:new FormControl("",[Validators.required]),
  brandid:new FormControl("",[Validators.required]), 
  num:new FormControl("",[Validators.required]),  
  image:new FormControl("",[Validators.required]),  
},


)

;
 
 get moviesFormControls() {
  return this.moviesForm.controls;
}

  constructor(private router : Router,private db: Firestore,private fb: FormBuilder,private authService: AuthService,private uploadService:StorageService,private route:ActivatedRoute) {
    
     this.product=this.route.snapshot.queryParams;
 if (this.product.name) {
   this.isAddMode=false;
      console.log( this.product);
    this.moviesForm.setValue({namee:this.product.name,category:this.product.category,lifetime:this.product.lifetime,num:this.product.quantaty,price:this.product.price,brandid:this.product.brand_id,carmodelid:this.product.carmodel_id,image:this.product.imag})
  }
      this.userData=this.authService.getuser();
    console.log(this.product);
    const data=query(collection(this.db,'users'),where("email","==",this.userData.email));
    collectionData(data).subscribe(data=>{
      this.userInfo=data[0];
      console.log(typeof data)}) 
      // console.log(this.userInfo);
      collectionData(collection(this.db,'car model')).subscribe(data=>{
        let i=0;
        for( let item in data){
        this.models[item]={name:data[item].name,id:data[item].id,brand_id:data[item].brand_id};
        
        console.log( this.models[item].name,item)  
        }
        if (this.isAddMode==false) {
          console.log(this.my)
          this.my=this.models
        }
      //  data.forEach(element => {
      //    this.models[i]=element
      //    console.log(typeof this.models[i])
      //    i++; 
      //  });
      });
      collectionData(collection(this.db,'brands')).subscribe(data=>{
        let i=0;
        for( let item in data){
        this.brands[item]={name:data[item].name,id:data[item].id};
        
        }
      });
   }

  ngOnInit(): void {
   
  }
  
onclick(){
  this.router.navigate([`admin-dashboard/manageproduct`]);
}
onclick2(){
  this.router.navigate([`admin-dashboard/managecustomers`]);
}
selectFile(event: any): void {
  this.selectedFiles = event.target.files;
}
submitReactiveForm(num:any,namee:any,category:any,lifetime:any,price:any,carmodelid:any) {
     console.log(this.moviesForm);
      let brand:string;
     for(let item in this.models){
       if(this.moviesForm.value["carmodelid"]==this.models[item].name)
       brand =this.models[item].brand_id;
      //  console.log(brand);
     }
     let x="";
     if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);

      const y=  this.uploadService.upload("imgs",Date.now().toString(),file);
      if(this.isAddMode==true){
        console.log(this.isAddMode);
        y.then(data=>{
          return data;}).then(test=>{
            console.log(brand)
            const myDoc=doc(collection(this.db, 'items'));
              setDoc(myDoc,{
                quantaty:parseInt(num) ,
                name: namee,
                category:category,
                lifetime:parseInt(lifetime),
                price:parseInt(price),
                carmodel_id:this.moviesForm.value["carmodelid"],
                brand_id:this.moviesForm.value["brandid"],
                provider_id:this.userInfo.id,
                id:myDoc.id,
                status:"pending",
                 imag:test
              });
              console.log(myDoc);
          });
            alert("the product added")
          
        }else{
          console.log(this.isAddMode);
        y.then(data=>{
          return data;}).then(test=>{
            const id=this.product.id;
          
              setDoc(doc(this.db,"items",id),{
                quantaty:parseInt(num),
                name: namee,
                category:category,
                lifetime:lifetime,
                price:parseFloat(price),
                carmodel_id:this.moviesForm.value["carmodelid"],
                brand_id:this.moviesForm.value["brandid"],
                provider_id:this.userInfo.id,
                id:id,
                status:"pending",
                 imag:test  
              },{merge:true});
            
     
            });
            alert("the Edit Done")
          
        }

    }
    
    }
    console.log("done");
  // this.router.navigate([`admin-dashboard/manageproduct`]);
}
change(e:any){
  // if(this.isAddMode==false){
  //   this.my.splice(0,this.my.length);
  // }
  // console.log(event);
  console.log(e.target.value);
  // function mine(item :any){
  //   return (item.brand_id==e.target.value);
  // }
  // this.models=this.models.filter(function(item){
  //   console.log(e.target.value);
  //   return item.brand_id==e.target.value;
  // });
  let j=0;
  for(let i in this.models){
    if(this.models[i].brand_id ==e.target.value){
      this.my[j]=this.models[i];
      j++;
    }
  }
  // this.models=this.my;
  console.log(this.my);
}

}

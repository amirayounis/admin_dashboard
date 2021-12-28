import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { where,query } from '@firebase/firestore';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc 
} from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {
  userData:any
  userInfo:any
  items:any
  $orders:any
  products:any
  cash:any
  rating:any
  constructor(private router : Router,private db: Firestore,private authService: AuthService) { 
    this.router.navigate([`admin-dashboard`]);
  
    this.userData=this.authService.getuser();
    console.log(this.userData.email);
    const data=query(collection(this.db,'users'),where("email","==",this.userData.email));
    collectionData(data).subscribe(data=>{
      this.userInfo=data[0];
      console.log( data[0])
      const dataCollection = query(collection(this.db, 'items'),where("provider_id","==", data[0].id));
      collectionData(dataCollection).subscribe(data=>{
        this.products=data;
        // for(let i in data){
        //   const dataCollection3 = query(collection(this.db, 'orders'),where("item_id","==", data[i].id));
        //   collectionData(dataCollection3).subscribe(data3=>{
        //    this.orders=data3.length;
        // }); } 
        console.log(this.products);
  });
  const dataCollection3 = query(collection(this.db, 'rating'),where("provider_id","==", data[0].id));
  collectionData(dataCollection3).subscribe(data=>{
   let sum=0;
   for(let j in data){
     sum=sum+data[j].rating
   }
   this.rating=sum/5;
});
  const dataCollection2 = collection(this.db, 'orders');
  collectionData(dataCollection2).subscribe(data=>{
    this.items=data;
   console.log(data)
   const x=[];
   this.cash=0;
    for(let i in data){ 
      // console.log(data[i].cartItems[0].item); 
      console.log(data[i].cartItems)
      if(data[i].cartItems.length>0){
        for(let j=0;j<data[i].cartItems.length;j++){
      if(data[i].cartItems[j].providerId==this.userInfo.id){
       this.cash=this.cash+data[i].cartItems[j].item.price;
     x.push(data[i].cartItems[j].item);
     console.log(data[i].cartItems[j].item);  
    //  this.orders.push({id:'',
    //  name:this.items[i].cartItems[0].item.name
    //  ,number:this.items[i].cartItems[0].item.number
    //  ,isavilable:true,price:this.items[i].cartItems[0].item.price
    //  ,imag:this.items[i].cartItems[0].item.imag
    //  ,category:""
    //  ,quantaty:0
    // });
      // this.orders[j]=data[i].cartItems[0].item;
     }
    } 
    }

    }
    this.$orders=x;
      console.log(this.$orders );
    })
}) 
 
  }

  ngOnInit(): void {
    
  }
  onclick(){
    this.router.navigate([`admin-dashboard/manageuser`]);
  }
  onclick2(){
    this.router.navigate([`admin-dashboard/manageproduct`]);
  }
  onclick3(){
    this.router.navigate([`admin-dashboard/managecustomers`]);
  }
  onclick4(){
    this.router.navigate([`admin-dashboard/manageproduct`]);
  }
}

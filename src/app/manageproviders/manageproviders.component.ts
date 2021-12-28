import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import{MatTableDataSource}from '@angular/material/table';
import{MatPaginator}from '@angular/material/paginator';
import{MatSort}from '@angular/material/sort';


import {
  collection,
  Firestore,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc 
} from '@angular/fire/firestore';
import { where,query } from '@firebase/firestore';
@Component({
  selector: 'app-manageproviders',
  templateUrl: './manageproviders.component.html',
  styleUrls: ['./manageproviders.component.css']
})
export class ManageprovidersComponent implements OnInit {
  userData:any
  userInfo:any
  // items:[{name:string,isAvilable:boolean,number:number}]=[{name:"",isAvilable:true,number:0}]
  items:any
  // orders !:[{id:string,name:string,number:number,isavilable:boolean,imag:string,category:string,price:number,quantaty:number}]
   $orders:any
   displayedColumns=['name','category','price','quantity','image']
   dataSource!:MatTableDataSource<any>
   @ViewChild('paginator') paginator! :MatPaginator;
   @ViewChild(MatSort) matSort! :MatSort;
 
  constructor(private router : Router,private db: Firestore,private authService: AuthService) { 
    this.userData=this.authService.getuser();
    const data=query(collection(this.db,'users'),where("email","==",this.userData.email));
    collectionData(data).subscribe(data=>{
    this.userInfo=data[0];
    console.log( data[0])
    const dataCollection = collection(this.db, 'orders');
    collectionData(dataCollection).subscribe(data=>{
      this.items=data;
     console.log(data)
     const x=[];
      for(let i in data){ 
        // console.log(data[i].cartItems[0].item); 
        console.log(data[i].cartItems)
        if(data[i].cartItems.length>0){
          for(let j=0;j<data[i].cartItems.length;j++){
        if(data[i].cartItems[j].providerId==this.userInfo.id){
         
       x.push(data[i].cartItems[j]);
       this.dataSource=new MatTableDataSource(x);
       this.dataSource.paginator=this.paginator;
     this.dataSource.sort=this.matSort;

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
 delete(id:any){
  deleteDoc(doc(this.db , 'users' , id));
 }
 filterData(e:any){
  this.dataSource.filter=e.target.value;
}

}

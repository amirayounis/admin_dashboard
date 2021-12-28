import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import{MatTableModule}from '@angular/material/table';
import{MatTableDataSource}from '@angular/material/table';
import{MatPaginator}from '@angular/material/paginator';
import{MatSort}from '@angular/material/sort';
import{MatFormFieldModule}from '@angular/material/form-field';
import{MatInputModule}from '@angular/material/input';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc 
} from '@angular/fire/firestore';
import { where,query } from '@firebase/firestore';


@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.css']
})
export class ManageproductsComponent implements OnInit {
  displayedColumns=['name','category','lifetime in monthes'	,'price',	'quantaty',	'model','image'	,'Delete','Edit']
  dataSource!:MatTableDataSource<any>
userData:any
userInfo:any
items:any
models:any
id:any
// users:any
// items:Array<any>=[]
// providers:Array<any>=[]
providername:any;
@ViewChild('paginator') paginator! :MatPaginator;
@ViewChild(MatSort) matSort! :MatSort;
  constructor(private router : Router,private db: Firestore,private authService: AuthService) {
    this.userData=this.authService.getuser();
    console.log(this.userData.email);
    const data=query(collection(this.db,'users'),where("email","==",this.userData.email));
    collectionData(data).subscribe(data=>{
      this.userInfo=data[0];
      console.log( data[0])
      const dataCollection = query(collection(this.db, 'items'),where("provider_id","==", data[0].id));
      collectionData(dataCollection).subscribe(data=>{
        this.items=data;
        for(let i in data){
        collectionData(query(collection(this.db, 'car model'),where("id","==", data[i].carmodel_id))).subscribe(data=>{
           this.id=this.items[i].carmodel_id;
           console.log(this.id,i);
          this.items[i].carmodel=data[0].name; 
         console.log(data[0].name);
         this.dataSource=new MatTableDataSource(this.items);
         this.dataSource.paginator=this.paginator;
         this.dataSource.sort=this.matSort;
        }); } 
        console.log(this.items);
      });
    }) 
      

    //  console.log(this.userInfo);
  
  }
 
  ngOnInit(): void {
   

  
  }
  add(product:any){
    setDoc(doc(this.db,"items",product.id),{
      quantaty:parseInt(product.quantaty)+1 ,
      status:"accepted",
    },{merge:true});
  }
  filterData(e:any){
    this.dataSource.filter=e.target.value;
  }
  onclick(){
    this.router.navigate([`admin-dashboard/manageuser`]);
  }
  onclick2(){
    this.router.navigate([`admin-dashboard/managecustomers`]);
   
    
  }
  editProduct(product:any){
    product.carmodel_id=this.id;
    console.log(this.id);
    console.log(product);
   this.router.navigate([`admin-dashboard/manageuser`],{queryParams:product});
  }
  deleteMovie(id:any){
   let x= confirm("do you want delete this item permentaly");
    if(x){
      deleteDoc(doc(this.db , 'items' , id));
    }
   
  }
    // reject(id:any){
    //   setDoc(doc(this.db, 'items' , id), {
    //     status: 'rejected',
    //   }, { merge : true });
    // }
    // accept(id:any){
    //   setDoc(doc(this.db, 'items' , id), {
    //     status: 'accepted',
    //   }, { merge : true });
    // }
}

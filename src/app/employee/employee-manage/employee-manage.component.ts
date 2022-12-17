import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from "@app/_services/employee.service";
import { merge, Subscription } from "rxjs";

@Component ({templateUrl: 'employee-manage.component.html'})
export class EmployeeManagerComponent implements OnInit, AfterViewInit
{

  private subs = new Subscription();
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber'];
  public isLoadingResults = true;
  
  public employees = 
  [
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'Sonia', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'Adam', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'Blake', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'Matthew', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'Sophia', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'Jordan', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'Julia', lastName: 'Beard', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
      {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'}
  ]
  
  
  dataSource = new MatTableDataSource<User>(this.employees);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit() {
    this.isLoadingResults = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
    .subscribe(() =>{
      var orderBy = this.dataSource.sort?.active;
      var dir =this.dataSource.sort?.direction;
      var take = this.dataSource.paginator?.pageSize;
      var skip = this.dataSource.paginator?.pageIndex;
      var length = this.dataSource.paginator?.length;
      var search = this.dataSource.filter;

      this.employeeService.getRandomUsers(orderBy, dir, take, skip, search  );
    });

    

  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

    constructor(private employeeService: EmployeeService, private _snackBar: MatSnackBar) {
        this.dataSource.paginator = this.paginator;
      }
    
    ngOnInit(): void {
      // this.subs.add(this.financeService.getRandomUsers()
      // .subscribe((res) => {
      //   console.log(res);
      //   this.dataArray = res;
      //   this.dataSource = new MatTableDataSource<User>(this.dataArray);
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      // },
      //   (err: HttpErrorResponse) => {
      //     console.log(err);
      //   }));
    }

    ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  public openRecord(id: number, name: string): void {
    this._snackBar.open(`Record ${id} ${name} `, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });    
  }

}

interface User
{
  firstName?: string,
  lastName?: string,
  email?: string,
  phoneNumber?: string,
}
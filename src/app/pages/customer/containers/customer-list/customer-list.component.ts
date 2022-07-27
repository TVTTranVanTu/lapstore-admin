import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { PageEvent } from '@angular/material/paginator';

import { CustomerService } from '../../services/customer.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  isAdd: boolean = false;
  isDelete: boolean = false;

  editIcon: string = '../../../assets/icons/edit-2.svg';
  deleteIcon: string = '../../../assets/icons/trash-icon.svg';
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';
  photo: string = '../../../assets/imgs/avatar.jpg';

  listCustomers = [];
  tableColums: string[] = [
    'avatar',
    'customerName',
    'address',
    'phoneNumber',
    'email',
    'role',
    'action',
  ];

  private subjectKeyUp = new Subject<any>();

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  pageEvent?: PageEvent;
  datasource?: null;
  pageIndex?: number;
  pageSize?: number;
  length?: number;

  eventDefault = {
    pageIndex: 0,
    pageSize: 10,
    length: 100,
  };

  public filter = {
    search: '',
  };

  ngOnInit(): void {
    this.getCustomers(this.eventDefault, this.filter);
  }

  ngAfterViewInit() {
    this.subjectKeyUp
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((d) => {
        this.filter.search = d;
        this.getCustomers(this.eventDefault, this.filter);
      });
  }

  // search
  onSearch($event: any) {
    const value = $event.target.value;
    this.subjectKeyUp.next(value);
  }

  getCustomers(event?: PageEvent, filter?: any) {
    this.customerService
      .getCustomers(event, filter)
      .subscribe((response: any) => {
        if (response.error) {
        } else {
          this.listCustomers = response.data;
          this.pageIndex = Number(response.pagination.page) - 1;
          this.pageSize = response.pagination.totalRows;
          this.length = response.pagination.totals;
        }
      });
    return event;
  }

  openEditCustomer(id: string) {
    this.router.navigate([routes.EDIT_CUSTOMER + id]);
  }
}

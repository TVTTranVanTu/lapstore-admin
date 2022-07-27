import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-category-setting',
  templateUrl: './category-setting.component.html',
  styleUrls: ['./category-setting.component.scss'],
})
export class CategorySettingComponent implements OnInit {
  listCategories = [];
  tableColums: string[] = [
    'categoryId',
    'categoryName',
    'subCategory',
    'createAt',
    'action',
  ];

  isAdd: boolean = false;
  isDelete: boolean = false;

  photo: string = '../../../assets/icons/no-image-icon.svg';
  editIcon: string = '../../../assets/icons/pencil-icon.svg';
  deleteIcon: string = '../../../assets/icons/trash-icon-sku.svg';

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.settingService.getCategories().subscribe((response) => {
      this.listCategories = response;
    });
  }

  openEditCustomer(id: string) {}
}

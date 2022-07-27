import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-brand-setting',
  templateUrl: './brand-setting.component.html',
  styleUrls: ['./brand-setting.component.scss'],
})
export class BrandSettingComponent implements OnInit {
  listBrands = [];
  tableColums: string[] = [
    'thumbnail',
    'brandId',
    'brandName',
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
    this.getBrands();
  }

  getBrands() {
    this.settingService.getBrands().subscribe((response) => {
      this.listBrands = response;
    });
  }

  openEditCustomer(id: string) {}
}

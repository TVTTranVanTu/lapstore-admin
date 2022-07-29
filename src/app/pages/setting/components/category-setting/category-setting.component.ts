import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-category-setting',
  templateUrl: './category-setting.component.html',
  styleUrls: ['./category-setting.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none', opacity: '0' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CategorySettingComponent implements OnInit {
  listCategories: any = [];
  listSubCategories = [];
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
  chervonDown: string = '../../../assets/icons/chervon-down.svg';
  chervonUp: string = '../../../assets/icons/chervon-up.svg';

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.settingService.getCategories().subscribe((response) => {
      this.listCategories = response.map((e: any) => {
        const data = {
          _id: e._id,
          categoryName: e.categoryName,
          createdAt: e.createdAt,
          isExpanded: false,
          subCategory: [],
        };

        return data;
      });
    });
  }

  getSubCategories(id: string) {
    this.listCategories.find((i: any) => i._id == id).isExpanded =
      !this.listCategories.find((i: any) => i._id == id).isExpanded;
    if (this.listCategories.find((i: any) => i._id == id).isExpanded) {
      this.settingService.getSubCategories(id).subscribe((response) => {
        this.listSubCategories = response;
        this.listCategories.find((i: any) => i._id == id).subCategory =
          response.data;
      });
    }
    console.log('list', this.listCategories);
  }

  openEditCustomer(id: string) {}
}

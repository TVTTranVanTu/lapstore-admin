import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditBrandComponent } from 'src/app/components/popup-modal/edit-brand/edit-brand.component';
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
  isEdit: boolean = false;

  photo: string = '../../../assets/icons/no-image-icon.svg';
  editIcon: string = '../../../assets/icons/pencil-icon.svg';
  deleteIcon: string = '../../../assets/icons/trash-icon-sku.svg';

  constructor(
    private settingService: SettingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.settingService.getBrands().subscribe((response) => {
      this.listBrands = response;
    });
  }

  openDialogEdit(
    id: string,
    name: string | null,
    brandThumbnail: string
  ): void {
    const dialogRef = this.dialog.open(EditBrandComponent, {
      data: {
        title: 'Edit brand',
        message: 'Would you like to edit brand ',
        name: name,
        thumbnail: brandThumbnail,
        isEdit: this.isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isEdit) {
        this.editBrand(id, result.dataEdit);
      }
    });
  }

  editBrand(id: string, data: any) {
    this.settingService.editBrand(id, data).subscribe(
      (response) => {
        this.snackBar.open('Edit brand success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.getBrands();
      },
      (error) => {
        this.snackBar.open('Edit brand not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
  }
}

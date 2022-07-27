import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInventoryComponent } from 'src/app/components/popup-modal/add-inventory/add-inventory.component';
import { DeleteModalComponent } from 'src/app/components/popup-modal/delete-modal/delete-modal.component';
import { routes } from 'src/app/consts';
import { IProduct } from 'src/app/models/product.model';
import { formatVND } from 'src/utils/helper';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public routers: typeof routes = routes;

  productId?: string | null;
  productInfor!: IProduct;

  name!: string;
  isDelete: boolean = false;
  isAdd: boolean = false;

  categoryId?: string | null;
  subCategoryId?: string | null;
  brandId?: string;

  formatVND = formatVND;

  noImage: string = '../../../assets/icons/no-image-icon.svg';
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetail(this.productId);
  }

  openDialogAdd(name: string | null) {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      data: {
        title: 'Add product to inventory?',
        message: 'Would you like to add product',
        name: name,
        type: 'add',
        isAdd: this.isAdd,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isAdd == true) {
        if (result.quantity <= 0) {
          console.log('test');

          this.snackBar.open('Value must be greater than 1', '', {
            duration: 3000,
            panelClass: 'snackbar-notification__not-success',
          });
          return;
        }
        this.addToInventory(result);
      }
    });
  }

  addToInventory(data: any) {
    const value = {
      productId: this.productInfor._id,
      productName: this.productInfor.productName,
      quantity: data.quantity,
    };

    this.productService.addToInventory(value).subscribe(
      (response) => {
        this.snackBar.open('Add product to inventory success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.router.navigate([routes.INVENTORY]);
      },
      (error) => {
        this.snackBar.open('Add product to inventory not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
  }

  getProductDetail(id?: string | null) {
    this.productService.getProductDetail(id).subscribe((data) => {
      this.productInfor = data;

      this.categoryId = data.category;
      this.subCategoryId = data.subCategory;
      this.brandId = data.brand;
      if (!this.brandId || !this.categoryId || !this.subCategoryId) {
        return;
      }
      this.productService.getBrandDetail(this.brandId).subscribe((response) => {
        this.productInfor.brand = response.brandName;
      });

      this.productService
        .getCategoryDetail(this.categoryId)
        .subscribe((response) => {
          this.productInfor.category = response.categoryName;
        });
      this.productService
        .getSubCategoryDetail(this.subCategoryId)
        .subscribe((response) => {
          this.productInfor.subCategory = response.subCategoryName;
        });
    });
  }

  onEdit() {
    this.router.navigate([routes.EDIT_PRODUCT + this.productId]);
  }

  openDialog(id: string | null, name: string | null): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        title: 'Delete product?',
        name: name,
        isDelete: this.isDelete,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: string | null) {
    this.productService.deleteProduct(id).subscribe((data) => {
      this.router.navigate([routes.PRODUCTS]);
    });
  }
}

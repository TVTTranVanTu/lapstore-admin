import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddInventoryComponent } from 'src/app/components/popup-modal/add-inventory/add-inventory.component';
import { DeleteModalComponent } from 'src/app/components/popup-modal/delete-modal/delete-modal.component';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent implements OnInit {
  listInventory = [];
  tableColums: string[] = [
    'productId',
    'productName',
    'quantity',
    'userNumber',
    'action',
  ];
  isAdd: boolean = false;
  isDelete: boolean = false;

  editIcon: string = '../../../assets/icons/edit-icon.svg';
  deleteIcon: string = '../../../assets/icons/trash-icon.svg';
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';

  constructor(
    private inventoryService: InventoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getInventoryList();
  }

  formatData() {}

  getInventoryList() {
    this.inventoryService.getInventory().subscribe((data) => {
      this.listInventory = data;
    });
  }
  openDialogUpdate(id: string, name: string, quantity: number) {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      data: {
        title: 'Edit product quantity in inventory?',
        message: `Would you like to change quantity for product`,
        name: name,
        quantity: quantity,
        isAdd: this.isAdd,
        type: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isAdd == true) {
        if (result.quantity <= 0) {
          this.snackBar.open('Value must be greater than 1', '', {
            duration: 3000,
            panelClass: 'snackbar-notification__not-success',
          });
          return;
        }
        this.updateInventory(id, result);
      }
    });
  }

  updateInventory(id: string, data: any) {
    const value = {
      quantity: data.quantity,
    };

    this.inventoryService.updateInventory(id, value).subscribe(
      (response) => {
        this.snackBar.open('Add product to inventory success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.getInventoryList();
      },
      (error) => {
        this.snackBar.open('Add product to inventory not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
  }

  openDialogDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        title: 'Delete inventory?',
        name: name,
        message:
          'The product will be taken out of stock without being deleted.',
        type: 'inventory',
        isDelete: this.isDelete,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteInventory(id);
      }
    });
  }

  deleteInventory(id: string) {
    this.inventoryService.deleteInventory(id).subscribe(
      (response) => {
        this.snackBar.open('Add product to inventory success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.getInventoryList();
      },
      (error) => {
        this.snackBar.open('Add product to inventory not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
  }
}

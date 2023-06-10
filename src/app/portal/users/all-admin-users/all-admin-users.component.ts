import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRoles } from '@ui-core-model/user';
import { TableAction, ActionType } from 'src/app/shared/components/table/table.component';
import { DialogResponse } from '@ui-core-model/dialog-response';
import { AuthService } from '@ui-core-services/auth.service';

@Component({
  selector: 'app-all-admin-users',
  templateUrl: './all-admin-users.component.html',
  styleUrls: ['./all-admin-users.component.scss']
})
export class AllAdminUsersComponent implements OnInit {
  displayedColumns = ["firstName", "lastName", "email", "roles", "createdAt"];
  length: number;
  hasData: boolean = false;
  isLoading = false;
  dataSource: MatTableDataSource<User>;
  actions: TableAction[] = [{ value: "View", idFieldVal: "userId", type: ActionType.BUTTON }];
  roles: string[] = ['ALL ADMIN'].concat(Object.keys(UserRoles));
  activeRole: String = 'ALL ADMIN';
  roleControl: FormControl;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.roleControl = new FormControl(this.activeRole)

    this.loadData()

    this.roleControl.valueChanges.subscribe(res => {
      this.activeRole = res
      this.loadData()
    })

    this.route.queryParams.subscribe(params => {
      if (params['create']) {
        this.openDialog()
      }
    })
  }

  public loadData() {
    this.onPageChange({ pageIndex: 1, pageSize: 10 })
  }

  public onPageChange(obj: { pageIndex: number, pageSize: number }) {
    this.isLoading = true;
    if (this.activeRole === 'ALL ADMIN') {
      this.loadAllData(obj)
    } else {
      this.loadRoleData(obj)
    }

  }
  loadRoleData(obj: { pageIndex: number; pageSize: number; }) {
    throw new Error('Method not implemented.');
  }

  openDialog() {

    const dialogRef = this.dialog.open(CreateUserComponent, { maxWidth: "800px", width: "80vw" });

    dialogRef.afterClosed().subscribe((result: DialogResponse<User>) => {
      if (result?.isSuccessful) {
        this.router.navigate(['/portal/admin/users/search'], { queryParams: { email: result.data.email } })
        this.loadData()
      }
    });
  }


  // private loadRoleData(obj: { pageIndex: number, pageSize: number }) {
  //   this.authService.getUsersByRole(this.activeRole as UserRoles, { page: obj.pageIndex, perPage: obj.pageSize }).subscribe({
  //     next: res => {
  //       this.dataSource = new MatTableDataSource(res.users)
  //       this.length = res.links.totalObjects
  //     },
  //     complete: () => this.isLoading = false
  //   })
  // }

  private loadAllData(obj: { pageIndex: number, pageSize: number }) {
    this.authService.getBackOfficeUsers({ page: obj.pageIndex, perPage: obj.pageSize }).subscribe({
      next: (res: { users: User[]; links: { totalObjects: number; }; }) => {
        this.dataSource = new MatTableDataSource(res.users)
        this.length = res.links.totalObjects

        this.isLoading = false
        this.hasData = true
      },
      error: (err: any) => this.isLoading = false,
    })
  }

  onParentCallback(event: [User, TableAction]) {
    const [user, action] = event;

    switch (action.value) {
      case 'View':
        this.router.navigate([`/portal/admin/users/search`], { queryParams: { email: user.email } });
        break;
      default:
        console.log('No action found');
    }
  }


}

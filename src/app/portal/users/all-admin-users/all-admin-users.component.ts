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
  displayedColumns = ["username", "role", "createdAt"]
  length: number;
  hasData: boolean = false;
  isLoading = false;
  dataSource: MatTableDataSource<User>;
  // actions: TableAction[] = [];
  actions: TableAction[] = [{ value: "Delete", idFieldVal: "username", type: ActionType.BUTTON }];
  roles: string[] = ['ALL ADMIN'].concat(Object.keys(UserRoles));
  activeRole: String = 'ALL ADMIN';
  roleControl: FormControl;
  isAdmin!: boolean;

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

    this.isAdmin = this.authService.getRole === UserRoles.ADMIN

    if(!this.isAdmin) {
      this.actions = []
    } 

    this.route.queryParams.subscribe(params => {
      if (params['create']) {
        this.openDialog()
      }
    })
  }

  public loadData() {
    this.isLoading = true;
    
    this.authService.getBackOfficeUsers().subscribe((res: User[]) => {
        this.dataSource = new MatTableDataSource(res)
        this.length = res.length

        this.isLoading = false
        this.hasData = true
      },
      (err: any) => this.isLoading = false,
    )}

  openDialog() {

    const dialogRef = this.dialog.open(CreateUserComponent, { maxWidth: "800px", width: "80vw" });

    dialogRef.afterClosed().subscribe((result: DialogResponse<User>) => {
      this.loadData()
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

  onParentCallback(event: [User, TableAction]) {
    const [user, action] = event;

    switch (action.value) {
      case 'Delete':
        this.authService.deleteUser(user.username)
          .subscribe({
            next: (res: string) => {
              this.loadData()
            }
          });
        // this.router.navigate([`/portal/admin/users/search`], { queryParams: { email: user.email } });
        break;
      default:
        console.log('No action found');
    }
  }
}

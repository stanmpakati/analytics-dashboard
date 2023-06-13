import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '@ui-core-services/alert.service';
import { AuthService } from '@ui-core-services/auth.service';
import { UserRoles } from '@ui-core-model/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup
  firstNameControl!: FormControl
  middleNamesControl!: FormControl
  lastNameControl!: FormControl
  emailControl!: FormControl
  roleControl!: FormControl
  hidePassword = true;
  isLoading: boolean
  roles = Object.keys(UserRoles)
  componentFrom = ''

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { role: UserRoles },
  ) { }

  ngOnInit(): void {
    this.isLoading = false
    this.firstNameControl = new FormControl(null, { validators: [Validators.required] })
    this.middleNamesControl = new FormControl(null)
    this.lastNameControl = new FormControl(null, { validators: [Validators.required] })
    this.emailControl = new FormControl(null, { validators: [Validators.required] })
    this.roleControl = new FormControl(this.data?.role, { validators: [Validators.required] })

    this.userForm = new FormGroup({
      // firstName: this.firstNameControl,
      // middleNames: this.middleNamesControl,
      username: this.lastNameControl,
      password: this.emailControl,
      role: this.roleControl,
    })

    this.route.queryParams.subscribe(params => {
      if (params['create'] === 'internal') {
        this.componentFrom = 'Internal'
        this.roles = this.roles;
      } else if (params['create'] === 'external') {
        this.componentFrom = 'Agent'
        this.roles = this.roles
      }
    })
  }

  onSubmit() {
    if (this.userForm.invalid) return this.userForm.markAllAsTouched();

    this.isLoading = true
    this.cdr.detectChanges()

    const userDto = { ...this.userForm.value, role: this.userForm.value.role }

    this.authService.createBackOfficeUser(userDto).subscribe({
      next: (res: any) => {
        this.isLoading = false
        console.log("tasvika pano with res", res)
        
        if (res) {
          this.alertService.showSuccess('User created successfully')
          this.dialogRef.close({ isSuccessful: true, data: res })
        }
      },
      error: (err: any) => this.isLoading = false,
      complete: () => {
        console.log('complete')
        this.isLoading = false
        this.dialogRef.close({ isSuccessful: true, data: 'Success' })
      }
    })
  }

}

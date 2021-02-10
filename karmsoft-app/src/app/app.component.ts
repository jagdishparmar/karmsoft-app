import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {
        debugger
        if (this.user != null)
            document.body.className = "";
        else
            document.body.className = "login-page";
    }

    logout() {
        this.accountService.logout();
    }
}
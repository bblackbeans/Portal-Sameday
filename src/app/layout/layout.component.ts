import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../components/login/login.service';
import { User } from '../shared/models/User';

declare const $: any;

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

    public userLoggedIn: boolean;
    public unavailable: boolean;
    public unavailableMessage = '';

    private user: User;
    private recorded: Subscription;
    private listeningHasAccessEvent: any;

    constructor(
        private _loginService: LoginService,
    ) {
        this.userLoggedIn = this._loginService.authenticatedUser();
        $('body').removeClass('authentication');
    }

    ngOnInit(): void {
        this.user = this._loginService.getUser();

        this.listeningHasAccessEvent = this._loginService.permissionOfRoute.subscribe(x => {
            if (x === true || x === null || x === undefined) {
                this.unavailable = false;
                this.unavailableMessage = '';

            } else {
                if (!x.access) {
                    this.unavailable = true;
                    this.unavailableMessage = '<h4>Acesso indisponível!</h4>caminho: ' + x.snapUrl;
                }
            }
        });

        if (!this.user) {
            this.userLoggedIn = false;
        } else {
            this.userLoggedIn = true;
        }

        this.recorded = this._loginService.changedUser.subscribe(
            (x: any) => (
                this.userLoggedIn = x.user === null ? false : true
            )
        );
    }

    ngOnDestroy(): void {
        this.recorded.unsubscribe();
        this.listeningHasAccessEvent.unsubscribe();
    }
}
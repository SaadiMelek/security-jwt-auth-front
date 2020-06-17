import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content = '';
  accountList: any;
  currentAccountId: number;
  currentAccount: any;
  currentAccountTransactions: any;

  constructor(private userService: UserService, private accountService: AccountService) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.getCurrentUserAccounts();
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  getCurrentUserAccounts() {
    this.accountService.getCurrentUserAccounts().subscribe(data => {
      console.log(data);
      this.accountList = data;
      console.log(this.accountList);
      if (this.accountList && this.accountList.length > 0) {
        this.currentAccountId = this.accountList[0].id;
        this.onSelectAccount(this.accountList[0]);
      }
    });
  }

  onSelectAccount(account) {
    this.currentAccount = account;
    console.log(account);
    this.getAccountTransactionsHistory(account.id);
  }

  getAccountTransactionsHistory(id: number) {
    this.accountService.getAccountTransactionsHistory(id).subscribe(data => {
      console.log(data);
      this.currentAccountTransactions = data;
      console.log(this.currentAccountTransactions);
    });
  }

  newTransfer() {
    console.log("New transfer !");
  }
}

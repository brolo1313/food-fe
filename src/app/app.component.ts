import { ApplicationRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateHintModalComponent } from './shared/components/update-hint-modal/update-hint-modal.component';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, UpdateHintModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'food-market';

  readonly webPushKeys = {
    "publicKey": "BCLziGMSO3gEVA6tus4p50DJPMtvVfOzUlEMhDx3zocpy31XOH0kpXj1HVG-HnpakoKHqJJYr2jM7z6Uxdq9gMY",
    "privateKey": "4SwjItU4M7lPqr9_WGltD_ugojG56XadTUGUE3E0yfw"
  }
  readonly VAPID_PUBLIC_KEY = this.webPushKeys.publicKey;

  constructor(
    private update: SwUpdate,
    private modalService: NgbModal,
    private push: SwPush,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.updateClient();
    // this.subscribeToNotifications();

    this.serviceWorkerReadyAndPushMsg();

    this.push.messages.subscribe(message => console.log(message))
  }

  //test push message after click
  public pushNotificationAsFrontend() {
    navigator.permissions
      .query({ name: 'notifications' })
      .then(permissions => {
        this.permissionQuery(permissions);
      })
      .catch(function (err) {
        console.log("navigator permission  failed", err);
      })
  }

  private permissionQuery(result: any) {
    if (result.state == 'granted') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((registration) => {
            registration.showNotification('Push from frontend', {
              body: 'test foo',
              data: '2023-01-11',
            });
          })
          .catch(function (err) {
            console.log("Service Worker Failed to Register", err);
          })
      }
    } else if (result.state == 'prompt') {
      console.log('ask again');
      Notification.requestPermission();

    } else if (result.state == 'denied') {
      console.log('access denied');
    }
  }

  //emulated web push at server using devtools push
  private serviceWorkerReadyAndPushMsg() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          // console.log('service worker registered', registration);
          this.showingPushMessage(registration);
        })
        .catch(function (err) {
          // console.log("Service Worker Failed to Register", err);
        })
    }
  }

  private showingPushMessage(reg: any) {
    navigator.serviceWorker.addEventListener('message', (event: MessageEvent) => {
      const { data } = event;

      if (data.type === 'PUSH') {
        reg.showNotification(data.data.title, {
          body: data.data?.body,
          icon: data.data?.icon
        });
      };
      if (data.type === 'VERSION_READY') console.log(data);
    });

  }

  public subscribeToNotifications() {
    console.log(environment.apiUrl);
    if (this.push.isEnabled) {
      this.push.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          this.http.post<any>(`${environment.apiUrl}/save-subscription`, sub).subscribe({
            next: response => {
              console.log('Server response:', response.message);
            },
            error: error => {
              console.error('Error:', error);
            }
          });
        }
        )
        .catch(err => console.error("Could not subscribe to notifications", err));
    }
  }


  //updated implementation
  private updateClient() {
    if (!this.update.isEnabled) {
      console.log('Not Enabled');
      return;
    }

    this.update.available.subscribe((event) => {
      this.dynamicallyShowingHint();
    });
  }

  private dynamicallyShowingHint() {
    const modalRef = this.modalService.open(UpdateHintModalComponent);

    modalRef.result.then(
      (result) => {
        this.update.activateUpdate().then(() => location.reload());
      },
      (reason) => {
        return console.log('click close');
      }
    );

  }
}


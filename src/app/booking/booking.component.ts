import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

interface Bookings {
  user: any;
  sport: any;
  members: any;
  bookingTime: any;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  user: any;
  sport: any;
  members: any;
  bookingTime: any;
  bookingStatus: string = '';
 
  
  constructor(private ms: GlobalService) {}

  openForm(data: Bookings | null = null) {
    this.user = data.user;
    this.sport = data.sport;
    this.members = data.members;
    this.bookingTime = data.bookingTime;
  }

  saveBooking() {
    let body = {
      user: { id: localStorage.getItem("id") },
      sport: { id: this.sport },
      members: this.members,
      bookingTime: this.bookingTime
    };

    this.ms.postBooking(body).subscribe(
      (response: any) => {
        this.sport = response.sport; 
        this.members = response.members; 
        this.bookingTime = response.bookingTime;
        this.bookingStatus = 'Booked successfully!';
      },
      (error) => {
        alert('Sorry, Already booked on this date')
      }
    );
  }
  
  resetForm() {
    this.user = '';
    this.sport = '';
    this.members = '';
    this.bookingTime = '';
    this.bookingStatus = '';
  }
}

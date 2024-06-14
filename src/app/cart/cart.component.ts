
import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  userId: any;
  bookings: any[];
  searchPerformed: boolean = false;
  editingBooking: any = null;
  showEditForm: boolean = false;
  members: number;
  bookingTime: Date;
 
  constructor(private ms: GlobalService) {}
 
  ngOnInit(): void {
    this.getBookingDetails();
  }
 
  getBookingDetails() {
    console.log(localStorage.getItem("id"));
    this.bookings = [];
    this.ms.getUserBooking().subscribe(
      (data: any) => {
        for (const booking of data) {
          if (booking.userId == localStorage.getItem("id")) {
            this.bookings.push(booking);
          }
        }
        if (this.bookings.length > 0) {
          this.searchPerformed = true;
        } else {
          this.searchPerformed = false;
        }
      },
      (error) => {
        console.error('Error fetching booking details:', error);
      }
    );
  }
 
  updateBooking(booking: any) {
    this.editingBooking = { ...booking };
    this.members = this.editingBooking.members;
    this.bookingTime = this.editingBooking.bookingTime;
    this.showEditForm = true;
  }
 
  saveUpdatedBooking() {
    const updatedBooking = {
      members: this.members,
      bookingTime: this.bookingTime
    };
 
    this.ms.putBooking( updatedBooking,this.editingBooking.bookId).subscribe(
      (res: any) => {
        Swal.fire({
          title: 'Booking Updated!',
          text: 'Your booking has been updated.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.editingBooking = null;
          this.showEditForm = false;
          this.getBookingDetails();
        });
      },
      (error: any) => {
        Swal.fire({
          title: 'Update Failed',
          text: 'There was an error updating your booking.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
 
  cancelBooking(booking: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will cancel your booking.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ms.deleteBooking(booking.bookId).subscribe(
          (response) => {
            Swal.fire({
              title: 'Booking Canceled',
              text: 'Your booking has been canceled.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.getBookingDetails();
            });
          },
          (error) => {
            Swal.fire({
              title: 'Cancellation Failed',
              text: 'There was an error canceling your booking.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
 
  closeEditForm() {
    this.editingBooking = null;
    this.showEditForm = false;
  }
}
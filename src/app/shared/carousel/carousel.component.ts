import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Slide {
  title: string;
  text: string;
  image: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
   {
  title: 'One Africa. One Health Identity.',
  text: "Building Africa's trusted health verification platform where every doctor, nurse, pharmacist, medical herbalist, and health professional can be verified with a scan.",
  image: 'https://africa-health.com/wp-content/uploads/2018/12/Essential_Medicines-v2.jpg'
},

    {
      title: 'Empowering Healthcare Excellence',
      text: 'Verifying professionals and improving patient care.',
      image: 'https://readdy.ai/api/search-image?query=A%20professional%20medical%20setting%20showing%20diverse%20African%20healthcare%20professionals%20collaborating%20in%20a%20modern%20hospital%20environment%2C%20with%20subtle%20technology%20elements%20and%20a%20gradient%20overlay%20that%20ensures%20text%20readability.%20The%20scene%20should%20be%20bright%20and%20inspiring&width=1920&height=640&seq=6&orientation=landscape'
    },
    {
      title: ' One verified healthcare identity',
      text: ' Supporting verified credentials for licensed professionals.',
      image: 'https://www.aehnetwork.org/wp-content/uploads/2021/11/Ebola_Vaccine_Study_in_West_Africa_33833442616-scaled.jpg'
    }
  ];

  currentIndex = 0;
  private intervalId?: number;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.restartAutoSlide();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }

  private startAutoSlide() {
    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  private stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
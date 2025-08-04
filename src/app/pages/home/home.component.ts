import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   selectedImage: any = null;
  
  galleryImages = [
    {
      id: 1,
      title: 'الحرم الجامعي',
      thumbUrl: 'assets/gallery1.png',
      fullUrl: 'assets/gallery1.png'
    },
    {
      id: 2,
      title: 'المكتبة',
      thumbUrl: 'assets/gallery2.png',
      fullUrl: 'assets/gallery2.png'
    },
    {
      id: 3,
      title: 'المختبرات',
      thumbUrl: 'assets/gallery3.png',
      fullUrl: 'assets/gallery3.png'
    },
    {
      id: 4,
      title: 'الأنشطة',
      thumbUrl: 'assets/gallery4.png',
      fullUrl: 'assets/gallery4.png'
    },
    {
      id: 5,
      title: 'الورشات',
      thumbUrl: 'assets/gallery5.png',
      fullUrl: 'assets/gallery5.png'
    },
    {
      id: 6,
      title: 'الفعاليات',
      thumbUrl: 'assets/gallery6.png',
      fullUrl: 'assets/gallery6.png'
    }
  ];

  openModal(image: any): void {
    this.selectedImage = image;
  }

  closeModal(): void {
    this.selectedImage = null;
  }
  revealed = false;

  ngOnInit() {
    setTimeout(() => {
      this.revealed = true;
    }, 500); // وقت التأخير بعد الخروج من intro
  }
}


import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  isSmallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 992;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
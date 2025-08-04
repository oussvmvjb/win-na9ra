import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-stars-background',
  templateUrl: './stars-background.component.html',
  styleUrls: ['./stars-background.component.css']
})
export class StarsBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('starsContainer') starsContainer!: ElementRef; // مرجع لحاوية النجوم في القالب

  private scene!: THREE.Scene; // مشهد Three.js
  private camera!: THREE.PerspectiveCamera; // الكاميرا
  private renderer!: THREE.WebGLRenderer; // العارض
  private stars!: THREE.Points; // كائن النجوم
  private animationId!: number; // معرف حلقة التحريك
  private animationRunning = true; // حالة استمرار التحريك

  ngAfterViewInit() {
    // تهيئة المشهد بعد تحميل العرض
    this.initScene();
    this.animate();
  }

  ngOnDestroy() {
    // تنظيف الموارد عند تدمير المكون
    this.animationRunning = false;
    cancelAnimationFrame(this.animationId);
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    // تحديث الكاميرا والعارض عند تغيير حجم النافذة
    const container = this.starsContainer.nativeElement;
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  private initScene() {
    // تهيئة المشهد والكاميرا والعارض
    const container = this.starsContainer.nativeElement;

    // إنشاء المشهد
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // إعداد الكاميرا
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // إنشاء العارض
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // إضافة النجوم للمشهد
    this.addStars();
  }

  private addStars() {
    // إنشاء النجوم وإضافتها للمشهد
    const container = this.starsContainer.nativeElement;
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: false
    });

    const starsVertices = [];
    const starsCount = 1500; // عدد النجوم

    // توليد مواقع عشوائية للنجوم
    for (let i = 0; i < starsCount; i++) {
      starsVertices.push(
        (Math.random() - 0.5) * container.clientWidth,
        (Math.random() - 0.5) * container.clientHeight,
        (Math.random() - 0.5) * 100
      );
    }

    // تعيين المواقع في الهندسة
    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );

    // إنشاء كائن النجوم وإضافته للمشهد
    this.stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(this.stars);
  }

  private animate() {
    // حلقة التحريك الرئيسية
    this.animationId = requestAnimationFrame(() => this.animate());

    if (this.stars) {
      // تحديث مواقع النجوم بشكل عشوائي لإعطاء تأثير الحركة
      const positions = this.stars.geometry.attributes['position'].array as Float32Array;
      const container = this.starsContainer.nativeElement;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.2; // حركة أفقية بسيطة
        positions[i+1] += (Math.random() - 0.5) * 0.1; // حركة عمودية بسيطة

        // إعادة تعيين النجوم إذا خرجت من الحدود
        if (positions[i] > container.clientWidth/2) positions[i] = -container.clientWidth/2;
        if (positions[i] < -container.clientWidth/2) positions[i] = container.clientWidth/2;
        if (positions[i+1] > container.clientHeight/2) positions[i+1] = -container.clientHeight/2;
        if (positions[i+1] < -container.clientHeight/2) positions[i+1] = container.clientHeight/2;
      }

      this.stars.geometry.attributes['position'].needsUpdate = true;
    }

    // رسم المشهد
    this.renderer.render(this.scene, this.camera);
  }
}
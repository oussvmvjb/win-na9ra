import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements AfterViewInit, OnDestroy {
  constructor(private router: Router) {}

  // الحصول على عنصر الحاوية للكانفس من القالب
  @ViewChild('canvasContainer') canvasContainer!: ElementRef;

  // متغيرات لمكونات المشهد الثلاثي الأبعاد
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mixers: THREE.AnimationMixer[] = [];
  private models: { object: THREE.Object3D, velocity: THREE.Vector3 }[] = [];
  private animationRunning = true;
  private logoModel!: THREE.Object3D;
  private clock = new THREE.Clock();

  // يتم استدعاؤها بعد تحميل وعرض القالب
  ngAfterViewInit() {
    this.initScene(); // تهيئة المشهد الثلاثي الأبعاد
    this.animate();   // بدء حلقة التحريك
    window.addEventListener('resize', this.onWindowResize); // تحديث الحجم عند تغيير حجم النافذة
  }

  // تنظيف الموارد عند تدمير المكون
  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
    this.animationRunning = false; // إيقاف التحريك
  }

  // تحديث الكاميرا والرندر عند تغيير حجم النافذة
  onWindowResize = () => {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  // تهيئة المشهد الثلاثي الأبعاد والإضاءة وتحميل النماذج
  initScene() {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000); // خلفية سوداء

    this.addStars(); // إضافة نجوم للخلفية

    // إعداد الكاميرا
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 15;
    this.camera.position.y = 3;

    // إعداد الرندرر
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

    // إضافة إضاءة للمشهد
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    this.scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x00a2ff, 0.6);
    directionalLight2.position.set(-1, -1, -1).normalize();
    this.scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 50);
    pointLight.position.set(0, 5, 10);
    this.scene.add(pointLight);

    // تحميل نموذج GLTF للشعار
    const loader = new GLTFLoader();

    loader.load('assets/models/logo.glb', (gltf) => {
      // إنشاء الشعار الرئيسي الكبير
      this.logoModel = gltf.scene.clone();
      this.logoModel.scale.set(3, 3, 3);
      this.logoModel.position.set(0, 10, 4);
      this.scene.add(this.logoModel);

      // إنشاء عدة نسخ صغيرة من الشعار وتوزيعها عشوائياً
      const modelCount = 200;
      for (let i = 0; i < modelCount; i++) {
        const clone = gltf.scene.clone();

        // تعيين حجم عشوائي
        const scale = Math.random() * 0.9 + 0.1;
        clone.scale.set(scale, scale, scale);

        // توزيع النماذج بشكل عشوائي في جميع الاتجاهات
        clone.position.set(
          (Math.random() - 0.5) * 80, // X: من -40 إلى +40
          (Math.random() - 0.5) * 40, // Y: من -20 إلى +20
          (Math.random() - 0.5) * 60  // Z: من -30 إلى +30
        );

        // تدوير النموذج عشوائياً
        clone.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        this.scene.add(clone);

        // تعيين سرعة عشوائية لكل نموذج
        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        );

        this.models.push({
          object: clone,
          velocity: velocity
        });
      }
    });
  }

  // إضافة نجوم للخلفية باستخدام نقاط ثلاثية الأبعاد
  addStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true
    });

    const starsVertices = [];
    for (let i = 0; i < 100000; i++) {
      starsVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(stars);
  }

  // حلقة التحريك الرئيسية
  animate = () => {
    if (!this.animationRunning) return;

    requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();
    const globalSpeedFactor = 0.5;

    // تحريك الشعار الرئيسي (دوران واهتزاز)
    if (this.logoModel) {
      this.logoModel.rotation.y += 0.005;
      this.logoModel.position.y = 5 + Math.sin(time * 3) * 0.1;
      this.logoModel.rotation.z = Math.sin(time * 2) * 0.05;
    }

    // تحريك النماذج الصغيرة وتغيير اتجاهها عند الاصطدام بالحدود
    this.models.forEach((model) => {
      model.object.rotation.x += (Math.random() - 0.5) * 0.005 * globalSpeedFactor;
      model.object.rotation.y += (Math.random() - 0.5) * 0.008 * globalSpeedFactor;
      model.object.rotation.z += (Math.random() - 0.5) * 0.003 * globalSpeedFactor;

      model.object.position.x += model.velocity.x * globalSpeedFactor;
      model.object.position.y += model.velocity.y * globalSpeedFactor;
      model.object.position.z += model.velocity.z * globalSpeedFactor;

      // تغيير السرعة عشوائياً أحياناً
      if (Math.random() < 0.005) {
        model.velocity.x = (Math.random() - 0.5) * 0.02;
        model.velocity.y = (Math.random() - 0.5) * 0.02;
        model.velocity.z = (Math.random() - 0.5) * 0.02;
      }

      // ارتداد عند الاصطدام بالحدود
      const bounds = { x: 40, y: 20, z: 30 };

      if (Math.abs(model.object.position.x) > bounds.x) {
        model.velocity.x *= -0.8;
        model.object.position.x = Math.sign(model.object.position.x) * bounds.x * 0.9;
      }
      if (Math.abs(model.object.position.y) > bounds.y) {
        model.velocity.y *= -0.8;
        model.object.position.y = Math.sign(model.object.position.y) * bounds.y * 0.9;
      }
      if (Math.abs(model.object.position.z) > bounds.z) {
        model.velocity.z *= -0.8;
        model.object.position.z = Math.sign(model.object.position.z) * bounds.z * 0.9;
      }
    });

    // رسم المشهد
    this.renderer.render(this.scene, this.camera);
  };

  // بدء الانتقال إلى التطبيق الرئيسي مع تأثيرات بصرية وصوتية
  startApp() {
    this.animationRunning = false; // إيقاف التحريك

    // تأثير بصري على الزر
    const button = document.querySelector('button');
    if (button) {
      button.classList.add('clicked');
      setTimeout(() => button.classList.remove('clicked'), 300);
    }

    // تشغيل صوت الانتقال
    const audio = new Audio('assets/sounds/transition.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Auto-play prevented:', e));

    // تأثير اختفاء على محتوى المقدمة
    const introContent = document.querySelector('.intro-content') as HTMLElement;
    if (introContent) {
      introContent.style.animation = 'fadeOut 1s ease-in-out forwards';
    }

    // تحريك الشعار نحو الكاميرا مع تكبيره
    const initialPosition = this.logoModel.position.clone();
    const targetPosition = new THREE.Vector3(0, 0, this.camera.position.z - 5);

    let progress = 0;
    const duration = 800;

    const animateTransition = () => {
      progress += 16;
      const t = Math.min(progress / duration, 1);
      const easeT = this.easeOutCubic(t);

      this.logoModel.position.lerpVectors(initialPosition, targetPosition, easeT);
      this.logoModel.scale.set(10 + easeT , 10+ easeT*100 , 10 + easeT*100 );
      this.logoModel.rotation.y += 0.02;

      // تحريك النماذج الصغيرة للخارج
      this.models.forEach(model => {
        const direction = model.object.position.clone().normalize();
        model.velocity = direction.multiplyScalar(0.2);
        model.object.position.add(model.velocity);
      });

      this.renderer.render(this.scene, this.camera);

      if (progress < duration) {
        requestAnimationFrame(animateTransition);
      } else {
        this.router.navigate(['/home']); // الانتقال للصفحة الرئيسية
      }
    };

    animateTransition();
  }

  // دالة تسهيل الحركة (تستخدم في الانتقالات)
  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}
---
title: 'Dispatcher servlet คืออะไร ?'
description: 'เป็นส่วนสำคัญในโครงสร้างของ Spring Framework ที่ใช้ในการจัดการการเรียกของ HTTP และการจัดเกี่ยวกับการตรวจสอบและเลือก Controller'
pubDate: 'Aug 14 2024'
heroImage: 
  src: '/blog-placeholder-5.jpg'
  alt: 'blog placeholder'
tags: ["tech", "java", "springboot"]
updatedDate: 'Aug 14 2024'
order: 2
series: "knowledge"
---

Dispatcher Servlet เป็นส่วนสำคัญในโครงสร้างของ Spring Framework ที่ใช้ในการจัดการการเรียกของ HTTP และการจัดเกี่ยวกับการตรวจสอบและเลือก Controller ที่เหมาะสมในการประมวลผลคำขอ (request) และการส่งคำตอบ (response) กลับไปยัง client.

Dispatcher Servlet มักถูกกำหนดในแฟ้มการกำหนดค่า (configuration file) เช่น `web.xml` ในแอปพลิเคชัน Java EE หรือด้วยการใช้ Java Configuration ใน Spring Framework ตัวเอง (โดยใช้ `WebApplicationInitializer` หรือ `AbstractAnnotationConfigDispatcherServletInitializer`).

หน้าที่หลักของ Dispatcher Servlet คือ:

1. รับคำขอ (request): Dispatcher Servlet รับ HTTP request จาก client ผ่านทางเซิร์ฟเล็ต (Servlet Container) เช่น Tomcat หรือ Jetty.
2. แปลง URL: Dispatcher Servlet จะแปลง URL ที่รับมาให้เป็นชื่อ Controller และเลือก Controller ที่เหมาะสมในการประมวลผลคำขอ โดยใช้หลักการแมป URL เป็น Controller และเมธอดที่เหมาะสม.
3. การเรียก Controller: Dispatcher Servlet เรียก Controller ที่ถูกเลือกในขั้นตอนก่อนหน้านี้เพื่อประมวลผลคำขอ ซึ่ง Controller จะดำเนินการตามโลจิกของแอปพลิเคชัน เช่น การดึงข้อมูลจากฐานข้อมูล การประมวลผลข้อมูล หรือการส่งคำตอบกลับ.
4. ส่งคำตอบ (response): เมื่อ Controller ประมวลผลเสร็จแล้ว ก็จะส่งคำตอบ (HTTP response) กลับไปยัง client ผ่าน Dispatcher Servlet ซึ่งจะดำเนินการแปลงข้อมูลเป็นรูปแบบที่เหมาะสมสำหรับการส่งผ่านเครือข่าย เช่น HTML, JSON, XML หรือไฟล์อื่น ๆ.

Dispatcher Servlet เป็นส่วนสำคัญที่ช่วยให้ Spring Framework สามารถจัดการคำขอ HTTP และเลือก Controller ในการดำเนินการตามโลจิกของแอปพลิเคชันได้อย่างมีประสิทธิภาพและสามารถทำงานร่วมกับคอมโพเนนต์อื่น ๆ ของ Spring เพื่อสร้างแอปพลิเคชันเว็บแบบสมบูรณ์ได้ง่ายขึ้น.

ตัวอย่าง Dispatcher Servlet ใน Spring Framework สามารถกำหนดค่าได้ในไฟล์ Java Configuration โดยใช้ **`AbstractAnnotationConfigDispatcherServletInitializer`** เพื่อประสานกับ Spring MVC และ Servlet Container (เช่น Tomcat) ในแอปพลิเคชันของคุณ นี่คือตัวอย่างการกำหนดค่า Dispatcher Servlet ด้วย Java Configuration:

```java
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class MyWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    // คลาส Java Configuration สำหรับการกำหนดค่าของแอปพลิเคชัน
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { AppConfig.class };
    }

    // คลาส Java Configuration สำหรับการกำหนดค่าของ Spring MVC
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { WebConfig.class };
    }

    // กำหนด URL mapping สำหรับ Dispatcher Servlet
    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
}
```

ในตัวอย่างข้างบน:

1. **`MyWebAppInitializer`** คือคลาสที่สร้างส่วนกำหนดค่าของ Dispatcher Servlet โดยใช้ **`AbstractAnnotationConfigDispatcherServletInitializer`**.
2. **`getRootConfigClasses()`** ระบุคลาส Java Configuration ที่เกี่ยวข้องกับการกำหนดค่าหลักของแอปพลิเคชัน (Application Configuration) เช่นการกำหนดค่าฐานข้อมูล หรือการกำหนดค่าในแอปพลิเคชัน.
3. **`getServletConfigClasses()`** ระบุคลาส Java Configuration ที่เกี่ยวข้องกับการกำหนดค่าของ Spring MVC เช่นการกำหนดค่าการสร้างและประมวลผล Controller ของแอปพลิเคชัน.
4. **`getServletMappings()`** กำหนด URL mapping สำหรับ Dispatcher Servlet ในกรณีนี้คือ "/" ซึ่งหมายถึง Dispatcher Servlet จะจับคำขอทั้งหมด (ทุก URL) เพื่อให้ Spring MVC จัดการ.

นอกจากนี้ คุณต้องสร้างคลาส Java Configuration **`AppConfig`** และ **`WebConfig`** ตามความเหมาะสมเพื่อกำหนดค่าแอปพลิเคชันและ Spring MVC ของคุณ.

นี่คือตัวอย่างขั้นตอนการกำหนดค่า Dispatcher Servlet ใน Spring Framework โดยใช้ Java Configuration และ **`AbstractAnnotationConfigDispatcherServletInitializer`** เพื่อให้แอปพลิเคชันของคุณทำงานร่วมกับ Spring MVC และ Servlet Container ได้อย่างมีประสิทธิภาพ.
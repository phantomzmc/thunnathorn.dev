---
title: 'Spring Boot JPA Fetch Type ความต่างระหว่าง EAGER Loading VS LAZY Loading'
description: 'Spring Boot JPA มี Fetch Type สองแบบที่ใช้ในการโหลดข้อมูลจากฐานข้อมูล คือ EAGER Loading และ LAZY Loading'
pubDate: 'Aug 14 2024'
heroImage: 
  src: '/Untitled.png'
  alt: 'blog placeholder'
tags: ["tech", "java", "springboot"]
updatedDate: 'Aug 14 2024'
order: 2
series: "knowledge"
---

Spring Boot JPA มี Fetch Type สองแบบที่ใช้ในการโหลดข้อมูลจากฐานข้อมูล คือ EAGER Loading และ LAZY Loading

**EAGER Loading** คือการโหลดข้อมูลทั้งหมดของ entity ที่เกี่ยวข้องในเวลาเดียวกัน เมื่อเรียกใช้งาน entity หลัก นั่นคือ entity หลักจะโหลดข้อมูลที่เกี่ยวข้องทั้งหมดมาในครั้งเดียว เป็นวิธีที่สะดวกแต่อาจทำให้เกิดปัญหาการโหลดข้อมูลที่ไม่จำเป็นตามมาได้

![Untitled](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Untitled%201.png)

**LAZY Loading** คือการโหลดข้อมูลเมื่อมีการเรียกใช้งาน entity ที่เกี่ยวข้องจริงๆ ในเวลาที่จำเป็นเท่านั้น เมื่อเรียกใช้งาน entity หลัก ข้อมูลที่เกี่ยวข้องจะไม่ถูกโหลดมาในครั้งนั้น แต่จะถูกโหลดเมื่อมีการเข้าถึงข้อมูลเหล่านั้นจริงๆ นั่นคือ entity หลักจะไม่มีความรับผิดชอบในการโหลดข้อมูลที่เกี่ยวข้อง วิธีนี้ช่วยลดการโหลดข้อมูลที่ไม่จำเป็นและเพิ่มประสิทธิภาพในการเรียกใช้งาน

การเลือกใช้ Fetch Type ขึ้นอยู่กับกรณีการใช้งาน หากต้องการโหลดข้อมูลที่เกี่ยวข้องทั้งหมดในครั้งเดียว สะดวกและไม่มีปัญหาเรื่องประสิทธิภาพ ควรใช้ EAGER Loading แต่หากต้องการลดการโหลดข้อมูลที่ไม่จำเป็นและมีประสิทธิภาพในการเรียกใช้งาน ควรใช้ LAZY Loading

## **ตัวอย่างการใช้ Fetch Type แบบ LAZY 🫠**

![Screenshot 2566-09-25 at 14.06.25.png](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Screenshot_2566-09-25_at_14.06.25.png)

โดยเราจะให้ ProductInventoryEntity นั้น join เข้ากับ ProductEntity แบบ OneToOne ด้วยคุณสมบัติของ LAZY loading ก็จะไม่ดึงข้อมูลของ ProductEntity ออกมา จะดึงเพราะแค่ ProductInventoryEntity เท่านั้น 

ถ้าเทียบกับ SQL ก็จะประมาณนี้

```sql
SELECT * FROM product_inventory WHERE product_id = '1';
```

![Screenshot 2566-09-25 at 14.29.44.png](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Screenshot_2566-09-25_at_14.29.44.png)

มาดูผลลัพธ์กัน

![Screenshot 2566-09-25 at 14.06.13.png](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Screenshot_2566-09-25_at_14.06.13.png)

เป็นไปตามคาดดึงแค่ข้อมูลใน ProductInventoryEntity ตัวเดียวจริงๆ แล้วเมื่อไหร่ล่ะที่ LAZY load จะทำการดึงข้อมูลของ table ที่ทำการ join เอาไว้ ……. ก็ต้องเมื่อมีการเรียกใช้ไง งั้นเรามาลองเรียกใช้กันจะได้รู้ว่าทำการดึงข้อมูลตอนไหน

![Screenshot 2566-09-25 at 14.18.53.png](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Screenshot_2566-09-25_at_14.18.53.png)

เราก็ทำให้มีการเรียกใช้ในส่วนของ ProductEntity มาดูกัน!!!

![Screenshot 2566-09-25 at 14.19.38.png](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Screenshot_2566-09-25_at_14.19.38.png)

เรียบร้อยมีการดึงข้อมูล productEntity แล้ววว

## **ตัวอย่างการใช้ Fetch Type แบบ EAGER**

![Screenshot 2566-09-25 at 14.04.38.png](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Screenshot_2566-09-25_at_14.04.38.png)

![Screenshot 2566-09-25 at 14.29.44.png](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Screenshot_2566-09-25_at_14.29.44.png)

เดี๋ยวเอาส่วนที่เรียกใช้ที่ service ออก แค่ findById ตรงๆ แล้ว log เลย

![Screenshot 2566-09-25 at 14.32.44.png](Spring%20Boot%20JPA%20Fetch%20Type%20%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%20EAGER%20L%20c5014ff4dfda429bbb901a190d8a388d/Screenshot_2566-09-25_at_14.32.44.png)

ถ้าดูจาก log ก็จะเห็นว่าข้อมูลของ ProductEntity ออกมาเห็บไว้ให้เลย โดยที่เราไม่ต้องเรียกใช้ก็ได้ 

## เปรียบเทียบข้อดี ข้อเสีย ของ EAGER Loading VS LAZY Loading

- EAGER Loading:
    - ข้อดี:
        - โหลดข้อมูลที่เกี่ยวข้องครบถ้วนทุกครั้ง ทำให้สามารถเข้าถึงข้อมูลที่เกี่ยวข้องได้โดยตรงและรวดเร็ว
        - ไม่เกิดปัญหาการโหลดข้อมูลที่ล่าช้าเนื่องจากการเข้าถึงข้อมูลที่เกี่ยวข้อง
    - ข้อเสีย:
        - การโหลดข้อมูลที่ไม่จำเป็นอาจทำให้มีการใช้ทรัพยากรในระบบมากขึ้น
        - บางครั้งอาจเกิดการโหลดข้อมูลที่ไม่จำเป็นมากเกินไป ทำให้ระบบทำงานช้าลง
- LAZY Loading:
    - ข้อดี:
        - ประหยัดทรัพยากรในการโหลดข้อมูลเนื่องจากจะโหลดข้อมูลเมื่อจำเป็นเท่านั้น
        - ช่วยลดเวลาในการโหลดข้อมูลเมื่อไม่มีความจำเป็น
    - ข้อเสีย:
        - อาจเกิดปัญหาการโหลดข้อมูลที่ล่าช้าเมื่อมีการเข้าถึงข้อมูลที่เกี่ยวข้อง
        - การเข้าถึงข้อมูลที่เกี่ยวข้องอาจต้องใช้การโหลดเพิ่มเติม ซึ่งอาจทำให้ระบบทำงานช้าลง
        

# **แล้วถ้าเราไม่ Fetch Type ให้ล่ะ Default จะเป็นอะไร ?**

![https://miro.medium.com/v2/resize:fit:860/0*EZG0aVr8F2x3k5gq.jpg](https://miro.medium.com/v2/resize:fit:860/0*EZG0aVr8F2x3k5gq.jpg)

**Default fetch type ใน JPA :**

- สำหรับการสัมพันธ์แบบ single-valued (เช่น `@OneToOne`, `@ManyToOne`): Default fetch type คือ `FetchType.EAGER` นั่นหมายความว่าโดยค่าเริ่มต้น ในกรณีที่คุณดึง entity ที่หนึ่ง ตัว JPA จะทำการดึงข้อมูลของ entity ที่เกี่ยวข้องด้วย
- สำหรับการสัมพันธ์แบบ collection-valued (เช่น `@OneToMany`, `@ManyToMany`): Default fetch type คือ `FetchType.LAZY` นั่นหมายความว่าโดยค่าเริ่มต้น ในกรณีที่คุณดึง entity ตัว JPA จะทำการดึงข้อมูลของ collection ที่เกี่ยวข้องด้วย

หวังว่าข้อมูลเรื่องนี้จะเป็นประโยชน์ช่วยให้คนที่เริ่มศึกษาตัว Spring boot , JPA หรือ คนที่อยากรู้เพิ่มเติมนะครับ แล้วจะมาแชร์ข้อมูลใหม่เมื่อ…………
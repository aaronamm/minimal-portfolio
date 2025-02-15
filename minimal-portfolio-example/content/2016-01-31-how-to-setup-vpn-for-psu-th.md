---
layout: post
activity: "วิธีการตั้งค่า VPN ของม.สงขลานครินทร์ (PSU)"
slug: how-to-setup-vpn-for-psu-th
description: เคยไหม ที่อยากจะเข้าถึงข้อมูลบางอย่างเช่น บทความทางวิชาการ เป็นต้น ที่จะต้องเข้าจากอินเตอร์เน็ตในมหาวิทยาลัยเท่านั้น
categories: [th]
tags: [vpn, psu, how-to]
---

เคยไหม ที่อยากจะเข้าถึงข้อมูลบางอย่างเช่น บทความทางวิชาการ เป็นต้น ที่จะต้องเข้าจากอินเตอร์เน็ตในมหาวิทยาลัยเท่านั้น

หรือ ต้องทำงานส่งอาจารย์ และต้องส่งในมหาวิทยาลัยเท่านั้น

หรือ อยากเข้าถึงคอมพิวเตอร์ส่วนตัวของเราในมหาวิทยาลัย (อยู่ในเครือข่ายของมหาวทิยาลัย) ผ่าน `ssh`

แล้วจะทำอย่างไร **คำตอบ** คือ ใช้ `VPN` สิ

## แล้ว VPN คืออะไร?
VPN ย่อมาจาก Virtual Private Network ซึ่งถ้าแปลเป็นไทยก็คือ เครือข่ายส่วนตัวแบบเสมือน เสมือนก็คือ ไม่ใช่ของจริง แต่มันจะสร้างช่องทางพิเศษไว้สำหรับเราเพียงคนเดียว ที่สามารถเข้าใช้งานช่องทางนี้ได้ เพื่อผ่านไปยังจุดหมายปลาย หรือก็คือ เครือข่ายของมหาวิทยาลัย นั่นเอง เปรียบเสมือนว่า เรากำลังเข้าไปนั่งใช้งานในเครือข่ายของมหาวิทยาลัย

> ภาษาบ้านๆ คือ การเข้าไปนั่งใช้งาน internet ในมหาวิทยาลัย โดยไม่ไม่ต้อง ไปสถานที่นั้นจริงๆ นั่นเอง

## การตั้งค่า VPN สำหรับ PSU

การตั้งค่าสามารถทำได้ ทุกระบบปฏิบัติการ ไม่ว่าจะเป็น Mac, Windows, Android หรือ iOS

### วิธีการตั้งค่า ทีละขั้นตอน
- สำหรับ [Windows 8, 8.1, 10 ](http://know.9choo.in.th/2013/10/psu-vpn-windows-881.html) คุณ Choowong Sitaphong ได้เขียนบทความอธิบายไว้อย่างละเอียดแล้ว ([วิธีการตั้งค่า PSU VPN Windows 8,8.1 แบบไม่ง้อโปรแกรม](http://know.9choo.in.th/2013/10/psu-vpn-windows-881.html))
- สำหรับ [Android](http://dmhost2.psu.ac.th/~netserv/images/phocadownload/VPN/Manual/L2TP_AndroidV.4.pdf)
คุณพรพิทักษ์ สันติภาพถาวร ได้เขียนขั้นตอนไว้อย่างละเอียดแล้ว
- สำหรับ [iOS (iPhone, iPad)](http://netserv.pn.psu.ac.th/upload/files/doc_wifi/VPN_11_Client-Installation_IOS.pdf) คุณพรพิทักษ์ สันติภาพถาวร ได้เขียนขั้นตอนไว้อย่างละเอียดแล้ว
- สำหรับ [Mac OS 10.5 Leopard](http://netserv.pn.psu.ac.th/upload/files/doc_lan/VPN_10_Client-Installation_MAC10.5.pdf) คุณพรพิทักษ์ สันติภาพถาวร ได้เขียนขั้นตอนไว้อย่างละเอียดแล้ว

## Parameter ต่างๆ ที่ใช้ในการตั้งค่าในการใช้งาน

```
Name                 : PSU
Type                 : L2TP/IPSec PSK
Server address       : vpn.psu.ac.th
IPSEC pre-shared key : vpn key
```

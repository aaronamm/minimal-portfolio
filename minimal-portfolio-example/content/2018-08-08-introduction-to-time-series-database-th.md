---
layout: "post"
activity: "ทำไมเราถึงควรใช้ฐานข้อมูลอนุกรมเวลาสำหรับ ข้อมูลอนุกรมเวลา (Time Series Database)"
slug: introduction-to-open-time-series-database-th
categories: [th]
tags:
    - time-series
    - database
    - iot
image: https://www.dropbox.com/s/d9xvup8eylfhgeu/2018-08-13-%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%20OpenTSDB%20%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%96%E0%B8%AD%E0%B8%B0-cover.jpg?raw=1
toc: true
---

ปัจจุบันนี้ internet of thing หรือ IoT ก็ได้เข้ามามีบทบาทในอุตสาหกรรมและเทคโนโลยี ซึ่งใน สถาปัตยกรรมของ IoT เอง ก็มีหลายชั้น ตั้งแต่เซ็นเซอร์เก็บข้อมูล ชั้นเก็บข้อมูล รวมไปถึงการแสดงข้อมูลให้ผู้ใช้ ตามรูป IoT Wolrd Forum ได้ทำรูปอ้างอิงลำดับชั้นของ IoT
![IoT layer by IoT Wolrd Forum](https://www.dropbox.com/s/nz351ddv6aw6v51/2018-08-13-%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%20OpenTSDB%20%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%96%E0%B8%AD%E0%B8%B0-0.jpeg?raw=1)

ตรงนี้ขอไม่ลงรายละเอียดของ IoT มากนัก จากรูปข้างบน เราจะเห็นได้ว่าตั้งแต่ layer ที่ 1 ถึง layer ที่ 7 หรือก็คือตั้งแต่เซนเซอร์หรืออุปกรณ์ที่รวบรวมหรือทำงานหรือควบคุม ต่างๆ ไปจนถึงชั้นของ application และการจัดการ โดยในบทความนี้จะกล่าวถึง**ฐานข้อมูล OpenTSDB ซึ่งจะอยู่ใน Layer ที่ 4-5**
 
IoT เองก็เก็บข้อมูลในลักษณะอนุกรมเวลาเป็นส่วนใหญ่ รวมถึงสัญญาไฟฟ้า (signal) สัญญาณดิจิตอลเองก็เป็นอนุกรมเวลา แต่เมื่อข้อมูลใหญ่มากขึ้นการจัดเก็บข้อมูลอนุกรมเวลาในรูปแบบเดิมๆ อาจจะทำให้ระบบทำงานช้ากว่าที่ควรจะเป็น เช่น general purpose database อย่าง  MySQL, PostgreSQL

**แล้วอนุกรมเวลาคืออะไร ลองไปดูกันครับ**

จริงๆ ถ้าคนเรียนสายคณิตศาสตร์คงคุ้นเคยกับคำๆ นี้ดีอยู่แล้ว แต่ผมขออธิบายง่ายๆ อย่างนี้นะคับ

สมมติว่า ถ้าเราวัดอุณหภูมิของ อ.หาดใหญ่ ทุกๆ ชั่วโมงตั้งแต่ 9 โมงเช้าถึง 6 โมงเย็น แล้วเราก็จดอุณหภูมิไว้ เราก็สามารถนำข้อมูลมาพล็อตเป็นกราฟ ในรูปข้างล่างทางขวามือได้ นี่คือ อนุกรมเวลาแบบง่ายๆ คับ คือมี เวลากับค่าที่เราบันทึก

![https://www.dropbox.com/s/036qgbbs3dy6sao/2018-08-13-%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%20OpenTSDB%20%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%96%E0%B8%AD%E0%B8%B0-1.jpeg?dl=0](https://www.dropbox.com/s/036qgbbs3dy6sao/2018-08-13-%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%20OpenTSDB%20%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%96%E0%B8%AD%E0%B8%B0-1.jpeg?raw=1)

[อนุกรมเวลา](https://www.amazon.com/Analysis-Time-Introduction-Chapman-Statistical/dp/1584883170) ก็คือ ชุดข้อมูลที่เรียงลำดับตามเวลา
โดยอนุกรมเวลาประกอบไปด้วยจุดข้อมูล (data point) ซึ่งในแต่ละจุดข้อมูลมีเวลาที่บันทึก และค่าที่วัดได้ ณ เวลานั้นๆ 
ข้อมูลอนุกรมเวลาส่วนใหญ่แล้วใช้ในการจัดเก็บข้อมูลจากสภาพแวดล้อมต่างๆ ขึ้นอยู่กับการใช้งาน โดยในหลายๆงานก็ได้นำข้อมูลอนุกรมเวลาไปใช้ เช่น การพยากรณ์สภาพอากาศ, ระบบคอมพิวเตอร์, การจราจร, กระบวนทางเคมี หรือแม้กระทั่ง การพยากรณ์แนวโน้มของราคาหุ้น

ตัวอย่างของข้อมูลอนุกรมเวลาในกรณีของการเก็บข้อมูลสภาพอากาศ เช่น 

* ลำดับของอุณหภูมิที่ถูกบันทึกเป็นรายชั่วโมง
* การบันทึกความชื้นทุกชั่วโมง 
* การบันทึกความเร็วทุกๆ หนึ่งนาที 

ระยะห่างระหว่างเวลาที่บันทึกของข้อมูลแต่ละจุดจะเป็นเท่าใดก็ได้ 

---

## ฐานข้อมูลอนุกรมเวลา
ช่วงนี้ฐานข้อมูลอนุกรมเวลาเริ่มดังกันขึ้นเยอะแล้ว จาก[ข่าวที่ฐานข้อมูลอนุกรมเวลา Prometheus เข้าร่วมกับ Cloud Native Computing Foundation](https://prometheus.io/blog/2016/05/09/prometheus-to-join-the-cloud-native-computing-foundation/)
หลังจากที่ศึกษามาสักพักเปเปอร์ survey ด้าน time series ก็ออกมาแล้วครับ
[Time Series Management Systems: A Survey](https://ieeexplore.ieee.org/document/8012550/) จึงเป็นโอกาสที่ดีจะเขียนบทความถึงฐานข้อมูลอนุกรมเวลาครับ 

**ทำไมถึงได้มีฐานข้อมูลอนุกรมเวลาเกิดขึ้นแล้วเหมาะสำหรับระบบแบบไหน?**

คุณ Søren ใน[เปเปอร์](https://ieeexplore.ieee.org/document/8012550/) survey บอกว่า TSMS (Time Series Management System) หรือ TSDB (Time Series Database) ก็ได้ ถ้าเป็น TSMS จะครอบคลุมความหมายมากกว่า เพราะบางระบบไม่ใช่แค่ฐานข้อมูล โดยฐานข้อมูลอนุกรมเวลาเกิดขึ้นจากความต้องการที่เฉพาะเจาะจงมากขึ้น ดังนี้

1. **Database Management System (DBMS) กับ (Relational Database Management System (RDBMS) ทั่วๆ ไปยังไม่ตอบโจทย์เท่าไหร่นัก**เมื่อ เรามีเครือข่ายของเซนเซอร์ขนาดใหญ่ ที่ป้อนข้อมูลอนุกรมเวลาจำนวนมาก ทั้งในแง่ของประมาณ (Volume) และความเร็วในเพิ่มขึ้นของจำนวนข้อมูล (Velocity) 
2. **ในแง่ของการนำข้อมูลไปวิเคราะห์**  ในระบบแบบเดิมยังต้อง export ข้อมูลออกไปยังโปรแกรมวิเคราะห์เช่น R, SPSS ซึ่งทำให้การขั้นตอนการทำงานยุ่งยาก
3. **ในแง่ของการจัดเก็บและเรียกดู ประสิทธิภาพของระบบยังคงต้องดี** เมื่อข้อมูลมีขนาดใหญ่  ซึ่ง TSMS ก็เข้ามาช่วยตอบโจทย์ตรงนี้

หลายๆ คนอาจจะสงสัยว่าแล้วที่บอกว่าข้อมูลอนุกรมขนาดใหญ่นี้ มันใหญ่ขนาดไหนถึงต้องไปใช้ฐานข้อมูลอนุกรมเวลา ตรงนี้ผมขอยกตัวอย่างงานวิจัยของ Facebook ครับ 
โดยเค้าต้องการ จะทำ server สำหรับ monitor ข้อมูลของทุก cluster ของ Facebook ครับ 

ซึ่งโจทย์คือต้องสามารถตรวจสอบความผิดปกติได้อย่างรวดเร็ว ดังนั้นเค้าจึงออกแบบฐานข้อมูลอนุกรมเวลาที่อยู่บนแรมครับที่ชื่อว่า [Gorilla](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf) เพื่อให้ต้องการ monitor แบบ real time ลองมามาดูโจทย์ของ Facebook กันครับ

* มีข้อมูล 2 พันล้านอนุกรมเวลา
* มีข้อมูลอนุกรมเวลา 700 ล้านจุดเข้ามาในระบบ ต่อนาที
* เก็บข้อมูลย้อนหลังได้ 26 ชั่วโมง
* รับโหลดสูงสุดได้ 40,000 query ต่อวินาที 
* สามารถอ่านข้อมูลได้อย่างรวดเร็ว
* รองรับการโตของข้อมูล 2 เท่า ต่อปี

เป็นไงกันบ้างครับ ข้อมูลเยอะมากใช่มั้ย นี่คือตัวอย่างงานแบบ monitoring ถ้าเราไม่ต้องการ real time แบบนี้ ก็ไม่ต้องเก็บข้อมูลบนแรมก็ได้คับ โดยปกติจะเก็บของข้อมูลบน  Harddisk ขึ้นอยู่กับ requirements คับ

**มาถึงตรงนี้ แล้วฐานข้อมูลอนกรุมเวลาคืออะไร?**

[ฐานข้อมูลแบบอนุกรมเวลา](https://ieeexplore.ieee.org/document/6427510/)  คือฐานข้อมูลที่ถูกพัฒนาและปรับปรุงมาเพื่อเก็บข้อมูลในงานทางด้านอนุกรมเวลาโดยเฉพาะ
ฐานข้อมูลแบบอนุกรมเวลาส่วนใหญ่แล้วจะถูกปรับแต่งให้เหมาะกับข้อมูลที่มีปริมาณมาก
และสามารถที่จะจัดเก็บจุดข้อมูลของอนุกรมเวลาและคำอธิบายเพิ่มเติมของข้อมูลนั้นๆ เท่านั้น

ดังนั้นฐานข้อมูลแบบอนุกรมเวลาสามารถจัดการข้อมูลแบบอนุกรมเวลาได้เหมาะสมกว่าฐานข้อมูลอเนกประสงค์ทั่วๆ ไป 
เช่น ฐานข้อมูลแบบมีความสัมพันธ์ (Relational database) หรือฐานข้อมูลแบบไม่มีความสัมพันธ์ (Non-relational database)

อีกทั้งฐานข้อมูลแบบนี้ยังสามารถค้นหาข้อมูลแบบอนุกรมเวลา 
เลื่อนช่วงของเวลาที่ต้องการสอบถาม รวมหลายๆ 
อนุกรมเวลาเข้ามาเป็นหนึ่งอนุกรมเวลา หรือคำนวณเพื่อหาค่าของจุดที่หายไปของอนุกรมเวลา (interpolation)

ปัจจุบันยังไม่มีมาตรฐานการออกแบบและการเชื่อมต่อที่ชัดเจนที่จะอธิบายว่าฐานข้อมูลแบบอนุกรมเวลานั้นควรเป็นแบบไหน
และมีการเชื่อมต่ออย่างไร
หลายๆ องค์กรได้มีความพยายามที่จะสร้างฐานข้อมูลแบบอนุกรมเวลาสำหรับใช้ในองค์กร 
ซึ่งแต่ละผู้พัฒนาได้ออกแบบความสามารถและ 
API ของตนแตกต่างกันไป

**ฐานข้อมูลอนุกรมเวลาส่วนใหญ่แล้วมักจะมี 4 องค์ประกอบ คือ** 

1. ส่วนของการเก็บข้อมูลอนุกรมเวลา 
2. ส่วนของการเก็บเกี่ยวข้อมูล 
3. ส่วนของการแสดงผล
4. ส่วนของการประมวลผลข้อมูล

ซึ่งบางฐานข้อมูลอนุกรมเวลามีองค์ประกอบไม่ครบ 
แต่ฐานข้อมูลเหล่านั้นมักอนุญาตให้เชื่อมต่อกับภายนอก
ยกตัวอย่างเช่น OpenTSDB มีส่วนของแสดงผลที่เหมาะสำหรับการใช้งานที่ไม่ซับซ้อน แต่ 
OpenTSDB 
ก็สามารถเชื่อมต่อกับโปรแกรมประยุกต์เพื่อการแสดงผลอนุกรมเวลา เช่น [Grafana](https://grafana.com/)
ได้ 
![https://www.dropbox.com/s/bc4remlp4qcl27f/2018-08-13-%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%20OpenTSDB%20%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%96%E0%B8%AD%E0%B8%B0-2.png?dl=0](https://www.dropbox.com/s/bc4remlp4qcl27f/2018-08-13-%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%20OpenTSDB%20%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%96%E0%B8%AD%E0%B8%B0-2.png?raw=1)

[Grafana](https://grafana.com/) คือ หน้าต่างอเนกประสงค์สำหรับแสดงผลข้อมูลอนุกรมเวลา  
และมีส่วนขยายสำหรับการเชื่อมต่อกับ OpenTSDB อีกด้วย

### ตัวอย่างการ Query ข้อมูลจากฐานข้อมูลอนุกรมเวลา

ประเภทงานส่วนใหญ่ของการใช้ฐานข้อมูลแบบอนุกรมเวลาคือการสอบถามข้อมูลอนุกรมเวลา
ฐานข้อมูลแบบอนุกรมเวลาส่วนใหญ่จะมีการออกแบบที่ทำให้สะดวกต่อการใช้ค้นหาตามช่วงของเวลา
สมมติว่า 
เราต้องการสอบถามข้อมูลอุณหภูมิที่จัดเก็บไว้ในฐานข้อมูลอยู่ก่อนแล้วจากปีค.ศ. 2013 
ถึง 2016
จากข้อมูลตัวอย่าง มีข้อมูลจำนวน 1 ล้านจุดต่อข้อมูลระยะเวลา 1 ปี
คำสั่งในการสอบถามมีลักษณะได้หลากหลายรูปแบบ 
โดยรูปแบบข้างล่างนี้เป็นตัวอย่างอย่างง่ายในการสอบถามข้อมูล

```
QUERY temperature FROM 2013 TO 2016
```

ผลลัพธ์การสอบถามจะเป็นในรูปแบบของอาร์เรย์ของจุดข้อมูล โดยผลลัพธ์จะมี 3 
ล้านจุดข้อมูล
และผลลัพธ์ที่ได้ยังสามารถนำไปแสดงผลเป็นกราฟอนุกรมเวลา

ฐานข้อมูลแบบอนุกรมเวลาแบบ Open Source ที่ได้รับความนิยม เช่น OpenTSDB, [KairosDB](https://kairosdb.github.io/), [InfluxDB](https://www.influxdata.com/), [Prometheus](https://prometheus.io/) และ [Elasticsearch](https://www.elastic.co/products/elasticsearch) จริงๆ ก็มีอีกหลายตัวที่ไม่ได้ยกตัวอย่างมาครับ

---


## สามารถศึกษาเพิ่มเติมได้นะครับ
* [Time Series Management Systems: A Survey](https://ieeexplore.ieee.org/document/8012550/) 
* [Time Series Database (TSDB) Explained](https://www.influxdata.com/time-series-database/)
* https://blog.timescale.com/what-the-heck-is-time-series-data-and-why-do-i-need-a-time-series-database-dcf3b1b18563
* https://blog.timescale.com/time-series-data-why-and-how-to-use-a-relational-database-instead-of-nosql-d0cd6975e87c
* https://github.com/xephonhq/awesome-time-series-database


ไว้พบกันใหม่โอกาสหน้าครับ สวัสดีครับ


---

 *Cross published at [Medium.com](https://medium.com/@mildronize/%E0%B8%97%E0%B8%B3%E0%B9%84%E0%B8%A1%E0%B9%80%E0%B8%A3%E0%B8%B2%E0%B8%96%E0%B8%B6%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2-time-series-database-d524d25060ec)*

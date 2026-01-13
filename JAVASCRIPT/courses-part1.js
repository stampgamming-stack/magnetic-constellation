/**
 * JS Master - Part 1: พื้นฐาน (บทที่ 1-8)
 * Introduction, Output, Syntax, Variables, Operators, Data Types, Functions, Objects
 */

const coursesPart1 = [
    {
        id: "introduction",
        title: "Introduction",
        icon: "🚀",
        description: "แนะนำภาษา JavaScript และวิธีใส่โค้ด",
        lessons: [
            {
                id: 1,
                title: "JavaScript คืออะไร?",
                content: `
                    <p><strong>🌐 JavaScript</strong> คือภาษาโปรแกรมที่ทำให้เว็บไซต์มีชีวิต!</p>
                    <ul>
                        <li>เปลี่ยนเนื้อหาบนหน้าเว็บแบบ Dynamic</li>
                        <li>ตอบสนองเมื่อผู้ใช้คลิก พิมพ์ หรือเลื่อนหน้า</li>
                        <li>ส่งข้อมูลไปหา Server โดยไม่ต้อง Refresh</li>
                        <li>สร้าง Animation และ Effects ต่างๆ</li>
                    </ul>
                    <p><strong>JavaScript ทำงานได้ทุกที่:</strong> Browser, Server (Node.js), Mobile App, Desktop App</p>
                `,
                codeExample: `// JavaScript ทำให้เว็บมีชีวิต!
console.log("สวัสดี JavaScript!");

// เปลี่ยนเนื้อหาบนหน้าเว็บได้
// document.getElementById("demo").innerHTML = "Hello";

// คำนวณได้
console.log("1 + 1 =", 1 + 1);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ <code>console.log()</code> แสดงข้อความ <code>"Hello World"</code>`,
                    expectedOutput: ["Hello World"],
                    hint: 'พิมพ์: console.log("Hello World");'
                }
            },
            {
                id: 2,
                title: "วิธีใส่โค้ด JavaScript",
                content: `
                    <p><strong>📝 3 วิธีใส่ JavaScript ในหน้าเว็บ:</strong></p>
                    <p><strong>1. Internal Script</strong> - ใส่ใน <code>&lt;script&gt;</code> tag</p>
                    <pre>&lt;script&gt;
  console.log("Hello");
&lt;/script&gt;</pre>
                    <p><strong>2. External Script</strong> - แยกไฟล์ .js (แนะนำ!)</p>
                    <pre>&lt;script src="script.js"&gt;&lt;/script&gt;</pre>
                    <p><strong>3. Inline</strong> - ใส่ใน attribute (ไม่แนะนำ)</p>
                    <pre>&lt;button onclick="alert('Hi')"&gt;Click&lt;/button&gt;</pre>
                    <p><strong>💡 Best Practice:</strong> ใส่ <code>&lt;script&gt;</code> ก่อน <code>&lt;/body&gt;</code></p>
                `,
                codeExample: `// ในโปรเจกต์จริง เราจะเขียนโค้ดในไฟล์ .js แยก
// แล้ว link ด้วย <script src="app.js"></script>

// ตัวอย่างโค้ดที่รันได้ทันที:
console.log("โค้ดนี้อยู่ในไฟล์ script.js");
console.log("แยกไฟล์ทำให้จัดการง่าย!");`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> แสดง 2 ข้อความ:<br>1. <code>"Line 1"</code><br>2. <code>"Line 2"</code>`,
                    expectedOutput: ["Line 1", "Line 2"],
                    hint: 'ใช้ console.log() สองครั้ง'
                }
            }
        ]
    },
    {
        id: "output",
        title: "Output",
        icon: "📺",
        description: "การแสดงผลใน JavaScript",
        lessons: [
            {
                id: 3,
                title: "console.log()",
                content: `
                    <p><strong>🖥️ console.log()</strong> แสดงผลใน Console ของ Browser (F12 > Console)</p>
                    <p><strong>ใช้สำหรับ:</strong></p>
                    <ul>
                        <li>Debug โค้ด - ดูค่าตัวแปร</li>
                        <li>ทดสอบการทำงาน</li>
                        <li>แสดงข้อความ Error</li>
                    </ul>
                    <p><strong>Console Methods อื่นๆ:</strong></p>
                    <ul>
                        <li><code>console.error()</code> - แสดง Error (สีแดง)</li>
                        <li><code>console.warn()</code> - แสดง Warning (สีเหลือง)</li>
                        <li><code>console.table()</code> - แสดงเป็นตาราง</li>
                    </ul>
                `,
                codeExample: `// console.log - ปกติ
console.log("ข้อมูลทั่วไป");

// console.error - Error
console.error("นี่คือ Error!");

// console.warn - Warning
console.warn("นี่คือ Warning!");

// แสดงหลายค่า
const name = "สมชาย";
const age = 25;
console.log("ชื่อ:", name, "อายุ:", age);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ <code>console.warn()</code> แสดงข้อความ <code>"Warning!"</code>`,
                    validateFn: (outputs, code) => {
                        return code.includes('console.warn') &&
                            outputs.some(o => o.content.includes('Warning!'));
                    },
                    hint: 'พิมพ์: console.warn("Warning!");'
                }
            },
            {
                id: 4,
                title: "innerHTML และ textContent",
                content: `
                    <p><strong>🌐 แสดงผลบนหน้าเว็บ:</strong></p>
                    <p><code>innerHTML</code> - ใส่ HTML ได้</p>
                    <p><code>textContent</code> - ข้อความอย่างเดียว (ปลอดภัยกว่า)</p>
                    <p><strong>⚠️ หมายเหตุ:</strong> ในเว็บนี้ใช้ console.log() เป็นหลัก เพราะปลอดภัยกว่า</p>
                `,
                codeExample: `// ในเว็บจริง เราใช้แบบนี้:
// document.getElementById("demo").innerHTML = "<b>Hello</b>";
// document.getElementById("demo").textContent = "Hello";

// ในบทเรียนนี้ ใช้ console.log แทน
console.log("แสดงผลใน Console");

// แสดงผล HTML entities
console.log("<b>Bold</b> - นี่คือ HTML code");`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> แสดงข้อความ <code>"Display on console"</code>`,
                    expectedOutput: ["Display on console"],
                    hint: 'console.log("Display on console");'
                }
            }
        ]
    },
    {
        id: "syntax",
        title: "Syntax & Comments",
        icon: "📝",
        description: "กฎการเขียนและ Comment",
        lessons: [
            {
                id: 5,
                title: "JavaScript Syntax",
                content: `
                    <p><strong>📏 กฎการเขียน JavaScript:</strong></p>
                    <ul>
                        <li><strong>Semicolon (;)</strong> - ใส่ท้ายคำสั่ง (ไม่บังคับ แต่แนะนำ)</li>
                        <li><strong>Case Sensitive</strong> - <code>name</code> ≠ <code>Name</code> ≠ <code>NAME</code></li>
                        <li><strong>Camel Case</strong> - ตั้งชื่อแบบ <code>firstName</code>, <code>myFunction</code></li>
                        <li><strong>White Space</strong> - เว้นวรรคไม่มีผล แต่ช่วยให้อ่านง่าย</li>
                    </ul>
                `,
                codeExample: `// Semicolon - แนะนำให้ใส่
let name = "John";
let age = 30;

// Case Sensitive
let myName = "สมชาย";
let MyName = "สมหญิง"; // คนละตัวแปร!
console.log(myName);  // สมชาย
console.log(MyName);  // สมหญิง

// Camel Case naming
let firstName = "John";
let lastName = "Doe";
console.log(firstName, lastName);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้างตัวแปร <code>myAge</code> (camelCase) เก็บอายุของคุณ แล้ว log ออกมา`,
                    validateFn: (outputs, code) => {
                        return code.includes('myAge') &&
                            outputs.length > 0 &&
                            !isNaN(Number(outputs[0].content));
                    },
                    hint: 'let myAge = 20; console.log(myAge);'
                }
            },
            {
                id: 6,
                title: "Comments",
                content: `
                    <p><strong>💬 Comment</strong> คือบันทึกในโค้ดที่ไม่ถูกรัน</p>
                    <p><strong>ใช้สำหรับ:</strong></p>
                    <ul>
                        <li>อธิบายโค้ดให้เข้าใจง่าย</li>
                        <li>ปิดการทำงานโค้ดชั่วคราว (Debug)</li>
                        <li>เขียน TODO หรือ FIXME</li>
                    </ul>
                    <p><strong>2 แบบ:</strong></p>
                    <ul>
                        <li><code>// single line</code></li>
                        <li><code>/* multi line */</code></li>
                    </ul>
                `,
                codeExample: `// นี่คือ single-line comment

/*
   นี่คือ multi-line comment
   เขียนได้หลายบรรทัด
*/

let x = 5; // comment ท้ายบรรทัด

// TODO: เพิ่มฟีเจอร์ใหม่
// FIXME: แก้ bug ตรงนี้

console.log(x);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> เขียน comment <code>// Hello</code> แล้ว log <code>"World"</code>`,
                    validateFn: (outputs, code) => {
                        return code.includes('//') &&
                            outputs.length > 0 &&
                            outputs[0].content === 'World';
                    },
                    hint: '// Hello (บรรทัดแรก) แล้ว console.log("World");'
                }
            }
        ]
    },
    {
        id: "variables",
        title: "Variables",
        icon: "📦",
        description: "ตัวแปร var, let, const",
        lessons: [
            {
                id: 7,
                title: "var, let, const",
                content: `
                    <p><strong>📦 ตัวแปร</strong> คือที่เก็บข้อมูล มี 3 แบบ:</p>
                    <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
                        <tr style="background: rgba(102,126,234,0.2);">
                            <th style="padding: 8px; text-align: left;">คำสั่ง</th>
                            <th style="padding: 8px; text-align: left;">เปลี่ยนค่า</th>
                            <th style="padding: 8px; text-align: left;">แนะนำ</th>
                        </tr>
                        <tr><td style="padding: 8px;"><code>var</code></td><td>✅</td><td>❌ หลีกเลี่ยง</td></tr>
                        <tr><td style="padding: 8px;"><code>let</code></td><td>✅</td><td>✅ ใช้เมื่อต้องเปลี่ยนค่า</td></tr>
                        <tr><td style="padding: 8px;"><code>const</code></td><td>❌</td><td>✅ ใช้เป็นหลัก</td></tr>
                    </table>
                    <p><strong>💡 Rule:</strong> ใช้ <code>const</code> ก่อน ถ้าต้องเปลี่ยนค่อยใช้ <code>let</code></p>
                `,
                codeExample: `// const - ค่าคงที่ (เปลี่ยนไม่ได้)
const PI = 3.14159;
const siteName = "JS Master";
console.log(PI);
console.log(siteName);

// let - เปลี่ยนค่าได้
let score = 0;
console.log("Before:", score);
score = 100;
console.log("After:", score);

// var - ไม่แนะนำ (ปัญหา scope)
var oldStyle = "avoid this";`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง <code>const appName = "MyApp"</code> แล้ว log ออกมา`,
                    expectedOutput: ["MyApp"],
                    hint: 'const appName = "MyApp"; console.log(appName);'
                }
            },
            {
                id: 8,
                title: "การตั้งชื่อตัวแปร",
                content: `
                    <p><strong>📛 กฎการตั้งชื่อ:</strong></p>
                    <ul>
                        <li>เริ่มด้วย ตัวอักษร, _ หรือ $</li>
                        <li>ห้ามเริ่มด้วยตัวเลข</li>
                        <li>ห้ามมีช่องว่าง</li>
                        <li>ห้ามใช้ Reserved Words (let, const, function, etc.)</li>
                    </ul>
                    <p><strong>💡 Naming Conventions:</strong></p>
                    <ul>
                        <li><code>camelCase</code> - ตัวแปร, ฟังก์ชัน</li>
                        <li><code>PascalCase</code> - Class</li>
                        <li><code>UPPER_CASE</code> - ค่าคงที่</li>
                    </ul>
                `,
                codeExample: `// ✅ ถูกต้อง
let firstName = "John";
let _private = "secret";
let $money = 1000;
let user2 = "second user";

// ❌ ผิด (จะ Error)
// let 2user = "error";  // เริ่มด้วยตัวเลข
// let first name = "x"; // มีช่องว่าง
// let let = "x";        // reserved word

// Naming Conventions
const MAX_SIZE = 100;        // ค่าคงที่
let itemCount = 0;           // camelCase
// class UserProfile {}     // PascalCase

console.log(firstName, _private, $money);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้างค่าคงที่ <code>MAX_USERS</code> = <code>100</code> แล้ว log`,
                    expectedOutput: ["100"],
                    hint: 'const MAX_USERS = 100; console.log(MAX_USERS);'
                }
            }
        ]
    },
    {
        id: "operators",
        title: "Operators",
        icon: "➕",
        description: "เครื่องหมายการคำนวณและการกำหนดค่า",
        lessons: [
            {
                id: 9,
                title: "Arithmetic Operators",
                content: `
                    <p><strong>🔢 ตัวดำเนินการทางคณิตศาสตร์:</strong></p>
                    <ul>
                        <li><code>+</code> บวก</li>
                        <li><code>-</code> ลบ</li>
                        <li><code>*</code> คูณ</li>
                        <li><code>/</code> หาร</li>
                        <li><code>%</code> หารเอาเศษ (Modulo)</li>
                        <li><code>**</code> ยกกำลัง</li>
                        <li><code>++</code> เพิ่ม 1, <code>--</code> ลด 1</li>
                    </ul>
                `,
                codeExample: `let a = 10;
let b = 3;

console.log("a + b =", a + b);  // 13
console.log("a - b =", a - b);  // 7
console.log("a * b =", a * b);  // 30
console.log("a / b =", a / b);  // 3.333...
console.log("a % b =", a % b);  // 1 (เศษ)
console.log("a ** b =", a ** b); // 1000 (10^3)

// ++ และ --
let x = 5;
x++;
console.log("x++ =", x);  // 6`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> คำนวณ <code>17 % 5</code> (หารเอาเศษ) แล้ว log ผลลัพธ์`,
                    expectedOutput: ["2"],
                    hint: 'console.log(17 % 5); // 17 หาร 5 = 3 เศษ 2'
                }
            },
            {
                id: 10,
                title: "Assignment Operators",
                content: `
                    <p><strong>📝 ตัวดำเนินการกำหนดค่า:</strong></p>
                    <ul>
                        <li><code>=</code> กำหนดค่า</li>
                        <li><code>+=</code> บวกแล้วเก็บ</li>
                        <li><code>-=</code> ลบแล้วเก็บ</li>
                        <li><code>*=</code> คูณแล้วเก็บ</li>
                        <li><code>/=</code> หารแล้วเก็บ</li>
                    </ul>
                    <p><code>x += 5</code> เหมือนกับ <code>x = x + 5</code></p>
                `,
                codeExample: `let x = 10;
console.log("เริ่มต้น:", x);

x += 5;  // x = x + 5
console.log("x += 5 :", x);  // 15

x -= 3;  // x = x - 3
console.log("x -= 3 :", x);  // 12

x *= 2;  // x = x * 2
console.log("x *= 2 :", x);  // 24

x /= 4;  // x = x / 4
console.log("x /= 4 :", x);  // 6`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง <code>let num = 10</code> แล้วใช้ <code>num += 5</code> และ log ผลลัพธ์`,
                    expectedOutput: ["15"],
                    hint: 'let num = 10; num += 5; console.log(num);'
                }
            },
            {
                id: 11,
                title: "Comparison & Logical",
                content: `
                    <p><strong>⚖️ ตัวดำเนินการเปรียบเทียบ:</strong></p>
                    <ul>
                        <li><code>===</code> เท่ากัน (ค่าและชนิด) ✅</li>
                        <li><code>!==</code> ไม่เท่ากัน ✅</li>
                        <li><code>==</code> เท่ากัน (ค่าอย่างเดียว) ❌</li>
                        <li><code>></code> <code><</code> <code>>=</code> <code><=</code></li>
                    </ul>
                    <p><strong>🔗 ตัวดำเนินการตรรกะ:</strong></p>
                    <ul>
                        <li><code>&&</code> AND - ทั้งสอง true</li>
                        <li><code>||</code> OR - อย่างน้อยหนึ่ง true</li>
                        <li><code>!</code> NOT - กลับค่า</li>
                    </ul>
                `,
                codeExample: `// Comparison
console.log(5 === 5);     // true
console.log(5 === "5");   // false (ต่างชนิด)
console.log(5 == "5");    // true (แค่ค่า - ไม่แนะนำ)
console.log(10 > 5);      // true
console.log(10 >= 10);    // true

// Logical
console.log(true && true);   // true
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false

// ใช้จริง
let age = 20;
let hasID = true;
console.log(age >= 18 && hasID); // true`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> เช็คว่า <code>10 === 10</code> แล้ว log ผลลัพธ์ (true หรือ false)`,
                    expectedOutput: ["true"],
                    hint: 'console.log(10 === 10);'
                }
            }
        ]
    },
    {
        id: "datatypes",
        title: "Data Types",
        icon: "🏷️",
        description: "ชนิดข้อมูลใน JavaScript",
        lessons: [
            {
                id: 12,
                title: "Primitive Types",
                content: `
                    <p><strong>🏷️ Primitive Types</strong> - ข้อมูลพื้นฐาน:</p>
                    <ul>
                        <li><code>String</code> - ข้อความ <code>"Hello"</code></li>
                        <li><code>Number</code> - ตัวเลข <code>42</code>, <code>3.14</code></li>
                        <li><code>Boolean</code> - <code>true</code> / <code>false</code></li>
                        <li><code>undefined</code> - ยังไม่กำหนดค่า</li>
                        <li><code>null</code> - ค่าว่างโดยตั้งใจ</li>
                        <li><code>Symbol</code> - ค่า unique (ไม่ค่อยใช้)</li>
                        <li><code>BigInt</code> - ตัวเลขใหญ่มาก</li>
                    </ul>
                `,
                codeExample: `// String
const name = "สมชาย";

// Number
const age = 25;
const price = 99.50;

// Boolean
const isActive = true;

// undefined
let unknown;

// null
const empty = null;

// ตรวจสอบด้วย typeof
console.log(typeof name);     // string
console.log(typeof age);      // number
console.log(typeof isActive); // boolean
console.log(typeof unknown);  // undefined
console.log(typeof empty);    // object (bug เก่าของ JS)`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้างตัวแปร 3 ตัว: String, Number, Boolean แล้ว log typeof ของแต่ละตัว`,
                    validateFn: (outputs, code) => {
                        return outputs.length >= 3 &&
                            outputs.some(o => o.content === 'string') &&
                            outputs.some(o => o.content === 'number') &&
                            outputs.some(o => o.content === 'boolean');
                    },
                    hint: 'const s = "hi"; const n = 1; const b = true; console.log(typeof s); ...'
                }
            },
            {
                id: 13,
                title: "Array",
                content: `
                    <p><strong>📋 Array</strong> คือรายการข้อมูลหลายค่า</p>
                    <ul>
                        <li>สร้างด้วย <code>[ ]</code></li>
                        <li>Index เริ่มที่ <code>0</code></li>
                        <li>ใช้ <code>.length</code> นับจำนวน</li>
                    </ul>
                `,
                codeExample: `// สร้าง Array
const fruits = ["Apple", "Banana", "Orange"];

// เข้าถึงสมาชิก (index เริ่มที่ 0)
console.log(fruits[0]);  // Apple
console.log(fruits[1]);  // Banana
console.log(fruits[2]);  // Orange

// จำนวนสมาชิก
console.log(fruits.length);  // 3

// เพิ่ม/ลบ
fruits.push("Mango");     // เพิ่มท้าย
console.log(fruits);

fruits.pop();             // ลบท้าย
console.log(fruits);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง Array <code>nums</code> มี <code>[1, 2, 3]</code> แล้ว log <code>nums.length</code>`,
                    expectedOutput: ["3"],
                    hint: 'const nums = [1, 2, 3]; console.log(nums.length);'
                }
            },
            {
                id: 14,
                title: "Object",
                content: `
                    <p><strong>🏠 Object</strong> เก็บข้อมูลแบบ key-value</p>
                    <ul>
                        <li>สร้างด้วย <code>{ }</code></li>
                        <li>เข้าถึงด้วย <code>obj.key</code> หรือ <code>obj["key"]</code></li>
                    </ul>
                `,
                codeExample: `// สร้าง Object
const person = {
    name: "สมชาย",
    age: 25,
    isStudent: true
};

// เข้าถึงข้อมูล
console.log(person.name);      // สมชาย
console.log(person["age"]);    // 25

// เพิ่ม/แก้ไข
person.email = "test@mail.com";
person.age = 26;

console.log(person.email);
console.log(person.age);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง Object <code>car</code> มี <code>brand: "Toyota"</code> แล้ว log <code>car.brand</code>`,
                    expectedOutput: ["Toyota"],
                    hint: 'const car = { brand: "Toyota" }; console.log(car.brand);'
                }
            }
        ]
    },
    {
        id: "functions",
        title: "Functions",
        icon: "⚡",
        description: "ฟังก์ชันพื้นฐาน",
        lessons: [
            {
                id: 15,
                title: "Function Declaration",
                content: `
                    <p><strong>⚡ Function</strong> คือกลุ่มโค้ดที่เรียกใช้ซ้ำได้</p>
                    <p><strong>ส่วนประกอบ:</strong></p>
                    <ul>
                        <li><code>function</code> keyword</li>
                        <li>ชื่อฟังก์ชัน</li>
                        <li>Parameters (ถ้ามี)</li>
                        <li><code>return</code> ส่งค่ากลับ (ถ้าต้องการ)</li>
                    </ul>
                `,
                codeExample: `// ฟังก์ชันไม่รับ parameter
function sayHello() {
    console.log("Hello!");
}
sayHello();

// ฟังก์ชันรับ parameter
function greet(name) {
    console.log("Hello, " + name + "!");
}
greet("สมชาย");

// ฟังก์ชัน return ค่า
function add(a, b) {
    return a + b;
}
const sum = add(5, 3);
console.log("5 + 3 =", sum);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้างฟังก์ชัน <code>double(n)</code> ที่ return <code>n * 2</code> แล้ว log <code>double(5)</code>`,
                    expectedOutput: ["10"],
                    hint: 'function double(n) { return n * 2; } console.log(double(5));'
                }
            },
            {
                id: 16,
                title: "Parameters & Return",
                content: `
                    <p><strong>📥 Parameters</strong> - ค่าที่ส่งเข้าฟังก์ชัน</p>
                    <p><strong>📤 Return</strong> - ค่าที่ส่งออกจากฟังก์ชัน</p>
                    <p><strong>💡 Default Parameters:</strong> กำหนดค่าเริ่มต้นได้</p>
                `,
                codeExample: `// หลาย Parameters
function introduce(name, age) {
    return "ผมชื่อ " + name + " อายุ " + age + " ปี";
}
console.log(introduce("สมชาย", 25));

// Default Parameter
function greet(name = "Guest") {
    return "Hello, " + name;
}
console.log(greet());        // Hello, Guest
console.log(greet("John"));  // Hello, John

// Return หลายค่า (ใช้ Object)
function calc(a, b) {
    return { sum: a + b, diff: a - b };
}
const result = calc(10, 3);
console.log(result.sum, result.diff);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้างฟังก์ชัน <code>multiply(a, b)</code> return <code>a * b</code> แล้ว log <code>multiply(4, 5)</code>`,
                    expectedOutput: ["20"],
                    hint: 'function multiply(a, b) { return a * b; } console.log(multiply(4, 5));'
                }
            }
        ]
    },
    {
        id: "objects",
        title: "Objects",
        icon: "🏠",
        description: "Object Properties & Methods",
        lessons: [
            {
                id: 17,
                title: "Object Properties",
                content: `
                    <p><strong>🏠 Object Properties</strong> คือข้อมูลใน Object</p>
                    <p><strong>วิธีเข้าถึง:</strong></p>
                    <ul>
                        <li><code>obj.property</code> - Dot notation</li>
                        <li><code>obj["property"]</code> - Bracket notation</li>
                    </ul>
                `,
                codeExample: `const user = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    "is-active": true  // ชื่อมี - ต้องใส่ ""
};

// Dot notation
console.log(user.firstName);

// Bracket notation (ใช้กับชื่อพิเศษ)
console.log(user["lastName"]);
console.log(user["is-active"]);

// วนดู properties
for (let key in user) {
    console.log(key + ": " + user[key]);
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง Object <code>book</code> มี <code>title</code> และ <code>price</code> แล้ว log <code>book.title</code>`,
                    validateFn: (outputs, code) => {
                        return code.includes('book') &&
                            code.includes('title') &&
                            code.includes('price') &&
                            outputs.length > 0;
                    },
                    hint: 'const book = { title: "JS", price: 299 }; console.log(book.title);'
                }
            },
            {
                id: 18,
                title: "Object Methods",
                content: `
                    <p><strong>⚡ Methods</strong> คือ Function ที่อยู่ใน Object</p>
                    <p>ใช้ <code>this</code> อ้างถึง Object ตัวเอง</p>
                `,
                codeExample: `const person = {
    name: "สมชาย",
    age: 25,
    
    // Method
    greet: function() {
        console.log("สวัสดีครับ ผม " + this.name);
    },
    
    // Method แบบสั้น (ES6)
    introduce() {
        console.log("ผมอายุ " + this.age + " ปี");
    }
};

// เรียกใช้ Method
person.greet();
person.introduce();`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง Object <code>calc</code> มี method <code>add(a, b)</code> return <code>a + b</code> แล้ว log <code>calc.add(2, 3)</code>`,
                    expectedOutput: ["5"],
                    hint: 'const calc = { add(a, b) { return a + b; } }; console.log(calc.add(2, 3));'
                }
            }
        ]
    }
];

// Export for use
if (typeof module !== 'undefined') {
    module.exports = coursesPart1;
}

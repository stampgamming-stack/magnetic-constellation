/**
 * JS Master - Part 3: ขั้นสูง (บทที่ 40-55)
 * Errors, Scope, Strict Mode, This, Arrow Function, Classes, Modules, JSON
 */

const coursesPart3 = [
    {
        id: "errors",
        title: "Error Handling",
        icon: "🚨",
        description: "การดักจับข้อผิดพลาด Try-Catch",
        lessons: [
            {
                id: 40,
                title: "try...catch",
                content: `
                    <p><strong>🚨 try...catch</strong> - ดักจับ Error ไม่ให้โปรแกรมพัง</p>
                    <ul>
                        <li><code>try</code> - โค้ดที่อาจ Error</li>
                        <li><code>catch</code> - จัดการเมื่อ Error</li>
                        <li><code>finally</code> - ทำเสมอไม่ว่าจะ Error หรือไม่</li>
                    </ul>
                `,
                codeExample: `// try...catch พื้นฐาน
try {
    // โค้ดที่อาจ Error
    const result = JSON.parse("invalid json");
} catch (error) {
    console.log("Error:", error.message);
}

console.log("โปรแกรมยังทำงานต่อ!");

// finally
try {
    console.log("Trying...");
    // throw new Error("Test error");
} catch (e) {
    console.log("Caught:", e.message);
} finally {
    console.log("Finally: ทำเสมอ");
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ try...catch ดักจับ <code>JSON.parse("{")</code> แล้ว log <code>"Error caught"</code>`,
                    expectedOutput: ["Error caught"],
                    hint: 'try { JSON.parse("{"); } catch (e) { console.log("Error caught"); }'
                }
            },
            {
                id: 41,
                title: "throw และ Error Types",
                content: `
                    <p><strong>🎯 throw</strong> - สร้าง Error เอง</p>
                    <p><strong>Error Types:</strong></p>
                    <ul>
                        <li><code>Error</code> - ทั่วไป</li>
                        <li><code>TypeError</code> - ชนิดข้อมูลผิด</li>
                        <li><code>ReferenceError</code> - อ้างถึงสิ่งที่ไม่มี</li>
                        <li><code>SyntaxError</code> - syntax ผิด</li>
                        <li><code>RangeError</code> - ค่าเกินขอบเขต</li>
                    </ul>
                `,
                codeExample: `// throw Error เอง
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!");
    }
    return a / b;
}

try {
    console.log(divide(10, 2)); // 5
    console.log(divide(10, 0)); // Error!
} catch (e) {
    console.log("Error:", e.message);
}

// Custom validation
function validateAge(age) {
    if (typeof age !== "number") {
        throw new TypeError("Age must be a number");
    }
    if (age < 0 || age > 150) {
        throw new RangeError("Age must be 0-150");
    }
    return true;
}

try {
    validateAge(25);
    console.log("Age valid!");
} catch (e) {
    console.log(e.name + ": " + e.message);
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้างฟังก์ชัน <code>check(n)</code> ที่ throw Error ถ้า n < 0 มิฉะนั้น log <code>"OK"</code>`,
                    validateFn: (outputs, code) => {
                        return code.includes('throw') &&
                            code.includes('Error') &&
                            outputs.some(o => o.content === 'OK');
                    },
                    hint: 'function check(n) { if (n < 0) throw new Error("Negative"); console.log("OK"); } check(5);'
                }
            }
        ]
    },
    {
        id: "scope",
        title: "Scope & Hoisting",
        icon: "📦",
        description: "ขอบเขตตัวแปร Global vs Local",
        lessons: [
            {
                id: 42,
                title: "Global vs Local Scope",
                content: `
                    <p><strong>📦 Scope</strong> คือขอบเขตที่ตัวแปรใช้ได้</p>
                    <ul>
                        <li><code>Global</code> - ประกาศนอกฟังก์ชัน ใช้ได้ทุกที่</li>
                        <li><code>Local/Function</code> - ใช้ได้เฉพาะในฟังก์ชัน</li>
                        <li><code>Block</code> - ใช้ได้เฉพาะใน { } (let/const)</li>
                    </ul>
                `,
                codeExample: `// Global Scope
const globalVar = "I'm global";

function test() {
    // Local Scope
    const localVar = "I'm local";
    console.log(globalVar); // ✅ เข้าถึงได้
    console.log(localVar);  // ✅ เข้าถึงได้
}

test();
console.log(globalVar); // ✅ เข้าถึงได้
// console.log(localVar); // ❌ Error!

// Block Scope (let/const)
if (true) {
    let blockVar = "I'm in block";
    var noBlockVar = "var ไม่มี block scope";
}
// console.log(blockVar);  // ❌ Error!
console.log(noBlockVar);   // ✅ var ไม่มี block scope!`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง global <code>x = 10</code> แล้วสร้างฟังก์ชัน <code>show()</code> ที่ log x แล้วเรียก`,
                    expectedOutput: ["10"],
                    hint: 'const x = 10; function show() { console.log(x); } show();'
                }
            },
            {
                id: 43,
                title: "Hoisting",
                content: `
                    <p><strong>⬆️ Hoisting</strong> - JS ยก declaration ขึ้นบนสุด</p>
                    <ul>
                        <li><code>var</code> - hoisted (แต่ค่าเป็น undefined)</li>
                        <li><code>let/const</code> - hoisted แต่ใช้ก่อน declare ไม่ได้</li>
                        <li><code>function</code> - hoisted ทั้ง declaration</li>
                    </ul>
                `,
                codeExample: `// var hoisting
console.log(a); // undefined (ไม่ Error!)
var a = 5;
console.log(a); // 5

// let/const - Temporal Dead Zone
// console.log(b); // ❌ ReferenceError!
let b = 10;
console.log(b); // 10

// Function hoisting
sayHi(); // ✅ เรียกก่อน declare ได้!
function sayHi() {
    console.log("Hi!");
}

// Function expression ไม่ hoist
// sayBye(); // ❌ Error!
const sayBye = function() {
    console.log("Bye!");
};
sayBye(); // ✅`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> เรียกฟังก์ชัน <code>greet()</code> ก่อน declare แล้ว declare ทีหลัง`,
                    validateFn: (outputs, code) => {
                        const lines = code.split('\n');
                        const greetCallIndex = lines.findIndex(l => l.includes('greet()') && !l.includes('function'));
                        const greetDefIndex = lines.findIndex(l => l.includes('function greet'));
                        return greetCallIndex < greetDefIndex && outputs.length > 0;
                    },
                    hint: 'greet(); function greet() { console.log("Hello"); }'
                }
            }
        ]
    },
    {
        id: "strict-mode",
        title: "Strict Mode",
        icon: "🔒",
        description: "โหมดเข้มงวด",
        lessons: [
            {
                id: 44,
                title: "use strict",
                content: `
                    <p><strong>🔒 "use strict"</strong> - เปิดโหมดเข้มงวด</p>
                    <p><strong>ประโยชน์:</strong></p>
                    <ul>
                        <li>บังคับ declare ตัวแปร</li>
                        <li>ห้ามลบ property ที่ลบไม่ได้</li>
                        <li>ห้ามใช้ชื่อ parameter ซ้ำ</li>
                        <li>ช่วยหาบั๊กง่ายขึ้น</li>
                    </ul>
                    <p><strong>💡 ES6 Modules เปิด strict อัตโนมัติ</strong></p>
                `,
                codeExample: `// เปิด strict mode
"use strict";

// ✅ ถูกต้อง
let x = 10;
console.log(x);

// ❌ Error ใน strict mode:
// y = 20; // ต้อง declare ก่อน!

// ❌ ห้ามลบ
// delete Object.prototype; // Error!

// ตัวอย่างที่ดี
function multiply(a, b) {
    "use strict";
    return a * b;
}

console.log(multiply(3, 4));`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ประกาศ <code>"use strict";</code> แล้วสร้างตัวแปร <code>let name = "JS"</code> และ log`,
                    expectedOutput: ["JS"],
                    hint: '"use strict"; let name = "JS"; console.log(name);'
                }
            }
        ]
    },
    {
        id: "this-keyword",
        title: "This Keyword",
        icon: "👆",
        description: "คำสั่ง this คืออะไร",
        lessons: [
            {
                id: 45,
                title: "this ในบริบทต่างๆ",
                content: `
                    <p><strong>👆 this</strong> อ้างถึงสิ่งที่ต่างกันขึ้นอยู่กับ context:</p>
                    <ul>
                        <li><strong>Global</strong> - window (browser)</li>
                        <li><strong>Object method</strong> - Object นั้น</li>
                        <li><strong>Event</strong> - Element ที่ถูก trigger</li>
                        <li><strong>Arrow function</strong> - ไม่มี this ของตัวเอง</li>
                    </ul>
                `,
                codeExample: `// this ใน Object method
const person = {
    name: "สมชาย",
    greet: function() {
        console.log("Hello, " + this.name);
    }
};
person.greet(); // "Hello, สมชาย"

// this ขึ้นอยู่กับวิธีเรียก
const obj = {
    value: 42,
    getValue: function() {
        return this.value;
    }
};
console.log(obj.getValue()); // 42

// Arrow function ไม่มี this ของตัวเอง
const obj2 = {
    name: "Test",
    // ❌ Arrow function
    arrowFn: () => {
        console.log("Arrow this:", typeof this);
    },
    // ✅ Regular function
    regularFn: function() {
        console.log("Regular this.name:", this.name);
    }
};
obj2.arrowFn();   // Arrow this: undefined (หรือ window)
obj2.regularFn(); // Regular this.name: Test`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง Object <code>user</code> มี name และ method <code>sayName()</code> ที่ log <code>this.name</code>`,
                    validateFn: (outputs, code) => {
                        return code.includes('this.name') &&
                            code.includes('user') &&
                            outputs.length > 0;
                    },
                    hint: 'const user = { name: "A", sayName() { console.log(this.name); } }; user.sayName();'
                }
            },
            {
                id: 46,
                title: "bind, call, apply",
                content: `
                    <p><strong>🔗 กำหนด this เอง:</strong></p>
                    <ul>
                        <li><code>bind(this)</code> - สร้างฟังก์ชันใหม่ที่ผูก this</li>
                        <li><code>call(this, args...)</code> - เรียกทันทีพร้อม args</li>
                        <li><code>apply(this, [args])</code> - เรียกทันทีพร้อม array</li>
                    </ul>
                `,
                codeExample: `function greet(greeting) {
    console.log(greeting + ", " + this.name);
}

const user1 = { name: "John" };
const user2 = { name: "Jane" };

// call - เรียกทันที
greet.call(user1, "Hello");  // Hello, John
greet.call(user2, "Hi");     // Hi, Jane

// apply - args เป็น array
greet.apply(user1, ["Hey"]); // Hey, John

// bind - สร้างฟังก์ชันใหม่
const greetJohn = greet.bind(user1);
greetJohn("Yo"); // Yo, John

// ใช้จริง: callback
const obj = {
    count: 0,
    inc: function() {
        this.count++;
        console.log(this.count);
    }
};
obj.inc();`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ <code>call</code> เรียก <code>fn()</code> ด้วย this เป็น <code>{ x: 5 }</code>`,
                    expectedOutput: ["5"],
                    hint: 'function fn() { console.log(this.x); } fn.call({ x: 5 });'
                }
            }
        ]
    },
    {
        id: "arrow-functions",
        title: "Arrow Functions",
        icon: "➡️",
        description: "Arrow Function (ES6)",
        lessons: [
            {
                id: 47,
                title: "Arrow Function Syntax",
                content: `
                    <p><strong>➡️ Arrow Function</strong> (ES6) - syntax สั้นกว่า</p>
                    <p><strong>รูปแบบ:</strong></p>
                    <pre>// เต็มรูป
(params) => { statements }

// สั้น (return อัตโนมัติ)
(params) => expression

// parameter เดียว
param => expression</pre>
                `,
                codeExample: `// Regular function
function add(a, b) {
    return a + b;
}

// Arrow function
const addArrow = (a, b) => {
    return a + b;
};

// Arrow function สั้น (implicit return)
const addShort = (a, b) => a + b;

console.log(add(2, 3));      // 5
console.log(addArrow(2, 3)); // 5
console.log(addShort(2, 3)); // 5

// Parameter เดียว ไม่ต้องใส่ ()
const double = n => n * 2;
console.log(double(5)); // 10

// ไม่มี parameter
const sayHi = () => console.log("Hi!");
sayHi();`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง Arrow Function <code>square</code> ที่ return <code>n * n</code> แล้ว log <code>square(4)</code>`,
                    expectedOutput: ["16"],
                    hint: 'const square = n => n * n; console.log(square(4));'
                }
            },
            {
                id: 48,
                title: "Arrow vs Regular Function",
                content: `
                    <p><strong>⚖️ ความแตกต่าง:</strong></p>
                    <table style="width:100%; border-collapse:collapse;">
                        <tr style="background:rgba(102,126,234,0.2);">
                            <th style="padding:8px;">Feature</th>
                            <th style="padding:8px;">Regular</th>
                            <th style="padding:8px;">Arrow</th>
                        </tr>
                        <tr><td style="padding:8px;">this</td><td>dynamic</td><td>lexical (จาก parent)</td></tr>
                        <tr><td style="padding:8px;">arguments</td><td>✅</td><td>❌</td></tr>
                        <tr><td style="padding:8px;">constructor</td><td>✅</td><td>❌</td></tr>
                        <tr><td style="padding:8px;">hoisting</td><td>✅</td><td>❌</td></tr>
                    </table>
                `,
                codeExample: `// this ต่างกัน
const obj = {
    name: "Test",
    
    regular: function() {
        console.log("Regular:", this.name);
    },
    
    arrow: () => {
        // this ไม่ใช่ obj!
        console.log("Arrow this:", typeof this);
    },
    
    // ใช้ Arrow ใน callback
    delayed: function() {
        setTimeout(() => {
            console.log("Arrow keeps this:", this.name);
        }, 100);
    }
};

obj.regular();
obj.arrow();

// ใช้ดีใน Array methods
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ Arrow Function กับ <code>map</code> แปลง <code>[1,2,3]</code> เป็น <code>[2,4,6]</code>`,
                    expectedOutput: ["2,4,6"],
                    hint: 'console.log([1,2,3].map(n => n * 2).toString());'
                }
            }
        ]
    },
    {
        id: "classes",
        title: "Classes",
        icon: "🏛️",
        description: "Object-Oriented Programming (OOP)",
        lessons: [
            {
                id: 49,
                title: "Class พื้นฐาน",
                content: `
                    <p><strong>🏛️ Class</strong> (ES6) - แม่แบบสร้าง Object</p>
                    <ul>
                        <li><code>constructor</code> - เรียกตอนสร้าง instance</li>
                        <li><code>methods</code> - ฟังก์ชันของ class</li>
                        <li><code>new</code> - สร้าง instance ใหม่</li>
                    </ul>
                `,
                codeExample: `class Person {
    // Constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    greet() {
        console.log(\`Hello, I'm \${this.name}\`);
    }
    
    getAge() {
        return this.age;
    }
}

// สร้าง instance
const person1 = new Person("สมชาย", 25);
const person2 = new Person("สมหญิง", 22);

person1.greet(); // Hello, I'm สมชาย
person2.greet(); // Hello, I'm สมหญิง

console.log(person1.getAge()); // 25`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง class <code>Car</code> มี <code>brand</code> และ method <code>show()</code> log brand แล้วทดสอบ`,
                    validateFn: (outputs, code) => {
                        return code.includes('class Car') &&
                            code.includes('constructor') &&
                            outputs.length > 0;
                    },
                    hint: 'class Car { constructor(b) { this.brand = b; } show() { console.log(this.brand); } } new Car("Toyota").show();'
                }
            },
            {
                id: 50,
                title: "Inheritance (extends)",
                content: `
                    <p><strong>🧬 Inheritance</strong> - สืบทอด class</p>
                    <ul>
                        <li><code>extends</code> - สืบทอดจาก class อื่น</li>
                        <li><code>super</code> - เรียก constructor/method ของ parent</li>
                    </ul>
                `,
                codeExample: `// Parent class
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(this.name + " makes a sound");
    }
}

// Child class
class Dog extends Animal {
    constructor(name, breed) {
        super(name); // เรียก parent constructor
        this.breed = breed;
    }
    
    // Override method
    speak() {
        console.log(this.name + " barks!");
    }
    
    // New method
    fetch() {
        console.log(this.name + " fetches the ball");
    }
}

const dog = new Dog("Buddy", "Golden");
dog.speak(); // Buddy barks!
dog.fetch(); // Buddy fetches the ball
console.log(dog.breed); // Golden`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง class <code>Student</code> extends <code>Person</code> ที่มี grade เพิ่ม`,
                    validateFn: (outputs, code) => {
                        return code.includes('extends') &&
                            code.includes('super') &&
                            outputs.length > 0;
                    },
                    hint: 'class Person { constructor(n) { this.name = n; } } class Student extends Person { constructor(n, g) { super(n); this.grade = g; } }'
                }
            },
            {
                id: 51,
                title: "Static และ Private",
                content: `
                    <p><strong>🔒 Static</strong> - เรียกจาก class โดยตรง (ไม่ต้อง new)</p>
                    <p><strong>🔐 Private</strong> - ใช้ # นำหน้า (ES2022)</p>
                `,
                codeExample: `class MathUtils {
    // Static property
    static PI = 3.14159;
    
    // Static method
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
}

// เรียกจาก class โดยตรง
console.log(MathUtils.PI);          // 3.14159
console.log(MathUtils.add(2, 3));   // 5

// ไม่ต้อง new
// const m = new MathUtils();
// m.add(2, 3); // ❌

// Private fields (#)
class BankAccount {
    #balance = 0; // private
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // 100
// console.log(acc.#balance); // ❌ Error!`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง class <code>Calculator</code> มี static method <code>sum(a, b)</code> แล้วเรียกใช้`,
                    expectedOutput: ["7"],
                    hint: 'class Calculator { static sum(a, b) { return a + b; } } console.log(Calculator.sum(3, 4));'
                }
            }
        ]
    },
    {
        id: "modules",
        title: "Modules",
        icon: "📦",
        description: "Import/Export แยกไฟล์",
        lessons: [
            {
                id: 52,
                title: "Export",
                content: `
                    <p><strong>📤 Export</strong> - ส่งออกจาก module</p>
                    <ul>
                        <li><code>export</code> - Named export</li>
                        <li><code>export default</code> - Default export (1 ต่อไฟล์)</li>
                    </ul>
                    <p><strong>⚠️ หมายเหตุ:</strong> ต้องใช้กับ bundler หรือ <code>&lt;script type="module"&gt;</code></p>
                `,
                codeExample: `// ===== utils.js =====

// Named exports
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Default export
export default class Calculator {
    static sum(a, b) {
        return a + b;
    }
}

// หรือ export ทีหลัง
const SECRET = "abc123";
// export { SECRET };

// ในบทเรียนนี้ จำลองการใช้งาน
const utils = {
    PI: 3.14159,
    add: (a, b) => a + b
};

console.log(utils.PI);
console.log(utils.add(2, 3));`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง object <code>math</code> มี <code>PI</code> และ function <code>square</code> แล้ว log ทั้งคู่`,
                    validateFn: (outputs, code) => {
                        return code.includes('PI') &&
                            code.includes('square') &&
                            outputs.length >= 2;
                    },
                    hint: 'const math = { PI: 3.14, square: n => n * n }; console.log(math.PI); console.log(math.square(3));'
                }
            },
            {
                id: 53,
                title: "Import",
                content: `
                    <p><strong>📥 Import</strong> - นำเข้าจาก module อื่น</p>
                    <ul>
                        <li><code>import { name }</code> - Named import</li>
                        <li><code>import name</code> - Default import</li>
                        <li><code>import * as</code> - Import ทั้งหมด</li>
                    </ul>
                `,
                codeExample: `// ===== ตัวอย่างการ Import =====

// Named import
// import { PI, add } from './utils.js';

// Default import
// import Calculator from './utils.js';

// Rename
// import { add as sum } from './utils.js';

// Import all
// import * as Utils from './utils.js';
// Utils.add(1, 2);

// จำลองในบทเรียน
const utils = {
    PI: 3.14159,
    add: (a, b) => a + b,
    multiply: (a, b) => a * b
};

// ใช้งานเหมือน import
const { PI, add } = utils;
console.log(PI);
console.log(add(5, 3));

// Destructuring assignment
const { multiply } = utils;
console.log(multiply(4, 5));`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ destructuring ดึง <code>a</code> และ <code>b</code> จาก <code>{ a: 1, b: 2 }</code> แล้ว log ทั้งคู่`,
                    expectedOutput: ["1", "2"],
                    hint: 'const { a, b } = { a: 1, b: 2 }; console.log(a); console.log(b);'
                }
            }
        ]
    },
    {
        id: "json",
        title: "JSON",
        icon: "📄",
        description: "รูปแบบข้อมูลมาตรฐาน",
        lessons: [
            {
                id: 54,
                title: "JSON คืออะไร",
                content: `
                    <p><strong>📄 JSON</strong> (JavaScript Object Notation)</p>
                    <p>รูปแบบข้อมูลที่ใช้แลกเปลี่ยนข้อมูลระหว่าง server และ client</p>
                    <p><strong>กฎ:</strong></p>
                    <ul>
                        <li>Key ต้องใส่ <code>" "</code></li>
                        <li>ไม่รองรับ function หรือ undefined</li>
                        <li>String ต้องใช้ <code>" "</code> (ไม่ใช่ ')</li>
                    </ul>
                `,
                codeExample: `// JSON format (ต้องเป็น String)
const jsonString = '{"name": "John", "age": 30, "active": true}';

// Object ปกติ
const obj = {
    name: "John",
    age: 30,
    active: true
};

console.log("JSON String:", jsonString);
console.log("Object:", obj);

// JSON รองรับ
// - String, Number, Boolean
// - Object, Array
// - null

// JSON ไม่รองรับ
// - function
// - undefined
// - Date (แปลงเป็น String)`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง Object <code>user</code> มี name และ age แล้ว log`,
                    validateFn: (outputs, code) => {
                        return code.includes('user') &&
                            code.includes('name') &&
                            code.includes('age');
                    },
                    hint: 'const user = { name: "A", age: 20 }; console.log(user);'
                }
            },
            {
                id: 55,
                title: "JSON.parse และ JSON.stringify",
                content: `
                    <p><strong>🔄 แปลง JSON:</strong></p>
                    <ul>
                        <li><code>JSON.parse()</code> - String → Object</li>
                        <li><code>JSON.stringify()</code> - Object → String</li>
                    </ul>
                    <p><strong>ใช้เมื่อ:</strong></p>
                    <ul>
                        <li>รับข้อมูลจาก API</li>
                        <li>เก็บใน localStorage</li>
                        <li>ส่งข้อมูลไป server</li>
                    </ul>
                `,
                codeExample: `// JSON.parse - String → Object
const jsonString = '{"name": "John", "age": 30}';
const obj = JSON.parse(jsonString);

console.log(obj.name);  // John
console.log(obj.age);   // 30

// JSON.stringify - Object → String
const user = {
    name: "Jane",
    age: 25,
    hobbies: ["reading", "coding"]
};

const str = JSON.stringify(user);
console.log(str);

// Pretty print (อ่านง่าย)
const pretty = JSON.stringify(user, null, 2);
console.log(pretty);

// ใช้กับ localStorage
// localStorage.setItem("user", JSON.stringify(user));
// const saved = JSON.parse(localStorage.getItem("user"));`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ <code>JSON.parse()</code> แปลง <code>'{"x": 10}'</code> แล้ว log <code>obj.x</code>`,
                    expectedOutput: ["10"],
                    hint: 'const obj = JSON.parse(\'{"x": 10}\'); console.log(obj.x);'
                }
            }
        ]
    }
];

// Export
if (typeof module !== 'undefined') {
    module.exports = coursesPart3;
}

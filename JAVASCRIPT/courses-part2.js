/**
 * JS Master - Part 2: ระดับกลาง (บทที่ 19-34)
 * Events, Strings, Numbers, Arrays, Booleans, Conditions, Loops, Type Conversion
 */

const coursesPart2 = [
    {
        id: "events",
        title: "Events",
        icon: "🖱️",
        description: "เหตุการณ์และการตอบสนอง",
        lessons: [
            {
                id: 19,
                title: "Event คืออะไร?",
                content: `
                    <p><strong>🖱️ Event</strong> คือเหตุการณ์ที่เกิดขึ้นบนหน้าเว็บ เช่น:</p>
                    <ul>
                        <li>Click ปุ่ม</li>
                        <li>พิมพ์ข้อความ</li>
                        <li>เลื่อนหน้า</li>
                        <li>โหลดหน้าเสร็จ</li>
                    </ul>
                    <p><strong>Event ที่ใช้บ่อย:</strong></p>
                    <ul>
                        <li><code>onclick</code> - คลิก</li>
                        <li><code>onmouseover</code> - เอาเมาส์ไปชี้</li>
                        <li><code>onchange</code> - ค่าเปลี่ยน</li>
                        <li><code>onkeydown</code> - กดปุ่มคีย์บอร์ด</li>
                    </ul>
                `,
                codeExample: `// ในเว็บจริง เราใช้ Event กับ HTML Element
// <button onclick="handleClick()">Click</button>

// หรือใช้ addEventListener (แนะนำ)
// button.addEventListener("click", handleClick);

// ตัวอย่าง Event Handler
function handleClick() {
    console.log("ปุ่มถูกคลิก!");
}

function handleMouseOver() {
    console.log("เมาส์ชี้!");
}

// เรียกทดสอบ
handleClick();
handleMouseOver();`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้างฟังก์ชัน <code>onClick</code> ที่ log <code>"Clicked!"</code> แล้วเรียกใช้`,
                    expectedOutput: ["Clicked!"],
                    hint: 'function onClick() { console.log("Clicked!"); } onClick();'
                }
            },
            {
                id: 20,
                title: "addEventListener",
                content: `
                    <p><strong>📡 addEventListener</strong> วิธีที่แนะนำในการจัดการ Event</p>
                    <p><strong>รูปแบบ:</strong></p>
                    <pre>element.addEventListener("event", function);</pre>
                    <p><strong>ข้อดี:</strong></p>
                    <ul>
                        <li>เพิ่มหลาย Event ได้</li>
                        <li>แยก JS ออกจาก HTML</li>
                        <li>ลบ Event ได้ด้วย removeEventListener</li>
                    </ul>
                `,
                codeExample: `// ในเว็บจริง:
// const btn = document.getElementById("myBtn");
// btn.addEventListener("click", function() {
//     console.log("Clicked!");
// });

// Event Object มีข้อมูลเกี่ยวกับ Event
function handleEvent(event) {
    console.log("Event type:", event.type);
    console.log("Target:", event.target);
}

// จำลอง Event Object
const fakeEvent = { type: "click", target: "button" };
handleEvent(fakeEvent);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้างฟังก์ชัน <code>logEvent(e)</code> ที่ log <code>e.type</code> แล้วเรียกด้วย <code>{ type: "click" }</code>`,
                    expectedOutput: ["click"],
                    hint: 'function logEvent(e) { console.log(e.type); } logEvent({ type: "click" });'
                }
            }
        ]
    },
    {
        id: "strings",
        title: "Strings",
        icon: "📝",
        description: "การจัดการข้อความ",
        lessons: [
            {
                id: 21,
                title: "String Methods พื้นฐาน",
                content: `
                    <p><strong>📝 String Methods ที่ใช้บ่อย:</strong></p>
                    <ul>
                        <li><code>.length</code> - ความยาว</li>
                        <li><code>.toUpperCase()</code> - ตัวพิมพ์ใหญ่</li>
                        <li><code>.toLowerCase()</code> - ตัวพิมพ์เล็ก</li>
                        <li><code>.trim()</code> - ตัดช่องว่างหน้า-หลัง</li>
                        <li><code>.charAt(i)</code> - ตัวอักษรตำแหน่ง i</li>
                    </ul>
                `,
                codeExample: `const text = "  Hello World  ";

console.log(text.length);        // 15
console.log(text.trim().length); // 11

console.log(text.toUpperCase()); // "  HELLO WORLD  "
console.log(text.toLowerCase()); // "  hello world  "

console.log(text.trim());        // "Hello World"
console.log(text.charAt(2));     // "H" (หลัง trim)

const name = "JavaScript";
console.log(name.charAt(0));     // "J"
console.log(name[0]);            // "J" (อีกวิธี)`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง <code>const msg = "hello"</code> แล้ว log <code>msg.toUpperCase()</code>`,
                    expectedOutput: ["HELLO"],
                    hint: 'const msg = "hello"; console.log(msg.toUpperCase());'
                }
            },
            {
                id: 22,
                title: "slice, substring, substr",
                content: `
                    <p><strong>✂️ ตัด String:</strong></p>
                    <ul>
                        <li><code>slice(start, end)</code> - ตัดตั้งแต่ start ถึง end-1</li>
                        <li><code>substring(start, end)</code> - คล้าย slice</li>
                        <li><code>substr(start, length)</code> - ตัดตามความยาว</li>
                    </ul>
                    <p><strong>💡 แนะนำใช้ <code>slice()</code></strong> เพราะรองรับค่าลบ</p>
                `,
                codeExample: `const text = "Hello World";

// slice(start, end) - end ไม่รวม
console.log(text.slice(0, 5));   // "Hello"
console.log(text.slice(6));      // "World"
console.log(text.slice(-5));     // "World" (นับจากท้าย)

// substring - คล้าย slice
console.log(text.substring(0, 5)); // "Hello"

// substr(start, length)
console.log(text.substr(0, 5));  // "Hello" (5 ตัว)
console.log(text.substr(6, 3));  // "Wor" (3 ตัว)`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ตัดคำว่า <code>"Java"</code> ออกจาก <code>"JavaScript"</code> ด้วย slice`,
                    expectedOutput: ["Java"],
                    hint: 'const s = "JavaScript"; console.log(s.slice(0, 4));'
                }
            },
            {
                id: 23,
                title: "replace, split, includes",
                content: `
                    <p><strong>🔄 จัดการ String:</strong></p>
                    <ul>
                        <li><code>replace(old, new)</code> - แทนที่</li>
                        <li><code>replaceAll(old, new)</code> - แทนที่ทั้งหมด</li>
                        <li><code>split(separator)</code> - แยกเป็น Array</li>
                        <li><code>includes(text)</code> - มีข้อความนี้ไหม?</li>
                        <li><code>indexOf(text)</code> - ตำแหน่งของข้อความ</li>
                    </ul>
                `,
                codeExample: `const text = "Hello World World";

// replace - แทนที่ตัวแรก
console.log(text.replace("World", "JS")); // "Hello JS World"

// replaceAll - แทนที่ทั้งหมด
console.log(text.replaceAll("World", "JS")); // "Hello JS JS"

// split - แยกเป็น Array
const words = text.split(" ");
console.log(words); // ["Hello", "World", "World"]

// includes - มีไหม?
console.log(text.includes("World")); // true
console.log(text.includes("Java"));  // false

// indexOf - ตำแหน่ง (-1 ถ้าไม่เจอ)
console.log(text.indexOf("World")); // 6`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ <code>replace</code> เปลี่ยน <code>"cat"</code> เป็น <code>"dog"</code> ใน <code>"I love cat"</code>`,
                    expectedOutput: ["I love dog"],
                    hint: 'console.log("I love cat".replace("cat", "dog"));'
                }
            },
            {
                id: 24,
                title: "Template Literals",
                content: `
                    <p><strong>\` \` Template Literals</strong> (ES6) - วิธีสร้าง String แบบใหม่</p>
                    <p><strong>ข้อดี:</strong></p>
                    <ul>
                        <li>แทรกตัวแปรด้วย <code>\${}</code></li>
                        <li>เขียนหลายบรรทัดได้</li>
                        <li>ไม่ต้อง + ต่อ String</li>
                    </ul>
                `,
                codeExample: `const name = "สมชาย";
const age = 25;

// แบบเก่า (ยุ่งยาก)
const old = "สวัสดี " + name + " อายุ " + age + " ปี";

// แบบใหม่ Template Literal (แนะนำ!)
const msg = \`สวัสดี \${name} อายุ \${age} ปี\`;

console.log(msg);

// หลายบรรทัด
const html = \`
<div>
    <h1>\${name}</h1>
    <p>Age: \${age}</p>
</div>
\`;
console.log(html);

// คำนวณใน \${}
console.log(\`Next year: \${age + 1}\`);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง <code>name = "JS"</code> แล้วใช้ Template Literal log <code>"Hello JS!"</code>`,
                    expectedOutput: ["Hello JS!"],
                    hint: 'const name = "JS"; console.log(`Hello ${name}!`);'
                }
            }
        ]
    },
    {
        id: "numbers",
        title: "Numbers & Math",
        icon: "🔢",
        description: "การจัดการตัวเลขและ Math Object",
        lessons: [
            {
                id: 25,
                title: "Number Methods",
                content: `
                    <p><strong>🔢 Number Methods:</strong></p>
                    <ul>
                        <li><code>toFixed(n)</code> - ทศนิยม n ตำแหน่ง</li>
                        <li><code>toString()</code> - แปลงเป็น String</li>
                        <li><code>parseInt()</code> - แปลง String เป็น Integer</li>
                        <li><code>parseFloat()</code> - แปลงเป็น Float</li>
                        <li><code>Number()</code> - แปลงเป็นตัวเลข</li>
                    </ul>
                `,
                codeExample: `const pi = 3.14159265;

// toFixed - ทศนิยม
console.log(pi.toFixed(2));  // "3.14"
console.log(pi.toFixed(0));  // "3"

// toString
const num = 123;
console.log(num.toString()); // "123"

// parseInt / parseFloat
console.log(parseInt("42"));       // 42
console.log(parseInt("42.99"));    // 42
console.log(parseFloat("42.99"));  // 42.99
console.log(parseInt("10abc"));    // 10

// Number() - เข้มงวดกว่า
console.log(Number("42"));     // 42
console.log(Number("10abc"));  // NaN`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> แปลง <code>3.14159</code> เป็นทศนิยม 2 ตำแหน่งด้วย <code>toFixed(2)</code>`,
                    expectedOutput: ["3.14"],
                    hint: 'console.log((3.14159).toFixed(2));'
                }
            },
            {
                id: 26,
                title: "Math Object",
                content: `
                    <p><strong>🧮 Math Object</strong> - คณิตศาสตร์ขั้นสูง:</p>
                    <ul>
                        <li><code>Math.round()</code> - ปัดเศษ</li>
                        <li><code>Math.ceil()</code> - ปัดขึ้น</li>
                        <li><code>Math.floor()</code> - ปัดลง</li>
                        <li><code>Math.abs()</code> - ค่าสัมบูรณ์</li>
                        <li><code>Math.max()</code> / <code>Math.min()</code></li>
                        <li><code>Math.random()</code> - สุ่ม 0-1</li>
                        <li><code>Math.sqrt()</code> - รากที่สอง</li>
                        <li><code>Math.pow()</code> - ยกกำลัง</li>
                    </ul>
                `,
                codeExample: `// ปัดเศษ
console.log(Math.round(4.5));  // 5
console.log(Math.round(4.4));  // 4
console.log(Math.ceil(4.1));   // 5 (ปัดขึ้น)
console.log(Math.floor(4.9));  // 4 (ปัดลง)

// min / max
console.log(Math.max(1, 5, 3)); // 5
console.log(Math.min(1, 5, 3)); // 1

// random (0 ถึง 0.999...)
console.log(Math.random());

// สุ่ม 1-10
const random1to10 = Math.floor(Math.random() * 10) + 1;
console.log("Random 1-10:", random1to10);

// sqrt / pow
console.log(Math.sqrt(16));    // 4
console.log(Math.pow(2, 3));   // 8 (2^3)`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> หาค่าสูงสุดของ <code>5, 10, 3</code> ด้วย <code>Math.max()</code>`,
                    expectedOutput: ["10"],
                    hint: 'console.log(Math.max(5, 10, 3));'
                }
            }
        ]
    },
    {
        id: "arrays-advanced",
        title: "Arrays",
        icon: "📋",
        description: "การจัดการ Array",
        lessons: [
            {
                id: 27,
                title: "Array Methods พื้นฐาน",
                content: `
                    <p><strong>📋 Array Methods:</strong></p>
                    <ul>
                        <li><code>push()</code> - เพิ่มท้าย</li>
                        <li><code>pop()</code> - ลบท้าย</li>
                        <li><code>shift()</code> - ลบหน้า</li>
                        <li><code>unshift()</code> - เพิ่มหน้า</li>
                        <li><code>splice()</code> - เพิ่ม/ลบตรงกลาง</li>
                        <li><code>concat()</code> - รวม Array</li>
                    </ul>
                `,
                codeExample: `let fruits = ["Apple", "Banana"];

// push - เพิ่มท้าย
fruits.push("Orange");
console.log(fruits); // ["Apple", "Banana", "Orange"]

// pop - ลบท้าย
const last = fruits.pop();
console.log(last);   // "Orange"

// unshift - เพิ่มหน้า
fruits.unshift("Mango");
console.log(fruits); // ["Mango", "Apple", "Banana"]

// shift - ลบหน้า
const first = fruits.shift();
console.log(first);  // "Mango"

// splice(index, deleteCount, items...)
fruits.splice(1, 0, "Grape"); // เพิ่มตำแหน่ง 1
console.log(fruits);`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง <code>arr = [1, 2]</code> แล้ว push <code>3</code> และ log <code>arr.length</code>`,
                    expectedOutput: ["3"],
                    hint: 'let arr = [1, 2]; arr.push(3); console.log(arr.length);'
                }
            },
            {
                id: 28,
                title: "sort และ reverse",
                content: `
                    <p><strong>🔄 เรียงลำดับ:</strong></p>
                    <ul>
                        <li><code>sort()</code> - เรียงลำดับ (แก้ Array เดิม!)</li>
                        <li><code>reverse()</code> - กลับด้าน</li>
                    </ul>
                    <p><strong>⚠️ sort() เรียงเป็น String!</strong> ต้องใส่ compare function</p>
                `,
                codeExample: `// sort() String
const fruits = ["Banana", "Apple", "Orange"];
fruits.sort();
console.log(fruits); // ["Apple", "Banana", "Orange"]

// reverse()
fruits.reverse();
console.log(fruits); // ["Orange", "Banana", "Apple"]

// ⚠️ sort() ตัวเลขผิด!
const nums = [40, 100, 1, 5];
nums.sort();
console.log(nums); // [1, 100, 40, 5] - ผิด!

// ✅ ต้องใส่ compare function
nums.sort((a, b) => a - b);
console.log(nums); // [1, 5, 40, 100] - ถูก!

// เรียงมากไปน้อย
nums.sort((a, b) => b - a);
console.log(nums); // [100, 40, 5, 1]`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> เรียง <code>[3, 1, 2]</code> จากน้อยไปมาก แล้ว log`,
                    expectedOutput: ["1,2,3"],
                    hint: 'console.log([3, 1, 2].sort((a, b) => a - b).toString());'
                }
            },
            {
                id: 29,
                title: "map, filter, find",
                content: `
                    <p><strong>🔄 Array Iteration Methods (สำคัญมาก!):</strong></p>
                    <ul>
                        <li><code>map()</code> - แปลงทุกตัว สร้าง Array ใหม่</li>
                        <li><code>filter()</code> - กรองเอาเฉพาะที่ต้องการ</li>
                        <li><code>find()</code> - หาตัวแรกที่ตรงเงื่อนไข</li>
                        <li><code>forEach()</code> - วนทำทุกตัว</li>
                    </ul>
                `,
                codeExample: `const nums = [1, 2, 3, 4, 5];

// map - แปลงทุกตัว
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - กรอง
const even = nums.filter(n => n % 2 === 0);
console.log(even); // [2, 4]

// find - หาตัวแรก
const found = nums.find(n => n > 3);
console.log(found); // 4

// forEach - วนทำ (ไม่ return)
nums.forEach(n => console.log(n));`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ <code>filter</code> กรองเลขคู่จาก <code>[1, 2, 3, 4]</code> แล้ว log`,
                    expectedOutput: ["2,4"],
                    hint: 'console.log([1,2,3,4].filter(n => n % 2 === 0).toString());'
                }
            },
            {
                id: 30,
                title: "reduce",
                content: `
                    <p><strong>🎯 reduce()</strong> - รวมทุกค่าเป็นค่าเดียว</p>
                    <p><strong>รูปแบบ:</strong></p>
                    <pre>array.reduce((accumulator, current) => ..., initialValue)</pre>
                    <ul>
                        <li><code>accumulator</code> - ค่าสะสม</li>
                        <li><code>current</code> - ค่าปัจจุบัน</li>
                    </ul>
                `,
                codeExample: `const nums = [1, 2, 3, 4, 5];

// รวมทุกค่า
const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 15

// หาค่าสูงสุด
const max = nums.reduce((acc, cur) => cur > acc ? cur : acc);
console.log(max); // 5

// นับจำนวน
const items = ["a", "b", "a", "c", "a"];
const count = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {});
console.log(count); // {a: 3, b: 1, c: 1}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ <code>reduce</code> รวมค่า <code>[1, 2, 3]</code> (ต้องได้ 6)`,
                    expectedOutput: ["6"],
                    hint: 'console.log([1,2,3].reduce((acc, cur) => acc + cur, 0));'
                }
            }
        ]
    },
    {
        id: "booleans",
        title: "Booleans & Comparisons",
        icon: "✅",
        description: "ค่าความจริงและการเปรียบเทียบ",
        lessons: [
            {
                id: 31,
                title: "Truthy และ Falsy",
                content: `
                    <p><strong>✅ Truthy / Falsy</strong> - ค่าที่ถูกแปลงเป็น true/false</p>
                    <p><strong>Falsy values (6 ตัว):</strong></p>
                    <ul>
                        <li><code>false</code></li>
                        <li><code>0</code></li>
                        <li><code>""</code> (empty string)</li>
                        <li><code>null</code></li>
                        <li><code>undefined</code></li>
                        <li><code>NaN</code></li>
                    </ul>
                    <p><strong>Truthy:</strong> ทุกอย่างที่ไม่ใช่ Falsy</p>
                `,
                codeExample: `// Falsy values
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

// Truthy values
console.log(Boolean(true));      // true
console.log(Boolean(1));         // true
console.log(Boolean("hello"));   // true
console.log(Boolean([]));        // true (empty array!)
console.log(Boolean({}));        // true (empty object!)

// ใช้จริง
const name = "";
if (name) {
    console.log("มีชื่อ");
} else {
    console.log("ไม่มีชื่อ");
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> log <code>Boolean(0)</code> และ <code>Boolean("0")</code>`,
                    expectedOutput: ["false", "true"],
                    hint: 'console.log(Boolean(0)); console.log(Boolean("0"));'
                }
            },
            {
                id: 32,
                title: "=== vs ==",
                content: `
                    <p><strong>⚖️ การเปรียบเทียบ:</strong></p>
                    <ul>
                        <li><code>===</code> Strict Equal - เทียบค่าและชนิด ✅</li>
                        <li><code>==</code> Loose Equal - เทียบแค่ค่า ❌</li>
                        <li><code>!==</code> Strict Not Equal ✅</li>
                        <li><code>!=</code> Loose Not Equal ❌</li>
                    </ul>
                    <p><strong>💡 ใช้ === เสมอ!</strong></p>
                `,
                codeExample: `// === Strict (แนะนำ!)
console.log(5 === 5);     // true
console.log(5 === "5");   // false (ต่างชนิด)

// == Loose (ไม่แนะนำ!)
console.log(5 == 5);      // true
console.log(5 == "5");    // true (แปลงให้!)
console.log(0 == false);  // true (ไม่คาดคิด!)
console.log(null == undefined); // true

// !== vs !=
console.log(5 !== "5");   // true (ใช้อันนี้!)
console.log(5 != "5");    // false

// Objects เทียบ reference ไม่ใช่ค่า
const a = [1, 2];
const b = [1, 2];
console.log(a === b);     // false (คนละ reference)`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> เปรียบเทียบ <code>"10" === 10</code> แล้ว log ผลลัพธ์`,
                    expectedOutput: ["false"],
                    hint: 'console.log("10" === 10);'
                }
            }
        ]
    },
    {
        id: "conditions",
        title: "Conditions",
        icon: "🔀",
        description: "การตัดสินใจ If-Else และ Switch",
        lessons: [
            {
                id: 33,
                title: "if, else if, else",
                content: `
                    <p><strong>🔀 if-else</strong> - ตัดสินใจตามเงื่อนไข</p>
                    <p><strong>โครงสร้าง:</strong></p>
                    <pre>if (condition) {
    // ถ้าจริง
} else if (condition2) {
    // ถ้าเงื่อนไข 2 จริง
} else {
    // ถ้าทุกเงื่อนไขเป็นเท็จ
}</pre>
                `,
                codeExample: `const score = 75;

if (score >= 80) {
    console.log("Grade: A");
} else if (score >= 70) {
    console.log("Grade: B");
} else if (score >= 60) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// && และ ||
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log("Can drive");
}

// Nested if
if (age >= 18) {
    if (hasLicense) {
        console.log("Licensed driver");
    }
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> สร้าง <code>num = 0</code> แล้วเช็ค: positive, negative, หรือ <code>"zero"</code>`,
                    expectedOutput: ["zero"],
                    hint: 'const num = 0; if (num > 0) {...} else if (num < 0) {...} else { console.log("zero"); }'
                }
            },
            {
                id: 34,
                title: "switch case",
                content: `
                    <p><strong>🔄 switch</strong> - เปรียบเทียบค่าหลายกรณี</p>
                    <p><strong>ใช้เมื่อ:</strong> เทียบค่าเดียวกับหลาย case</p>
                    <p><strong>⚠️ อย่าลืม break!</strong></p>
                `,
                codeExample: `const color = "red";

switch (color) {
    case "red":
        console.log("สีแดง");
        break;
    case "green":
        console.log("สีเขียว");
        break;
    case "blue":
        console.log("สีน้ำเงิน");
        break;
    default:
        console.log("ไม่รู้จักสี");
}

// Multiple cases
const day = "Sat";
switch (day) {
    case "Sat":
    case "Sun":
        console.log("Weekend!");
        break;
    default:
        console.log("Weekday");
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ switch เช็ค <code>grade = "A"</code> แล้วแสดง <code>"Excellent"</code>`,
                    expectedOutput: ["Excellent"],
                    hint: 'const grade = "A"; switch (grade) { case "A": console.log("Excellent"); break; }'
                }
            }
        ]
    },
    {
        id: "loops",
        title: "Loops",
        icon: "🔁",
        description: "การวนซ้ำ For และ While",
        lessons: [
            {
                id: 35,
                title: "for loop",
                content: `
                    <p><strong>🔁 for loop</strong> - วนซ้ำตามจำนวนรอบ</p>
                    <pre>for (เริ่มต้น; เงื่อนไข; เพิ่มค่า) {
    // โค้ดที่ต้องทำซ้ำ
}</pre>
                `,
                codeExample: `// นับ 1-5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// นับถอยหลัง
for (let i = 3; i >= 1; i--) {
    console.log(i);
}

// วน Array
const fruits = ["Apple", "Banana", "Orange"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// for...of (ง่ายกว่า)
for (const fruit of fruits) {
    console.log(fruit);
}

// for...in (วน key)
const obj = { a: 1, b: 2 };
for (const key in obj) {
    console.log(key, obj[key]);
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ for loop แสดงเลข <code>1</code> ถึง <code>3</code>`,
                    expectedOutput: ["1", "2", "3"],
                    hint: 'for (let i = 1; i <= 3; i++) { console.log(i); }'
                }
            },
            {
                id: 36,
                title: "while และ do-while",
                content: `
                    <p><strong>⏳ while</strong> - วนจนกว่าเงื่อนไขจะ false</p>
                    <p><strong>🔄 do-while</strong> - ทำก่อนอย่างน้อย 1 รอบ</p>
                `,
                codeExample: `// while
let i = 1;
while (i <= 3) {
    console.log(i);
    i++;
}

// do-while (ทำก่อน 1 รอบ)
let j = 1;
do {
    console.log("do-while:", j);
    j++;
} while (j <= 3);

// ใช้จริง: รอจน condition พร้อม
let tries = 0;
while (tries < 3) {
    console.log("Attempt:", tries + 1);
    tries++;
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> ใช้ while แสดงเลข <code>5</code> ถึง <code>7</code>`,
                    expectedOutput: ["5", "6", "7"],
                    hint: 'let i = 5; while (i <= 7) { console.log(i); i++; }'
                }
            },
            {
                id: 37,
                title: "break และ continue",
                content: `
                    <p><strong>🛑 break</strong> - หยุด loop ทันที</p>
                    <p><strong>⏭️ continue</strong> - ข้ามรอบนี้ไปรอบถัดไป</p>
                `,
                codeExample: `// break - หยุดเมื่อเจอ 5
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        console.log("หยุดที่ 5");
        break;
    }
    console.log(i);
}
// Output: 1, 2, 3, 4, "หยุดที่ 5"

// continue - ข้ามเลขคู่
for (let i = 1; i <= 5; i++) {
    if (i % 2 === 0) {
        continue; // ข้าม
    }
    console.log(i);
}
// Output: 1, 3, 5

// ใช้จริง: หาค่าแรกที่ต้องการ
const nums = [1, 2, 3, 4, 5];
for (const n of nums) {
    if (n > 3) {
        console.log("Found:", n);
        break;
    }
}`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> วน 1-5 แต่ข้ามเลข 3 ด้วย continue`,
                    expectedOutput: ["1", "2", "4", "5"],
                    hint: 'for (let i = 1; i <= 5; i++) { if (i === 3) continue; console.log(i); }'
                }
            }
        ]
    },
    {
        id: "type-conversion",
        title: "Type Conversion",
        icon: "🔄",
        description: "การแปลงชนิดข้อมูล",
        lessons: [
            {
                id: 38,
                title: "Explicit Conversion",
                content: `
                    <p><strong>🔄 Explicit Conversion</strong> - แปลงเอง:</p>
                    <ul>
                        <li><code>String()</code> - แปลงเป็น String</li>
                        <li><code>Number()</code> - แปลงเป็น Number</li>
                        <li><code>Boolean()</code> - แปลงเป็น Boolean</li>
                    </ul>
                `,
                codeExample: `// String()
console.log(String(123));        // "123"
console.log(String(true));       // "true"
console.log(String(null));       // "null"
console.log((123).toString());   // "123"

// Number()
console.log(Number("42"));       // 42
console.log(Number("3.14"));     // 3.14
console.log(Number("hello"));    // NaN
console.log(Number(true));       // 1
console.log(Number(false));      // 0
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN

// Boolean()
console.log(Boolean(1));         // true
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean("hi"));      // true`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> แปลง <code>"123"</code> เป็น Number แล้ว log <code>typeof</code>`,
                    expectedOutput: ["number"],
                    hint: 'console.log(typeof Number("123"));'
                }
            },
            {
                id: 39,
                title: "Implicit Conversion",
                content: `
                    <p><strong>⚡ Implicit Conversion</strong> - JS แปลงให้อัตโนมัติ</p>
                    <p><strong>⚠️ ระวัง! อาจทำให้งง</strong></p>
                `,
                codeExample: `// + กับ String = ต่อ String
console.log("5" + 3);      // "53" (เป็น String!)
console.log("5" + "3");    // "53"

// - * / แปลงเป็น Number
console.log("5" - 3);      // 2
console.log("5" * "2");    // 10
console.log("10" / 2);     // 5

// เปรียบเทียบ
console.log("5" == 5);     // true (แปลงให้)
console.log("5" === 5);    // false (ไม่แปลง)

// Boolean context
if ("hello") {
    console.log("Truthy!");
}

// + แปลง String เป็น Number
console.log(+"42");        // 42 (Number)
console.log(+"hello");     // NaN`,
                challenge: {
                    instruction: `<strong>🎯 โจทย์:</strong> คำนวณ <code>"10" - 5</code> แล้ว log ผลลัพธ์และ typeof`,
                    expectedOutput: ["5", "number"],
                    hint: 'const r = "10" - 5; console.log(r); console.log(typeof r);'
                }
            }
        ]
    }
];

// Export
if (typeof module !== 'undefined') {
    module.exports = coursesPart2;
}

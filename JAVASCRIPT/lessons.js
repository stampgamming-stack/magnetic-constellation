/**
 * JSMaster - Lessons Data
 * Categories → Lessons → Learn/See/Do
 */
const CATEGORIES = [
        { id: 'basic', title: '📘 Basic JavaScript', icon: '📘' },
        { id: 'dom', title: '🌐 JS HTML DOM', icon: '🌐' },
        { id: 'adv', title: '🚀 JS Advanced', icon: '🚀' }
];

const LESSONS = [
        // ====== BASIC 1: Introduction ======
        {
                id: 'js-intro', cat: 'basic', title: 'JS Introduction',
                learn: `<p><strong>JavaScript คืออะไร?</strong></p>
<p>JavaScript เป็นภาษาโปรแกรมที่ทำให้หน้าเว็บ <strong>"มีชีวิต"</strong> — คลิกปุ่มแล้วเกิดอะไรบางอย่าง, เว็บเปลี่ยนเนื้อหาโดยไม่ต้องรีเฟรช</p>
<ul>
<li><strong>HTML</strong> = โครงสร้าง (กระดูก)</li>
<li><strong>CSS</strong> = ความสวย (เสื้อผ้า)</li>
<li><strong>JavaScript</strong> = พฤติกรรม (สมอง)</li>
</ul>
<p>JavaScript ทำได้: เปลี่ยน HTML, เปลี่ยน CSS, ตอบสนองผู้ใช้, คำนวณ, เก็บข้อมูล</p>`,
                see: `<p>ตัวอย่าง: แสดงข้อความด้วย JavaScript</p>
<div class="code-block"><pre><code><span class="cm">// แสดง alert</span>
<span class="fn">alert</span>(<span class="str">"สวัสดี JavaScript!"</span>);

<span class="cm">// แสดงใน console</span>
<span class="fn">console.log</span>(<span class="str">"Hello World"</span>);

<span class="cm">// เปลี่ยน HTML</span>
document.<span class="fn">getElementById</span>(<span class="str">"demo"</span>).innerHTML = <span class="str">"เปลี่ยนแล้ว!"</span>;</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> เขียน <code>console.log("Hello JSMaster!")</code></p>`,
                hint: 'console.log("Hello JSMaster!");',
                starterCode: '// ภารกิจ: แสดง "Hello JSMaster!" ใน console\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('Hello JSMaster'); }
        },
        // ====== BASIC 2: Where To ======
        {
                id: 'js-whereto', cat: 'basic', title: 'JS Where To',
                learn: `<p><strong>ใส่ JavaScript ที่ไหน?</strong></p>
<p>มี 3 วิธี:</p>
<ul>
<li><code>&lt;script&gt;...&lt;/script&gt;</code> — ใส่ในไฟล์ HTML โดยตรง</li>
<li><code>&lt;script src="file.js"&gt;</code> — ลิงก์ไฟล์ .js ภายนอก (แนะนำ!)</li>
<li><code>onclick="..."</code> — ใส่ใน attribute HTML (ไม่แนะนำ)</li>
</ul>
<p>ตำแหน่งที่ดีที่สุด: ใส่ <code>&lt;script&gt;</code> ก่อนปิด <code>&lt;/body&gt;</code></p>`,
                see: `<div class="code-block"><pre><code><span class="tag">&lt;!DOCTYPE html&gt;</span>
<span class="tag">&lt;html&gt;</span>
<span class="tag">&lt;body&gt;</span>
  <span class="tag">&lt;h1</span> <span class="fn">id</span>=<span class="str">"demo"</span><span class="tag">&gt;</span>เดิม<span class="tag">&lt;/h1&gt;</span>

  <span class="tag">&lt;script&gt;</span>
    document.<span class="fn">getElementById</span>(<span class="str">"demo"</span>).innerHTML = <span class="str">"เปลี่ยนแล้ว!"</span>;
  <span class="tag">&lt;/script&gt;</span>
<span class="tag">&lt;/body&gt;</span>
<span class="tag">&lt;/html&gt;</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> เขียน <code>console.log("JS อยู่ตรงนี้!")</code></p>`,
                hint: 'console.log("JS อยู่ตรงนี้!");',
                starterCode: '// ภารกิจ: แสดง "JS อยู่ตรงนี้!" ใน console\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('JS อยู่ตรงนี้'); }
        },
        // ====== BASIC 3: Output ======
        {
                id: 'js-output', cat: 'basic', title: 'JS Output',
                learn: `<p><strong>4 วิธีแสดงผลลัพธ์</strong></p>
<ul>
<li><code>console.log()</code> — แสดงใน Developer Console (ใช้บ่อยสุด!)</li>
<li><code>alert()</code> — แสดง popup หน้าเว็บ</li>
<li><code>document.write()</code> — เขียนลงหน้าเว็บ (ใช้ทดสอบเท่านั้น)</li>
<li><code>innerHTML</code> — เปลี่ยนเนื้อหา HTML element</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="cm">// 1. Console</span>
<span class="fn">console.log</span>(<span class="str">"สวัสดี"</span>);

<span class="cm">// 2. Alert</span>
<span class="fn">alert</span>(<span class="str">"สวัสดี"</span>);

<span class="cm">// 3. document.write</span>
document.<span class="fn">write</span>(<span class="str">"สวัสดี"</span>);

<span class="cm">// 4. innerHTML</span>
document.<span class="fn">getElementById</span>(<span class="str">"demo"</span>).innerHTML = <span class="str">"สวัสดี"</span>;</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> แสดง <code>5 + 3</code> ผลลัพธ์ใน console (ต้องได้ 8)</p>`,
                hint: 'console.log(5 + 3);',
                starterCode: '// ภารกิจ: แสดงผลลัพธ์ของ 5 + 3 ใน console\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('8'); }
        },
        // ====== BASIC 4: Syntax ======
        {
                id: 'js-syntax', cat: 'basic', title: 'JS Syntax',
                learn: `<p><strong>กฎการเขียน JavaScript</strong></p>
<ul>
<li><strong>Statement</strong> = คำสั่ง 1 บรรทัด ลงท้ายด้วย <code>;</code></li>
<li><strong>Comment</strong> = หมายเหตุ ใช้ <code>//</code> หรือ <code>/* */</code></li>
<li><strong>Case-sensitive</strong> = ตัวพิมพ์ใหญ่เล็กต่างกัน <code>myName ≠ myname</code></li>
<li><strong>Whitespace</strong> = ช่องว่างไม่มีผล JS จะข้ามไป</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="cm">// นี่คือ comment (JS จะข้าม)</span>

<span class="kw">let</span> x = <span class="num">5</span>;         <span class="cm">// สร้างตัวแปร</span>
<span class="kw">let</span> y = <span class="num">3</span>;         <span class="cm">// อีกตัวแปร</span>
<span class="kw">let</span> sum = x + y;   <span class="cm">// บวกกัน</span>

<span class="fn">console.log</span>(sum);  <span class="cm">// แสดง 8</span>

<span class="cm">/* comment
   หลายบรรทัด */</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้างตัวแปร <code>a = 10</code>, <code>b = 20</code> แล้ว console.log ผลรวม</p>`,
                hint: 'let a = 10;\nlet b = 20;\nconsole.log(a + b);',
                starterCode: '// ภารกิจ: สร้าง a = 10, b = 20 แล้วแสดงผลรวม\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('30'); }
        },
        // ====== BASIC 5: Variables ======
        {
                id: 'js-variables', cat: 'basic', title: 'JS Variables',
                learn: `<p><strong>ตัวแปร = กล่องเก็บข้อมูล</strong></p>
<ul>
<li><code>let</code> — ตัวแปรที่เปลี่ยนค่าได้ (ใช้บ่อยสุด!)</li>
<li><code>const</code> — ค่าคงที่ เปลี่ยนไม่ได้</li>
<li><code>var</code> — แบบเก่า (ไม่แนะนำ)</li>
</ul>
<p><strong>กฎตั้งชื่อ:</strong> ขึ้นต้นด้วยตัวอักษร/$/_ ห้ามเริ่มด้วยตัวเลข ห้ามมีช่องว่าง</p>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> name = <span class="str">"สมชาย"</span>;       <span class="cm">// เปลี่ยนได้</span>
<span class="kw">const</span> PI = <span class="num">3.14159</span>;       <span class="cm">// เปลี่ยนไม่ได้</span>
<span class="kw">let</span> age = <span class="num">25</span>;

name = <span class="str">"สมหญิง"</span>;            <span class="cm">// OK เปลี่ยนได้</span>
<span class="cm">// PI = 3.14;              // ERROR เปลี่ยนไม่ได้!</span>

<span class="fn">console.log</span>(name, age);</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้างตัวแปร <code>myName</code> เก็บชื่อคุณ และ <code>myAge</code> เก็บอายุ แล้ว log ทั้งสอง</p>`,
                hint: 'let myName = "ชื่อ";\nlet myAge = 16;\nconsole.log(myName, myAge);',
                starterCode: '// ภารกิจ: สร้าง myName และ myAge แล้ว log\n\n',
                mode: 'console',
                validateFn: function (output) { return output.length > 0; }
        },
        // ====== BASIC 6: Operators ======
        {
                id: 'js-operators', cat: 'basic', title: 'JS Operators',
                learn: `<p><strong>Operators = เครื่องหมายคำนวณ/เปรียบเทียบ</strong></p>
<p><strong>คณิตศาสตร์:</strong> <code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code> (เศษ) <code>**</code> (ยกกำลัง)</p>
<p><strong>เปรียบเทียบ:</strong></p>
<ul>
<li><code>==</code> เท่ากัน (ไม่เช็คประเภท) | <code>===</code> เท่ากันเป๊ะ (แนะนำ!)</li>
<li><code>!=</code> ไม่เท่ากัน | <code>!==</code> ไม่เท่ากันเป๊ะ</li>
<li><code>&gt;</code> <code>&lt;</code> <code>&gt;=</code> <code>&lt;=</code></li>
</ul>
<p><strong>ตรรกะ:</strong> <code>&&</code> (และ) <code>||</code> (หรือ) <code>!</code> (กลับค่า)</p>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> a = <span class="num">10</span>, b = <span class="num">3</span>;

<span class="fn">console.log</span>(a + b);   <span class="cm">// 13</span>
<span class="fn">console.log</span>(a % b);   <span class="cm">// 1 (เศษ)</span>
<span class="fn">console.log</span>(a ** b);  <span class="cm">// 1000 (10^3)</span>

<span class="fn">console.log</span>(a === <span class="num">10</span>);  <span class="cm">// true</span>
<span class="fn">console.log</span>(a &gt; b);     <span class="cm">// true</span>
<span class="fn">console.log</span>(a === b);   <span class="cm">// false</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> ให้ <code>x = 15</code>, <code>y = 4</code> แล้วแสดง ผลหาร และ เศษจากการหาร</p>`,
                hint: 'let x = 15;\nlet y = 4;\nconsole.log(x / y);\nconsole.log(x % y);',
                starterCode: '// ภารกิจ: x = 15, y = 4 แสดงผลหาร และ เศษ\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('3.75') && output.includes('3'); }
        },
        // ====== BASIC 7: If Conditions ======
        {
                id: 'js-if', cat: 'basic', title: 'JS If Conditions',
                learn: `<p><strong>if-else = การตัดสินใจ</strong></p>
<ul>
<li><code>if (เงื่อนไข)</code> — ถ้าจริง ทำ</li>
<li><code>else if</code> — ถ้าเงื่อนไขก่อนไม่จริง ลองอันนี้</li>
<li><code>else</code> — ถ้าไม่ตรงเลย ทำอันนี้</li>
</ul>
<p><strong>switch:</strong> ใช้แทน if-else หลายตัว เมื่อเปรียบเทียบค่าเดียวกับหลายตัวเลือก</p>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> score = <span class="num">75</span>;

<span class="kw">if</span> (score &gt;= <span class="num">80</span>) {
  <span class="fn">console.log</span>(<span class="str">"เกรด A"</span>);
} <span class="kw">else if</span> (score &gt;= <span class="num">70</span>) {
  <span class="fn">console.log</span>(<span class="str">"เกรด B"</span>);
} <span class="kw">else if</span> (score &gt;= <span class="num">60</span>) {
  <span class="fn">console.log</span>(<span class="str">"เกรด C"</span>);
} <span class="kw">else</span> {
  <span class="fn">console.log</span>(<span class="str">"เกรด F"</span>);
}
<span class="cm">// แสดง: เกรด B</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> ให้ <code>age = 18</code> ถ้า ≥18 แสดง "ผู้ใหญ่" ถ้าไม่ แสดง "เด็ก"</p>`,
                hint: 'let age = 18;\nif (age >= 18) {\n  console.log("ผู้ใหญ่");\n} else {\n  console.log("เด็ก");\n}',
                starterCode: '// ภารกิจ: เช็คอายุ ≥18 = ผู้ใหญ่ / ไม่ใช่ = เด็ก\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('ผู้ใหญ่'); }
        },
        // ====== BASIC 8: Loops ======
        {
                id: 'js-loops', cat: 'basic', title: 'JS Loops',
                learn: `<p><strong>Loop = ทำซ้ำ</strong></p>
<ul>
<li><code>for</code> — วนตามจำนวนรอบที่กำหนด</li>
<li><code>while</code> — วนตราบเท่าที่เงื่อนไขเป็นจริง</li>
<li><code>for...of</code> — วนสมาชิกใน array</li>
</ul>
<p>โครงสร้าง for: <code>for (เริ่ม; เงื่อนไข; เพิ่ม)</code></p>`,
                see: `<div class="code-block"><pre><code><span class="cm">// for loop: นับ 1-5</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i &lt;= <span class="num">5</span>; i++) {
  <span class="fn">console.log</span>(<span class="str">"รอบที่"</span>, i);
}

<span class="cm">// while loop</span>
<span class="kw">let</span> count = <span class="num">0</span>;
<span class="kw">while</span> (count &lt; <span class="num">3</span>) {
  <span class="fn">console.log</span>(count);
  count++;
}</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> ใช้ for loop แสดงเลข 1 ถึง 10 ใน console</p>`,
                hint: 'for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}',
                starterCode: '// ภารกิจ: ใช้ for loop แสดง 1-10\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('10') && output.includes('1'); }
        },
        // ====== BASIC 9: Strings ======
        {
                id: 'js-strings', cat: 'basic', title: 'JS Strings',
                learn: `<p><strong>String = ข้อความ</strong></p>
<p>ครอบด้วย <code>"..."</code> หรือ <code>'...'</code> หรือ <code>\`...\`</code> (template literal)</p>
<p><strong>Methods สำคัญ:</strong></p>
<ul>
<li><code>.length</code> — ความยาว</li>
<li><code>.toUpperCase()</code> / <code>.toLowerCase()</code></li>
<li><code>.includes("ข้อความ")</code> — มีอยู่ไหม</li>
<li><code>.slice(start, end)</code> — ตัดข้อความ</li>
<li><code>\`สวัสดี \${name}\`</code> — แทรกตัวแปร (template literal)</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> msg = <span class="str">"Hello JavaScript"</span>;

<span class="fn">console.log</span>(msg.length);           <span class="cm">// 16</span>
<span class="fn">console.log</span>(msg.<span class="fn">toUpperCase</span>());    <span class="cm">// HELLO JAVASCRIPT</span>
<span class="fn">console.log</span>(msg.<span class="fn">includes</span>(<span class="str">"Java"</span>)); <span class="cm">// true</span>
<span class="fn">console.log</span>(msg.<span class="fn">slice</span>(<span class="num">0</span>, <span class="num">5</span>));      <span class="cm">// Hello</span>

<span class="kw">let</span> name = <span class="str">"สมชาย"</span>;
<span class="fn">console.log</span>(<span class="str">\`สวัสดี \${name}!\`</span>);   <span class="cm">// สวัสดี สมชาย!</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้างข้อความ <code>"javascript"</code> แล้วแสดงเป็นตัวพิมพ์ใหญ่ทั้งหมด</p>`,
                hint: 'let text = "javascript";\nconsole.log(text.toUpperCase());',
                starterCode: '// ภารกิจ: แสดง "javascript" เป็นตัวพิมพ์ใหญ่\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('JAVASCRIPT'); }
        },
        // ====== BASIC 10: Numbers ======
        {
                id: 'js-numbers', cat: 'basic', title: 'JS Numbers',
                learn: `<p><strong>Number ใน JavaScript</strong></p>
<p>JS มี number แค่ประเภทเดียว (ไม่แยก int/float)</p>
<ul>
<li><code>parseInt("10")</code> — แปลง string เป็น integer</li>
<li><code>parseFloat("3.14")</code> — แปลงเป็นทศนิยม</li>
<li><code>.toFixed(2)</code> — ทศนิยม 2 ตำแหน่ง</li>
<li><code>isNaN(x)</code> — เช็คว่าเป็นตัวเลขไหม</li>
<li><code>Number.MAX_SAFE_INTEGER</code> — ค่าสูงสุดที่ปลอดภัย</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> price = <span class="num">19.99</span>;
<span class="fn">console.log</span>(price.<span class="fn">toFixed</span>(<span class="num">0</span>));     <span class="cm">// "20"</span>
<span class="fn">console.log</span>(<span class="fn">parseInt</span>(<span class="str">"42abc"</span>)); <span class="cm">// 42</span>
<span class="fn">console.log</span>(<span class="fn">isNaN</span>(<span class="str">"hello"</span>));   <span class="cm">// true</span>
<span class="fn">console.log</span>(<span class="fn">isNaN</span>(<span class="num">123</span>));       <span class="cm">// false</span>

<span class="cm">// Math object</span>
<span class="fn">console.log</span>(Math.<span class="fn">round</span>(<span class="num">4.7</span>));  <span class="cm">// 5</span>
<span class="fn">console.log</span>(Math.<span class="fn">random</span>());    <span class="cm">// 0-1 สุ่ม</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้าง <code>pi = 3.14159</code> แล้วแสดงทศนิยม 2 ตำแหน่ง</p>`,
                hint: 'let pi = 3.14159;\nconsole.log(pi.toFixed(2));',
                starterCode: '// ภารกิจ: แสดง pi ทศนิยม 2 ตำแหน่ง\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('3.14'); }
        },
        // ====== BASIC 11: Functions ======
        {
                id: 'js-functions', cat: 'basic', title: 'JS Functions',
                learn: `<p><strong>Function = ชุดคำสั่งที่เรียกใช้ซ้ำได้</strong></p>
<ul>
<li><code>function ชื่อ(พารามิเตอร์) { ... }</code> — ประกาศฟังก์ชัน</li>
<li><code>return</code> — ส่งค่ากลับ</li>
<li><code>Arrow function:</code> <code>const fn = (x) =&gt; x * 2</code></li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="cm">// ฟังก์ชันปกติ</span>
<span class="kw">function</span> <span class="fn">greet</span>(name) {
  <span class="kw">return</span> <span class="str">\`สวัสดี \${name}!\`</span>;
}
<span class="fn">console.log</span>(<span class="fn">greet</span>(<span class="str">"สมชาย"</span>));

<span class="cm">// Arrow function</span>
<span class="kw">const</span> <span class="fn">double</span> = (x) =&gt; x * <span class="num">2</span>;
<span class="fn">console.log</span>(<span class="fn">double</span>(<span class="num">5</span>));  <span class="cm">// 10</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้างฟังก์ชัน <code>add(a, b)</code> ที่ return ผลบวก แล้ว log <code>add(3, 7)</code></p>`,
                hint: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 7));',
                starterCode: '// ภารกิจ: สร้างฟังก์ชัน add(a, b) แล้ว log add(3, 7)\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('10'); }
        },
        // ====== BASIC 12: Objects ======
        {
                id: 'js-objects', cat: 'basic', title: 'JS Objects',
                learn: `<p><strong>Object = เก็บข้อมูลแบบ key-value</strong></p>
<ul>
<li>สร้างด้วย <code>{ key: value }</code></li>
<li>เข้าถึงด้วย <code>obj.key</code> หรือ <code>obj["key"]</code></li>
<li>ใส่ function ใน object ได้ = <strong>method</strong></li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">const</span> person = {
  name: <span class="str">"สมชาย"</span>,
  age: <span class="num">25</span>,
  greet: <span class="kw">function</span>() {
    <span class="kw">return</span> <span class="str">\`สวัสดี ผม \${this.name}\`</span>;
  }
};

<span class="fn">console.log</span>(person.name);     <span class="cm">// สมชาย</span>
<span class="fn">console.log</span>(person.age);      <span class="cm">// 25</span>
<span class="fn">console.log</span>(person.<span class="fn">greet</span>()); <span class="cm">// สวัสดี ผม สมชาย</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้าง object <code>car</code> มี brand, year แล้ว log ทั้งสอง</p>`,
                hint: 'const car = { brand: "Toyota", year: 2024 };\nconsole.log(car.brand);\nconsole.log(car.year);',
                starterCode: '// ภารกิจ: สร้าง object car มี brand และ year\n\n',
                mode: 'console',
                validateFn: function (output) { return output.length > 0; }
        },
        // ====== BASIC 13: Arrays ======
        {
                id: 'js-arrays', cat: 'basic', title: 'JS Arrays',
                learn: `<p><strong>Array = รายการข้อมูล</strong></p>
<ul>
<li>สร้าง: <code>[1, 2, 3]</code></li>
<li>เข้าถึง: <code>arr[0]</code> (เริ่มจาก 0!)</li>
<li><code>.push()</code> เพิ่มท้าย | <code>.pop()</code> ลบท้าย</li>
<li><code>.length</code> จำนวนสมาชิก</li>
<li><code>.map()</code> แปลงทุกตัว | <code>.filter()</code> กรอง</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> fruits = [<span class="str">"🍎"</span>, <span class="str">"🍌"</span>, <span class="str">"🍊"</span>];

<span class="fn">console.log</span>(fruits[<span class="num">0</span>]);     <span class="cm">// 🍎</span>
<span class="fn">console.log</span>(fruits.length); <span class="cm">// 3</span>

fruits.<span class="fn">push</span>(<span class="str">"🍇"</span>);           <span class="cm">// เพิ่ม</span>
<span class="fn">console.log</span>(fruits);

<span class="kw">let</span> nums = [<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>];
<span class="kw">let</span> doubled = nums.<span class="fn">map</span>(n =&gt; n * <span class="num">2</span>);
<span class="fn">console.log</span>(doubled); <span class="cm">// [2,4,6,8,10]</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้าง array <code>colors</code> มี 3 สี แล้ว push สีที่ 4 เข้าไป แล้ว log array</p>`,
                hint: 'let colors = ["red", "green", "blue"];\ncolors.push("yellow");\nconsole.log(colors);',
                starterCode: '// ภารกิจ: สร้าง array colors 3 สี แล้ว push สีที่ 4\n\n',
                mode: 'console',
                validateFn: function (output) { return output.length > 0; }
        },
        // ====== BASIC 14: Scope ======
        {
                id: 'js-scope', cat: 'basic', title: 'JS Scope',
                learn: `<p><strong>Scope = ขอบเขตของตัวแปร</strong></p>
<ul>
<li><strong>Global</strong> — ประกาศนอกฟังก์ชัน เข้าถึงได้ทุกที่</li>
<li><strong>Local/Function</strong> — ประกาศในฟังก์ชัน เข้าถึงได้เฉพาะในนั้น</li>
<li><strong>Block</strong> — <code>let/const</code> ใน <code>{}</code> เข้าถึงได้เฉพาะใน block</li>
</ul>
<p>⚠️ <code>var</code> ไม่มี block scope! นี่คือเหตุผลที่ควรใช้ <code>let/const</code></p>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> globalVar = <span class="str">"ฉันเป็น global"</span>;

<span class="kw">function</span> <span class="fn">test</span>() {
  <span class="kw">let</span> localVar = <span class="str">"ฉันเป็น local"</span>;
  <span class="fn">console.log</span>(globalVar); <span class="cm">// OK!</span>
  <span class="fn">console.log</span>(localVar);  <span class="cm">// OK!</span>
}
<span class="fn">test</span>();
<span class="fn">console.log</span>(globalVar);   <span class="cm">// OK!</span>
<span class="cm">// console.log(localVar); // ERROR!</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้างตัวแปร global <code>x = "global"</code> แล้วสร้างฟังก์ชันที่มี local <code>y = "local"</code> log ทั้งสองจากในฟังก์ชัน</p>`,
                hint: 'let x = "global";\nfunction test() {\n  let y = "local";\n  console.log(x);\n  console.log(y);\n}\ntest();',
                starterCode: '// ภารกิจ: ทดลอง global vs local scope\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('global') && output.includes('local'); }
        },
        // ====== BASIC 15: Dates ======
        {
                id: 'js-dates', cat: 'basic', title: 'JS Dates',
                learn: `<p><strong>Date = วันที่และเวลา</strong></p>
<ul>
<li><code>new Date()</code> — วันเวลาปัจจุบัน</li>
<li><code>.getFullYear()</code> ปี | <code>.getMonth()</code> เดือน (0-11!)</li>
<li><code>.getDate()</code> วัน | <code>.getHours()</code> ชั่วโมง</li>
<li><code>.toLocaleDateString("th-TH")</code> — แสดงภาษาไทย</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> now = <span class="kw">new</span> <span class="fn">Date</span>();

<span class="fn">console.log</span>(now);
<span class="fn">console.log</span>(now.<span class="fn">getFullYear</span>());
<span class="fn">console.log</span>(now.<span class="fn">getMonth</span>() + <span class="num">1</span>); <span class="cm">// +1 เพราะเริ่มจาก 0</span>
<span class="fn">console.log</span>(now.<span class="fn">getDate</span>());

<span class="fn">console.log</span>(now.<span class="fn">toLocaleDateString</span>(<span class="str">"th-TH"</span>));</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> แสดงปีปัจจุบันใน console</p>`,
                hint: 'let now = new Date();\nconsole.log(now.getFullYear());',
                starterCode: '// ภารกิจ: แสดงปีปัจจุบัน\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('202'); }
        },

        // ====== DOM 1: HTML DOM ======
        {
                id: 'js-dom', cat: 'dom', title: 'JS HTML DOM',
                learn: `<p><strong>DOM คืออะไร?</strong></p>
<p>DOM (Document Object Model) = โครงสร้างของหน้าเว็บที่ JS เข้าถึงได้</p>
<ul>
<li><code>document.getElementById("id")</code> — เลือกจาก ID</li>
<li><code>.innerHTML</code> — เปลี่ยน HTML ภายใน</li>
<li><code>.style.property</code> — เปลี่ยน CSS</li>
<li><code>.classList.add/remove</code> — จัดการ class</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="cm">// เปลี่ยนสี</span>
document.<span class="fn">getElementById</span>(<span class="str">"targetBox"</span>)
  .style.backgroundColor = <span class="str">"red"</span>;

<span class="cm">// เปลี่ยนข้อความ</span>
document.<span class="fn">getElementById</span>(<span class="str">"statusText"</span>)
  .innerText = <span class="str">"เปลี่ยนแล้ว!"</span>;</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> เปลี่ยนสี targetBox เป็น <strong>blue</strong> เมื่อกดปุ่ม 1</p>`,
                arenaHTML: `<div id="targetBox" class="target-box">🎯 Target Box</div>
<h3 id="statusText" class="status-text">สถานะ: รอคำสั่ง...</h3>
<div class="arena-buttons"><button id="btn1" class="arena-btn">ปุ่ม 1</button><button id="btn2" class="arena-btn">ปุ่ม 2</button></div>`,
                hint: 'document.getElementById("btn1").addEventListener("click", function() {\n  document.getElementById("targetBox").style.backgroundColor = "blue";\n});',
                starterCode: '// ภารกิจ: กดปุ่ม 1 → เปลี่ยน targetBox เป็นสีน้ำเงิน\n\n',
                mode: 'dom',
                requireClick: 'btn1',
                validateFn: function () { var b = document.getElementById('targetBox'); return b && (b.style.backgroundColor === 'blue' || b.style.backgroundColor === 'rgb(0, 0, 255)'); }
        },
        // ====== DOM 2: Events ======
        {
                id: 'js-events', cat: 'dom', title: 'JS Events',
                learn: `<p><strong>Event = เหตุการณ์ที่เกิดขึ้นบนหน้าเว็บ</strong></p>
<ul>
<li><code>"click"</code> — คลิก</li>
<li><code>"mouseover"</code> / <code>"mouseout"</code> — เมาส์เข้า/ออก</li>
<li><code>"keyup"</code> — พิมพ์แป้นพิมพ์</li>
<li><code>"change"</code> — ค่าเปลี่ยน</li>
</ul>
<p>ใช้ <code>addEventListener("event", function)</code></p>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> btn = document.<span class="fn">getElementById</span>(<span class="str">"btn1"</span>);

btn.<span class="fn">addEventListener</span>(<span class="str">"click"</span>, <span class="kw">function</span>() {
  <span class="fn">alert</span>(<span class="str">"คลิกแล้ว!"</span>);
});</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> กดปุ่ม 1 → เปลี่ยน statusText เป็น "คลิกแล้ว!"</p>`,
                arenaHTML: `<div id="targetBox" class="target-box">🎯 Target Box</div>
<h3 id="statusText" class="status-text">สถานะ: รอคำสั่ง...</h3>
<div class="arena-buttons"><button id="btn1" class="arena-btn">ปุ่ม 1</button><button id="btn2" class="arena-btn">ปุ่ม 2</button></div>`,
                hint: 'document.getElementById("btn1").addEventListener("click", function() {\n  document.getElementById("statusText").innerText = "คลิกแล้ว!";\n});',
                starterCode: '// ภารกิจ: กดปุ่ม 1 → เปลี่ยน statusText\n\n',
                mode: 'dom',
                requireClick: 'btn1',
                validateFn: function () { var s = document.getElementById('statusText'); return s && s.innerText.includes('คลิกแล้ว'); }
        },
        // ====== DOM 3: createElement ======
        {
                id: 'js-createel', cat: 'dom', title: 'JS createElement',
                learn: `<p><strong>สร้าง Element ใหม่</strong></p>
<ul>
<li><code>document.createElement("tag")</code> — สร้าง</li>
<li><code>.textContent = "..."</code> — ใส่ข้อความ</li>
<li><code>parent.appendChild(child)</code> — ต่อเข้าไป</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> li = document.<span class="fn">createElement</span>(<span class="str">"li"</span>);
li.textContent = <span class="str">"Item ใหม่"</span>;
document.<span class="fn">getElementById</span>(<span class="str">"myList"</span>).<span class="fn">appendChild</span>(li);</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> กดปุ่ม 1 → สร้าง li ใหม่เพิ่มเข้า myList</p>`,
                arenaHTML: `<ul id="myList" class="arena-list"><li>Item 1</li><li>Item 2</li></ul>
<div class="arena-buttons"><button id="btn1" class="arena-btn">ปุ่ม 1: เพิ่ม</button></div>`,
                hint: 'document.getElementById("btn1").addEventListener("click", function() {\n  let li = document.createElement("li");\n  li.textContent = "Item ใหม่";\n  document.getElementById("myList").appendChild(li);\n});',
                starterCode: '// ภารกิจ: กดปุ่ม 1 → สร้าง li ใหม่\n\n',
                mode: 'dom',
                requireClick: 'btn1',
                validateFn: function () { var l = document.getElementById('myList'); return l && l.children.length > 2; }
        },
        // ====== ADVANCED 1: Classes ======
        {
                id: 'js-classes', cat: 'adv', title: 'JS Classes',
                learn: `<p><strong>Class = พิมพ์เขียวสร้าง Object</strong></p>
<p>แทนที่จะเขียน object ทีละตัว ใช้ class เป็น "แม่พิมพ์" สร้างได้ไม่จำกัด:</p>
<ul>
<li><code>class ชื่อ { constructor() { } }</code> — ประกาศ class</li>
<li><code>constructor()</code> — ฟังก์ชันที่ทำงานตอนสร้าง</li>
<li><code>this.property</code> — เก็บค่าใน object</li>
<li><code>new ClassName()</code> — สร้าง instance ใหม่</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">class</span> <span class="fn">Animal</span> {
  <span class="fn">constructor</span>(name, sound) {
    <span class="kw">this</span>.name = name;
    <span class="kw">this</span>.sound = sound;
  }
  <span class="fn">speak</span>() {
    <span class="kw">return</span> <span class="str">\`\${this.name} ร้อง \${this.sound}!\`</span>;
  }
}
<span class="kw">let</span> cat = <span class="kw">new</span> <span class="fn">Animal</span>(<span class="str">"แมว"</span>, <span class="str">"เมี้ยว"</span>);
<span class="fn">console.log</span>(cat.<span class="fn">speak</span>());</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้าง class <code>Car</code> มี brand, year + method <code>info()</code> return "brand ปี year"</p>`,
                hint: 'class Car {\n  constructor(brand, year) {\n    this.brand = brand;\n    this.year = year;\n  }\n  info() { return `${this.brand} ปี ${this.year}`; }\n}\nconsole.log(new Car("Toyota", 2024).info());',
                starterCode: '// สร้าง class Car มี brand, year, info()\n\n',
                mode: 'console',
                validateFn: function (output) { return output.length > 0; }
        },
        // ====== ADVANCED 2: Destructuring ======
        {
                id: 'js-destruct', cat: 'adv', title: 'JS Destructuring',
                learn: `<p><strong>Destructuring = แกะค่าจาก Object/Array</strong></p>
<ul>
<li><strong>Object:</strong> <code>const { name, age } = person;</code></li>
<li><strong>Array:</strong> <code>const [a, b] = arr;</code></li>
<li><strong>Default:</strong> <code>const { name = "ไม่มี" } = obj;</code></li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">const</span> person = { name: <span class="str">"สมชาย"</span>, age: <span class="num">25</span> };
<span class="kw">const</span> { name, age } = person;
<span class="fn">console.log</span>(name, age);

<span class="kw">const</span> [x, y] = [<span class="num">10</span>, <span class="num">20</span>];
<span class="fn">console.log</span>(x, y);</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> destructure <code>{ brand: "Nike", price: 3500 }</code> แล้ว log ทั้งสอง</p>`,
                hint: 'const { brand, price } = { brand: "Nike", price: 3500 };\nconsole.log(brand, price);',
                starterCode: '// destructure object แล้ว log\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('3500'); }
        },
        // ====== ADVANCED 3: Spread & Rest ======
        {
                id: 'js-spread', cat: 'adv', title: 'JS Spread & Rest',
                learn: `<p><strong>... (จุดสามจุด) ใช้ได้ 2 แบบ</strong></p>
<ul>
<li><strong>Spread</strong> = กระจาย: <code>[...arr1, ...arr2]</code> รวม array</li>
<li><strong>Rest</strong> = รวบ: <code>function(...rest)</code> เก็บที่เหลือ</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> a = [<span class="num">1</span>,<span class="num">2</span>], b = [<span class="num">3</span>,<span class="num">4</span>];
<span class="kw">let</span> c = [...a, ...b];
<span class="fn">console.log</span>(c); <span class="cm">// [1,2,3,4]</span>

<span class="kw">function</span> <span class="fn">sum</span>(...nums) {
  <span class="kw">return</span> nums.<span class="fn">reduce</span>((a,b) => a+b, <span class="num">0</span>);
}
<span class="fn">console.log</span>(<span class="fn">sum</span>(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>));</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> รวม <code>[1,2,3]</code> กับ <code>[4,5,6]</code> ด้วย spread แล้ว log</p>`,
                hint: 'let c = [...[1,2,3], ...[4,5,6]];\nconsole.log(c);',
                starterCode: '// รวม array ด้วย spread\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('1') && output.includes('6'); }
        },
        // ====== ADVANCED 4: Map & Set ======
        {
                id: 'js-mapset', cat: 'adv', title: 'JS Map & Set',
                learn: `<p><strong>Map</strong> = Object ที่ key อะไรก็ได้</p>
<p><strong>Set</strong> = Array ที่ไม่มีค่าซ้ำ</p>
<ul>
<li><code>new Set([1,2,2,3])</code> → <code>{1,2,3}</code></li>
<li><code>new Map()</code> → <code>.set(key,val)</code> <code>.get(key)</code></li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> s = <span class="kw">new</span> <span class="fn">Set</span>([<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">2</span>,<span class="num">1</span>]);
<span class="fn">console.log</span>(s.size); <span class="cm">// 3</span>

<span class="kw">let</span> m = <span class="kw">new</span> <span class="fn">Map</span>();
m.<span class="fn">set</span>(<span class="str">"name"</span>, <span class="str">"สมชาย"</span>);
<span class="fn">console.log</span>(m.<span class="fn">get</span>(<span class="str">"name"</span>));</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> ลบค่าซ้ำ <code>[1,2,3,2,4,3,5]</code> ด้วย Set แล้ว log ขนาด</p>`,
                hint: 'let s = new Set([1,2,3,2,4,3,5]);\nconsole.log(s.size);',
                starterCode: '// ลบค่าซ้ำด้วย Set\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('5'); }
        },
        // ====== ADVANCED 5: Error Handling ======
        {
                id: 'js-errors', cat: 'adv', title: 'JS Error Handling',
                learn: `<p><strong>try-catch = จับ Error</strong></p>
<ul>
<li><code>try { }</code> — ลองทำ</li>
<li><code>catch (e) { }</code> — จับ error</li>
<li><code>finally { }</code> — ทำเสมอ</li>
<li><code>throw new Error("...")</code> — สร้าง error เอง</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">try</span> {
  <span class="kw">let</span> x = y + <span class="num">1</span>;
} <span class="kw">catch</span> (e) {
  <span class="fn">console.log</span>(<span class="str">"Error:"</span>, e.message);
} <span class="kw">finally</span> {
  <span class="fn">console.log</span>(<span class="str">"จบ"</span>);
}</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> ใช้ try-catch จับ error จาก <code>JSON.parse("xxx")</code></p>`,
                hint: 'try {\n  JSON.parse("xxx");\n} catch(e) {\n  console.log("Error:", e.message);\n}',
                starterCode: '// จับ error จาก JSON.parse\n\n',
                mode: 'console',
                validateFn: function (output) { return output.length > 0; }
        },
        // ====== ADVANCED 6: JSON ======
        {
                id: 'js-json', cat: 'adv', title: 'JS JSON',
                learn: `<p><strong>JSON = รูปแบบข้อมูลมาตรฐาน</strong></p>
<ul>
<li><code>JSON.stringify(obj)</code> — Object → string</li>
<li><code>JSON.parse(str)</code> — string → Object</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> obj = { name: <span class="str">"สมชาย"</span>, age: <span class="num">25</span> };
<span class="kw">let</span> json = <span class="fn">JSON.stringify</span>(obj);
<span class="fn">console.log</span>(json);
<span class="kw">let</span> back = <span class="fn">JSON.parse</span>(json);
<span class="fn">console.log</span>(back.name);</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> stringify <code>{ item: "iPhone", price: 35000 }</code> แล้ว parse กลับ log ราคา</p>`,
                hint: 'let j = JSON.stringify({item:"iPhone",price:35000});\nconsole.log(JSON.parse(j).price);',
                starterCode: '// stringify แล้ว parse กลับ\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('35000'); }
        },
        // ====== ADVANCED 7: Promises ======
        {
                id: 'js-promise', cat: 'adv', title: 'JS Promises',
                learn: `<p><strong>Promise = สัญญาว่าจะทำเสร็จในอนาคต</strong></p>
<ul>
<li><code>new Promise((resolve, reject) => { })</code></li>
<li><code>.then()</code> — เมื่อสำเร็จ</li>
<li><code>.catch()</code> — เมื่อ error</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">let</span> p = <span class="kw">new</span> <span class="fn">Promise</span>((resolve, reject) => {
  <span class="fn">resolve</span>(<span class="str">"สำเร็จ!"</span>);
});
p.<span class="fn">then</span>(msg => <span class="fn">console.log</span>(msg));</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้าง Promise ที่ resolve "สำเร็จ!" แล้ว .then() log</p>`,
                hint: 'new Promise(r => r("สำเร็จ!")).then(m => console.log(m));',
                starterCode: '// สร้าง Promise แล้ว .then() log\n\n',
                mode: 'console',
                validateFn: function (output) { return output.length > 0; }
        },
        // ====== ADVANCED 8: Async/Await ======
        {
                id: 'js-async', cat: 'adv', title: 'JS Async/Await',
                learn: `<p><strong>async/await = เขียน Promise ง่ายขึ้น</strong></p>
<ul>
<li><code>async function</code> — return Promise อัตโนมัติ</li>
<li><code>await</code> — รอ Promise เสร็จ</li>
</ul>`,
                see: `<div class="code-block"><pre><code><span class="kw">async function</span> <span class="fn">run</span>() {
  <span class="fn">console.log</span>(<span class="str">"เริ่ม"</span>);
  <span class="kw">await</span> <span class="kw">new</span> <span class="fn">Promise</span>(r => <span class="fn">setTimeout</span>(r, <span class="num">100</span>));
  <span class="fn">console.log</span>(<span class="str">"เสร็จ"</span>);
}
<span class="fn">run</span>();</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้าง async function ที่ log "เริ่ม" → await → log "เสร็จ"</p>`,
                hint: 'async function run() {\n  console.log("เริ่ม");\n  await new Promise(r => setTimeout(r, 50));\n  console.log("เสร็จ");\n}\nrun();',
                starterCode: '// สร้าง async function\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('เริ่ม'); }
        },
        // ====== ADVANCED 9: Fetch API ======
        {
                id: 'js-fetch', cat: 'adv', title: 'JS Fetch API',
                learn: `<p><strong>Fetch = ดึงข้อมูลจากเซิร์ฟเวอร์</strong></p>
<ul>
<li><code>fetch(url)</code> — return Promise</li>
<li><code>.then(res => res.json())</code> — แปลง response</li>
</ul>
<p>⚠️ บทนี้ใช้ mock data แทน API จริง</p>`,
                see: `<div class="code-block"><pre><code><span class="kw">function</span> <span class="fn">fakeAPI</span>() {
  <span class="kw">return new</span> <span class="fn">Promise</span>(r => {
    r({ name: <span class="str">"สมชาย"</span>, role: <span class="str">"Dev"</span> });
  });
}
<span class="fn">fakeAPI</span>().<span class="fn">then</span>(d => <span class="fn">console.log</span>(d.name));</code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> สร้าง fakeAPI ที่ return Promise ข้อมูล user แล้ว .then() log ชื่อ</p>`,
                hint: 'function fakeAPI() {\n  return new Promise(r => r({name:"Test"}));\n}\nfakeAPI().then(d => console.log(d.name));',
                starterCode: '// สร้าง fakeAPI แล้ว .then() log\n\n',
                mode: 'console',
                validateFn: function (output) { return output.length > 0; }
        },
        // ====== ADVANCED 10: LocalStorage ======
        {
                id: 'js-storage', cat: 'adv', title: 'JS LocalStorage',
                learn: `<p><strong>localStorage = เก็บข้อมูลในเบราว์เซอร์</strong></p>
<ul>
<li><code>setItem("key", "value")</code> — เก็บ</li>
<li><code>getItem("key")</code> — ดึง</li>
<li><code>removeItem("key")</code> — ลบ</li>
<li>เก็บได้แค่ string! ใช้ JSON สำหรับ object</li>
</ul>`,
                see: `<div class="code-block"><pre><code>localStorage.<span class="fn">setItem</span>(<span class="str">"user"</span>, <span class="str">"สมชาย"</span>);
<span class="kw">let</span> u = localStorage.<span class="fn">getItem</span>(<span class="str">"user"</span>);
<span class="fn">console.log</span>(u); <span class="cm">// สมชาย</span></code></pre></div>`,
                doContent: `<p><strong>🎯 ภารกิจ:</strong> เก็บ "myScore" = "100" ใน localStorage แล้วดึงมา log</p>`,
                hint: 'localStorage.setItem("myScore","100");\nconsole.log(localStorage.getItem("myScore"));',
                starterCode: '// setItem แล้ว getItem แล้ว log\n\n',
                mode: 'console',
                validateFn: function (output) { return output.includes('100'); }
        },
];

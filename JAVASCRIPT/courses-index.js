/**
 * JS Master - Complete Course Data
 * รวมบทเรียนทั้งหมด 24 หมวดหมู่ 55 บท
 * 
 * ไฟล์นี้รวมเนื้อหาจาก:
 * - courses-part1.js (บทที่ 1-18)
 * - courses-part2.js (บทที่ 19-39)
 * - courses-part3.js (บทที่ 40-55)
 */

// ==========================================
// วิธีใช้: คัดลอก courses array นี้ไปใช้ใน script.js
// หรือ import จากไฟล์แยก
// ==========================================

const courses = [
    // ========== Part 1: พื้นฐาน ==========
    {
        id: "introduction",
        title: "Introduction",
        icon: "🚀",
        description: "แนะนำภาษา JavaScript และวิธีใส่โค้ด"
    },
    {
        id: "output",
        title: "Output",
        icon: "📺",
        description: "การแสดงผลใน JavaScript"
    },
    {
        id: "syntax",
        title: "Syntax & Comments",
        icon: "📝",
        description: "กฎการเขียนและ Comment"
    },
    {
        id: "variables",
        title: "Variables",
        icon: "📦",
        description: "ตัวแปร var, let, const"
    },
    {
        id: "operators",
        title: "Operators",
        icon: "➕",
        description: "เครื่องหมายการคำนวณและการกำหนดค่า"
    },
    {
        id: "datatypes",
        title: "Data Types",
        icon: "🏷️",
        description: "ชนิดข้อมูลใน JavaScript"
    },
    {
        id: "functions",
        title: "Functions",
        icon: "⚡",
        description: "ฟังก์ชันพื้นฐาน"
    },
    {
        id: "objects",
        title: "Objects",
        icon: "🏠",
        description: "Object Properties & Methods"
    },

    // ========== Part 2: ระดับกลาง ==========
    {
        id: "events",
        title: "Events",
        icon: "🖱️",
        description: "เหตุการณ์และการตอบสนอง"
    },
    {
        id: "strings",
        title: "Strings",
        icon: "📝",
        description: "การจัดการข้อความ"
    },
    {
        id: "numbers",
        title: "Numbers & Math",
        icon: "🔢",
        description: "การจัดการตัวเลขและ Math Object"
    },
    {
        id: "arrays-advanced",
        title: "Arrays",
        icon: "📋",
        description: "การจัดการ Array (sort, map, filter)"
    },
    {
        id: "booleans",
        title: "Booleans & Comparisons",
        icon: "✅",
        description: "ค่าความจริงและการเปรียบเทียบ"
    },
    {
        id: "conditions",
        title: "Conditions",
        icon: "🔀",
        description: "การตัดสินใจ If-Else และ Switch"
    },
    {
        id: "loops",
        title: "Loops",
        icon: "🔁",
        description: "การวนซ้ำ For และ While"
    },
    {
        id: "type-conversion",
        title: "Type Conversion",
        icon: "🔄",
        description: "การแปลงชนิดข้อมูล"
    },

    // ========== Part 3: ขั้นสูง ==========
    {
        id: "errors",
        title: "Error Handling",
        icon: "🚨",
        description: "การดักจับข้อผิดพลาด Try-Catch"
    },
    {
        id: "scope",
        title: "Scope & Hoisting",
        icon: "📦",
        description: "ขอบเขตตัวแปร Global vs Local"
    },
    {
        id: "strict-mode",
        title: "Strict Mode",
        icon: "🔒",
        description: "โหมดเข้มงวด"
    },
    {
        id: "this-keyword",
        title: "This Keyword",
        icon: "👆",
        description: "คำสั่ง this คืออะไร"
    },
    {
        id: "arrow-functions",
        title: "Arrow Functions",
        icon: "➡️",
        description: "Arrow Function (ES6)"
    },
    {
        id: "classes",
        title: "Classes",
        icon: "🏛️",
        description: "Object-Oriented Programming (OOP)"
    },
    {
        id: "modules",
        title: "Modules",
        icon: "📦",
        description: "Import/Export แยกไฟล์"
    },
    {
        id: "json",
        title: "JSON",
        icon: "📄",
        description: "รูปแบบข้อมูลมาตรฐาน"
    }
];

console.log("✅ JS Master Course Data");
console.log("📚 Total Chapters:", courses.length);
console.log("");
console.log("📁 ไฟล์เนื้อหา:");
console.log("  • courses-part1.js - บทที่ 1-18 (พื้นฐาน)");
console.log("  • courses-part2.js - บทที่ 19-39 (ระดับกลาง)");
console.log("  • courses-part3.js - บทที่ 40-55 (ขั้นสูง)");
console.log("");
console.log("📋 รายการหมวดหมู่:");
courses.forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.icon} ${c.title}`);
});

"use client";
const customLanguages : {
    [key: string]: {
        template: string;
        language_id: number;
    };
} = {
    'javascript': {
        template: 
        `function add(a, b) {\n\t return a + b;\n}`,
        language_id: 63,
    },
    'python': {
        template: 
        `def add(a, b):\n\t return a + b`,
        language_id: 71,
    },
    'java': {
        template: 
        `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`,
        language_id: 62,
    },
    'c': {
        template: 
        `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}`,
        language_id: 50,
    },
    'cpp': {
        template: 
        `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}`,
        language_id: 54,
    },
    'rust': {
        template: 
        `fn main() {\n\tprintln!("Hello, World!");\n}`,
        language_id: 73,
    },
    'ruby': {
        template: 
        `puts "Hello, World!"`,
        language_id: 72,
    },
    'go': {
        template: 
        `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}`,
        language_id: 60,
    },
    'swift': {
        template: 
        `import Swift\n\nprint("Hello, World!")`,
        language_id: 83,
    },
    'kotlin': {
        template: 
        `fun main() {\n\tprintln("Hello, World!")\n}`,
        language_id: 78,
    },
    'typescript': {
        template: 
        `function add(a: number, b: number): number {\n\t return a + b;\n}`,
        language_id: 74,
    },
    'perl': {
        template: 
        `print "Hello, World!";`,
        language_id: 85,
    },
    'r': {
        template: 
        `print("Hello, World!")`,
        language_id: 80,
    },
    'lua': {
        template: 
        `print("Hello, World!")`,
        language_id: 64
    },



}

export default customLanguages;
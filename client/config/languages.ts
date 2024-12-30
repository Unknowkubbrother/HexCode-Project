"use client";
const customLanguages : {
    [key: string]: {
        template: string;
    };
} = {
    'javascript': {
        template: 
        `function add(a, b) {\n\t return a + b;\n}`,
    },
    'python': {
        template: 
        `def add(a, b):\n\t return a + b`,
    },
    'java': {
        template: 
        `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`,
    },
    'c': {
        template: 
        `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}`,
    },
    'cpp': {
        template: 
        `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}`,
    },
    'rust': {
        template: 
        `fn main() {\n\tprintln!("Hello, World!");\n}`,
    },
    'ruby': {
        template: 
        `puts "Hello, World!"`,
    },
    'go': {
        template: 
        `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}`,
    },
    'swift': {
        template: 
        `import Swift\n\nprint("Hello, World!")`,
    },
    'kotlin': {
        template: 
        `fun main() {\n\tprintln("Hello, World!")\n}`,
    },
    'typescript': {
        template: 
        `function add(a: number, b: number): number {\n\t return a + b;\n}`,
    },
    'perl': {
        template: 
        `print "Hello, World!";`,
    },
    'r': {
        template: 
        `print("Hello, World!")`,
    },
    'lua': {
        template: 
        `print("Hello, World!")`,
    },



}

export default customLanguages;
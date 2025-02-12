"use client";
import { cn } from "@/lib/utils";
import customLanguages from "@/config/languages";
import { Code } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {dracula} from '@uiw/codemirror-theme-dracula';
import {materialLight} from "@uiw/codemirror-theme-material"
import {langs } from '@uiw/codemirror-extensions-langs';

export default function CodeEditor(props: {
  code: string;
  setCode: (code: string) => void;
  className?: string;
  language: string;
  size: string;
  setLanguage: (language: string) => void;
}) {
  const { theme } = useTheme();
  
  const SelectMenuLanguage = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span
            className={`flex justify-center items-center text-sm cursor-pointer hover:text-primary duration-300 gap-1`}
          >
            {[props.language]}
            <ChevronDown size={15} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={props.language}
            onValueChange={props.setLanguage}
          >
            {Object.keys(customLanguages).map((language) => (
              <DropdownMenuRadioItem key={language} value={language}>
                {language}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className={cn("w-full h-full overflow-hidden", props.className)}>
      <div
        className="w-full h-full overflow-auto relative"
      >
        <header className="w-full p-2 gap-2 border-b-[1px] border-primary flex items-center justify-between px-5 sticky top-0 bg-bgsecondary  dark:text-white z-10">
          <div className="flex items-center gap-2">
            <span className="text-primary">
              <Code size={20} />
            </span>
            <h1 className="font-semibold font-mono">Code Editor</h1>
          </div>
          <SelectMenuLanguage />
        </header>
        <div className="w-full h-fit flex">
            <CodeMirror value={props.code} className="w-full"
            theme={theme == "dark" ? dracula : materialLight}
            height="560px"
            extensions={[
              javascript({ jsx: true }),
              langs.cpp(),
              langs.java(),
              langs.python(),
              langs.ruby(),
              langs.rust(),
              langs.swift(),
              langs.typescript(),
              langs.go(),
              langs.kotlin(),
              langs.c(),
              langs.perl(),
              langs.r(),
              langs.lua(),
              langs.html(),
              langs.css(),
              langs.json(),
              langs.xml(),
              langs.markdown(),
              langs.sql(),
              langs.shell(),
              langs.php(),
              langs.csharp(),
            ]}
            onChange={(value) => props.setCode(value)}
            />
        </div>
      </div>
    </div>
  );
}

"use client";
import Editor from "react-simple-code-editor";
import { Highlight, themes } from "prism-react-renderer";
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
import { Button } from "@/components/ui/button";

export default function CodeEditor(props: {
  code: string;
  setCode: (code: string) => void;
  className?: string;
  language: string;
  size: string;
  setLanguage: (language: string) => void;
}) {
  const { theme } = useTheme();
  const fontSize: { [key: string]: string } = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const LineNumbers = () => {
    return (
      <Highlight code={props.code} language={props.language}>
        {({ tokens }) => (
          <div className="flex flex-col">
            {tokens.map((_, i) => (
              <span
                className={`dark:text-white font-mono ${
                  fontSize[props.size]
                } w-[4ch]`}
                key={i}
              >
                {i + 1}{" "}
              </span>
            ))}
          </div>
        )}
      </Highlight>
    );
  };

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
            {/* <DropdownMenuRadioItem value="javascript">JavaScript</DropdownMenuRadioItem> */}
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
            <h1 className="text-lg font-semibold font-mono">Code Edit</h1>
          </div>
          <SelectMenuLanguage />
        </header>
        <div className="w-full h-fit flex p-3">
          <LineNumbers />
          <Editor
            className={`w-full ${fontSize[props.size]}`}
            value={props.code}
            onValueChange={(code) => props.setCode(code)}
            highlight={(code) => (
              <Highlight
                code={code}
                language={props.language}
                theme={theme == "dark" ? themes.nightOwl : themes.nightOwlLight}
              >
                {({ tokens, getLineProps, getTokenProps }) =>
                  tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })} key={i}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} key={key} />
                      ))}
                    </div>
                  ))
                }
              </Highlight>
            )}
            placeholder="Write your code here..."
          />
        </div>
        <div className="fixed bottom-10 right-0 z-10 p-5 flex gap-3">
          <Button variant="default" size="sm">
            Run Code
          </Button>
          <Button variant="default" size="sm" className="bg-green-400">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import getSession from "@/hooks/use-session";

export default function PDFViewer(props: { url: string; className?: string }) {
  const { url } = props;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { theme } = useTheme();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    getSession().then((result) => setToken(result));
  }, []);

  return (
    <div className={cn("h-full w-full", props.className)}>
      {token && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={url}
            httpHeaders={{ Authorization: `Bearer ${token}` }}
            plugins={[defaultLayoutPluginInstance]}
            withCredentials={true}
            theme={theme}
          />
        </Worker>
      )}
    </div>
  );
}

"use client";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { cn } from "@/lib/utils";
import { themePlugin } from '@react-pdf-viewer/theme';
import { useTheme } from "next-themes";

export default function PDFViewer(props: { url: string; className?: string }) {
    const { url } = props;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const themePluginInstance = themePlugin();
    const { theme } = useTheme();

    return (
        <div className={cn("h-full w-full", props.className)}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={url}
                    plugins={[defaultLayoutPluginInstance,themePluginInstance]}
                    withCredentials={true}
                    theme={theme}
                />
            </Worker>
        </div>
    );
}

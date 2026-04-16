import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ShiftGo — Log your shift, know your pay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#341657",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
          }}
        >
          ShiftGo
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#e8e0f1",
            marginTop: 16,
          }}
        >
          Log your shift. Know your pay.
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#a589cf",
            marginTop: 40,
          }}
        >
          Free shift &amp; earnings tracker for hourly workers
        </div>
      </div>
    ),
    { ...size },
  );
}

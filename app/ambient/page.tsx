// app/ambient/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AmbientLightPage() {
  const [lux, setLux] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("초기화 중...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let sensor: any;

    async function initAmbientLightSensor() {
      // SSR 방지: browser 환경 체크
      if (typeof window === "undefined") return;

      // 브라우저 지원 여부 체크
      const hasAmbient =
        typeof (window as any).AmbientLightSensor !== "undefined";

      if (!hasAmbient) {
        setLux(null);
        setStatus("Ambient Light Sensor API 미지원 브라우저입니다.");
        setError(
          "이 기능은 주로 안드로이드 Chrome + HTTPS 환경에서만 동작합니다."
        );
        return;
      }

      // 권한 API 있는 경우 권한 상태 확인
      if (navigator.permissions?.query) {
        try {
          const result = await navigator.permissions.query({
            // @ts-expect-error: ambient-light-sensor는 일부 브라우저만 지원
            name: "ambient-light-sensor",
          });
          setStatus(`권한 상태: ${result.state}`);
        } catch {
          // 일부 브라우저는 name을 인식 못할 수 있음 → 무시
        }
      }

      try {
        const AmbientLightSensor = (window as any).AmbientLightSensor;
        sensor = new AmbientLightSensor({ frequency: 5 });

        sensor.addEventListener("reading", () => {
          const value = sensor.illuminance as number;
          setLux(value);
          setStatus("실시간으로 주변 밝기를 측정 중입니다.");
          setError(null);
        });

        sensor.addEventListener("error", (event: any) => {
          setLux(null);
          setStatus("센서 에러");
          setError(
            `${event.error?.name ?? "Error"} - ${event.error?.message ?? ""}`
          );
        });

        sensor.start();
      } catch (e: any) {
        setLux(null);
        setStatus("센서를 시작할 수 없습니다.");
        setError(`${e?.name ?? "Error"} - ${e?.message ?? e}`);
      }
    }

    initAmbientLightSensor();

    // cleanup - 컴포넌트 언마운트 시 센서 정지
    return () => {
      if (sensor && typeof sensor.stop === "function") {
        sensor.stop();
      }
    };
  }, []);

  return (
    <main
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 700,
        }}
      >
        {lux !== null ? `${lux.toFixed(2)} lux` : "Lux 값 없음"}
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          opacity: 0.7,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {status}
      </div>
      {error && (
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            color: "red",
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {error}
        </div>
      )}
    </main>
  );
}

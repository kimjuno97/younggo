import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body.name);

    // Slack Webhook 호출
    const res = await fetch(
      //@ts-ignore
      process.env.SLACK_API_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `===========영고 사전신청===========\n이름: ${body.name}\n전화번호: ${body.phoneNumber}\n================================`,
        }),
      }
    );

    // Slack이 200 OK 안주면 에러 처리
    if (!res.ok) {
      const text = await res.text();
      console.error("Slack Webhook 실패:", text);
      return NextResponse.json({ ok: false, error: res.body }, { status: 500 });
    }

    // 정상 응답
    return NextResponse.json({ ok: true, message: "Slack으로 전송 완료" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

"use client";

import { useRef, useState } from "react";

export default function Home() {
  // ---- state ----
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  // 폼 위치로 스크롤
  const formRef = useRef<HTMLDivElement | null>(null);
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 제출
  const submitForm = async () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!phoneNumber.trim()) {
      alert("연락처를 입력해주세요.");
      return;
    }

    /// ✅ 전화번호 포맷 검증 추가
    const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("휴대폰 번호 형식이 올바르지 않습니다. 예: 010-1234-5678");
      return;
    }

    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber: phoneNumber }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "제출 중 오류가 발생했어요.");
      }
      alert("사전 신청이 접수되었습니다! 곧 연락드릴게요 🙌");
      // 초기화
      setName("");
      setPhoneNumber("");
      setAgreed(false);
    } catch (e: any) {
      alert(e?.message || "제출 실패. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "2890px",
        position: "relative",
        width: "100%",
        maxWidth: 430, // 💡 모바일 기준폭 + 여유
        minWidth: 320, // 💡 너무 작은 기기 방지

        background: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          left: 260,
          top: 909,
          position: "absolute",
          background: "#ffe5ed",
          borderRadius: 9999,
        }}
      />
      <div
        style={{
          width: 96,
          height: 96,
          left: 252,
          top: 2023,
          position: "absolute",
          background: "#ffe5ed",
          borderRadius: 9999,
        }}
      />
      <div
        style={{
          width: 128,
          height: 128,
          left: 240,
          top: 949,
          position: "absolute",
          borderRadius: 16,
        }}
      />

      <div
        style={{
          width: "100%",
          left: 0,
          top: 180,
          position: "absolute",
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 72,
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              paddingLeft: 16,
              paddingRight: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "#fd437d",
                  fontSize: 20,
                  fontFamily: "NanumSquare Neo OTF",
                  fontWeight: 800,
                  lineHeight: "26px",
                  wordWrap: "break-word",
                }}
              >
                가격은 낮추고, 퀄리티는 높인!
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#111827",
                    fontSize: 36,
                    fontFamily: "NanumSquare Neo OTF",
                    fontWeight: 800,
                    lineHeight: "44.2px",
                    wordWrap: "break-word",
                  }}
                >
                  필리핀 화상 영어의
                  <br />
                  새로운 기준-
                  <br />
                </span>
                <span
                  style={{
                    color: "#095fff",
                    fontSize: 36,
                    fontFamily: "NanumSquare Neo OTF",
                    fontWeight: 900,
                    lineHeight: "44.2px",
                    wordWrap: "break-word",
                  }}
                >
                  영어의 고수
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#2c374f",
                fontSize: 18,
                fontFamily: "Pretendard",
                fontWeight: 500,
                lineHeight: "25px",
                wordWrap: "break-word",
              }}
            >
              직접 필리핀 현지에 방문하여 수업을 받아보고
              <br />
              선별한 베테랑 선생님과 <br />
              AI 기반 실시간 학습비서 기능으로 어디에서도
              <br />
              경험할 수 없는 가성비와 학습 효율을
              <br />
              지금 바로 경험하세요!
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: 327,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                left: 0,
                top: 191,
                position: "absolute",
                background: "#ffe5ed",
                borderRadius: 9999,
              }}
            />
            <img
              src="hero_img.png"
              alt="hero"
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: 20,
                width: "100%",
                padding: "0px 12px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            alignSelf: "stretch",
            paddingLeft: 16,
            paddingRight: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <div
              style={{
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 10,
                paddingBottom: 10,
                background: "#ffe5ed",
                borderRadius: 99,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "#095fff",
                  fontSize: 14,
                  fontFamily: "NanumSquare Neo OTF",
                  fontWeight: 900,
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
              >
                We’re different!🔥
              </div>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#111827",
                fontSize: 32,
                fontFamily: "NanumSquare Neo OTF",
                fontWeight: 800,
                lineHeight: "41.6px",
                wordWrap: "break-word",
              }}
            >
              영어의 고수가
              <br />
              특별한 4가지 이유
            </div>
          </div>

          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 36,
            }}
          >
            {[
              {
                title: "💰 합리적인 가격, 최고의 가치",
                body: (
                  <>
                    불필요한 비용을 줄여 동일 퀄리티 대비
                    <br />
                    최저가를 실현했습니다. <br />
                    이제 부담 없이 원어민 회화를 시작하세요.
                  </>
                ),
              },
              {
                title: "📱 안정적이고 스마트한 학습 경험",
                body: (
                  <>
                    팀즈, skype 다운로드 할 필요 없어요.
                    <br />
                    자사 앱으로 안정적인 수업환경과 관리가 가능해요.
                  </>
                ),
              },
              {
                title: (
                  <>
                    📌 필리핀 현지에서
                    <br />
                    직접 검증한 베테랑 선생님
                  </>
                ),
                body: (
                  <>
                    영어의 고수는 현지에서 직접 교육을 받아보고
                    <br />
                    만족한 선생님만을 모셔 수업을 제공합니다.
                  </>
                ),
              },
              {
                title: (
                  <>
                    🧠 이해 안 되는 문장은 이제 그만!
                    <br />
                    AI가 바로 해결!
                  </>
                ),
                body: (
                  <>
                    수업 중 이해되지 않는 문장을
                    <br />앱 내 AI 번역/설명 기능으로 즉시 확인하고, <br />
                    끊김 없는 대화를 이어가세요.
                  </>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: "stretch",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 24,
                  paddingBottom: 24,
                  background: "#f7fafd",
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.08)",
                  borderRadius: 20,
                  outline: "1px #e8f0f9 solid",
                  outlineOffset: -1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#111827",
                    fontSize: 20,
                    fontFamily: "NanumSquare Neo OTF",
                    fontWeight: 800,
                    lineHeight: "26px",
                    wordWrap: "break-word",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "#111827",
                    fontSize: 16,
                    fontFamily:
                      'Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                    fontWeight: 400,
                    lineHeight: "20.8px",
                    wordWrap: "break-word",
                  }}
                >
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA / Form Section */}
        <div
          ref={formRef}
          style={{
            alignSelf: "stretch",
            paddingLeft: 16,
            paddingRight: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 332,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 15,
            }}
          >
            <div
              style={{
                width: 231,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <div
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 10,
                  paddingBottom: 10,
                  background: "#ffe5ed",
                  borderRadius: 99,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "#095fff",
                    fontSize: 14,
                    fontFamily: "NanumSquare Neo OTF",
                    fontWeight: 900,
                    lineHeight: "16px",
                    wordWrap: "break-word",
                  }}
                >
                  오픈 전 한정 10명! 🎯
                </div>
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "#111827",
                  fontSize: 32,
                  fontFamily: "NanumSquare Neo OTF",
                  fontWeight: 800,
                  lineHeight: "41.6px",
                  wordWrap: "break-word",
                }}
              >
                사전 신청하세요!
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#2c374f",
                fontSize: 16,
                fontFamily: "Pretendard",
                fontWeight: 400,
                lineHeight: "20.8px",
                wordWrap: "break-word",
              }}
            >
              퀄리티는 그대로, 부담은 낮게.
              <br />월 10만원대 영어회화를 <br />
              6만 9,900원에 합리적으로 만나보세요.
            </div>
          </div>

          {/* bullet list */}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 6,
              whiteSpace: "pre-line", // ✅ 핵심 추가
            }}
          >
            {[
              "신청 후 랜덤 선별하여 10명에게 연락드립니다.",
              "연락 후 결제와 스케줄 조율을 진행합니다.",
              "신청자 전원에게 플랫폼 오픈 후 사용할 수 있는\n 10,000원 쿠폰을 증정합니다.",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  alignSelf: "stretch",
                  display: "inline-flex",
                  justifyContent: "flex-start",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    color: "#095fff",
                    fontSize: 16,
                    fontFamily: "Pretendard",
                    fontWeight: 700,
                    lineHeight: "20.8px",
                    wordWrap: "break-word",
                  }}
                >
                  •
                </div>
                <div
                  style={{
                    flex: "1 1 0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "#095fff",
                    fontSize: 16,
                    fontFamily: "Pretendard",
                    fontWeight: 700,
                    lineHeight: "20.8px",
                    wordWrap: "break-word",
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>

          {/* --- 폼 박스 --- */}
          <div
            style={{
              alignSelf: "stretch",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 24,
              paddingBottom: 24,
              background: "#f1f6fb",
              boxShadow: "0px 0px 8px rgba(0,0,0,0.08)",
              borderRadius: 20,
              outline: "1px #e8f0f9 solid",
              outlineOffset: -1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 22,
            }}
          >
            {/* 이름 */}
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#2c374f",
                    fontSize: 16,
                    fontFamily: "Pretendard",
                    fontWeight: 500,
                  }}
                >
                  이름
                </span>
                <span
                  style={{
                    color: "#095fff",
                    fontSize: 16,
                    fontFamily: "Pretendard",
                    fontWeight: 500,
                    lineHeight: "130%",
                    wordWrap: "break-word",
                  }}
                >
                  *
                </span>
              </div>

              {/* input: 이름 */}
              <div
                style={{
                  alignSelf: "stretch",
                  padding: 12,
                  background: "#fdfdfd",
                  borderRadius: 12,
                  outline: "1px #b6d7f7 solid",
                  outlineOffset: -1,
                  display: "inline-flex",
                  gap: 10,
                }}
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="본명을 입력해주세요."
                  aria-label="이름"
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 16,
                    fontFamily:
                      'Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                    color: "#111827",
                  }}
                />
              </div>
            </div>

            {/* 연락처 */}
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#2c374f",
                    fontSize: 16,
                    fontFamily: "Pretendard",
                    fontWeight: 500,
                  }}
                >
                  연락처
                </span>
                <span
                  style={{
                    color: "#095fff",
                    fontSize: 16,
                    fontFamily: "Pretendard",
                    fontWeight: 500,
                    lineHeight: "130%",
                    wordWrap: "break-word",
                  }}
                >
                  *
                </span>
              </div>

              {/* input: 연락처 */}
              <div
                style={{
                  alignSelf: "stretch",
                  padding: 12,
                  background: "#fdfdfd",
                  borderRadius: 12,
                  outline: "1px #b6d7f7 solid",
                  outlineOffset: -1,
                  display: "inline-flex",
                  gap: 10,
                }}
              >
                <input
                  value={phoneNumber}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기

                    // ✅ 010-xxxx-xxxx 형태로 포맷
                    if (value.length < 4) {
                      value = value;
                    } else if (value.length < 8) {
                      value = `${value.slice(0, 3)}-${value.slice(3)}`;
                    } else {
                      value = `${value.slice(0, 3)}-${value.slice(
                        3,
                        7
                      )}-${value.slice(7, 11)}`;
                    }

                    setPhoneNumber(value);
                  }}
                  placeholder="010-1234-5678"
                  inputMode="tel"
                  aria-label="연락처"
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 16,
                    fontFamily:
                      'Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                    color: "#111827",
                  }}
                />
              </div>
            </div>

            {/* 안내문구 + 체크라인 */}
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "#2c374f",
                  fontSize: 14,
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  lineHeight: "130%",
                  wordWrap: "break-word",
                }}
              >
                안심하세요! 사전알림을 드리는 목적 외에는 사용되지 않습니다.
              </div>

              {/* 동의 체크 */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <span
                    style={{
                      color: "#095fff",
                      fontSize: 14,
                      fontFamily:
                        'Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                      fontWeight: 400,
                      wordWrap: "break-word",
                    }}
                  >
                    <a
                      style={{ textDecoration: "underline" }}
                      target="_blank"
                      href="https://radical-basket-e85.notion.site/29c1f6888e5780e3a6c0fc545aa57b0d"
                    >
                      개인정보 수집 및 이용
                    </a>
                    에 동의합니다.*
                  </span>
                </div>
              </label>
            </div>

            {/* 제출 버튼 */}
            <div
              role="button"
              aria-label="사전 신청 접수"
              onClick={loading ? undefined : submitForm}
              style={{
                alignSelf: "stretch",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 16,
                paddingBottom: 16,
                background: loading ? "#6b93d9" : "#095fff",
                borderRadius: 999,
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.8 : 1,
                userSelect: "none",
              }}
            >
              <div
                style={{
                  color: "#fdfdfd",
                  fontSize: 20,
                  fontFamily: "Paperlogy",
                  fontWeight: 700,
                  wordWrap: "break-word",
                }}
              >
                {loading ? "전송 중..." : "사전 신청 접수!"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            alignSelf: "stretch",
            paddingTop: 30,
            paddingBottom: 50,
            paddingLeft: 16,
            paddingRight: 16,
            background: "#fdfdfd",
            borderTop: "1px #b6d7f7 solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 13,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img src="logo.png" alt="logo" width={34} height={34} />
            <div
              style={{
                color: "#111827",
                fontSize: 22,
                fontFamily: "Paperlogy",
                fontWeight: 800,
                wordWrap: "break-word",
              }}
            >
              영어의 고수
            </div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#6a707f",
              fontSize: 14,
              fontFamily: "Pretendard",
              fontWeight: 400,
              lineHeight: "22.4px",
              wordWrap: "break-word",
            }}
          >
            상호명: 주식회사 위이 | 대표자: 범지민
            <br />
            사업자등록번호: 236-81-02950
            <br />
            Email: wiiee@wiiee.co.kr
            <br />
            과천 오피스 : 경기 과천시 과천대로7길 65 과천상상자이타워 B동 205호
            <br />
            인천 오피스 : 인천 연수구 갯벌로12, 송도본원 7층 7-10호 (송도동,
            인천창조경제혁신센터)
          </div>
          <p
            style={{
              fontFamily: "Pretendard",
              fontWeight: 400,
              fontSize: "14px",
              color: "#9EA6B6",
            }}
          >
            © 2025 wiiee. All rights reserved.
          </p>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          width: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: 430, // 💡 모바일 기준폭 + 여유
          minWidth: 320, // 💡 너무 작은 기기 방지
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 8,
            paddingBottom: 8,
            background: "#fd437d",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#fdfdfd",
                fontSize: 13,
                fontFamily: "Paperlogy",
                fontWeight: 400,
                wordWrap: "break-word",
              }}
            >
              지금 사전 신청하면&nbsp;
            </span>
            <span
              style={{
                color: "#fdfdfd",
                fontSize: 13,
                fontFamily: "Paperlogy",
                fontWeight: 700,
                wordWrap: "break-word",
              }}
            >
              주 3회 월 6만원대 영어회화 먼저 시작!🚀
            </span>
          </div>
        </div>

        <div
          style={{
            alignSelf: "stretch",
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 12,
            paddingBottom: 12,
            background: "white",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.04)",
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img src="logo.png" alt="logo" width={34} height={34} />
            <div
              style={{
                color: "#111827",
                fontSize: 22,
                fontFamily: "Paperlogy",
                fontWeight: 800,
                wordWrap: "break-word",
              }}
            >
              영어의 고수
            </div>
          </div>

          {/* 상단 CTA: 폼으로 스크롤 */}
          <div
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 12,
              paddingBottom: 12,
              background: "#095fff",
              borderRadius: 999,
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
            onClick={scrollToForm}
          >
            <div
              style={{
                color: "#fdfdfd",
                fontSize: 16,
                fontFamily: "Paperlogy",
                fontWeight: 700,
                wordWrap: "break-word",
              }}
            >
              사전 신청!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

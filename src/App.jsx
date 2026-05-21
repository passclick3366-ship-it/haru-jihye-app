import React, { useEffect, useMemo, useState } from "react";

const quoteCategories = [
  "인생",
  "가족",
  "돈과 노후",
  "건강",
  "인간관계",
  "부처님 말씀",
  "위로",
  "성공",
  "부부",
  "자녀",
];

const quoteStarts = [
  "늦었다고 생각한 오늘도",
  "작은 습관 하나가",
  "마음이 흔들리는 날에는",
  "가족에게 건네는 따뜻한 말은",
  "돈은 인생의 전부는 아니지만",
  "건강은 하루아침에 만들어지지 않고",
  "좋은 관계는 말보다",
  "나이가 든다는 것은",
  "힘든 하루를 보낸 당신도",
  "부부 사이에 필요한 것은",
  "자녀에게 남겨줄 가장 큰 유산은",
  "성공은 특별한 사람의 것이 아니라",
  "외로운 날일수록",
  "마음공부의 시작은",
  "노후 준비는",
  "오늘의 선택 하나가",
  "참는 것만이 지혜는 아니며",
  "감사하는 마음은",
  "말 한마디가",
  "걷는 속도가 느려도",
];

const quoteMiddles = [
  "남은 인생에서 가장 빠른 시작이 됩니다",
  "내일의 걱정을 조금씩 줄여줍니다",
  "내 마음을 먼저 바라보게 합니다",
  "무너진 마음을 다시 일으켜 세웁니다",
  "사람의 품격을 조용히 보여줍니다",
  "오래가는 평안을 만들어줍니다",
  "후회보다 행동을 선택하게 합니다",
  "나를 지키는 단단한 힘이 됩니다",
  "가족의 마음을 다시 이어줍니다",
  "노후의 불안을 줄이는 현실적인 준비가 됩니다",
  "건강한 삶을 위한 가장 작은 약속입니다",
  "관계를 편안하게 만드는 시작입니다",
  "삶을 더 깊게 이해하게 해줍니다",
  "어제보다 나은 나를 만듭니다",
  "마음의 짐을 가볍게 해줍니다",
  "살아갈 이유를 다시 발견하게 합니다",
  "돈보다 귀한 신뢰를 쌓게 합니다",
  "침묵보다 따뜻한 위로가 됩니다",
  "나쁜 하루 속에서도 좋은 의미를 찾게 합니다",
  "결국 원하는 곳에 도착하게 합니다",
];

const quoteEnds = [
  "오늘도 천천히 시작해도 괜찮습니다.",
  "작게라도 움직이면 삶은 반드시 달라집니다.",
  "나를 포기하지 않는 마음이 가장 큰 힘입니다.",
  "가장 가까운 사람에게 먼저 다정해지세요.",
  "불안할수록 기본으로 돌아가면 길이 보입니다.",
  "마음이 편해야 하루도 편안해집니다.",
  "비교를 멈추면 내 삶이 보이기 시작합니다.",
  "남을 이기기보다 어제의 나를 이겨보세요.",
  "오늘의 한 걸음이 내일의 자신감이 됩니다.",
  "삶은 속도가 아니라 방향입니다.",
  "돈을 아끼는 일도 나를 지키는 지혜입니다.",
  "건강을 챙기는 일은 가족을 사랑하는 일입니다.",
  "관계에도 적당한 거리가 필요합니다.",
  "마음을 비우면 보이지 않던 것이 보입니다.",
  "당신은 생각보다 잘 버텨왔습니다.",
  "실패는 끝이 아니라 다시 배우는 시간입니다.",
  "말을 줄이면 마음의 소리가 들립니다.",
  "감사는 평범한 하루를 특별하게 만듭니다.",
  "부드러운 말은 딱딱한 마음도 녹입니다.",
  "오늘 하루도 충분히 소중합니다.",
];

const descs = [
  "후회보다 중요한 것은 오늘의 선택입니다.",
  "작은 반복이 쌓이면 삶의 방향이 바뀝니다.",
  "힘든 날에는 무리하지 말고 천천히 가도 됩니다.",
  "가까운 사람일수록 따뜻한 말이 필요합니다.",
  "경제적 준비는 마음의 여유를 만드는 현실적인 지혜입니다.",
  "건강은 매일의 작은 습관에서 시작됩니다.",
  "관계는 억지로 붙잡기보다 편안한 균형이 중요합니다.",
  "마음을 바라보는 순간 평온이 시작됩니다.",
  "자신을 믿는 마음이 다시 일어설 힘을 만듭니다.",
  "오늘의 한 문장이 내일의 태도를 바꿀 수 있습니다.",
];

const TOTAL_QUOTES = 100000;
const youtubeUrl = "https://www.youtube.com/@%EC%8B%9C%EB%8B%88%EC%96%B4%EC%9D%98%EC%A7%80%ED%98%9C%EC%83%81%EC%9E%A5";

function makeQuote(index) {
  const category = quoteCategories[index % quoteCategories.length];
  const text = `${quoteStarts[index % quoteStarts.length]} ${quoteMiddles[Math.floor(index / quoteStarts.length) % quoteMiddles.length]}. ${quoteEnds[Math.floor(index / (quoteStarts.length * quoteMiddles.length)) % quoteEnds.length]}`;
  const desc = descs[index % descs.length];
  return { id: index, category, text, desc };
}

function findQuotes({ keyword, selectedCategory, limit = 200 }) {
  const result = [];
  let hasMore = false;

  for (let i = 0; i < TOTAL_QUOTES; i += 1) {
    const q = makeQuote(i);
    const categoryMatch = selectedCategory === "전체" || q.category === selectedCategory;
    const keywordMatch = !keyword || q.text.includes(keyword) || q.category.includes(keyword) || q.desc.includes(keyword);

    if (categoryMatch && keywordMatch) {
      if (result.length < limit) result.push(q);
      else {
        hasMore = true;
        break;
      }
    }
  }

  return { result, hasMore };
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("haruJihyeFavorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const todayQuote = useMemo(() => {
    const today = new Date();
    const index = (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()) % TOTAL_QUOTES;
    return makeQuote(index);
  }, []);

  const [homeQuote, setHomeQuote] = useState(todayQuote);
  const categories = ["전체", ...quoteCategories];

  const quoteList = useMemo(() => findQuotes({ keyword, selectedCategory, limit: 200 }), [keyword, selectedCategory]);

  useEffect(() => {
    localStorage.setItem("haruJihyeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  function changeHomeQuote() {
    const randomIndex = Math.floor(Math.random() * TOTAL_QUOTES);
    setHomeQuote(makeQuote(randomIndex));
  }

  function isFavorite(q) {
    return favorites.some((item) => item.text === q.text);
  }

  function toggleFavorite(q) {
    setFavorites((prev) => {
      if (prev.some((item) => item.text === q.text)) {
        return prev.filter((item) => item.text !== q.text);
      }
      return [q, ...prev].slice(0, 300);
    });
  }

  function openYoutube() {
    window.location.href = youtubeUrl;
  }

  function shareQuote(q) {
    const message = `오늘의 지혜\n\n“${q.text}”\n\n마음이 힘들 때 꺼내보는 하루 한 문장\n하루지혜\n\nhttps://haru-jihye-app.vercel.app`;
    if (navigator.share) {
      navigator.share({ title: "하루지혜", text: message });
    } else {
      navigator.clipboard.writeText(message);
      alert("명언이 복사되었습니다.");
    }
  }

  function downloadQuoteImage(q) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#2b1608");
    gradient.addColorStop(0.35, "#7c2d12");
    gradient.addColorStop(1, "#fff7ed");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);

    ctx.fillStyle = "rgba(255,255,255,0.96)";
    roundRect(ctx, 90, 170, 900, 920, 64);
    ctx.fill();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(540, 260, 46, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#111111";
    ctx.textAlign = "center";
    ctx.font = "900 58px Arial";
    ctx.fillText("하루지혜", 540, 365);

    ctx.fillStyle = "#92400e";
    ctx.font = "800 34px Arial";
    ctx.fillText(q.category, 540, 430);

    ctx.fillStyle = "#000000";
    ctx.font = "900 52px Arial";
    const quoteLines = wrapText(ctx, `“${q.text}”`, 780);
    let y = 570;
    quoteLines.slice(0, 6).forEach((line) => {
      ctx.fillText(line, 540, y);
      y += 76;
    });

    ctx.fillStyle = "#292524";
    ctx.font = "800 32px Arial";
    const descLines = wrapText(ctx, q.desc, 760);
    y += 55;
    descLines.slice(0, 3).forEach((line) => {
      ctx.fillText(line, 540, y);
      y += 50;
    });

    ctx.fillStyle = "#7c2d12";
    ctx.font = "900 34px Arial";
    ctx.fillText("마음이 힘들 때 꺼내보는 하루 한 문장", 540, 1135);

    ctx.fillStyle = "#111111";
    ctx.font = "800 28px Arial";
    ctx.fillText("haru-jihye-app.vercel.app", 540, 1195);

    const link = document.createElement("a");
    link.download = "haru-jihye-quote.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function QuoteCard({ q, premium = false }) {
    const saved = isFavorite(q);
    return (
      <div style={premium ? styles.premiumCard : styles.card}>
        <div style={styles.cardTop}>
          <span style={styles.category}>{q.category}</span>
          <span style={styles.badge}>하루지혜</span>
        </div>
        <div style={styles.quoteMark}>“</div>
        <h2 style={premium ? styles.heroQuote : styles.quote}>{q.text}</h2>
        <p style={styles.desc}>{q.desc}</p>
        <div style={styles.buttonRow}>
          <button style={saved ? styles.savedButton : styles.button} onClick={() => toggleFavorite(q)}>{saved ? "저장됨" : "저장"}</button>
          <button style={styles.button} onClick={() => shareQuote(q)}>공유</button>
          <button style={styles.button} onClick={() => downloadQuoteImage(q)}>이미지</button>
          <button style={styles.outlineButton} onClick={openYoutube}>영상 보기</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <div style={styles.backgroundGlow}></div>

      <header style={styles.header}>
        <div style={styles.logoBadge}>智慧</div>
        <h1 style={styles.logo}>하루지혜</h1>
        <p style={styles.subtitle}>매일 아침 마음을 깨우는 고품격 인생 한마디</p>
      </header>

      {tab === "home" && (
        <main style={styles.main}>
          <section style={styles.hero}>
            <p style={styles.heroSmall}>오늘도 잘 살아내고 있는 당신에게</p>
            <h2 style={styles.heroTitle}>하루 한 문장의 지혜를 전합니다.</h2>
          </section>
          <QuoteCard q={homeQuote} premium />
          <button style={styles.randomButton} onClick={changeHomeQuote}>다른 명언 보기</button>
          <div style={styles.ad}>광고 영역</div>
        </main>
      )}

      {tab === "quotes" && (
        <main style={styles.main}>
          <div style={styles.searchBox}>
            <input style={styles.input} placeholder="원하는 명언을 검색하세요" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <div style={styles.categoryButtons}>
              {categories.map((cat) => (
                <button key={cat} style={selectedCategory === cat ? styles.categoryActiveButton : styles.categoryButton} onClick={() => setSelectedCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {quoteList.result.map((q) => <QuoteCard key={q.id} q={q} />)}
          {quoteList.hasMore && <p style={styles.notice}>검색 결과가 많아 상위 200개만 먼저 보여줍니다. 원하는 주제로 검색하거나 카테고리를 선택해보세요.</p>}
        </main>
      )}

      {tab === "youtube" && (
        <main style={styles.main}>
          <div style={styles.youtubeCard}>
            <div style={styles.youtubeIcon}>▶</div>
            <h2 style={styles.title}>시니어의 지혜상자</h2>
            <p style={styles.desc}>더 깊은 인생 이야기와 노후, 건강, 인간관계의 지혜를 영상으로 이어보세요.</p>
            <button style={styles.bigButton} onClick={openYoutube}>유튜브 채널 바로가기</button>
          </div>
          <div style={styles.ad}>광고 영역</div>
        </main>
      )}

      {tab === "favorites" && (
        <main style={styles.main}>
          <h2 style={styles.pageTitle}>저장한 명언</h2>
          {favorites.length === 0 ? <p style={styles.empty}>아직 저장한 명언이 없습니다.</p> : favorites.slice(0, 200).map((q) => <QuoteCard key={q.text} q={q} />)}
        </main>
      )}

      {tab === "info" && (
        <main style={styles.main}>
          <div style={styles.infoCard}>
            <h2 style={styles.title}>앱 정보</h2>
            <p style={styles.desc}>하루지혜는 인생, 가족, 건강, 돈과 노후, 인간관계에 대한 짧고 따뜻한 명언을 전하는 앱입니다.</p>
            <div style={styles.infoBox}><strong>앱 이름</strong><span>하루지혜</span></div>
            <div style={styles.infoBox}><strong>버전</strong><span>1.0.0</span></div>
            <div style={styles.infoBox}><strong>문의</strong><span>passclick3366@gmail.com</span></div>
          </div>

          <div style={styles.infoCard}>
            <h2 style={styles.title}>개인정보처리방침</h2>
            <p style={styles.policyText}>하루지혜는 현재 회원가입을 받지 않으며, 이름·전화번호·주소 등 개인을 직접 식별할 수 있는 정보를 수집하지 않습니다.</p>
            <p style={styles.policyText}>사용자가 저장한 명언은 사용자의 기기 브라우저 저장공간에만 보관됩니다. 이 정보는 외부 서버로 전송되지 않습니다.</p>
            <p style={styles.policyText}>향후 광고 또는 분석 도구가 추가될 경우, 관련 수집 항목과 이용 목적을 본 방침에 반영하겠습니다.</p>
          </div>
        </main>
      )}

      <nav style={styles.nav}>
        <button style={tab === "home" ? styles.navActive : styles.navBtn} onClick={() => setTab("home")}>홈</button>
        <button style={tab === "quotes" ? styles.navActive : styles.navBtn} onClick={() => setTab("quotes")}>명언</button>
        <button style={tab === "youtube" ? styles.navActive : styles.navBtn} onClick={() => setTab("youtube")}>영상</button>
        <button style={tab === "favorites" ? styles.navActive : styles.navBtn} onClick={() => setTab("favorites")}>저장</button>
        <button style={tab === "info" ? styles.navActive : styles.navBtn} onClick={() => setTab("info")}>정보</button>
      </nav>
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "linear-gradient(160deg, #1c1208 0%, #3b220f 22%, #fff7ed 42%, #fffaf0 100%)", color: "#000", paddingBottom: 98, fontFamily: "Arial, sans-serif", position: "relative", overflowX: "hidden" },
  backgroundGlow: { position: "fixed", top: -160, right: -120, width: 320, height: 320, borderRadius: "50%", background: "rgba(245,158,11,0.45)", filter: "blur(50px)", pointerEvents: "none" },
  header: { padding: "26px 18px 14px", textAlign: "center", color: "white" },
  logoBadge: { width: 58, height: 58, margin: "0 auto 10px", borderRadius: 18, background: "linear-gradient(135deg, #facc15, #f97316)", color: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, boxShadow: "0 12px 30px rgba(0,0,0,0.28)" },
  logo: { margin: 0, fontSize: 38, fontWeight: 900, letterSpacing: "-1px", color: "#fff" },
  subtitle: { margin: "8px 0 0", color: "#fff7ed", fontWeight: 800, fontSize: 15 },
  main: { maxWidth: 760, margin: "0 auto", padding: "12px 16px" },
  hero: { background: "linear-gradient(135deg, #f59e0b, #ea580c)", color: "#111", padding: 26, borderRadius: 30, marginBottom: 18, boxShadow: "0 18px 42px rgba(92,38,4,0.28)", border: "1px solid rgba(255,255,255,0.45)" },
  heroSmall: { margin: 0, fontSize: 15, fontWeight: 900, color: "#111" },
  heroTitle: { margin: "8px 0 0", fontSize: 25, lineHeight: 1.35, fontWeight: 900, wordBreak: "keep-all", color: "#000" },
  premiumCard: { background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)", color: "#000", padding: 28, borderRadius: 32, marginBottom: 16, boxShadow: "0 24px 54px rgba(0,0,0,0.16)", border: "1px solid rgba(245,158,11,0.35)" },
  card: { background: "#fff", color: "#000", padding: 24, borderRadius: 26, marginBottom: 16, boxShadow: "0 12px 30px rgba(0,0,0,0.10)", border: "1px solid rgba(146,64,14,0.12)" },
  cardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10 },
  category: { display: "inline-block", background: "#fef3c7", color: "#000", padding: "8px 15px", borderRadius: 999, fontWeight: 900, fontSize: 15 },
  badge: { color: "#7c2d12", fontWeight: 900, fontSize: 13 },
  quoteMark: { fontSize: 54, lineHeight: 0.7, color: "#f59e0b", fontWeight: 900, marginTop: 12 },
  heroQuote: { fontSize: 32, lineHeight: 1.45, margin: "0 0 12px", wordBreak: "keep-all", color: "#000", fontWeight: 900 },
  quote: { fontSize: 29, lineHeight: 1.45, margin: "0 0 12px", wordBreak: "keep-all", color: "#000", fontWeight: 900 },
  desc: { color: "#111", lineHeight: 1.75, fontSize: 18, fontWeight: 800 },
  title: { fontSize: 28, margin: "0 0 14px", fontWeight: 900, color: "#000" },
  pageTitle: { fontSize: 30, margin: "0 0 18px", fontWeight: 900, color: "#fff" },
  buttonRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 },
  button: { border: 0, background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#000", padding: "14px 18px", borderRadius: 16, fontWeight: 900, cursor: "pointer", fontSize: 15, boxShadow: "0 8px 18px rgba(245,158,11,0.26)" },
  savedButton: { border: 0, background: "#111", color: "#fff", padding: "14px 18px", borderRadius: 16, fontWeight: 900, cursor: "pointer", fontSize: 15 },
  outlineButton: { border: "2px solid #f59e0b", background: "#fff", color: "#000", padding: "12px 16px", borderRadius: 16, fontWeight: 900, cursor: "pointer", fontSize: 15 },
  bigButton: { width: "100%", border: 0, background: "linear-gradient(135deg, #dc2626, #991b1b)", color: "white", padding: 17, borderRadius: 18, fontSize: 18, fontWeight: 900, cursor: "pointer", boxShadow: "0 12px 26px rgba(220,38,38,0.24)" },
  randomButton: { width: "100%", border: 0, background: "linear-gradient(135deg, #7c2d12, #431407)", color: "white", padding: 18, borderRadius: 20, fontSize: 19, fontWeight: 900, cursor: "pointer", marginBottom: 16, boxShadow: "0 14px 28px rgba(67,20,7,0.28)" },
  searchBox: { background: "rgba(255,255,255,0.92)", padding: 14, borderRadius: 24, marginBottom: 16, boxShadow: "0 12px 28px rgba(0,0,0,0.10)" },
  input: { width: "100%", boxSizing: "border-box", padding: 17, borderRadius: 18, border: "2px solid #f59e0b", fontSize: 17, marginBottom: 12, color: "#000", fontWeight: 800, outline: "none" },
  categoryButtons: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 2 },
  categoryButton: { border: 0, background: "#fff", color: "#000", padding: "11px 15px", borderRadius: 999, fontWeight: 900, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  categoryActiveButton: { border: 0, background: "#f59e0b", color: "#000", padding: "11px 15px", borderRadius: 999, fontWeight: 900, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 8px 18px rgba(245,158,11,0.35)" },
  ad: { background: "rgba(255,255,255,0.82)", border: "1px dashed #92400e", padding: 20, borderRadius: 20, textAlign: "center", color: "#111", fontWeight: 900 },
  empty: { background: "white", padding: 30, borderRadius: 22, textAlign: "center", color: "#111", fontWeight: 900 },
  notice: { background: "#fff7ed", color: "#111", padding: 16, borderRadius: 16, textAlign: "center", fontWeight: 900, lineHeight: 1.6 },
  youtubeCard: { background: "#fff", padding: 26, borderRadius: 30, marginBottom: 16, boxShadow: "0 18px 42px rgba(0,0,0,0.14)" },
  youtubeIcon: { width: 58, height: 58, borderRadius: 18, background: "#dc2626", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16, fontWeight: 900 },
  infoCard: { background: "#fff", padding: 26, borderRadius: 30, marginBottom: 16, boxShadow: "0 18px 42px rgba(0,0,0,0.14)", border: "1px solid rgba(146,64,14,0.12)" },
  infoBox: { display: "flex", justifyContent: "space-between", gap: 12, background: "#fff7ed", color: "#000", padding: 16, borderRadius: 18, marginTop: 10, fontWeight: 900, wordBreak: "break-all" },
  policyText: { color: "#111", lineHeight: 1.8, fontSize: 17, fontWeight: 800, wordBreak: "keep-all" },
  nav: { position: "fixed", bottom: 0, left: 0, right: 0, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 7, background: "rgba(255,255,255,0.96)", padding: "10px 10px 12px", boxShadow: "0 -12px 28px rgba(0,0,0,0.16)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(146,64,14,0.18)" },
  navBtn: { border: 0, background: "#fff", color: "#000", padding: 15, borderRadius: 16, fontWeight: 900, cursor: "pointer", fontSize: 15 },
  navActive: { border: 0, background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#000", padding: 15, borderRadius: 16, fontWeight: 900, cursor: "pointer", fontSize: 15, boxShadow: "0 8px 18px rgba(245,158,11,0.35)" },
};

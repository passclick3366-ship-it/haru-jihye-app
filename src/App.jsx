import React, { useEffect, useMemo, useState } from "react";

const quoteCategories = [
  "인생", "가족", "돈과 노후", "건강", "인간관계",
  "부처님 말씀", "위로", "성공", "부부", "자녀"
];

const quoteStarts = [
  "늦었다고 생각한 오늘도", "작은 습관 하나가", "마음이 흔들리는 날에는", "가족에게 건네는 따뜻한 말은",
  "돈은 인생의 전부는 아니지만", "건강은 하루아침에 만들어지지 않고", "좋은 관계는 말보다",
  "나이가 든다는 것은", "힘든 하루를 보낸 당신도", "부부 사이에 필요한 것은", "자녀에게 남겨줄 가장 큰 유산은",
  "성공은 특별한 사람의 것이 아니라", "외로운 날일수록", "마음공부의 시작은", "노후 준비는",
  "오늘의 선택 하나가", "참는 것만이 지혜는 아니며", "감사하는 마음은", "말 한마디가", "걷는 속도가 느려도"
];

const quoteMiddles = [
  "남은 인생에서 가장 빠른 시작이 됩니다", "내일의 걱정을 조금씩 줄여줍니다", "내 마음을 먼저 바라보게 합니다",
  "무너진 마음을 다시 일으켜 세웁니다", "사람의 품격을 조용히 보여줍니다", "오래가는 평안을 만들어줍니다",
  "후회보다 행동을 선택하게 합니다", "나를 지키는 단단한 힘이 됩니다", "가족의 마음을 다시 이어줍니다",
  "노후의 불안을 줄이는 현실적인 준비가 됩니다", "건강한 삶을 위한 가장 작은 약속입니다", "관계를 편안하게 만드는 시작입니다",
  "삶을 더 깊게 이해하게 해줍니다", "어제보다 나은 나를 만듭니다", "마음의 짐을 가볍게 해줍니다",
  "살아갈 이유를 다시 발견하게 합니다", "돈보다 귀한 신뢰를 쌓게 합니다", "침묵보다 따뜻한 위로가 됩니다",
  "나쁜 하루 속에서도 좋은 의미를 찾게 합니다", "결국 원하는 곳에 도착하게 합니다"
];

const quoteEnds = [
  "오늘도 천천히 시작해도 괜찮습니다.", "작게라도 움직이면 삶은 반드시 달라집니다.", "나를 포기하지 않는 마음이 가장 큰 힘입니다.",
  "가장 가까운 사람에게 먼저 다정해지세요.", "불안할수록 기본으로 돌아가면 길이 보입니다.", "마음이 편해야 하루도 편안해집니다.",
  "비교를 멈추면 내 삶이 보이기 시작합니다.", "남을 이기기보다 어제의 나를 이겨보세요.", "오늘의 한 걸음이 내일의 자신감이 됩니다.",
  "삶은 속도가 아니라 방향입니다.", "돈을 아끼는 일도 나를 지키는 지혜입니다.", "건강을 챙기는 일은 가족을 사랑하는 일입니다.",
  "관계에도 적당한 거리가 필요합니다.", "마음을 비우면 보이지 않던 것이 보입니다.", "당신은 생각보다 잘 버텨왔습니다.",
  "실패는 끝이 아니라 다시 배우는 시간입니다.", "말을 줄이면 마음의 소리가 들립니다.", "감사는 평범한 하루를 특별하게 만듭니다.",
  "부드러운 말은 딱딱한 마음도 녹입니다.", "오늘 하루도 충분히 소중합니다."
];

const descs = [
  "후회보다 중요한 것은 오늘의 선택입니다.", "작은 반복이 쌓이면 삶의 방향이 바뀝니다.", "힘든 날에는 무리하지 말고 천천히 가도 됩니다.",
  "가까운 사람일수록 따뜻한 말이 필요합니다.", "경제적 준비는 마음의 여유를 만드는 현실적인 지혜입니다.", "건강은 매일의 작은 습관에서 시작됩니다.",
  "관계는 억지로 붙잡기보다 편안한 균형이 중요합니다.", "마음을 바라보는 순간 평온이 시작됩니다.", "자신을 믿는 마음이 다시 일어설 힘을 만듭니다.",
  "오늘의 한 문장이 내일의 태도를 바꿀 수 있습니다."
];

const quotes = Array.from({ length: 1000 }, (_, i) => {
  const category = quoteCategories[i % quoteCategories.length];
  const text = `${quoteStarts[i % quoteStarts.length]} ${quoteMiddles[Math.floor(i / quoteStarts.length) % quoteMiddles.length]}. ${quoteEnds[Math.floor(i / (quoteStarts.length * quoteMiddles.length)) % quoteEnds.length]}`;
  const desc = descs[i % descs.length];
  return { category, text, desc };
});

const youtubeUrl = "https://www.youtube.com/@%EC%8B%9C%EB%8B%88%EC%96%B4%EC%9D%98%EC%A7%80%ED%98%9C%EC%83%81%EC%9E%A5";

export default function App() {
  const [tab, setTab] = useState("home");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("haruJihyeFavorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const todayQuote = useMemo(() => {
    const today = new Date();
    const index = today.getDate() % quotes.length;
    return quotes[index];
  }, []);

  const [homeQuote, setHomeQuote] = useState(todayQuote);

  const categories = ["전체", ...quoteCategories];

  const filteredQuotes = quotes.filter((q) => {
    const categoryMatch = selectedCategory === "전체" || q.category === selectedCategory;
    const keywordMatch =
      q.text.includes(keyword) || q.category.includes(keyword) || q.desc.includes(keyword);
    return categoryMatch && keywordMatch;
  });

  const favoriteQuotes = quotes.filter((q) => favorites.includes(q.text));

  useEffect(() => {
    localStorage.setItem("haruJihyeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  function changeHomeQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setHomeQuote(quotes[randomIndex]);
  }

  function toggleFavorite(text) {
    setFavorites((prev) =>
      prev.includes(text) ? prev.filter((v) => v !== text) : [...prev, text]
    );
  }

  function openYoutube() {
    window.location.href = youtubeUrl;
  }

  function shareQuote(q) {
    const message = `오늘의 지혜

“${q.text}”

하루 한 문장으로 마음을 깨우는 앱
하루지혜`;
    if (navigator.share) {
      navigator.share({ title: "하루지혜", text: message });
    } else {
      navigator.clipboard.writeText(message);
      alert("명언이 복사되었습니다.");
    }
  }

  function QuoteCard({ q }) {
    const isFavorite = favorites.includes(q.text);
    return (
      <div style={styles.card}>
        <div style={styles.category}>{q.category}</div>
        <h2 style={styles.quote}>“{q.text}”</h2>
        <p style={styles.desc}>{q.desc}</p>
        <div style={styles.buttonRow}>
          <button style={styles.button} onClick={() => toggleFavorite(q.text)}>
            {isFavorite ? "저장 취소" : "저장"}
          </button>
          <button style={styles.button} onClick={() => shareQuote(q)}>공유</button>
          <button style={styles.outlineButton} onClick={openYoutube}>영상 보기</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.logo}>하루지혜</h1>
        <p style={styles.subtitle}>매일 아침 마음을 깨우는 인생 한마디</p>
      </header>

      {tab === "home" && (
        <main style={styles.main}>
          <div style={styles.hero}>
            <p>오늘도 잘 살아내고 있는 당신에게</p>
            <h2>하루 한 문장의 지혜를 전합니다.</h2>
          </div>
          <QuoteCard q={homeQuote} />
          <button style={styles.randomButton} onClick={changeHomeQuote}>다른 명언 보기</button>
          <div style={styles.ad}>광고 영역</div>
        </main>
      )}

      {tab === "quotes" && (
        <main style={styles.main}>
          <input
            style={styles.input}
            placeholder="명언 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div style={styles.categoryButtons}>
            {categories.map((cat) => (
              <button
                key={cat}
                style={selectedCategory === cat ? styles.categoryActiveButton : styles.categoryButton}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {filteredQuotes.map((q, i) => <QuoteCard key={i} q={q} />)}
        </main>
      )}

      {tab === "youtube" && (
        <main style={styles.main}>
          <div style={styles.card}>
            <h2 style={styles.title}>시니어의 지혜상자</h2>
            <p style={styles.desc}>더 깊은 인생 이야기는 유튜브에서 이어볼 수 있습니다.</p>
            <button style={styles.bigButton} onClick={openYoutube}>유튜브 영상 보러가기</button>
          </div>
          <div style={styles.ad}>광고 영역</div>
        </main>
      )}

      {tab === "favorites" && (
        <main style={styles.main}>
          <h2 style={styles.title}>저장한 명언</h2>
          {favoriteQuotes.length === 0 ? <p style={styles.empty}>아직 저장한 명언이 없습니다.</p> : favoriteQuotes.map((q, i) => <QuoteCard key={i} q={q} />)}
        </main>
      )}

      <nav style={styles.nav}>
        <button style={tab === "home" ? styles.navActive : styles.navBtn} onClick={() => setTab("home")}>홈</button>
        <button style={tab === "quotes" ? styles.navActive : styles.navBtn} onClick={() => setTab("quotes")}>명언</button>
        <button style={tab === "youtube" ? styles.navActive : styles.navBtn} onClick={() => setTab("youtube")}>영상</button>
        <button style={tab === "favorites" ? styles.navActive : styles.navBtn} onClick={() => setTab("favorites")}>저장</button>
      </nav>
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "#fff7ed", color: "#292524", paddingBottom: 80, fontFamily: "Arial, sans-serif" },
  header: { padding: "24px 20px 10px", textAlign: "center" },
  logo: { margin: 0, fontSize: 34, fontWeight: 900, color: "#92400e" },
  subtitle: { margin: "8px 0 0", color: "#78716c" },
  main: { maxWidth: 720, margin: "0 auto", padding: 16 },
  hero: { background: "linear-gradient(135deg, #f59e0b, #ea580c)", color: "white", padding: 24, borderRadius: 24, marginBottom: 16, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" },
  card: { background: "white", padding: 24, borderRadius: 24, marginBottom: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
  category: { display: "inline-block", background: "#fef3c7", color: "#92400e", padding: "6px 12px", borderRadius: 999, fontWeight: 700, marginBottom: 14 },
  quote: { fontSize: 28, lineHeight: 1.45, margin: "8px 0", wordBreak: "keep-all" },
  desc: { color: "#57534e", lineHeight: 1.7, fontSize: 16 },
  title: { fontSize: 26, margin: "0 0 12px" },
  buttonRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 },
  button: { border: 0, background: "#f59e0b", color: "white", padding: "12px 16px", borderRadius: 14, fontWeight: 700, cursor: "pointer" },
  outlineButton: { border: "1px solid #f59e0b", background: "white", color: "#92400e", padding: "12px 16px", borderRadius: 14, fontWeight: 700, cursor: "pointer" },
  bigButton: { width: "100%", border: 0, background: "#dc2626", color: "white", padding: 16, borderRadius: 16, fontSize: 17, fontWeight: 800, cursor: "pointer" },
  randomButton: { width: "100%", border: 0, background: "#92400e", color: "white", padding: 16, borderRadius: 18, fontSize: 18, fontWeight: 900, cursor: "pointer", marginBottom: 16, boxShadow: "0 8px 20px rgba(146,64,14,0.25)" },
  input: { width: "100%", boxSizing: "border-box", padding: 16, borderRadius: 18, border: "1px solid #fed7aa", fontSize: 16, marginBottom: 12 },
  categoryButtons: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 12 },
  categoryButton: { border: 0, background: "white", color: "#92400e", padding: "10px 14px", borderRadius: 999, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  categoryActiveButton: { border: 0, background: "#f59e0b", color: "white", padding: "10px 14px", borderRadius: 999, fontWeight: 900, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 6px 16px rgba(245,158,11,0.35)" },
  ad: { background: "#f5f5f4", border: "1px dashed #a8a29e", padding: 20, borderRadius: 18, textAlign: "center", color: "#78716c" },
  empty: { background: "white", padding: 30, borderRadius: 20, textAlign: "center", color: "#78716c" },
  nav: { position: "fixed", bottom: 0, left: 0, right: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, background: "white", padding: 10, boxShadow: "0 -8px 20px rgba(0,0,0,0.08)" },
  navBtn: { border: 0, background: "#f5f5f4", padding: 14, borderRadius: 14, fontWeight: 800, cursor: "pointer" },
  navActive: { border: 0, background: "#f59e0b", color: "white", padding: 14, borderRadius: 14, fontWeight: 800, cursor: "pointer" },
};

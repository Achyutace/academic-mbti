import { useState } from "react";

const types = {
  WCFJ: {
    name: "深夜改稿机器人",
    emoji: "🤖",
    tagline: "导师改，我就改，改到天亮。",
    desc: '凌晨三点还在调参考文献格式，内容全是注水废话，但工作态度无比认真。稳定产出6000字，有效信息约180字。每次提交前都觉得"这次导师一定满意了"，然后迎来第9稿。',
    quote: '"字数不够，废话来凑，格式不对，继续熬夜。"',
    weakness: "审稿意见超过5条",
    power: "熬夜续命能力满级",
    rarity: "★★★★★ 数量最多的物种",
    color: "#c0392b",
  },
  WCFT: {
    name: "DDL裱糊大师",
    emoji: "🪣",
    tagline: "过得去就行，反正也没人认真读。",
    desc: "截止前6小时打开空白文档，复制粘贴+同义词替换，把摘要扩写三倍充字数。导师说改就改，改完继续摸鱼。60分是艺术，61分是浪费。",
    quote: '"我感觉写得还行？（审稿人不同意）"',
    weakness: "认真review的同行评审",
    power: "DDL前的超强专注力",
    rarity: "★★★★ 中流砥柱",
    color: "#e67e22",
  },
  WCRJ: {
    name: "嘴硬内卷怨种",
    emoji: "😤",
    tagline: "凭什么？（但还是改了）",
    desc: '心里骂导师不懂学术，嘴上说"好的老师"，熬夜把水论文改成更大的水论文。内卷的核心动力是那口憋着的怨气。组会沉默最久、改稿最多、骂得最狠，但从不放弃。',
    quote: '"这方向根本没意义。（改到第12稿）"',
    weakness: "导师当众表扬别人",
    power: "怨气转化为生产力",
    rarity: "★★★★ 实验室核心成员",
    color: "#8e44ad",
  },
  WCRT: {
    name: "摆烂叛逆者",
    emoji: "🐟",
    tagline: "爱咋咋地，毕业就完事。",
    desc: "注水+搬运+不鸟导师+躺平，四维完美统一。看起来是最危险的类型，实际是最自洽的存在。从不焦虑，从不内耗，反而活得最明白。",
    quote: '"反正导师也不看内容，只看字数。"',
    weakness: "延期预警",
    power: "抗压能力和心理健康双满",
    rarity: "★★★ 人生赢家（可能）",
    color: "#16a085",
  },
  WEFJ: {
    name: "勤奋表演艺术家",
    emoji: "🎭",
    tagline: "我读了好多文献的！（然后写了废话）",
    desc: '下载了300篇文献，精读了4篇，写出来全是描述性废话和宏大叙事。导师说改啥改啥，每次都感觉自己学到很多，实际上在原地打转。最擅长让自己"看起来很努力"。',
    quote: '"我最近在研究XX理论……（但没写进论文）"',
    weakness: "被问具体方法论",
    power: "表演焦虑的天赋技能",
    rarity: "★★★★ 高校标准配置",
    color: "#2980b9",
  },
  WEFT: {
    name: "文献囤积癖患者",
    emoji: "📚",
    tagline: "等把这800篇读完就开始写。",
    desc: 'Zotero里存了800篇文献，Notion笔记密密麻麻，实际论文：空白文档已打开，光标在闪。顺从导师的表扬，靠"研究热情"和"待读清单"维持自我认同。',
    quote: '"我在做准备工作。（准备了两年）"',
    weakness: "导师问进展",
    power: "文献检索速度极快，就是不写",
    rarity: "★★★★ 图书馆常驻物种",
    color: "#27ae60",
  },
  WERJ: {
    name: "愤怒的水货博士",
    emoji: "🌊",
    tagline: "是你们不懂我，不是我写得不好。",
    desc: "读了大量文献但写出来像白开水，觉得导师俗气不懂欣赏，还拼命内卷想证明自己。组会存在感极强，发言永远充满火药味。",
    quote: '"审稿人是sb，编辑也是sb，就我正常。"',
    weakness: "组会被点名",
    power: "为爱发电的强大续航",
    rarity: "★★★ 每个组必有一个",
    color: "#c0392b",
  },
  WERT: {
    name: "孤傲摸鱼侠",
    emoji: "🌫️",
    tagline: "我有自己的节奏，你们不懂。",
    desc: "大量阅读+产出全是水+不理导师+自由散漫，听起来一无是处，但他/她自己非常享受。偶尔在组会上说一句深刻的话让所有人沉默三秒，然后继续消失。",
    quote: '"学术这东西急不来的。（划走）"',
    weakness: "毕业答辩",
    power: "神秘感和游离感让人摸不透",
    rarity: "★★ 濒危物种，需要保护",
    color: "#7f8c8d",
  },
  SCFJ: {
    name: "认真的工具人",
    emoji: "🔧",
    tagline: "导师让我往东，我绝不往西。",
    desc: "实干写作+搬运文献+完全顺从+拼命内卷。是导师最喜欢的学生，也是被剥削最惨的学生。产出量巨大，原创性约等于零，但永远找得到老师需要的论据。",
    quote: '"老师您看这样改可以吗？（第17稿）"',
    weakness: "导师去开会不在",
    power: "无限执行力",
    rarity: "★★★★★ 学术界支柱",
    color: "#d35400",
  },
  SCFT: {
    name: "及格线艺术家",
    emoji: "🎯",
    tagline: "差不多得了，这条线我踩得极准。",
    desc: '有实力但懒得发挥，文献搬运但逻辑还算通顺，导师说啥就是啥，躺平但不摆烂。把"刚好够用"这件事做到了艺术水准，令人叹为观止。',
    quote: '"过了就行，多写一个字对我来说是侮辱。"',
    weakness: "被迫参与竞争",
    power: "精准的能量管理大师",
    rarity: "★★★ 隐形高手",
    color: "#1abc9c",
  },
  SCRJ: {
    name: "硬核怨种",
    emoji: "💢",
    tagline: "都是sb，就我是正常人。",
    desc: "实干写作+文献搬运+内心强烈对抗导师+极度内卷。愤怒是主要驱动力，产出质量还行，但人际关系堪忧。组会发言激烈，私下写日记骂人，然后继续改稿。",
    quote: '"这个领域充满了学术垃圾。（正在写第三篇）"',
    weakness: "被当众否定",
    power: "不服输的强悍生命力",
    rarity: "★★★ 实验室定时炸弹",
    color: "#8e44ad",
  },
  SCRT: {
    name: "佛系刺头",
    emoji: "🌵",
    tagline: "我行我素，你爱信不信。",
    desc: "写得还行，文献随手搬，导师说什么不一定听，也不内卷。外表云淡风轻，内心有自己的坚守。神秘感拉满，没人完全看透ta。",
    quote: '"我有我的想法。（不解释）"',
    weakness: "团队合作",
    power: "令人费解的稳定感",
    rarity: "★★ 稀有但存在",
    color: "#2c3e50",
  },
  SEFJ: {
    name: "卷王学术机器",
    emoji: "⚙️",
    tagline: "卷就完了，睡什么睡。",
    desc: "实干写作+真读文献+顺从导师+极度内卷。是组里最勤奋也最容易被榨干的人。发过几篇还算不错的文章，但不记得上次睡超过6小时是什么时候。掉发进行时。",
    quote: '"我再改一版！（凌晨4点）"',
    weakness: "自己的身体",
    power: "超人级输出，用健康换的",
    rarity: "★★★★ 每个好组必有一个",
    color: "#e74c3c",
  },
  SEFT: {
    name: "天才佛系生",
    emoji: "😌",
    tagline: "会的会，不会的不会，很合理。",
    desc: '实力强，真读文献，导师怎么说就怎么做，但完全不内卷。是lab里最让人嫉妒的存在：产出质量高、不加班、看起来啥都不在乎。同学暗中观察ta的时间管理秘诀，然后发现ta只是"真的很强"。',
    quote: '"就这样。（发了顶刊，下班回家）"',
    weakness: "传说中没有",
    power: "效率和天赋双满，不装",
    rarity: "★ 传说级，多数人只听说过",
    color: "#27ae60",
  },
  SERJ: {
    name: "孤独改革者",
    emoji: "🔥",
    tagline: "总有一天大家会明白我是对的。",
    desc: "真正实干+深挖文献+不认同导师+拼命内卷。内心住着一个学术理想主义者，外表是一个疲惫的怨种。可能是16型中最痛苦的类型，也是最有可能真正推动点什么的类型。",
    quote: '"这个领域需要被颠覆，我来。（但先把这稿改完）"',
    weakness: "现实与理想的永恒撕裂",
    power: "偏执的学术信仰",
    rarity: "★★ 稀有且高危",
    color: "#e67e22",
  },
  SERT: {
    name: "传说中的独立学者",
    emoji: "🌟",
    tagline: "学术本应如此，我只是认真做了。",
    desc: "真实干+真读文献+不跪导师+不内卷。理论上完美，实际上可能5年没毕业，也可能已经在做改变领域的研究。是16型中的神话，大多数人只在知乎传说里见过。",
    quote: '"我在做我觉得重要的事。"',
    weakness: "学术体制本身",
    power: "清醒、自由、真正的学术灵魂",
    rarity: "★ 比大熊猫还稀有，请善待",
    color: "#2980b9",
  },
};

const questions = [
  {
    id: "paper",
    title: "📝 论文写作时，你更像哪个？",
    a: { label: "注水派", desc: "字数不够废话来凑，能绕弯就不直说，摘要能写800字绝不写300字" },
    b: { label: "实干派", desc: "每个字都有意义（或者努力让它有意义），删掉废话比加字更爽" },
    result: ["W", "S"],
  },
  {
    id: "lit",
    title: "📚 对待文献，你的真实状态是？",
    a: { label: "搬运工", desc: "综述 = 把别人引言重新排列组合，读摘要算精读，引用就是复制doi" },
    b: { label: "挖掘机", desc: "读原文、看方法、翻附录，有时候还去追那篇1987年的鼻祖文章" },
    result: ["C", "E"],
  },
  {
    id: "advisor",
    title: "🧑‍🏫 导师改了你第8稿，你的内心是？",
    a: { label: "顺从型", desc: "好的老师！（开始改）。导师的意见就是方向，质疑导师等于质疑人生" },
    b: { label: "抵抗型", desc: "（沉默3秒）好的老师。（内心：你懂个锤子但还是改了）" },
    result: ["F", "R"],
  },
  {
    id: "mode",
    title: "⏰ 距离提交还有72小时，你在干什么？",
    a: { label: "卷王型", desc: "已经改了第5稿，在纠结某个概念的措辞，准备通宵再打磨一遍" },
    b: { label: "躺平型", desc: "刚打开文档。差不多了吧，能过就行，人活着比论文重要" },
    result: ["J", "T"],
  },
];

const dimKeys = ["paper", "lit", "advisor", "mode"];

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | result
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleAnswer = (qid, idx) => {
    const letter = questions[step].result[idx];
    const newAnswers = { ...answers, [qid]: letter };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setAnimating(false);
      }, 300);
    } else {
      const code = dimKeys.map((k) => newAnswers[k] || questions[dimKeys.indexOf(k)].result[0]).join("");
      setResult(code);
      setScreen("result");
    }
  };

  const reset = () => {
    setScreen("intro");
    setStep(0);
    setAnswers({});
    setResult(null);
    setAnimating(false);
  };

  const t = result ? types[result] : null;

  return (
    <div style={styles.root}>
      {/* Paper texture overlay */}
      <div style={styles.paperOverlay} />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.journalTag}>Journal of Academic Survival · Vol.1 · 2025</div>
        <div style={styles.logo}>README</div>
        <div style={styles.subtitle}>学术人格基因型测评系统 · WCET™</div>
        <div style={styles.taglineSmall}>比MBTI更懂你的科研人生</div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {screen === "intro" && <Intro onStart={() => setScreen("quiz")} />}
        {screen === "quiz" && (
          <Quiz
            q={questions[step]}
            step={step}
            total={questions.length}
            onAnswer={handleAnswer}
            animating={animating}
          />
        )}
        {screen === "result" && t && <Result code={result} type={t} onReset={reset} />}
      </div>

      <div style={styles.footer}>
        Readme · 让科研不再孤独 · readme.ai
      </div>
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <div style={styles.card}>
      <div style={styles.introAbstract}>
        <span style={styles.abstractLabel}>ABSTRACT</span>
        <p style={styles.abstractText}>
          本测评基于对数万名在读研究生的深度田野调查（包括但不限于：蹲守组会、解读朋友圈深夜长文、分析"已读不回"的导师消息），
          提炼出四维学术人格坐标系，精准定位你在学术生存链中的位置。
        </p>
        <p style={styles.abstractText}>
          <strong>Keywords:</strong> 注水论文，摸鱼文献，导师关系，延期危机，学术自我认同
        </p>
      </div>

      <div style={styles.dimGrid}>
        {[
          { letter: "W/S", name: "论文注水 vs 实干", icon: "📝" },
          { letter: "C/E", name: "文献搬运 vs 深挖", icon: "📚" },
          { letter: "F/R", name: "顺从导师 vs 抵抗", icon: "🧑‍🏫" },
          { letter: "J/T", name: "疯狂内卷 vs 躺平", icon: "⏰" },
        ].map((d) => (
          <div key={d.letter} style={styles.dimItem}>
            <div style={styles.dimIcon}>{d.icon}</div>
            <div style={styles.dimLetter}>{d.letter}</div>
            <div style={styles.dimName}>{d.name}</div>
          </div>
        ))}
      </div>

      <div style={styles.warningBox}>
        ⚠️ 本测评结果纯属娱乐，如有雷同，说明你的处境比你想象的更普遍。
      </div>

      <button style={styles.startBtn} onClick={onStart}>
        开始测评 →
      </button>

      <div style={styles.statsRow}>
        <span>共4题</span><span>·</span><span>16种类型</span><span>·</span><span>约1分钟</span>
      </div>
    </div>
  );
}

function Quiz({ q, step, total, onAnswer, animating }) {
  return (
    <div style={{ ...styles.card, opacity: animating ? 0 : 1, transition: "opacity 0.25s" }}>
      <div style={styles.stepIndicator}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.stepDot,
              background: i <= step ? "#1a1a1a" : "#ddd",
              transform: i === step ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
      <div style={styles.qNum}>第 {step + 1} / {total} 题</div>
      <div style={styles.qTitle}>{q.title}</div>
      <div style={styles.optionsCol}>
        {[q.a, q.b].map((opt, idx) => (
          <button
            key={idx}
            style={styles.optionBtn}
            onClick={() => onAnswer(q.id, idx)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1a1a1a";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#1a1a1a";
            }}
          >
            <div style={styles.optLabel}>{opt.label}</div>
            <div style={styles.optDesc}>{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Result({ code, type: t, onReset }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(`我的学术基因型是 ${code}「${t.name}」${t.tagline} —— Readme学术人格测评`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.card}>
      <div style={styles.resultBadge} onClick={handleCopy} title="点击复制分享">
        <div style={{ ...styles.resultCode, color: t.color }}>{code}</div>
        <div style={styles.resultEmoji}>{t.emoji}</div>
        <div style={styles.resultName}>{t.name}</div>
      </div>

      <div style={styles.taglineBox}>
        <span style={styles.quoteChar}>"</span>
        {t.tagline}
        <span style={styles.quoteChar}>"</span>
      </div>

      <div style={styles.descBox}>
        <p style={styles.descText}>{t.desc}</p>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statItem}>
          <div style={styles.statLabel}>典型发言</div>
          <div style={styles.statVal}>{t.quote}</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statLabel}>天敌</div>
          <div style={styles.statVal}>{t.weakness}</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statLabel}>隐藏技能</div>
          <div style={styles.statVal}>{t.power}</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statLabel}>稀有度</div>
          <div style={styles.statVal}>{t.rarity}</div>
        </div>
      </div>

      <div style={styles.cta}>
        <div style={styles.ctaBubble}>
          无论你是哪种类型，Readme 都能帮你找文献、拆论文、理思路——让科研少一点狼狈，多一点从容。
        </div>
      </div>

      <div style={styles.btnRow}>
        <button style={styles.shareBtn} onClick={handleCopy}>
          {copied ? "✅ 已复制！" : "📋 复制分享"}
        </button>
        <button style={styles.retryBtn} onClick={onReset}>
          🔄 再测一次
        </button>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#f5f0e8",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },
  paperOverlay: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.04) 27px, rgba(0,0,0,0.04) 28px)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    textAlign: "center",
    padding: "32px 20px 20px",
    position: "relative",
    zIndex: 1,
    borderBottom: "2px solid #1a1a1a",
    marginBottom: 0,
  },
  journalTag: {
    fontSize: 10,
    letterSpacing: "0.15em",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 8,
    fontFamily: "monospace",
  },
  logo: {
    fontSize: 42,
    fontWeight: 900,
    letterSpacing: "-0.03em",
    color: "#1a1a1a",
    fontFamily: "Georgia, serif",
    lineHeight: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#1a1a1a",
    marginTop: 6,
    fontStyle: "italic",
    letterSpacing: "0.05em",
  },
  taglineSmall: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    fontFamily: "monospace",
  },
  content: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "24px 16px",
    position: "relative",
    zIndex: 1,
  },
  card: {
    background: "#fffef9",
    border: "1.5px solid #1a1a1a",
    borderRadius: 2,
    padding: "28px 24px",
    boxShadow: "4px 4px 0 #1a1a1a",
  },
  introAbstract: {
    borderLeft: "3px solid #1a1a1a",
    paddingLeft: 14,
    marginBottom: 24,
  },
  abstractLabel: {
    fontSize: 9,
    fontFamily: "monospace",
    letterSpacing: "0.2em",
    color: "#888",
    display: "block",
    marginBottom: 6,
  },
  abstractText: {
    fontSize: 13,
    lineHeight: 1.7,
    color: "#333",
    margin: "0 0 8px 0",
  },
  dimGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 20,
  },
  dimItem: {
    border: "1px solid #ddd",
    borderRadius: 2,
    padding: "10px 12px",
    textAlign: "center",
    background: "#fafaf5",
  },
  dimIcon: { fontSize: 20, marginBottom: 4 },
  dimLetter: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 13,
    color: "#1a1a1a",
    marginBottom: 2,
  },
  dimName: { fontSize: 11, color: "#666" },
  warningBox: {
    background: "#fff8e1",
    border: "1px solid #f0c040",
    borderRadius: 2,
    padding: "8px 12px",
    fontSize: 12,
    color: "#7a5c00",
    marginBottom: 20,
    lineHeight: 1.5,
  },
  startBtn: {
    width: "100%",
    padding: "14px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 2,
    fontSize: 16,
    fontFamily: "Georgia, serif",
    cursor: "pointer",
    letterSpacing: "0.05em",
    marginBottom: 12,
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    fontSize: 12,
    color: "#999",
    fontFamily: "monospace",
  },
  stepIndicator: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    transition: "all 0.3s",
  },
  qNum: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: "0.1em",
  },
  qTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#1a1a1a",
    lineHeight: 1.4,
  },
  optionsCol: { display: "flex", flexDirection: "column", gap: 12 },
  optionBtn: {
    border: "1.5px solid #1a1a1a",
    borderRadius: 2,
    padding: "14px 16px",
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s",
    color: "#1a1a1a",
  },
  optLabel: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 4,
  },
  optDesc: { fontSize: 13, lineHeight: 1.5, color: "inherit", opacity: 0.85 },
  resultBadge: {
    textAlign: "center",
    marginBottom: 20,
    cursor: "pointer",
    padding: "16px 0",
    borderBottom: "1.5px dashed #ccc",
  },
  resultCode: {
    fontFamily: "monospace",
    fontSize: 48,
    fontWeight: 900,
    letterSpacing: "0.15em",
    lineHeight: 1,
  },
  resultEmoji: { fontSize: 32, margin: "8px 0 4px" },
  resultName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  taglineBox: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
    lineHeight: 1.6,
  },
  quoteChar: {
    fontSize: 20,
    color: "#bbb",
    margin: "0 4px",
    fontStyle: "normal",
  },
  descBox: {
    background: "#f5f0e8",
    border: "1px solid #ddd",
    borderRadius: 2,
    padding: "14px 16px",
    marginBottom: 20,
  },
  descText: {
    fontSize: 13,
    lineHeight: 1.8,
    color: "#333",
    margin: 0,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 20,
  },
  statItem: {
    border: "1px solid #ddd",
    borderRadius: 2,
    padding: "10px 12px",
    background: "#fafaf5",
  },
  statLabel: {
    fontFamily: "monospace",
    fontSize: 9,
    letterSpacing: "0.15em",
    color: "#999",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  statVal: { fontSize: 12, color: "#1a1a1a", lineHeight: 1.5 },
  cta: { marginBottom: 20 },
  ctaBubble: {
    background: "#e8f4fd",
    border: "1px solid #aed6f1",
    borderRadius: 2,
    padding: "12px 14px",
    fontSize: 13,
    color: "#1a5276",
    lineHeight: 1.6,
    fontStyle: "italic",
  },
  btnRow: { display: "flex", gap: 10 },
  shareBtn: {
    flex: 1,
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 2,
    fontSize: 14,
    fontFamily: "Georgia, serif",
    cursor: "pointer",
  },
  retryBtn: {
    flex: 1,
    padding: "12px",
    background: "transparent",
    color: "#1a1a1a",
    border: "1.5px solid #1a1a1a",
    borderRadius: 2,
    fontSize: 14,
    fontFamily: "Georgia, serif",
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    padding: "16px",
    fontSize: 11,
    color: "#aaa",
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    borderTop: "1px solid #ddd",
    position: "relative",
    zIndex: 1,
  },
};

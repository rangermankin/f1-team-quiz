import { useState } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .f1 {
    min-height: 100vh;
    background: #080808;
    color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
  }

  .f1-inner {
    width: 100%;
    max-width: 660px;
  }

  .f1-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #E10600;
    margin-bottom: 40px;
  }

  .f1-counter {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #444;
    letter-spacing: 0.12em;
  }

  .f1-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .f1-progress {
    width: 100%;
    height: 1px;
    background: #1c1c1c;
    margin-bottom: 52px;
  }

  .f1-progress-fill {
    height: 100%;
    background: #E10600;
    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .f1-question {
    font-size: 34px;
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 36px;
    letter-spacing: -0.01em;
  }

  .f1-answers {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .f1-btn {
    background: transparent;
    border: 1px solid #1e1e1e;
    color: #ccc;
    padding: 18px 22px;
    text-align: left;
    cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 1.2;
    transition: all 0.15s ease;
    position: relative;
    overflow: hidden;
  }

  .f1-btn::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 0;
    background: #E10600;
    transition: width 0.15s ease;
  }

  .f1-btn:hover {
    border-color: #333;
    color: #fff;
    padding-left: 30px;
  }

  .f1-btn:hover::before { width: 3px; }

  .f1-btn.selected {
    border-color: #E10600;
    background: #140000;
    color: #fff;
    padding-left: 30px;
  }

  .f1-btn.selected::before { width: 3px; }

  .f1-intro-title {
    font-size: 58px;
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }

  .f1-intro-sub {
    font-size: 20px;
    color: #555;
    font-weight: 400;
    margin-bottom: 48px;
    line-height: 1.5;
  }

  .f1-start-btn {
    background: #E10600;
    border: none;
    color: #fff;
    padding: 16px 36px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .f1-start-btn:hover { background: #c20000; }

  .f1-result-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #E10600;
    margin-bottom: 20px;
  }

  .f1-color-bar {
    height: 3px;
    width: 64px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .f1-team-name {
    font-size: 56px;
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }

  .f1-team-tag {
    font-size: 21px;
    font-weight: 600;
    color: #888;
    margin-bottom: 28px;
    line-height: 1.3;
  }

  .f1-divider {
    width: 36px;
    height: 1px;
    background: #E10600;
    margin-bottom: 28px;
  }

  .f1-team-desc {
    font-size: 19px;
    line-height: 1.65;
    color: #bbb;
    font-weight: 400;
    margin-bottom: 44px;
  }

  .f1-restart {
    background: transparent;
    border: 1px solid #2a2a2a;
    color: #666;
    padding: 13px 26px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .f1-restart:hover { border-color: #E10600; color: #E10600; }

  .f1-tie-sep {
    border: none;
    border-top: 1px solid #1a1a1a;
    margin: 44px 0;
  }

  .f1-tiebreak-note {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.15em;
    margin-bottom: 40px;
  }
`;

const TEAMS = {
  RB:  { name: "Red Bull Racing",  color: "#3671C6", tag: "You don't just want to win. You want to make it look easy.",                                               desc: "You set the pace and expect everyone else to catch up. You're confident to the point of being intimidating, but it's usually backed up. You don't waste energy on doubt." },
  Fer: { name: "Ferrari",          color: "#E8002D", tag: "You were born for the big stage, and you know it.",                                                        desc: "Passion drives every decision, sometimes usefully, sometimes catastrophically. You have the highest highs and the most dramatic lows of anyone in the room, and you wouldn't trade it. The crowd loves you and you love them back." },
  Mer: { name: "Mercedes",         color: "#27F4D2", tag: "Quiet, precise, and almost always right.",                                                                  desc: "You don't need the spotlight, you need the result. You build systems, trust the process, and have a low tolerance for chaos. People underestimate how competitive you actually are until you show up." },
  McL: { name: "McLaren",          color: "#FF8000", tag: "Cool under pressure, ambitious without showing it.",                                                        desc: "You have deep roots but you don't trade on them. You're building something modern and you're doing it the right way: methodical, collaborative, and patient. You're starting to peak at exactly the right time." },
  AM:  { name: "Aston Martin",     color: "#358C75", tag: "You have serious resources and a very clear vision of what success looks like.",                            desc: "You're not scrappy and you're not apologetic about it. You acquire the best people, build the best infrastructure, and expect results to follow. Status matters to you, but so does legacy." },
  Alp: { name: "Alpine",           color: "#FF87BC", tag: "You have strong opinions about how things should be done and a complicated history of actually doing them.", desc: "You're passionate, a little volatile, and deeply invested in your own identity. You believe in your potential more than your recent results justify, but you're not wrong to believe it." },
  Wil: { name: "Williams",         color: "#64C4FF", tag: "The underdog with the longest memory.",                                                                     desc: "You've seen real success and you know what it takes to get back there. You're not flashy or well-resourced, but you're persistent and people root for you. A breakthrough feels close and you can feel it." },
  Has: { name: "Haas",             color: "#B6BABD", tag: "Chaotic, direct, and surprisingly entertaining to watch.",                                                  desc: "You don't have time for politics or process. You move fast, you speak plainly, and things occasionally go sideways because of it. You're not the most polished operation but there's something compelling about your energy." },
  Sub: { name: "Sauber / Audi",    color: "#52E252", tag: "You are in the middle of becoming something entirely new.",                                                 desc: "Right now the identity is more blueprint than reality, but the vision is clear and the backing is serious. You're methodical, patient, and unbothered by where you are today because you know where you're going." },
  RBu: { name: "Racing Bulls",     color: "#6692FF", tag: "You're hungry, fast, and a little unpredictable.",                                                          desc: "You're not the main event yet but you move like you intend to be. You prove yourself through execution rather than reputation, and you thrive when the pressure is on. You're the one to watch." },
  Cad: { name: "Cadillac",         color: "#C8A84B", tag: "You had to earn your seat at the table, and everyone knew it.",                                             desc: "You're the new arrival with serious backing and a point to prove. The establishment didn't want you here, which only made you more determined. You're not intimidated by legacy, you're motivated by it. American confidence, long game mentality." },
};

const QUESTIONS = [
  { q: "When making a big decision, you...", answers: [
    { text: "Analyze everything before you act",                        teams: ["Mer", "Sub"] },
    { text: "Go with your gut and move fast",                           teams: ["RB",  "Has"] },
    { text: "Feel the emotional weight and go with what's right",       teams: ["Fer", "Alp"] },
    { text: "Do your research, then act boldly",                        teams: ["McL", "Cad"] },
  ]},
  { q: "Your ideal workplace is...", answers: [
    { text: "Structured, quiet, everything has a process",              teams: ["Mer", "Sub"] },
    { text: "High energy, fast-paced, a bit chaotic",                   teams: ["RB",  "Has"] },
    { text: "Prestigious and well-resourced",                           teams: ["AM",  "Fer"] },
    { text: "Scrappy and mission-driven",                               teams: ["Wil", "Alp"] },
  ]},
  { q: "What motivates you most?", answers: [
    { text: "Being the undisputed best",                                teams: ["RB",  "Fer"] },
    { text: "Building something that outlasts you",                     teams: ["AM",  "McL"] },
    { text: "The energy and love of a crowd",                           teams: ["Wil", "Alp"] },
    { text: "Proving everyone who doubted you wrong",                   teams: ["Cad", "RBu"] },
  ]},
  { q: "Under pressure, you...", answers: [
    { text: "Lock in — this is your best environment",                  teams: ["RB",  "RBu"] },
    { text: "Need a clear plan to feel grounded",                       teams: ["AM",  "Mer"] },
    { text: "Adapt on the fly, chaos doesn't bother you",               teams: ["McL", "Cad"] },
    { text: "Sometimes crack, but you always learn from it",            teams: ["Wil", "Sub"] },
  ]},
  { q: "Your relationship to tradition is...", answers: [
    { text: "It gives everything meaning",                              teams: ["Fer", "Wil"] },
    { text: "You respect it but won't be defined by it",               teams: ["McL", "Mer"] },
    { text: "Largely irrelevant — what's next is what matters",         teams: ["RB",  "Has"] },
    { text: "You are writing the traditions of the future",             teams: ["Cad", "RBu"] },
  ]},
  { q: "When something isn't working, you...", answers: [
    { text: "Start from scratch entirely",                              teams: ["Sub", "Cad"] },
    { text: "Bring in the best people available",                       teams: ["AM",  "RB"]  },
    { text: "Optimize what you already have",                           teams: ["Mer", "McL"] },
    { text: "Keep grinding and back yourself",                          teams: ["Wil", "Alp"] },
  ]},
  { q: "How much do you enjoy taking risks?", answers: [
    { text: "You avoid them — deliberate wins every time",              teams: ["Mer", "Sub"] },
    { text: "Calculated risks only",                                    teams: ["McL", "Alp"] },
    { text: "The higher the stakes, the better",                        teams: ["RB",  "Has"] },
    { text: "If the reward is big enough, you'll take any risk",        teams: ["Fer", "RBu"] },
  ]},
  { q: "In a group project, you are...", answers: [
    { text: "The one with the detailed plan",                           teams: ["Mer", "AM"]  },
    { text: "The one executing without being asked",                    teams: ["RBu", "Has"] },
    { text: "The one rallying everyone around a vision",                teams: ["Fer", "Wil"] },
    { text: "The one doing quietly exceptional work",                   teams: ["McL", "Alp"] },
  ]},
  { q: "Your version of success is...", answers: [
    { text: "Total domination — you want to win everything",            teams: ["RB",  "Fer"] },
    { text: "Steady, compounding improvement",                          teams: ["Mer", "McL"] },
    { text: "A breakthrough nobody saw coming",                         teams: ["Wil", "Cad"] },
    { text: "Transforming the whole organization",                      teams: ["Sub", "AM"]  },
  ]},
  { q: "When you enter a new situation, you...", answers: [
    { text: "Study the history first",                                  teams: ["Fer", "Wil"] },
    { text: "Come in with your own vision",                             teams: ["AM",  "Cad"] },
    { text: "Observe quietly, then adapt",                              teams: ["Mer", "Sub"] },
    { text: "Hit the ground running",                                   teams: ["Has", "RBu"] },
  ]},
  { q: "Your leadership style is closest to...", answers: [
    { text: "Systematic and data-driven",                               teams: ["Mer", "Sub"] },
    { text: "Visionary with serious resources behind it",               teams: ["RB",  "AM"]  },
    { text: "Collaborative and culture-first",                          teams: ["McL", "Alp"] },
    { text: "High standards, high intensity",                           teams: ["RBu", "Has"] },
  ]},
  { q: "People who know you well would say...", answers: [
    { text: "You're reliable and understated",                          teams: ["AM",  "Mer"] },
    { text: "You're passionate and occasionally chaotic",               teams: ["Fer", "Wil"] },
    { text: "You're scrappy and unpredictable",                         teams: ["Has", "RBu"] },
    { text: "You're ambitious and quietly cool",                        teams: ["McL", "Alp"] },
  ]},
  { q: "When you're behind, you...", answers: [
    { text: "Push harder and force a result",                           teams: ["RB",  "Has"] },
    { text: "Find what's broken and fix it methodically",               teams: ["Mer", "Sub"] },
    { text: "Make a big move to shake things up",                       teams: ["AM",  "Cad"] },
    { text: "Trust the fundamentals and wait",                          teams: ["McL", "Alp"] },
  ]},
  { q: "How do you feel about the spotlight?", answers: [
    { text: "It energizes you",                                         teams: ["Fer", "Has"] },
    { text: "Results matter more than attention",                       teams: ["McL", "Wil"] },
    { text: "You'd rather let the work speak",                          teams: ["RB",  "Sub"] },
    { text: "You're still writing your public story",                   teams: ["Cad", "RBu"] },
  ]},
  { q: "When building a team, you...", answers: [
    { text: "Want the absolute best — cost is secondary",               teams: ["AM",  "Fer"] },
    { text: "Want true believers who share your vision",                teams: ["Cad", "RBu"] },
    { text: "Want whoever can execute, ego is irrelevant",              teams: ["Has", "Sub"] },
    { text: "Want people who've been through hard times",               teams: ["Wil", "Alp"] },
  ]},
  { q: "When people underestimate you, you...", answers: [
    { text: "Use it as fuel",                                           teams: ["RBu", "Cad"] },
    { text: "Make a public statement",                                  teams: ["Fer", "Wil"] },
    { text: "Let the track record speak",                               teams: ["RB",  "Sub"] },
    { text: "Invest quietly and emerge stronger",                       teams: ["AM",  "Alp"] },
  ]},
];

const TIEBREAKER = {
  q: "When everything is on the line, you lead with...",
  answers: [
    { text: "Your head",  teams: ["Mer", "Sub", "AM",  "McL"] },
    { text: "Your heart", teams: ["Fer", "Wil", "Alp", "Cad"] },
    { text: "Your nerve", teams: ["RB",  "Has", "RBu"]        },
  ]
};

export default function F1Quiz() {
  const [current,    setCurrent]    = useState(0);
  const [scores,     setScores]     = useState({});
  const [phase,      setPhase]      = useState("intro");
  const [tiedTeams,  setTiedTeams]  = useState([]);
  const [results,    setResults]    = useState([]);
  const [selected,   setSelected]   = useState(null);

  const handleAnswer = (answer) => {
    if (selected) return;
    setSelected(answer);
    const next = { ...scores };
    answer.teams.forEach(t => { next[t] = (next[t] || 0) + 1; });
    setTimeout(() => {
      setScores(next);
      setSelected(null);
      if (current < QUESTIONS.length - 1) {
        setCurrent(c => c + 1);
      } else {
        finalize(next);
      }
    }, 320);
  };

  const handleTiebreaker = (answer) => {
    const filtered = tiedTeams.filter(t => answer.teams.includes(t));
    setResults(filtered.length > 0 ? filtered : tiedTeams);
    setPhase("result");
  };

  const finalize = (s) => {
    const max     = Math.max(...Object.values(s));
    const winners = Object.keys(s).filter(t => s[t] === max);
    if (winners.length === 1) { setResults(winners); setPhase("result"); }
    else                      { setTiedTeams(winners); setPhase("tiebreak"); }
  };

  const restart = () => {
    setCurrent(0); setScores({}); setPhase("intro");
    setTiedTeams([]); setResults([]); setSelected(null);
  };

  const progress = (current / QUESTIONS.length) * 100;
  const q        = QUESTIONS[current];

  return (
    <>
      <style>{STYLE}</style>

      {phase === "intro" && (
        <div className="f1">
          <div className="f1-inner">
            <img src="/f1brain_icon_transparent.svg" alt="F1brain" style={{height:36,width:"auto",opacity:0.9,marginBottom:12}}/>
            <div className="f1-eyebrow">F1 Personality Quiz</div>
            <div className="f1-intro-title">Which F1 team are you?</div>
            <div className="f1-intro-sub">
              16 questions. No Formula 1 knowledge required.
            </div>
            <button className="f1-start-btn" onClick={() => setPhase("quiz")}>
              Start
            </button>
          </div>
        </div>
      )}

      {phase === "quiz" && (
        <div className="f1">
          <div className="f1-inner">
            <div className="f1-header-row">
              <div style={{display:"flex",alignItems:"center",gap:8}}><img src="/f1brain_icon_transparent.svg" alt="F1brain" style={{height:18,width:"auto",opacity:0.8}}/><div className="f1-eyebrow" style={{ marginBottom: 0 }}>F1 Personality Quiz</div></div>
              <div className="f1-counter">
                {String(current + 1).padStart(2, "0")} / {QUESTIONS.length}
              </div>
            </div>
            <div className="f1-progress">
              <div className="f1-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="f1-question">{q.q}</div>
            <div className="f1-answers">
              {q.answers.map((a, i) => (
                <button
                  key={i}
                  className={`f1-btn${selected === a ? " selected" : ""}`}
                  onClick={() => handleAnswer(a)}
                >
                  {a.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === "tiebreak" && (
        <div className="f1">
          <div className="f1-inner">
            <div className="f1-tiebreak-note">Tiebreaker</div>
            <div className="f1-question">{TIEBREAKER.q}</div>
            <div className="f1-answers">
              {TIEBREAKER.answers.map((a, i) => (
                <button key={i} className="f1-btn" onClick={() => handleTiebreaker(a)}>
                  {a.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === "result" && (
        <div className="f1">
          <div className="f1-inner">
            <div className="f1-result-label">
              {results.length > 1 ? "It's a tie" : "Your team"}
            </div>
            {results.map((key, idx) => {
              const team = TEAMS[key];
              return (
                <div key={key}>
                  {idx > 0 && <hr className="f1-tie-sep" />}
                  <div className="f1-color-bar" style={{ background: team.color }} />
                  <div className="f1-team-name">{team.name}</div>
                  <div className="f1-team-tag">{team.tag}</div>
                  <div className="f1-divider" />
                  <div className="f1-team-desc">{team.desc}</div>
                </div>
              );
            })}
            <button className="f1-restart" onClick={restart}>Take it again</button>
          </div>
        </div>
      )}
    </>
  );
}

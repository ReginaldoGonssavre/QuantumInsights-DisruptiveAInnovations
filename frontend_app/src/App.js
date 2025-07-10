import React, { useState, useRef } from "react";
// import "./App.css"; // Removed as we are using Tailwind CSS

const sleep = ms => new Promise(res => setTimeout(res, ms));

function useInputAnimation() {
  const [focus, setFocus] = useState(false);
  const ref = useRef();
  return [
    ref,
    focus,
    () => setFocus(true),
    () => setFocus(false)
  ];
}

// Simplified GlowButton for Tailwind integration
function GlowButton({ children, ...props }) {
  return (
    <button className="px-4 py-2 rounded-md bg-[rgba(50,255,50,0.8)] text-white hover:bg-[rgba(50,255,50,0.6)] transition-colors duration-300" {...props}>
      {children}
    </button>
  );
}

// Simplified FloatingLabelInput for Tailwind integration
function FloatingLabelInput({
  label,
  type = "text",
  value,
  onChange,
  ...props
}) {
  const [ref, focus, onFocus, onBlur] = useInputAnimation();
  return (
    <div className="relative mb-4">
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full p-3 bg-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-phosphor-green"
        placeholder=" " // Important for floating label
        {...props}
      />
      <label className={`absolute left-3 top-3 text-gray-400 transition-all duration-200 ${focus || value ? "-top-2 text-xs text-phosphor-green" : ""}`}>
        {label}
      </label>
    </div>
  );
}

// Simplified AnimatedCard for Tailwind integration
function AnimatedCard({ active, children }) {
  return (
    <div className={`bg-white/10 p-6 rounded-2xl shadow-xl transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {children}
    </div>
  );
}

function Toast({ message, show }) {
  return (
    <div className={`fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-md shadow-lg transition-transform duration-300 ${show ? "translate-x-0" : "translate-x-full"}`}>
      {message}
    </div>
  );
}

function LoadingCircle({ loading }) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="w-16 h-16 border-4 border-t-4 border-phosphor-green border-solid rounded-full animate-spin"></div>
    </div>
  );
}

function useFlash() {
  const [flash, setFlash] = useState(false);
  return [
    flash,
    () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 800);
    }
  ];
}

function QuantumSparkle({ trigger }) {
  const [sparks, setSparks] = useState([]);
  React.useEffect(() => {
    if (trigger) {
      let arr = [];
      for (let i = 0; i < 14; i++) {
        arr.push({
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
          delay: Math.random() * 0.5
        });
      }
      setSparks(arr);
      setTimeout(() => setSparks([]), 1000);
    }
  }, [trigger]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparks.map((s, i) => (
        <span
          key={i}
          style={{
            left: s.left,
            top: s.top,
            animationDelay: `${s.delay}s`,
            backgroundColor: 'rgba(50, 255, 50, 0.8)', // phosphor-green
            position: 'absolute',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            opacity: 0,
            transform: 'scale(0)',
            animation: 'sparkle-fade-in-out 1s forwards'
          }}
          className="spark"
        ></span>
      ))}
    </div>
  );
}

// Add keyframes for sparkle animation
// This should ideally go into index.css or a dedicated CSS file if not using a CSS-in-JS solution
// For now, I'll assume it will be added to index.css or similar.
/*
@keyframes sparkle-fade-in-out {
  0% { opacity: 0; transform: scale(0); }
  20% { opacity: 1; transform: scale(1); }
  80% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
}
*/


function App() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(""); // This state is not used in the original App.js, can be removed if not needed.
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [flash, triggerFlash] = useFlash();
  const [spark, setSpark] = useState(false);
  const [quantumResult, setQuantumResult] = useState(null);

  function showMessage(message) {
    setToast(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  }

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    await sleep(500);
    try {
      const res = await fetch(
        tab === "register" ? "/api/register" : "/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );
      const data = await res.json();
      if (res.ok && tab === "register") {
        showMessage("Registrado com sucesso!");
        setTab("login");
        setForm({ username: "", password: "" });
      } else if (res.ok && data.access_token) {
        setToken(data.access_token);
        showMessage("Login efetuado!");
        triggerFlash();
      } else {
        showMessage(data.detail || "Erro!");
      }
    } catch {
      showMessage("Falha ao conectar.");
    }
    setLoading(false);
  }

  async function handleMe() {
    setLoading(true);
    await sleep(400);
    try {
      const res = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(await res.json());
      showMessage("Bem-vindo(a), " + form.username);
      triggerFlash();
    } catch {
      showMessage("Erro ao buscar usuário.");
    }
    setLoading(false);
  }

  async function handleQuantum() {
    setSpark(true);
    setQuantumResult(null);
    setLoading(true);
    await sleep(300);
    try {
      const prompt = window.prompt("Prompt para quantum?", "superposição");
      if (!prompt) return setLoading(false);
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ module: "quantum", prompt })
      });
      const result = await res.json();
      setQuantumResult(result.result || result);
      showMessage("Quantum job executado!");
    } catch {
      showMessage("Erro Quantum!");
    }
    setLoading(false);
    setTimeout(() => setSpark(false), 1200);
  }

  function logout() {
    setToken("");
    setUser(null);
    setQuantumResult(null);
    showMessage("Logout feito.");
  }

  return (
    <div className="bg-galaxy-blue min-h-screen text-white font-sans">
      <QuantumSparkle trigger={spark || flash} />
      <Toast message={toast} show={showToast} />
      <LoadingCircle loading={loading} />

      {/* Navbar Dupla */}
      <header>
        <div className="fixed top-0 left-0 w-full z-50 bg-phosphor-green/10 backdrop-blur-md p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-phosphor-green">Quantum Insights Platform</h1>
            <nav className="flex gap-4">
              <a href="#produtos" className="hover:underline text-phosphor-green">Produtos</a>
              <a href="#sobre" className="hover:underline text-phosphor-green">Sobre</a>
              <a href="#contato" className="hover:underline text-phosphor-green">Contato</a>
            </nav>
          </div>
        </div>
        <div className="fixed top-16 left-0 w-full z-40 bg-phosphor-green/10 backdrop-blur-md p-2 shadow-md">
          <div className="flex justify-center gap-8">
            <button className="text-phosphor-green hover:text-white">IA Financeira</button>
            <button className="text-phosphor-green hover:text-white">Análises Quânticas</button>
            <button className="text-phosphor-green hover:text-white">Painel de Insights</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-phosphor-green">
          Plataforma Quantum Insights
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Revolucionando o mercado financeiro com precisão quântica e escalabilidade. Conheça nossa nova geração de soluções inteligentes.
        </p>
      </section>

      {/* Authentication/User Panel Section */}
      <section id="auth-panel" className="mt-24 px-6 flex justify-center">
        {!token && (
          <AnimatedCard active={true}> {/* Always active for display */}
            <h3 className="text-2xl font-bold text-phosphor-green mb-6 text-center">
              {tab === "login" ? "Login" : "Registrar"}
            </h3>
            <form className="space-y-4" onSubmit={handleAuth}>
              <FloatingLabelInput
                label="Usuário"
                value={form.username}
                onChange={e =>
                  setForm(f => ({ ...f, username: e.target.value }))
                }
                autoComplete="username"
              />
              <FloatingLabelInput
                label="Senha"
                type="password"
                value={form.password}
                onChange={e =>
                  setForm(f => ({ ...f, password: e.target.value }))
                }
                autoComplete={tab === "login" ? "current-password" : "new-password"}
              />
              <GlowButton type="submit" className="w-full">
                {tab === "login" ? "Entrar" : "Registrar"}
              </GlowButton>
              <div className="text-center mt-4">
                {tab === "login" ? (
                  <button type="button" onClick={() => setTab("register")} className="text-phosphor-green hover:underline">
                    Não tem conta? Registre-se
                  </button>
                ) : (
                  <button type="button" onClick={() => setTab("login")} className="text-phosphor-green hover:underline">
                    Já tem conta? Faça login
                  </button>
                )}
              </div>
            </form>
          </AnimatedCard>
        )}

        {token && (
          <AnimatedCard active={true}> {/* Always active for display */}
            <h3 className="text-2xl font-bold text-phosphor-green mb-6 text-center">
              Painel do Usuário
            </h3>
            <div className="space-y-4">
              <GlowButton onClick={handleMe} className="w-full">Meus Dados</GlowButton>
              <GlowButton onClick={handleQuantum} className="w-full">Quantum Job</GlowButton>
              <GlowButton onClick={logout} className="w-full">Logout</GlowButton>
              {user && (
                <div className={`bg-white/5 p-4 rounded-md ${flash ? "ring-2 ring-phosphor-green" : ""}`}>
                  <p>Usuário: <span className="font-semibold">{user.username}</span></p>
                  <p>Criado: <span className="font-semibold">{new Date(user.created_at).toLocaleString()}</span></p>
                  <p>Admin: <span className="font-semibold">{user.is_admin ? "Sim" : "Não"}</span></p>
                </div>
              )}
              {quantumResult && (
                <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-auto max-h-60">
                  {JSON.stringify(quantumResult, null, 2)}
                </pre>
              )}
            </div>
          </AnimatedCard>
        )}
      </section>

      {/* Produtos (Microsserviços) - Kept for structure, can be populated later */}
      <section id="produtos" className="mt-24 px-6">
        <h3 className="text-2xl font-bold text-phosphor-green mb-6 text-center">Microsserviços</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { nome: "IA Financeira", icon: "💡" },
            { nome: "Insights Ativos", icon: "📈" },
            { nome: "Gestão Quântica", icon: "⚛️" },
          ].map((servico, idx) => (
            <div key={idx} className="bg-white/10 p-6 rounded-2xl shadow-xl">
              <div className="text-4xl mb-4">{servico.icon}</div>
              <h4 className="text-xl font-semibold text-phosphor-green}>{servico.nome}</h4>
              <p className="text-sm text-gray-300 mt-2">
                Funcionalidade detalhada de {servico.nome}, com integração segura e escalável.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Quantum Insights Platform. Todos os direitos reservados.
        <br />
        <span>Powered by AigroQuantumSaaS</span>
        <a href="https://github.com/ReggizzAgent" target="_blank" rel="noopener noreferrer" className="ml-2 text-phosphor-green hover:underline">
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;

/*
Linhas: 340 (aprox.)
Recursos:
- Responsivo (ver CSS)
- Floating label input, anim-card, toast, loading, botões glow, quantum sparkles
- UX moderna: feedback visual instantâneo, transições, feedbacks, navegação fluida
- Pronto para mobile/tablet/desktop (CSS no arquivo App.css)
*/
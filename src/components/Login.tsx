import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (email === "test@test.com" && password === "test") {
      navigate("/home");
      return;
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-500 px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          안샘 사고 접수
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-white mb-1">이메일</label>
            <div className="flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
              <FiMail className="text-white mr-3" />
              <input
                type="email"
                placeholder="아이디를 입력해 주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white mb-1">비밀번호</label>
            <div className="flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
              <FiLock className="text-white mr-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-100 transition duration-300"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

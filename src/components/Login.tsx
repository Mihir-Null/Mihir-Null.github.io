import React from 'react';
import MatrixRain from './MatrixRain';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [glitching, setGlitching] = React.useState(false);
  const [lastName, setLastName] = React.useState<'TALATI' | 'NULL'>('TALATI');
  const glitchIntervalRef = React.useRef<number | null>(null);
  const glitchTimeoutsRef = React.useRef<number[]>([]);
  const topics = React.useMemo(
    () => [
      'Quantum Computing',
      'Physics',
      'Machine Learning',
      'Computer Science',
      'GameDev',
      'Simulation',
      'Tech',
      'Science',
    ],
    []
  );
  const [wordIndex, setWordIndex] = React.useState(0);
  const [typed, setTyped] = React.useState('');
  const [deleting, setDeleting] = React.useState(false);
  const typeTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
    return () => {};
  }, []);

  React.useEffect(() => {
    // Periodically glitch TALATI -> NULL, pause, then glitch back to TALATI
    const schedule = () => {
      // flicker into NULL
      setGlitching(true);
      glitchTimeoutsRef.current.push(
        window.setTimeout(() => setLastName('NULL'), 120)
      );
      glitchTimeoutsRef.current.push(
        window.setTimeout(() => setGlitching(false), 600)
      );
      // brief hold on NULL, then flicker back to TALATI
      glitchTimeoutsRef.current.push(
        window.setTimeout(() => {
          setGlitching(true);
          glitchTimeoutsRef.current.push(
            window.setTimeout(() => setLastName('TALATI'), 120)
          );
          glitchTimeoutsRef.current.push(
            window.setTimeout(() => setGlitching(false), 600)
          );
        }, 1200)
      );
    };

    schedule();
    glitchIntervalRef.current = window.setInterval(schedule, 5000);

    return () => {
      if (glitchIntervalRef.current) window.clearInterval(glitchIntervalRef.current);
      glitchTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
      glitchTimeoutsRef.current = [];
    };
  }, []);

  // Typewriter for topics beneath the login box
  React.useEffect(() => {
    const current = topics[wordIndex];
    let delay = deleting ? 60 : 110;
    if (!deleting && typed === current) delay = 1000; // pause at full word
    if (deleting && typed === '') delay = 450; // pause at empty

    typeTimeoutRef.current = window.setTimeout(() => {
      if (!deleting) {
        if (typed === current) {
          setDeleting(true);
        } else {
          setTyped(current.slice(0, typed.length + 1));
        }
      } else {
        if (typed === '') {
          setDeleting(false);
          setWordIndex((wordIndex + 1) % topics.length);
        } else {
          setTyped(current.slice(0, typed.length - 1));
        }
      }
    }, delay);

    return () => {
      if (typeTimeoutRef.current) window.clearTimeout(typeTimeoutRef.current);
    };
  }, [typed, deleting, wordIndex, topics]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = name.trim() || 'visitor';
    onLogin(username);
  };

  return (
    <div className="login-overlay">
      <MatrixRain />
      <div className="login-inner">
        <div className="login-title">
          <div className="login-title-line login-title-first">MIHIR</div>
          <div className={`login-title-line login-title-last ${glitching ? 'glitch' : ''}`}>
            {lastName}
          </div>
        </div>

        <form className="login-form" onSubmit={submit}>
          <label className="login-label">username:</label>
          <input
            ref={inputRef}
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="type your handle and press enter"
            autoFocus
          />
        </form>

        <div className="login-rotator" aria-live="polite">
          <span>{typed}</span>
          <span className="login-rotator-caret" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;

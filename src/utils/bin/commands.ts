// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

type LinkedInFsEntry = {
  type: 'dir' | 'file';
  name: string;
  description?: string;
  content?: string;
  children?: LinkedInFsEntry[];
};

const linkedInExplorer: LinkedInFsEntry[] = [
  {
    type: 'dir',
    name: 'about',
    description: 'Profile overview & contact links',
    children: [
      {
        type: 'file',
        name: 'summary.txt',
        description: 'LinkedIn About summary',
        content: [
          `${config.name} — dual degree honors student (CS & Physics) at the University of Maryland.`,
          'Explores quantum error correction, quantum machine learning, and high-impact systems engineering.',
          'Active across QuICS, Bright Beams Collective, and student quantum communities.',
          '',
          'Motivated by building tools that bridge theoretical breakthroughs with real-world impact.'
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'contact.vcf',
        description: 'Quick contact references',
        content: [
          `Email: ${config.email}`,
          `GitHub: https://github.com/${config.social.github}`,
          `LinkedIn: https://www.linkedin.com/in/${config.social.linkedin}/`,
          '',
          'Location: College Park, MD (open to relocation)',
          'Interests: Quantum computing, ML for science, research tooling'
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'quick_facts.txt',
        description: 'Snapshot of key highlights',
        content: [
          '• GPA: 3.974 — Computer Science (Honors) & Physics (Honors)',
          '• Undergraduate researcher focused on fault-tolerant quantum error correction.',
          '• Multi-disciplinary engineer bridging ML, physics, and systems experimentation.',
          '• Leadership roles across quantum student organizations and ACM@UMD.'
        ].join('\n'),
      },
    ],
  },
  {
    type: 'dir',
    name: 'experience',
    description: 'Professional roles & internships',
    children: [
      {
        type: 'file',
        name: 'caar_reu.txt',
        description: 'Researcher · CAAR REU (QuICS)',
        content: [
          'Role: Researcher — Combinatorics, Algorithms, and AI for Real Problems (QuICS)',
          'Dates: Jun 2025 – Aug 2025',
          '',
          '• Created families of fault-tolerant CSS quantum error-correcting codes for qudits.',
          '• Proved transversal Clifford and T gate support using finite field and QEC theory.',
          '• Built parallel Python tooling (Galois, NumPy, Magma, SageMath) to test self-orthogonality and distance.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'bright_beams_collective.txt',
        description: 'Undergraduate Researcher · IREAP',
        content: [
          'Role: Undergraduate Researcher — Bright Beams Collective (IREAP)',
          'Dates: Sep 2023 – Dec 2024',
          '',
          '• Designed machine learning and gradient optimizers for particle accelerator beamline tuning.',
          '• Ran MAD-X and Elegant simulations to evaluate lattice stability and beam quality.',
          '• Produced Fusion 360 and Ansys visualizations for educational and technical presentations.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'jodo_pay_internship.txt',
        description: 'Software Engineering Intern · JODO PAY',
        content: [
          'Role: Software Engineering Intern — JODO PAY',
          'Dates: Jun 2022 – Jul 2022',
          '',
          '• Automated invoice generation and delivery via Google Workspace APIs.',
          '• Reduced manual processing by approximately 40 staff hours each week.',
          '• Hardened error handling and template management with TypeScript and Apps Script.',
        ].join('\n'),
      },
    ],
  },
  {
    type: 'dir',
    name: 'projects',
    description: 'Highlighted technical projects & hackathons',
    children: [
      {
        type: 'file',
        name: 'quantum_state_tomography.md',
        description: 'Quantum State Tomography via QML',
        content: [
          'Quantum State Tomography using Quantum Machine Learning',
          'Timeline: Sep 2024 – Jul 2025',
          '',
          '• Co-developed variational circuit tomography with custom losses and embeddings.',
          '• Launched 2,000+ experiments across multi-GPU clusters via bespoke orchestration tools.',
          '• Co-author on "Quantum state reconstruction with variational quantum circuit" (arXiv:2507.01246).',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'mit_iquhack_quera.md',
        description: 'MIT iQuHack · QuEra Challenge (Honorable Mention)',
        content: [
          'MIT iQuHack — QuEra Challenge',
          'Timeline: Feb 2025',
          '',
          '• Built a compilation pipeline translating QAOA and error-correcting circuits into neutral atom instructions.',
          '• Optimized pulse schedules leveraging Qiskit, Cirq, Bloqade, PyTorch, and TensorFlow Quantum.',
          '• Team earned an Honorable Mention from QuEra.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'quantum_ml_portfolio.txt',
        description: 'Quantum ML Research Collection',
        content: [
          'Quantum Machine Learning Research (Aug 2023 – Dec 2024)',
          '',
          '• Crafted quantum image processing pipelines with parameterized kernels inside CNNs.',
          '• Designed a hybrid transitional optimizer that mitigates barren plateaus in QAOA.',
          '• Presented findings at the 2024 First Year Innovation & Research Experience Summit.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'club_admin_automation.txt',
        description: 'Automation suite for student organizations',
        content: [
          'Club Administration Automation Application (Nov 2024 – Feb 2025)',
          '',
          '• Automated Discord announcements, email campaigns, Instagram posts, and room reservations.',
          '• Integrated Google APIs, Discord.py, Selenium, and OAuth2 for end-to-end workflows.',
          '• Adopted by multiple university clubs to reduce administrative effort.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'housing_market_analysis.txt',
        description: 'Housing Market Analysis · ML Forecasting',
        content: [
          'Housing Market Analysis (Jun 2024 – Jul 2024)',
          '',
          '• Built feedforward neural networks to predict housing prices from public datasets.',
          '• Applied PCA and statistical analysis to surface high-signal features.',
          '• Combined web-scraped listings with census data to improve model robustness.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'indie_game_development.txt',
        description: 'Indie Game Development · National Finalist & Winner',
        content: [
          'Independent Game Development (2020 – 2023)',
          '',
          '• Shipped two action platformers with custom soft-body simulation via Unity/Unreal.',
          '• 2nd place, 2021 Mindbox National Design Championship (Game Design).',
          '• National finalist, 2020 Mindbox Design Championship (Game Development).',
          '• Authored procedural map generation toolkit for arbitrary tilemaps.',
        ].join('\n'),
      },
    ],
  },
  {
    type: 'dir',
    name: 'education',
    description: 'Degrees, coursework & honors',
    children: [
      {
        type: 'file',
        name: 'umd.md',
        description: 'University of Maryland — Dual Degree',
        content: [
          'University of Maryland — College Park',
          'Dual B.S. Computer Science (Honors) & Physics (Honors)',
          'Expected Graduation: May 2027 | GPA 3.974',
          '',
          'Dean’s List every semester with advanced quantum and ML coursework.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'scholarships.txt',
        description: 'Honors & scholarships',
        content: [
          'Angelo Bardasis Scholarship — Physics',
          'John D. Gannon Scholarship — Computer Science',
          'Dean’s List — Every Semester',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'coursework.md',
        description: 'Representative coursework',
        content: [
          'Graduate Quantum Computing (CMSC657)',
          'Computer Science Honors Seminar',
          'Differentiable Programming for Agentic AI (CMSC498Z)',
          'Natural Language Processing (CMSC470)',
          'Data Science (CMSC320)',
          'Design & Analysis of Algorithms (CMSC451)',
          'Object-Oriented Programming in Java (CMSC132)',
          'Applied Probability & Statistics (STAT400)',
          'Honors Advanced Modern Physics (PHYS400)',
          'Quantum Mechanics II (PHYS402)',
          'Multivariate Calculus',
          'Differential Equations',
        ].join('\n'),
      },
    ],
  },
  {
    type: 'dir',
    name: 'organizations',
    description: 'Leadership & community involvement',
    children: [
      {
        type: 'file',
        name: 'quantum_coalition.txt',
        description: 'Industry Chair · Quantum Coalition',
        content: [
          'Industry Chair — Quantum Coalition (Jan 2024 – Present)',
          '',
          '• Co-organized the QRISE research competition with 200+ global participants.',
          '• Partnered with the UN and ITU to deliver the QC-FLIQ hackathon (500+ attendees).',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'undergraduate_quantum_association.txt',
        description: 'President · Undergraduate Quantum Association',
        content: [
          'President — Undergraduate Quantum Association (Jan 2025 – Present)',
          '',
          '• Led programming, partnerships, and outreach after four years as an officer.',
          '• Hosted the Quantum Leap Career Nexus with 240+ attendees and partners across IBM, Microsoft, Amazon Braket, IonQ, and more.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'acm_umd.txt',
        description: 'Co-President · ACM@UMD',
        content: [
          'Co-President — ACM@UMD (Sep 2023 – Present)',
          '',
          '• Restarted the official student chapter and launched a new web presence.',
          '• Grew membership to 145+ students with technical workshops on shell scripting, AI, quantum computing, and heuristic search.',
        ].join('\n'),
      },
    ],
  },
  {
    type: 'dir',
    name: 'publications',
    description: 'Papers & authored works',
    children: [
      {
        type: 'file',
        name: 'quantum_state_reconstruction_paper.txt',
        description: 'Quantum state reconstruction preprint',
        content: [
          'Quantum state reconstruction with variational quantum circuit',
          'Status: Preprint — arXiv:2507.01246',
          '',
          'Overview:',
          '• Introduces a quantum machine learning approach to tomography for high-dimensional states.',
          '• Benchmarks loss landscapes, embedding strategies, and optimizer behavior across noise models.',
          '• Highlights scalability results enabled by custom experiment orchestration.',
        ].join('\n'),
      },
      {
        type: 'file',
        name: 'special_relativity_guide.txt',
        description: 'Author — A Very Quick Guide to Special Relativity',
        content: [
          'Author — A Very Quick Guide to Special Relativity (Sep 2020 – Jun 2021)',
          '',
          '• Wrote and published an accessible primer covering time dilation through mass–energy equivalence.',
          '• Focused on first-principles explanations for students exploring modern physics.',
        ].join('\n'),
      },
    ],
  },
  {
    type: 'dir',
    name: 'skills',
    description: 'Technical skills snapshot',
    children: [
      {
        type: 'file',
        name: 'skills_matrix.txt',
        description: 'Technical areas & tooling',
        content: [
          'Programming: Python, C, C++, JavaScript/TypeScript, Rust (learning)',
          'Quantum SDKs: Qiskit, Cirq, PennyLane, Q#, Bloqade',
          'Numerical/ML: PyTorch, TensorFlow Quantum, NumPy, SciPy, scikit-learn, MPI, Numba',
          'Simulation & CAD: MAD-X, Elegant, Magma, SageMath, Fusion 360, Ansys Workbench',
          'Tooling: Git, Docker, Google Cloud APIs, Selenium, Discord.py, REST APIs',
        ].join('\n'),
      },
    ],
  },
];

const encodeExplorerTree = (tree: LinkedInFsEntry[]) => encodeURIComponent(JSON.stringify(tree));

// Help
export const help = async (args: string[]): Promise<string> => {
  const allCommands = Object.keys(bin)
    .filter((cmd) => cmd !== 'default')
    .sort();
  const priority = ['ls', 'resume', 'summary', 'crt'];
  const prioritized = priority.filter((cmd) => allCommands.includes(cmd));
  const orderedCommands = [
    ...prioritized,
    ...allCommands.filter((cmd) => !priority.includes(cmd)),
  ];
  const bulletList = orderedCommands
    .map((cmd, index) => {
      const marker = index === orderedCommands.length - 1 ? '└' : '├';
      return `${marker} ${cmd}`;
    })
    .join('\n');

  return `Available commands:\n${bulletList}\n\nShortcuts:\n- [tab] trigger completion\n- [ctrl+l] or clear to wipe the terminal\n\nTry 'sumfetch' for the quick card or 'summary' for the full profile.`;
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name} — a CS and Physics honors student at UMD focused on quantum computing, ML, and systems.
More:
'sumfetch'  - quick profile + links
'summary'   - deeper dive into work & projects
'resume'    - open my on-site resume
'linkedin'  - opens my LinkedIn profile`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Donate
export const donate = async (args: string[]): Promise<string> => {
  return `thank you for your interest. 
here are the ways you can support my work:
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.paypal}" target="_blank">paypal</a></u>
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.patreon}" target="_blank">patreon</a></u>
`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  return 'Opening LinkedIn profile...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  const payload = encodeExplorerTree(linkedInExplorer);
  return `
<div class="fs-browser" data-fs-explorer tabindex="0" role="application" aria-label="LinkedIn sections explorer" data-tree="${payload}">
  <div class="fs-browser__window">
    <div class="fs-browser__titlebar">linkedin::fs — sections as virtual directories</div>
    <div class="fs-browser__path" data-role="path">~/</div>
    <div class="fs-browser__list" data-role="list"></div>
    <div class="fs-browser__status" data-role="status">Use ↑/↓ or w/s/j/k to move. Enter/→/d opens, Esc/←/a backs.</div>
    <div class="fs-browser__footer">
      <span>Navigation: ↑/↓, w/s, j/k</span>
      <span>Open: enter, →, d, l</span>
      <span>Back/Close: esc, ←, a, h</span>
      <span>Files open in nano-style overlay · ctrl+x or esc exits · f toggle full height</span>
    </div>
  </div>
  <div class="fs-browser__noscript">JavaScript is required for the interactive LinkedIn directory view.</div>
</div>`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `navigation happens inside the interactive listing.
run 'ls' and use wasd/arrow keys or vim keybinds with enter/esc.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// CRT toggle
export const crt = async (args: string[] = []): Promise<string> => {
  const root = document.getElementById('terminal-root');
  if (!root) return 'CRT: terminal root not found.';

  const sub = (args[0] || '').toLowerCase();

  const setState = (enabled: boolean) => {
    if (enabled) {
      root.classList.add('crt');
      localStorage.setItem('effects_crt', 'true');
      return 'CRT effect: ON';
    }
    root.classList.remove('crt');
    localStorage.setItem('effects_crt', 'false');
    return 'CRT effect: OFF';
  };

  // subcommands
  if (sub === 'on') {
    // default to warp-md when enabling if none chosen
    if (!root.classList.contains('crt-warp-sm') &&
        !root.classList.contains('crt-warp-md') &&
        !root.classList.contains('crt-warp-lg')) {
      root.classList.add('crt-warp-md');
      localStorage.setItem('effects_crt_warp', 'md');
    }
    return setState(true);
  }
  if (sub === 'off') return setState(false);
  if (sub === 'toggle' || sub === 't') {
    const nowOn = !root.classList.contains('crt');
    return setState(nowOn);
  }

  // warp strength
  if (sub === 'warp') {
    const level = (args[1] || '').toLowerCase();
    if (!level || level === 'status') {
      const cur = root.classList.contains('crt-warp-lg')
        ? 'lg'
        : root.classList.contains('crt-warp-md')
        ? 'md'
        : root.classList.contains('crt-warp-sm')
        ? 'sm'
        : 'off';
      return `CRT warp: ${cur}\nUsage: crt warp [off|sm|md|lg]`;
    }
    root.classList.remove('crt-warp-sm', 'crt-warp-md', 'crt-warp-lg');
    if (level === 'off') {
      localStorage.setItem('effects_crt_warp', 'off');
      return 'CRT warp: OFF';
    }
    if (['sm', 'md', 'lg'].includes(level)) {
      root.classList.add(`crt-warp-${level}`);
      localStorage.setItem('effects_crt_warp', level);
      return `CRT warp: ${level.toUpperCase()}`;
    }
    return `Unknown warp level: ${level}. Use off|sm|md|lg.`;
  }

  // (offset removed) always center the warp

  // curvature toggle
  if (sub === 'curve') {
    const state = (args[1] || '').toLowerCase();
    if (!state || state === 'status') {
      return `CRT curve: ${root.classList.contains('crt-curve') ? 'ON' : 'OFF'}\nUsage: crt curve [on|off|toggle]`;
    }
    const toggle = () => {
      const nowOn = !root.classList.contains('crt-curve');
      if (nowOn) {
        root.classList.add('crt-curve');
        localStorage.setItem('effects_crt_curve', 'true');
        return 'CRT curve: ON';
      }
      root.classList.remove('crt-curve');
      localStorage.setItem('effects_crt_curve', 'false');
      return 'CRT curve: OFF';
    };
    if (state === 'on') {
      root.classList.add('crt-curve');
      localStorage.setItem('effects_crt_curve', 'true');
      return 'CRT curve: ON';
    }
    if (state === 'off') {
      root.classList.remove('crt-curve');
      localStorage.setItem('effects_crt_curve', 'false');
      return 'CRT curve: OFF';
    }
    if (state === 'toggle' || state === 't') return toggle();
    return `Unknown curve option: ${state}. Use on|off|toggle.`;
  }

  const status = root.classList.contains('crt') ? 'ON' : 'OFF';
  const warp = root.classList.contains('crt-warp-lg')
    ? 'lg'
    : root.classList.contains('crt-warp-md')
    ? 'md'
    : root.classList.contains('crt-warp-sm')
    ? 'sm'
    : 'off';
  const curve = root.classList.contains('crt-curve') ? 'on' : 'off';
  return `Usage: crt [on|off|toggle|warp|curve]\nCurrent: ${status} (warp=${warp}, curve=${curve})`;
};

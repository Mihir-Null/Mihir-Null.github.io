import config from '../../../config.json';
import content from '../../../content.json';
import { getProjects, getQuote, getReadme, getWeather } from '../api';

type Experience   = { role: string; company: string; dates: string; bullets: string[] };
type Project      = { name: string; timeline: string; bullets: string[] };
type Education    = { school: string; degrees: string[]; gpa: string; graduation: string; honors: string[]; coursework: string[] };
type Organization = { org: string; role: string; dates: string; bullets: string[] };
type Publication  = { title: string; status: string; bullets: string[] };
type Skills       = { languages: string[]; quantum: string[]; ml: string[]; simulation: string[]; tools: string[] };

const b = (s: string) => `  • ${s}`;

export const help = async (_args: string[]): Promise<string> => {
  const cmds: [string, string][] = [
    ['about',           'short bio'],
    ['ls [section]',    'browse content — sections: experience projects education skills organizations publications'],
    ['sumfetch',        'quick profile card'],
    ['summary',         'full text profile'],
    ['resume',          'open resume in new tab'],
    ['email',           'open mailto link'],
    ['linkedin',        'open LinkedIn profile'],
    ['github',          'open GitHub profile'],
    ['github_projects', 'list public GitHub repos'],
    ['weather [city]',  'current weather'],
    ['quote',           'random quote'],
    ['crt [on|off|toggle|warp|curve]', 'toggle CRT retro effects'],
    ['clear',           'clear the terminal'],
  ];
  const rows = cmds
    .map(([cmd, desc], i) => `${i === cmds.length - 1 ? '└' : '├'} ${cmd.padEnd(34)}${desc}`)
    .join('\n');
  return `Commands:\n${rows}\n\n[tab] complete  [ctrl+l] clear  [↑/↓] history`;
};

export const about = async (_args: string[]): Promise<string> => {
  return `${config.name}\n${content.bio}\n\ntype 'sumfetch' for the profile card, 'ls' to browse sections`;
};

const SECTIONS = [
  ['about',         'short bio'],
  ['experience',    'professional history'],
  ['projects',      'things built'],
  ['education',     'degrees & coursework'],
  ['organizations', 'leadership roles'],
  ['publications',  'papers & writing'],
  ['skills',        'technical stack'],
] as const;

export const ls = async (args: string[]): Promise<string> => {
  const section = (args[0] ?? '').toLowerCase();

  if (!section) {
    const rows = SECTIONS.map(([name, desc], i) =>
      `${i === SECTIONS.length - 1 ? '└' : '├'} ${name.padEnd(16)}${desc}`
    ).join('\n');
    return `~/\n${rows}\n\nuse 'ls <section>' to read, e.g. 'ls experience'`;
  }

  switch (section) {
    case 'about':
      return `${config.name}\n${content.bio}`;

    case 'experience':
      return (content.experience as Experience[])
        .map((e) => `${e.role} @ ${e.company}  (${e.dates})\n${e.bullets.map(b).join('\n')}`)
        .join('\n\n');

    case 'projects':
      return (content.projects as Project[])
        .map((p) => `${p.name}  [${p.timeline}]\n${p.bullets.map(b).join('\n')}`)
        .join('\n\n');

    case 'education':
      return (content.education as Education[])
        .map((e) => [
          e.school,
          e.degrees.map((d) => `  ${d}`).join('\n'),
          `  GPA: ${e.gpa} · Graduation: ${e.graduation}`,
          '',
          'Honors:',
          e.honors.map(b).join('\n'),
          '',
          'Coursework:',
          e.coursework.map(b).join('\n'),
        ].join('\n'))
        .join('\n\n');

    case 'organizations':
      return (content.organizations as Organization[])
        .map((o) => `${o.role} @ ${o.org}  (${o.dates})\n${o.bullets.map(b).join('\n')}`)
        .join('\n\n');

    case 'publications':
      return (content.publications as Publication[])
        .map((p) => `${p.title}\n  ${p.status}\n${p.bullets.map(b).join('\n')}`)
        .join('\n\n');

    case 'skills': {
      const s = content.skills as Skills;
      return [
        `Languages:   ${s.languages.join(', ')}`,
        `Quantum:     ${s.quantum.join(', ')}`,
        `ML:          ${s.ml.join(', ')}`,
        `Simulation:  ${s.simulation.join(', ')}`,
        `Tools:       ${s.tools.join(', ')}`,
      ].join('\n');
    }

    default:
      return `ls: '${section}' not found\nSections: ${SECTIONS.map(([n]) => n).join(', ')}`;
  }
};

export const resume = async (_args: string[]): Promise<string> => {
  window.open(config.resume_url);
  return 'Opening resume...';
};

export const email = async (_args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (_args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);
  return 'Opening GitHub...';
};

export const linkedin = async (_args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  return 'Opening LinkedIn...';
};

export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

export const echo = async (args: string[]): Promise<string> => args.join(' ');

export const whoami = async (_args: string[]): Promise<string> => config.ps1_username;

export const date = async (_args: string[]): Promise<string> => new Date().toString();

export const vi = async (_args: string[]): Promise<string> => `woah, you still use 'vi'? just try 'vim'.`;
export const vim = async (_args: string[]): Promise<string> => `'vim' is so outdated. how about 'nvim'?`;
export const nvim = async (_args: string[]): Promise<string> => `'nvim'? too fancy. why not 'emacs'?`;
export const emacs = async (_args?: string[]): Promise<string> => `you know what? just use vscode.`;

export const sudo = async (_args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  return `Permission denied: with little power comes... no responsibility?`;
};

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

  if (sub === 'on') {
    if (!root.classList.contains('crt-warp-sm') &&
        !root.classList.contains('crt-warp-md') &&
        !root.classList.contains('crt-warp-lg')) {
      root.classList.add('crt-warp-md');
      localStorage.setItem('effects_crt_warp', 'md');
    }
    return setState(true);
  }
  if (sub === 'off') return setState(false);
  if (sub === 'toggle' || sub === 't') return setState(!root.classList.contains('crt'));

  if (sub === 'warp') {
    const level = (args[1] || '').toLowerCase();
    if (!level || level === 'status') {
      const cur = root.classList.contains('crt-warp-lg') ? 'lg'
        : root.classList.contains('crt-warp-md') ? 'md'
        : root.classList.contains('crt-warp-sm') ? 'sm'
        : 'off';
      return `CRT warp: ${cur}\nUsage: crt warp [off|sm|md|lg]`;
    }
    root.classList.remove('crt-warp-sm', 'crt-warp-md', 'crt-warp-lg');
    if (level === 'off') { localStorage.setItem('effects_crt_warp', 'off'); return 'CRT warp: OFF'; }
    if (['sm', 'md', 'lg'].includes(level)) {
      root.classList.add(`crt-warp-${level}`);
      localStorage.setItem('effects_crt_warp', level);
      return `CRT warp: ${level.toUpperCase()}`;
    }
    return `Unknown warp level: ${level}. Use off|sm|md|lg.`;
  }

  if (sub === 'curve') {
    const state = (args[1] || '').toLowerCase();
    if (!state || state === 'status') {
      return `CRT curve: ${root.classList.contains('crt-curve') ? 'ON' : 'OFF'}\nUsage: crt curve [on|off|toggle]`;
    }
    if (state === 'on')  { root.classList.add('crt-curve');    localStorage.setItem('effects_crt_curve', 'true');  return 'CRT curve: ON'; }
    if (state === 'off') { root.classList.remove('crt-curve'); localStorage.setItem('effects_crt_curve', 'false'); return 'CRT curve: OFF'; }
    if (state === 'toggle' || state === 't') {
      const nowOn = !root.classList.contains('crt-curve');
      if (nowOn) { root.classList.add('crt-curve'); localStorage.setItem('effects_crt_curve', 'true'); }
      else       { root.classList.remove('crt-curve'); localStorage.setItem('effects_crt_curve', 'false'); }
      return `CRT curve: ${nowOn ? 'ON' : 'OFF'}`;
    }
    return `Unknown curve option: ${state}. Use on|off|toggle.`;
  }

  const status = root.classList.contains('crt') ? 'ON' : 'OFF';
  const warp = root.classList.contains('crt-warp-lg') ? 'lg'
    : root.classList.contains('crt-warp-md') ? 'md'
    : root.classList.contains('crt-warp-sm') ? 'sm'
    : 'off';
  const curve = root.classList.contains('crt-curve') ? 'on' : 'off';
  return `Usage: crt [on|off|toggle|warp|curve]\nCurrent: ${status} (warp=${warp}, curve=${curve})`;
};

// --- API commands ---

export const github_projects = async (_args: string[]): Promise<string> => {
  const projects = await getProjects();
  return projects
    .map((repo: any) =>
      `${repo.name} — <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`
    )
    .join('\n');
};

export const quote = async (_args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const readme = async (_args: string[]): Promise<string> => {
  const data = await getReadme();
  return `Opening GitHub README...\n\n${data}`;
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) return 'Usage: weather [city]. Example: weather london';
  return getWeather(city);
};

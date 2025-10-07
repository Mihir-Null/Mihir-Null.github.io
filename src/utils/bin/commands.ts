// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + '\n';
    } else {
      c += Object.keys(bin).sort()[i - 1] + ' ';
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name} — a CS and Physics honors student at UMD focused on quantum computing, ML, and systems.
More:
'sumfetch'  - quick profile + links
'resume'    - opens my LinkedIn profile
'projects'  - recent GitHub repositories
'linkedin'  - open my on-site resume`;
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
  window.open(`/resume.html`);
  return 'Opening on-site resume...';
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
  return `a
bunch
of
fake
directories`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.
if you want to help, you can type 'donate'.`;
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

// Banner
export const banner = (args?: string[]): string => {
  return `
█████        ███                       ███████████                                   
░░███        ░░░                       ░█░░░███░░░█                                   
 ░███        ████  █████ █████  ██████ ░   ░███  ░   ██████  ████████  █████████████  
 ░███       ░░███ ░░███ ░░███  ███░░███    ░███     ███░░███░░███░░███░░███░░███░░███ 
 ░███        ░███  ░███  ░███ ░███████     ░███    ░███████  ░███ ░░░  ░███ ░███ ░███ 
 ░███      █ ░███  ░░███ ███  ░███░░░      ░███    ░███░░░   ░███      ░███ ░███ ░███ 
 ███████████ █████  ░░█████   ░░██████     █████   ░░██████  █████     █████░███ █████
░░░░░░░░░░░ ░░░░░    ░░░░░     ░░░░░░     ░░░░░     ░░░░░░  ░░░░░     ░░░░░ ░░░ ░░░░░ 

Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
`;
};

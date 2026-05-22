import config from '../../../config.json';
import content from '../../../content.json';

// --- summary command ---

const wrapLink = (href: string, text: string, cls = '') => {
  const dataAttr = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `<a class="sumfetch-link${cls ? ` ${cls}` : ''}" data-link="${dataAttr}" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
};

export const summary = async (_args: string[]): Promise<string> => {
  const INDENT = '&nbsp;&nbsp;';
  const lbl = (emoji: string, key: string, cls = '') =>
    `<span class="sumfetch-key ${cls}">${emoji} ${key}</span>`;
  const safeLink = (text: string, href: string, cls = '') =>
    text && text !== '—' ? wrapLink(href, text, cls) : text;
  const field = (emoji: string, key: string, values: string | string[], cls = '') => {
    const prefix = `${INDENT}${lbl(emoji, key, cls)}: `;
    const items = Array.isArray(values) ? values : [values];
    return items.map((v, i) => (i === 0 ? `${prefix}${v}` : `${INDENT}${INDENT}${v}`)).join('\n');
  };

  const edu = (content as any).education?.[0] ?? {};
  const eduLines: string[] = [
    ...(edu.degrees ?? []).map((d: string) => `${edu.school} — ${d}`),
    `GPA ${edu.gpa} | Graduation ${edu.graduation}`,
  ];
  const expLines: string[] = ((content as any).experience ?? []).map(
    (e: any) => `${e.role} @ ${e.company}  (${e.dates})`
  );
  const projLines: string[] = ((content as any).projects ?? []).slice(0, 4).map((p: any) => p.name);
  const s = (content as any).skills ?? {};
  const skillLines = [
    `Languages:   ${(s.languages ?? []).join(', ')}`,
    `Quantum:     ${(s.quantum ?? []).join(', ')}`,
    `ML:          ${(s.ml ?? []).join(', ')}`,
    `Tools:       ${(s.tools ?? []).join(', ')}`,
  ];
  const orgLines: string[] = ((content as any).organizations ?? []).map(
    (o: any) => `${o.role} — ${o.org}`
  );

  return `<pre class="sumfetch">
${field('', 'name',       config.name, 'sumfetch-label')}
${field('', 'bio',        [(content as any).bio ?? '—'], 'sumfetch-label')}
${field('', 'github',     safeLink(`github.com/${config.social.github}`, `https://github.com/${config.social.github}/`), 'sumfetch-label')}
${field('', 'linkedin',   safeLink(`linkedin.com/in/${config.social.linkedin}`, `https://www.linkedin.com/in/${config.social.linkedin}/`, 'sumfetch-link--social'), 'sumfetch-label')}
${field('', 'email',      safeLink(config.email, `mailto:${config.email}`, 'sumfetch-link--social'), 'sumfetch-label')}

${field('', 'education',  eduLines, 'sumfetch-label')}

${field('', 'experience', expLines, 'sumfetch-label')}

${field('', 'projects',   projLines, 'sumfetch-label')}

${field('', 'skills',     skillLines, 'sumfetch-label')}

${field('', 'roles',      orgLines, 'sumfetch-label')}
</pre>`;
};

// --- sumfetch command ---

const sumfetch = async (_args: string[]): Promise<string> => {
  if (config.ascii === 'cveinnt') {
    return `                                                  
             @@@@@@@@@@@@@                   sumfetch: summary display
        @@@@               @@@@             -----------
      @@                       @@            ABOUT
    @@                           @@          ${config.name}
  @@                               @@       ﰩ ${config.ps1_hostname}
 @@                         @@@     @@       <u><a href="${config.resume_url}" target="_blank">resume</a></u>
@@        @@@                        @@     爵 <u><a href="${config.repo}" target="_blank">Github repo</a></u>
@@                                   @@     -----------
@@             .@@@@@@@@@@.          @@      CONTACT 
 @@           @@          @@        @@       <u><a href="mailto:${config.email}" target="_blank">${config.email}</a></u>
  @@           @@        @@        @@        <u><a href="https://github.com/${config.social.github}" target="_blank">github.com/${config.social.github}</a></u>
   @@             @@@@@@          @@         <u><a href="https://linkedin.com/in/${config.social.linkedin}" target="_blank">linkedin.com/in/${config.social.linkedin}</a></u>
     @@@                        @@@         -----------
        @@@                  @@@ @@          DONATE 
         @|  @@@@@@@@@@@@@@@@   @@           <u><a href="${config.donate_urls.paypal}" target="_blank">${config.donate_urls.paypal}</a></u>
         @|                      @@          <u><a href="${config.donate_urls.patreon}" target="_blank">${config.donate_urls.patreon}</a></u>

`;
  }

  // Helpers and data
  const span = (cls: string, s: string) => `<span class="${cls}">${s}</span>`;
  const title = (s: string) => span('sumfetch-title', s);
  const border = (s: string) => span('sumfetch-border', s);
  const WIDTH = 62; // widened inner width
  const TOP_BAR_DELTA_ABOUT = 5; // per-section top bar visual alignment
  const TOP_BAR_DELTA_CONTACT = 4;
  const TOP_BAR_DELTA_SYSTEM = 6;
  const INDENT = '  ';
  const header = (t: string, delta = 0) => {
    const inner = ` ${t} `;
    const baseFill = Math.max(0, WIDTH - inner.length);
    const fill = Math.max(0, baseFill - delta);
    const left = '─'.repeat(Math.floor(fill / 2));
    const right = '─'.repeat(fill - Math.floor(fill / 2));
    return border('┌' + left) + title(inner) + border(right + '┐');
  };
  const bottom = () => border('└' + '─'.repeat(WIDTH) + '┘');
  const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');
  // Inner lines without side borders; pad to fixed WIDTH for clean bottom alignment
  const padLine = (content: string) => {
    const visible = stripTags(content);
    const padCount = Math.max(0, WIDTH - visible.length);
    return content + ' '.repeat(padCount);
  };
  const padKey = (k: string, width = 12) => (k.length >= width ? k : k + ' '.repeat(width - k.length));
  const label = (emoji: string, key: string, colorCls = '') => `<span class="sumfetch-key ${colorCls}">${padKey(`${emoji} ${key}`)}</span>`;
  const shorten = (text: string, max: number) => (text.length <= max ? text : text.slice(0, Math.max(0, max - 1)) + '…');
  const safeLink = (text: string, href: string, cls = '') => (text && text !== '—' ? `<a class="sumfetch-link" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>` : text);
  const aboutVal = (text: string) => `<span class="sumfetch-about-val">${text}</span>`;

  const pad = (n: number) => String(n).padStart(2, '0');
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const edu = (content as any).education?.[0] ?? {};
  const degreeEntries: string[] = Array.isArray(edu.degrees) ? edu.degrees : [];
  const gpa: string = edu.gpa ?? '—';
  const grad: string = edu.graduation ?? '—';
  const phone = (config as any).phone || '—';
  const citizen = (config as any).citizenship || '—';

  // Left: Null symbol ASCII (white)
  const leftAscii = `
                                                         
                                                         
                                                         
                         .......          .:#@@*.        
                    .:+*%@@@@@@@%#+:.    :*@@@@+.        
                  -%@@@@@@@@@@@@@@@@@%-.*@@@@%:.         
               .=%@@@@@#=:.....:=#@@@@@@@@@%-            
              -%@@@@+:.            :#@@@@@+.             
            .=@@@@=.              -%@@@@@@@=.            
            -@@@%-             .:%@@@@+-%@@@=.           
           .@@@@-             :#@@@@*.  :@@@@.           
           *@@@+            .*@@@@#:.    =@@@*           
          .%@@@.          .=@@@@%:       .@@@%.          
          .@@@@.        .=@@@@%=.        .@@@@.          
          .%@@@.       -%@@@@=.          .@@@%.          
           +@@@+.   .:%@@@@+.            +@@@+           
           .%@@@-  :#@@@@*.             -@@@%.           
            -@@@@=*@@@@#:.            .-%@@@-.           
             -@@@@@@@%:              .*@@@@=             
             .+@@@@@#-.           .:*@@@@#:              
            -%@@@@@@@@@%*=::.::=*%@@@@@%-.               
         .:@@@@@+..*@@@@@@@@@@@@@@@@@*.                  
        .*@@@@*.     .-+#%%@@@@%#*-.                     
        .+@@*:.            ...                           
                                                         
                                                         
                                                         `;

  // Right: three boxes with consistent borders (ASCII-only content for stable width)
  const degreeIcon = (degree: string) => {
    const lower = degree.toLowerCase();
    if (lower.includes('physics')) return '⚛';
    if (lower.includes('computer science')) return '';
    return '•';
  };

  const degreeLines = degreeEntries.length
    ? [
        padLine(`${INDENT}${label('', 'Degrees', 'sumfetch-key--green')}`),
        ...degreeEntries.map((degree, index) => {
          const marker = index === degreeEntries.length - 1 ? '└' : '├';
          return padLine(
            `${INDENT.repeat(2)}${marker} ${aboutVal(`${degreeIcon(degree)} ${degree}`)}`,
          );
        }),
      ]
    : [
        padLine(`${INDENT}${label('', 'Degrees', 'sumfetch-key--green')} ${aboutVal('—')}`),
      ];

  const about = [
    header('About', TOP_BAR_DELTA_ABOUT),
    padLine(''),
    padLine(`${INDENT}${label('', 'Name', 'sumfetch-key--green')}: ${aboutVal(config.name)}`),
    ...degreeLines,
    padLine(`${INDENT}${label('', 'GPA', 'sumfetch-key--green')}: ${aboutVal(gpa)}`),
    padLine(`${INDENT}${label('', 'Grad', 'sumfetch-key--green')}: ${aboutVal(grad)}`),
    padLine(''),
    bottom(),
  ].join('\n');

  const liText = `linkedin.com/in/${config.social.linkedin}`;
  const ghText = `github.com/${config.social.github}`;
  const maxVal = WIDTH - INDENT.length - 2 /*': '*/ - 12 /*key*/;
  const contact = [
    header('Contact', TOP_BAR_DELTA_CONTACT),
    padLine(''),
    padLine(`${INDENT}${label('', 'Email', 'sumfetch-key--red')}: ${safeLink(shorten(config.email, maxVal), `mailto:${config.email}`)}`),
    padLine(`${INDENT}${label('', 'Phone', 'sumfetch-key--yellow')}: ${safeLink(shorten(phone, maxVal), `tel:${(phone || '').replace(/[^+\d]/g, '')}`)}`),
    padLine(`${INDENT}${label('', 'LinkedIn', 'sumfetch-key--linkedin')}: ${safeLink(shorten(liText, maxVal), `https://${liText}`)}`),
    padLine(`${INDENT}${label('', 'GitHub', 'sumfetch-key--github')}: ${safeLink(shorten(ghText, maxVal), `https://${ghText}`)}`),
    padLine(''),
    bottom(),
  ].join('\n');

  const system = [
    header('Uptime / Age / DT', TOP_BAR_DELTA_SYSTEM),
    padLine(''),
    padLine(`${INDENT}${label('', 'Age', 'sumfetch-key--green')}: <span data-sum-age>—</span>`),
    padLine(`${INDENT}${label('', 'Citizenship', 'sumfetch-key--green')}: ${citizen}`),
    padLine(`${INDENT}${label('', 'Uptime', 'sumfetch-key--green')}: ∝ Caffeine ☕`),
    padLine(`${INDENT}${label('', 'DateTime', 'sumfetch-key--green')}: <span data-sum-dt>${dateStr}</span>`),
    padLine(''),
    bottom(),
  ].join('\n');

  return `
<div class=\"sumfetch-container\">\n  <div class=\"sumfetch-grid\">\n    <pre class=\"sumfetch-left\">${leftAscii}</pre>\n    <div class=\"sumfetch-right\">\n      <pre>${about}</pre>\n      <pre>${contact}</pre>\n      <pre>${system}</pre>\n    </div>\n  </div>\n</div>`;
};

export { sumfetch };

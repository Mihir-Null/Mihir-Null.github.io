import config from '../../../config.json';

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

  const degrees = (config as any).degrees || '—';
  const gpa = (config as any).gpa || '—';
  const grad = (config as any).graduation_date || '—';
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
  const about = [
    header('About', TOP_BAR_DELTA_ABOUT),
    padLine(''),
    padLine(`${INDENT}${label('', 'Name', 'sumfetch-key--green')}: ${aboutVal(config.name)}`),
    padLine(`${INDENT}${label('', 'Degree', 'sumfetch-key--green')}: ${aboutVal(degrees)}`),
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

export default sumfetch;

import config from '../../../config.json';

const INDENT = '&nbsp;&nbsp;';

const groupLines = (...lines: string[]) => lines.join('\n');

const padKey = (key: string, width = 16) => key.padEnd(width, ' ');

const wrapLink = (href: string, text: string, cls = '') => {
  const dataAttr = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `<a class="sumfetch-link${cls ? ` ${cls}` : ''}" data-link="${dataAttr}" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
};

export const summary = async (_args: string[]): Promise<string> => {
  const label = (emoji: string, key: string, colorCls = '') => `<span class="sumfetch-key ${colorCls}">${padKey(`${emoji} ${key}`)}</span>`;
  const labelTight = (emoji: string, key: string, colorCls = '') => `<span class="sumfetch-key ${colorCls}">${emoji} ${key}</span>`;

  const safeLink = (text: string, href: string, cls = '') =>
    text && text !== '—' ? wrapLink(href, text, cls) : text;

  const fieldLines = (emoji: string, key: string, values: string | string[], colorCls = '') => {
    const prefix = `${INDENT}${label(emoji, key, colorCls)}: `;
    const items = Array.isArray(values) ? values : [values];
    return items
      .map((value, index) => (index === 0 ? `${prefix}${value}` : `${INDENT}${INDENT}${value}`))
      .join('\n');
  };

  const aboutField = (emoji: string, key: string, values: string | string[], colorCls = '') => {
    const prefix = `${INDENT}${labelTight(emoji, key, colorCls)}: `;
    const items = Array.isArray(values) ? values : [values];
    return items
      .map((value, index) => (index === 0 ? `${prefix}${value}` : `${INDENT}${INDENT}${value}`))
      .join('\n');
  };

  return `
<pre class="sumfetch">
${groupLines(
  '    @@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@   @@          ',
  '  @@@@::::::::::::::@@@@::::::::@@   @@:::::::::::::::::@@   @@          ',
  ' @@::::::::::::::::::::::::::::::@@ @@@@@@@@@@@@@@@@@@@@@    @@          ',
  '@@::::::::::::::::::::::::::::::::@@@@@@@@@@@@@@@@@@@@@      @@          ',
  '@@::::::::::::::@@@@::::::::::::::@@@::::::::::::::@@        @@          ',
  '@@::::::::::::::@@@@::::::::::::::@@@::::::::::::::@@        @@          ',
  ' @@::::::::::::::@@::::::::::::::::@@::::::::::::::@@        @@          ',
  '  @@:::::::::::::@@::::::::::::::::@@::::::::::::::@@        @@          ',
  '    @@:::::::::::@@::::::::::::::::@@::::::::::::::@@        @@          ',
  '      @@@::::::@@@:::::::::::::::::@@::::::::::::::@@        @@          ',
  '         @@@@@@::::::::::::::::::::@@::::::::::::::@@        @@          ',
  '           @@::::::::::::::::::::::@@::::::::::::::@@        @@          ',
  '           @@::::::::::::::::::::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::@@@@:::::@@::::::::::::::@@        @@          ',
  '           @@::::::::::::::@@@:::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::::@@:::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::::@@:::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::::@@:::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::::@@:::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::::@@:::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::::@@:::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::::@@:::::@@::::::::::::::@@        @@          ',
  '           @@:::::::::::::::@@:::::@@::::::::::::::@@        @@          '
)}

${fieldLines('', 'name', config.name, 'sumfetch-label')}
${fieldLines('', 'focus', 'Quantum computing · ML for science · Systems design', 'sumfetch-label')}
${fieldLines('', 'github', safeLink(config.social.github, `https://github.com/${config.social.github}/`), 'sumfetch-label')}
${fieldLines('', 'linkedin', safeLink(config.social.linkedin, `https://www.linkedin.com/in/${config.social.linkedin}/`, 'sumfetch-link--social'), 'sumfetch-label')}
${fieldLines('', 'email', safeLink(config.email, `mailto:${config.email}`, 'sumfetch-link--social'), 'sumfetch-label')}
${fieldLines('', 'location', 'College Park, MD', 'sumfetch-label')}

${aboutField('', 'about', [
  'Dual degree honors student in Computer Science & Physics at UMD.',
  'Exploring fault-tolerant quantum error correction and ML-driven research tooling.',
  'Leadership roles in Quantum Coalition, Undergraduate Quantum Association, and ACM@UMD.'
])}

${fieldLines('', 'education', [
  'University of Maryland — B.S. Computer Science (Honors)',
  'University of Maryland — B.S. Physics (Honors)',
  'GPA 3.974 | Expected Graduation May 2027'
])}

${fieldLines('', 'projects', [
  'Quantum State Tomography via QML — variational circuit reconstruction (arXiv:2507.01246)',
  'Club Automation Suite — end-to-end workflow tooling for university organizations',
  'Bright Beams Collective — ML optimizers for particle accelerator design'
])}

${fieldLines('', 'skills', [
  'Python · C/C++ · JavaScript/TypeScript · Rust (learning) · PyTorch · Qiskit · Cirq · PennyLane',
  'MPI · Numba · scikit-learn · Magma · SageMath · MAD-X · Elegant · Fusion 360 · Ansys Workbench'
])}

${fieldLines('', 'etc', [
  'Industry Chair — Quantum Coalition (QRISE & QC-FLIQ hackathons)',
  'President — Undergraduate Quantum Association',
  'Co-President — ACM@UMD'
])}
</pre>`;
};

export default summary;

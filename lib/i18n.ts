import type { Locale } from '@/lib/locale';

/** A string that exists in both languages. */
export type Bilingual = { en: string; zh: string };

export function tx(locale: Locale, en: string, zh: string): string {
  return locale === 'zh' ? zh : en;
}

export function pick(locale: Locale, value: Bilingual): string {
  return value[locale];
}

/**
 * Chrome copy shared across the site. Page-specific body text lives next to
 * the content it translates (profile, projects, …) so facts stay in one place.
 */
export const ui = {
  banner: {
    en: 'Portfolio is currently under construction — check back soon',
    zh: '个人主页建设中 — 敬请期待',
  },
  nav: {
    home: { en: 'Home', zh: '首页' },
    about: { en: 'About Me', zh: '关于我' },
    experience: { en: 'Experience', zh: '经历' },
    papers: { en: 'Papers', zh: '论文' },
  },
  hero: {
    goesBy: { en: 'goes by', zh: '常用名' },
    readPapers: { en: 'Read the papers', zh: '阅读论文' },
    cv: { en: 'CV', zh: '简历' },
    scholar: { en: 'Google Scholar', zh: 'Google Scholar' },
    email: { en: 'Email', zh: '邮箱' },
    portraitAlt: {
      en: 'Jiawei Zhang standing in front of green doors',
      zh: '张嘉炜站在绿色门前',
    },
  },
  affiliations: {
    title: { en: 'Studied and worked at', zh: '求学与工作于' },
  },
  research: {
    eyebrow: { en: 'Research', zh: '研究' },
    title: { en: 'What I work on', zh: '研究方向' },
  },
  publications: {
    eyebrow: { en: 'Publications', zh: '发表' },
    title: { en: 'Selected papers', zh: '精选论文' },
    all: { en: 'All papers', zh: '全部论文' },
    firstAuthor: { en: 'First author', zh: '第一作者' },
  },
  places: {
    alongTheWay: { en: 'Along the way', zh: '沿途' },
    places: { en: 'Places', zh: '地点' },
    campuses: { en: 'Campuses & cities', zh: '校园与城市' },
  },
  experience: {
    eyebrow: { en: 'Experience', zh: '经历' },
    title: { en: 'Experience', zh: '经历' },
    description: {
      en: 'Research first, then the professional roles and team projects that shaped how I work.',
      zh: '以研究经历为主，辅以塑造我工作方式的职业角色与团队项目。',
    },
    categories: {
      research: { en: 'Research', zh: '研究' },
      professional: { en: 'Professional', zh: '职业' },
      leadership: { en: 'Leadership & Ventures', zh: '领导力与创业' },
    },
    showHighlights: { en: 'Show', zh: '展开' },
    highlights: { en: 'Highlights', zh: '要点' },
    highlight: { en: 'highlight', zh: '条要点' },
    highlightsPlural: { en: 'highlights', zh: '条要点' },
  },
  papersPage: {
    eyebrow: { en: 'Papers', zh: '论文' },
    title: { en: 'Papers', zh: '论文' },
    description: (published: number, awards: number) => ({
      en: `A bookshelf of publications — ${published} published, ${awards} conference awards. Click a volume and its page slides open from the right.`,
      zh: `论文书架 — 已发表 ${published} 篇，会议奖项 ${awards} 项。点击书脊，右侧会滑出详情。`,
    }),
  },
  about: {
    eyebrow: { en: 'About', zh: '关于' },
    title: { en: 'About Me', zh: '关于我' },
    interests: { en: 'Research interests', zh: '研究兴趣' },
    experienceCta: { en: 'Research experience →', zh: '研究经历 →' },
    downloadCv: { en: 'Download CV ↓', zh: '下载简历 ↓' },
    background: { en: 'Background', zh: '背景' },
    education: { en: 'Education', zh: '教育经历' },
    recognition: { en: 'Recognition', zh: '荣誉' },
    honors: { en: 'Honors & awards', zh: '荣誉与奖项' },
    contact: { en: 'Contact', zh: '联系' },
    reachMe: { en: 'Reach me', zh: '联系我' },
    beyond: { en: 'Beyond research', zh: '研究之外' },
    offDesk: { en: 'Off the desk', zh: '书桌以外' },
    boxing: {
      en: 'Boxing is the part of my week that has nothing to do with slides, and it keeps the research honest.',
      zh: '拳击是我一周里与幻灯片无关的部分，也让研究保持诚实。',
    },
    interestsCta: { en: 'Interests · Boxing →', zh: '兴趣 · 拳击 →' },
    photoCredit: { en: 'Photo: Evgenia Eliseeva', zh: '摄影：Evgenia Eliseeva' },
  },
  footer: {
    email: { en: 'Email', zh: '邮箱' },
    scholar: { en: 'Google Scholar', zh: 'Google Scholar' },
    location: { en: 'Cambridge, MA', zh: '马萨诸塞州剑桥' },
  },
  command: {
    navigate: { en: 'Navigate', zh: '导航' },
    downloads: { en: 'Downloads', zh: '下载' },
    connect: { en: 'Connect', zh: '联系' },
    home: { en: 'Home', zh: '首页' },
    about: { en: 'About Me', zh: '关于我' },
    interests: { en: 'Interests · Boxing', zh: '兴趣 · 拳击' },
    experience: { en: 'Experience', zh: '经历' },
    papers: { en: 'Papers', zh: '论文' },
    graph: { en: 'Site map (full graph)', zh: '站点地图（完整图谱）' },
    cvEn: { en: 'Download CV — English', zh: '下载简历 — English' },
    cvZh: { en: '下载简历 — 中文', zh: '下载简历 — 中文' },
    email: { en: 'Email Jiawei', zh: '给嘉炜发邮件' },
  },
  language: {
    switchToZh: { en: 'Switch to Chinese', zh: '切换到中文' },
    switchToEn: { en: 'Switch to English', zh: '切换到英文' },
  },
} as const;

/**
 * Chinese copy for the site. English lives in the original content files;
 * when locale is `zh`, components overlay these strings by id / field.
 */

export const zhProfile = {
  location: '马萨诸塞州剑桥',
  interests: [
    '教育人工智能',
    '学习科学',
    '学习分析',
    '多模态人工智能',
    '人工智能评估',
  ],
  statement:
    '我研究如何让人工智能看见动手学习的过程，并把所见转化为学习者真正用得上的反馈。',
  intro:
    '我是哈佛大学教育学院 Learning Innovation and Technology Lab 的研究助理，与 Bertrand Schneider 教授合作。研究结合多模态学习分析与大语言模型工具：从创客空间中的姿态学习者画像，到每周为学生提供有理论依据反馈的 AI 助教。',
};

export const zhOrgs: Record<
  string,
  { name?: string; short?: string }
> = {
  'harvard-gse': {
    name: '哈佛大学教育学院',
    short: '哈佛教育学院',
  },
  hbs: {
    name: '哈佛商学院',
    short: '哈佛商学院',
  },
  'harvard-ilab': {
    name: '哈佛创新实验室',
    short: '哈佛 i-lab',
  },
  mit: {
    name: '麻省理工学院',
    short: 'MIT',
  },
  'mit-media-lab': {
    name: 'MIT 媒体实验室',
    short: '媒体实验室',
  },
  'tsinghua-sigs': {
    name: '清华大学深圳国际研究生院',
    short: '清华深圳国际研究生院',
  },
  ubc: {
    name: '不列颠哥伦比亚大学',
    short: 'UBC Sauder',
  },
  uoft: {
    name: '多伦多大学',
    short: '多伦多大学',
  },
  accenture: { name: '埃森哲', short: '埃森哲' },
  wyloo: { name: 'Wyloo Metals', short: 'Wyloo' },
  hirebeat: { name: 'HireBeat', short: 'HireBeat' },
  usingai: { name: 'UsingAI', short: 'UsingAI' },
  'google-hackathon': {
    name: 'Google Hackathon 2024',
    short: 'Google Hackathon',
  },
};

export const zhAffiliations: Record<
  string,
  { role: string; detail: string; cta: string; period?: string }
> = {
  'harvard-gse': {
    role: '教育硕士 · 学习设计、创新与技术\nLIT Lab · 研究助理',
    detail:
      '学习设计、创新与技术（LDIT）教育硕士；Learning Innovation and Technology Lab 研究助理。',
    cta: '研究经历',
    period: '2025 – 至今',
  },
  mit: {
    role: '媒体实验室 · AI Venture Studio\nSloan 管理学院',
    detail: '麻省理工学院（MIT）媒体实验室 AI Venture Studio 与 Sloan 管理学院。',
    cta: '教育经历',
    period: '2025 – 26',
  },
  hbs: {
    role: '商务拓展与研究分析师 · Foundry',
    detail: '在 Foundry 担任商务拓展与研究分析师，与 Tom Eisenmann 教授合作。',
    cta: '经历',
    period: '2026 – 至今',
  },
  'tsinghua-sigs': {
    role: '数据与信息学院 · 研究助理',
    detail:
      '在清华大学深圳国际研究生院数据与信息学院担任研究助理，从事时空多模态决策智能体与长视频推理研究。',
    cta: '研究经历',
  },
  ubc: {
    role: '商业分析硕士',
    detail: 'UBC Sauder 商学院商业分析硕士。',
    cta: '教育经历',
  },
  uoft: {
    role: '荣誉文学士 · 数字企业管理专项',
    detail: '荣誉文学士（优异成绩），数字企业管理专项。',
    cta: '教育经历',
  },
};

export const zhThreads: Record<
  string,
  { title: string; body: string; linkLabel: string }
> = {
  'learning-analytics': {
    title: '多模态学习分析',
    body: '动作与互动能揭示学习者状态的哪些信息？在创客空间课程中，我基于姿态数据构建学习者画像，并将其与自我效能感关联，使用聚类与有序网络分析（ONA），并以班杜拉理论为根基。',
    linkLabel: '第一作者论文，投稿 Computers & Education（审稿中）',
  },
  'ai-feedback': {
    title: '面向学习者的 AI 反馈',
    body: '我设计并原型化了基于大语言模型的 AI 助教与学习仪表盘，为哈佛一门创客空间课程的 22 名学生提供每周个性化反馈，形式包括书面信件、标注项目照片与成长曲线。',
    linkLabel: 'Learning Innovation and Technology Lab 研究经历',
  },
  'multimodal-ai': {
    title: '多模态与智能体 AI',
    body: '与清华深圳国际研究生院合作者一道，研究能对长视频推理、评估多模态面试的智能体；也在筹备关于生成式固化与会话级多样性的研究。',
    linkLabel: '两篇获奖论文与审稿中的稿件',
  },
};

export const zhHonors: Record<string, { title: string; detail: string }> = {
  'First Prize, AVI Grand Challenge': {
    title: 'AVI Grand Challenge 一等奖',
    detail: 'ACM Multimedia 2026',
  },
  'Best Paper Runner-Up Award': {
    title: '最佳论文亚军奖',
    detail: 'IEEE IVMSP 2026',
  },
  'Semi-finalist, Harvard President’s Innovation Challenge': {
    title: '哈佛校长创新挑战赛半决赛',
    detail: '团队负责人',
  },
  'Shortlisted, MIT Media Lab AI Venture Demo Day': {
    title: 'MIT 媒体实验室 AI Venture Demo Day 入围',
    detail: '团队负责人',
  },
  'Third Place, Google Hackathon': {
    title: 'Google Hackathon 季军',
    detail: '温哥华 · 团队负责人',
  },
  'High Distinction': {
    title: '优异成绩毕业',
    detail: '多伦多大学 · Dean’s List Scholar，2021–2023',
  },
};

export const zhSchools: Record<
  string,
  { school: string; degree: string; detail?: string; location: string; distinction?: string }
> = {
  harvard: {
    school: '哈佛大学教育学院',
    degree: '教育硕士 · 学习设计、创新与技术（LDIT）',
    detail: 'GPA 3.90 / 4.00 · 已毕业',
    location: '马萨诸塞州剑桥',
  },
  mit: {
    school: '麻省理工学院（MIT）',
    degree: '跨校注册于 MIT 媒体实验室 AI Venture Studio 与 Sloan 管理学院',
    detail: '已完成',
    location: '马萨诸塞州剑桥',
  },
  ubc: {
    school: 'UBC Sauder 商学院',
    degree: '商业分析硕士',
    detail: 'GPA 3.70 / 4.00 · 已毕业',
    location: '加拿大不列颠哥伦比亚省温哥华',
  },
  uoft: {
    school: '多伦多大学',
    degree: '荣誉文学士（优异成绩）· 数字企业管理专项',
    detail: 'GPA 3.74 / 4.00 · 已毕业',
    location: '加拿大安大略省多伦多',
    distinction: 'Dean’s List Scholar，2021–2023',
  },
};

export const zhPlaces: Record<string, { title: string; subtitle: string }> = {
  'harvard-gse': {
    title: '哈佛大学教育学院',
    subtitle: '马萨诸塞州剑桥',
  },
  mit: { title: 'MIT', subtitle: '马萨诸塞州剑桥' },
  'harvard-business-school': {
    title: '哈佛商学院',
    subtitle: 'Foundry · 马萨诸塞州波士顿',
  },
  'innovation-lab': {
    title: '哈佛创新实验室',
    subtitle: '校长创新挑战赛',
  },
  tsinghua: {
    title: '清华深圳国际研究生院',
    subtitle: '中国深圳',
  },
  vancouver: {
    title: '温哥华',
    subtitle: 'UBC Sauder 商学院',
  },
  toronto: {
    title: '多伦多',
    subtitle: '多伦多大学',
  },
};

type ZhProject = {
  title: string;
  unit?: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  stack?: string[];
  metric?: string;
  figures?: { caption: string }[];
  links?: { label: string }[];
};

export const zhProjects: Record<string, ZhProject> = {
  'hgse-lit': {
    title: '创客空间学习的多模态学习分析与 AI 助教',
    unit: 'Learning Innovation and Technology Lab',
    role: '研究助理',
    location: '马萨诸塞州剑桥',
    period: '2026年2月 – 至今',
    summary:
      '与 Bertrand Schneider 教授研究学生在创客空间课程中的学习过程，并将发现转化为个性化反馈的 AI 工具。',
    highlights: [
      '表明两类基于姿态的学习者画像对创客空间学生自我效能感的联合解释力强于任一画像单独作用，方法为聚类与有序网络分析，并以班杜拉理论为根基。',
      '主导与 Bertrand Schneider 教授合作的第一作者论文（投稿 Computers & Education，审稿中），回溯原始数据审核流水线，并在投稿前解决队列级数据不一致。',
      '端到端设计并原型化基于大语言模型的 AI 助教与学习仪表盘，为哈佛一门创客空间课程的 22 名学生提供每周个性化、有理论依据的反馈。',
      '结合学生反思与问卷，以及姿态与人际同步信号，以书面信件、标注项目照片、成长曲线等多种媒介交付反馈，并与授课教师每周迭代。',
    ],
    stack: ['多模态学习分析', '有序网络分析', '聚类', '大模型反馈', 'Python · R'],
    figures: [
      { caption: '基于姿态的学习者画像' },
      { caption: '各画像的周轨迹' },
    ],
    links: [{ label: '阅读论文' }, { label: 'LIT Lab' }],
  },
  'tsinghua-sigs': {
    title: '多模态决策智能体与长视频推理',
    role: '研究助理',
    location: '中国深圳',
    period: '2024年9月 – 2025年8月',
    summary:
      '研究时空多模态智能体，从面向老年人的出行系统到能对长视频推理的智能体。',
    highlights: [
      '为 “OldPilot” 系统开发优化算法，通过个性化路径规划与实时健康监测提升老年人出行安全。',
      '参与时空多模态决策智能体的设计与实现，在动态约束下优化路径安全与效率。',
      '主导现场测试与迭代改进，完善系统功能。',
      '与实验室合作者合著四篇论文，涵盖长视频推理（IEEE IVMSP 2026 最佳论文亚军）、多模态面试评估（ACM Multimedia 2026 Grand Challenge 一等奖）与分布式声学传感。',
    ],
    stack: ['多模态智能体', '视频推理', '优化', '现场测试'],
    figures: [
      { caption: 'ActiveVideoAgent · 最佳论文亚军' },
      { caption: 'AVI 评估 · 一等奖' },
    ],
    links: [
      { label: 'ActiveVideoAgent' },
      { label: 'AVI 评估' },
      { label: '清华深圳国际研究生院' },
    ],
  },
  yolov8: {
    title: '面向实时目标检测的改进 YOLOv8',
    role: 'AI 工程师',
    location: '中国深圳',
    period: '2024年8月 – 2025年3月',
    summary: '改进 YOLOv8 检测器以完成实时分纤端口检测，并协助从实验走向部署。',
    highlights: [
      '增强 YOLOv8 用于实时分纤端口检测，在高并发环境下达到 98.55% 准确率。',
      '与技术团队协作提升检测表现，评估模型输出、错误案例与面向用户的可靠性要求。',
      '支持轻量化模型设计与注意力机制实验，提升实时场景下的检测精度与处理速度。',
      '协调预处理、训练、微调与验证流程。',
    ],
    stack: ['计算机视觉', 'YOLOv8', 'PyTorch'],
    metric: '检测准确率 98.55%',
  },
  'hbs-foundry': {
    title: '创始人信号、评估研究与合作伙伴分析',
    unit: 'Foundry',
    role: '商务拓展与研究分析师',
    location: '马萨诸塞州波士顿',
    period: '2026 – 至今',
    summary: '为哈佛商学院 AI 原生创业平台从事研究分析与商务拓展。',
    highlights: [
      '与 Tom Eisenmann 教授合作，通过分析创始人与评估数据识别 Catalyst 项目中高潜力创始人的早期信号，包括 AI 与人类评审何时、为何产生分歧。',
      '将 Eisenmann 教授的创始人办公时间访谈整理为结构化画像（项目、创始人特质、缺口、导师匹配），供项目团队跟踪与支持。',
      '搭建面向高校项目的 B2B 合作漏斗与董事会仪表盘（阶段漏斗、转化指标、区域覆盖地图），并用 Office Scripts 与 Power Automate 实现每周自动更新。',
    ],
    stack: ['评估研究', '人机判断', '分析', '合作伙伴'],
    links: [{ label: 'Foundry' }],
  },
  wyloo: {
    title: '企业搜索的文档架构与会议自动化',
    role: '数据分析师（Co-op）',
    location: '加拿大安大略省多伦多',
    period: '2024年5月 – 2024年8月',
    summary: '负责聊天机器人与企业搜索项目的文档架构，并实现会议文档自动化。',
    highlights: [
      '以敏捷方式统筹聊天机器人与企业搜索的文档架构，交付 MVP 计划，并与跨职能团队在 Databricks 中解决数据质量问题。',
      '开发基于 Python 的会议文档自动化系统，提升运营效率约 50%，并为 AI 工具开发提供关键数据。',
    ],
    metric: '运营效率 +50%',
    links: [{ label: 'Wyloo' }],
  },
  hirebeat: {
    title: '人力资源分析与绩效评估工具',
    role: '商业与数据分析实习生',
    location: '纽约',
    period: '2023年7月 – 2023年11月',
    summary: '搭建敬业度与离职仪表盘，并上线评估与入职功能。',
    highlights: [
      '用 Power BI 搭建员工敬业度与离职仪表盘，识别趋势并支持定向留任策略，离职率下降 15%。',
      '通过 JIRA 敏捷冲刺交付绩效评估功能，并上线自评工具，将评估周期缩短 30%。',
      '实现数字化入职清单，入职时间缩短 25%。',
    ],
    metric: '离职 −15% · 评估周期 −30%',
    links: [{ label: 'HireBeat' }],
  },
  accenture: {
    title: '销售仪表盘与企业数据仓库',
    unit: '战略与咨询',
    role: '商业分析实习生',
    location: '中国上海',
    period: '2022年5月 – 2022年7月',
    summary: '搭建销售业绩仪表盘，并支持企业数据仓库设计。',
    highlights: [
      '用 SQL 与 Power BI 搭建销售业绩仪表盘，自动化数据汇总，手工处理时间减少 40%，加速各部门 BI 采用。',
      '支持企业数据仓库设计，与客户共同定义事实表与维度表，并实现 Type 1 / Type 2 缓慢变化维度。',
    ],
    metric: '手工处理 −40%',
  },
  'harvard-ilab': {
    title: '从问题界定到路演的 AI 驱动创新项目',
    unit: '校长创新挑战赛',
    role: '团队负责人',
    location: '马萨诸塞州剑桥',
    period: '2025年12月 – 至今',
    summary: '带领跨学科团队（财务专家到工程师）推进 AI 驱动创新项目。',
    highlights: [
      '组织团队界定问题范围、用户需求与创业定位。',
      '推动从问题界定、原型到路演打磨的端到端概念开发；入围半决赛。',
    ],
    stack: ['团队领导', '原型', '路演'],
    metric: '半决赛入围',
    links: [{ label: '哈佛创新实验室' }],
  },
  'mit-venture': {
    title: '从概念到公开演示的 AI 创业项目',
    unit: 'AI Venture Studio · Demo Day',
    role: '团队负责人',
    location: '马萨诸塞州剑桥',
    period: '2024年8月 – 2025年12月',
    summary: '带领 AI 创业项目从概念到演示，整合智能体系统设计、用户反馈与快速原型。',
    highlights: [
      '从同侪团队中入围公开 Demo Day 展示。',
      '打磨路演的技术叙事与产品策略。',
    ],
    stack: ['智能体系统', '原型', '用户研究'],
    metric: '入围',
    links: [{ label: 'MIT 媒体实验室' }],
  },
  'google-hackathon': {
    title: '基于 Google Cloud 的实时电商分析仪表盘',
    role: '团队负责人',
    location: '加拿大不列颠哥伦比亚省温哥华',
    period: '2023年1月 – 2024年3月',
    summary:
      '设计整合网站、客户、产品与物流数据的实时电商分析仪表盘，部署于 Google Cloud。',
    highlights: [
      '基于 BigQuery 构建，将复杂数据集简化为可行动洞察。',
      '将多源数据整合到统一数仓，提升跨平台分析能力。',
      '结合 Gmail、Google Analytics 与 Gemini，用 AI 做超个性化营销，并向技术与非技术干系人自动提供实时洞察。',
    ],
    metric: '季军',
  },
  'ubc-council': {
    title: '帮助 100+ 国际学生顺利过渡',
    unit: 'Sauder 学生会 · 商业分析硕士',
    role: '国际事务副主席',
    location: '加拿大不列颠哥伦比亚省温哥华',
    period: '2023年8月 – 2024年5月',
    summary: '代表并支持商业分析硕士项目中的国际学生。',
    highlights: [
      '通过文化适应研讨会支持 100+ 国际学生顺利过渡。',
      '协调大型文化活动与职业分享，促进社群参与与职业成长。',
      '在高压阶段通过海滩、徒步、拳击等活动缓解过载与冲突。',
    ],
    stack: ['社群', '活动策划', '同伴支持'],
  },
};

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export type Category = "products" | "skills" | "articles" | "about";
export type Tone = "blue" | "book" | "repo" | "writing";

export type PortfolioItem = {
  id: string;
  category: Category;
  title: string;
  meta: string;
  description: string;
  kicker: string;
  coverLines: string[];
  tone: Tone;
  repository?: string | null;
  sourceUrl?: string;
  sourceFile?: string;
  html?: string;
  intro?: string;
  sections?: Array<{ title: string; text: string }>;
};

const articleDefinitions = [
  {
    id: "dhu-quiz",
    file: "dhu-quiz.md",
    title: "DHU深度学习与应用实践课程作业与期末答题平台",
    meta: "项目实践 / 2025.12.28",
    description: "把课程复习整理成一个轻量的在线答题平台。",
    kicker: "PROJECT NOTES / 01",
    coverLines: ["课程复习，", "做成一个小工具。"],
    tone: "repo" as Tone,
    sourceUrl: "https://blog.csdn.net/m0_68389211/article/details/156361477",
  },
  {
    id: "java-concurrency",
    file: "java-concurrency.md",
    title: "synchronized 的使用和特性",
    meta: "Java 学习 / 2025.07.08",
    description: "从锁对象、可见性和可重入性开始，整理一次并发学习。",
    kicker: "JAVA NOTES / 02",
    coverLines: ["把并发，", "讲清楚一点。"],
    tone: "blue" as Tone,
    sourceUrl: "https://blog.csdn.net/m0_68389211/article/details/149194541",
  },
  {
    id: "ai-diagram",
    file: "ai-diagram.md",
    title: "用 AI 辅助画一张技术图",
    meta: "AI 与表达 / 2025.04.28",
    description: "把复杂的技术想法，整理成别人也能看懂的图。",
    kicker: "AI & EXPLANATION / 03",
    coverLines: ["让复杂的事，", "先有一张图。"],
    tone: "writing" as Tone,
    sourceUrl: "https://blog.csdn.net/m0_68389211/article/details/147596416",
  },
];

const productItems: PortfolioItem[] = [
  {
    id: "studymark",
    category: "products",
    title: "StudyMark",
    meta: "01 / 浏览器工具 · TypeScript",
    description: "在 Edge 侧栏记录学习内容的掌握程度，给复习留下一条清晰路线。",
    kicker: "A LIGHTWEIGHT LEARNING TOOL",
    coverLines: ["把学习，", "标记下来。"],
    tone: "repo",
    repository: "https://github.com/FangMoyu/StudyMark",
  },
  {
    id: "thunder-like",
    category: "products",
    title: "ThunderLike",
    meta: "02 / 高并发点赞系统 · Java",
    description: "围绕点赞业务，探索缓存、消息队列与热点数据处理。",
    kicker: "JAVA BACKEND / PROJECT",
    coverLines: ["把一次点赞，", "做得更稳。"],
    tone: "blue",
    repository: "https://github.com/FangMoyu/thunder-like",
  },
  {
    id: "prompt-toolbox",
    category: "products",
    title: "Prompt Toolbox",
    meta: "03 / 本地桌面工具 · Tauri",
    description: "把提示词保存、分类、填写变量并快速复制，数据留在本机，常用内容随时复用。",
    kicker: "LOCAL FIRST / PROMPT LIBRARY",
    coverLines: ["把提示词，", "收进工具箱。"],
    tone: "writing",
    repository: "https://github.com/FangMoyu/prompt-toolbox",
  },
];

const skillItems: PortfolioItem[] = [
  {
    id: "prepare-project-interview",
    category: "skills",
    title: "项目面试准备",
    meta: "01 / Fang Skill Forge · Python",
    description: "从源码证据出发，准备真实、可被追问的简历项目内容。",
    kicker: "FROM SOURCE TO STORY",
    coverLines: ["先看源码，", "再讲项目。"],
    tone: "writing",
    repository: "https://github.com/FangMoyu/fang-skill-forge/tree/main/skills/prepare-project-interview",
  },
  {
    id: "grilling-resume-projects",
    category: "skills",
    title: "简历项目模拟面试",
    meta: "02 / Fang Skill Forge · Python",
    description: "围绕简历项目逐题提问、评分和纠错，逐步加深追问。",
    kicker: "QUESTION BY QUESTION",
    coverLines: ["把回答，", "练得更清楚。"],
    tone: "book",
    repository: "https://github.com/FangMoyu/fang-skill-forge/tree/main/skills/grilling-resume-projects",
  },
  {
    id: "project-resume-kit",
    category: "skills",
    title: "项目简历与面试资料包",
    meta: "03 / Fang Skill Forge · Python",
    description: "从项目源码组织简历、业务流程图和完整的面试学习资料。",
    kicker: "PROJECT / RESUME / VISUAL",
    coverLines: ["让项目，", "变得可复习。"],
    tone: "repo",
    repository: "https://github.com/FangMoyu/fang-skill-forge/tree/main/skills/project-resume-visual-interview-kit",
  },
];

const aboutItems: PortfolioItem[] = [
  {
    id: "about-stardust",
    category: "about",
    title: "你好，我是星尘",
    meta: "01 / 关于我 · StarDust",
    description: "探索 Java 后端与 AI 应用，也认真对待每一杯咖啡。",
    kicker: "HELLO, NICE TO MEET YOU",
    coverLines: ["星尘。", "很高兴遇见你。"],
    tone: "blue",
    intro: "你好，我是星尘（StarDust），GitHub 账号是 FangMoyu，在 CSDN 上是“尽力不摆烂的阿方”。",
    sections: [
      { title: "我在做什么", text: "我的兴趣主要在 Java 后端与 AI 应用，也在尝试把学习和实践整理成可复用的工具与 Skill。" },
      { title: "这里会放什么", text: "做过的项目、整理过的方法、写下来的文章，以及那些值得留下来的小想法。" },
    ],
  },
  {
    id: "about-life",
    category: "about",
    title: "代码之外，也有生活",
    meta: "02 / 兴趣与日常",
    description: "喜欢的动画、随手记的文字，还有没有安排的周末。",
    kicker: "THE LITTLE THINGS IN LIFE",
    coverLines: ["写代码，", "也认真生活。"],
    tone: "book",
    intro: "有些兴趣很难放进一份正式介绍里，但它们往往更接近一个人的日常。",
    sections: [
      { title: "写点东西", text: "一个想法、一段观察，或者今天走过的路，都可以成为一则短短的记录。" },
      { title: "留一点空白", text: "把时间留给没有计划的散步，也给新鲜的念头留一点位置。" },
    ],
  },
];

function renderMarkdown(source: string) {
  const body = source.replace(/^# .*(?:\r?\n|$)/, "");
  const rendered = marked.parse(body, { async: false });
  return sanitizeHtml(rendered, {
    allowedTags: ["p", "br", "hr", "strong", "em", "del", "blockquote", "ul", "ol", "li", "pre", "code", "a", "h2", "h3", "h4", "table", "thead", "tbody", "tr", "th", "td"],
    allowedAttributes: { a: ["href", "title"], code: ["class"], ol: ["start"] },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

function readArticles(): PortfolioItem[] {
  const directory = path.join(process.cwd(), "content", "articles");
  return articleDefinitions.map((definition) => ({
    ...definition,
    category: "articles" as const,
    sourceFile: definition.file,
    html: renderMarkdown(fs.readFileSync(path.join(directory, definition.file), "utf8")),
  }));
}

export function getPortfolioItems(): PortfolioItem[] {
  return [...productItems, ...skillItems, ...readArticles(), ...aboutItems];
}


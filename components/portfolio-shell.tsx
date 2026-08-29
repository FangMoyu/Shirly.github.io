"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { Category, PortfolioItem } from "@/lib/content";

type PortfolioShellProps = { items: PortfolioItem[] };

const categories: Array<{ id: Category; label: string; number: string; heading: string; description: string }> = [
  { id: "products", label: "产品", number: "01", heading: "把想法，做成小作品。", description: "来自 GitHub 的项目与探索。" },
  { id: "skills", label: "Skills", number: "02", heading: "让好方法，可以重复使用。", description: "把长期学习整理成可复用的工具。" },
  { id: "articles", label: "文章", number: "03", heading: "把值得的事，慢慢写下来。", description: "三篇 Markdown 草稿，先从这里开始。" },
  { id: "about", label: "关于我", number: "04", heading: "你好，很高兴在这里遇见你。", description: "关于这个小站，也关于屏幕另一边的人。" },
];

function Cover({ item, detail = false }: { item: PortfolioItem; detail?: boolean }) {
  return (
    <span className={"cover cover-" + item.tone + (detail ? " cover-detail" : "")} aria-hidden="true">
      <span className="cover-kicker">{item.kicker}</span>
      <span className="cover-title">
        {item.coverLines.map((line, index) => (
          <span key={item.id + "-" + index}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </span>
      <span className="cover-rule" />
    </span>
  );
}

function ProductVisual({ item }: { item: PortfolioItem }) {
  if (item.id === "studymark") {
    return (
      <span className="mini-browser" aria-hidden="true">
        <span className="mini-toolbar"><span className="mini-dots">•••</span><span>StudyMark · learning notes</span></span>
        <Image className="mini-banner" src="/Shirly.github.io/hero-approved.jpg" alt="" width={600} height={250} sizes="285px" />
        <span className="mini-content">
          <span className="mini-heading">给学习，留一个复习标记。</span>
          <span className="mini-line" />
          <span className="mini-line mini-line-short" />
        </span>
      </span>
    );
  }
  if (item.id === "thunder-like") {
    return (
      <span className="memo" aria-hidden="true">
        <span className="memo-tape" />
        <span className="memo-label">A LITTLE NOTE / PROJECT</span>
        <span className="memo-title">一次点赞，<br />也要做得更稳。</span>
        <span className="memo-task">✓ 多级缓存与热点处理</span>
        <span className="memo-task">□ 继续验证真实性能</span>
      </span>
    );
  }
  return <Cover item={item} />;
}

function SkillVisual({ item }: { item: PortfolioItem }) {
  if (item.id === "prepare-project-interview") {
    return (
      <span className="skill-panel skill-panel-tree" aria-hidden="true">
        <span className="skill-panel-top"><span>SKILL / 01</span><span>source → story</span></span>
        <span className="skill-tree-row skill-tree-root"><i /> project</span>
        <span className="skill-tree-row"><i /> README.md <em>01</em></span>
        <span className="skill-tree-row"><i /> src / modules <em>02</em></span>
        <span className="skill-tree-row"><i /> evidence / links <em>03</em></span>
        <span className="skill-panel-foot"><span className="skill-dot" /> readable route</span>
      </span>
    );
  }
  if (item.id === "grilling-resume-projects") {
    return (
      <span className="skill-panel skill-panel-questions" aria-hidden="true">
        <span className="skill-panel-top"><span>INTERVIEW / 02</span><span>step by step</span></span>
        <span className="question-row"><b>01</b><span>项目做了什么？</span><i>✓</i></span>
        <span className="question-row"><b>02</b><span>为什么这样设计？</span><i>→</i></span>
        <span className="question-row muted"><b>03</b><span>再深入一点</span><i>□</i></span>
        <span className="question-track"><i /><i /><i /></span>
      </span>
    );
  }
  return (
    <span className="skill-panel skill-panel-flow" aria-hidden="true">
      <span className="skill-panel-top"><span>PROJECT KIT / 03</span><span>visual map</span></span>
      <span className="flow-node"><b>项目</b><small>source</small></span>
      <span className="flow-arrow">↓</span>
      <span className="flow-node"><b>简历</b><small>claim</small></span>
      <span className="flow-arrow">↓</span>
      <span className="flow-node"><b>面试</b><small>practice</small></span>
    </span>
  );
}

function ArticleVisual({ item }: { item: PortfolioItem }) {
  if (item.id === "dhu-quiz") {
    return (
      <span className="article-panel article-panel-window" aria-hidden="true">
        <span className="article-toolbar"><span>•••</span><span>article / 01</span></span>
        <span className="article-kicker">PROJECT NOTES</span>
        <span className="article-headline">把复习，<br />做成一条路线。</span>
        <span className="article-line" /><span className="article-line short" />
        <span className="article-progress"><i /></span>
        <span className="article-foot">Markdown / draft</span>
      </span>
    );
  }
  if (item.id === "java-concurrency") {
    return (
      <span className="article-panel article-panel-paper" aria-hidden="true">
        <span className="paper-tape" />
        <span className="article-kicker">JAVA NOTES / 02</span>
        <span className="paper-quote">先说清楚锁住谁，<br />再讨论它如何变快。</span>
        <span className="paper-rule" /><span className="paper-rule short" />
        <span className="paper-code">synchronized (this) { }</span>
      </span>
    );
  }
  return (
    <span className="article-panel article-panel-map" aria-hidden="true">
      <span className="article-kicker">AI &amp; EXPLANATION / 03</span>
      <span className="map-title">问题 → 结构 → 图</span>
      <span className="map-grid"><i /><i /><i /><i /><i /><i /></span>
      <span className="map-caption">让复杂的事，先有一张图。</span>
    </span>
  );
}

function AboutVisual({ item }: { item: PortfolioItem }) {
  if (item.id === "about-stardust") {
    return (
      <span className="about-panel about-panel-profile" aria-hidden="true">
        <span className="profile-mark">s.</span>
        <span className="profile-label">STARDUST / 01</span>
        <span className="profile-rule" /><span className="profile-rule short" />
        <span className="profile-tags"><i>JAVA</i><i>AI</i><i>COFFEE</i></span>
      </span>
    );
  }
  return (
    <span className="about-panel about-panel-life" aria-hidden="true">
      <span className="life-sun">✦</span>
      <span className="life-title">ordinary<br />days.</span>
      <span className="life-list"><span>read / 写点东西</span><span>watch / 看动画</span><span>walk / 留一点空白</span></span>
    </span>
  );
}

function CardVisual({ item, detail = false }: { item: PortfolioItem; detail?: boolean }) {
  if (item.category === "products") return <ProductVisual item={item} />;
  if (item.category === "skills") return <SkillVisual item={item} />;
  if (item.category === "articles") return <ArticleVisual item={item} />;
  return <AboutVisual item={item} />;
}

function Card({ item, onOpen }: { item: PortfolioItem; onOpen: (item: PortfolioItem, event: MouseEvent<HTMLButtonElement>) => void }) {
  const isExternal = item.category === "products" || item.category === "skills";
  const action = item.repository ? "前往 GitHub" : isExternal ? "GitHub · 地址待补充" : "阅读全文";
  const content = (
    <>
      <span className={"card-cover card-cover-" + item.id}>
        <CardVisual item={item} />
        <span className="card-index">{item.meta.slice(0, 2)}</span>
      </span>
      <span className="card-info">
        <span className="card-meta">{item.meta}</span>
        <strong className="card-title">{item.title}</strong>
        <span className="card-description">{item.description}</span>
        <span className="card-action">
          <span>{action}</span>
          {item.repository && <span className="card-arrow" aria-hidden="true">↗</span>}
        </span>
      </span>
    </>
  );

  if (item.repository) {
    return <a className="showcase-card" href={item.repository} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  if (isExternal) {
    return <button className="showcase-card showcase-card-pending" type="button" disabled>{content}</button>;
  }
  return <button className="showcase-card" type="button" onClick={(event) => onOpen(item, event)}>{content}</button>;
}

function AboutBody({ item }: { item: PortfolioItem }) {
  return (
    <div className="about-body">
      <p>{item.intro}</p>
      {item.sections?.map((section) => (
        <section key={section.title}>
          <h3>{section.title}</h3>
          <p>{section.text}</p>
        </section>
      ))}
    </div>
  );
}

export function PortfolioShell({ items }: PortfolioShellProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("products");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const currentCategory = categories.find((category) => category.id === activeCategory) ?? categories[0];
  const visibleItems = items.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (selectedItem) backButton.current?.focus();
  }, [selectedItem]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || !selectedItem) return;
      event.preventDefault();
      setSelectedItem(null);
      window.requestAnimationFrame(() => trigger.current?.focus());
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedItem]);

  function selectCategory(category: Category) {
    setActiveCategory(category);
    setSelectedItem(null);
    trigger.current = null;
  }

  function openDetails(item: PortfolioItem, event: MouseEvent<HTMLButtonElement>) {
    trigger.current = event.currentTarget;
    setSelectedItem(item);
  }

  function closeDetails() {
    setSelectedItem(null);
    window.requestAnimationFrame(() => trigger.current?.focus());
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">s.</span>
          <div>
            <div className="brand-name">星尘 · StarDust</div>
            <div className="brand-sub">A SMALL SLICE OF LIFE</div>
          </div>
        </div>
        <span className="header-note">探索 Java 后端与 AI 应用</span>
      </header>

      <figure className="hero">
        <Image className="hero-art" src="/Shirly.github.io/hero-approved.jpg" alt="海边列车窗边的夏日阅读场景" width={1774} height={887} loading="eager" sizes="100vw" />
        <div className="hero-copy">
          <div className="hero-label">STARDUST&apos;S SUMMER DIARY</div>
          <h1>把平凡的日子，<br />过成<span>喜欢的番。</span></h1>
          <p>一些代码，一些想法，<br />和那些闪闪发光的小日常。</p>
        </div>
        <figcaption className="hero-caption">夏の記録 / SCENE 01</figcaption>
      </figure>

      <nav className="category-banner" aria-label="内容分类">
        <div className="category-nav">
          {categories.map((category) => (
            <button key={category.id} type="button" aria-pressed={activeCategory === category.id} onClick={() => selectCategory(category.id)}>
              <span>{category.label}</span><small>{category.number}</small>
            </button>
          ))}
        </div>
      </nav>

      <main className="content" id="main-content">
        {!selectedItem ? (
          <section className="list-view" aria-label={currentCategory.label + "卡片"}>
            <div className="section-header">
              <div><h2>{currentCategory.heading}</h2><p>{currentCategory.description}</p></div>
              <span className="section-index">{String(visibleItems.length).padStart(2, "0")} / {currentCategory.label.toUpperCase()}</span>
            </div>
            <div className="card-list">
              {visibleItems.map((item) => <Card key={item.id} item={item} onOpen={openDetails} />)}
            </div>
          </section>
        ) : (
          <section className="detail" aria-labelledby="detail-title">
            <button ref={backButton} className="back-button" type="button" onClick={closeDetails}>← 返回{currentCategory.label}</button>
            <div className="detail-layout">
              <div className="detail-cover"><CardVisual item={selectedItem} detail /></div>
              <div className="detail-heading"><div className="detail-meta">{selectedItem.meta}</div><h2 id="detail-title">{selectedItem.title}</h2><p>{selectedItem.description}</p></div>
            </div>
            {selectedItem.category === "articles" && selectedItem.html ? (
              <article className="markdown-body" dangerouslySetInnerHTML={{ __html: selectedItem.html }} />
            ) : <AboutBody item={selectedItem} />}
            {selectedItem.sourceUrl && <a className="source-link" href={selectedItem.sourceUrl} target="_blank" rel="noopener noreferrer">查看原始文章 ↗</a>}
            {selectedItem.sourceFile && <div className="source-file">Markdown / {selectedItem.sourceFile}</div>}
          </section>
        )}
      </main>

      <footer className="site-footer"><span>© 2026 StarDust · 设计与内容持续整理中</span><span>下次见，也要是个好天气。</span></footer>
      <p className="sr-only" role="status" aria-live="polite">正在浏览：{selectedItem ? selectedItem.title : currentCategory.label}</p>
    </div>
  );
}


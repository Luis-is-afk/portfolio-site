'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Mail, MapPin, Menu, X } from 'lucide-react'
import type { CSSProperties } from 'react'

type Project = {
  number: string
  category: 'Analytics' | 'Engineering'
  title: string
  description: string
  tags: string[]
  href: string
  visual: 'bikes' | 'health' | 'compiler'
  note: string
}

const projects: Project[] = [
  {
    number: '01', category: 'Analytics', title: 'Cyclistic, decoded.',
    description: '6.1 million rides reveal two very different cities: one commuting, one exploring. A reproducible R workflow turns that contrast into a conversion strategy.',
    tags: ['R', 'tidyverse', 'Data storytelling'], href: 'https://github.com/Luis-is-afk/cyclistic-bike-share-analysis', visual: 'bikes', note: '6.1M trips · 81% seasonal casual rides',
  },
  {
    number: '02', category: 'Analytics', title: 'The signal behind the grades.',
    description: 'A weighted analysis of 13,000+ CDC survey responses, exploring how academic performance is associated with youth mental-health outcomes.',
    tags: ['Python', 'statsmodels', 'Public health'], href: 'https://github.com/Luis-is-afk/YRBSS-Case-Study', visual: 'health', note: '13K+ respondents · 2023 YRBSS',
  },
  {
    number: '03', category: 'Engineering', title: 'A compiler, from the ground up.',
    description: 'A Pascal-subset compiler built with a hand-written scanner, recursive-descent parser, symbol table, and x86 assembly generation.',
    tags: ['C++', 'Parsing', 'x86 Assembly'], href: 'https://github.com/NightlyPenguin/PascalliteCompiler', visual: 'compiler', note: 'Scanner → parser → assembly',
  },
]

const filters = ['All work', 'Analytics', 'Engineering'] as const

type ProjectFilter = (typeof filters)[number]

function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'bikes') {
    return <div className="project-visual bike-visual" aria-label="Abstract visualization of bike-share ride patterns">
      <div className="visual-caption"><span>RIDES / MONTH</span><span>2023—24</span></div>
      <div className="bar-chart" aria-hidden="true">{[32, 44, 39, 56, 62, 51, 69, 78, 72, 91, 84, 100].map((height, index) => <i key={index} style={{ height: `${height}%`, '--i': index } as CSSProperties} />)}</div>
      <div className="chart-legend"><span><i className="legend-dot orange" />MEMBERS</span><span><i className="legend-dot lilac" />CASUAL</span></div>
      <div className="visual-watermark">6.1<span>M</span></div>
    </div>
  }
  if (type === 'health') {
    return <div className="project-visual health-visual" aria-label="Abstract risk signal visualization">
      <div className="visual-caption"><span>OUTCOME SIGNALS</span><span>YRBSS / 2023</span></div>
      <div className="signal-grid" aria-hidden="true"><div className="signal-axis"><span>10×</span><span>5×</span><span>1×</span></div><div className="signal-lines"><i /><i /><i /><i /><b className="signal-point point-one" /><b className="signal-point point-two" /><b className="signal-point point-three" /></div></div>
      <div className="signal-labels"><span>GRADE D</span><span>GRADE C</span><span>GRADE B</span><span>GRADE A</span></div>
      <div className="visual-watermark">13<span>K</span></div>
    </div>
  }
  return <div className="project-visual compiler-visual" aria-label="Code-inspired illustration of a compiler">
    <div className="code-window"><div className="window-top"><span /><span /><span /><small>pascalite.pas</small></div><pre><span className="code-purple">program</span> hello_world;{'\n'}<span className="code-purple">var</span>{'    '}message: <span className="code-yellow">string</span>;{'\n'}<span className="code-purple">begin</span>{'\n'}{'    '}message := <span className="code-green">&quot;hello, world&quot;</span>;{'\n'}{'    '}writeln(message);{'\n'}<span className="code-purple">end</span>.<span className="cursor">▍</span></pre></div>
    <div className="compiler-stamp">SOURCE<br /><span>→</span> MACHINE</div>
  </div>
}

function ProjectCard({ project }: { project: Project }) {
  return <article className={`project-card project-${project.visual}`}>
    <a className="project-card-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
      <ProjectVisual type={project.visual} />
      <div className="project-copy">
        <div className="project-meta"><span>{project.number} / {project.category}</span><span className="project-open"><ArrowUpRight size={17} /></span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-note">{project.note}</div>
      </div>
    </a>
  </article>
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<ProjectFilter>('All work')
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleProjects = useMemo(() => filter === 'All work' ? projects : projects.filter(project => project.category === filter), [filter])

  return <main>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Luis Arreola, home"><span className="wordmark-mark">LA<span>.</span></span><span className="wordmark-label">PORTFOLIO / 2026</span></a>
      <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <a className="header-availability" href="mailto:luisarre720@gmail.com"><span className="availability-dot" /> OPEN TO WHAT&apos;S NEXT</a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-rule" /> DATA-DRIVEN. PEOPLE-FOCUSED. CURIOUS BY DEFAULT.</div>
        <h1>I find the<br />story in the <span className="hero-italic">signals.</span></h1>
        <div className="hero-bottom">
          <p className="hero-intro">I&apos;m <strong>Luis Arreola</strong> — a computer science grad turning complex data into clear decisions, and ideas into things that work.</p>
          <a className="round-link" href="#work" aria-label="Explore selected work"><ArrowDown size={20} /></a>
        </div>
        <div className="hero-details"><span><MapPin size={14} /> DENVER, COLORADO</span><span>CS · DATA ANALYTICS · SYSTEMS</span></div>
      </div>
      <div className="hero-art" aria-label="Decorative animated data visualization">
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-orbit orbit-three" />
        <div className="art-cross cross-one" /><div className="art-cross cross-two" />
        <div className="art-center"><span>LA</span><i /></div>
        <div className="art-label art-label-top">ANALYZE / <b>01</b></div><div className="art-label art-label-side">THINK IN SYSTEMS</div><div className="art-coordinate">39°44&apos; N<br />104°59&apos; W</div>
        <div className="art-spark spark-one" /><div className="art-spark spark-two" /><div className="art-spark spark-three" />
      </div>
      <div className="hero-index"><span>SCROLL TO EXPLORE</span><span>01 — 04</span></div>
    </section>

    <section className="work-section" id="work">
      <div className="section-heading"><div><span className="section-kicker">A FEW THINGS I&apos;VE MADE</span><h2>Selected <span>work.</span></h2></div><p>Research, analysis, and engineering—built to make the complicated a little more clear.</p></div>
      <div className="work-toolbar"><div className="filter-tabs" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} type="button" className={filter === item ? 'filter-button active' : 'filter-button'} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><span className="project-count">0{visibleProjects.length} PROJECTS / 2024—26</span></div>
      <div className="projects-grid">{visibleProjects.map(project => <ProjectCard key={project.number} project={project} />)}</div>
      <a className="all-work-link" href="https://github.com/Luis-is-afk?tab=repositories" target="_blank" rel="noreferrer">MORE ON GITHUB <ArrowUpRight size={16} /></a>
    </section>

    <section className="about-section" id="about">
      <div className="about-top"><span className="section-kicker">A LITTLE CONTEXT</span><span className="about-index">DENVER, CO / EST. CURIOUS</span></div>
      <div className="about-layout"><h2>Curiosity is<br />a <span>technical skill.</span></h2><div className="about-copy"><p>I like the space between asking a good question and building something that answers it. That means cleaning six million rows, tracing a parser bug, or figuring out what a pattern actually means for people.</p><p>My foundation is computer science; my focus is data analytics. I&apos;m heading into an M.S. in Computer Information Systems at Colorado State, and looking for work where thoughtful analysis meets useful technology.</p><a className="text-link" href="https://github.com/Luis-is-afk" target="_blank" rel="noreferrer">A CLOSER LOOK AT MY GITHUB <ArrowUpRight size={15} /></a></div></div>
      <div className="skills-strip"><span>TOOLS I REACH FOR</span><div><b>Python</b><i /> <b>R</b><i /> <b>SQL</b><i /> <b>C++</b><i /> <b>Tableau</b><i /> <b>Linux</b><i /> <b>Raspberry Pi</b></div></div>
      <div className="education-row"><div><span className="section-kicker">THE LEARNING CONTINUES</span><h3>Computer Science <span>→</span> Information Systems</h3></div><div className="education-school"><b>Angelo State University</b><span>B.S. Computer Science</span></div><div className="education-school"><b>Colorado State University</b><span>M.S. Computer Information Systems · Spring 2027</span></div></div>
    </section>

    <footer className="contact-section" id="contact">
      <div className="contact-top"><span className="section-kicker">HAVE A GOOD QUESTION?</span><span className="about-index">THE INBOX IS OPEN</span></div>
      <div className="contact-layout"><h2>Let&apos;s make<br />something <span>matter.</span></h2><a className="contact-circle" href="mailto:luisarre720@gmail.com" aria-label="Email Luis Arreola"><ArrowUpRight size={30} /></a></div>
      <div className="footer-bottom"><a className="footer-email" href="mailto:luisarre720@gmail.com"><Mail size={15} /> LUISARRE720@GMAIL.COM</a><div className="social-links"><a href="https://github.com/Luis-is-afk" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a><a href="https://www.linkedin.com/in/luis-arreola-593644210" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a></div><span>MADE WITH INTENTION · © 2026</span></div>
      <a className="back-top" href="#top">BACK TO TOP <ArrowDownRight size={14} /></a>
    </footer>
  </main>
}

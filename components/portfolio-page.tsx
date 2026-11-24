'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Mail, MapPin, Menu, X } from 'lucide-react'
import type { CSSProperties } from 'react'

type Project = {
  number: string
  category: 'Analytics' | 'Engineering'
  title: string
  description: string
  tags: string[]
  href: string
  image: string
  imageAlt: string
  world: string
  note: string
}

const projects: Project[] = [
  {
    number: '01', category: 'Analytics', title: 'Cyclistic, decoded.',
    description: '6.1 million rides reveal two very different cities: one commuting, one exploring. A reproducible R workflow turns that contrast into a conversion strategy.',
    tags: ['R', 'tidyverse', 'Data storytelling'], href: 'https://github.com/Luis-is-afk/cyclistic-bike-share-analysis', image: '/images/planet-cycling.png', imageAlt: 'A miniature lakeside city planet with bike paths winding around its surface', world: 'The City of Two Rhythms', note: '6.1M trips · 81% seasonal casual rides',
  },
  {
    number: '02', category: 'Analytics', title: 'The signal behind the grades.',
    description: 'A weighted analysis of 13,000+ CDC survey responses, exploring how academic performance is associated with youth mental-health outcomes.',
    tags: ['Python', 'statsmodels', 'Public health'], href: 'https://github.com/Luis-is-afk/YRBSS-Case-Study', image: '/images/planet-research.png', imageAlt: 'A forested university planet traced with public-health data constellations', world: 'The Observatory of Signals', note: '13K+ respondents · 2023 YRBSS',
  },
  {
    number: '03', category: 'Engineering', title: 'A compiler, from the ground up.',
    description: 'A Pascal-subset compiler built with a hand-written scanner, recursive-descent parser, symbol table, and x86 assembly generation.',
    tags: ['C++', 'Parsing', 'x86 Assembly'], href: 'https://github.com/NightlyPenguin/PascalliteCompiler', image: '/images/planet-compiler.png', imageAlt: 'A mechanical planet of orbital circuits, code, and compiler machinery', world: 'The Machine World', note: 'Scanner → parser → assembly',
  },
]

function ProjectExplorer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]
  const previousProject = projects[(activeIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(activeIndex + 1) % projects.length]

  return <div className="planet-explorer">
    <div className="planet-stage" role="group" aria-label={`Project planet ${activeIndex + 1} of ${projects.length}`}>
      <div className="planet-starfield" aria-hidden="true" />
      <span className="planet-coordinate planet-coordinate-top">SECTOR {activeProject.number} / {activeProject.category.toUpperCase()}</span>
      <span className="planet-coordinate planet-coordinate-bottom">{activeProject.world}</span>
      <div className="planet-orbit" aria-hidden="true" />
      <div className="planet-globe" key={activeProject.number}>
        <Image src={activeProject.image} alt={activeProject.imageAlt} width={1024} height={1024} sizes="(max-width: 650px) 68vw, 360px" priority={activeIndex === 0} className="planet-image" />
        <span className="planet-atmosphere" aria-hidden="true" />
      </div>
      <button className="planet-arrow planet-arrow-previous" type="button" aria-label={`Previous project: ${previousProject.title}`} onClick={() => setActiveIndex((current) => (current - 1 + projects.length) % projects.length)}>
        <ArrowLeft size={20} />
      </button>
      <button className="planet-arrow planet-arrow-next" type="button" aria-label={`Next project: ${nextProject.title}`} onClick={() => setActiveIndex((current) => (current + 1) % projects.length)}>
        <ArrowRight size={20} />
      </button>
    </div>

    <article className="planet-description" aria-live="polite" aria-atomic="true">
      <div className="planet-description-meta"><span>{activeProject.number} / {activeProject.category}</span><span>{String(activeIndex + 1).padStart(2, '0')} — {String(projects.length).padStart(2, '0')} WORLDS</span></div>
      <h3>{activeProject.title}</h3>
      <p>{activeProject.description}</p>
      <div className="planet-tags">{activeProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="planet-description-footer"><span>{activeProject.note}</span><a href={activeProject.href} target="_blank" rel="noreferrer">EXPLORE PROJECT <ArrowUpRight size={15} /></a></div>
    </article>

    <div className="planet-pager" role="group" aria-label="Choose a project planet">
      {projects.map((project, index) => <button key={project.number} type="button" className={index === activeIndex ? 'planet-pager-dot active' : 'planet-pager-dot'} aria-label={`View ${project.title}`} aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)} />)}
    </div>
  </div>
}

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false)

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
      <div className="section-heading"><div><span className="section-kicker">FLYING THROUGH THE PROJECTS</span><h2>Project <span>worlds.</span></h2></div><p>Every project is its own world. Pick a direction and see where the work takes you.</p></div>
      <ProjectExplorer />
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

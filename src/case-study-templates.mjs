// Rendering for the two scroll-narrative case-study pages and the compact
// cross-link block on /projects/. Shared primitives (layout, breadcrumbs,
// finalCta, icons) are imported read-only from templates.mjs; all
// case-study-specific styling lives in src/case-studies.css (cs-* classes),
// which the build appends to the emitted stylesheet.
//
// Layout behavior: mobile-first stacked flow (full-bleed frames, caption
// chips, numbered protocol band). From 1020px up, chapters 01 and 04 become
// a two-column layout whose media rail is position: sticky, so the frame
// holds while the narrative column scrolls and swaps at chapter boundaries.
// Pure CSS — no scroll-jacking, no JS dependency; reveal motion comes from
// the generic class hooks main.js already wires (.project-chapter__header,
// .section-heading).

import { processSteps } from "./data.mjs";
import { breadcrumbs, finalCta, icon, layout } from "./templates.mjs";
import { caseStudies } from "./case-studies.mjs";

const FIGURE_SIZES =
  "(max-width: 800px) calc(100vw - 32px), (max-width: 1019px) calc(100vw - 48px), 46vw";

const csFigure = (
  { src, srcset, width, height, alt, chip, title },
  { sizes = FIGURE_SIZES, className = "" } = {}
) => `
  <figure class="cs-frame${className ? ` ${className}` : ""}">
    <div class="cs-frame__media">
      <img src="${src}"${srcset ? ` srcset="${srcset}" sizes="${sizes}"` : ""} alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async">
    </div>
    <figcaption>
      <span class="cs-chip">${chip}</span>
      ${title ? `<h3>${title}</h3>` : ""}
    </figcaption>
  </figure>`;

const chapterHeader = ({ number, eyebrow, heading, headingId, intro = "" }) => `
  <header class="project-chapter__header cs-chapter__header">
    <span aria-hidden="true">${number}</span>
    <div>
      <p class="eyebrow">${eyebrow}</p>
      <h2 id="${headingId}">${heading}</h2>
      ${intro ? `<p>${intro}</p>` : ""}
    </div>
  </header>`;

const protocolBand = (study) => `
  <section class="cs-protocol pattern" id="protocol" aria-labelledby="protocol-title">
    <div class="shell">
      ${chapterHeader({
        number: "02",
        eyebrow: "The protocol",
        heading: "From first look to final walkthrough.",
        headingId: "protocol-title",
        intro: study.protocol.intro
      })}
      <ol class="cs-protocol__steps">
        ${processSteps
          .map(
            (step) => `
          <li>
            <span aria-hidden="true">${step.number}</span>
            <div>
              <strong>${step.title}</strong>
              <p>${step.text}</p>
            </div>
          </li>`
          )
          .join("")}
      </ol>
    </div>
  </section>`;

const caseStudyBody = (study) => `
  <section class="cs-hero">
    <picture class="cs-hero__picture">
      ${
        study.hero.mobileSrc
          ? `<source media="(max-width: 640px)" srcset="${study.hero.mobileSrc}">`
          : ""
      }
      <img class="cs-hero__image" src="${study.hero.src}" srcset="${study.hero.srcset}" sizes="100vw" alt="${study.hero.alt}" width="${study.hero.width}" height="${study.hero.height}" fetchpriority="high" decoding="async">
    </picture>
    <div class="cs-hero__scrim"></div>
    <p class="cs-hero__media-chip">${study.hero.chip}</p>
    <div class="shell cs-hero__inner">
      ${breadcrumbs([
        { label: "Projects", href: "/projects/" },
        { label: study.breadcrumbLabel, href: "#" }
      ])}
      <div class="cs-hero__copy">
        <p class="eyebrow">${study.eyebrow}</p>
        <h1>${study.titleHtml}</h1>
        <p class="cs-hero__summary">${study.summary}</p>
        <ul class="cs-chips" aria-label="Project record details">
          ${study.chips
            .map(
              (chip) => `<li><span>${chip.label}</span><strong>${chip.value}</strong></li>`
            )
            .join("")}
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--cream cs-chapter" id="condition" aria-labelledby="condition-title">
    <div class="shell">
      ${chapterHeader({
        number: "01",
        eyebrow: "The condition",
        heading: study.condition.heading,
        headingId: "condition-title"
      })}
      <div class="cs-chapter__grid">
        <div class="cs-chapter__rail">
          ${csFigure(study.condition.frame)}
        </div>
        <div class="cs-chapter__narrative">
          ${study.condition.paragraphs.map((text) => `<p>${text}</p>`).join("")}
        </div>
      </div>
    </div>
  </section>

  ${protocolBand(study)}

  <section class="section cs-chapter" id="documentation" aria-labelledby="documentation-title">
    <div class="shell">
      ${chapterHeader({
        number: "03",
        eyebrow: "The documentation",
        heading: study.documentation.heading,
        headingId: "documentation-title"
      })}
      <div class="cs-doc__intro">
        ${study.documentation.paragraphs.map((text) => `<p>${text}</p>`).join("")}
      </div>
      <div class="cs-doc__pair">
        ${study.documentation.frames
          .map((frame) => csFigure(frame, { sizes: FIGURE_SIZES }))
          .join("")}
      </div>
      <p class="cs-doc__note">${icon("shield")}<span>${study.documentation.note}</span></p>
    </div>
  </section>

  <section class="section cs-chapter cs-chapter--dark" id="outcome" aria-labelledby="outcome-title">
    <div class="shell">
      ${chapterHeader({
        number: "04",
        eyebrow: "The verified outcome",
        heading: study.outcome.heading,
        headingId: "outcome-title"
      })}
      <div class="cs-chapter__grid">
        <div class="cs-chapter__rail">
          ${csFigure(study.outcome.frame)}
        </div>
        <div class="cs-chapter__narrative">
          ${study.outcome.paragraphs.map((text) => `<p>${text}</p>`).join("")}
          <aside class="cs-panel" aria-labelledby="outcome-panel-title">
            <p class="eyebrow">${study.outcome.panel.eyebrow}</p>
            <h3 id="outcome-panel-title">${study.outcome.panel.heading}</h3>
            <ul>
              ${study.outcome.panel.items
                .map(
                  (item) => `<li><span>${item.label}</span><strong>${item.value}</strong></li>`
                )
                .join("")}
            </ul>
            <p class="cs-panel__note">${study.outcome.panel.note}</p>
          </aside>
        </div>
      </div>
    </div>
  </section>
  ${finalCta(study.cta)}`;

export const caseStudyPages = caseStudies.map((study) => ({
  path: `/projects/${study.slug}/`,
  html: layout({
    title: study.pageTitle,
    description: study.description,
    path: `/projects/${study.slug}/`,
    pageType: "case-study",
    socialImage: study.socialImage,
    socialImageAlt: study.socialImageAlt,
    socialImageWidth: study.socialImageWidth,
    socialImageHeight: study.socialImageHeight,
    body: caseStudyBody(study)
  })
}));

const crossLinkTitles = {
  "tudor-exterior-transformation": "Tudor Residence Exterior",
  "commercial-flat-roof": "Commercial Flat Roof"
};

export const caseStudyCrossLinks = () => `
  <section class="section cs-crosslink" aria-label="Project case studies">
    <div class="shell">
      <div class="section-heading">
        <p class="eyebrow">Case studies</p>
        <h2>Two records, frame by frame.</h2>
        <p class="section-heading__intro">Scroll a project from first frame to verified record — documentation first, presentation second.</p>
      </div>
      <div class="cs-crosslink__grid">
        ${caseStudies
          .map(
            (study, index) => `
          <a href="/projects/${study.slug}/" data-event="project_gallery_click" data-position="projects_case_studies">
            <span class="cs-crosslink__number">0${index + 1}</span>
            <p class="eyebrow">${study.eyebrow}</p>
            <h3>${crossLinkTitles[study.slug]}</h3>
            <p class="cs-crosslink__dek">${study.summary}</p>
            <span class="cs-crosslink__action">Read the case study ${icon("arrow")}</span>
          </a>`
          )
          .join("")}
      </div>
    </div>
  </section>`;

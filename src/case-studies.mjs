// Case-study content for the two scroll-narrative project pages.
//
// Sourcing rules (docs/image-provenance-register.md governs):
// - Every image is existing client-archive material already recorded in the
//   provenance register or already published on /projects/.
// - Every factual statement traces to the register, the claims registry, or
//   copy already published on the site. Where the archive cannot support a
//   fact (dates, addresses, before-frames, homeowner words), the copy stays
//   scope-honest instead of inventing one.
// - The Tudor yard-restored/landscape-finished variants (v5/v6) are a digital
//   retouch series (see scripts/composite-project-hero-yard.mjs and the
//   register's editorial-v3 selection notes). They are therefore EXCLUDED
//   from this documentary record: no before/after lawn claim is made
//   anywhere on these pages. The Tudor study is framed as a single-frame
//   record — "condition documented, treatments labeled" — not a comparison.

export const caseStudies = [
  {
    slug: "tudor-exterior-transformation",
    pageTitle: "Tudor Residence Exterior Case Study",
    description:
      "Scroll the Tudor residence exterior case study: one unretouched archive frame, the published five-step field protocol, and a fully labeled presentation grade.",
    eyebrow: "Case study · Residential exterior",
    titleHtml: "The Tudor<br><span>Residence.</span>",
    breadcrumbLabel: "Tudor Residence Exterior",
    summary:
      "A Tudor-inspired exterior preserved in one unretouched archive frame — presented at full scale, with every treatment on the record.",
    chips: [
      { label: "Class", value: "Residential exterior" },
      { label: "Record", value: "Client project archive" },
      { label: "Frames", value: "Unretouched original" }
    ],
    socialImage: "/assets/projects/project-tudor-residence-exterior-1280.jpg",
    socialImageAlt:
      "Front elevation of a large Tudor-style residence with dark roof planes, black-and-white half-timbered gables, copper bay-window roofs, and a round stone turret",
    socialImageWidth: 1280,
    socialImageHeight: 720,
    hero: {
      src: "/assets/editorial-v3/gutters-exteriors-tudor-exterior-1280.webp",
      srcset:
        "/assets/editorial-v3/gutters-exteriors-tudor-exterior-640.webp 640w, /assets/editorial-v3/gutters-exteriors-tudor-exterior-1280.webp 1280w",
      mobileSrc:
        "/assets/editorial-v3/gutters-exteriors-tudor-exterior-mobile-800x1000.webp",
      width: 1280,
      height: 720,
      alt: "Exterior of a large Tudor-style residence with dark roof planes, black-and-white half-timbered gables, copper bay-window roofs, and a round stone turret",
      chip: "Completed project"
    },
    condition: {
      heading: "The record begins with one frame.",
      paragraphs: [
        "Straight on from the front walk: dark roof planes step down from the main gable to a conical turret roof, black-and-white half-timbering frames the upper walls, and copper bay-window roofs sit over dark brick. Stone lions flank the lawn. This is the untouched original exterior frame in the project archive.",
        "The archive holds no earlier view of this elevation, so this page makes a narrower promise than a dramatic before-and-after: document exactly what the camera recorded, and label every treatment applied to it since."
      ],
      frame: {
        src: "/assets/projects/project-tudor-residence-exterior-1280.jpg",
        srcset:
          "/assets/projects/project-tudor-residence-exterior-640.jpg 640w, /assets/projects/project-tudor-residence-exterior-1280.jpg 1280w",
        width: 1280,
        height: 720,
        alt: "Front elevation of a large Tudor-style residence with dark roof planes, black-and-white half-timbered gables, copper bay-window roofs, a round stone turret, and stone lion statues on the front lawn",
        chip: "Archive frame · Unretouched",
        title: "Tudor Residence Exterior"
      }
    },
    protocol: {
      intro:
        "The steps below are quoted from the published Raccoon Restoration process page. A case study should be held to the protocol — not to a prettier version of it."
    },
    documentation: {
      heading: "Record and presentation, side by side.",
      paragraphs: [
        "The first frame is the record: unretouched, no labels, no upscaling. The second is the presentation cut used across the site's service imagery — a deterministic color grade and crop, with the content unchanged.",
        "For this documentary record, the only differences permitted between the two are tone and crop. The content stays as shot."
      ],
      note: "The grade uses identical constants across the site's service imagery and is logged, frame by frame, in the project's image provenance register.",
      frames: [
        {
          src: "/assets/projects/project-tudor-residence-exterior-1280.jpg",
          srcset:
            "/assets/projects/project-tudor-residence-exterior-640.jpg 640w, /assets/projects/project-tudor-residence-exterior-1280.jpg 1280w",
          width: 1280,
          height: 720,
          alt: "Unretouched archive frame of the Tudor-style residence exterior with dark roof planes, half-timbered gables, and a round stone turret",
          chip: "Archive frame · Unretouched",
          title: "The record"
        },
        {
          src: "/assets/editorial-v3/gutters-exteriors-tudor-exterior-1280.webp",
          srcset:
            "/assets/editorial-v3/gutters-exteriors-tudor-exterior-640.webp 640w, /assets/editorial-v3/gutters-exteriors-tudor-exterior-1280.webp 1280w",
          width: 1280,
          height: 720,
          alt: "Color-graded presentation cut of the same Tudor-style residence exterior frame, with tighter cropping and a warmer tone",
          chip: "Completed project",
          title: "The presentation cut"
        }
      ]
    },
    outcome: {
      heading: "Finished work should stand on its own.",
      paragraphs: [
        "What stands here is the exterior the frame preserves: coordinated roof planes, trim, masonry, and copper detail across one residence — shown at full scale, with no baked labels and no artificial upscaling.",
        "Where the archive cannot support a comparison, none is invented."
      ],
      frame: {
        src: "/assets/projects/project-tudor-residence-exterior-1280.jpg",
        srcset:
          "/assets/projects/project-tudor-residence-exterior-640.jpg 640w, /assets/projects/project-tudor-residence-exterior-1280.jpg 1280w",
        width: 1280,
        height: 720,
        alt: "Full-scale view of the unretouched Tudor-style residence exterior archive frame",
        chip: "Archive frame · Unretouched",
        title: "The exterior, full scale"
      },
      panel: {
        eyebrow: "Proof standard",
        heading: "Documented. Matched. Traceable.",
        items: [
          { label: "Published now", value: "Completed project photography" },
          { label: "Comparison rule", value: "Matched original views" },
          {
            label: "Presentation",
            value: "No baked labels or artificial upscaling"
          }
        ],
        note: "Before-and-after views should come from the same property and preserve a clear comparison."
      }
    },
    cta: {
      eyebrow: "Considering exterior work?",
      title: "Put your property in the next chapter.",
      text: "Tell us what you see and where the property is located."
    }
  },
  {
    slug: "commercial-flat-roof",
    pageTitle: "Commercial Flat Roof Case Study",
    description:
      "Follow a commercial low-slope roofing record from crane-staged material delivery to crew-level installation and full-building aerial documentation.",
    eyebrow: "Case study · Commercial roofing",
    titleHtml: "Commercial<br><span>Flat Roof.</span>",
    breadcrumbLabel: "Commercial Flat Roof",
    summary:
      "One low-slope roof installation documented from crew level to full-building aerial view.",
    chips: [
      { label: "System", value: "Low-slope roofing" },
      { label: "Record", value: "Four field frames" },
      { label: "Coverage", value: "Crew to aerial" }
    ],
    socialImage:
      "/assets/projects/project-low-slope-roof-aerial-enhanced-v3-1280.jpg",
    socialImageAlt:
      "Aerial view of a large commercial building during flat roof installation, with a bright white low-slope roofing system, rooftop equipment, and workers",
    socialImageWidth: 1280,
    socialImageHeight: 720,
    hero: {
      src: "/assets/projects/project-low-slope-roof-aerial-enhanced-v3-1280.webp",
      srcset:
        "/assets/projects/project-low-slope-roof-aerial-enhanced-v3-640.webp 640w, /assets/projects/project-low-slope-roof-aerial-enhanced-v3-1280.webp 1280w",
      width: 1280,
      height: 720,
      alt: "Aerial view of a large commercial building during flat roof installation, with a bright white low-slope roofing system, rooftop equipment, and workers",
      chip: "Field record · Aerial view"
    },
    condition: {
      heading: "The record opens with logistics.",
      paragraphs: [
        "No storm frame and no damage frame: this record begins with coordinated delivery — a crane staging packaged roofing materials at roof level on an active commercial site.",
        "Coordinated delivery keeps materials, access, and installation moving. Logistics are part of the work."
      ],
      frame: {
        src: "/assets/projects/project-material-delivery-clear-v2-1020.webp",
        srcset:
          "/assets/projects/project-material-delivery-clear-v2-640.webp 640w, /assets/projects/project-material-delivery-clear-v2-1020.webp 1020w",
        width: 1020,
        height: 1020,
        alt: "Crane lifting packaged roofing materials to the top of a multi-story brick commercial building",
        chip: "Supporting field record · Material staging",
        title: "Materials Moving Up"
      }
    },
    protocol: {
      intro:
        "The steps below are quoted from the published Raccoon Restoration process page. Commercial work runs on the same protocol as residential work — inspection through verification."
    },
    documentation: {
      heading: "Installation detail to overhead verification.",
      paragraphs: [
        "Three field views show installation detail, building context, and full-roof coverage.",
        "At crew level, membrane runs are laid and seamed by a crew in high-visibility gear. From directly above, the same class of work reads as coverage: seams, staging, and rooftop equipment visible across the roof plane."
      ],
      note: "Captions describe visible content only. No frame carries baked labels or artificial upscaling.",
      frames: [
        {
          src: "/assets/projects/project-low-slope-installation-crew-enhanced-v3-1280.webp",
          srcset:
            "/assets/projects/project-low-slope-installation-crew-enhanced-v3-640.webp 640w, /assets/projects/project-low-slope-installation-crew-enhanced-v3-1280.webp 1280w",
          width: 1280,
          height: 720,
          alt: "Roofing crew in high-visibility vests installing a white low-slope roofing system on a commercial building",
          chip: "Field record · Surface installation",
          title: "Commercial Roof Installation"
        },
        {
          src: "/assets/projects/project-low-slope-installation-topdown-enhanced-v3-1280.webp",
          srcset:
            "/assets/projects/project-low-slope-installation-topdown-enhanced-v3-640.webp 640w, /assets/projects/project-low-slope-installation-topdown-enhanced-v3-1280.webp 1280w",
          width: 1280,
          height: 720,
          alt: "Top-down drone view of an active commercial flat roof installation with a white low-slope roofing system, workers, tools, and rooftop equipment",
          chip: "Field record · Overhead verification",
          title: "Low-Slope Roof Installation From Above"
        }
      ]
    },
    outcome: {
      heading: "Full-roof coverage, documented from above.",
      paragraphs: [
        "The closing frame in the record: the full building under a bright white low-slope system, rooftop equipment in place, documented from above while the work is live.",
        "Aerial records make roof geometry, transitions, and the finished system easier to examine."
      ],
      frame: {
        src: "/assets/projects/project-low-slope-roof-aerial-enhanced-v3-1280.webp",
        srcset:
          "/assets/projects/project-low-slope-roof-aerial-enhanced-v3-640.webp 640w, /assets/projects/project-low-slope-roof-aerial-enhanced-v3-1280.webp 1280w",
        width: 1280,
        height: 720,
        alt: "Aerial view of the commercial building with its bright white low-slope roofing system documented edge to edge",
        chip: "Field record · Full-building aerial",
        title: "Full Commercial Roof View"
      },
      panel: {
        eyebrow: "Documented from the field",
        heading: "Scale. Sequence. Coverage.",
        items: [
          { label: "System", value: "Low-slope roofing" },
          { label: "Record", value: "Three field views" },
          { label: "Coverage", value: "Crew to aerial" }
        ],
        note: "Field records show installation detail, building context, and full-roof coverage — captured on active commercial sites."
      }
    },
    cta: {
      eyebrow: "Commercial roofing",
      title: "Start with a clear assessment.",
      text: "Share the building, the roof type, and the current concern."
    }
  }
];

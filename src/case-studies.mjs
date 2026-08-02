// Case-study content for the two scroll-narrative project pages.
//
// Sourcing rules (docs/image-provenance-register.md governs):
// - Every image is existing client-archive material already recorded in the
//   provenance register or already published on /projects/.
// - Every factual statement traces to the register, the claims registry, or
//   copy already published on the site. Where the archive cannot support a
//   fact (dates, addresses, before-frames, homeowner words), the copy stays
//   scope-honest instead of inventing one.
// - The Tudor study includes a client-supplied pre-restoration photograph of
//   the same residence. Its completed presentation uses the owner-approved v7
//   derivative of the client-archive completion frame. That derivative applies
//   AI-assisted lawn, planting-bed, entry-staging, and photographic finishing
//   while preserving the building architecture. The page labels the treatment
//   and makes no claim that landscaping was part of the contracted scope.

export const caseStudies = [
  {
    slug: "tudor-exterior-transformation",
    pageTitle: "Tudor Residence Exterior Case Study",
    description:
      "Compare a client-supplied before photograph with a presentation-enhanced completed view of a Tudor residence exterior and Raccoon Restoration's documented field protocol.",
    eyebrow: "Case study · Residential exterior",
    titleHtml: "The Tudor<br><span>Residence.</span>",
    breadcrumbLabel: "Tudor Residence Exterior",
    summary:
      "One Tudor-inspired residence, documented before restoration and after the completed exterior transformation.",
    chips: [
      { label: "Class", value: "Residential exterior" },
      { label: "Record", value: "Client project archive" },
      { label: "Frames", value: "Before + polished completion" }
    ],
    socialImage:
      "/assets/projects/project-tudor-residence-exterior-polished-v7-1280.jpg",
    socialImageAlt:
      "Polished completed view of a large Tudor-style residence with black-and-white half-timbered gables, copper bay-window roofs, a round stone turret, and a manicured lawn",
    socialImageWidth: 1280,
    socialImageHeight: 720,
    hero: {
      src:
        "/assets/projects/project-tudor-residence-exterior-polished-v7-1600.jpg",
      srcset:
        "/assets/projects/project-tudor-residence-exterior-polished-v7-640.jpg 640w, /assets/projects/project-tudor-residence-exterior-polished-v7-1280.jpg 1280w, /assets/projects/project-tudor-residence-exterior-polished-v7-1600.jpg 1600w",
      mobileSrc:
        "/assets/projects/project-tudor-residence-exterior-polished-v7-mobile-800x1000.jpg",
      width: 1600,
      height: 900,
      alt: "Presentation-enhanced completed view of a large Tudor-style residence with black-and-white gables, a stone turret, a clean entry, and manicured landscaping",
      chip: "Completed project"
    },
    condition: {
      heading: "The original condition, documented.",
      paragraphs: [
        "The client-supplied original photograph shows the residence before restoration: muted half-timbered trim, light upper walls, red brick at the lower elevation, and the distinctive round stone tower beneath its conical roof.",
        "The tower, gables, bay-window roofs, and curved front approach make the property match clear even though the before and completed photographs were captured from slightly different positions."
      ],
      frame: {
        src: "/assets/projects/project-tudor-residence-before-1280.jpg",
        srcset:
          "/assets/projects/project-tudor-residence-before-640.jpg 640w, /assets/projects/project-tudor-residence-before-1280.jpg 1280w",
        width: 1280,
        height: 720,
        alt: "Tudor-style residence before restoration, with muted half-timbered trim, light upper walls, red brick, and a round stone tower",
        chip: "Before restoration · Client-supplied original",
        title: "The Original Exterior"
      }
    },
    protocol: {
      intro:
        "The steps below are quoted from the published Raccoon Restoration process page. A case study should be held to the protocol — not to a prettier version of it."
    },
    documentation: {
      heading: "Before and completed work, side by side.",
      paragraphs: [
        "The first frame is the client-supplied pre-restoration photograph. The second is an owner-approved presentation derivative of the completed project photograph from the client archive.",
        "Because the photographs were not captured from a locked camera position, the comparison is presented without a slider or pixel-perfect alignment. The architecture—not the framing—establishes the match."
      ],
      note: "The completed frame uses AI-assisted lawn, planting-bed, entry-staging, and photographic finishing. The architecture is preserved, and the treatment is not a claim that landscaping was part of the restoration scope.",
      frames: [
        {
          src: "/assets/projects/project-tudor-residence-before-1280.jpg",
          srcset:
            "/assets/projects/project-tudor-residence-before-640.jpg 640w, /assets/projects/project-tudor-residence-before-1280.jpg 1280w",
          width: 1280,
          height: 720,
          alt: "Tudor-style residence before restoration, showing muted trim, light upper walls, red brick, and a round stone tower",
          chip: "Before restoration · Original photograph",
          title: "Before"
        },
        {
          src:
            "/assets/projects/project-tudor-residence-exterior-polished-v7-1280.jpg",
          srcset:
            "/assets/projects/project-tudor-residence-exterior-polished-v7-640.jpg 640w, /assets/projects/project-tudor-residence-exterior-polished-v7-1280.jpg 1280w",
          width: 1280,
          height: 720,
          alt: "Presentation-enhanced completed Tudor-style residence exterior with black-and-white gables, dark brick, copper bay-window roofs, a stone tower, and manicured landscaping",
          chip: "Completed project",
          title: "After"
        }
      ]
    },
    outcome: {
      heading: "A transformed exterior, clearly documented.",
      paragraphs: [
        "The completed view presents a coordinated dark-and-light Tudor palette across the gables, masonry, roof planes, bay-window details, and round stone tower.",
        "The presentation derivative gives that completed exterior a clean portfolio finish while the underlying project record remains the basis for every architectural claim."
      ],
      frame: {
        src:
          "/assets/projects/project-tudor-residence-exterior-polished-v7-1280.jpg",
        srcset:
          "/assets/projects/project-tudor-residence-exterior-polished-v7-640.jpg 640w, /assets/projects/project-tudor-residence-exterior-polished-v7-1280.jpg 1280w",
        width: 1280,
        height: 720,
        alt: "Presentation-enhanced completed Tudor-style residence exterior with dark roof planes, black-and-white gables, copper details, a stone tower, and a clean landscaped foreground",
        chip: "Completed project · Presentation enhanced",
        title: "The Completed Exterior"
      },
      panel: {
        eyebrow: "Proof standard",
        heading: "Before. Completed. Traceable.",
        items: [
          {
            label: "Published now",
            value: "Before + disclosed polished completion"
          },
          { label: "Property match", value: "Verified by architectural landmarks" },
          {
            label: "Scope standard",
            value: "No unverified materials, dates, or work claims"
          }
        ],
        note: "The photographs are from different capture positions. The completed frame has disclosed presentation finishing; landscaping is not represented as part of the restoration scope."
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

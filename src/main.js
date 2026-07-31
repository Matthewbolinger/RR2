const dataLayer = (window.dataLayer = window.dataLayer || []);
document.documentElement.classList.add("js");

function track(eventName, properties = {}) {
  dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    page_type: document.body.dataset.pageType || "unknown",
    device_category:
      window.matchMedia("(max-width: 560px)").matches ? "mobile" : "desktop",
    ...properties
  });
}

function persistCampaign() {
  const params = new URLSearchParams(window.location.search);
  const campaign = {
    campaign_source: params.get("utm_source"),
    campaign_medium: params.get("utm_medium"),
    campaign_name: params.get("utm_campaign")
  };
  if (Object.values(campaign).some(Boolean)) {
    try {
      sessionStorage.setItem("rr_campaign", JSON.stringify(campaign));
    } catch {
      // Storage may be unavailable in privacy-restricted environments.
    }
  }
}

function campaignProperties() {
  try {
    return JSON.parse(sessionStorage.getItem("rr_campaign") || "{}");
  } catch {
    return {};
  }
}

function setupMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!toggle || !menu) return;

  const background = [
    document.querySelector(".utility"),
    document.querySelector("main"),
    document.querySelector(".site-footer"),
    document.querySelector(".mobile-conversion")
  ].filter(Boolean);
  const desktopBreakpoint = window.matchMedia("(min-width: 1101px)");
  const focusable = () => [
    toggle,
    ...menu.querySelectorAll('a[href], button:not([disabled]), summary')
  ];
  const syncPosition = () => {
    const header = document.querySelector("[data-header]");
    if (!header || menu.hidden) return;
    menu.style.setProperty(
      "--menu-top",
      `${Math.max(0, Math.round(header.getBoundingClientRect().bottom))}px`
    );
  };
  const setBackgroundInert = (inert) => {
    background.forEach((element) => {
      element.inert = inert;
    });
  };

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Open menu";
    menu.hidden = true;
    menu.style.removeProperty("--menu-top");
    setBackgroundInert(false);
    document.body.classList.remove("menu-open");
  };

  const open = () => {
    toggle.setAttribute("aria-expanded", "true");
    toggle.querySelector(".sr-only").textContent = "Close menu";
    menu.hidden = false;
    syncPosition();
    setBackgroundInert(true);
    document.body.classList.add("menu-open");
    menu.querySelector("a")?.focus();
  };

  toggle.addEventListener("click", () => {
    toggle.getAttribute("aria-expanded") === "true" ? close() : open();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      close();
      toggle.focus();
      return;
    }

    if (event.key === "Tab" && !menu.hidden) {
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });

  window.addEventListener("scroll", syncPosition, { passive: true });
  window.addEventListener("resize", syncPosition);
  desktopBreakpoint.addEventListener("change", (event) => {
    if (event.matches && !menu.hidden) close();
  });
}

function setupEventTracking() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-event]");
    if (!target) return;
    track(target.dataset.event, {
      CTA_position: target.dataset.position || undefined,
      service_interest: target.dataset.service || undefined,
      intent: target.dataset.intent || undefined,
      resource: target.dataset.resource || undefined,
      ...campaignProperties()
    });
  });
}

function setupDetails() {
  const dropdowns = [...document.querySelectorAll(".nav-dropdown")];
  document.addEventListener("click", (event) => {
    dropdowns.forEach((detail) => {
      if (!detail.contains(event.target)) detail.removeAttribute("open");
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    dropdowns.forEach((detail) => {
      if (!detail.open) return;
      detail.removeAttribute("open");
      detail.querySelector("summary")?.focus();
    });
  });
}

function setupActiveNavigation() {
  const path = window.location.pathname;
  document
    .querySelectorAll(
      ".desktop-nav > a, .nav-dropdown__panel a, .mobile-menu a"
    )
    .forEach((link) => {
      const href = new URL(link.href, window.location.origin).pathname;
      const isCurrent = href === path;
      if (isCurrent) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });

  if (path.startsWith("/services/")) {
    const serviceSummary = document.querySelector(".nav-dropdown > summary");
    serviceSummary?.classList.add("is-active");
    const mobileServiceGroup = document.querySelector(
      "[data-mobile-service-group]"
    );
    if (mobileServiceGroup) mobileServiceGroup.open = true;
  }
}

function setupRevealMotion() {
  const targets = document.querySelectorAll(
    [
      ".section-heading",
      ".intent-grid > a",
      ".service-card",
      ".standard-grid article",
      ".process-grid li",
      ".proof-layout",
      ".storm-panel__copy > *",
      ".reputation-card",
      ".about-preview__grid > div",
      ".service-area-preview__grid",
      ".faq-item",
      ".project-index a",
      ".project-chapter__header",
      ".project-figure",
      ".project-proof-note",
      ".project-field__copy > *",
      ".project-field__media",
      ".reviews-hero__copy > *",
      ".reviews-source-panel > *",
      ".final-cta__inner"
    ].join(",")
  );

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    targets.forEach((target) => target.classList.add("is-revealed"));
    return;
  }

  document.documentElement.classList.add("motion-ready");
  targets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-order", String(index % 5));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
        const cleanup = () => {
          entry.target.classList.remove("reveal");
          entry.target.style.removeProperty("--reveal-order");
          entry.target.removeEventListener("transitionend", onTransitionEnd);
        };
        const onTransitionEnd = (event) => {
          if (event.propertyName === "translate") cleanup();
        };
        entry.target.addEventListener("transitionend", onTransitionEnd);
        window.setTimeout(cleanup, 1200);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  targets.forEach((target) => observer.observe(target));
}

function setupImageFallbacks() {
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;
      image.parentElement?.classList.add("image-missing");
    });
  });
}

function setupMobileConversion() {
  const bar = document.querySelector(".mobile-conversion");
  if (!bar) return;

  const mobile = window.matchMedia("(max-width: 560px)");
  const sync = () => {
    if (!mobile.matches) {
      bar.classList.remove("is-managed", "is-visible");
      return;
    }

    bar.classList.add("is-managed");
    const hero = document.querySelector(
      ".home-hero, .project-hero, .page-hero, .reviews-hero, .contact-hero"
    );
    const revealPoint = hero
      ? Math.min(hero.offsetHeight * 0.55, 620)
      : 320;
    bar.classList.toggle("is-visible", window.scrollY > revealPoint);
  };

  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  mobile.addEventListener("change", sync);
  sync();
}

function setupForm() {
  const form = document.querySelector("[data-form]");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");
  const formType = form.dataset.formType || "project_request";
  const steps = [...form.querySelectorAll("[data-form-step]")];
  const progress = [...form.querySelectorAll("[data-progress-step]")];
  const submitButton = form.querySelector("[data-form-submit]");
  const submitLabel = form.querySelector("[data-submit-label]");
  const startedAt = form.querySelector("[data-form-started-at]");
  const submissionId = form.querySelector("[data-submission-id]");
  let started = false;
  let currentStep = 0;
  let submitting = false;

  if (startedAt) startedAt.value = String(Date.now());
  if (submitButton?.hasAttribute("data-disabled-until-enhanced")) {
    submitButton.disabled = false;
  }

  const stepProperties = (index) => ({
    form_type: formType,
    step_number: index + 1,
    step_name: steps[index]?.dataset.stepName || `step_${index + 1}`
  });

  const setStatus = (message = "", state = "") => {
    if (!status) return;
    status.innerHTML = message;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  const showStep = (index, { focus = false, trackView = false } = {}) => {
    if (!steps.length) return;
    currentStep = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, stepIndex) => {
      step.hidden = stepIndex !== currentStep;
    });
    progress.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === currentStep);
      item.classList.toggle("is-complete", itemIndex < currentStep);
      if (itemIndex === currentStep) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });
    setStatus();
    if (trackView) {
      track("quote_form_step_view", {
        ...stepProperties(currentStep),
        ...campaignProperties()
      });
    }
    if (focus) {
      steps[currentStep]
        ?.querySelector("input:not([type='hidden']), select, textarea")
        ?.focus();
    }
  };

  const validationMessage = (field) => {
    if (field.type === "checkbox" && !field.checked) {
      return "Please confirm before submitting.";
    }
    if (field.required && !field.value.trim()) {
      return "This field is required.";
    }
    if (
      field.type === "email" &&
      field.value.trim() &&
      !field.validity.valid
    ) {
      return "Enter a valid email address.";
    }
    if (
      field.type === "tel" &&
      field.value.replace(/\D/g, "").length < 10
    ) {
      return "Enter a 10-digit phone number.";
    }
    if (field.validity?.patternMismatch && field.name === "postal_code") {
      return "Enter a valid 5-digit ZIP code.";
    }
    return "";
  };

  const renderFieldError = (field, message, { trackError = false } = {}) => {
    const error = form.querySelector(`#${field.id || field.name}-error`);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
    if (message && trackError) {
      track("form_field_error", {
        form_type: formType,
        field_name: field.name
      });
    }
  };

  form.addEventListener("input", (event) => {
    if (!started) {
      started = true;
      track("form_start", { form_type: formType, ...campaignProperties() });
      if (steps.length) {
        track("quote_form_step_view", {
          ...stepProperties(currentStep),
          ...campaignProperties()
        });
      }
    }
    if (event.target.matches("input, select, textarea")) {
      renderFieldError(event.target, validationMessage(event.target));
    }
  });

  const validate = (scope = form) => {
    let valid = true;
    const fields = [
      ...new Set([
        ...scope.querySelectorAll("[required]"),
        ...scope.querySelectorAll('input[type="email"]'),
        ...scope.querySelectorAll('input[type="tel"]'),
        ...scope.querySelectorAll("input[pattern]")
      ])
    ];
    fields.forEach((field) => {
      const message = validationMessage(field);
      renderFieldError(field, message, { trackError: true });
      if (message) {
        valid = false;
      }
    });
    return valid;
  };

  form.classList.add("is-enhanced");
  showStep(0);

  form.querySelectorAll("[data-form-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = button.closest("[data-form-step]");
      const index = steps.indexOf(step);
      setStatus();
      if (!validate(step)) {
        setStatus(
          "Please complete the highlighted fields before continuing.",
          "error"
        );
        step.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      track("quote_form_step_complete", {
        ...stepProperties(index),
        ...campaignProperties()
      });
      showStep(index + 1, { focus: true, trackView: true });
    });
  });

  form.querySelectorAll("[data-form-back]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = button.closest("[data-form-step]");
      showStep(steps.indexOf(step) - 1, { focus: true, trackView: true });
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting) return;
    setStatus();

    if (!validate()) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      const invalidStep = firstInvalid?.closest("[data-form-step]");
      const invalidIndex = steps.indexOf(invalidStep);
      if (invalidIndex >= 0) showStep(invalidIndex);
      setStatus(
        "Please review the highlighted fields and try again.",
        "error"
      );
      firstInvalid?.focus();
      return;
    }

    if (form.dataset.endpointConfigured !== "true") {
      track("form_submit_error", {
        form_type: formType,
        error_type: "endpoint_not_configured"
      });
      setStatus(
        'Secure lead delivery is not connected in this preview. Your information has not been sent. Please call <a href="tel:+12245006825" data-event="phone_click" data-position="form_error">(224) 500-6825</a> to start the request.',
        "error"
      );
      status?.focus();
      return;
    }

    submitting = true;
    form.setAttribute("aria-busy", "true");
    if (submitButton) submitButton.disabled = true;
    if (submitLabel) submitLabel.textContent = "Sending Securely…";
    setStatus("Sending your request securely…", "loading");

    if (submissionId) {
      submissionId.value =
        globalThis.crypto?.randomUUID?.() ||
        `rr-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    const payload = new FormData(form);
    Object.entries(campaignProperties()).forEach(([key, value]) => {
      if (value) payload.set(key, value);
    });
    payload.set("source_page", window.location.pathname);
    payload.set("submitted_at", new Date().toISOString());

    track("form_submit_attempt", {
      form_type: formType,
      service_interest: form.elements.service?.value || undefined,
      ...campaignProperties()
    });

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
        credentials: "same-origin",
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error(`Lead endpoint returned ${response.status}`);
      }

      track("form_submit_success", {
        form_type: formType,
        service_interest: form.elements.service?.value || undefined,
        property_type: form.elements.property_type?.value || undefined,
        ...campaignProperties()
      });
      setStatus("Your request was received. Opening confirmation…", "success");
      window.location.assign(form.dataset.successPath || "/thank-you/");
    } catch (error) {
      track("form_submit_error", {
        form_type: formType,
        error_type:
          error?.name === "AbortError" ? "delivery_timeout" : "delivery_failed"
      });
      setStatus(
        'We could not confirm secure delivery, so your request is not marked as sent. Please call <a href="tel:+12245006825" data-event="phone_click" data-position="form_error">(224) 500-6825</a> and the team will help directly.',
        "error"
      );
      status?.focus();
      submitting = false;
      form.removeAttribute("aria-busy");
      if (submitButton) submitButton.disabled = false;
      if (submitLabel) submitLabel.textContent = "Submit Quote Request";
    } finally {
      window.clearTimeout(timeout);
    }
  });
}

persistCampaign();
setupMenu();
setupEventTracking();
setupDetails();
setupActiveNavigation();
setupRevealMotion();
setupImageFallbacks();
setupMobileConversion();
setupForm();
document.documentElement.classList.add("hero-motion-ready");
requestAnimationFrame(() => document.body.classList.add("page-ready"));

const apiKey = process.env.ACCULYNX_API_KEY;

if (!apiKey) {
  console.error(
    "Set ACCULYNX_API_KEY in the current shell or a secure local environment before running this command."
  );
  process.exit(1);
}

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${apiKey}`
};

async function load(label, url) {
  const response = await fetch(url, { headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error(`${label}: request failed with HTTP ${response.status}.`);
    process.exitCode = 1;
    return [];
  }
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.items)
      ? payload.items
      : Array.isArray(payload.data)
        ? payload.data
        : [];
  return items.map((item) => ({
    id: item.id || item.contactTypeId || item.leadSourceId || "",
    name: item.name || item.description || item.label || ""
  }));
}

const [contactTypes, leadSources] = await Promise.all([
  load(
    "Contact types",
    "https://api.acculynx.com/api/v2/contacts/contact-types?pageSize=100&pageStartIndex=0"
  ),
  load(
    "Lead sources",
    "https://api.acculynx.com/api/v2/company-settings/leads/lead-sources?pageSize=100&recordStartIndex=0"
  )
]);

console.log(
  JSON.stringify(
    {
      contactTypes,
      leadSources,
      next: {
        ACCULYNX_CONTACT_TYPE_ID: "Choose the customer/homeowner contact type ID.",
        ACCULYNX_LEAD_SOURCE_ID:
          "Choose or create the website lead source ID in AccuLynx."
      }
    },
    null,
    2
  )
);

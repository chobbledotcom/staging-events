/**
 * REFACTORED SETTINGS HANDLERS — before/after comparison
 *
 * This file shows how the helpers from settings-form-helpers.ts
 * would transform the tickets repo's src/routes/admin/settings.ts
 *
 * Only the handler definitions are shown (not imports/exports/state).
 * The complex handlers (stripe, custom-domain, etc.) are left as-is
 * since they have unique logic that doesn't fit a generic pattern.
 */

// ════════════════════════════════════════════════════════════════════
// THEME — Before: 12 lines → After: 6 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const processThemeForm_BEFORE: SettingsFormHandler = async (form, errorPage) => {
  const theme = form.getString("theme");
  if (theme !== "light" && theme !== "dark") {
    return errorPage("Invalid theme selection", 400, "settings-theme");
  }
  await settings.update.theme(theme);
  await logActivity(`Theme set to ${theme}`);
  return redirect("/admin/settings", `Theme updated to ${theme}`, true, {
    formId: "settings-theme",
  });
};

// ── After ──
const processThemeForm = createSettingsHandler({
  formId: "settings-theme",
  extract: (form) => form.getString("theme"),
  validate: (v) => (v !== "light" && v !== "dark" ? "Invalid theme selection" : null),
  save: (v) => settings.update.theme(v),
  log: (v) => `Theme set to ${v}`,
  message: (v) => `Theme updated to ${v}`,
});

// ════════════════════════════════════════════════════════════════════
// SHOW PUBLIC SITE — Before: 10 lines → After: 5 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const processShowPublicSiteForm_BEFORE: SettingsFormHandler = async (form) => {
  const value = form.get("show_public_site") === "true";
  await settings.update.showPublicSite(value);
  await logActivity(`Public site ${value ? "enabled" : "disabled"}`);
  return redirect(
    "/admin/settings",
    value ? "Public site enabled" : "Public site disabled",
    true,
    { formId: "settings-show-public-site" },
  );
};

// ── After ──
const processShowPublicSiteForm = toggleHandler({
  formId: "settings-show-public-site",
  field: "show_public_site",
  label: "Public site",
  save: (v) => settings.update.showPublicSite(v),
});

// ════════════════════════════════════════════════════════════════════
// SHOW PUBLIC API — Before: 10 lines → After: 5 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const processShowPublicApiForm_BEFORE: SettingsFormHandler = async (form) => {
  const value = form.get("show_public_api") === "true";
  await settings.update.showPublicApi(value);
  await logActivity(`Public API ${value ? "enabled" : "disabled"}`);
  return redirect(
    "/admin/settings-advanced",
    value ? "Public API enabled" : "Public API disabled",
    true,
    { formId: "settings-show-public-api" },
  );
};

// ── After ──
const processShowPublicApiForm = toggleHandler({
  formId: "settings-show-public-api",
  field: "show_public_api",
  label: "Public API",
  save: (v) => settings.update.showPublicApi(v),
  redirectTo: "/admin/settings-advanced",
});

// ════════════════════════════════════════════════════════════════════
// BUSINESS EMAIL — Before: 16 lines → After: 6 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const processBusinessEmailForm_BEFORE: SettingsFormHandler = async (
  form,
  errorPage,
) => {
  const trimmed = form.getString("business_email");
  if (trimmed === "") {
    await updateBusinessEmail("");
    await logActivity("Business email cleared");
    return redirect("/admin/settings", "Business email cleared", true, {
      formId: "settings-business-email",
    });
  }
  if (!isValidBusinessEmail(trimmed)) {
    return errorPage(
      "Invalid email format. Please use format: name@domain.com",
      400,
      "settings-business-email",
    );
  }
  await updateBusinessEmail(trimmed);
  await logActivity("Business email updated");
  return redirect("/admin/settings", "Business email updated", true, {
    formId: "settings-business-email",
  });
};

// ── After ──
const processBusinessEmailForm = clearableFieldHandler({
  formId: "settings-business-email",
  field: "business_email",
  label: "Business email",
  validate: (v) =>
    !isValidBusinessEmail(v) ? "Invalid email format. Please use format: name@domain.com" : null,
  save: (v) => updateBusinessEmail(v),
});

// ════════════════════════════════════════════════════════════════════
// TERMS — Before: 15 lines → After: 8 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const handleTermsPost_BEFORE = settingsRoute(async (form, errorPage) => {
  applyDemoOverrides(form, TERMS_DEMO_FIELDS);
  const trimmed = form.getString("terms_and_conditions");
  if (trimmed.length > MAX_TEXTAREA_LENGTH) {
    return errorPage(
      `Terms must be ${MAX_TEXTAREA_LENGTH} characters or fewer (currently ${trimmed.length})`,
      400,
      "settings-terms",
    );
  }
  await settings.update.terms(trimmed);
  if (trimmed === "") {
    await logActivity("Terms and conditions removed");
    return redirect("/admin/settings", "Terms and conditions removed", true, {
      formId: "settings-terms",
    });
  }
  await logActivity("Terms and conditions updated");
  return redirect("/admin/settings", "Terms and conditions updated", true, {
    formId: "settings-terms",
  });
});

// ── After ── (uses createSettingsHandler with custom extract for demo overrides)
const handleTermsPost = settingsRoute(
  createSettingsHandler({
    formId: "settings-terms",
    extract: (form) => {
      applyDemoOverrides(form, TERMS_DEMO_FIELDS);
      return form.getString("terms_and_conditions");
    },
    validate: (v) =>
      v.length > MAX_TEXTAREA_LENGTH
        ? `Terms must be ${MAX_TEXTAREA_LENGTH} characters or fewer (currently ${v.length})`
        : null,
    save: (v) => settings.update.terms(v),
    log: (v) => (v === "" ? "Terms and conditions removed" : "Terms and conditions updated"),
    message: (v) => (v === "" ? "Terms and conditions removed" : "Terms and conditions updated"),
  }),
);

// ════════════════════════════════════════════════════════════════════
// COUNTRY — Before: 11 lines → After: 7 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const processCountryForm_BEFORE: SettingsFormHandler = async (form, errorPage) => {
  const trimmed = form.getString("country").toUpperCase();
  if (trimmed === "") {
    return errorPage("Country is required", 400, "settings-country");
  }
  if (!isValidCountry(trimmed)) {
    return errorPage("Please select a valid country", 400, "settings-country");
  }
  await settings.update.country(trimmed);
  await logActivity(`Country set to ${trimmed}`);
  return redirect("/admin/settings", "Country updated", true, {
    formId: "settings-country",
  });
};

// ── After ──
const processCountryForm = createSettingsHandler({
  formId: "settings-country",
  extract: (form) => form.getString("country").toUpperCase(),
  validate: (v) =>
    v === "" ? "Country is required" : !isValidCountry(v) ? "Please select a valid country" : null,
  save: (v) => settings.update.country(v),
  log: (v) => `Country set to ${v}`,
  message: () => "Country updated",
});

// ════════════════════════════════════════════════════════════════════
// BOOKING FEE — Before: 12 lines → After: 7 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const processBookingFeeForm_BEFORE: SettingsFormHandler = async (form, errorPage) => {
  const raw = form.getString("booking_fee");
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value) || value < 0 || value > 10) {
    return errorPage(
      "Booking fee must be a number between 0 and 10",
      400,
      "settings-booking-fee",
    );
  }
  await settings.update.bookingFee(String(value));
  await logActivity(`Booking fee set to ${value}%`);
  return redirect("/admin/settings", `Booking fee updated to ${value}%`, true, {
    formId: "settings-booking-fee",
  });
};

// ── After ──
const processBookingFeeForm = createSettingsHandler({
  formId: "settings-booking-fee",
  extract: (form) => Number.parseFloat(form.getString("booking_fee")),
  validate: (v) =>
    !Number.isFinite(v) || v < 0 || v > 10 ? "Booking fee must be a number between 0 and 10" : null,
  save: (v) => settings.update.bookingFee(String(v)),
  log: (v) => `Booking fee set to ${v}%`,
  message: (v) => `Booking fee updated to ${v}%`,
});

// ════════════════════════════════════════════════════════════════════
// PAYMENT PROVIDER — Before: 17 lines → After: 9 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const handlePaymentProviderPost_BEFORE = settingsRoute(async (form, errorPage) => {
  const provider = form.getString("payment_provider");
  if (provider === "none") {
    await settings.update.clearPaymentProvider();
    await logActivity("Payment provider disabled");
    return redirect("/admin/settings", "Payment provider disabled", true, {
      formId: "settings-payment-provider",
    });
  }
  if (!isPaymentProvider(provider)) {
    return errorPage("Invalid payment provider", 400, "settings-payment-provider");
  }
  await settings.update.paymentProvider(provider);
  await logActivity(`Payment provider set to ${provider}`);
  return redirect("/admin/settings", `Payment provider set to ${provider}`, true, {
    formId: "settings-payment-provider",
  });
});

// ── After ──
const handlePaymentProviderPost = settingsRoute(
  createSettingsHandler({
    formId: "settings-payment-provider",
    extract: (form) => form.getString("payment_provider"),
    validate: (v) =>
      v !== "none" && !isPaymentProvider(v) ? "Invalid payment provider" : null,
    save: (v) =>
      v === "none" ? settings.update.clearPaymentProvider() : settings.update.paymentProvider(v),
    log: (v) => (v === "none" ? "Payment provider disabled" : `Payment provider set to ${v}`),
    message: (v) => (v === "none" ? "Payment provider disabled" : `Payment provider set to ${v}`),
  }),
);

// ════════════════════════════════════════════════════════════════════
// EMBED HOSTS — Before: 15 lines → After: 8 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const handleEmbedHostsPost_BEFORE = settingsRoute(async (form, errorPage) => {
  const trimmed = form.getString("embed_hosts");
  if (trimmed === "") {
    await settings.update.embedHosts("");
    return redirect("/admin/settings", "Embed host restrictions removed", true, {
      formId: "settings-embed-hosts",
    });
  }
  const error = validateEmbedHosts(trimmed);
  if (error) {
    return errorPage(error, 400, "settings-embed-hosts");
  }
  const normalized = parseEmbedHosts(trimmed).join(", ");
  await settings.update.embedHosts(normalized);
  return redirect("/admin/settings", "Allowed embed hosts updated", true, {
    formId: "settings-embed-hosts",
  });
});

// ── After ──
const handleEmbedHostsPost = settingsRoute(
  clearableFieldHandler({
    formId: "settings-embed-hosts",
    field: "embed_hosts",
    label: "Embed host restrictions",
    validate: (v) => validateEmbedHosts(v),
    save: (v) =>
      settings.update.embedHosts(v === "" ? "" : parseEmbedHosts(v).join(", ")),
  }),
);

// ════════════════════════════════════════════════════════════════════
// SQUARE WEBHOOK — Before: 18 lines → After: 7 lines
// ════════════════════════════════════════════════════════════════════

// ── Before ──
const handleAdminSquareWebhookPost_BEFORE = settingsRoute(
  async (form, errorPage) => {
    const field = processSecretField(form, "square_webhook_signature_key");
    if (field.action === "unchanged") {
      return redirect(
        "/admin/settings",
        "Square webhook settings unchanged",
        true,
        { formId: "settings-square-webhook" },
      );
    }
    if (field.action === "cleared") {
      return errorPage(
        "Webhook Signature Key is required",
        400,
        "settings-square-webhook",
      );
    }
    await settings.update.square.webhookSignatureKey(field.value);
    await logActivity("Square webhook signature key configured");
    return redirect(
      "/admin/settings",
      "Square webhook signature key updated successfully",
      true,
      { formId: "settings-square-webhook" },
    );
  },
);

// ── After ──
const handleAdminSquareWebhookPost = settingsRoute(
  secretFieldHandler({
    formId: "settings-square-webhook",
    field: "square_webhook_signature_key",
    label: "Square webhook signature key",
    required: true,
    save: (v) => settings.update.square.webhookSignatureKey(v),
  }),
);

// ════════════════════════════════════════════════════════════════════
// SUMMARY
// ════════════════════════════════════════════════════════════════════
//
// Handlers refactored with helpers:
//   1. theme              — 12 → 6 lines  (saved 6)
//   2. show-public-site   — 10 → 5 lines  (saved 5)
//   3. show-public-api    — 10 → 5 lines  (saved 5)
//   4. business-email     — 16 → 6 lines  (saved 10)
//   5. terms              — 15 → 8 lines  (saved 7)
//   6. country            — 11 → 7 lines  (saved 4)
//   7. booking-fee        — 12 → 7 lines  (saved 5)
//   8. payment-provider   — 17 → 9 lines  (saved 8)
//   9. embed-hosts        — 15 → 8 lines  (saved 7)
//  10. square-webhook     — 18 → 7 lines  (saved 11)
//
// Total: ~136 lines → ~68 lines (saved ~68 lines, ~50% reduction)
//
// Handlers left as-is (complex/unique logic):
//   - change-password (multi-field validation + session clear)
//   - stripe (webhook setup + key detection)
//   - square (multi-field + conditional token save)
//   - header-image (multipart upload)
//   - header-image/delete (storage deletion)
//   - email (multi-field provider config)
//   - email/test (send + status check)
//   - email-templates (multi-field template validation)
//   - custom-domain (task locking + CDN validation)
//   - host-subdomain (task locking + availability check)
//   - apple-wallet (5 secret fields + PEM validation)
//   - google-wallet (3 fields + key validation)
//   - reset-database (phrase validation + full reset)
//
// The helpers module is ~120 lines. Net savings: ~68 - 0 = ~68 lines
// (helpers already exist as a shared module, not counted per-file).
// Plus: less room for bugs, consistent flash messages, and each handler
// reads as a declaration of *what it does* rather than *how to do it*.

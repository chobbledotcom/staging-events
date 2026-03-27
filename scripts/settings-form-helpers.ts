/**
 * Settings form helpers — composable utilities to reduce boilerplate
 * in admin settings route handlers.
 *
 * These helpers target the tickets repo's src/routes/admin/settings.ts
 * and can be placed at src/routes/admin/settings-helpers.ts
 *
 * The core idea: most settings POST handlers follow the same pattern:
 *   extract value → validate → save → logActivity → redirect
 *
 * By expressing each handler as a config object, we eliminate the
 * repetitive redirect/errorPage/logActivity wiring and let each
 * handler focus on what's unique: its validation and save logic.
 */

import type { FormParams } from "#lib/form-data.ts";
import { logActivity } from "#lib/db/activityLog.ts";
import { isMaskSentinel } from "#lib/db/settings.ts";
import { redirect, errorRedirect } from "#routes/utils.ts";

// ── Types ───────────────────────────────────────────────────────────

type ErrorPageFn = (
  error: string,
  status: number,
  formId: string,
) => Response | Promise<Response>;

type SettingsFormHandler = (
  form: FormParams,
  errorPage: ErrorPageFn,
  session: unknown,
) => Response | Promise<Response>;

// ── Core: createSettingsHandler ─────────────────────────────────────

/**
 * Create a settings form handler from a declarative config.
 *
 * Handles the full extract → validate → save → log → redirect cycle.
 *
 * @example
 * // Before: 12 lines
 * const processThemeForm: SettingsFormHandler = async (form, errorPage) => {
 *   const theme = form.getString("theme");
 *   if (theme !== "light" && theme !== "dark") {
 *     return errorPage("Invalid theme selection", 400, "settings-theme");
 *   }
 *   await settings.update.theme(theme);
 *   await logActivity(`Theme set to ${theme}`);
 *   return redirect("/admin/settings", `Theme updated to ${theme}`, true, {
 *     formId: "settings-theme",
 *   });
 * };
 *
 * // After: 6 lines
 * const processThemeForm = createSettingsHandler({
 *   formId: "settings-theme",
 *   extract: (form) => form.getString("theme"),
 *   validate: (v) => v !== "light" && v !== "dark" ? "Invalid theme selection" : null,
 *   save: (v) => settings.update.theme(v),
 *   log: (v) => `Theme set to ${v}`,
 *   message: (v) => `Theme updated to ${v}`,
 * });
 */
type SettingsHandlerConfig<T> = {
  /** Form ID for flash message targeting */
  formId: string;
  /** Redirect target after success (default: "/admin/settings") */
  redirectTo?: string;
  /** Extract the value from form data */
  extract: (form: FormParams) => T;
  /** Validate the value. Return error string or null if valid. */
  validate?: (value: T) => string | null;
  /** Persist the value */
  save: (value: T) => Promise<void> | void;
  /** Activity log message */
  log: (value: T) => string;
  /** Flash success message */
  message: (value: T) => string;
};

const createSettingsHandler =
  <T>(cfg: SettingsHandlerConfig<T>): SettingsFormHandler =>
  async (form, errorPage) => {
    const value = cfg.extract(form);
    if (cfg.validate) {
      const error = cfg.validate(value);
      if (error) return errorPage(error, 400, cfg.formId);
    }
    await cfg.save(value);
    await logActivity(cfg.log(value));
    return redirect(cfg.redirectTo ?? "/admin/settings", cfg.message(value), true, {
      formId: cfg.formId,
    });
  };

// ── Specialization: toggleHandler ───────────────────────────────────

/**
 * Create a handler for boolean toggle settings.
 *
 * @example
 * // Before: 10 lines
 * const processShowPublicSiteForm: SettingsFormHandler = async (form) => {
 *   const value = form.get("show_public_site") === "true";
 *   await settings.update.showPublicSite(value);
 *   await logActivity(`Public site ${value ? "enabled" : "disabled"}`);
 *   return redirect("/admin/settings",
 *     value ? "Public site enabled" : "Public site disabled", true, {
 *       formId: "settings-show-public-site",
 *     });
 * };
 *
 * // After: 5 lines
 * const processShowPublicSiteForm = toggleHandler({
 *   formId: "settings-show-public-site",
 *   field: "show_public_site",
 *   label: "Public site",
 *   save: (v) => settings.update.showPublicSite(v),
 * });
 */
type ToggleConfig = {
  formId: string;
  /** Form field name */
  field: string;
  /** Human-readable label (e.g. "Public site") */
  label: string;
  /** Persist the boolean value */
  save: (value: boolean) => Promise<void> | void;
  /** Redirect target (default: "/admin/settings") */
  redirectTo?: string;
};

const toggleHandler = (cfg: ToggleConfig): SettingsFormHandler =>
  createSettingsHandler<boolean>({
    formId: cfg.formId,
    redirectTo: cfg.redirectTo,
    extract: (form) => form.get(cfg.field) === "true",
    save: cfg.save,
    log: (v) => `${cfg.label} ${v ? "enabled" : "disabled"}`,
    message: (v) => `${cfg.label} ${v ? "enabled" : "disabled"}`,
  });

// ── Specialization: clearableFieldHandler ───────────────────────────

/**
 * Create a handler for text fields that can be cleared (empty = clear).
 *
 * @example
 * // Before: 16 lines
 * const processBusinessEmailForm: SettingsFormHandler = async (form, errorPage) => {
 *   const trimmed = form.getString("business_email");
 *   if (trimmed === "") {
 *     await updateBusinessEmail("");
 *     await logActivity("Business email cleared");
 *     return redirect("/admin/settings", "Business email cleared", true, {
 *       formId: "settings-business-email",
 *     });
 *   }
 *   if (!isValidBusinessEmail(trimmed)) {
 *     return errorPage("Invalid email format...", 400, "settings-business-email");
 *   }
 *   await updateBusinessEmail(trimmed);
 *   await logActivity("Business email updated");
 *   return redirect("/admin/settings", "Business email updated", true, {
 *     formId: "settings-business-email",
 *   });
 * };
 *
 * // After: 6 lines
 * const processBusinessEmailForm = clearableFieldHandler({
 *   formId: "settings-business-email",
 *   field: "business_email",
 *   label: "Business email",
 *   validate: (v) => !isValidBusinessEmail(v) ? "Invalid email format..." : null,
 *   save: (v) => updateBusinessEmail(v),
 * });
 */
type ClearableFieldConfig = {
  formId: string;
  /** Form field name */
  field: string;
  /** Human-readable label (e.g. "Business email") */
  label: string;
  /** Validate non-empty values. Return error string or null. */
  validate?: (value: string) => string | null;
  /** Persist the value (called for both set and clear) */
  save: (value: string) => Promise<void> | void;
  /** Redirect target (default: "/admin/settings") */
  redirectTo?: string;
};

const clearableFieldHandler = (cfg: ClearableFieldConfig): SettingsFormHandler =>
  createSettingsHandler<string>({
    formId: cfg.formId,
    redirectTo: cfg.redirectTo,
    extract: (form) => form.getString(cfg.field),
    validate: (value) => {
      if (value === "") return null;
      return cfg.validate ? cfg.validate(value) : null;
    },
    save: cfg.save,
    log: (v) => (v === "" ? `${cfg.label} cleared` : `${cfg.label} updated`),
    message: (v) => (v === "" ? `${cfg.label} cleared` : `${cfg.label} updated`),
  });

// ── Specialization: choiceHandler ───────────────────────────────────

/**
 * Create a handler for a setting that must be one of a fixed set of values.
 *
 * @example
 * // Before: 12 lines
 * const processCountryForm: SettingsFormHandler = async (form, errorPage) => {
 *   const trimmed = form.getString("country").toUpperCase();
 *   if (trimmed === "") return errorPage("Country is required", 400, "settings-country");
 *   if (!isValidCountry(trimmed)) return errorPage("Please select a valid country", ...);
 *   await settings.update.country(trimmed);
 *   await logActivity(`Country set to ${trimmed}`);
 *   return redirect("/admin/settings", "Country updated", true, { formId: "settings-country" });
 * };
 *
 * // After: 7 lines
 * const processCountryForm = createSettingsHandler({
 *   formId: "settings-country",
 *   extract: (form) => form.getString("country").toUpperCase(),
 *   validate: (v) =>
 *     v === "" ? "Country is required" : !isValidCountry(v) ? "Please select a valid country" : null,
 *   save: (v) => settings.update.country(v),
 *   log: (v) => `Country set to ${v}`,
 *   message: () => "Country updated",
 * });
 */

// ── Secret field helpers ────────────────────────────────────────────

/**
 * Result of processing a secret form field.
 * - "unchanged": sentinel detected → keep existing value
 * - "cleared": empty value submitted → caller decides
 * - "provided": new non-empty value submitted → update
 */
type SecretFieldResult =
  | { action: "unchanged" }
  | { action: "cleared" }
  | { action: "provided"; value: string };

/** Extract and classify a secret field from a form submission. */
const processSecretField = (
  form: FormParams,
  fieldName: string,
): SecretFieldResult => {
  const raw = form.getString(fieldName);
  if (isMaskSentinel(raw)) return { action: "unchanged" };
  if (!raw) return { action: "cleared" };
  return { action: "provided", value: raw };
};

/**
 * Create a handler for a single secret field setting.
 * Handles the unchanged/cleared/provided branching automatically.
 *
 * @example
 * // Before: 22 lines (handleAdminSquareWebhookPost)
 * const handleAdminSquareWebhookPost = settingsRoute(async (form, errorPage) => {
 *   const field = processSecretField(form, "square_webhook_signature_key");
 *   if (field.action === "unchanged") {
 *     return redirect("/admin/settings", "Square webhook settings unchanged", true, {
 *       formId: "settings-square-webhook",
 *     });
 *   }
 *   if (field.action === "cleared") {
 *     return errorPage("Webhook Signature Key is required", 400, "settings-square-webhook");
 *   }
 *   await settings.update.square.webhookSignatureKey(field.value);
 *   await logActivity("Square webhook signature key configured");
 *   return redirect("/admin/settings", "Square webhook signature key updated", true, {
 *     formId: "settings-square-webhook",
 *   });
 * });
 *
 * // After: 7 lines
 * const handleAdminSquareWebhookPost = settingsRoute(
 *   secretFieldHandler({
 *     formId: "settings-square-webhook",
 *     field: "square_webhook_signature_key",
 *     label: "Square webhook signature key",
 *     required: true,
 *     save: (v) => settings.update.square.webhookSignatureKey(v),
 *   }),
 * );
 */
type SecretFieldConfig = {
  formId: string;
  /** Form field name */
  field: string;
  /** Human-readable label */
  label: string;
  /** If true, "cleared" returns an error. If false, "cleared" is allowed. */
  required?: boolean;
  /** Validate the provided value. Return error string or null. */
  validate?: (value: string) => string | null;
  /** Persist the value (only called for "provided" action) */
  save: (value: string) => Promise<void> | void;
  /** Additional saves to run after the main save */
  afterSave?: (value: string) => Promise<void> | void;
  /** Redirect target (default: "/admin/settings") */
  redirectTo?: string;
};

const secretFieldHandler = (cfg: SecretFieldConfig): SettingsFormHandler =>
  async (form, errorPage) => {
    const field = processSecretField(form, cfg.field);
    const to = cfg.redirectTo ?? "/admin/settings";

    if (field.action === "unchanged") {
      return redirect(to, `${cfg.label} unchanged`, true, {
        formId: cfg.formId,
      });
    }

    if (field.action === "cleared") {
      if (cfg.required) {
        return errorPage(`${cfg.label} is required`, 400, cfg.formId);
      }
      return redirect(to, `${cfg.label} cleared`, true, {
        formId: cfg.formId,
      });
    }

    if (cfg.validate) {
      const error = cfg.validate(field.value);
      if (error) return errorPage(error, 400, cfg.formId);
    }

    await cfg.save(field.value);
    if (cfg.afterSave) await cfg.afterSave(field.value);
    await logActivity(`${cfg.label} configured`);
    return redirect(to, `${cfg.label} updated successfully`, true, {
      formId: cfg.formId,
    });
  };

// ── Exports ─────────────────────────────────────────────────────────

export {
  createSettingsHandler,
  toggleHandler,
  clearableFieldHandler,
  secretFieldHandler,
  processSecretField,
};

export type {
  SettingsHandlerConfig,
  ToggleConfig,
  ClearableFieldConfig,
  SecretFieldConfig,
  SecretFieldResult,
  SettingsFormHandler,
  ErrorPageFn,
};

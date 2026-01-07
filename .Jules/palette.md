## 2024-05-23 - [Inline Error Validation]
**Learning:** Replaced intrusive `alert()` validation with inline, accessible error messages. Using `role="alert"` and `aria-invalid` ensures screen readers announce the error immediately, providing a smoother experience than blocking popups.
**Action:** When adding validation, always prefer non-blocking, inline feedback that is programmatically associated with the input via `aria-describedby`.

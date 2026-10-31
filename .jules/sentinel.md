## 2024-05-18 - Missing Input Bounds and Client-Side Validation

**Vulnerability:** The HTML form lacked `maxlength` attributes for potentially long user strings (like names and emails) and had missing or inadequate `pattern` constraints for text fields, allowing potentially malicious inputs (e.g., `<script>`) to be submitted to the backend or displayed by email clients, and introducing denial of service (DoS) risks via long payloads.

**Learning:** Missing input bounds and structural enforcement on the client side creates an unnecessary attack surface. Even if the backend (Formspree) handles it or sanitizes it, adding strict client-side validation prevents bad data from ever leaving the browser and offers an immediate first line of defense-in-depth against XSS and DoS.

**Prevention:** Always set sensible `maxlength` bounds on all text input fields to defend against buffer/DoS issues. Use the HTML5 `pattern` attribute to restrict inputs to known-good characters (e.g., preventing tags, scripts, and special characters where only alphanumeric data or names are expected). Ensure tests verify `validity.patternMismatch` appropriately.

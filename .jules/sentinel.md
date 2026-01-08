## 2024-05-23 - Client-Side Input Sanitization Gaps
**Vulnerability:** Missing input pattern validation on name fields allowed potential submission of garbage or malicious characters, relying solely on server-side sanitization.
**Learning:** Even with strict CSP, client-side input validation (Defense in Depth) is often missing in static sites, assuming Formspree handles everything.
**Prevention:** Always apply `pattern` attributes to text inputs to enforce expected formats (e.g., `[A-Za-zÀ-ÿ \-']+` for names) before submission.

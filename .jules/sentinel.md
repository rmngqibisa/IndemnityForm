## 2026-01-12 - Input Validation and Double Submission
**Vulnerability:** The 'Full Name' and 'Emergency Contact Name' fields lacked specific input validation, potentially allowing script injection or malformed data. Additionally, the form lacked double-submission prevention.
**Learning:** Even in static sites, client-side validation provides a necessary layer of defense-in-depth and data integrity.
**Prevention:** HTML5 `pattern` attributes with strict regex (e.g., `[A-Za-zÀ-ÖØ-öø-ÿ \-']+`) effectively limit allowed characters. Disabling submit buttons on form submission prevents race conditions and spam.

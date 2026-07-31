## 2024-05-24 - Missing Input Validation on Form Handlers
**Vulnerability:** Text inputs for names (`fullname`, `emergency_name`) and `email` lacked `maxlength` attributes and validation patterns.
**Learning:** Even when using external form handlers (like Formspree) where SQLi is mitigated on their end, defense-in-depth requires local validation to prevent excessively long payloads (buffer/DoS risks) and to restrict character sets.
**Prevention:** Always enforce client-side constraints (`maxlength`, `pattern`) as a first line of defense, especially for arbitrary string inputs.
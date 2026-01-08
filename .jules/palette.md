# Palette's Journal

## 2026-01-08 - Improving Form Feedback
**Learning:** Replacing `alert()` with inline validation significantly improves the experience, especially when combined with a loading state for the submit button. Users need immediate confirmation that their action (submitting) was registered, especially for external services like Formspree.
**Action:** Always verify if form submissions provide immediate visual feedback (loading state) and prefer inline errors over native alerts for custom validation logic.

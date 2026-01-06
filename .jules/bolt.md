## 2024-05-21 - Strict CSP Blocks Inline Optimization
**Learning:** The Content Security Policy (`script-src 'self'; style-src 'self'`) explicitly forbids inline scripts and styles. This prevents standard performance optimizations like inlining critical CSS/JS to reduce HTTP requests.
**Action:** When considering inlining optimizations, always check `Content-Security-Policy` headers first. Do not compromise security (by adding `'unsafe-inline'`) for minor performance gains without explicit architectural approval.

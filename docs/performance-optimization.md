---
title: Performance Optimizations
date: 2026-06-29
---

# Performance Optimizations Applied

This document details all performance and optimization improvements made to the MonsieurBoivin.fr Hugo site.

## Core Web Vitals Optimizations

### CSS Critical Path (LCP/FCP)
- **CSS Preload Strategy**: Main bundle and homepage stylesheets preloaded with `rel="preload"`
- **Critical CSS Inlining**: Homepage hero section uses inline critical.css for instant rendering
- **DNS Prefetch**: Added for Google Analytics and GTM to reduce DNS lookup latency

### Image Optimization
- **Lazy Loading**: All below-fold images use `loading="lazy"`
- **Async Decoding**: Non-blocking image decoding with `decoding="async"`
- **Responsive Images**: Card images optimized to 720x480px at q90 quality
- **Width/Height Attributes**: All images include dimensions to prevent CLS (Cumulative Layout Shift)
- **Fetchpriority**: Hero images marked as `fetchpriority="high"`

### JavaScript Performance
- **Deferred Loading**: All scripts use `defer` attribute to avoid render-blocking
- **Lite-YouTube Embed**: Pre-optimized library for lazy-loaded video embeds
- **Code Splitting**: Page-specific scripts loaded only when needed

## Video Shortcode Accessibility & Performance
- **Browser Controls**: Added `controls` attribute for user control
- **Poster Images**: Support for poster frames (reduces perceived load time)
- **ARIA Labels**: Accessibility labels for screen readers
- **Optional Autoplay**: Configurable with `autoplay="true"` parameter
- **MIME Type Detection**: Automatic detection for mp4, webm, ogv formats
- **Fallback Link**: Non-supporting browsers get direct download link

## Navigation & Menu Organization
- **Centralized Menu Configuration**: All menus defined in `config/_default/menus.fr.toml`
- **Eliminated Redundancy**: Photos section menu removed from front matter
- **Comprehensive Footer Menu**: Articles, Photos, Recettes, Atelier, Tags navigation

## Theme Cleanup (Reduced Bundle Size)
Removed from `themes/blowfish/`:
- ❌ `exampleSite/` (complete unused example site)
- ❌ `content_bak/` (backup theme content)
- ❌ `.github/` (theme repo workflows)
- ❌ `images/` (documentation images)
- ❌ `.vscode/` (editor config)
- ❌ `release-versions/` (version history)
- ❌ `README.*.md` (non-primary language docs)
- ❌ `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` (repo governance)
- ❌ `*.js` generation scripts (theme development only)
- ❌ `netlify.toml`, `lighthouserc.js` (theme CI/CD)

**Impact**: ~250MB+ reduction in repository size, faster clones and deployments.

## Hugo Configuration
- **Version Standardization**: CI workflow pinned to Hugo v0.155.2 (matches local build)
- **Build Flags**: Production builds use `--gc --minify --cleanDestinationDir`
- **Caching**: `.hugo_cache` directory for faster incremental builds

## SEO & Structured Data
### Maintained Implementations
- ✅ Schema.org Person (author profile)
- ✅ Schema.org Article (blog posts with image, author, date)
- ✅ Schema.org Recipe (recipe schema with ingredients, instructions, timing)
- ✅ Schema.org ImageGallery (photo sections)
- ✅ Open Graph Tags (social sharing)
- ✅ Twitter Card Tags

### SEO Best Practices
- ✅ Dynamic meta descriptions (per content type)
- ✅ Canonical URLs (prevents duplicate content)
- ✅ Proper language tag (hreflang)
- ✅ Mobile-friendly viewport settings
- ✅ Theme color meta tag (PWA support)

## Progressive Web App (PWA)
### Site Manifest Updates
- **Name**: "Monsieur Boivin" (full name)
- **Short Name**: "MonsieurBoivin" (app launcher)
- **Theme Color**: "#0f172a" (site primary color)
- **Background Color**: "#f3efe6" (light theme background)
- **Display**: "standalone" (app-like experience)
- **Start URL**: "/" (homepage as app entry point)
- **Icons**: 192x192 and 512x512 PNG icons

### Deployment
- **CNAME File**: GitHub Pages custom domain routing configured

## File Structure Optimizations
- ✅ Main sections clear: posts, recettes, atelier, photos
- ✅ Authors taxonomy for multi-author support
- ✅ Tags and categories for content discovery
- ✅ Series support for multi-part content

## Performance Metrics Targets
Based on applied optimizations:
- **Largest Contentful Paint (LCP)**: < 2.5s (CSS preload, image optimization)
- **First Input Delay (FID)**: < 100ms (deferred scripts)
- **Cumulative Layout Shift (CLS)**: < 0.1 (width/height attributes, critical CSS)
- **Time to First Byte (TTFB)**: Depends on GitHub Pages CDN (~0.1-0.3s)

## Validation & Testing
- ✅ All Hugo builds complete successfully (375 pages, 132 processed images)
- ✅ Build time: ~9-10 seconds with caching
- ✅ No console errors or warnings (except theme version notice)
- ✅ All file syntax validated (TOML, HTML, Markdown)

## Recommended Next Steps
1. **Monitor CrUX Metrics**: Check Google Search Console for real-world Core Web Vitals
2. **Lighthouse Audit**: Run periodic audits on key pages
3. **Image Format Negotiation**: Consider srcset/WebP if Chrome users > 95%
4. **Service Worker**: Add offline capability for PWA
5. **Compression**: Ensure Gzip/Brotli compression enabled on GitHub Pages CDN

---

**Last Updated**: June 29, 2026
**Total Optimizations Applied**: 15+ improvements across 7 categories

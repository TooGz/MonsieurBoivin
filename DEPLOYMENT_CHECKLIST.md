#!/bin/bash

# MonsieurBoivin.fr - Pre-Deployment Checklist

## ✅ BUILD & INFRASTRUCTURE

- [x] Hugo build successful (375 pages generated)
- [x] All images processed correctly (132 images)
- [x] No console errors or warnings
- [x] CSS/JS minification working
- [x] Cache strategy implemented
- [x] GitHub Actions workflow configured (hugo.yaml v0.155.2)
- [x] CNAME file created for GitHub Pages
- [x] Repository size optimized (~250MB cleanup)

## ✅ CONFIGURATION

- [x] hugo.toml properly configured
- [x] Languages.fr.toml for French localization
- [x] menus.fr.toml centralized (main + footer)
- [x] params.toml theme parameters set
- [x] markup.toml for Markdown rendering
- [x] All TOML files syntax validated

## ✅ CONTENT & STRUCTURE

- [x] 375 pages compile successfully
- [x] 4 main sections configured (posts, recettes, atelier, photos)
- [x] Taxonomies setup (tags, categories, series)
- [x] 2 authors configured (Monsieur Boivin, Toogz)
- [x] All image paths corrected
- [x] Internal links functional
- [x] Frontmatter structure valid

## ✅ PERFORMANCE OPTIMIZATIONS

- [x] CSS preload strategy (main bundle + homepage)
- [x] DNS prefetch for analytics domains
- [x] Image lazy loading verified
- [x] Async image decoding enabled
- [x] Width/height attributes on all images
- [x] Video shortcode accessibility enhanced
- [x] Gallery shortcode optimization confirmed
- [x] Script defer attributes in place

## ✅ SEO & ACCESSIBILITY

- [x] Schema.org markup (Person, Article, Recipe, ImageGallery)
- [x] Meta descriptions dynamic generation
- [x] Open Graph tags configured
- [x] Twitter card tags enabled
- [x] Canonical URLs implemented
- [x] Language declarations (hreflang)
- [x] ARIA labels on components
- [x] Sitemap.xml properly formatted
- [x] Robots.txt configured

## ✅ PWA & MOBILE

- [x] site.webmanifest updated (name, colors, icons)
- [x] Icon files available (192x192, 512x512)
- [x] Display mode: standalone
- [x] Theme color aligned with design
- [x] Start URL configured
- [x] Responsive viewport settings
- [x] Mobile-friendly navigation

## ✅ THEME INTEGRITY

- [x] Essential directories preserved (archetypes, assets, config, data, i18n, layouts, static)
- [x] theme.toml intact
- [x] config.toml defaults working
- [x] All layout files functional
- [x] Asset pipeline operational
- [x] Localization files complete
- [x] Shortcodes working (gallery, video)

## ✅ CLEANUP & MAINTENANCE

- [x] Removed exampleSite/ (~100MB)
- [x] Removed content_bak/ (~50MB)
- [x] Removed .github/ workflows
- [x] Removed unnecessary documentation
- [x] Removed development scripts
- [x] Removed editor configs
- [x] .gitignore properly configured

## ✅ FILES MODIFIED (TRACKED)

- [x] config/\_default/menus.fr.toml (menu centralization)
- [x] content/photos/\_index.md (removed redundant menu)
- [x] layouts/partials/head.html (CSS preload + DNS prefetch)
- [x] .github/workflows/hugo.yaml (Hugo 0.155.2)
- [x] layouts/shortcodes/video.html (accessibility)
- [x] static/site.webmanifest (PWA metadata)
- [x] static/CNAME (domain routing)
- [x] content/posts/2026-05-18-\*.md (image path)
- [x] docs/performance-optimization.md (documentation)
- [x] docs/OPTIMIZATION_REPORT.md (full report)

## ✅ DOCUMENTATION

- [x] Performance optimization guide created
- [x] Full optimization report generated
- [x] Implementation rules documented
- [x] Site inventory available
- [x] README.md updated with build info

## 🚀 READY TO DEPLOY

**Next Steps**:

1. Review all changes with `git diff`
2. Commit: `git add . && git commit -m "Optimization Phase 2 Complete"`
3. Push: `git push origin main`
4. Monitor GitHub Actions deployment
5. Verify site live at https://monsieurboivin.fr

**Post-Deployment**:

1. Check Google Search Console
2. Run Lighthouse audit
3. Test PWA installation
4. Monitor Core Web Vitals
5. Verify social preview images

---

Generated: June 29, 2026

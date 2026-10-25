# Self-hosted fonts

These assets retain the site’s existing font families without a Google Fonts request.
Only Latin and Latin Extended WOFF2 subsets needed for French and English are included.

- Roboto: normal 300, 400, 500, 700, 900; italic 300.
- JetBrains Mono: normal 400, 600.
- CSS uses the original Fontsource Unicode ranges and `font-display: swap`.
- Both font families are distributed under the SIL Open Font License 1.1; complete notices are preserved in the family LICENSE files.

Sources were fetched over verified HTTPS from the npm registry. Each complete package
archive was verified against its registry `dist.integrity` SHA-512 before any asset
was copied. `font-manifest.json` records versions, source archive URLs, verified
archive integrity values, and SHA-256 checksums of the included font files.

## Packages

- `@fontsource/roboto@5.3.0`
  - Source: https://registry.npmjs.org/@fontsource/roboto/-/roboto-5.3.0.tgz
  - Verified integrity: `sha512-BapRJOWYP+LZ21zp+wBQjfpPYKRoxc4LspJ/RLuI+HSMBD5u/X4O+ESDrSvEqDSy0rAl7GwBJ+09mdc16cVQ1Q==`
- `@fontsource/jetbrains-mono@5.3.0`
  - Source: https://registry.npmjs.org/@fontsource/jetbrains-mono/-/jetbrains-mono-5.3.0.tgz
  - Verified integrity: `sha512-fqDfB5I9f1p1TV486aUgB9t8zP84P0O1FtQR5Ol9vjwPy+S+EIGlVYm1cvj2W5shcZMTg2nZFdVMoH5wFu8a1A==`

Use from the published index:

```html
<link rel="stylesheet" href="fonts/fonts.css">
```

The package archives and downloader metadata are setup tooling and are not published.

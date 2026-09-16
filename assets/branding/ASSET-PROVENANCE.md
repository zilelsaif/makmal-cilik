# Android branding — v1.2.0

Original simple flask mark created directly in Codex as code-native SVG / Android vector shapes. Blue, white and yellow follow the official visual target; the reference image itself is never bundled as UI. Raster image generation was unnecessary for this simple mark. Existing PICO and curriculum artwork are unchanged.

`launcher-mark.svg` is the project master/reference. Android adaptive foreground uses a 108dp viewport with the flask inside the central safe zone; full-bleed blue background supports launcher masking. Ten optimized legacy PNGs cover mdpi through xxxhdpi, square and round. The 600×240 transparent wordmark supplies Android's 200×80dp branding slot at xxhdpi. No large full-screen bitmap is used.

Regenerate with `python scripts/generate-android-branding.py` using Pillow and the Windows Trebuchet fonts. The normal APK build uses checked-in assets and does not require Python. Native resources are under `android/app/src/main/res/`; do not manually edit generated www copies.

| Asset | Bytes |
| --- | ---: |
| `assets/branding/launcher-mark.svg` | 548 |
| `android/app/src/main/res/drawable/ic_launcher_background.xml` | 106 |
| `android/app/src/main/res/drawable/ic_launcher_foreground.xml` | 771 |
| `android/app/src/main/res/drawable/splash.xml` | 402 |
| `android/app/src/main/res/drawable/splash_mark.xml` | 870 |
| `android/app/src/main/res/drawable-xxhdpi/splash_wordmark.png` | 7,534 |
| `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml` | 217 |
| `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml` | 217 |
| `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` | 1,797 |
| `android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png` | 3,571 |
| `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` | 1,228 |
| `android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png` | 2,484 |
| `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` | 2,386 |
| `android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png` | 5,337 |
| `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` | 3,400 |
| `android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png` | 8,450 |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` | 4,746 |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png` | 11,592 |
| `android/app/src/main/res/values/ic_launcher_background.xml` | 75 |
| **Total listed assets** | **55,731** |

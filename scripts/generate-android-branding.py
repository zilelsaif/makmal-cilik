"""Reproducible small vector/PNG branding; requires Pillow (not part of APK build)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
RES=ROOT/'android/app/src/main/res'
BRAND=ROOT/'assets/branding'
BLUE='#0874da'; NAVY='#093d87'; YELLOW='#ffd539'; WHITE='#ffffff'
# Angular flask with rounded line joins: original code-native mark, no stock art.
shape=[(45,31),(63,31),(63,45),(77,70),(76,76),(71,79),(37,79),(32,76),(31,70),(45,45)]
liquid=[(41,58),(67,58),(75,72),(72,76),(36,76),(33,72)]
paths=[(WHITE,'M45,31 L63,31 L63,45 L77,70 L76,76 L71,79 L37,79 L32,76 L31,70 L45,45 Z'),(YELLOW,'M41,58 L67,58 L75,72 L72,76 L36,76 L33,72 Z'),(BLUE,'M44,27 L64,27 L64,33 L44,33 Z'),(WHITE,'M57,65 A3,3 0,1 0,63,65 A3,3 0,1 0,57,65'),(WHITE,'M44,70 A2,2 0,1 0,48,70 A2,2 0,1 0,44,70'),(YELLOW,'M67,38 A4,4 0,1 0,75,38 A4,4 0,1 0,67,38')]
def put(rel,text):
 p=RES/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text,encoding='utf-8')
def vector(entries,width=108,height=108):
 return f'<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="{width}dp" android:height="{height}dp" android:viewportWidth="{width}" android:viewportHeight="{height}">' + ''.join(f'<path android:fillColor="{color}" android:pathData="{path}"/>' for color,path in entries)+'</vector>'
BRAND.mkdir(exist_ok=True)
(BRAND/'launcher-mark.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108"><rect width="108" height="108" rx="24" fill="'+BLUE+'"/>'+''.join(f'<path fill="{c}" d="{d}"/>' for c,d in paths)+'</svg>',encoding='utf-8')
put('drawable/ic_launcher_foreground.xml',vector(paths))
put('drawable/ic_launcher_background.xml','<shape xmlns:android="http://schemas.android.com/apk/res/android"><solid android:color="#0874da"/></shape>')
put('values/ic_launcher_background.xml','<resources><color name="ic_launcher_background">#0874da</color></resources>')
for name in ['ic_launcher','ic_launcher_round']:
 put(f'mipmap-anydpi-v26/{name}.xml','<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@color/ic_launcher_background"/><foreground android:drawable="@drawable/ic_launcher_foreground"/></adaptive-icon>')
# Only remove obsolete template assets after proving each target is inside res.
for p in [*RES.glob('drawable*/splash.png'),*RES.glob('mipmap-*/ic_launcher_foreground.png'),RES/'drawable-v24/ic_launcher_foreground.xml']:
 if p.exists():
  assert p.resolve().is_relative_to(RES.resolve());p.unlink()
# Supersampled legacy icons use the same mark coordinates.
S=8
im=Image.new('RGBA',(108*S,108*S),BLUE);d=ImageDraw.Draw(im)
def poly(points,color):d.polygon([(x*S,y*S) for x,y in points],fill=color)
poly(shape,WHITE);poly(liquid,YELLOW);d.rectangle((44*S,27*S,64*S,33*S),fill=BLUE)
for x,y,rad,color in [(60,65,3,WHITE),(46,70,2,WHITE),(71,38,4,YELLOW)]:d.ellipse(((x-rad)*S,(y-rad)*S,(x+rad)*S,(y+rad)*S),fill=color)
for density,size in [('mdpi',48),('hdpi',72),('xhdpi',96),('xxhdpi',144),('xxxhdpi',192)]:
 for name in ['ic_launcher','ic_launcher_round']:
  out=im.copy()
  if name.endswith('round'):
   mask=Image.new('L',im.size,0);ImageDraw.Draw(mask).ellipse((0,0,108*S-1,108*S-1),fill=255);out.putalpha(mask)
  out.resize((size,size),Image.Resampling.LANCZOS).save(RES/f'mipmap-{density}/{name}.png',optimize=True)
# Small transparent wordmark at 3x Android's 200x80dp branding slot.
word=Image.new('RGBA',(600,240));dw=ImageDraw.Draw(word)
font=ImageFont.truetype('C:/Windows/Fonts/trebucbd.ttf',65)
small=ImageFont.truetype('C:/Windows/Fonts/trebuc.ttf',28)
dw.text((300,62),'Makmal Cilik',font=font,fill=NAVY,anchor='mm')
dw.text((300,128),'Eksperimen. Fikir. Temui.',font=small,fill=NAVY,anchor='mm')
(RES/'drawable-xxhdpi').mkdir(exist_ok=True)
word.save(RES/'drawable-xxhdpi/splash_wordmark.png',optimize=True)
# Splash icon includes a blue disk so white glass remains visible on the pale backdrop.
put('drawable/splash_mark.xml',vector([(BLUE,'M18,54 A36,36 0,1 0,90,54 A36,36 0,1 0,18,54')]+paths))
put('drawable/splash.xml','<layer-list xmlns:android="http://schemas.android.com/apk/res/android"><item android:drawable="@color/lab_background"/><item android:width="200dp" android:height="200dp" android:gravity="center" android:drawable="@drawable/splash_mark"/><item android:gravity="bottom|center_horizontal" android:bottom="32dp"><bitmap android:src="@drawable/splash_wordmark" android:gravity="center"/></item></layer-list>')
for p in sorted(RES.rglob('*')):
 if p.is_file() and ('launcher' in p.name or 'splash' in p.name): print(p.relative_to(ROOT),p.stat().st_size)

# Builds poster-shining-A0.html (A0 seminar poster, SHINING).
# Icons: Phosphor Icons duotone (MIT), vendored in icons/.
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))

ICON = {
 'book':'book-open-text','target':'target','clip':'clipboard-text','monitor':'monitor','flow':'flow-arrow',
 'sun':'sun','cycle':'arrows-clockwise','chart':'chart-bar','phone':'device-mobile','link':'share-network',
 'users':'users-three','bulb':'lightbulb','mega':'megaphone','qr':'qr-code','heart':'heart','check':'check-circle',
 'clock':'clock','scale':'scales','mail':'envelope-simple','wa':'whatsapp-logo','pin':'map-pin','save':'floppy-disk',
 'shield':'shield-check','female':'gender-female','male':'gender-male','right':'arrow-right','down':'arrow-down',
 'search':'magnifying-glass','cal':'calendar-dots','seal':'seal-check','grad':'graduation-cap',
}
_cache = {}
def ic(name, color='currentColor'):
    if name not in _cache:
        svg = open(os.path.join(HERE, 'icons', ICON[name] + '-duotone.svg')).read()
        _cache[name] = re.search(r'<svg[^>]*>(.*)</svg>', svg, re.S).group(1)
    return f'<svg viewBox="0 0 256 256" fill="currentColor" style="color:{color}">{_cache[name]}</svg>'

def head(n, title, color, icon):
    nn = f'<span class="n">{n}</span>' if n else ''
    return f'<h2 class="bn" style="--c:var(--{color})">{nn}<span class="tt">{title}</span><span class="hi">{ic(icon, "#fff")}</span></h2>'

def bar(label, pct, val, color, extra='', bold=False):
    cls = ' class="hl"' if bold else ''
    return f'<tr{cls}><td class="lbl">{label}</td><td class="bar"><div class="track"><div class="fill" style="width:{pct}%;--f:var(--{color})"></div></div></td>{extra}<td class="r">{val}</td></tr>'

def tl(n, when, col, mlab, m, flab, f):
    return f'<div class="vi" style="--c:var(--{col})"><div class="vw"><span class="dot">{n}</span>{when}</div><div class="box m"><b>{mlab}</b>{m}</div><div class="box f"><b>{flab}</b>{f}</div></div>'

css = r'''
@page { size: 841mm 1189mm; margin: 0; }
:root{
  --ink:#121a24; --muted:#36414c; --line:#c5ccd5;
  --navy:#1f3a68; --sky:#e6edf6; --green:#2e8a57; --mint:#e3f2e9;
  --teal:#1f8a96; --tealbg:#e1f1f3; --slate:#56718a; --lilac:#e7edf3; --grey:#b9bec4; --track:#e1e6eb;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:Calibri,Carlito,Arial,"Liberation Sans",sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
svg{display:block}
.poster{position:relative;width:841mm;height:1189mm;overflow:hidden;display:flex;flex-direction:column;background:#f1f3f6}
.deco{position:absolute;z-index:0}
.poster>header,.poster>main,.poster>footer{position:relative;z-index:1}

/* ---------- header ---------- */
header{padding:0 22mm 7mm;display:grid;grid-template-columns:112mm 1fr 200mm;gap:9mm;align-items:center}
.pill{grid-column:1/-1;justify-self:center;background:linear-gradient(90deg,var(--navy),var(--green));color:#fff;font-weight:700;font-size:23pt;letter-spacing:.05em;padding:3mm 16mm;border-radius:0 0 8mm 8mm;margin-bottom:3mm}
.ipb{display:flex;flex-direction:column;align-items:center;gap:2.5mm}
.ipb img{width:58mm;height:58mm}
.ipb .wm{font-size:42pt;font-weight:700;color:var(--navy);line-height:1}
.ipb .loc{font-size:20pt;color:var(--muted)}
.ttl{text-align:center}
h1{font-size:72pt;line-height:1.02;font-weight:700;color:var(--navy)}
.subtitle{font-size:34pt;font-weight:700;color:var(--teal);margin-top:3mm;line-height:1.15}
.authors{font-size:29pt;font-weight:700;margin-top:4mm}
.authors sup,.affil sup{font-size:.6em}
.affil{font-size:20pt;color:var(--muted);margin-top:1mm;line-height:1.3}
.side{display:flex;flex-direction:column;gap:3.5mm}
.contact{display:flex;flex-direction:column;gap:2.4mm}
.contact div{display:grid;grid-template-columns:11mm 1fr;gap:3mm;align-items:center;font-size:21pt;line-height:1.2}
.contact .ci{width:11mm;height:11mm;border-radius:3mm;background:var(--navy);display:grid;place-items:center}
.contact .ci svg{width:7mm;height:7mm}
.brand{background:#fff;border:.6mm solid var(--line);border-left:2.4mm solid var(--teal);border-radius:4mm;padding:4mm 6mm}
.brand .wm2{display:flex;align-items:center;gap:3mm;font-size:40pt;font-weight:700;color:var(--navy);line-height:1}
.brand .wm2 svg{width:12mm;height:12mm}
.brand .btag{font-size:22pt;font-weight:700;color:var(--teal);margin-top:1mm}
.brand p{font-size:19pt;line-height:1.25;margin-top:.5mm}
.stripe{height:3mm;background:linear-gradient(90deg,var(--navy),var(--teal),var(--green))}

/* ---------- layout ---------- */
main{flex:1;padding:7mm 22mm 0;display:flex;flex-direction:column;gap:7mm;min-height:0}
.row{display:grid;gap:7mm;flex:1 1 auto}
.card{background:#fff;border:.6mm solid var(--line);border-radius:5mm;padding:0 8mm 6mm;box-shadow:0 1mm 2.5mm rgba(20,40,60,.07);display:flex;flex-direction:column;overflow:hidden}
h2.bn{display:flex;align-items:center;gap:4mm;margin:0 -8mm 5mm;padding:3mm 8mm;background:linear-gradient(90deg,var(--c),color-mix(in srgb,var(--c) 72%,#fff));color:#fff;font-size:48pt;font-weight:700;line-height:1.05}
h2.bn .n{flex:none;min-width:14mm;height:14mm;padding:0 2.4mm;border-radius:7mm;background:#fff;color:var(--c);font-size:27pt;display:grid;place-items:center}
h2.bn .tt{flex:1}
h2.bn .hi{flex:none;width:14mm;height:14mm}
h2.bn .hi svg{width:100%;height:100%}

/* type scale: body 24 / secondary 21 / note 18 */
p,li,td{font-size:30pt;line-height:1.3}
b{font-weight:700}
.note{font-size:23pt;line-height:1.3;color:var(--muted);margin-top:3mm}
.sub{display:flex;align-items:center;gap:3mm;font-size:30pt;font-weight:700;color:var(--c,var(--green));margin:4mm 0 2.5mm}
.sub svg{width:12mm;height:12mm}
.ico{flex:none;width:14mm;height:14mm;border-radius:4mm;background:var(--bg,var(--sky));display:grid;place-items:center}
.ico svg{width:10mm;height:10mm}

/* abstract */
.abs{display:flex;flex-direction:column;gap:2.4mm}
.abs p{font-size:26pt;line-height:1.28;border-left:1.6mm solid var(--c);padding-left:3.5mm}
.abs p b{color:var(--c)}
.kw{background:var(--tealbg);border-radius:3mm;padding:2.5mm 4mm;font-size:24pt;line-height:1.3;margin-top:3mm}
.kw b{color:var(--teal)}

/* introduction */
.story{display:grid;grid-template-columns:1fr 11mm 1fr 11mm 1fr;align-items:stretch}
.story>.arr{align-self:center;width:11mm;height:11mm;color:var(--muted)}
.pan{background:var(--bg);border-radius:4mm;padding:0 4.5mm 4mm;display:flex;flex-direction:column;gap:2.4mm}
.ph{display:flex;align-items:center;gap:2.5mm;margin:0 -4.5mm 1mm;padding:2.4mm 4.5mm;background:var(--c);color:#fff;font-weight:700;font-size:27pt;border-radius:4mm 4mm 0 0}
.ph svg{width:10mm;height:10mm;flex:none}
.st{display:grid;grid-template-columns:auto 1fr;gap:3mm;align-items:center;background:#fff;border-radius:3mm;padding:2mm 3mm}
.st b{font-size:42pt;font-weight:700;color:var(--c);line-height:1;white-space:nowrap}
.st span,.gap li{font-size:25pt;line-height:1.22}
cite{font-style:normal;color:var(--muted);font-size:19pt}
.gap{list-style:none;display:flex;flex-direction:column;gap:2mm}
.gap li{display:grid;grid-template-columns:10mm 1fr;gap:2.5mm;background:#fff;border-radius:3mm;padding:2mm 3mm}
.gap svg{width:9.5mm;height:9.5mm}
.find{margin-top:auto;background:var(--c);color:#fff;border-radius:3mm;padding:2.2mm 3.5mm;font-size:25pt;line-height:1.22}
.godown{width:11mm;height:11mm;margin:1.5mm auto;color:var(--muted)}
.goal{display:grid;grid-template-columns:12mm 1fr;gap:4mm;align-items:center;background:linear-gradient(90deg,var(--green),var(--teal));color:#fff;border-radius:4mm;padding:3mm 6mm;font-size:28pt;line-height:1.25;font-weight:700}
.goal svg{width:12mm;height:12mm}

/* method */
.methgrid{display:grid;grid-template-columns:1fr 1.08fr;gap:9mm;align-items:start}
.meth{display:flex;flex-direction:column;gap:2.6mm}
.meth div{display:grid;grid-template-columns:14mm 1fr;gap:4mm;align-items:center}
.meth p{font-size:27pt;line-height:1.25}
.meth b{color:var(--navy)}
.addie{display:flex;align-items:flex-start;gap:1mm}
.addie>.arr{flex:none;width:9mm;height:9mm;margin-top:6mm;color:var(--muted)}
.stp{flex:1;text-align:center}
.stp b{display:grid;place-items:center;width:19mm;height:19mm;margin:0 auto 2mm;border-radius:50%;border:1.2mm solid var(--c);color:var(--c);font-size:32pt;background:#fff}
.stp.on b{background:var(--c);color:#fff}
.stp .si{display:block;width:15mm;height:15mm;margin:0 auto 1.5mm}
.stp h3{font-size:26pt;color:var(--c);line-height:1.1}
.stp p{font-size:22pt;color:var(--muted);line-height:1.22;margin-top:1mm}

/* platform */
.platgrid{display:grid;grid-template-columns:1.45fr 1fr;gap:6mm;align-items:center}
.browser{border:.6mm solid var(--line);border-radius:3.5mm;overflow:hidden;box-shadow:0 1.5mm 4mm rgba(20,40,60,.15);background:#fff}
.browser .bar{display:flex;align-items:center;gap:1.8mm;background:var(--lilac);padding:2mm 3.5mm}
.browser .bar i{width:3mm;height:3mm;border-radius:50%;background:var(--grey)}
.browser .bar span{margin-left:2mm;flex:1;background:#fff;border-radius:3mm;padding:.8mm 3mm;font-size:17pt;color:var(--muted)}
.browser .screen{position:relative;aspect-ratio:1752/781}
.browser .screen img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.feat{list-style:none;display:flex;flex-direction:column;gap:3mm}
.feat li{display:grid;grid-template-columns:14mm 1fr;gap:3.5mm;align-items:center;font-size:26pt;line-height:1.2}

/* process */
.proch{display:grid;grid-template-columns:98mm 1fr;gap:6mm;align-items:center}
.cyc svg{width:98mm;height:98mm}
.vtl{display:flex;flex-direction:column;gap:2.4mm;border-left:1mm solid var(--navy);margin-left:4mm;padding-left:6mm}
.vi{display:grid;grid-template-columns:47mm 1fr 1fr;gap:2.4mm;position:relative}
.vw{font-size:24pt;font-weight:700;color:var(--navy);line-height:1.1}
.vw .dot{position:absolute;left:-11.6mm;top:0;width:10mm;height:10mm;border-radius:50%;background:var(--c);color:#fff;font-size:19pt;display:grid;place-items:center;border:.8mm solid #fff}
.box{border-radius:2.5mm;padding:2mm 3mm;font-size:23pt;line-height:1.22}
.box b{display:block;font-size:18pt;letter-spacing:.04em;text-transform:uppercase}
.box.m{background:var(--lilac)} .box.m b{color:var(--slate)}
.box.f{background:var(--mint)} .box.f b{color:var(--green)}

/* bars & tables */
.bars{width:100%;border-collapse:collapse}
.bars th{font-size:23pt;font-weight:700;color:var(--muted);text-align:left;padding:0 0 1.5mm;border-bottom:.4mm solid var(--line)}
.bars th.r,.bars td.r{text-align:right;white-space:nowrap}
.bars td{padding:1.3mm 0;vertical-align:middle;font-size:26pt;line-height:1.15}
.bars td.lbl{padding-right:3mm}
.bars td.bar{width:42%;padding-right:3mm}
.bars td.r{padding-left:3mm}
.track{height:8mm;background:var(--track);border-radius:4mm;overflow:hidden}
.fill{height:100%;border-radius:4mm;background:linear-gradient(90deg,var(--f),color-mix(in srgb,var(--f) 65%,#fff))}
tr.hl td{font-weight:700}
.callout{display:grid;grid-template-columns:12mm 1fr;gap:3mm;align-items:center;background:var(--mint);border-radius:3mm;padding:2.6mm 4mm;margin-top:3mm;font-size:25pt;line-height:1.25}
.callout svg{width:12mm;height:12mm}
.rel{width:100%;border-collapse:separate;border-spacing:0 1.3mm}
.rel th{background:var(--green);color:#fff;font-size:25pt;text-align:left;padding:2mm 3mm}
.rel th:first-child{border-radius:2mm 0 0 2mm}.rel th:last-child{border-radius:0 2mm 2mm 0}
.rel td{font-size:26pt;padding:1.8mm 3mm;line-height:1.15;background:#f4f6f8}
.rel td:nth-child(2){white-space:nowrap}
.rel .r{text-align:right;white-space:nowrap;font-weight:700}
.rel td.pos{background:var(--green);color:#fff;text-align:center}
.rel td.neg{background:var(--navy);color:#fff;text-align:center}
.rel td.na{color:var(--muted);text-align:center}
.key{display:flex;gap:8mm;font-size:25pt;margin-bottom:2mm}
.key span{display:flex;align-items:center;gap:2mm}
.key svg{width:10mm;height:10mm}
.grp{display:grid;grid-template-columns:1fr 1fr;gap:4mm 9mm}
.grp .t{font-size:25pt;font-weight:700}
.grp .ln{display:grid;grid-template-columns:1fr 23mm;gap:3mm;align-items:center;margin-top:1.4mm}
.grp .ln span{font-size:25pt;text-align:right;font-weight:700}

/* conclusion & end */
.bul{list-style:none;display:flex;flex-direction:column;gap:2.6mm}
.bul li{display:grid;grid-template-columns:12mm 1fr;gap:3mm;font-size:27pt;line-height:1.25}
.bul li svg{width:11mm;height:11mm;margin-top:.4mm}
.access{background:linear-gradient(135deg,var(--navy),var(--teal));border-radius:5mm;color:#fff;padding:5mm 6mm;display:grid;grid-template-columns:46mm 1fr;gap:5mm;align-items:center}
.access .qr{width:46mm;height:46mm;background:#fff;border-radius:3mm;padding:3mm}
.access .qr img{width:100%;height:100%;display:block}
.access h3{font-size:35pt;color:#bfe9ee;display:flex;align-items:center;gap:2.5mm}
.access h3 svg{width:10mm;height:10mm}
.access .link{font-size:26pt;font-weight:700;margin:1mm 0 2mm}
.access ol{list-style:none;counter-reset:s;display:flex;flex-direction:column;gap:1.4mm}
.access li{counter-increment:s;font-size:24pt;line-height:1.2;padding-left:9mm;position:relative}
.access li::before{content:counter(s);position:absolute;left:0;top:.2mm;width:7mm;height:7mm;border-radius:50%;background:#fff;color:var(--navy);font-size:17pt;font-weight:700;display:grid;place-items:center}

footer{margin-top:6mm;background:var(--navy);color:#e8eef6;padding:4.5mm 22mm;display:flex;justify-content:center;gap:4mm;align-items:center;font-size:27pt}
footer b{color:#bfe9ee}
footer svg{width:9mm;height:9mm}
'''

leaf = lambda x,y,r,s,o,col: f'<svg class="deco" style="left:{x}mm;top:{y}mm;width:{s}mm;height:{s}mm;opacity:{o};transform:rotate({r}deg)" viewBox="0 0 100 100"><path d="M50 95 C10 70 5 30 50 5 C95 30 90 70 50 95Z" fill="{col}"/><path d="M50 92 V12" stroke="#fff" stroke-width="2.5" fill="none"/><path d="M50 40 L30 28 M50 55 L28 44 M50 70 L32 61 M50 40 L70 28 M50 55 L72 44 M50 70 L68 61" stroke="#fff" stroke-width="2" fill="none"/></svg>'
decos = ''.join([leaf(-14,-6,-35,70,.2,'#8fa3b5'), leaf(30,-16,20,46,.14,'#b9bec4'), leaf(790,150,40,66,.16,'#8fa3b5'), leaf(-12,1090,-120,70,.16,'#8fa3b5'), leaf(790,1095,130,64,.16,'#8fa3b5')])

def node(cx,cy,col,lines):
    t=''.join(f'<tspan x="{cx}" dy="{0 if i==0 else 11.5}">{l}</tspan>' for i,l in enumerate(lines))
    y0=cy-(len(lines)-1)*5.75+3.5
    return f'<circle cx="{cx}" cy="{cy}" r="32" fill="{col}"/><text x="{cx}" y="{y0}" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="700" font-family="Calibri, Carlito, Arial">{t}</text>'
cyc = f'''<svg viewBox="0 0 200 200">
<defs><marker id="ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1f3a68"/></marker></defs>
<g fill="none" stroke="#1f3a68" stroke-width="2.6" marker-end="url(#ah)">
<path d="M128 36 A68 68 0 0 1 162 68"/><path d="M164 130 A68 68 0 0 1 132 162"/><path d="M72 164 A68 68 0 0 1 38 132"/><path d="M36 70 A68 68 0 0 1 68 38"/></g>
<circle cx="100" cy="100" r="30" fill="#fff" stroke="#2e8a57" stroke-width="3"/>
<text x="100" y="104.5" text-anchor="middle" font-size="13" font-weight="700" fill="#2e8a57" font-family="Calibri, Carlito, Arial">SHINING</text>
{node(100,30,'#1f3a68',['Pemantauan','& evaluasi'])}{node(170,100,'#1f8a96',['Perbaikan','sistem'])}{node(100,170,'#56718a',['Deteksi','masalah'])}{node(30,100,'#2e8a57',['Uji','lapangan'])}
</svg>'''

ARR = ic('right'); DOWN = ic('down')

html = f'''<!doctype html>
<html lang="id"><head><meta charset="utf-8"><title>Poster SHINING A0</title>
<style>{css}</style></head>
<body><div class="poster">
{decos}
<header>
  <div class="pill">SEMINAR SEKOLAH PASCASARJANA IPB · PROGRAM STUDI ILMU GIZI</div>
  <div class="ipb"><img src="logo-ipb.svg" alt="Logo IPB University"><div class="wm">IPB University</div><div class="loc">—— Bogor Indonesia ——</div></div>
  <div class="ttl">
    <h1>Pengembangan Media Edukasi Gizi Online SHINING bagi Calon Pengantin</h1>
    <div class="subtitle">Evaluasi Proses Implementasi dan Pola Penggunaan Media Sosial</div>
    <div class="authors">Marhamah<sup>1</sup>, Hardinsyah<sup>2</sup>, Cesilia Meti Dwiriani<sup>2</sup>, Lilik Kustiyah<sup>2</sup>, Irman Hermadi<sup>3</sup></div>
    <div class="affil"><sup>1</sup>Program Doktor Ilmu Gizi, FKGiz IPB · <sup>2</sup>Program Studi Ilmu Gizi, FKGiz IPB · <sup>3</sup>Program Studi Ilmu Komputer, FMIPA IPB</div>
  </div>
  <div class="side">
    <div class="contact">
      <div><span class="ci">{ic('pin','#fff')}</span>Program Studi Ilmu Gizi, FKGiz IPB<br>Kampus IPB Dramaga, Bogor, Jawa Barat</div>
      <div><span class="ci">{ic('wa','#fff')}</span>0813-8172-4884</div>
      <div><span class="ci">{ic('mail','#fff')}</span>am_marhamah@apps.ipb.ac.id</div>
    </div>
    <div class="brand"><div class="wm2">{ic('sun','#1f8a96')}SHINING</div><div class="btag">Sehat Sebelum Hamil itu Penting</div><p>Edukasi gizi prakonsepsi daring berbasis <i>Health Belief Model</i> (HBM)</p></div>
  </div>
</header>
<div class="stripe"></div>

<main>
  <div class="row" style="grid-template-columns:1.06fr 1.94fr">
    <section class="card">
      {head(None,'Abstrak','teal','book')}
      <div class="abs">
        <p style="--c:var(--teal)"><b>Latar belakang.</b> Bukti penggunaan media sosial catin dan kinerja platform edukasi gizi prakonsepsi daring masih terbatas.</p>
        <p style="--c:var(--green)"><b>Tujuan.</b> Menganalisis media sosial catin terhadap pengetahuan, sikap HBM, dan IMT, serta mengevaluasi platform SHINING.</p>
        <p style="--c:var(--navy)"><b>Metode.</b> Potong lintang dan evaluasi proses (ADDIE), Kota Binjai, Juli–Oktober 2026; 198 catin, 74 dianalisis.</p>
        <p style="--c:var(--slate)"><b>Hasil.</b> 38,9% menuntaskan instrumen; WhatsApp utama (59,5%); pengetahuan–sikap r<sub>s</sub> = 0,414 (p &lt; 0,001); 51,4% gizi lebih.</p>
        <p style="--c:var(--navy)"><b>Simpulan.</b> SHINING layak dikembangkan; instrumen ringkas menjadi kunci keberlanjutan.</p>
      </div>
      <div class="kw"><b>Kata kunci:</b> calon pengantin, edukasi gizi, prakonsepsi, media sosial, <i>Health Belief Model</i></div>
    </section>
    <section class="card">
      {head(1,'Pendahuluan','green','bulb')}
      <div class="story">
        <div class="pan" style="--c:var(--teal);--bg:var(--tealbg)">
          <div class="ph">{ic('scale','#fff')}<span>Masalah gizi</span></div>
          <div class="st"><b>±50%</b><span>dewasa Indonesia gizi lebih <cite>(Pengpid dan Peltzer 2017)</cite></span></div>
          <div class="st"><b>±50%</b><span>catin berpengetahuan gizi kurang <cite>(Melani dan Kuswari 2019; Zahra <i>et al.</i> 2024)</cite></span></div>
          <div class="find"><b>Temuan:</b> 51,4% catin gizi lebih, meski 59,5% berpengetahuan baik</div>
        </div>
        <span class="arr">{ARR}</span>
        <div class="pan" style="--c:var(--navy);--bg:var(--sky)">
          <div class="ph">{ic('phone','#fff')}<span>Paparan digital</span></div>
          <div class="st"><b>221,5 jt</b><span>pengguna internet, didominasi usia menikah <cite>(APJII 2024)</cite></span></div>
          <div class="st"><b>±50%</b><span>info gizi dari <i>influencer</i> dan tidak akurat <cite>(Denniss <i>et al.</i> 2024)</cite></span></div>
          <div class="find"><b>Temuan:</b> 73,0% mengakses media sosial hampir tiap jam</div>
        </div>
        <span class="arr">{ARR}</span>
        <div class="pan" style="--c:var(--slate);--bg:var(--lilac)">
          <div class="ph">{ic('search','#fff')}<span>Kesenjangan</span></div>
          <ul class="gap">
            <li>{ic('chart','#56718a')}<span>Efek edukasi daring beragam <cite>(Atmaka <i>et al.</i> 2022)</cite></span></li>
            <li>{ic('users','#56718a')}<span><i>Drop-out</i> tinggi <cite>(Eysenbach 2005)</cite></span></li>
            <li>{ic('phone','#56718a')}<span>HP terbatas, berbagi HP, sinyal tidak stabil</span></li>
          </ul>
          <div class="find"><b>Temuan:</b> hanya 38,9% menuntaskan semua instrumen</div>
        </div>
      </div>
      <span class="godown" style="display:block">{DOWN}</span>
      <div class="goal">{ic('target','#fff')}<span>Tujuan: (1) menganalisis penggunaan media sosial catin dan hubungannya dengan pengetahuan gizi, sikap HBM, dan IMT; (2) mengevaluasi pengembangan dan penerapan platform web SHINING.</span></div>
    </section>
  </div>

  <div class="row">
    <section class="card">
      {head(2,'Metode','navy','clip')}
      <div class="methgrid">
        <div class="meth">
          <div><span class="ico">{ic('flow','#1f3a68')}</span><p><b>Desain:</b> potong lintang dan evaluasi proses (model ADDIE)</p></div>
          <div><span class="ico">{ic('pin','#1f3a68')}</span><p><b>Lokasi & waktu:</b> Kota Binjai, Sumatera Utara; Juli–Oktober 2026</p></div>
          <div><span class="ico">{ic('users','#1f3a68')}</span><p><b>Subjek:</b> 198 catin (BKKBN dan KUA); 74 dianalisis (30 L, 44 P)</p></div>
          <div><span class="ico">{ic('clip','#1f3a68')}</span><p><b>Instrumen:</b> pengetahuan (KR-20 = 0,904), sikap HBM (α = 0,955), FFQ, IPAQ-SF</p></div>
          <div><span class="ico">{ic('chart','#1f3a68')}</span><p><b>Analisis:</b> Spearman, Mann-Whitney, Kruskal-Wallis (p &lt; 0,05)</p></div>
          <div><span class="ico">{ic('shield','#1f3a68')}</span><p><b>Etik:</b> No. 01.26.1986/KEPK/POLTEKKES KEMENKES MEDAN 2025</p></div>
        </div>
        <div>
          <div class="sub" style="--c:var(--green);margin-top:0">{ic('flow','#2e8a57')}Alur penelitian (model ADDIE)</div>
          <div class="addie">
            <div class="stp" style="--c:var(--navy)"><b>1</b><span class="si">{ic('search','#1f3a68')}</span><h3>Analisis</h3><p>Literatur, survei awal, kebutuhan catin</p></div><span class="arr">{ARR}</span>
            <div class="stp" style="--c:var(--teal)"><b>2</b><span class="si">{ic('bulb','#1f8a96')}</span><h3>Desain</h3><p>Konten dan alur berbasis HBM</p></div><span class="arr">{ARR}</span>
            <div class="stp" style="--c:var(--slate)"><b>3</b><span class="si">{ic('monitor','#56718a')}</span><h3>Pengem&shy;bangan</h3><p>Platform, materi, instrumen daring</p></div><span class="arr">{ARR}</span>
            <div class="stp on" style="--c:var(--navy)"><b>4</b><span class="si">{ic('users','#1f3a68')}</span><h3>Implemen&shy;tasi</h3><p>Rekrutmen, uji lapangan, perbaikan</p></div><span class="arr">{ARR}</span>
            <div class="stp on" style="--c:var(--green)"><b>5</b><span class="si">{ic('chart','#2e8a57')}</span><h3>Evaluasi</h3><p>Evaluasi proses dan media sosial</p></div>
          </div>
          <p class="note">Lingkaran penuh: tahap yang dilaporkan pada poster ini.</p>
        </div>
      </div>
    </section>
  </div>

  <div class="row" style="grid-template-columns:.86fr 1.3fr">
    <section class="card">
      {head('3.1','Hasil · Platform SHINING','slate','monitor')}
      <div class="platgrid">
        <div>
          <figure class="browser"><div class="bar"><i></i><i></i><i></i><span>mulai.edukasi-catin.id</span></div><div class="screen"><img src="laman-shining.png" alt="Laman awal dan login SHINING"></div></figure>
          <p class="note" style="text-align:center">Gambar 1. Laman awal dan login SHINING</p>
        </div>
        <ul class="feat">
          <li><span class="ico" style="--bg:var(--mint)">{ic('book','#2e8a57')}</span>Materi gizi berbasis bukti dan HBM</li>
          <li><span class="ico">{ic('wa','#1f3a68')}</span>Masuk dengan nama dan nomor WhatsApp</li>
          <li><span class="ico" style="--bg:var(--lilac)">{ic('save','#56718a')}</span>Progres tersimpan otomatis</li>
          <li><span class="ico" style="--bg:var(--tealbg)">{ic('check','#1f8a96')}</span>Instrumen evaluasi terintegrasi</li>
        </ul>
      </div>
    </section>
    <section class="card">
      {head('3.2','Hasil · Proses Pengembangan','green','cycle')}
      <div class="proch">
        <div class="cyc">{cyc}</div>
        <div class="vtl">
          {tl(1,'Akhir Juli','navy','Masalah','Persetujuan tidak tersimpan; status hanya di HP','Perbaikan','Skrip ditulis ulang; status dikonfirmasi server')}
          {tl(2,'Agustus','green','Uji kemudahan','15 mahasiswa: mudah (4,40–4,73 dari 5)','Catatan','Belum menangkap masalah lapangan')}
          {tl(3,'Awal Oktober','slate','Masalah','Progres hilang saat ganti HP; isian kosong','Perbaikan','Progres per nomor HP; validasi isian')}
          {tl(4,'Pertengahan Oktober','teal','Masalah','Blok makanan pokok FFQ hilang','Perbaikan','Simpan draf otomatis; blok wajib')}
          {tl(5,'Akhir Oktober','navy','Status','Pendaftaran kelompok kontrol ditutup','Tindak lanjut','Data dikunci untuk analisis')}
        </div>
      </div>
    </section>
  </div>

  <div class="row" style="grid-template-columns:1.12fr .88fr">
    <section class="card">
      {head('3.3','Penyelesaian Instrumen (n = 198)','navy','chart')}
      <table class="bars">
        <tr><th>Tahap</th><th></th><th class="r">n (%)</th><th class="r">Median</th></tr>
        {bar('Persetujuan',86.4,'–','navy','<td class="r">171 (86,4)</td>')}
        {bar('Identitas',81.3,'1,9 mnt','navy','<td class="r">161 (81,3)</td>')}
        {bar('Tes pengetahuan',54,'16,7 mnt','teal','<td class="r">107 (54,0)</td>',True)}
        {bar('Sikap HBM',48.5,'3,0 mnt','navy','<td class="r">96 (48,5)</td>')}
        {bar('FFQ',46.5,'5,5 mnt','navy','<td class="r">92 (46,5)</td>')}
        {bar('Media sosial',41.4,'3,2 mnt','navy','<td class="r">82 (41,4)</td>')}
        {bar('IPAQ-SF',41.4,'1,8 mnt','navy','<td class="r">82 (41,4)</td>')}
        {bar('Keenam instrumen',38.9,'–','green','<td class="r">77 (38,9)</td>',True)}
      </table>
      <p class="note">Penurunan terbesar sebelum tes pengetahuan (instrumen terpanjang).</p>
      <div class="callout">{ic('check','#2e8a57')}<span><b style="color:var(--green)">Iterasi berhasil:</b> kehilangan data FFQ turun dari 26,9% menjadi 0% setelah simpan draf otomatis (p = 0,04).</span></div>
    </section>
    <section class="card">
      {head('3.4','Media Sosial (n = 74)','teal','phone')}
      <table class="bars">
        {bar('WhatsApp utama',59.5,'59,5%','green')}
        {bar('TikTok/Instagram',33.8,'33,8%','slate')}
        {bar('Akses ±tiap jam',73,'73,0%','navy')}
        {bar('Durasi ≥3 jam/hari',51.4,'51,4%','teal')}
        {bar('Akun nakes/resmi',75.7,'75,7%','teal')}
        {bar('Influencer',39.2,'39,2%','navy')}
        {bar('Tertarik promosi',71.6,'71,6%','teal')}
      </table>
      <p class="note">Sumber informasi dapat dipilih lebih dari satu.</p>
    </section>
  </div>

  <div class="row" style="grid-template-columns:1fr 1fr">
    <section class="card">
      {head('3.5','Hubungan yang Bermakna','green','link')}
      <table class="rel">
        <tr><th>Variabel</th><th>Terhadap</th><th class="r">r<sub>s</sub></th><th class="r">p</th></tr>
        <tr><td>Skor pengetahuan</td><td>Sikap HBM</td><td class="r pos">+0,414</td><td class="r">&lt;0,001</td></tr>
        <tr><td>Cek kebenaran informasi</td><td>Sikap HBM</td><td class="r pos">+0,287</td><td class="r">0,014</td></tr>
        <tr><td>Platform utama<sup>a</sup></td><td>Sikap HBM</td><td class="r na">–</td><td class="r">0,006</td></tr>
        <tr><td>Durasi media sosial</td><td>IMT</td><td class="r neg">−0,331</td><td class="r">0,004</td></tr>
        <tr><td>Sumber akun nakes<sup>b</sup></td><td>IMT</td><td class="r na">–</td><td class="r">0,022</td></tr>
      </table>
      <p class="note">r<sub>s</sub>: Spearman. <sup>a</sup>Kruskal-Wallis (WhatsApp terendah). <sup>b</sup>Mann-Whitney; median IMT 22,5 vs 26,6 kg/m².</p>
    </section>
    <section class="card">
      {head('3.6','Menurut Peran Catin','slate','users')}
      <div class="key"><span>{ic('male','#1f3a68')}Laki-laki (n = 30)</span><span>{ic('female','#1f8a96')}Perempuan (n = 44)</span></div>
      <div class="grp">
        <div><div class="t">WhatsApp utama*</div>
          <div class="ln"><div class="track"><div class="fill" style="width:73.3%;--f:var(--navy)"></div></div><span>73,3%</span></div>
          <div class="ln"><div class="track"><div class="fill" style="width:50%;--f:var(--teal)"></div></div><span>50,0%</span></div></div>
        <div><div class="t">TikTok/Instagram utama*</div>
          <div class="ln"><div class="track"><div class="fill" style="width:20%;--f:var(--navy)"></div></div><span>20,0%</span></div>
          <div class="ln"><div class="track"><div class="fill" style="width:43.2%;--f:var(--teal)"></div></div><span>43,2%</span></div></div>
        <div><div class="t">Durasi ≥3 jam/hari*</div>
          <div class="ln"><div class="track"><div class="fill" style="width:36.7%;--f:var(--navy)"></div></div><span>36,7%</span></div>
          <div class="ln"><div class="track"><div class="fill" style="width:61.4%;--f:var(--teal)"></div></div><span>61,4%</span></div></div>
        <div><div class="t">Sikap positif (p = 0,053)</div>
          <div class="ln"><div class="track"><div class="fill" style="width:53.3%;--f:var(--navy)"></div></div><span>53,3%</span></div>
          <div class="ln"><div class="track"><div class="fill" style="width:75%;--f:var(--teal)"></div></div><span>75,0%</span></div></div>
      </div>
      <p class="note">*p &lt; 0,05 (khi-kuadrat)</p>
    </section>
  </div>

  <div class="row" style="grid-template-columns:1.5fr .62fr .78fr">
    <section class="card" style="background:#f4f9fa">
      {head(4,'Kesimpulan','teal','bulb')}
      <ul class="bul">
        <li>{ic('phone','#1f8a96')}<span>WhatsApp dan media sosial dipakai intensif: saluran strategis edukasi gizi prakonsepsi.</span></li>
        <li>{ic('scale','#1f8a96')}<span>Pengetahuan baik belum tecermin pada status gizi (<b>51,4%</b> gizi lebih): intervensi pranikah mendesak.</span></li>
        <li>{ic('cycle','#1f8a96')}<span>SHINING layak dan dapat berkelanjutan melalui BKKBN dan KUA.</span></li>
      </ul>
      <div class="sub" style="--c:var(--navy)">{ic('mega','#1f3a68')}Rekomendasi</div>
      <ul class="bul">
        <li>{ic('heart','#1f3a68')}<span><b>Edukasi:</b> latih cek fakta; arahkan ke akun tenaga kesehatan; pakai WhatsApp sebagai pengingat.</span></li>
        <li>{ic('monitor','#1f3a68')}<span><b>Platform:</b> instrumen ringkas, simpan draf otomatis, pemantauan langsung.</span></li>
      </ul>
    </section>
    <section class="card">
      {head(5,'Terima Kasih','green','heart')}
      <ul class="bul">
        <li>{ic('check','#2e8a57')}<span>Calon pengantin peserta</span></li>
        <li>{ic('check','#2e8a57')}<span>Pemkot Binjai, BKKBN, KUA</span></li>
        <li>{ic('check','#2e8a57')}<span>Tim peneliti dan enumerator</span></li>
      </ul>
    </section>
    <div class="access">
      <div class="qr"><img src="qr-shining.svg" alt="QR SHINING"></div>
      <div>
        <h3>{ic('qr','#bfe9ee')}Akses SHINING</h3>
        <div class="link">mulai.edukasi-catin.id</div>
        <ol><li>Pindai QR</li><li>Isi nama dan nomor WA</li><li>Setujui, lalu mulai</li></ol>
      </div>
    </div>
  </div>
</main>

<footer>{ic('sun','#bfe9ee')}<span><b>SHINING</b> · Sehat sebelum hamil itu penting: edukasi gizi ringkas, kredibel, dan mudah diakses</span></footer>
</div></body></html>'''

open(os.path.join(HERE, 'poster-shining-A0.html'), 'w').write(html)

# Generates poster/poster-shining-A0.html
I = {
 'book':'<path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>',
 'target':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
 'clip':'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3h6v3H9zM9 11h6M9 15h4"/>',
 'monitor':'<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
 'flow':'<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7.5 5H15a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h7.5"/>',
 'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 'cycle':'<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
 'chart':'<path d="M4 20V11M10 20V5M16 20v-7M22 20H2"/>',
 'phone':'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
 'link':'<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M8.6 7.5l6.8 9M9 6h6"/>',
 'users':'<circle cx="9" cy="8" r="4"/><path d="M1 21v-1a7 7 0 0 1 14 0v1"/><path d="M16 4.2a4 4 0 0 1 0 7.6M23 21v-1a7 7 0 0 0-5-6.7"/>',
 'bulb':'<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
 'mega':'<path d="M3 10v4a1 1 0 0 0 1 1h3l6 5V4L7 9H4a1 1 0 0 0-1 1z"/><path d="M17 8.5a5 5 0 0 1 0 7M20 6a8.5 8.5 0 0 1 0 12"/>',
 'qr':'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/>',
 'heart':'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
 'check':'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
 'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'scale':'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10a5 5 0 0 1 8 0"/><path d="M12 10l1.5-2"/>',
 'mail':'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/>',
 'wa':'<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z"/>',
 'pin':'<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
 'save':'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
 'shield':'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
 'female':'<circle cx="12" cy="5" r="3"/><path d="M8 22v-6H6l3-7h6l3 7h-2v6"/>',
 'male':'<circle cx="12" cy="5" r="3"/><path d="M8 10h8v6h-2v6h-4v-6H8z"/>',
}
def ic(name, color='currentColor', sw=2.1):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{I[name]}</svg>'

def head(n, title, color, icon):
    nn = f'<span class="n">{n}</span>' if n else ''
    return f'<h2 class="bn" style="--c:var(--{color})">{nn}<span class="tt">{title}</span><span class="hi">{ic(icon,"#fff")}</span></h2>'

def bar(label, pct, val, color, extra='', bold=False):
    cls=' class="hl"' if bold else ''
    return f'<tr{cls}><td class="lbl">{label}</td><td class="bar"><div class="track"><div class="fill" style="width:{pct}%;--f:var(--{color})"></div></div></td>{extra}<td class="r">{val}</td></tr>'

css = r'''
@page { size: 841mm 1189mm; margin: 0; }
:root{
  --ink:#1f2a36; --muted:#5b6672; --line:#d9dee4;
  --navy:#1f3a68; --blue:#1f3a68; --sky:#e7edf5;
  --green:#2e8a57; --mint:#e5f2ea; --teal:#1f8a96; --tealbg:#e2f1f3;
  --orange:#1f8a96; --peach:#e8f2f4; --red:#1b2f52; --rose:#eceff3;
  --purple:#5f7a91; --lilac:#e9eef3; --pink:#1f8a96; --gold:#8fa3b5;
  --slate:#5f7a91; --grey:#b9bec4;
  --dark:#1f3a68; --track:#e4e8ec;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:Calibri,Carlito,Arial,"Liberation Sans",sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.poster{position:relative;width:841mm;height:1189mm;overflow:hidden;display:flex;flex-direction:column;background:#f2f4f6}
.deco{position:absolute;z-index:0;pointer-events:none}
.poster>header,.poster>main,.poster>footer{position:relative;z-index:1}

/* header */
header{padding:0 24mm 9mm;display:grid;grid-template-columns:118mm 1fr 196mm;gap:10mm;align-items:center}
.pill{grid-column:1/-1;justify-self:center;background:linear-gradient(90deg,var(--dark),var(--green));color:#fff;font-weight:800;font-size:21pt;letter-spacing:.06em;padding:3.4mm 16mm;border-radius:0 0 8mm 8mm;margin-bottom:4mm}
.ipb{display:flex;flex-direction:column;align-items:center;gap:3mm}
.ipb img{width:60mm;height:60mm}
.ipb .wm{font-size:40pt;font-weight:800;color:var(--navy);line-height:1}
.ipb .loc{font-size:17pt;color:var(--muted)}
.ttl{text-align:center}
h1{font-size:66pt;line-height:1.05;font-weight:800;color:var(--dark);letter-spacing:-.01em}
h1 .sh{color:var(--dark)}
.subtitle{font-size:31pt;font-weight:800;color:var(--dark);margin-top:4mm;line-height:1.2}
.authors{font-size:25pt;font-weight:700;margin-top:5mm}
.authors sup,.affil sup{font-size:.6em}
.affil{font-size:17pt;color:var(--muted);margin-top:1.5mm;line-height:1.35}
.side{display:flex;flex-direction:column;gap:4mm}
.contact{display:flex;flex-direction:column;gap:2.4mm}
.contact div{display:grid;grid-template-columns:10mm 1fr;gap:3mm;align-items:center;font-size:18pt;line-height:1.3}
.contact .ci{width:10mm;height:10mm;border-radius:50%;background:var(--blue);display:grid;place-items:center}
.contact .ci svg{width:6mm;height:6mm}
.brand{background:var(--sky);border:.6mm solid #cfd8e3;border-radius:5mm;padding:5mm 7mm}
.brand .wm2{display:flex;align-items:center;gap:3mm;font-size:38pt;font-weight:800;color:var(--navy);line-height:1}
.brand .wm2 svg{width:13mm;height:13mm}
.brand .btag{font-size:19pt;font-weight:800;color:var(--orange);margin-top:1.5mm}
.brand p{font-size:16.5pt;color:var(--ink);line-height:1.35;margin-top:1mm}
.stripe{height:3.2mm;background:linear-gradient(90deg,var(--green),var(--teal),var(--blue),var(--purple),var(--red),var(--orange),var(--gold))}

/* body */
main{flex:1;padding:7mm 24mm 0;display:flex;flex-direction:column;gap:6mm;min-height:0}
.row{display:grid;gap:7mm;flex:1 1 auto}
.c3{grid-template-columns:1fr 1fr 1fr}
.c21{grid-template-columns:2fr 1fr}
.card{background:#fff;border:.6mm solid var(--line);border-radius:6mm;padding:0 9mm 6mm;box-shadow:0 1.2mm 3mm rgba(20,60,80,.06);display:flex;flex-direction:column;overflow:hidden}
h2.bn{display:flex;align-items:center;gap:4mm;margin:0 -9mm 6mm;padding:3.6mm 9mm;background:linear-gradient(90deg,var(--c),color-mix(in srgb,var(--c) 70%,#fff));color:#fff;font-size:33.5pt;font-weight:800;line-height:1.1}
h2.bn .n{flex:none;width:13mm;height:13mm;border-radius:50%;background:#fff;color:var(--c);font-size:20pt;display:grid;place-items:center}
h2.bn .tt{flex:1}
h2.bn .hi{flex:none;width:11mm;height:11mm;opacity:.9}
h2.bn .hi svg{width:100%;height:100%}
p,li{font-size:20pt;line-height:1.4}
p+p{margin-top:3mm}
b{font-weight:800}
.note{font-size:20pt;line-height:1.4;color:var(--muted);margin-top:3.5mm}
.sub{display:flex;align-items:center;gap:3mm;font-size:20pt;font-weight:800;color:var(--c,var(--green));margin:5mm 0 3mm}
.sub svg{width:9mm;height:9mm}

.goals{list-style:none;display:flex;flex-direction:column;gap:3mm}
.goals li{display:grid;grid-template-columns:11mm 1fr;gap:4mm}
.goals .k{width:11mm;height:11mm;border-radius:50%;background:var(--green);color:#fff;font-size:20pt;font-weight:800;display:grid;place-items:center;margin-top:.8mm}
.goals li:nth-child(2) .k{background:var(--blue)}
.kw{background:var(--peach);border-radius:3mm;padding:3mm 5mm;font-size:20pt;line-height:1.4;margin-top:4mm}
.kw b{color:var(--orange)}
.kw i{color:var(--ink)}

.abs{display:flex;flex-direction:column;gap:2.2mm}
.abs p{font-size:20pt;line-height:1.36;border-left:1.6mm solid var(--c);padding-left:3.5mm}
.abs p b{color:var(--c)}
.abs p+p{margin-top:0}
.story{display:grid;grid-template-columns:1fr 9mm 1fr 9mm 1fr;align-items:stretch}
.story .arr{align-self:center;text-align:center;font-style:normal;font-size:20pt;color:var(--muted)}
.pan{background:var(--bg);border-radius:4mm;padding:0 5mm 4mm;display:flex;flex-direction:column;gap:2.6mm;overflow:hidden}
.ph{display:flex;align-items:center;gap:3mm;margin:0 -5mm 1mm;padding:2.6mm 5mm;background:var(--c);color:#fff;font-weight:800;font-size:20pt}
.ph svg{width:8mm;height:8mm;flex:none}
.st{display:grid;grid-template-columns:auto 1fr;gap:3mm;align-items:center;background:#fff;border-radius:3mm;padding:2mm 3mm}
.st b{font-size:30.2pt;font-weight:800;color:var(--c);line-height:1;white-space:nowrap}
.st span,.pan p,.gap li{font-size:19.2pt;line-height:1.32}
.pan cite,.goal cite{font-style:normal;color:var(--muted);font-size:16.8pt}
.gap{list-style:none;display:flex;flex-direction:column;gap:2.4mm}
.gap li{display:grid;grid-template-columns:8mm 1fr;gap:2.5mm;background:#fff;border-radius:3mm;padding:2mm 3mm}
.gap svg{width:7mm;height:7mm;margin-top:.5mm}
.goal{display:grid;grid-template-columns:11mm 1fr;gap:4mm;align-items:center;margin-top:4mm;background:linear-gradient(90deg,var(--green),var(--teal));color:#fff;border-radius:4mm;padding:3.5mm 6mm;font-size:20pt;line-height:1.35}
.goal svg{width:11mm;height:11mm}
.goal span{font-weight:700}
.find{margin-top:auto;background:var(--c);color:#fff;border-radius:3mm;padding:2.2mm 3.5mm;font-size:18.6pt;line-height:1.3}
.find b{color:#fff}
.mini{display:flex;align-items:center;gap:1.5mm}
.mini div{flex:1;text-align:center}
.mini b{display:grid;place-items:center;width:15mm;height:15mm;margin:0 auto 1.5mm;border-radius:50%;border:1.1mm solid var(--c);color:var(--c);font-size:20pt;font-weight:800;background:#fff}
.mini .on b{background:var(--c);color:#fff}
.mini span{display:block;font-size:18.0pt;font-weight:700;color:var(--c);line-height:1.15}
.mini i{font-style:normal;font-size:20pt;color:var(--muted)}
.platgrid{display:grid;grid-template-columns:1.55fr 1fr;gap:6mm;align-items:center}
h2.bn .n{min-width:13mm;width:auto!important;padding:0 2.2mm;border-radius:7mm}
.col{display:flex;flex-direction:column;gap:7mm;min-height:0}
.col>.card{flex:1 1 auto}
.col>.access{flex:none;grid-template-columns:42mm 1fr;gap:5mm;padding:5mm 7mm}
.col>.access .qr{width:42mm;height:42mm}
.storyv{grid-template-columns:1fr!important;gap:0}
.storyv .arr{font-size:20pt;line-height:1;padding:1mm 0}
.storyv .pan{gap:2mm;display:grid!important;grid-template-columns:1fr 1fr;column-gap:3mm}
.storyv .pan>.ph,.storyv .pan>p,.storyv .pan>.find,.storyv .pan>.gap{grid-column:1/-1}
.storyv .st{grid-template-columns:auto 1fr}
.platv .feat{margin-top:3mm}
.procv{display:flex;flex-direction:column;align-items:center;gap:4mm}
.procv .cyc svg{width:100mm;height:100mm}
.vtl{width:calc(100% - 4mm);display:flex;flex-direction:column;gap:2.5mm;border-left:1mm solid var(--navy);margin-left:4mm;padding-left:6mm}
.vi{display:grid;grid-template-columns:34mm 1fr 1fr;gap:2.5mm;align-items:stretch;position:relative}
.vw{font-size:19.2pt;font-weight:700;color:var(--navy);line-height:1.2}
.vw .dot{position:absolute;left:-11.3mm;top:.5mm;width:9mm;height:9mm;border-radius:50%;background:var(--c);color:#fff;font-size:16.8pt;display:grid;place-items:center;border:.8mm solid #fff}
.vi .box{font-size:15.5pt;margin:0!important}
.col>.access{flex:none}
.proch{display:grid;grid-template-columns:95mm 1fr;gap:6mm;align-items:center}
.proch .cyc svg{width:95mm;height:95mm}
.pair{display:grid;grid-template-columns:1fr 1.15fr;gap:7mm;flex:none}
.pair>.card{padding-bottom:6mm}
.pair .access{grid-template-columns:40mm 1fr;gap:5mm;padding:5mm 6mm}
.pair .access .qr{width:40mm;height:40mm}
.grp{display:grid!important;grid-template-columns:1fr 1fr;column-gap:9mm}
.fig1{margin:0}
.fig1row{display:grid;grid-template-columns:1fr 7mm 1fr 7mm 1fr;align-items:stretch}
.fig1row .arr,.fig1 .arr.down{align-self:center;text-align:center;font-style:normal;font-size:18pt;color:var(--muted)}
.fig1 .arr.down{display:block;line-height:1;padding:1.5mm 0}
.fcol{display:flex;flex-direction:column}
.fcol .arr{text-align:center;font-style:normal;font-size:18pt;color:var(--muted);line-height:1;padding:1mm 0}
.fcol .pan{flex:1}
.fig1 .pan{gap:2mm;display:flex;flex-direction:column}

.fig1 .st{grid-template-columns:auto 1fr}
.fig1 .goal{margin-top:0}
.fig1 figcaption{font-size:16pt;color:var(--muted);text-align:center;margin-top:3mm;font-style:italic}
.fig1 figcaption b{font-style:normal;color:var(--ink)}
.methgrid{display:grid;grid-template-columns:1fr 1.05fr;gap:9mm;align-items:start}
.addie2{display:flex;align-items:flex-start;gap:1.5mm}
.addie2>i{font-style:normal;color:var(--muted);font-size:17pt;margin-top:5mm}
.st2{flex:1;text-align:center}
.st2 b{display:grid;place-items:center;width:15mm;height:15mm;margin:0 auto 2mm;border-radius:50%;border:1.1mm solid var(--c);color:var(--c);font-size:20pt;background:#fff}
.st2.on b{background:var(--c);color:#fff}
.st2 h3{font-size:17pt;color:var(--c);line-height:1.15}
.st2 p{font-size:14pt;color:var(--muted);line-height:1.3;margin-top:1.5mm}
.row>.access{grid-template-columns:44mm 1fr;gap:5mm}
.row>.access .qr{width:44mm;height:44mm}
.meth{display:flex;flex-direction:column;gap:3mm}
.meth div{display:grid;grid-template-columns:11mm 1fr;gap:4mm;align-items:start}
.meth .mi{width:11mm;height:11mm;border-radius:3mm;background:var(--sky);display:grid;place-items:center;margin-top:.6mm}
.meth .mi svg{width:7mm;height:7mm}
.meth p{font-size:20pt;line-height:1.38}
.meth b{color:var(--blue)}

.browser{width:100%;border:.6mm solid var(--line);border-radius:4mm;overflow:hidden;box-shadow:0 2mm 5mm rgba(80,40,120,.15);background:#fff}
.browser .bar{display:flex;align-items:center;gap:2mm;background:var(--lilac);padding:2.5mm 4mm}
.browser .bar i{width:3.2mm;height:3.2mm;border-radius:50%}
.browser .bar span{margin-left:3mm;flex:1;background:#fff;border-radius:3mm;padding:1mm 4mm;font-size:18.0pt;color:var(--muted)}
.browser .screen{position:relative;aspect-ratio:1752/781;background:var(--lilac)}
.browser .screen img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.chips{display:flex;flex-wrap:wrap;gap:2.5mm;margin-top:4mm;justify-content:center}
.chip{display:flex;align-items:center;gap:2mm;font-size:20pt;font-weight:700;padding:1.6mm 4mm;border-radius:10mm;background:var(--bg);color:var(--fg)}
.chip svg{width:6mm;height:6mm}

/* KPI */
.kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:8mm;flex:none}
.kpi{background:#fff;border:.6mm solid var(--line);border-top:2.4mm solid var(--c);border-radius:5mm;padding:5mm 7mm;display:grid;grid-template-columns:22mm 1fr;gap:5mm;align-items:center;box-shadow:0 1.2mm 3mm rgba(20,60,80,.06)}
.kpi .ki{width:22mm;height:22mm;border-radius:50%;background:color-mix(in srgb,var(--c) 14%,#fff);display:grid;place-items:center}
.kpi .ki svg{width:12mm;height:12mm}
.kpi .v{font-size:60.0pt;font-weight:800;color:var(--c);line-height:1}
.kpi .d{font-size:20pt;line-height:1.3;margin-top:1.5mm;color:var(--ink)}

/* ADDIE */
.addie{display:grid;grid-template-columns:repeat(5,1fr);gap:7mm}
.step{position:relative;text-align:center}
.step:not(:last-child)::after{content:"➜";position:absolute;right:-7mm;top:5.5mm;font-size:27.8pt;color:var(--muted)}
.step .ltr{width:22mm;height:22mm;margin:0 auto 3mm;border-radius:50%;border:1.4mm solid var(--c);color:var(--c);font-weight:800;font-size:34.7pt;display:grid;place-items:center;background:#fff}
.step.focus .ltr{background:var(--c);color:#fff;box-shadow:0 0 0 2mm color-mix(in srgb,var(--c) 22%,#fff)}
.step h3{font-size:20pt;font-weight:800;color:var(--c);line-height:1.15}
.step p{font-size:20pt;line-height:1.35;color:var(--muted);margin-top:1.5mm}
.legend{display:flex;gap:8mm;margin-top:5mm;font-size:20pt;color:var(--muted);justify-content:center}
.tag{display:inline-block;background:var(--red);color:#fff;font-size:16.8pt;font-weight:800;border-radius:2mm;padding:.6mm 2.4mm;margin-top:2mm}

.feat{list-style:none;display:flex;flex-direction:column;gap:3.5mm}
.feat li{display:grid;grid-template-columns:13mm 1fr;gap:4mm;align-items:center;font-size:20pt;line-height:1.33}
.feat .fi{width:13mm;height:13mm;border-radius:50%;background:var(--bg);display:grid;place-items:center}
.feat .fi svg{width:7.5mm;height:7.5mm}

/* proses */
.proc{display:grid;grid-template-columns:120mm 1fr;gap:9mm;align-items:center}
.cyc svg{width:120mm;height:120mm}
.tlh{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:5mm;padding-top:22mm}
.tlh::before{content:"";position:absolute;left:0;right:3mm;top:6mm;height:1mm;background:var(--navy)}
.tlh::after{content:"";position:absolute;right:0;top:4.2mm;border:2.3mm solid transparent;border-left:4mm solid var(--navy)}
.ts{position:relative}
.ts .dot{position:absolute;top:-21mm;left:50%;transform:translateX(-50%);width:11mm;height:11mm;border-radius:50%;background:var(--c);color:#fff;font-weight:800;font-size:20pt;display:grid;place-items:center;border:1mm solid #fff}
.ts .when{position:absolute;top:-9.5mm;left:0;right:0;text-align:center;font-size:20pt;font-weight:800;color:var(--navy)}
.box{border-radius:3mm;padding:2.6mm 4mm;font-size:20pt;line-height:1.35}
.box b{display:block;font-size:19.3pt;letter-spacing:.04em;text-transform:uppercase}
.box.m{background:var(--rose)} .box.m b{color:var(--red)}
.box.f{background:var(--mint);margin-top:2.5mm} .box.f b{color:var(--green)}

/* bars */
.bars{width:100%;border-collapse:collapse}
.bars th{font-size:19.9pt;font-weight:800;color:var(--muted);text-align:left;padding:0 0 2mm;border-bottom:.4mm solid var(--line)}
.bars th.r,.bars td.r{text-align:right;white-space:nowrap}
.bars td{padding:1.7mm 0;vertical-align:middle;font-size:20pt}
.bars td.lbl{padding-right:3mm;line-height:1.2}
.bars td.bar{width:40%;padding-right:3mm}
.bars td.r{padding-left:3mm}
.track{height:7mm;background:var(--track);border-radius:4mm;overflow:hidden}
.fill{height:100%;border-radius:4mm;background:linear-gradient(90deg,var(--f),color-mix(in srgb,var(--f) 65%,#fff))}
tr.hl td{font-weight:800}
.callout{display:grid;grid-template-columns:10mm 1fr;gap:3mm;background:var(--mint);border-radius:3mm;padding:3.4mm 5mm;margin-top:4mm;font-size:20pt;line-height:1.4}
.callout svg{width:10mm;height:10mm}

.rel{width:100%;border-collapse:separate;border-spacing:0 1.6mm}
.rel th{background:var(--green);color:#fff;font-size:20pt;font-weight:800;text-align:left;padding:2.6mm 3mm}
.rel th:first-child{border-radius:2mm 0 0 2mm}.rel th:last-child{border-radius:0 2mm 2mm 0}
.rel td{font-size:20pt;padding:2.2mm 3mm;line-height:1.25;background:#f6f9fa}
.rel td:nth-child(2){white-space:nowrap}
.rel .r{text-align:right;white-space:nowrap;font-weight:800}
.rel td.pos{background:var(--green);color:#fff;text-align:center}
.rel td.neg{background:var(--red);color:#fff;text-align:center}
.rel td.na{color:var(--muted);text-align:center}

.key{display:flex;gap:7mm;font-size:20pt;margin-bottom:3mm}
.key span{display:flex;align-items:center;gap:2mm}
.key svg{width:7mm;height:7mm}
.grp{display:flex;flex-direction:column;gap:3.6mm}
.grp .t{font-size:20pt;font-weight:800}
.grp .ln{display:grid;grid-template-columns:1fr 24mm;gap:3mm;align-items:center;margin-top:1.2mm}
.grp .ln span{font-size:20pt;text-align:right;font-weight:700}

.bul{list-style:none;display:flex;flex-direction:column;gap:3mm}
.bul li{display:grid;grid-template-columns:10mm 1fr;gap:3mm;font-size:20pt;line-height:1.38}
.bul li svg{width:9mm;height:9mm;margin-top:.8mm}

.band{flex:none;display:grid;grid-template-columns:1.25fr 1fr;gap:8mm}
.access{background:linear-gradient(90deg,var(--dark),#1f8a96);border-radius:6mm;color:#fff;padding:6mm 9mm;display:grid;grid-template-columns:50mm 1fr;gap:8mm;align-items:center}
.access .qr{width:50mm;height:50mm;background:#fff;border-radius:3mm;padding:3.4mm}
.access .qr img{width:100%;height:100%;display:block}
.access h3{font-size:31.2pt;font-weight:800;color:#bfe6ea;display:flex;align-items:center;gap:3mm}
.access h3 svg{width:10mm;height:10mm}
.access .link{font-size:20pt;font-weight:800;margin:1.5mm 0 2.5mm}
.access ol{list-style:none;counter-reset:s;display:flex;flex-direction:column;gap:1.6mm}
.access li{counter-increment:s;font-size:20pt;line-height:1.3;padding-left:10mm;position:relative}
.access li::before{content:counter(s);position:absolute;left:0;top:.3mm;width:7mm;height:7mm;border-radius:50%;background:var(--orange);color:#fff;font-size:16.8pt;font-weight:800;display:grid;place-items:center}
.thanks{background:#fff;border:.6mm solid var(--line);border-radius:6mm;padding:6mm 9mm}
.thanks h3{font-size:27.8pt;font-weight:800;color:var(--teal);display:flex;align-items:center;gap:3mm;margin-bottom:3mm}
.thanks h3 svg{width:9mm;height:9mm}
.thanks ul{list-style:none;display:flex;flex-direction:column;gap:1.8mm}
.thanks li{display:grid;grid-template-columns:8mm 1fr;gap:2.5mm;font-size:20pt;line-height:1.3}
.thanks li svg{width:7mm;height:7mm;margin-top:.5mm}

footer{margin-top:4mm;background:var(--dark);color:#e6f4ee;padding:5.5mm 24mm;display:flex;justify-content:center;gap:6mm;align-items:center;font-size:20pt;font-weight:600}
footer b{color:#bfe6ea}
footer svg{width:8mm;height:8mm}
'''

leaf = lambda x,y,r,s,o,col: f'<svg class="deco" style="left:{x}mm;top:{y}mm;width:{s}mm;height:{s}mm;opacity:{o};transform:rotate({r}deg)" viewBox="0 0 100 100"><path d="M50 95 C10 70 5 30 50 5 C95 30 90 70 50 95Z" fill="{col}"/><path d="M50 92 V12" stroke="#fff" stroke-width="2.5" fill="none"/><path d="M50 40 L30 28 M50 55 L28 44 M50 70 L32 61 M50 40 L70 28 M50 55 L72 44 M50 70 L68 61" stroke="#fff" stroke-width="2" fill="none"/></svg>'
decos = ''.join([
 leaf(-14,-6,-35,70,.22,'#8fa3b5'), leaf(30,-16,20,46,.16,'#b9bec4'),
 leaf(790,150,40,66,.18,'#8fa3b5'), leaf(812,118,-10,40,.14,'#b9bec4'),
 leaf(-18,560,-60,60,.14,'#8fa3b5'), leaf(800,640,60,56,.14,'#b9bec4'),
 leaf(-12,1080,-120,70,.18,'#8fa3b5'), leaf(790,1090,130,64,.18,'#8fa3b5'),
])

sun = '<svg viewBox="0 0 40 40"><g stroke="#1f8a96" stroke-width="3" stroke-linecap="round"><line x1="20" y1="2" x2="20" y2="8"/><line x1="20" y1="32" x2="20" y2="38"/><line x1="2" y1="20" x2="8" y2="20"/><line x1="32" y1="20" x2="38" y2="20"/><line x1="7.3" y1="7.3" x2="11.5" y2="11.5"/><line x1="28.5" y1="28.5" x2="32.7" y2="32.7"/><line x1="7.3" y1="32.7" x2="11.5" y2="28.5"/><line x1="28.5" y1="11.5" x2="32.7" y2="7.3"/></g><circle cx="20" cy="20" r="8" fill="#1f8a96"/></svg>'

# cycle diagram
def node(cx,cy,col,lines):
    t=''.join(f'<tspan x="{cx}" dy="{0 if i==0 else 8.6}">{l}</tspan>' for i,l in enumerate(lines))
    y0=cy-(len(lines)-1)*4.3+2.6
    return f'<circle cx="{cx}" cy="{cy}" r="27" fill="{col}"/><text x="{cx}" y="{y0}" text-anchor="middle" fill="#fff" font-size="7.4" font-weight="800" font-family="Calibri, Carlito, Arial">{t}</text>'
cyc = f'''<svg viewBox="0 0 200 200">
<defs><marker id="ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1b3a8a"/></marker></defs>
<circle cx="100" cy="100" r="68" fill="none" stroke="#c9d6e8" stroke-width="2" stroke-dasharray="4 4"/>
<g fill="none" stroke="#1b3a8a" stroke-width="2.4" marker-end="url(#ah)">
<path d="M126 38 A68 68 0 0 1 160 70"/><path d="M162 128 A68 68 0 0 1 130 160"/><path d="M72 162 A68 68 0 0 1 40 130"/><path d="M38 72 A68 68 0 0 1 70 40"/></g>
<circle cx="100" cy="100" r="28" fill="#fff" stroke="#2e8a57" stroke-width="3"/>
<text x="100" y="104" text-anchor="middle" font-size="11.5" font-weight="800" fill="#2e8a57" font-family="Calibri, Carlito, Arial">SHINING</text>
{node(100,32,'#1f3a68',['Pemantauan','& evaluasi'])}{node(168,100,'#1f8a96',['Perbaikan','sistem'])}{node(100,168,'#5f7a91',['Deteksi','masalah'])}{node(32,100,'#2e8a57',['Uji','lapangan'])}
</svg>'''

def tsv(n,when,col,mlab,m,flab,f):
    return f'<div class="vi" style="--c:var(--{col})"><div class="vw"><span class="dot">{n}</span>{when}</div><div class="box m"><b>{mlab}</b>{m}</div><div class="box f"><b>{flab}</b>{f}</div></div>'
def ts(n,when,col,mlab,m,flab,f):
    return f'<div class="ts" style="--c:var(--{col})"><div class="dot">{n}</div><div class="when">{when}</div><div class="box m"><b>{mlab}</b>{m}</div><div class="box f"><b>{flab}</b>{f}</div></div>'

html = f'''<!doctype html>
<html lang="id"><head><meta charset="utf-8"><title>Poster SHINING A0</title>
<style>{css}</style></head>
<body><div class="poster">
{decos}
<header>
  <div class="pill">SEMINAR SEKOLAH PASCASARJANA IPB · PROGRAM STUDI ILMU GIZI</div>
  <div class="ipb"><img src="logo-ipb.svg" alt="Logo IPB University"><div class="wm">IPB University</div><div class="loc">—— Bogor Indonesia ——</div></div>
  <div class="ttl">
    <h1>Pengembangan Media Edukasi Gizi Online <span class="sh">SHINING</span> bagi Calon Pengantin</h1>
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
    <div class="brand"><div class="wm2">{sun}SHINING</div><div class="btag">Sehat Sebelum Hamil itu Penting</div><p>Program edukasi gizi prakonsepsi daring berbasis <i>Health Belief Model</i> (HBM)</p></div>
  </div>
</header>
<div class="stripe"></div>

<main>
  <div class="row" style="grid-template-columns:.85fr 2.15fr">
    <section class="card">
      {head(None,'Abstrak','orange','book')}
      <div class="abs">
        <p style="--c:var(--orange)"><b>Latar belakang.</b> Bukti tentang penggunaan media sosial calon pengantin (catin) dan kinerja platform edukasi gizi prakonsepsi daring di Indonesia masih terbatas.</p>
        <p style="--c:var(--green)"><b>Tujuan.</b> Menganalisis penggunaan media sosial catin dan hubungannya dengan pengetahuan gizi, sikap HBM, dan IMT, serta mengevaluasi pengembangan platform SHINING.</p>
        <p style="--c:var(--blue)"><b>Metode.</b> Potong lintang dan evaluasi proses (ADDIE) di Kota Binjai, Juli–Oktober 2026; 198 catin memenuhi syarat, 74 dianalisis.</p>
        <p style="--c:var(--purple)"><b>Hasil.</b> Sebanyak 38,9% catin menuntaskan keenam instrumen. WhatsApp menjadi platform utama (59,5%). Pengetahuan berkorelasi dengan sikap HBM (r<sub>s</sub> = 0,414; p &lt; 0,001), dan 51,4% catin berat badan lebih atau obesitas.</p>
        <p style="--c:var(--red)"><b>Simpulan.</b> SHINING layak dikembangkan; perbaikan berulang menutup celah kehilangan data, tetapi instrumen yang panjang masih menjadi titik putus utama.</p>
      </div>
      <div class="kw"><b>Kata kunci:</b> calon pengantin, edukasi gizi, prakonsepsi, media sosial, <i>Health Belief Model</i></div>
    </section>
    <section class="card">
      {head(1,'Pendahuluan','green','bulb')}
      <figure class="fig1">
        <div class="fig1row">
        <div class="pan" style="--c:var(--orange);--bg:var(--peach)">
          <div class="ph">{ic('scale','#fff')}<span>Masalah gizi prakonsepsi</span></div>
          <div class="st"><b>±50%</b><span>orang dewasa Indonesia berat badan berlebih atau obesitas <cite>(Pengpid dan Peltzer 2017)</cite></span></div>
          <div class="st"><b>±50%</b><span>catin berpengetahuan gizi kurang <cite>(Melani dan Kuswari 2019; Zahra <i>et al.</i> 2024)</cite></span></div>
          <p>Masa prakonsepsi kritis bagi calon ayah, ibu, dan anak, namun sering diabaikan <cite>(Stephenson <i>et al.</i> 2018)</cite></p>
          <div class="find"><b>Temuan kami:</b> 51,4% catin berat badan lebih atau obesitas, meski 59,5% berpengetahuan baik</div>
        </div>
        <i class="arr">➜</i>
        <div class="pan" style="--c:var(--blue);--bg:var(--sky)">
          <div class="ph">{ic('phone','#fff')}<span>Paparan digital</span></div>
          <div class="st"><b>221,5 jt</b><span>pengguna internet, didominasi milenial dan gen-Z yang akan menikah <cite>(APJII 2024)</cite></span></div>
          <div class="st"><b>±50%</b><span>unggahan gizi dari akun <i>influencer</i> dan tidak akurat <cite>(Denniss <i>et al.</i> 2024)</cite></span></div>
          <p>Usia produktif aktif mencari info kesehatan di media sosial <cite>(Lim <i>et al.</i> 2022)</cite>, padahal misinformasi gizi menyebar luas <cite>(Wang <i>et al.</i> 2019; Suarez-Lledo dan Alvarez-Galvez 2021)</cite>. Dalam HBM, media sosial menjadi isyarat untuk bertindak <cite>(Janz dan Becker 1984)</cite></p>
          <div class="find"><b>Temuan kami:</b> 73,0% mengakses media sosial hampir tiap jam; WhatsApp platform utama (59,5%)</div>
        </div>
        <i class="arr">➜</i>
        <div class="pan" style="--c:var(--purple);--bg:var(--lilac)">
          <div class="ph">{ic('target','#fff')}<span>Kesenjangan</span></div>
          <ul class="gap">
            <li>{ic('chart','#5f7a91')}<span>Edukasi <i>online</i> catin dan intervensi berbasis HP: hasil beragam dan efek terbatas <cite>(Atmaka <i>et al.</i> 2022; Musgrave <i>et al.</i> 2023)</cite></span></li>
            <li>{ic('users','#5f7a91')}<span>Angka <i>drop-out</i> tinggi <cite>(Eysenbach 2005; Meyerowitz-Katz <i>et al.</i> 2020)</cite></span></li>
            <li>{ic('phone','#5f7a91')}<span>Proses pengembangan platform jarang dilaporkan <cite>(Eysenbach 2011)</cite>; HP spesifikasi rendah, berbagi HP, dan jaringan tidak stabil umum terjadi</span></li>
          </ul>
          <div class="find"><b>Temuan kami:</b> 38,9% menuntaskan keenam instrumen; perbaikan berulang menutup celah kehilangan data</div>
        </div>
        </div>
        <i class="arr down">⬇</i>
        <div class="goal">{ic('sun','#fff')}<span><b>Tujuan:</b> (1) menganalisis penggunaan media sosial catin dan hubungannya dengan pengetahuan gizi prakonsepsi, sikap HBM, dan IMT; (2) mengevaluasi pengembangan dan penerapan platform web SHINING, sebagai dasar edukasi gizi prakonsepsi <i>online</i> yang mudah diakses dan berkelanjutan.</span></div>
      </figure>
    </section>
  </div>
  <div class="row">
    <section class="card">
      {head(2,'Metode','blue','clip')}
      <div class="methgrid"><div class="meth">
        <div><span class="mi">{ic('flow','#1f3a68')}</span><p><b>Desain:</b> potong lintang dan evaluasi proses (tahap pengembangan model ADDIE)</p></div>
        <div><span class="mi">{ic('pin','#1f3a68')}</span><p><b>Tempat dan waktu:</b> Kota Binjai, Sumatera Utara; Juli–Oktober 2026</p></div>
        <div><span class="mi">{ic('users','#1f3a68')}</span><p><b>Subjek:</b> 198 catin memenuhi syarat (jalur BKKBN dan KUA); 74 dianalisis (data lengkap dan valid; 30 laki-laki, 44 perempuan)</p></div>
        <div><span class="mi">{ic('clip','#1f3a68')}</span><p><b>Instrumen:</b> identitas, pengetahuan 48 butir (KR-20 = 0,904), sikap HBM 24 butir (α = 0,955), FFQ, IPAQ-SF, media sosial</p></div>
        <div><span class="mi">{ic('chart','#1f3a68')}</span><p><b>Analisis:</b> Spearman, Mann-Whitney, Kruskal-Wallis; p &lt; 0,05</p></div>
        <div><span class="mi">{ic('shield','#1f3a68')}</span><p><b>Etik:</b> KEPK Poltekkes Kemenkes Medan No. 01.26.1986/KEPK/POLTEKKES KEMENKES MEDAN 2025</p></div>
      </div>
<div class="addv">
        <div class="sub" style="--c:var(--green);margin-top:0">{ic('flow','#2e8a57')}Alur penelitian (model ADDIE)</div>
        <div class="addie2">
          <div class="st2" style="--c:var(--blue)"><b>1</b><h3>Analisis kebutuhan</h3><p>Kajian literatur, survei awal, analisis kebutuhan catin</p></div><i>➜</i>
          <div class="st2" style="--c:var(--teal)"><b>2</b><h3>Desain media</h3><p>Konten dan alur berbasis HBM</p></div><i>➜</i>
          <div class="st2" style="--c:var(--purple)"><b>3</b><h3>Pengem&shy;bangan</h3><p>Platform SHINING, materi, instrumen daring</p></div><i>➜</i>
          <div class="st2 on" style="--c:var(--navy)"><b>4</b><h3>Implemen&shy;tasi</h3><p>Rekrutmen catin, uji lapangan, perbaikan berulang</p></div><i>➜</i>
          <div class="st2 on" style="--c:var(--green)"><b>5</b><h3>Evaluasi</h3><p>Evaluasi proses dan pola media sosial</p></div>
        </div>
        <p class="note">Lingkaran penuh: tahap yang dilaporkan pada poster ini.</p>
      </div></div>
    </section>
  </div>
  <div class="row" style="grid-template-columns:.85fr 1.3fr">
    <section class="card">
      {head('3.1','Hasil · Platform SHINING','purple','monitor')}
      <div class="platgrid"><div><figure class="browser">
          <div class="bar"><i style="background:#b9bec4"></i><i style="background:#b9bec4"></i><i style="background:#b9bec4"></i><span>mulai.edukasi-catin.id</span></div>
          <div class="screen"><img src="laman-shining.png" alt="Laman awal dan login SHINING"></div>
        </figure>
        <p class="note" style="text-align:center">Gambar 1. Laman awal dan login SHINING</p></div>
      <ul class="feat">
        <li><span class="fi" style="--bg:var(--mint)">{ic('book','#2e8a57')}</span>Materi gizi prakonsepsi berbasis bukti dan konstruk HBM</li>
        <li><span class="fi" style="--bg:var(--sky)">{ic('phone','#1f3a68')}</span>Ramah HP; masuk dengan nama dan nomor WhatsApp</li>
        <li><span class="fi" style="--bg:var(--lilac)">{ic('save','#5f7a91')}</span>Progres dan draf tersimpan otomatis per nomor HP</li>
        <li><span class="fi" style="--bg:var(--peach)">{ic('check','#1f8a96')}</span>Instrumen terintegrasi: pengetahuan, sikap HBM, FFQ, IPAQ-SF</li>
      </ul></div>
    </section>
    <section class="card">
      {head('3.2','Hasil · Proses Pengembangan Platform','green','cycle')}
      <div class="proch">
        <div class="cyc">{cyc}</div>
        <div class="vtl">
          {tsv(1,'Akhir Juli','blue','Masalah','Persetujuan tidak tersimpan; angka nol nomor HP hilang; status selesai hanya di HP peserta','Perbaikan','Skrip ditulis ulang; status selesai dikonfirmasi server; cegah kirim ganda')}
          {tsv(2,'Agustus','green','Uji kemudahan','15 mahasiswa menilai mudah (rerata 4,40–4,73 dari 5); terendah pada pengisian kuesioner','Catatan','Tidak menangkap masalah yang kemudian muncul di lapangan')}
          {tsv(3,'Awal Oktober','purple','Masalah','Progres hilang saat berganti HP; isian kosong','Perbaikan','Progres dilacak per nomor HP; validasi isian; kirim ulang otomatis')}
          {tsv(4,'Pertengahan Oktober','orange','Masalah','Blok makanan pokok FFQ hilang saat dikirim; halaman awal bertahap-tahap','Perbaikan','Simpan draf otomatis; blok wajib; persetujuan berlapis')}
          {tsv(5,'Akhir Oktober','teal','Status','Pendaftaran kelompok kontrol ditutup','Tindak lanjut','Data dikunci untuk analisis')}
        </div>
      </div>
    </section>
  </div>
  <div class="row" style="grid-template-columns:1.15fr .85fr">
    <section class="card">
      {head('3.3','Penyelesaian Instrumen (n = 198)','blue','chart')}
      <table class="bars">
        <tr><th>Tahap</th><th></th><th class="r">n (%)</th><th class="r">Median</th></tr>
        {bar('Persetujuan',86.4,'–','blue','<td class="r">171 (86,4)</td>')}
        {bar('Identitas',81.3,'1,9 mnt','blue','<td class="r">161 (81,3)</td>')}
        {bar('Tes pengetahuan',54,'16,7 mnt','red','<td class="r">107 (54,0)</td>',True)}
        {bar('Sikap HBM',48.5,'3,0 mnt','blue','<td class="r">96 (48,5)</td>')}
        {bar('FFQ',46.5,'5,5 mnt','blue','<td class="r">92 (46,5)</td>')}
        {bar('Media sosial',41.4,'3,2 mnt','blue','<td class="r">82 (41,4)</td>')}
        {bar('IPAQ-SF',41.4,'1,8 mnt','blue','<td class="r">82 (41,4)</td>')}
        {bar('Keenam instrumen',38.9,'–','navy','<td class="r">77 (38,9)</td>',True)}
      </table>
      <p class="note">Penurunan terbesar terjadi sebelum tes pengetahuan, instrumen terpanjang. Kiriman berulang mencapai 13,8% rekaman.</p>
      <div class="callout">{ic('check','#2e8a57')}<span><b style="color:var(--green)">Iterasi berhasil:</b> blok makanan pokok FFQ yang hilang pada 26,9% kiriman tidak terjadi lagi setelah simpan draf otomatis (0 dari 13; p = 0,04).</span></div>
    </section>
    <section class="card">
      {head('3.4','Penggunaan Media Sosial (n = 74)','teal','phone')}
      <table class="bars">
        {bar('WhatsApp utama',59.5,'59,5%','green')}
        {bar('TikTok/Instagram',33.8,'33,8%','purple')}
        {bar('Akses ±tiap jam',73,'73,0%','blue')}
        {bar('Durasi ≥3 jam/hari',51.4,'51,4%','orange')}
        {bar('Akun nakes/resmi',75.7,'75,7%','teal')}
        {bar('Influencer',39.2,'39,2%','red')}
        {bar('Tertarik produk promosi',71.6,'71,6%','pink')}
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
        <tr><td>Memeriksa kebenaran informasi</td><td>Sikap HBM</td><td class="r pos">+0,287</td><td class="r">0,014</td></tr>
        <tr><td>Platform utama (WhatsApp terendah)<sup>a</sup></td><td>Sikap HBM</td><td class="r na">–</td><td class="r">0,006</td></tr>
        <tr><td>Durasi harian media sosial</td><td>IMT</td><td class="r neg">−0,331</td><td class="r">0,004</td></tr>
        <tr><td>Sumber akun nakes/resmi<sup>b</sup></td><td>IMT</td><td class="r na">–</td><td class="r">0,022</td></tr>
      </table>
      <p class="note">r<sub>s</sub>: korelasi Spearman. <sup>a</sup>Kruskal-Wallis. <sup>b</sup>Mann-Whitney; median IMT 22,5 vs 26,6 kg/m². Frekuensi akses, pengetahuan, dan sikap tidak berhubungan dengan IMT.</p>
    </section>
    <section class="card">
      {head('3.6','Menurut Peran Catin','purple','users')}
      <div class="key"><span>{ic('male','#1f3a68')}Laki-laki (n = 30)</span><span>{ic('female','#1f8a96')}Perempuan (n = 44)</span></div>
      <div class="grp">
        <div><div class="t">WhatsApp platform utama*</div>
          <div class="ln"><div class="track"><div class="fill" style="width:73.3%;--f:var(--blue)"></div></div><span>73,3%</span></div>
          <div class="ln"><div class="track"><div class="fill" style="width:50%;--f:var(--pink)"></div></div><span>50,0%</span></div></div>
        <div><div class="t">TikTok/Instagram platform utama*</div>
          <div class="ln"><div class="track"><div class="fill" style="width:20%;--f:var(--blue)"></div></div><span>20,0%</span></div>
          <div class="ln"><div class="track"><div class="fill" style="width:43.2%;--f:var(--pink)"></div></div><span>43,2%</span></div></div>
        <div><div class="t">Durasi ≥3 jam/hari*</div>
          <div class="ln"><div class="track"><div class="fill" style="width:36.7%;--f:var(--blue)"></div></div><span>36,7%</span></div>
          <div class="ln"><div class="track"><div class="fill" style="width:61.4%;--f:var(--pink)"></div></div><span>61,4%</span></div></div>
        <div><div class="t">Sikap positif (p = 0,053)</div>
          <div class="ln"><div class="track"><div class="fill" style="width:53.3%;--f:var(--blue)"></div></div><span>53,3%</span></div>
          <div class="ln"><div class="track"><div class="fill" style="width:75%;--f:var(--pink)"></div></div><span>75,0%</span></div></div>
      </div>
      <p class="note">*p &lt; 0,05 (khi-kuadrat)</p>
    </section>
  </div>
  <div class="row" style="grid-template-columns:1.45fr .6fr .75fr">
    <section class="card" style="background:#f3f8f9">
      {head(4,'Kesimpulan','teal','bulb')}
      <ul class="bul">
        <li>{ic('phone','#1f8a96')}<span>Media sosial, terutama WhatsApp, digunakan catin secara intensif sehingga menjadi saluran strategis edukasi gizi prakonsepsi.</span></li>
        <li>{ic('book','#1f8a96')}<span>Pengetahuan yang baik dan sikap HBM yang positif belum tecermin pada status gizi: <b>51,4%</b> catin berat badan lebih atau obesitas, sehingga intervensi sebelum kehamilan perlu segera diperkuat.</span></li>
        <li>{ic('cycle','#1f8a96')}<span>Platform SHINING layak dikembangkan; perbaikan berulang menutup celah kehilangan data dan menjadi landasan edukasi pranikah yang berkelanjutan melalui BKKBN dan KUA.</span></li>
      </ul>
      <div class="sub" style="--c:var(--navy);margin-top:5mm">{ic('mega','#1f3a68')}Rekomendasi</div>
      <ul class="bul">
        <li>{ic('heart','#1b2f52')}<span><b style="color:var(--red)">Edukasi:</b> latih verifikasi informasi, arahkan catin ke akun tenaga kesehatan yang kredibel, ingatkan bahaya produk tanpa izin edar, dan manfaatkan WhatsApp sebagai saluran pengingat.</span></li>
        <li>{ic('monitor','#1b2f52')}<span><b style="color:var(--red)">Platform:</b> instrumen ringkas dan berurutan logis, simpan draf otomatis, serta pemantauan data secara langsung selama pengumpulan data.</span></li>
      </ul>
    </section>
      <section class="card">
        {head(5,'Ucapan Terima Kasih','green','heart')}
        <ul class="bul">
          <li>{ic('check','#2e8a57')}<span>Para calon pengantin peserta penelitian</span></li>
          <li>{ic('check','#2e8a57')}<span>Pemerintah Kota Binjai, BKKBN, dan KUA</span></li>
          <li>{ic('check','#2e8a57')}<span>Tim peneliti dan enumerator lapangan</span></li>
        </ul>
      </section>
      <div class="access">
        <div class="qr"><img src="qr-shining.svg" alt="QR SHINING"></div>
        <div>
          <h3>{ic('qr','#bfe6ea')}Akses SHINING</h3>
          <div class="link">mulai.edukasi-catin.id</div>
          <ol><li>Pindai QR atau buka tautan.</li><li>Isi nama dan nomor WhatsApp.</li><li>Baca persetujuan, lalu mulai.</li></ol>
        </div>
      </div>
  </div>
</main>

<footer>{sun.replace('<svg ','<svg style="width:9mm;height:9mm" ')}<span><b>SHINING</b> · Sehat sebelum hamil itu penting: edukasi gizi ringkas, kredibel, dan mudah diakses bagi calon pengantin</span></footer>
</div></body></html>'''
html = html.replace('var(--navy)"></div>','var(--navy)"></div>')
open('/home/user/food_diary/poster/poster-shining-A0.html','w').write(html)

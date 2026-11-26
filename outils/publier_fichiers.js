// Met en ligne, tels quels, des fichiers « Formulaire web » produits par le générateur.
// usage : node publier_fichiers.js fichier1.html fichier2.html …   puis git add/commit/push dans /home/claude/releves-survey
const fs = require('fs'), path = require('path');
const REPO = process.env.REPO || require('path').resolve(__dirname, '..');
const clean = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
const out = [];
process.argv.slice(2).forEach((f) => {
  try {
    const html = fs.readFileSync(f, 'utf8'), m = html.match(/\/\*__DATA__\*\/(\{[\s\S]*?\});\r?\n/);
    if (!m) throw new Error('pas un formulaire web du générateur');
    const d = JSON.parse(m[1]), fi = d.fiche || {};
    if (d.format !== 'fiche-survey') throw new Error('format inattendu');
    if (!/^[a-z2-7]{16}$/.test(fi.lien || '')) throw new Error('lien absent : régénérer le formulaire depuis le générateur');
    if (!/var ENVOI = 'https:\/\/script\.google\.com\//.test(html)) throw new Error('adresse d’envoi absente');
    const n = d.zones.reduce((a, z) => a + z.elements.length, 0), tot = d.zones.filter((z) => z.totem), sansNom = d.zones.filter((z) => !z.nom).length;
    const miss = d.photos.filter((p) => !p.image).length; if (miss) throw new Error(miss + ' photo(s) sans image');
    fs.mkdirSync(path.join(REPO, 'r', fi.lien), { recursive: true }); fs.writeFileSync(path.join(REPO, 'r', fi.lien, 'index.html'), html);
    const dir = clean(fi.pr || 'PR-a-confirmer') + '_' + clean(fi.site || fi.enseigne || 'site'), dd = path.join(REPO, 'fiches', dir); fs.mkdirSync(dd, { recursive: true });
    const light = JSON.parse(JSON.stringify(d)); light.photos.forEach((p) => { delete p.image; }); fs.writeFileSync(path.join(dd, 'donnees-fiche.json'), JSON.stringify(light, null, 1));
    const url = 'https://anthonyhuyghebaert-ops.github.io/releves-survey/r/' + fi.lien + '/';
    fs.writeFileSync(path.join(dd, 'LISEZ-MOI.md'), '# ' + (fi.pr || 'PR à confirmer') + ' · ' + (fi.enseigne || '') + ' · ' + (fi.site || '') + '\n\n- Fiche : version ' + fi.version + '\n- Lien du poseur : ' + url + '\n- Lien d’essai : ' + url + '?essai=1\n- ' + n + ' points, ' + d.zones.length + ' zones' + (tot.length ? ', dont ' + tot.length + ' zone(s) Totem' : '') + '\n');
    out.push({ ok: true, pr: fi.pr, site: fi.site, v: fi.version, lien: fi.lien, points: n, zones: d.zones.length, totems: tot.length, zonesSansNom: sansNom, url });
  } catch (e) { out.push({ ok: false, fichier: path.basename(f), erreur: e.message }); }
});
console.log(JSON.stringify(out, null, 1));

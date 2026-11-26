# releves-survey

Formulaires web de relevé de cotes (DT Signs × DK Printing), servis par GitHub Pages.

- Un relevé = un dossier `r/<code>/index.html`. Le code (16 caractères tirés au hasard) est celui de la fiche dans le générateur ; il est imprimé en QR code sur la page de garde du PDF.
- Adresse : `https://anthonyhuyghebaert-ops.github.io/releves-survey/r/<code>/`
- Le fichier `index.html` d'un relevé est le `Releve_web_….html` produit par le générateur (« Générer le formulaire web du poseur »), déposé tel quel.
- La page d'accueil ne liste aucun dossier ; `robots.txt` et la balise `noindex` demandent aux moteurs de ne rien référencer. Le site reste public : toute personne qui a le lien voit le relevé.
- Retirer un relevé : supprimer son dossier dans `r/`.

## Dossiers par fiche
- `fiches/<PR>_<Site>/LISEZ-MOI.md` : résumé de la fiche (version, lien du poseur, zones, nombre de points) et `donnees-fiche.json`.
- `fiches/LISEZ-MOI.md` : la liste de toutes les fiches en ligne.
- Les relevés envoyés par les poseurs ne sont pas ici : ils arrivent dans Google Drive, dossier « Relevés survey (web) », un sous-dossier par PR.

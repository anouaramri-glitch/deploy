# Validation du site corrigé

Le site statique se trouve dans `deploy/`. La publication finale a été explicitement autorisée par l’utilisateur. La production et l’aperçu main ont été publiés avec succès ; les ressources ont été vérifiées en HTTP 200 et comparées octet par octet aux fichiers locaux. Le projet Cloudflare Pages correspondant à l’adresse fournie est `smartcertificate` ; la page publique est `https://smartcertificate.pages.dev/`.

## Aperçus et loupe sur les deux pages

Le même fichier `deploy/preview-diplome.png`, rendu depuis le PDF original, alimente l’aperçu principal et la vignette du profil. Une petite loupe est superposée en bas à droite de chaque image.

Le survol avec une souris agrandit l’image de 10 %, avec une transition de 320 ms et un centre fixe aligné sur le cadre intérieur. Le zoom est contenu dans une fenêtre dédiée à l’image : les cartes, boutons et textes autour restent à leur place, et l’icône de loupe reste fixe. Le départ de la souris ramène progressivement l’image à sa taille initiale. Le clavier obtient le même agrandissement au focus ; la préférence de réduction des animations est respectée.

L’image mesure 1600 × 1154 pixels ; son cadre intérieur occupe approximativement `[88, 88, 1513, 1066]`. L’origine retenue est `50.03% 50%`. L’échelle commune de 1.10 conserve le cadre, les textes et les signatures sur les deux vues ; 1.15 couperait le cadre dans la vignette. Les repères et marges extérieures au cadre peuvent être recadrés par l’effet, sans modifier le PDF ni le PNG.

Sur écran tactile, les liens natifs conservent leur comportement : l’aperçu principal ouvre le PDF et la vignette du profil revient au document. Aucun survol artificiel permanent n’est ajouté. Les loupes sont masquées si l’aperçu ne se charge pas.

Les étapes Windows, les chemins corrects, le stockage GitHub/local et les modifications futures sont décrits dans `PUBLICATION.md`.

Validation ciblée du zoom : 16 scénarios réussis, comprenant huit cas de survol (document/profil, FR/EN, largeurs 1440 et 390 px), deux cas clavier, deux cas tactiles émulés, deux cas d’image manquante et deux cas avec réduction des animations. Les mesures montrent une échelle intermédiaire pendant la transition, puis 1.10, et un retour à 1.00. Le cadre intérieur reste intégralement visible ; la marge minimale mesurée est d’environ 2,51 px sur la vignette du profil. Les positions des cartes, métadonnées et loupes restent identiques pendant le zoom.

Les liens de navigation PDF ont été contrôlés avec une réponse locale dédiée à la navigation afin d’éviter les particularités du lecteur PDF intégré de Chromium. Les contrôles de chargement et d’empreinte du vrai PDF sont restés actifs. Les 44 textes et les traductions sont inchangés ; le PDF, le PNG d’aperçu, le reçu et le logo sont identiques octet par octet à la version précédente. Rapports et captures : `/workspace/review/deploy-validation/preview-zoom/`.

## Modale conforme à la référence fournie

Le bouton « Valider la réception blockchain » ouvre un panneau bleu contenant uniquement :

1. Le cadenas blanc et le titre « Vérification de la blockchain » sur la même ligne.
2. Le paragraphe de la référence, avec seulement **« preuve inaltérable »** en gras. La formulation « l’horodatage le moment auquel » est conservée telle qu’elle figure sur l’image.
3. La barre translucide, l’icône décorative et le caractère `@`.

Les anciens blocs de contexte, résultats détaillés, empreintes et dépôt de fichier ont été retirés de cette modale. Le caractère `@` est celui de la maquette ; il ne remplace pas une donnée blockchain vérifiée.

Dimensions vérifiées sur ordinateur : panneau de 955 × 452 px ; marges intérieures de 80 px ; titre Roboto 40 px / 48 px ; paragraphe Roboto 20 px / 27 px ; barre de 795 × 47 px. Les cinq retours à la ligne français correspondent à ceux de la référence. Le bleu utilisé est `#4066ff`, choisi d’après le visuel fourni. Aucun style global de la page n’a été modifié pour cette adaptation.

Le panneau est centré sur un arrière-plan noir à 60 %. Il s’adapte aux écrans plus étroits. La fermeture reste possible avec Échap et le clic sur l’arrière-plan. Un bouton de fermeture accessible apparaît au focus clavier ; il est masqué dans l’affichage normal pour respecter l’image. Le focus est contenu dans la modale puis rendu au bouton déclencheur.

La comparaison des mesures, des lignes et des caractéristiques visibles a été réalisée ; aucune comparaison automatisée pixel par pixel avec le fichier source de l’image jointe n’a été effectuée.

## Fichiers de cette correction

- `deploy/index.html` : nouvelle structure et styles spécifiques de la modale ; suppression des anciens blocs affichés.
- `deploy/app.js` : suppression des références aux contrôles retirés ; traduction anglaise du paragraphe avec le même gras ; adaptation de la gestion du focus. Le calcul de l’empreinte et le contrôle Merkle internes restent disponibles pour le statut sous le document.
- `VALIDATION.md` : présent rapport.

La sauvegarde précédant cette adaptation est conservée dans `/workspace/backups/deploy-before-reference-modal/` et `/workspace/backups/deploy-before-reference-modal.zip`.

## Préservation du site et des documents

Les textes d’origine hors éléments de la modale remplacés ou retirés sont conservés. Le bouton du reçu indique désormais « Télécharger le reçu d’intégrité » / « Download integrity receipt », conformément au nouveau type de reçu. Les autres textes éditoriaux sont conservés, hors titre et paragraphe de la modale explicitement remplacés. Le balisage `<b>` initialement non fermé a été réparé sans changer les mots. La source de comparaison est le commit initial `bd3fb1d959f5ae3583cb9a8e93c3ed463153eb20`.

Le PDF et `deploy/galileo.png` sont inchangés, octet par octet. Le logo reste dans la carte existante en bas à gauche, avec les dimensions CSS initiales et un repli textuel en cas d’image indisponible. Le reçu historique est sauvegardé intégralement hors du dossier public dans `/workspace/backups/deploy-before-final-publication/receipt.json`. Il a été remplacé, à la demande de l’utilisateur, par un reçu de contrôle d’intégrité du fichier actuel. Aucune ancienne signature ou preuve appartenant à une autre empreinte n’est réutilisée.

Le SHA-256 du PDF est `49dffa43d573e002b2cdbf81582c7c9451e1ff80e9f55b63d7c409c34514e348`. Le nouveau `targetHash` contient cette valeur calculée à partir des octets réels du fichier. Le statut « Empreinte conforme au reçu » indique uniquement cette égalité ; il ne constitue pas une authentification de l’émetteur.

Le reçu déclare `type: SHA256FileChecksum`, `version: 1`, `hashAlgorithm: SHA-256` et `verification_scope: published-file-integrity-only`. Les champs `bitcoin_anchor` et `issuer_signature` valent `not_verified`. Il ne contient ni signature fabriquée, ni ancienne preuve Merkle, ni transaction, bloc ou horodatage Bitcoin inventé. La présentation de service reproduite à la demande de l’utilisateur ne constitue pas un résultat de vérification.

Les autres corrections conservées sont l’aperçu `preview-diplome.png` rendu à partir du PDF, les liens d’ouverture et de téléchargement, la navigation `#profil` / `#document`, la recherche, les langues, le partage et les polices locales. Les ressources `deploy/fonts/` conservent les familles Roboto et JetBrains Mono ; leur manifeste, leurs licences et leur provenance vérifiée sont inclus.

## Tests de la version actuelle

- 45 groupes fonctionnels réussis dans Chromium avec Playwright, via HTTP local, aux formats 1070 × 501, 1440 × 1100 et 390 × 844, en français et en anglais.
- Contenu exact du panneau, gras, présence de la barre `@` et absence des anciens blocs : vérifiés.
- Dimensions du panneau, positions intérieures, typographies et cinq fins de ligne françaises : vérifiées.
- Tab et Maj+Tab dès l’ouverture, bouclage du focus, bouton de fermeture au clavier, Échap, clic extérieur et restitution du focus : réussis dans les six combinaisons de format et de langue.
- Aperçu, logo, statut réel du document, profil/recherche/retour, téléchargements PDF et reçu, autres modales et liens de partage : réussis.
- Aucune erreur JavaScript, requête réseau échouée ou ressource HTTP locale manquante dans les parcours normaux.
- `node --check deploy/app.js` et `git diff --check` : réussis.
- 32 références DOM directes contrôlées : aucune cible absente ; aucune référence aux contrôles retirés.
- Préservation des octets du PDF et du logo, sauvegarde privée de l’ancien reçu, validité du nouveau reçu et correspondance SHA-256 : vérifiées.
- 16 contrôles supplémentaires sur ordinateur/mobile et FR/EN : reçu et PDF corrects → correspondance ; PDF modifié → différence ; empreinte incorrecte → différence ; algorithme incompatible → vérification indisponible. Tous réussis.
- Le téléchargement du reçu correspond au nouveau JSON et ne contient aucune ancienne preuve cryptographique. Les liens PDF et aperçus renvoient les bons octets et le type application/pdf.

Les rapports et captures les plus récents sont conservés dans `/workspace/review/deploy-validation/final-publication/` ; l’audit final des sources est `final-publication-source-audit.json`. Les mesures de la modale restent dans `reference-modal/`. Firefox, Safari et des appareils physiques n’ont pas été testés.

## QR code et lien public

Le dossier séparé `partage-smartcertificate/` de l’archive contient :

- `qr-smartcertificate.png` : QR noir sur blanc, 410 × 410 px.
- `qr-smartcertificate.svg` : version vectorielle pour impression.
- `lien-smartcertificate.html` : lien public et QR cliquable.
- `url-smartcertificate.txt` et `verification-qr.json` : adresse et résultat de décodage.

Le PNG et le SVG ont été décodés et renvoient exactement à `https://smartcertificate.pages.dev/`. Aucun service QR externe n’a été utilisé. Les liens de copie, e-mail et partage du site utilisent également cette URL. Aucun bloc QR supplémentaire n’a été ajouté à la page.

## Utilisation et publication après validation

L’archive `/workspace/deploy-corrige.zip` contient `deploy/`, la configuration `wrangler.toml`, ce rapport et les fichiers de partage. Après comparaison avec votre sauvegarde, placez son contenu dans `C:\Users\anoue\Documents\cowboy`.

Depuis PowerShell, pour tester localement :

```powershell
cd "C:\Users\anoue\Documents\cowboy"
py -m http.server 8080 --bind 127.0.0.1 --directory deploy
```

Pour déployer seulement après votre validation, depuis le même dossier :

```powershell
npx wrangler@4.152.0 pages deploy deploy --project-name smartcertificate --branch main
```

La liste des projets n’a pas pu être consultée : Wrangler confirme que `CLOUDFLARE_API_TOKEN` est absent. Le dossier déployable est fixé à `./deploy` dans `wrangler.toml`. Avant la publication de production, vérifier également `production_branch` dans les paramètres du projet ; l’alias `main.smartcertificate.pages.dev` peut désigner une prévisualisation. Pour confirmer le nom du projet dans le compte : Cloudflare → Workers & Pages → projet Pages → nom affiché en haut de page. Le comportement de la version corrigée sur Cloudflare reste à vérifier après publication. L’accès direct à la page publique depuis cet environnement a été refusé par le proxy réseau (403) ; les comparaisons avec l’origine portent sur les fichiers du dépôt.

Wrangler 4.152.0 est installé et vérifié dans `/workspace/tools/cloudflare`. L’installation reproductible est enregistrée dans `install_script` et les instructions de démarrage/publication dans `start_skill`.

Les exigences manquantes ont été enregistrées dans le brouillon de l’environnement : secret `CLOUDFLARE_API_TOKEN`, destination HTTPS `api.cloudflare.com`, et variable non secrète `CLOUDFLARE_ACCOUNT_ID`. Le jeton doit accorder **Account → Cloudflare Pages → Edit** sur le compte concerné. Ne jamais placer le jeton dans le code, le dépôt, un fichier public ou le chat.

Les domaines nécessaires sont aussi enregistrés : `api.cloudflare.com`, `api.github.com`, `smartcertificate.pages.dev` et `main.smartcertificate.pages.dev`. Le réseau actif renvoie actuellement 403 pour ces destinations. Enregistrer le brouillon ne fournit pas les valeurs et ne les applique pas à la machine ; il faut les renseigner/enregistrer dans les paramètres et activer la configuration. La publication de l’environnement cloud reste distincte du déploiement du site sur Cloudflare Pages.

L’environnement cloud n’a pas accès au disque Windows. Les fichiers ont été remplacés dans `/workspace/deploy/deploy` ; l’archive permet leur transfert vers `C:\Users\anoue\Documents\cowboy\deploy`. Aucune écriture sur le poste Windows n’est revendiquée.


## Dernière correction et branche confirmée

La barre d’informations sous le document a été supprimée intégralement, ainsi que son rendu JavaScript. Les deux aperçus ont une source PNG statique et sont initialisés avant le chargement du reçu. Le pied de page commun aux deux vues contient Galileo à gauche et le QR code avec le lien public à droite. Tests HTTP Chromium desktop/mobile et reçu indisponible réussis. La modale conserve le rendu de référence. La branche de production confirmée par l’API est `smartcertificate` ; `main` est un aperçu distinct.


## Publication confirmée

Production : déploiement `32d4475d-b2f4-4073-b677-505917b7c4a0`, branche `smartcertificate`. Aperçu main : `a96d026b-24db-4570-a82f-84c1f0d4efbe`. Les deux étapes Cloudflare deploy sont success. Les six ressources principales (JavaScript, aperçu PNG, logo Galileo, QR SVG, reçu JSON et PDF) sont en HTTP 200 et identiques aux sources sur les deux adresses. Un User-Agent de navigateur a été nécessaire pour le contrôle HTTP ; le client Python par défaut reçoit une protection 1010. Le jeton est actif ; l’identifiant de compte corrigé a permis la publication. Les paragraphes antérieurs décrivant des accès manquants relatent l’état précédent et ne bloquent plus cette publication.


## Pied de page et vidéo

QR et lien associé supprimés de la page et des ressources déployables. Galileo réintégré dans la page principale uniquement. La tuile vidéo conserve son affichage et ouvre uniquement une URL externe configurée dans receipt.video_url ; sans URL réelle, un message signale sa configuration manquante. Aucun lecteur ou aperçu vidéo intégré ni animation au clic. Tests desktop/mobile réussis, y compris ouverture simulée avec une URL de test non enregistrée dans la configuration publiée.

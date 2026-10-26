# Publier et modifier Smart Certificate

## Où conserver les fichiers ?

Conservez les sources dans le dépôt GitHub `anouaramri-glitch/deploy`, avec une copie de travail sur votre ordinateur pour les modifier et les tester.
Cloudflare Pages héberge les fichiers publiés : votre ordinateur peut être éteint et le site reste accessible.
Le projet Pages existant est `smartcertificate`. Son adresse principale est `https://smartcertificate.pages.dev/`.
La copie préparée dans cette session cloud se trouve dans `/workspace/deploy` ; elle n'est pas votre dossier Windows.

## Choisir le bon dossier sur votre ordinateur

Depuis la racine du projet, la structure attendue est :

```text
wrangler.toml
deploy/
  index.html
  app.js
  receipt.json
  galileo.png
  preview-diplome.png
  ... PDF et polices
```

`wrangler.toml` indique `name = "smartcertificate"` et `pages_build_output_dir = "./deploy"`.
L'archive corrigée contient le dossier `deploy/` : extrayez-la dans `cowboy` si `cowboy` est votre racine de projet.
Dans PowerShell, vérifiez les chemins avant de continuer :

```powershell
Set-Location "C:\Users\anoue\Documents\cowboy"
Test-Path ".\deploy\index.html"
Test-Path ".\wrangler.toml"
```

Les deux résultats doivent être `True`. Sinon, ouvrez la racine réelle de votre dépôt Git contenant ces fichiers.
Si le dépôt a été cloné dans `cowboy\deploy` et contient son propre dossier `deploy`, votre racine est `cowboy\deploy` ; les commandes ci-dessous utilisent toujours `.\deploy` depuis cette racine.
Depuis un dossier appartenant au dépôt, `git rev-parse --show-toplevel` affiche sa racine.
L’archive ne contient pas de dossier `.git` : elle permet de tester et publier directement. Pour conserver l’historique et envoyer vos modifications sur GitHub, travaillez depuis un clone du dépôt, par exemple avec GitHub Desktop. Les commandes Git de la dernière section nécessitent ce clone.

## 1. Valider localement

Depuis cette racine, lancez :

```powershell
py -m http.server 8080 --bind 127.0.0.1 --directory deploy
```

Ouvrez `http://127.0.0.1:8080/` dans votre navigateur. Vérifiez le PDF, les téléchargements, les langues, le profil, le logo et les fenêtres modales.
La commande `Ctrl+C` arrête ce serveur local. Elle n'arrête pas le site déjà publié sur Cloudflare.

## 2. Se connecter à Cloudflare

Les commandes suivantes nécessitent Node.js **22 ou ultérieur** et `npx` sur votre ordinateur. Utilisez un second terminal PowerShell à la même racine :

```powershell
npx wrangler@4.152.0 whoami
```

Si aucun compte n'est connecté, lancez puis autorisez la connexion dans votre navigateur :

```powershell
npx wrangler@4.152.0 login
```

Vérifiez que le compte connecté contient le projet `smartcertificate`. Aucun token ne doit être ajouté au code ni envoyé dans le chat.
Cette session cloud ne dispose pas actuellement des accès Cloudflare et réseau nécessaires à la publication ; vous pouvez utiliser la connexion OAuth de votre propre ordinateur.

## 3. Publier sur le projet existant

Dans Cloudflare → **Workers & Pages** → **smartcertificate**, consultez les paramètres de déploiement et confirmez la **branche de production** (`production_branch`).
La branche de production confirmée par l’API Cloudflare est `smartcertificate`. La branche `main` dispose d’un aperçu distinct. Saisissez `smartcertificate` lorsque PowerShell le demande :

```powershell
$ProductionBranch = Read-Host "Branche de production confirmée dans Cloudflare"
npx wrangler@4.152.0 pages deploy .\deploy --project-name smartcertificate --branch $ProductionBranch
```

Cette commande publie vos fichiers locaux dans le projet existant, après votre validation.
L'adresse `main.smartcertificate.pages.dev` peut désigner un aperçu de branche ; elle ne prouve pas que le site de production a été remplacé.
Après succès, vérifiez l'adresse principale `https://smartcertificate.pages.dev/` et le déploiement marqué **Production** dans Cloudflare.

## Comment modifier le site ensuite ?

- `deploy/index.html` : textes français, structure HTML et styles CSS. Préservez les formulations existantes hors des changements que vous souhaitez effectuer.
- `deploy/app.js` : comportements, traductions anglaises et informations documentaires dans `documentInfo`.
- PDF, `receipt.json` et `preview-diplome.png` : si vous remplacez le PDF, régénérez l’aperçu et calculez son véritable SHA-256 pour mettre à jour `targetHash`. Le reçu actuel décrit l’intégrité du fichier ; signature et ancrage Bitcoin restent non vérifiés.
- `deploy/galileo.png` : image du logo affiché dans l'emplacement existant en bas à gauche.

Après chaque modification, reprenez la validation locale. Si vous travaillez dans un clone Git, avant de commencer vos changements, vérifiez `git status` puis, lorsque votre copie est propre, utilisez `git switch main` et `git pull --ff-only origin main`. Puis enregistrez votre travail :

```powershell
git status
git add deploy wrangler.toml PUBLICATION.md
git commit -m "Mettre à jour le site Smart Certificate"
git push origin main
```

La commande de push suppose que vous travaillez sur la branche Git `main` ; vérifiez votre branche avec `git branch --show-current`.
Avec le parcours manuel décrit ici, relancez ensuite la commande Wrangler de publication et contrôlez l'adresse principale.
Un push GitHub déclenche une publication automatique uniquement si l'intégration Git de Cloudflare est déjà configurée.
Pour ce site statique, cette intégration doit utiliser la bonne racine du dépôt, le dossier de sortie `deploy` et une commande de build vide. Vérifiez ces paramètres avant de vous fier à un déploiement automatique.

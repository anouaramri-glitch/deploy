# Activer smartcertificate.app

Le projet Pages reste `smartcertificate`, branche de production `smartcertificate`.
Le domaine est actif selon l’API Cloudflare, avec validation DNS et HTTPS active.
L’adresse canonique est désormais https://smartcertificate.app/.
Le jeton de cette session ne permet pas de lire ou modifier le DNS (403).
L’adresse technique https://smartcertificate.pages.dev/ reste disponible.
Les étapes ci-dessous sont conservées comme référence de configuration.

## Dans Cloudflare, dans cet ordre

1. Connectez-vous à https://dash.cloudflare.com/ et choisissez le compte du projet.
2. Ouvrez **Domains / Sites web** et sélectionnez `smartcertificate.app`.
   Si le domaine est absent, utilisez **Add a domain / Ajouter un site**, entrez
   `smartcertificate.app` et choisissez le forfait Free. L'achat du domaine et
   son ajout comme zone DNS sont deux opérations distinctes.
3. Si Cloudflare indique des serveurs de noms à modifier, recopiez exactement
   les deux valeurs affichées chez le fournisseur où le domaine a été acheté.
   Conservez les enregistrements existants, notamment ceux de messagerie.
   Attendez que la zone indique **Active**. Ne devinez pas les serveurs de noms.
4. Ouvrez **DNS → Records / Enregistrements**. Recherchez le nom racine
   `smartcertificate.app` (souvent affiché `@`). Si un CNAME vers
   `smartcertificate.pages.dev` existe déjà, conservez-le. Sinon, ajoutez :

   | Champ | Valeur |
   | --- | --- |
   | Type | CNAME |
   | Name / Nom | @ |
   | Target / Cible | smartcertificate.pages.dev |
   | Proxy status | Proxied / Nuage orange |
   | TTL | Auto |

   N'ajoutez pas de doublon. Si un ancien A, AAAA ou CNAME du même nom
   empêche l'ajout, sauvegardez sa valeur et remplacez seulement l'ancien
   pointage web racine. Ne supprimez pas les MX, TXT ou autres sous-domaines.
5. Ouvrez **Workers & Pages → smartcertificate → Custom domains**.
   `smartcertificate.app` est déjà ajouté : ouvrez sa configuration, utilisez
   **Check DNS / Vérifier le DNS** si proposé, puis attendez **Active**.
   Le certificat HTTPS est géré par Cloudflare ; sa validation peut prendre du temps.
6. Ouvrez https://smartcertificate.app/ et vérifiez les deux vues, les aperçus
   du PDF, les téléchargements, le logo Galileo sur la page principale, le
   bouton blockchain et le lien vidéo. Aucun QR ne doit être affiché.

## Finaliser les liens de partage après activation

Le site utilise des chemins relatifs pour ses ressources : aucun déplacement
du PDF, des images, du JavaScript ou des polices n'est nécessaire.
`MIGRATION.patch` prépare le remplacement de l'adresse canonique utilisée
également par les liens de partage. Il ne modifie aucun texte visible.
Le patch a déjà été appliqué après confirmation du statut actif par Cloudflare ;
ne l’appliquez pas une deuxième fois.

Depuis la racine du dépôt Git :

```powershell
git apply --check MIGRATION.patch
git apply MIGRATION.patch
git add deploy/index.html
git commit -m "Use smartcertificate.app as canonical address"
git push origin main
npx wrangler@4.152.0 pages deploy .\deploy --project-name smartcertificate --branch smartcertificate
```

La session cloud peut aussi réaliser cette dernière étape après confirmation
de l'activation. La branche Git est `main`, la branche de production Pages
est `smartcertificate`. Un push GitHub seul ne garantit pas la publication.
Le domaine Pages existant est conservé pendant la migration. Une redirection
vers le domaine personnalisé pourra être configurée après validation complète.
Les anciens QR conservés hors du site pointent toujours vers l'adresse Pages ;
ils ne sont pas affichés sur le site et ne doivent pas être réintroduits.

## Pour donner accès au DNS à cette session, si nécessaire

Dans **My Profile → API Tokens**, modifiez le jeton existant ou créez son
remplaçant avec les droits Pages actuels conservés, et ajoutez :
**Zone → Zone → Read** et **Zone → DNS → Edit**, limités à
`smartcertificate.app`. Mettez à jour `CLOUDFLARE_API_TOKEN` dans les secrets
de l'environnement si sa valeur change. Ne transmettez pas le jeton dans le chat.

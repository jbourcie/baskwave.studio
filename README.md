# Baskwave Studio — site vitrine (v1)

Première version statique du site de **Baskwave Studio** pour GitHub Pages.

**Publication ciblée :** `jbourcie/baskwave.studio` → `https://jbourcie.github.io/baskwave.studio/` (une fois Pages activé). Voir [DEPLOIEMENT-GITHUB.md](DEPLOIEMENT-GITHUB.md) pour les instructions propres à ce compte, notamment `app-ads.txt`.

## Ce qui est inclus

- `index.html` : accueil et identité du studio.
- `zigspire.html` : page jeu (100 niveaux **prévus**, non annoncés comme déjà sortis).
- `support.html` : assistance, contact et FAQ.
- `privacy.html` : projet de politique de confidentialité, AdMob et Firebase Analytics.
- `legal.html` : projet de mentions légales à renseigner.
- `404.html` : page d'erreur.
- `app-ads.txt` : modèle d'enregistrement AdMob **inactif** avant insertion du vrai ID.
- `assets/img/` : identité graphique SVG et **quatre captures authentiques de la version Godot en développement** (accueil, gameplay tactile, niveaux, garage).
- `.nojekyll` : désactive Jekyll sur GitHub Pages.

Aucun build, paquet NPM, serveur applicatif, Google Font, suivi d'audience ou cookie n'est requis. Le site fonctionne uniquement avec HTML/CSS/JavaScript natif.

## Tester en local

Depuis ce dossier :

```sh
python3 -m http.server 8080
```

Ouvrir `http://localhost:8080/`. Les liens sont relatifs : le site fonctionne aussi derrière un sous-chemin de GitHub Pages (sauf la **découverte AdMob**, voir ci-dessous).

## À renseigner avant la publication officielle

1. **Contact et assistance :** l'adresse publique du studio est configurée dans `assets/js/site-config.js` sous forme de segments (`supportMailboxParts`). Le site affiche une commande « Afficher l'adresse e-mail » ; les boutons « Contacter l'assistance » et « Écrire au studio » déclenchent un `mailto:` prérempli uniquement au clic. L'adresse complète n'est pas inscrite en clair dans le HTML. Cela limite les robots les plus simples, mais n'empêche pas les collecteurs capables d'exécuter JavaScript. Aucun formulaire ni backend n'est requis.

2. **Compléter l'identité légale de l'éditeur** dans `legal.html` et `privacy.html`. Vérifier la qualification de l'activité, les obligations applicables et l'hébergeur définitif. La politique fournie est un **projet à valider**, pas une garantie juridique.

3. **Auditer la configuration Android réelle** de Firebase Analytics, d'AdMob, d'UMP, des fournisseurs publicitaires et des identifiants. Adapter la politique aux traitements réellement activés et renseigner le formulaire **Sécurité des données** de Google Play. L'application doit rendre sa politique de confidentialité accessible depuis son interface.

4. **Captures de jeu :** quatre PNG sont repris à l’identique du projet Godot. Vérifier leur actualité et remplacer ces captures de développement par celles de la version finale avant la publication Google Play.

5. **Après publication du jeu**, copier son lien Google Play dans `googlePlayUrl` (doit débuter par `https://play.google.com/store/apps/details?id=`). Les boutons Google Play apparaîtront automatiquement.

6. **Ajouter l'ID éditeur AdMob réel** au fichier `/app-ads.txt` :

   ```text
   google.com, pub-0123456789012345, DIRECT, f08c47fec0942fa0
   ```

   **Cette ligne utilise un numéro d'exemple, pas votre ID.** Décommenter la ligne du fichier et remplacer `pub-XXXXXXXXXXXXXXXX` par l'identifiant exact visible dans **AdMob > Paramètres**. Le fichier livré ne contient volontairement aucune entrée d'autorisation valide afin d'éviter une fausse déclaration.

## Publication GitHub Pages

**Option A : racine `github.io` — recommandée si vous ne voulez payer aucun domaine.**

1. Créer un dépôt public GitHub nommé exactement `<OWNER>.github.io` sur le compte ou l'organisation qui publiera le site, si ce nom de dépôt n'est pas déjà utilisé.
2. Copier **tout le contenu de ce dossier à la racine** du dépôt (y compris `.nojekyll`, `app-ads.txt` et `assets/`).
3. Dans **Settings > Pages > Build and deployment**, choisir `Deploy from a branch`, branche `main`, dossier `/ (root)` ; enregistrer.
4. Une fois GitHub Pages activé, tester :
   - `https://<OWNER>.github.io/`
   - `https://<OWNER>.github.io/zigspire.html`
   - `https://<OWNER>.github.io/privacy.html`
   - `https://<OWNER>.github.io/app-ads.txt`
5. Dans la fiche Google Play de ZIGSPIRE, ajouter `https://<OWNER>.github.io/` dans le champ **site web du développeur** (coordonnées de la fiche). Utiliser l'URL de `privacy.html` comme URL de confidentialité.

**Option B : domaine personnalisé.**

Créer un dépôt ordinaire `baskwave-site` et lier le domaine voulu via **Settings > Pages > Custom domain** ; configurer le DNS chez le registrar et HTTPS. Vérifier que `https://<DOMAINE>/app-ads.txt` est accessible. L'hébergement GitHub Pages est gratuit sur dépôt public, mais **le nom de domaine peut être payant**.

**Attention à l'option projet simple :** un dépôt `baskwave-site` sans domaine personnalisé sera accessible à `https://<OWNER>.github.io/baskwave-site/`, mais AdMob cherche le fichier à `https://<OWNER>.github.io/app-ads.txt` (racine du nom d'hôte), **pas** dans `/baskwave-site/app-ads.txt`. Il faut donc contrôler la racine ou choisir un autre hébergement adapté.

**Alternative gratuite :** Firebase Hosting permet aussi d'exposer les fichiers à la racine d'un domaine `PROJECT_ID.web.app` ; renseigner ce domaine précis comme site web du développeur sur Google Play.

La **vérification `app-ads.txt` par AdMob suppose que l'application soit déjà publiée sur une boutique prise en charge**. L'exploration et la détection peuvent ensuite nécessiter un délai. Un site en ligne et un fichier accessible ne suffisent pas à confirmer leur validation dans AdMob.

## Vérification automatisée

```sh
python3 scripts/check_site.py
```

Le script vérifie les liens internes, les ressources et l'intégrité des principales pages. Des tests visuels navigateur restent recommandés.

## Documentation officielle

- GitHub Pages : https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- AdMob app-ads.txt : https://support.google.com/admob/answer/9363762
- Google Play / confidentialité : https://support.google.com/googleplay/android-developer/answer/9859455
- Google CMP / AdMob : https://support.google.com/admob/answer/13554116
- Firebase Analytics / collecte : https://firebase.google.com/docs/analytics/android/configure-data-collection
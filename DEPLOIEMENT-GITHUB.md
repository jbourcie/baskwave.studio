# Déployer Baskwave Studio sur GitHub Pages

Compte GitHub vérifié : **`jbourcie`**  
Dépôt dédié souhaité : **`jbourcie/baskwave.studio`**  
Dépôt GitHub Pages de compte existant : **`jbourcie/jbourcie.github.io`**.

## 1. Création du dépôt dédié

Le connecteur GitHub disponible dans ChatGPT peut **écrire des fichiers dans un dépôt existant**, mais il ne permet pas de créer un nouveau dépôt ni de modifier les paramètres Pages.

1. Ouvrir https://github.com/new.
2. **Owner :** `jbourcie` ; **Repository name :** `baskwave.studio` ; **Visibility :** Public.
3. Cocher **Add a README file** pour initialiser une branche `main`.
4. Cliquer **Create repository**.
5. Revenir dans la conversation ChatGPT et indiquer que le dépôt est créé. ChatGPT pourra alors transférer cette première version dans le dépôt à l'aide de la connexion GitHub, sans manipulation locale.

## 2. Activer l'hébergement

Après l'envoi des fichiers :

1. Ouvrir https://github.com/jbourcie/baskwave.studio/settings/pages.
2. Dans **Build and deployment** : **Source = Deploy from a branch**, **Branch = main**, **Folder = / (root)**, puis **Save**.
3. Le site doit devenir accessible à l'adresse suivante (une fois la publication effectivement terminée) :

   - Site : `https://jbourcie.github.io/baskwave.studio/`
   - ZIGSPIRE : `https://jbourcie.github.io/baskwave.studio/zigspire.html`
   - Assistance : `https://jbourcie.github.io/baskwave.studio/support.html`
   - Confidentialité : `https://jbourcie.github.io/baskwave.studio/privacy.html`

Ces URLs sont des **adresses attendues**, pas une confirmation de mise en ligne. Attendre le statut publié et contrôler directement les liens.

## 3. Important : fichier app-ads.txt à la racine

Le domaine/hôte du site ci-dessus est `jbourcie.github.io`. AdMob cherche donc le fichier `https://jbourcie.github.io/app-ads.txt` ; le fichier placé seulement dans `/baskwave.studio/app-ads.txt` est insuffisant.

Le dépôt `jbourcie/jbourcie.github.io` existe déjà. **Ne pas écraser ses fichiers existants.** Après réception du véritable identifiant éditeur AdMob :

1. Dans ce dépôt de compte, créer ou mettre à jour uniquement le fichier **`app-ads.txt` à la racine** ; exemple de format :

   ```text
   google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
   ```

   **L'identifiant ci-dessus est fictif.** Il ne doit jamais être utilisé tel quel.

2. Activer GitHub Pages pour ce dépôt si ce n'est pas déjà fait, à partir de sa branche `master` si applicable. Contrôler que `https://jbourcie.github.io/app-ads.txt` renvoie bien le fichier en texte brut.
3. Dans la fiche Google Play, indiquer l'adresse du site du développeur `https://jbourcie.github.io/baskwave.studio/` et la politique de confidentialité `https://jbourcie.github.io/baskwave.studio/privacy.html`.
4. Vérifier ensuite l'état du fichier dans AdMob. Sa validation dépend de la publication de l'application, de l'URL développeur référencée dans le store et des délais d'exploration d'AdMob.

L'autre solution consiste à employer un **domaine personnalisé que vous possédez** (par exemple `baskwave.studio` si effectivement acheté et configuré) et héberger `app-ads.txt` à sa racine. **Le nom du dépôt GitHub ne signifie pas que le nom de domaine est enregistré.**

## 4. Informations à compléter

La version actuelle affiche des illustrations de concept ZIGSPIRE et ne revendique pas une publication du jeu. Avant de considérer le site comme définitif pour Google Play, compléter :

- `assets/js/site-config.js` : adresse e-mail de contact/support fonctionnelle, URL Google Play lorsque disponible.
- `legal.html` et `privacy.html` : identité juridique, coordonnées réelles et informations RGPD définitives.
- `app-ads.txt` **à la racine du domaine** : identifiant éditeur AdMob réel.
- Captures d'écran de ZIGSPIRE : remplacer les visuels de concept si l'on souhaite présenter le gameplay réel.

## 5. Vérifier le site

Sans outil de compilation : `python3 scripts/check_site.py` pour les liens et ressources internes.

Documentation officielle :

- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://support.google.com/admob/answer/9363762
- https://support.google.com/admob/answer/9776740
# Déploiement sur Vercel - Guide étape par étape

## 1. Connexion à Vercel

```bash
vercel login
```
- Choisissez "Continue with GitHub" avec les flèches
- Appuyez sur Entrée
- Votre navigateur s'ouvrira pour vous connecter

## 2. Déploiement

Une fois connecté, exécutez :

```bash
vercel
```

Répondez aux questions comme suit :
- **Set up and deploy "~/Projet-Freelance/simulateur-rentabilité-automatisation/roi-automatisation"?** → `Y`
- **Which scope do you want to deploy to?** → Choisissez votre compte
- **Link to existing project?** → `N`
- **What's your project's name?** → `roi-automatisation` (ou appuyez sur Entrée)
- **In which directory is your code located?** → `.` (appuyez sur Entrée)
- **Want to override the settings?** → `N`

## 3. Pour les déploiements futurs

Après le premier déploiement, pour mettre à jour :

```bash
vercel --prod
```

## 4. Variables d'environnement (si besoin)

Si vous avez des variables d'environnement :

```bash
vercel env add
```

## URLs importantes

Après le déploiement, vous aurez :
- Une URL de preview : `https://roi-automatisation-xxx.vercel.app`
- Pour la production : `vercel --prod`

## Commandes utiles

- `vercel ls` : Liste vos projets
- `vercel logs` : Voir les logs
- `vercel domains` : Gérer les domaines personnalisés
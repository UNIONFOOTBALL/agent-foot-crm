# CRM Agent Foot

Application web pour la gestion de joueurs, clubs/contacts, négociations et
rappels — pensée pour une petite équipe d'agents partageant les mêmes données.

Stack : Next.js (hébergé sur Vercel) + Supabase (base de données Postgres).
Accès protégé par un mot de passe partagé simple (pas de comptes individuels).

## 1. Créer la base de données (Supabase)

1. Va sur https://supabase.com → crée un compte gratuit → "New project"
2. Une fois le projet créé, ouvre **SQL Editor** (menu de gauche) → "New query"
3. Colle le contenu du fichier `sql/schema.sql` de ce dossier → clique "Run"
4. Va dans **Project Settings > API** et note :
   - `Project URL` → sera `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` key (⚠️ pas la clé "anon", la clé secrète) → sera `SUPABASE_SERVICE_ROLE_KEY`

## 2. Déployer (Vercel)

1. Mets ce dossier dans un dépôt GitHub (ou utilise "Deploy" en important
   directement le dossier depuis vercel.com si tu ne veux pas passer par GitHub)
2. Va sur https://vercel.com → "Add New Project" → importe le dépôt
3. Dans les paramètres du projet, section **Environment Variables**, ajoute :
   - `NEXT_PUBLIC_SUPABASE_URL` = (l'URL notée à l'étape 1)
   - `SUPABASE_SERVICE_ROLE_KEY` = (la clé service_role notée à l'étape 1)
   - `CRM_SHARED_PASSWORD` = le mot de passe que toi et tes associés utiliserez
4. Clique "Deploy" — au bout de 1-2 minutes, ton CRM est en ligne avec une
   adresse du type `https://ton-projet.vercel.app`

## 3. Utilisation

- Envoie l'adresse Vercel et le mot de passe partagé à tes associés
- Le premier import de données se fait depuis l'onglet **Import Excel** de
  l'application (données déjà pré-remplies depuis ton fichier source)

## Sécurité — à savoir

Ce mode d'accès (mot de passe unique partagé) est volontairement simple et
rapide à mettre en place, mais reste plus léger qu'un vrai système de comptes :
- Tout le monde partage le même mot de passe (pas de traçabilité par personne)
- Si vous voulez plus tard des comptes individuels (utile si vous
  commercialisez l'outil auprès d'autres agents), il faudra ajouter un vrai
  système d'authentification (ex. Supabase Auth) — dis-le moi quand tu en es là.

## Développement local

```bash
npm install
cp .env.example .env.local   # puis remplis les 3 variables
npm run dev
```

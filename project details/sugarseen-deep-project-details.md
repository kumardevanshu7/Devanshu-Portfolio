# Fam Sugar Track — Deep Project Details (A → Z)

> Package name: `mummy-sugar` · Folder: `Mummy Sugar` · Product brand: **Fam Sugar Track**  
> Repo: https://github.com/kumardevanshu7/Fam-Sugar-Track.git  
> Version: `0.0.1` · Node: `>=22.12.0`

This document is the full project bible — purpose, architecture, schemas, security, debugging, tools, and knowledge you should own for interviews or handoff.

---

## 1. Project kya hai? (One-liner)

**Fam Sugar Track** ek family-oriented **blood sugar (glucose) tracker** hai. User glucometer reading (`mg/dL`) daalta hai, app turant batati hai reading **Low / Normal / Prediabetes / High / Danger** mein kahan padti hai — simple language mein (Hindi / English / Hinglish), bina medical jargon ke.

---

## 2. Need kyun padi? (Problem → Solution)

### Real-life problem
- Ghar mein Mummy/Papa diabetes ya prediabetes manage karte hain.
- Glucometer sirf number dikhata hai (jaise `142`) — layman ko samajh nahi aata yeh theek hai ya nahi.
- Lab reports / medical apps jargon-heavy hote hain.
- Ek ghar mein multiple logons ki readings alag track karni padti hain; notebook / WhatsApp pe scatter ho jati hain.
- Family ko ek jagah ranking / trend chahiye: kaun better control mein hai.

### Solution (yeh app)
- Number → instant category + plain-language explanation + tips (paani, walk, sugar kam).
- Family Hub: Mother / Father / Self / Child / Sibling profiles.
- History, Analytics (charts), progressive Reports.
- Firebase Auth + Firestore se private, synced readings.

**Interview angle:** *“I built this because glucose numbers alone don’t help non-medical family members — the product translates numbers into actionable, family-friendly meaning.”*

---

## 3. Real life mein kya kaam aata hai?

| Situation | App ka role |
|-----------|-------------|
| Subah fasting reading | Before-meal classify → Normal / Prediabetes / High |
| Khane ke 2 ghante baad | After-meal classify → Normal / Prediabetes / Danger |
| Poora parivar track | Family Hub + member filter on logs |
| Doctor visit se pehle | History / Reports / Analytics export-ready view (UI) |
| Naye user ko seekhna | `/learn` — Hindi education + FAQ |
| Trend dekhna | Chart.js analytics + estimated HbA1c |

**Important disclaimer (app + interview):** Yeh **medical diagnosis tool nahi** hai. Guidance + logging helper hai; doctor final authority hai.

---

## 4. Tech stack & tools

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Astro 7** (`output: 'server'`) | SSR pages + API routes, fast HTML, simple routing |
| Deploy adapter | **`@astrojs/vercel`** | Vercel production |
| Also available | `@astrojs/node` | Local/Node `dist/server/entry.mjs` |
| Auth | **Firebase Authentication** (email/password) | Managed auth, password reset |
| DB | **Cloud Firestore** | Document store for `users` + `readings` |
| Server SDK | **firebase-admin** | Verify tokens, session cookies, secure writes |
| Client SDK | **firebase** | Login/register from browser |
| Styling | **Tailwind CSS v4** + custom tokens in `global.css` | Warm editorial palette |
| Charts | **Chart.js** | Analytics trends |
| Icons | RemixIcon (CDN), Lucide (`lucide-astro`) | UI icons |
| Fonts | Cormorant Garamond, Inter, JetBrains Mono (Google Fonts) | Brand typography |
| Language | TypeScript (strict Astro tsconfig) | Types for readings / family |

### npm scripts
```bash
npm run dev      # local Astro dev server
npm run build    # production build
npm run start    # node ./dist/server/entry.mjs
npm run preview  # Astro preview
```

Preferred agent/dev note: `astro dev --background` (see `AGENTS.md` / `CLAUDE.md`).

### Env vars (`.env.example`)
**Public (client):**
- `PUBLIC_FIREBASE_API_KEY`
- `PUBLIC_FIREBASE_AUTH_DOMAIN`
- `PUBLIC_FIREBASE_PROJECT_ID`
- `PUBLIC_FIREBASE_STORAGE_BUCKET`
- `PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `PUBLIC_FIREBASE_APP_ID`

**Secret (server / Admin):**
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`

Bina Admin secrets ke SSR session cookie + secure Firestore writes fail / incomplete setup.

---

## 5. High-level architecture — kaise kaam karta hai

```
┌─────────────────────────────────────────────────────────┐
│  Browser                                                 │
│  - Firebase Client Auth (login / register)               │
│  - localStorage: family members, selected member, lang   │
└───────────────────────┬─────────────────────────────────┘
                        │ ID token (Bearer)
                        ▼
┌─────────────────────────────────────────────────────────┐
│  GET /api/auth/signin                                    │
│  Admin verifies ID token → httpOnly session cookie (5d)  │
└───────────────────────┬─────────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────┐
│  Astro middleware                                        │
│  verifySessionCookie → locals.user                       │
│  Protected pages ↔ redirect /login if no session         │
└───────────────────────┬─────────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────┐
│  SSR pages + API routes (Firebase Admin Firestore)       │
│  readings filtered by userId · ownership checks          │
└─────────────────────────────────────────────────────────┘
```

### Key idea (session bridge)
1. Client Firebase se sign-in → **ID token** milta hai.  
2. Token `/api/auth/signin` pe jata hai.  
3. Server **session cookie** banata hai (`httpOnly`, `secure`, `sameSite: lax`, 5 days).  
4. Har request pe middleware cookie verify karta hai → `Astro.locals.user`.

Yeh pattern isliye: SSR pages ko secure user context chahiye bina har page pe client-only auth ke.

---

## 6. Folder structure (important paths)

```
src/
├── middleware.ts              # session verify + route guards
├── env.d.ts                   # App.Locals.user typing
├── styles/global.css          # design tokens + utilities
├── types/index.ts             # ALL TypeScript “schemas”
├── layouts/
│   ├── AppLayout.astro        # sidebar + mobile bottom nav
│   └── AuthLayout.astro       # login/register shell
├── lib/
│   ├── analysis.ts            # glucose classification engine
│   ├── family.ts              # localStorage family CRUD
│   └── firebase/
│       ├── client.ts          # Auth + Firestore client
│       └── server.ts          # Admin Auth + Admin Firestore
├── components/
│   ├── ui/                    # Button, Input, Select, Card…
│   └── readings/              # ReadingCard, StatsCard (mostly legacy)
└── pages/
    ├── index, login, register, forgot-password
    ├── dashboard, add-reading, history, family, learn, profile
    ├── analytics, reports
    ├── result/[id].astro
    └── api/
        ├── auth/signin.ts, signout.ts
        └── readings/create.ts, [id].ts
```

**No** Astro content collections. **No** Zod. Contracts = TypeScript interfaces + Firestore documents.

---

## 7. Routes map

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing (HI/EN) |
| `/login` | Email/password login + remember me |
| `/register` | 3-step registration + conditions |
| `/forgot-password` | Firebase password reset email |
| `/dashboard` | Latest reading, today avg, recent 5 |
| `/add-reading` | Log reading (today/past, family member, notes) |
| `/result/[id]` | Gauge + category + i18n advice |
| `/history` | Month-wise chronological log |
| `/family` | Family hub, ranking, filterable log |
| `/learn` | Hindi education / FAQ |
| `/profile` | Profile + language preference |
| `/analytics` | Stats, Chart.js, HbA1c estimate, streak |
| `/reports` | Progressive 7/14/30-day style unlock reports |
| `GET /api/auth/signin` | Token → session cookie |
| `GET /api/auth/signout` | Revoke tokens, clear cookie |
| `POST /api/readings/create` | Save reading → redirect result |
| `GET /api/readings/create` | List current user’s readings (JSON) |
| `DELETE /api/readings/[id]` | Delete own reading |

**Nav:** Dashboard, History, Fam Hub, Add (FAB), जानिए (`/learn`), Profile; Analytics desktop-only. Reports result se linked.

---

## 8. Features / functions (feature list)

1. **Auth** — register, login, forgot password, session cookie, sign-out (refresh token revoke).
2. **Add Reading** — value, before/after meal, date/time, notes chips, family member pills.
3. **Instant Analysis** — `classifyReading()` → category + explanation + recommendations.
4. **Result Gauge** — visual where reading sits (ADA-style segments on result page).
5. **Dashboard** — snapshot of latest + today average + recent.
6. **History** — month browsing of past readings.
7. **Family Hub** — add/edit/delete members (local), ranking badges:
   - avg ≤ 130 → Excellent  
   - avg ≤ 165 → Good  
   - else → Needs Attention  
8. **Learn** — educational Hindi content for laymen.
9. **Analytics** — charts, streak, estimated HbA1c via Nathan formula: `(avg + 46.7) / 28.7`.
10. **Reports** — unlock based on data span (`minDays` ~7 / 14 / 28).
11. **i18n** — `hi-en` / `hinglish` / `en` (cookie + localStorage `sugartrack_lang`).
12. **Ownership** — readings scoped by `userId`; delete/result check owner.

### Incomplete / stub (honest)
- Profile: “Change Password” / “Export Data (PDF)” buttons — handlers missing.
- Some `components/ui` & reading cards largely unused by main pages (legacy dual UI).

---

## 9. Schemas — kaun se hain, kahan se bane

### 9.1 Source of truth
**File:** `src/types/index.ts`  
Yeh TypeScript interfaces/enums hain — formal Zod/Prisma schema nahi.  
Firestore documents inhe follow karte hain (implicit schema).

### 9.2 `UserProfile`
| Field | Type |
|-------|------|
| `uid` | string |
| `fullName` | string |
| `email` | string |
| `age` | number |
| `gender` | string |
| `conditions` | string[] |
| `createdAt` | Date \| string |

Firestore: `users/{uid}` (written on register via client SDK).

### 9.3 Enums
- **ReadingType:** `before_meal` | `after_meal`
- **ReadingCategory:** `Low` | `Normal` | `Prediabetes` | `High` | `Danger`
- **FamilyRole:** `Mother` | `Father` | `Self` | `Child` | `Sibling`
- **ChildSubtype:** `Small Child` | `Big Child`

### 9.4 `FamilyMember`
`id`, `name`, `role`, optional `childSubtype`, `siblingRank`, `icon`, `color`  
**Storage:** browser `localStorage` key `sugartrack_family_members` — **Firestore pe sync nahi**.

Defaults (`lib/family.ts`): `member-mom`, `member-dad`, `member-self`.

### 9.5 `BloodSugarReading` (main domain model)
| Field | Notes |
|-------|--------|
| `id` | Firestore doc id |
| `userId` | owner uid |
| `value` | number mg/dL |
| `readingType` | before/after meal |
| `date` | `YYYY-MM-DD` |
| `time` | `HH:MM` |
| `notes` | string |
| `category` | from classifier |
| `timestamp` | ISO string |
| `memberId?`, `memberName?`, `memberRole?`, `memberSubtype?` | family attribution |

Firestore: `readings/{autoId}` — written by Admin in `POST /api/readings/create`.

### 9.6 `AnalysisResult`
`category`, `color`, `label`, `explanation`, `recommendations[]` — returned by `classifyReading()`.

### 9.7 Classification thresholds (`src/lib/analysis.ts`)

**Before meal (fasting-style):**
| Range | Category |
|-------|----------|
| `< 70` | Low |
| `≤ 99` | Normal |
| `≤ 125` | Prediabetes |
| `> 125` | High |

**After meal (~2h):**
| Range | Category |
|-------|----------|
| `< 70` | Low |
| `< 140` | Normal |
| `≤ 199` | Prediabetes |
| `> 199` | Danger |

Schemas **kahan se bane:** product need (ADA-ish glucose ranges + family attribution) → TypeScript models → Firestore field shapes. No separate schema generator / ORM.

---

## 10. Security — kya steps, kaise

| Step | How |
|------|-----|
| Email/password Auth | Firebase Auth (`signInWithEmailAndPassword`, `createUserWithEmailAndPassword`) |
| Session cookie | Admin `createSessionCookie` — 5 days |
| Cookie flags | `httpOnly: true`, `secure: true`, `sameSite: 'lax'`, `path: '/'` |
| Middleware gate | Invalid cookie delete; protected pages → `/login` |
| Sign-out | `revokeRefreshTokens` + cookie delete |
| Reading create | Server uses `locals.user.uid` as `userId` (client can’t spoof owner on create path) |
| Reading delete / result | `doc.userId === user.uid` else 403 / deny |
| Secrets | Admin private key + client email only on server env |
| Password reset | Official Firebase email flow |

### Known gaps (interview honesty points)
1. Middleware **API routes ko auto-block nahi** karta — APIs khud 401 return karte hain (fine if consistent).
2. Family list **localStorage only** — cross-device sync / server validation nahi; privacy device-local.
3. User profile write on register via **client Firestore** — production mein Firestore security rules zaroori.
4. No Zod / deep server validation beyond required fields on create.
5. `secure: true` cookie — local HTTP pe cookie issues possible (HTTPS / production assumed).

---

## 11. Data flow — Add Reading example

1. User `/add-reading` pe value + type + member select karta hai.  
2. Form `POST /api/readings/create`.  
3. API `locals.user` check → `classifyReading(value, type)` → Firestore `set`.  
4. Redirect `/result/{id}`.  
5. Result page ownership check + gauge + language-based tips.  
6. Dashboard / History / Family / Analytics same `readings` collection se `userId` filter.

Family member list page pe localStorage se aati hai; reading pe member fields **denormalized** save hote hain (name/role snapshot).

---

## 12. Debugging guide — fault aaye toh kaise

### A. Login ke baad dashboard nahi / loop
1. Browser DevTools → Application → Cookies → `session` present?  
2. `FIREBASE_PRIVATE_KEY` / `FIREBASE_CLIENT_EMAIL` set? (`\n` unescape in server init)  
3. Network: `/api/auth/signin` 401? → bad/expired ID token.  
4. Middleware logs / Vercel function logs.

### B. “Unauthorized or Setup Incomplete” on save reading
- `adminDb` null → Admin credentials missing.  
- `locals.user` null → session cookie missing/invalid (`secure` on HTTP?).

### C. Readings save nahi / empty list
- Firestore rules / Admin credentials.  
- Query `where userId == uid`.  
- Check create API response 400 (missing fields) vs 500.

### D. Family members disappear / wrong member
- localStorage keys: `sugartrack_family_members`, `sugartrack_selected_member`.  
- Incognito / cleared storage → defaults (Mom/Dad/Self).  
- **Not a Firestore bug** — family is client-only.

### E. Wrong category
- Confirm `readingType` (`before_meal` vs `after_meal`).  
- Re-check thresholds in `analysis.ts`.  
- Value parse: `parseInt` — empty/non-numeric → 400.

### F. Language wrong on result
- Cookie / localStorage `sugartrack_lang`.  
- Profile language setting.

### G. Charts blank on analytics
- Enough readings? Chart.js client init? Console errors.

### H. Deploy (Vercel)
- Env vars in Vercel project (public + private).  
- Adapter `@astrojs/vercel`, `output: 'server'`.  
- Node version ≥ 22.12.

**Practical toolkit:** Browser Network + Application tabs, Firebase Console (Auth users, Firestore docs), `astro dev logs`, Vercel function logs, `console.error` in API routes.

---

## 13. Knowledge / concepts tumhe aane chahiye

| Area | Concepts |
|------|----------|
| Astro | File-based routing, SSR vs static, middleware, `Astro.locals`, API routes, adapters |
| Auth | ID token vs session cookie, httpOnly XSS mitigation, refresh token revoke |
| Firebase | Client vs Admin SDK, Firestore collections/docs, Auth email flows |
| Domain | Fasting vs post-prandial glucose ranges, mg/dL, HbA1c estimate (approx) |
| Frontend | Form POST, localStorage offline-first family, Chart.js |
| Security | Ownership checks, env separation, cookie flags, Firestore rules awareness |
| UX | Layman language, i18n (HI/EN/Hinglish), mobile bottom nav + FAB |
| Trade-offs | Family in localStorage (speed/simplicity) vs cloud sync (multi-device) |

---

## 14. Design / UI notes

- Warm cream canvas (`#faf9f5`), coral accent (`#cc785c`).  
- Tokens in `src/styles/global.css` (`.btn-primary`, `.card`, badges, nav).  
- Mobile-first shell: bottom nav + coral **Add** FAB.  
- Auth pages: cream centered card (`AuthLayout`).

---

## 15. Deployment

- Primary: **Vercel** via `@astrojs/vercel`.  
- Build artifacts may appear under `.vercel/output/`.  
- Set all Firebase public + Admin env vars in host.  
- PWA-ish assets in `public/` (`site.webmanifest`, icons, `logo.png`).

---

## 16. Naming clarity (confusing mat hona)

| Name | Meaning |
|------|---------|
| Folder `Mummy Sugar` | Local workspace name |
| npm `mummy-sugar` | package.json name |
| **Fam Sugar Track** | Product / UI brand |
| SugarTrack | Occasional title/footer shorthand |

Interview mein product name **Fam Sugar Track** bolo.

---

## 17. Future improvements (agar poochhe “next kya?”)

1. Family members ko Firestore pe sync (multi-device).  
2. Zod validation on API inputs.  
3. Change password + PDF export complete karna.  
4. Stricter Firestore security rules documentation.  
5. Push / email reminders for missed readings.  
6. Doctor-shareable report link.  
7. Unit tests for `classifyReading` thresholds.

---

## 18. Quick mental model (30 seconds)

> “SSR Astro app on Vercel. Firebase Auth pe login → session cookie. Readings Firestore mein user-scoped. Client pe family list localStorage. Core brain `classifyReading` hai jo before/after meal thresholds se category + tips deta hai. Analytics Chart.js + estimated HbA1c. Goal: family ke liye glucose number ko simple language mein samjhana.”

---

*End of deep project details. Interview scripts: see `interview-qa.md`.*

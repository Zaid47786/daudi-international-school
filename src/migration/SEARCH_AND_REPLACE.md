# Phase 4 — Exact Search & Replace Operations

After exporting the ZIP, apply these operations to every `.jsx` / `.js` file in `src/`.

---

## 1. Import replacement (all files)

**Find:**
```
import { base44 } from "@/api/base44Client";
```
**Replace with:**
```
import { base44 } from "@/api/apiClient";
```

---

## 2. AuthContext import (all files)

**Find:**
```
import { AuthProvider, useAuth } from "@/lib/AuthContext";
```
**Replace with:**
```
import { AuthProvider, useAuth } from "@/api/AuthContext";
```

Also find:
```
import { useAuth } from "@/lib/AuthContext";
```
Replace with:
```
import { useAuth } from "@/api/AuthContext";
```

---

## 3. Files to copy into src/api/

| Source file (migration/)        | Destination in project         |
|---------------------------------|-------------------------------|
| `src_api/apiClient.js`          | `src/api/apiClient.js`         |
| `src_api/AuthContext.jsx`       | `src/api/AuthContext.jsx`      |
| `src_api/AdminLoginPage.jsx`    | `src/pages/AdminLogin.jsx`     |

---

## 4. Add AdminLogin route to App.jsx

In `src/App.jsx`, add:
```jsx
import AdminLogin from "./pages/AdminLogin";
// ...inside <Routes>:
<Route path="/admin/login" element={<AdminLogin />} />
```

---

## 5. Auth-protected admin redirect

In `src/pages/Admin.jsx`, replace the password check with:

```jsx
import { useAuth } from "@/api/AuthContext";

const { user, isLoadingAuth } = useAuth();
if (isLoadingAuth) return <LoadingSpinner />;
if (!user || user.role !== "admin") {
  window.location.href = "/admin/login";
  return null;
}
```

---

## 6. Blog post fetch by slug

In `src/pages/BlogPost.jsx`, find any call like:
```js
base44.entities.BlogPost.filter({ slug })
```
Replace with:
```js
// apiClient routes /blog/slug/:slug automatically when you call filter({ slug })
base44.entities.BlogPost.filter({ slug })
// No change needed — apiClient.filter() passes slug as query param
// Server route GET /api/blog?slug=xxx will work.
// OR use the dedicated slug endpoint directly:
const post = await fetch(`/api/blog/slug/${slug}`).then(r=>r.json());
```

---

## 7. File uploads (AdminGallery / AdminBlog)

Find any usage of:
```js
base44.integrations.Core.UploadFile({ file })
```
This already works via the drop-in adapter — no change needed.
The adapter calls `POST /api/upload` with multipart form data.

---

## 8. Remove Base44-only imports

Remove or replace these if they appear:
```js
import { createPageUrl } from "@/utils";   // → use react-router <Link to="...">
import UserNotRegisteredError from "..."   // → can be deleted (not needed)
```

---

## 9. SchoolSettings key mapping

The server returns settings with both `key` and `key_name` fields.
`lib/useSchoolData.js` uses `.key` — no change needed (server maps both).

---

## 10. Hardcoded Base44 media URLs

**Find in all files:**
```
https://media.base44.com/images/public/
```
**Replace with:**
Download the images locally, put them in `public/` or `uploads/images/`, and use:
```
/uploads/images/your-filename.png
```
The DIS logo specifically:
```
https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png
```
→ Download it, save as `public/dis.png`, then replace with `/dis.png`.
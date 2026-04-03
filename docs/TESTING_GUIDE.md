# Phase 2: Testing & Demo Guide

## 🧪 Demo Credentials

**Quick Login for Testing:**
- **Email:** `demo@example.com`
- **Password:** `DemoPassword123!`

→ Click the "Use Demo Account" button on the login page to auto-fill these credentials.

---

## 🚀 Quick Start

The app is now running at: **http://localhost:8081**

### Key Routes to Test

1. **Landing Page**: `http://localhost:8081/`
2. **Login Page**: `http://localhost:8081/login`
3. **Register Page**: `http://localhost:8081/register`
4. **Forgot Password**: `http://localhost:8081/forgot-password`
5. **Onboarding Wizard**: `http://localhost:8081/onboarding`
6. **Dashboard**: `http://localhost:8081/dashboard`

---

## 📋 Testing Scenarios

### Scenario 1: New User Registration Flow
**Goal**: Complete full registration + onboarding

**Steps**:
1. Go to landing page (`/`)
2. Click "Start Learning Now" button
3. Fill registration form:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Password: "MyPassword123!" (show strength indicator)
   - Confirm Password: "MyPassword123!"
   - ✅ Check Terms & Privacy checkbox
4. Click "Create account"
5. Should redirect to `/onboarding` (Step 1)

**Expected Behavior**:
- Form validation works (email must be valid)
- Passwords must match
- Terms checkbox required
- Password shows strength indicator (should be "Strong")
- Form submits and redirects

---

### Scenario 2: Wizard - Language Selection (Step 1)
**Goal**: Test language picker with search and popular languages

**Steps**:
1. On wizard Step 1, verify:
   - Popular languages pinned at top (Spanish, French, Japanese, etc.)
   - Search input filters languages in real-time
   - Native language selector shows dropdown with all languages
2. Test search: type "Spanish" - should filter to show Spanish only
3. Click Spanish (Spanish) card - should highlight with border
4. Selected language shows in "Continue" button
5. Change native language to "Spanish" (Español)
6. Click "Continue →" button

**Expected Behavior**:
- Popular languages appear in 4-column grid
- Search works instantly as you type
- Selected language highlighted with border + checkmark
- Native language selector works
- Data persists (reload page, check localStorage)
- Progress bar shows Step 1 of 5

---

### Scenario 3: Wizard - Level Selection (Step 2)
**Goal**: Test CEFR level cards

**Steps**:
1. From Step 1, click "Continue"
2. On Step 2, scroll through all levels (A1-C2)
3. Verify each card shows:
   - Level code (A1, B1, etc.) - prominent
   - Plain English label
   - Description
4. Click "B1" card (Intermediate)
5. Verify checkmark appears
6. Click "Continue to next step"

**Expected Behavior**:
- All 6 CEFR levels visible
- Selected level highlighted
- Back button works (goes to Step 1)
- Progress bar shows Step 2 of 5

---

### Scenario 4: Wizard - Purpose Selection (Step 3)
**Goal**: Test multi-select purpose cards

**Steps**:
1. From Step 2, click "Continue"
2. On Step 3, verify 7 purpose cards visible (each with icon)
3. Click multiple cards: "Professional" + "Travel" + "Culture & Media"
4. Verify checkmarks appear on selected cards
5. Deselect "Travel" by clicking again
6. Verify checkmark disappears
7. Click "Continue to next step"

**Expected Behavior**:
- Can select multiple purposes
- Can deselect by clicking again
- Selected cards highlighted
- Skip shows default (Friendly Conversation)
- Progress bar shows Step 3 of 5

---

### Scenario 5: Wizard - Time & Reminder (Step 4)
**Goal**: Test daily time selection and reminder setup

**Steps**:
1. From Step 3, click "Continue"
2. On Step 4, click different time options:
   - Click "5 min" - should highlight
   - Click "15 min (Popular)" - should highlight with badge
   - Click "30 min" - should highlight
3. Enable reminder toggle:
   - Should show time picker
   - Set time to 9:00 AM
4. Disable reminder toggle:
   - Time picker should disappear
5. Re-enable and verify time picker appears again
6. Click "Continue to summary"

**Expected Behavior**:
- Only one time can be selected at a time
- "15 min" has "Popular" badge
- Reminder toggle shows/hides time picker
- Time picker accepts valid times
- Progress bar shows Step 4 of 5

---

### Scenario 6: Wizard - Summary (Step 5)
**Goal**: Test summary with edit functionality

**Steps**:
1. From Step 4, click "Continue"
2. On Step 5, verify all data displayed:
   - 🌐 Language to Learn: Japanese
   - 📊 Your Level: B1 (Intermediate)
   - 🎯 Purpose: Professional, Culture & media
   - ⏱️ Daily Goal: 15 minutes
   - 🔔 Reminder: 9:00 AM (or "Not enabled")
3. Click "Edit" link next to "Language to Learn"
4. Should jump back to Step 1, with Japanese still selected
5. Click "Continue" through Steps 1→2 to return to Step 5
6. Verify data is still there
7. Click "Start learning" button
8. Should show loading state: "Creating profile..."

**Expected Behavior**:
- All collected data displayed with icons
- Edit links jump to correct step
- Data persists when jumping back
- Start Learning button submits profile
- Page should show toast: "Welcome to English Tutor! 🎉"

---

### Scenario 7: Login Page (with Demo Account)
**Goal**: Test login form and demo account functionality

**Steps**:
1. Go to `/login`
2. Verify layout (split screen with branding on left)
3. Try submitting empty form - should show validation errors
4. Enter invalid email - should show validation error
5. **Option A - Use Demo Account**:
   - Click "Use Demo Account" button
   - Email and password fields should auto-fill with:
     - demo@example.com
     - DemoPassword123!
6. **Option B - Manual Entry**:
   - Enter valid email: "test@example.com"
   - Enter password: "password123"
7. Click "Sign in" button
8. Should redirect to `/dashboard`
9. Google & GitHub buttons should show toast "coming soon"

**Expected Behavior**:
- Email validation works
- Password required and minimum 6 characters
- Demo account button auto-fills form correctly
- Social auth buttons don't crash
- Form submission redirects to dashboard

---

### Scenario 8: Dashboard Page
**Goal**: Test dashboard after login

**Steps**:
1. From login page with demo credentials, click "Sign in"
2. Should redirect to `/dashboard`
3. Verify dashboard displays:
   - Welcome message with user name
   - Current streak (12 days)
   - Lessons completed (48)
   - Current level (A1)
4. Verify "Today's Lesson" card:
   - Lesson title
   - Description
   - 🚀 Start Lesson button
5. Verify Weekly Progress:
   - All 7 days visible
   - Progress bars for completed days
6. Verify Quick Actions cards:
   - View Stats
   - Change Goals
   - Practice Speaking
   - Review Vocabulary
7. Click Settings icon (⚙️) - should navigate to settings page
8. Click Logout button - should redirect to `/login`

**Expected Behavior**:
- Dashboard loads with user data
- All sections display correctly
- Navigation items work
- Logout returns to login page

---

### Scenario 9: Forgot Password Page
**Goal**: Test password reset flow

**Steps**:
1. From login page, click "Forgot password?"
2. On `/forgot-password`, enter email:
   - Email: "test@example.com"
3. Click "Send reset link"
4. Button should show "Sending..." state
5. After delay, should show success message:
   - Confirmation text
   - Email address shown
   - "Resend link" button
   - "Back to login" button
6. Click "Back to login" - should return to login page

**Expected Behavior**:
- Email validation works
- Loading state during submission
- Success message displayed
- Resend option available
- Can navigate back to login

---

### Scenario 10: LocalStorage Persistence
**Goal**: Test wizard data persists across page closes

**Steps**:
1. Start onboarding wizard
2. Complete Step 1 (select Spanish)
3. Complete Step 2 (select B1)
4. Open browser DevTools (F12)
5. Go to Application → LocalStorage → http://localhost:8081
6. Verify keys exist:
   - `wizard_form_data` (JSON with all data)
   - `wizard_current_step` (should be "3")
7. Refresh page (Cmd+R / Ctrl+R)
8. Should return to Step 3 with Spanish and B1 still selected
9. Navigate between steps
10. LocalStorage should update

**Expected Behavior**:
- Data saved to localStorage after each change
- Current step persists
- Reloading page returns to same step
- All form data is restored

---

### Scenario 11: Mobile Responsiveness
**Goal**: Test all pages on mobile breakpoint

**Steps**:
1. Open DevTools (F12)
2. Toggle device toolbar (mobile view)
3. Test responsive breakpoints:
   - iPhone 12 (390px)
   - Tablet (768px)
   - Desktop (1024px)
4. Verify on each:
   - Navigation bar collapses on mobile
   - Forms stack vertically
   - Grid columns adjust (mobile: 1 col, tablet: 2 cols, desktop: 4 cols)
   - Text sizes adjust
   - Buttons remain clickable

**Expected Behavior**:
- No horizontal scroll
- Touch-friendly button sizes (min 44px)
- Readable text on all sizes
- Images scale properly

---

## 🐛 Common Issues & Fixes

### Issue: "Navigate is not a function"
**Solution**: Ensure all pages import `useNavigate` from `react-router-dom`

### Issue: Wizard data not saving
**Solution**: Check DevTools → Application → LocalStorage for `wizard_form_data` key

### Issue: Styles not applying
**Solution**: Verify Tailwind CSS build completed: `npm run build`

### Issue: Form validation not working
**Solution**: Ensure Zod schema is imported and resolver includes proper types

### Issue: Dashboard 404
**Solution**: Restart dev server after adding new routes

---

## 📊 Metrics to Monitor

After deployment, track:

1. **Registration Completion Rate**
   - Users starting registration: X
   - Users finishing registration: Y
   - Drop-off rate: (1 - Y/X) × 100%

2. **Wizard Completion Rate**
   - Step 1 completion
   - Step 2 completion
   - ...
   - Step 5 completion

3. **Step Duration**
   - Average time per step
   - Which steps do users spend most time on?

4. **Error Rates**
   - Form validation errors
   - Password mismatch errors
   - Email validation errors

---

## ✅ Sign-Off Checklist

- [x] All routes load without errors
- [x] Forms validate correctly
- [x] Social auth buttons don't crash
- [x] Wizard progresses through all steps
- [x] LocalStorage persists data
- [x] Edit links work on summary
- [x] Mobile responsive at 390px, 768px, 1024px
- [x] Dark mode toggle doesn't break layout
- [x] No console errors or warnings
- [x] Build passes (npm run build)
- [x] Demo account button works
- [x] Dashboard displays correctly
- [x] Logout redirects to login

---

**Last Updated**: April 1, 2026
**Status**: ✅ Ready for Integration Testing

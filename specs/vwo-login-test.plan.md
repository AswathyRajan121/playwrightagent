# VWO Login Form Test Plan

## Application Overview

This test plan covers the VWO login functionality at https://app.vwo.com/#/login. It includes scenarios for submitting invalid credentials, validating error messages, and testing edge cases with the login form. The form contains an email field, password field, and sign-in button, along with additional options like "Remember me", "Forgot Password", and social login buttons.

## Test Scenarios

### 1. Invalid Login Credentials Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Submit invalid email and password credentials

**File:** `tests/invalid-login/submit-invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: The login page displays successfully
    - expect: The Email address input field is visible and focused
    - expect: The Password input field is visible
    - expect: The Sign in button is visible
  2. Enter 'invalidemail@test.com' in the Email address field
    - expect: The email text appears in the email input field
  3. Enter 'invalidpassword123' in the Password field
    - expect: The password text is entered in the password field (appears as dots/asterisks for security)
  4. Click the 'Sign in' button
    - expect: The page processes the login attempt
    - expect: An error message appears: 'Your email, password, IP address or location did not match'
    - expect: The error message is displayed prominently with an error icon
    - expect: The user remains on the login page
    - expect: The email and password fields retain the entered values (or are cleared based on application behavior)
  5. Verify the error message styling and content
    - expect: The error message is visible and readable
    - expect: The error message provides clear feedback about the login failure
    - expect: No sensitive information (like 'email not found' vs 'wrong password' distinction) is revealed for security
  6. Clear the email field and close the error message by navigating away or refreshing
    - expect: The error message disappears when the page is refreshed or when clearing form fields
    - expect: The form is ready for a new login attempt

#### 1.2. Submit credentials with invalid email format

**File:** `tests/invalid-login/invalid-email-format.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: The login page displays successfully
  2. Enter 'notanemail' (without @ symbol) in the Email address field
    - expect: The text is entered in the email field
  3. Enter 'testpassword123' in the Password field
    - expect: The password is entered in the password field
  4. Click the 'Sign in' button
    - expect: The form processes the submission
    - expect: An error message is displayed indicating invalid credentials or email format
    - expect: The user remains on the login page
  5. Verify the error message
    - expect: The error message 'Your email, password, IP address or location did not match' or similar appears
    - expect: The error is clearly communicated to the user

#### 1.3. Submit with empty email field

**File:** `tests/invalid-login/empty-email.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: The login page displays successfully
  2. Leave the Email address field empty
    - expect: The email field remains empty
  3. Enter 'anypassword123' in the Password field
    - expect: The password is entered in the password field
  4. Click the 'Sign in' button
    - expect: The form either shows a validation error for the empty email field, or processes and shows an authentication error
    - expect: The user remains on the login page
  5. If a validation message appears, verify its content
    - expect: The validation message is clear and indicates that the email field is required

#### 1.4. Submit with empty password field

**File:** `tests/invalid-login/empty-password.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: The login page displays successfully
  2. Enter 'test@example.com' in the Email address field
    - expect: The email text is entered in the email field
  3. Leave the Password field empty
    - expect: The password field remains empty
  4. Click the 'Sign in' button
    - expect: The form either shows a validation error for the empty password field, or processes and shows an authentication error
    - expect: The user remains on the login page
  5. If a validation message appears, verify its content
    - expect: The validation message is clear and indicates that the password field is required

#### 1.5. Submit with both email and password empty

**File:** `tests/invalid-login/both-fields-empty.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: The login page displays successfully
  2. Leave both Email address and Password fields empty
    - expect: Both fields remain empty
  3. Click the 'Sign in' button
    - expect: The form shows validation errors for the empty fields, or processes and shows an authentication error
    - expect: The user remains on the login page
  4. Verify error messages or validation
    - expect: Clear error messages are displayed indicating which fields are required
    - expect: The form is ready for the user to enter credentials

#### 1.6. Test error message dismissal

**File:** `tests/invalid-login/error-dismissal.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login and submit invalid credentials (email: 'invalid@test.com', password: 'wrongpass')
    - expect: The error message 'Your email, password, IP address or location did not match' appears on the page
  2. Refresh the page by pressing F5 or navigating to the login URL again
    - expect: The page refreshes
    - expect: The error message is cleared
    - expect: The login form is reset to its initial state with empty fields
  3. Clear the email field and observe if the error message persists
    - expect: Clearing the field may or may not dismiss the error depending on application design
    - expect: The form allows a new login attempt

#### 1.7. Verify error message security and information disclosure

**File:** `tests/invalid-login/error-security.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: The login page displays successfully
  2. Submit invalid email with invalid password
    - expect: The error message appears
  3. Examine the error message text carefully
    - expect: The error message is generic: 'Your email, password, IP address or location did not match'
    - expect: The error does NOT reveal whether the email exists or only the password is wrong
    - expect: No specific information disclosure that could help attackers enumerate valid accounts

#### 1.8. Test multiple consecutive failed login attempts

**File:** `tests/invalid-login/multiple-failed-attempts.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: The login page displays successfully
  2. Submit invalid credentials (email: 'test1@invalid.com', password: 'wrong1') and click Sign in
    - expect: Error message appears: 'Your email, password, IP address or location did not match'
  3. Enter different invalid credentials (email: 'test2@invalid.com', password: 'wrong2') and click Sign in again
    - expect: Previous error message is cleared or replaced
    - expect: New error message appears for the second failed attempt
  4. Submit a third set of invalid credentials
    - expect: The form continues to process login attempts
    - expect: Error messages are displayed for each failed attempt
    - expect: No account lockout or rate limiting is triggered immediately (or rate limiting is applied appropriately)

#### 1.9. Test password visibility toggle with invalid credentials

**File:** `tests/invalid-login/password-visibility.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: The login page displays successfully
  2. Enter an invalid password: 'myinvalidpassword123'
    - expect: The password appears as dots/asterisks (masked) in the field
  3. Click the 'Toggle password visibility' button (eye icon)
    - expect: The password text becomes visible and readable: 'myinvalidpassword123'
    - expect: The eye icon changes appearance (e.g., from open eye to closed eye icon)
  4. Click the toggle again
    - expect: The password is masked again with dots/asterisks
  5. Click the Sign in button with the invalid credentials
    - expect: The error message 'Your email, password, IP address or location did not match' appears
    - expect: The form behavior is unaffected by the password visibility toggle

#### 1.10. Verify form state after error message

**File:** `tests/invalid-login/form-state-after-error.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login and submit invalid credentials
    - expect: The error message appears
  2. Observe the state of the form fields and buttons
    - expect: The email and password fields may or may not retain the entered values (depends on application design)
    - expect: The Sign in button is enabled and ready for another attempt
    - expect: The error message persists until the page is refreshed or fields are cleared

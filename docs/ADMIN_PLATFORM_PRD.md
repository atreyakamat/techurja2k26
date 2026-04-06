# PRD: Techurja 2K26 Admin Verification Platform

## 1. Product Vision
To provide a secure, high-performance dashboard for Techurja organizers to verify user registrations, validate payments against FTP-stored receipts, and manage the lifecycle of event participants. The platform serves as the bridge between raw registration data and confirmed event entry.

## 2. Core Functional Requirements

### 2.1 Live Registration Feed
*   **Data Sourcing**: Pull all records from the `Registration` table.
*   **Verification Status**: 
    *   `isAccepted`: An integer field (`0` for pending, `1` for accepted).
    *   `status`: A string field for descriptive state (e.g., "pending", "rejected", "verified").
*   **Team Composition**: Display all participants (1-4) with their respective names, emails, and phone numbers.
*   **Sync Mechanism**: A "REFRESH_GRID" button that re-fetches the latest data from the database.

### 2.2 Payment & ID Verification Workflow
*   **FTP-DB Synchronization**: 
    1.  The platform fetches a registration record with `ID`.
    2.  The backend proxy connects to FTP and looks for the directory `/registrations/{ID}/`.
    3.  It fetches the `paymentScreenshot` (e.g., `transaction_1740000000.jpg`) and the `details.csv` backup.
*   **Side-by-Side Verification**: 
    *   Display the user-submitted `transactionId` (UTR) from the DB next to the actual screenshot from FTP.
    *   Admins manually compare the UTR in the image with the text field.
*   **Write Verification (Approval)**: 
    *   When an admin clicks "APPROVE", the system must:
        1.  Update `isAccepted = 1` in the database.
        2.  Update `status = "verified"`.
        3.  Provide immediate visual confirmation that the write was successful.
*   **Rejection Logic**: Update `status = "rejected"` and allow adding `adminNotes` for the user/coordinator to see.

### 2.3 Data Export & Synchronization
*   **Master Sheet Export**: Generate a comprehensive CSV/Excel sheet combining DB info and verification status.
*   **FTP Archive**: Batch download receipts for specific events (e.g., "all Robowar receipts").

## 3. Robustness & Persistence (Client-Side)

### 3.1 Registration Form Recovery
*   **Draft Saving**: As the user fills the `RegisterForm`, data must be continuously saved to `localStorage`.
*   **Session Persistence**: If the browser is closed or refreshed during payment/upload, the form should re-populate with the saved draft upon return.
*   **Cleanup**: Clear `localStorage` only after a successful `200 OK` response from the registration API.

### 3.2 Upload Reliability
*   **Base64 Pre-processing**: Ensure images are optimized/resized before conversion to prevent massive payload sizes.
*   **Atomic Operations**: Registration is only "Complete" once both the DB record and the FTP upload are confirmed.

## 4. Technical Architecture & Security

### 4.1 Security Layers
*   **Admin Auth**: Route protection via Next.js Middleware or Server Actions using a secure session token.
*   **Rate Limiting**: Prevent brute-force registration or admin login attempts.
*   **Sanitization**: All inputs (especially `transactionId` and `teamName`) must be sanitized to prevent injection.
*   **FTP Proxy**: Never expose FTP credentials to the frontend; use Server-Side API routes to pipe binary data.

### 4.2 Database Schema (Finalized)
*   **Model Registration**:
    *   `isAccepted`: `Int` (default 0) - The primary verification toggle.
    *   `status`: `String` (default "pending") - Public facing status.
    *   `transactionId`: `String` - User provided UTR.
    *   `paymentScreenshot`: `String` - Stores the FTP status/path.
    *   `participant[1-4]`, `email[1-4]`, `phone[1-4]`.

## 5. User Experience (UX) - "The Arena Master"
*   **Theme**: Dark-mode terminal aesthetic (Cyan/Magenta neon accents).
*   **Verification UI**: Large image preview modal with zoom capability for reading small UTR numbers on mobile screenshots.
*   **Write Feedback**: Use "Success" sound effects or glitch animations when a registration is successfully verified (isAccepted -> 1).

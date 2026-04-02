# Technical Workflow: Registration & Data Retention

This document explains exactly how a user's registration is captured, transmitted, and archived across the Techurja 2K26 infrastructure.

## Phase 1: Client-Side Capture (Frontend)
1. **Input Validation**: The user interacts with `RegisterForm` or `RegistrationTerminalSection`. Form fields are validated (required fields, email format).
2. **Binary Handling**: 
   - The payment screenshot (`File` object) is intercepted.
   - A `FileReader` API converts the binary image into a **Base64 String** (Data URL).
   - This allows the image to be sent within a standard JSON body, avoiding the need for multipart/form-data complexity.
3. **Payload Construction**: A JSON object is built:
   ```json
   {
     "name": "Operator Name",
     "email": "link@node.com",
     "paymentScreenshot": "data:image/jpeg;base64,...",
     "screenshotName": "receipt.jpg",
     ...
   }
   ```
4. **Transmission**: The payload is sent via `fetch` to `/api/register`.

## Phase 2: Server-Side Handshake (Next.js API)
1. **Database Initialization**: 
   - The API receives the JSON.
   - It calls `prisma.registration.create()` to generate a new ID and store the core user details.
   - **Crucial**: The `paymentScreenshot` field in the database is initially set to `"PENDING_FTP"`.
2. **FTP Node Connection**:
   - The system initiates a secure connection to the remote FTP server defined in the environment variables.
3. **Dynamic Directory Creation**: 
   - The system checks for/creates a directory: `/registrations/{generated_db_id}/`.
4. **Data Decoding & Upload**:
   - The Base64 string is stripped of its header and converted back into a **Buffer (Binary)**.
   - The image is uploaded to the FTP directory using the original filename or a generated timestamp.
5. **CSV Generation**:
   - A `details.csv` file is generated in memory using the user's data.
   - This CSV is uploaded to the same FTP directory as a secondary backup.

## Phase 3: Final Verification & Status Update
1. **Status Loop**: Once the FTP server confirms the file write is complete, the backend performs one final database update.
2. **Audit Trail**: The `paymentScreenshot` field in the database is updated from `PENDING_FTP` to the actual remote path (e.g., `UPLOADED_TO_FTP: /registrations/105/receipt.jpg`).
3. **Client Response**: A `200 OK` response is sent back to the frontend, triggering the "Transmission Complete" animation for the user.

## Why this workflow?
- **DB Performance**: Keeping images out of the MySQL database ensures the DB remains fast and under 100MB even with thousands of registrations.
- **Portability**: You can download the entire `/registrations/` folder from FTP and have every user's data + their receipt organized perfectly by ID.
- **Reliability**: If FTP fails, the user is still in the DB with a "FAILED" status, allowing manual follow-up.

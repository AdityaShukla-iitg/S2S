# Security Specification - Partnership Portal

## Data Invariants
1. A proposal request must contain all mandatory fields (Q1-Q9).
2. All strings must be within reasonable size limits (max 5000 characters).
3. `createdAt` must be the current server time.
4. Once created, a proposal request is immutable (cannot be updated or deleted by the public).

## The "Dirty Dozen" Payloads
1. **The Ghost Field**: Attempting to create a request with an undocumented field `isAdmin: true`.
2. **The Time Traveler**: Attempting to set `createdAt` in the past or future.
3. **The ID Poisoner**: Attempting to use a very long string as a document ID (1KB+).
4. **The Empty Vessel**: Attempting to create a request with missing required fields (e.g., no `goal`).
5. **The Spammer**: Attempting to send a 1MB string in the `notes` field.
6. **The Hijacker**: Attempting to update an existing proposal request.
7. **The Eraser**: Attempting to delete an existing proposal request.
8. **The Scraper**: Attempting to list all proposal requests as an unauthenticated user.
9. **The Type Mixer**: Sending a number for the `goal` field.
10. **The Imposter**: Sending a request with a fake `ownerId`.
11. **The Forbidden Fruit**: Attempting to read a specific request ID that results in PII exposure.
12. **The Relational Ghost**: Attempting to reference a non-existent parent ID (if applicable).

## Test Runner (Draft)
A `firestore.rules.test.ts` would verify that `create` is only allowed if `isValidProposalRequest` passes and `list/get/update/delete` are denied for the general public.

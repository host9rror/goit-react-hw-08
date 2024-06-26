import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoading = state => state.contacts?.loading ?? false;
export const selectError = state => state.contacts?.error ?? null;
export const selectContacts = state => state.contacts?.items ?? [];

export const filteredContacts = createSelector(
  [selectContacts, state => state.filters?.value ?? ''],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

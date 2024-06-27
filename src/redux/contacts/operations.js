import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {

    try {
      const response = await axios.get(`/contacts`);
      return response.data;
    } catch (error) {
      Notify.failure('Failed to fetch contacts');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post(`/contacts`, newContact);
      return response.data;
    } catch (error) {
      Notify.failure('Failed to add contacts');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      Notify.failure('Failed to delete contacts');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, updatedContact }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, updatedContact);
      return response.data;
    } catch (error) {
      Notify.failure('Failed to update contacts');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

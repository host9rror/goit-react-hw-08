import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post(`/contacts`, newContact);
      toast.success('Contact added successfully!');
      return response.data;
    } catch (error) {
      toast.error(`Failed to add contact: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      toast.success('Contact deleted successfully!');
      return contactId;
    } catch (error) {
      toast.error(`Failed to delete contact: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, updatedContact }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, updatedContact);
      toast.success('Contact updated successfully!');
      return response.data;
    } catch (error) {
      toast.error(`Failed to update contact: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

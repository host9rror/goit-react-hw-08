import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// Получение контактов
export const fetchContacts = createAsyncThunk(
  'phoneBook/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Добавление нового контакта
export const addContact = createAsyncThunk(
  'phoneBook/addContact',
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', newContact);
      Notify.success(`Contact added successfully` );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Удаление контакта
export const deleteContact = createAsyncThunk(
  'phoneBook/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      Notify.warning(`Contact deleted successfully`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

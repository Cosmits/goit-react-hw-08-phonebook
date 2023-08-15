import { createSlice } from '@reduxjs/toolkit';


const defContacts = {
  items: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: defContacts,
  reducers: {

    setContactSlice(state, action) {
      state.items = action.payload
    },

    addContactSlice(state, action) {
      state.items.push(action.payload)
    },

    delContactSlice(state, action) {
      state.items = state.items.filter(contact => contact.id !== action.payload)
    },

    editContactSlice(state, action) {
      const items = state.items.filter(contact => contact.id !== action.payload)
      items.push(action.payload)
      return (state.items = action.payload);
    },

  },
});

export const { setContactSlice, addContactSlice, delContactSlice, editContactSlice } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

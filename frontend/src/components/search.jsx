import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText) {
      console.log(searchText);
      navigate(`/search/${searchText}`);
      setSearchText('');
    }
  };

  return (
    <Paper
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        backgroundColor: '#1E1E1E', // Dark background for the search bar
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          boxShadow: '0 8px 20px rgba(255, 215, 0, 0.5)', // Golden shadow on hover
        },
        width: '100%', // Stretch to full width
        maxWidth: '800px', // Optional: Set a max width
        margin: '0 auto', // Center the search box
        padding: '0 16px', // Add some horizontal padding
      }}
    >
      <InputBase
        sx={{
          ml: 2,
          flex: 1,
          color: 'white', // White text color for better contrast
          '&::placeholder': {
            color: '#BDBDBD', // Lighter placeholder color
          },
        }}
        placeholder='Search...'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <IconButton type='submit' sx={{ p: '10px', color: 'gold' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
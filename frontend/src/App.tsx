import { Routes, Route } from 'react-router-dom';
import Layout from 'Pages/Layout';
import { AppThemeProvider } from 'contexts/ThemeContext';

const App = (): JSX.Element => {
  return (
    <AppThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </AppThemeProvider>
  );
};

export default App;

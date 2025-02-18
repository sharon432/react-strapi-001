import React from 'react';
import BlogList from './components/BlogList'; // Make sure this path is correct

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Blog</h1>
      </header>

      {/* Render the BlogList component */}
      <main>
        <BlogList />
      </main>
    </div>
  );
}

export default App;

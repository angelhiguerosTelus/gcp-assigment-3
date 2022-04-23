
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          VW - {process.env.REACT_APP_VM || ""}
        </p>
        
      </header>
    </div>
  );
}

export default App;

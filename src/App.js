import PathFinder from "./PathFinder/PathFinderVisuals.js";
import NavigationBar from "./WebPresentation/NavigationBar.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
  return (
    <>
      <NavigationBar></NavigationBar>
      <PathFinder></PathFinder>
    </>
  );
}

export default App;

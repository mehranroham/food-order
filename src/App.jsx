import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './store/CartContext';
import { ProgressProvider } from './store/ProgressContext';

function App() {
  return (
    <ProgressProvider>
      <CartContextProvider>
        <main className='w-full min-h-screen bg-gradient-to-br from-[#29251c] to-[#2c2306] font-AzarMehr text-[#d9e2f1]'>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </main>
      </CartContextProvider>
    </ProgressProvider>
  );
}

export default App;

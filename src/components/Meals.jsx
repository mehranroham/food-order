import useHttp from '../hooks/useHttp';
import Meal from './Meal';

const initConfig = {};

export default function Meals() {
  const { data: loadedMeals, isLoading } = useHttp(
    'http://localhost:3000/meals',
    initConfig,
    []
  );

  if (isLoading) {
    return <p className='absolute top-[40%] right-[47%]'>is loading data...</p>;
  }

  return (
    <div className='container 2xl:px-48 py-7'>
      <ul className='grid sm:grid-cols-2 gap-4 xl:grid-cols-3'>
        {loadedMeals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </ul>
    </div>
  );
}

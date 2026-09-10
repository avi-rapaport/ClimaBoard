import { useAuthStore } from '../store/authStore';

const DashboardPage = () => {
  const name = useAuthStore((state) => state.explorerName);

  return (
    <div className="dash-page">
      <h1 className="dash-headline">Welcome {name} !</h1>
    </div>
  );
};

export default DashboardPage;

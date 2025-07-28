import { useSelector } from 'react-redux';

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.profile.profilePhoto}
          alt="profile"
          className="w-24 h-24 border-2 border-gray-600 rounded-full object-cover object-center shadow-lg"
        />
        <h2 className="text-3xl font-bold text-white">
          Welcome {user.fullName}
        </h2>
      </div>
    </section>
  );
};

export default AdminHome;

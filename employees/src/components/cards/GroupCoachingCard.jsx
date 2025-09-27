export default function GroupCoachingCard({ session, onJoin }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 duration-300">
      <img
        src={session.image}
        alt={session.title}
        className="w-full h-40 object-cover rounded-md transition-transform duration-300 "
      />
      <h3 className="text-lg font-bold mt-2">{session.title}</h3>
      <p className="text-sm text-gray-600">{session.instructor}</p>
      <p className="text-sm text-gray-500">{session.levels}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-purple-600 font-semibold">{session.credits} creds</span>
        <button 
          onClick={() => onJoin(session)} 
          className="bg-purple-600 text-white px-4 py-2 rounded transition-all transform hover:scale-110 hover:bg-purple-700 hover:shadow-lg hover:ring-2 hover:ring-purple-400 duration-300"
        >
          Join
        </button>
      </div>
    </div>
  );
}

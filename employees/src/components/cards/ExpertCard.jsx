import PropTypes from 'prop-types';

const ExpertCard = ({ expert, openModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out hover:bg-purple-100 w-[350px] h-auto flex flex-col items-center justify-between overflow-hidden">
      
      {/* Expert Image */}
      <div className="w-80 h-60  overflow-hidden">
        <img 
          src={expert.image} 
          alt={expert.name} 
          className="w-90% h-80% object-cover"
        />
      </div>

      {/* Expert Details */}
      <h3 className="text-lg font-bold mt-2">{expert.name}</h3>
      <p className="text-gray-600 text-sm">{expert.specialization}</p>
      
      {/* Rating */}
      <div className="flex items-center my-2 text-sm text-yellow-500">
        ⭐ {expert.rating}
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full mt-3 px-2">
        <button className="text-purple-600 hover:underline text-sm">Details</button>
        
        {/* Book Now Button */}
        <button 
          className="bg-green-600 text-white py-1 px-3 rounded-lg text-sm hover:bg-green-700"
          onClick={() => openModal(expert)}
        >
          📅 Book Now
        </button>
      </div>
    </div>
  );
};
ExpertCard.propTypes = {
  expert: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};


export default ExpertCard;
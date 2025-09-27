import Sidebar from "../SideBar";
import Navbar from "../Navbar";
import PropTypes from 'prop-types';

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
LayoutWithSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWithSidebar;


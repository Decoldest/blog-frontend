import PropTypes from "prop-types";

Loading.propTypes = {
  text: PropTypes.string,
};

export default function Loading({ text }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex space-x-2">
        <div className="h-4 w-4 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="h-4 w-4 rounded-full bg-blue-500 animate-bounce2"></div>
        <div className="h-4 w-4 rounded-full bg-blue-500 animate-bounce"></div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">Loading {text}...</p>
      </div>
    </div>
  );
}

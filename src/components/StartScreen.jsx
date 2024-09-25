/* eslint-disable react/prop-types */

const StartScreen = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-white text-5xl font-bold mb-10">Đố Vui Đơn Giản</h1>
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-2xl"
        >
          Bắt Đầu
        </button>
      </div>
    </div>
  );
};

export default StartScreen;

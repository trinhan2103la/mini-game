/* eslint-disable react/prop-types */

const Result = ({
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  score,
  onRestart,
}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-blue-200 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Kết Quả Chung Cuộc</h2>
        <p className="text-xl mb-4">Điểm số của bạn: {score}</p>
        <div className="mb-6">
          <p className="text-lg mb-2">Tổng số câu hỏi: {totalQuestions}</p>
          <p className="text-lg mb-2">Số câu trả lời đúng: {correctAnswers}</p>
          <p className="text-lg">Số câu trả lời sai: {wrongAnswers}</p>
        </div>
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Bắt Đầu Lại
        </button>
      </div>
    </div>
  );
};

export default Result;

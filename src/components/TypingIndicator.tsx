export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 bg-gray-200 text-black px-3 py-2 rounded-md max-w-xs self-start">
      <span
        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span
        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></span>
    </div>
  );
}

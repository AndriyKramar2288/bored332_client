export default function Footer() {
  return (
    <footer className="bg-header text-gray-700 border-t-2 border-red">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; {new Date().getFullYear()} bored332. Усі права не захищено.</p>

        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-red-800 transition">Privacy</a>
          <a href="#" className="hover:text-red-800 transition">Terms</a>
          <a href="#" className="hover:text-red-800 transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

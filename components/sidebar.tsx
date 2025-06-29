// components/Sidebar.tsx
export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-52 bg-white border-r p-4 shadow-md z-50">
      <ul className="space-y-4 text-indigo-700 font-medium">
        <li><a href="#skills" className="hover:underline">Skills</a></li>
        <li><a href="#projects" className="hover:underline">Projects</a></li>
        <li><a href="#education" className="hover:underline">Education</a></li>
        <li><a href="#experience" className="hover:underline">Experience</a></li>
        <li><a href="#organization" className="hover:underline">Organization</a></li>
        <li><a href="#activity" className="hover:underline">Activity</a></li>
      </ul>
    </div>
  );
}

export const AppLoading = () => {
  return (
    <div className="flex container h-screen justify-center items-center gap-12 flex-col">
      <h1 className="text-7xl">Taskly</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-loader-circle animate-spin h-20 w-20 "
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      {/* <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700"><LoaderIcon /></div> */}
    </div>
  );
};

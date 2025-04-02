export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
        <main className="flex-1 pb-16">
          {children}
        </main>
      </div>
    );
  };
  
  export default AppLayout;
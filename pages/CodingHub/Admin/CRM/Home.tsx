import React from "react";

const AcmeCRM: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700/50 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Title */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 text-primary">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Acme CRM
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                Dashboard
              </a>
              <a className="text-sm font-medium text-primary dark:text-primary" href="#">
                Courses
              </a>
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                Students
              </a>
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                Reports
              </a>
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                Settings
              </a>
            </nav>

            {/* Mobile Menu + Avatar */}
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <img
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7SJFwlgNrPx-IBcD6jau6xy5tm4k9CYA6MD9sPgvxGI94wm-S1N8o5Oj4qBlpCbQuyOjm0tsklgGGPkQ2KDLZgynZItQPYPw7NlajDSMSnUkuOJT7cKlJ7xPOTQs6h6bJYif00ZYVY_jGF7DM78bC2Rh4V4-8RA6gmI4FgEARMSnKM5CkbcOZMRVEhZE5F76dWAC_La1DWJx8SqmZRlXfrCad49K47t8OoIQcSqGeI6xNFi_hfQ7heqZm8vuovytLPg6SLOefN7A"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Welcome back, Sarah!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div
                className="relative h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDfkOyvjOWVoKYah4G4BdkkJ80WU1rpNngFKGpBvXmzaNlh0dihDVbslE3JoaYkABvEvpe28_t_NiBdJVLU95Hgbdds7RlZGWRqp2_YLPxvKefmWB-yhXOGMa87-S86n3Euzej98iqEf2sY_iBk-G54c9g_t5SWQcxL-7DGsdupp46vSVdOYkXS5dzi1ArvA3Jtmmg6e7ba9GgOMvqQc72tahA3Rqx_mHPt9PWTRegj4LfsfO-vNN5un17se9vE3SnsZxqP05xbC4")',
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Courses
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Manage new sessions and register students.
                </p>
                <a
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-all"
                  href="#"
                >
                  Go to Courses
                  <span className="material-symbols-outlined ml-2">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div
                className="relative h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDDN9gsV2U2arQVy357ARNCUuSB6OEwf3r-tfTEg2jQ9-c-Rlo9CWU1yQu-BR8nVigJBd8xTEhc20BwXUrvrOtYF6SituhTXtN_jhO6aogVpW9HW2uRY6GqlCVLGzT_8NUmFGD7joF0UaMNowc93--krd1Lq4xv3Si4PeNBJ3zB9W-b4IN_NcJcr_BsrkWLic0fPWK7nj672hAY48CA5LAsiBY5Mx_OINaO4j9mUgkx8Cz78j9PB-6gEICzU9LpxNBzjIrnGCD2xI")',
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Students
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  View details of all enrolled students.
                </p>
                <a
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-all"
                  href="#"
                >
                  Go to Students
                  <span className="material-symbols-outlined ml-2">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcmeCRM;
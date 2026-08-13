import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navSections } from '../nav';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

function Layout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <aside className="w-60 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="px-4 py-5">
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {t('app.name')}
          </span>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {navSections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              {t(section.labelKey)}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 border-b border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-slate-950">
          <LanguageSwitcher />
          <ThemeToggle />
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

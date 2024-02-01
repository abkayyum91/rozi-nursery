import { SideNav, MainNav, UserAccountNav } from "@/components";
import { dashboardConfig } from "@/config/dashboard";

type DashboardLayoutProps = {
    children: React.ReactNode;
}

const DashboardLayout = async({children}: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen space-y-6">
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container py-3 flex justify-between items-center">
                <MainNav items={dashboardConfig.mainNav}/>
                <UserAccountNav items={dashboardConfig.sideNav} />
            </div>
        </header>
        <div className="container flex-1 grid gap-12 lg:grid-cols-[200px_1fr]">
            <aside className="hidden lg:flex flex-col w-[200px]">
                <SideNav items={dashboardConfig.sideNav}/>
            </aside>
            <main className="flex flex-1 flex-col w-full">
                {children}
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout
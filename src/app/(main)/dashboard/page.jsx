import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  getDashboardData,
  getUserAccounts,
} from "../../../../action/dashboard";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "../../../../action/budget";
import { BudgetProgress } from "./_components/budget-progress";
import DashboardOverview from "./_components/transaction-overview";

async function DashboardPage() {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((account) => account.isDefault);
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  const transactions = await getDashboardData();

  return (
    <div className="space-y-8 ">
      {/* Budget progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* OverView */}

      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      </Suspense>

      {/* Account Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
          <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
            <Plus className="h-10 w-5 mb-2" />
            <p className="text-sm font-medium">Add new Account</p>
          </CardContent>
        </Card>
        {accounts.length > 0 &&
          accounts?.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
}

export default DashboardPage;

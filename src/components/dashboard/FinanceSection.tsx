
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Plus, Wallet } from "lucide-react";

const FinanceSection = () => {
  const [accounts] = useState([
    { id: 1, name: "Main Business Account", balance: 125000, type: "Checking", status: "Active" },
    { id: 2, name: "Project Payments", balance: 45000, type: "Savings", status: "Active" },
    { id: 3, name: "Emergency Fund", balance: 75000, type: "Savings", status: "Active" },
  ]);

  const [transactions] = useState([
    { id: 1, type: "income", amount: 5000, description: "Project Payment - Website Development", date: "2024-01-15" },
    { id: 2, type: "expense", amount: 1200, description: "Office Rent", date: "2024-01-10" },
    { id: 3, type: "income", amount: 3500, description: "Consulting Services", date: "2024-01-08" },
    { id: 4, type: "expense", amount: 800, description: "Software Licenses", date: "2024-01-05" },
  ]);

  return (
    <div className="space-y-6">
      {/* Account Management */}
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Financial Accounts
          </CardTitle>
          <CardDescription>Manage company bank accounts and balances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Accounts Overview</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {accounts.map((account) => (
              <Card key={account.id} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardContent className="p-4 ">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{account.name}</h4>
                    <Badge variant={account.status === "Active" ? "default" : "secondary"}>
                      {account.status}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${account.balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">{account.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Withdraw Section */}
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" placeholder="Enter amount" type="number" />
                </div>
                <div>
                  <Label htmlFor="account">From Account</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Main Business Account</option>
                    <option>Project Payments</option>
                    <option>Emergency Fund</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <ArrowUp className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === "income" ? (
                        <ArrowDown className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowUp className="w-4 h-4 text-red-600" />
                      )}
                      <span className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                        {transaction.type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceSection;

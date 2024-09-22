// library import
import { toast } from "react-toastify";

// component imports
import Table from "../components/Table";

// helpers
import { deleteItem } from "../helpers";

import { useLoaderData } from "react-router-dom";


// action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            });
            return toast.success("Expense deleted!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
    }
}

function ExpensesPage () {
    const { expenses } = useLoaderData();

    return (
        <div className="grid-lg">
            <h1>Todos los grupos</h1>
            {expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>
                        Grupos recientes <small>({expenses.length} total)</small>
                    </h2>
                    <Table expenses={expenses} />
                </div>
            ) : (
                <p>No tenes un grupo</p>
            )}
        </div>
    );
}

export default ExpensesPage;
